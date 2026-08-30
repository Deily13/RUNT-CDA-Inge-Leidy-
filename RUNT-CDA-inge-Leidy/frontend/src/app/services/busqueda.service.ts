import { Injectable, inject, signal } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { PanelBusqueda } from '../components/panel-busqueda/panel-busqueda.component';
import { InspectionService, InspectionResponse } from './inspection.service';
import { OwnerService, OwnerResponse } from './owner.service';
import { BusquedaStateService } from './busqueda-state.service';
import { Registro } from '../models/registro.model';
import { VehicleService} from './vehicle.service';
import { VehicleDTO} from '../core/dto/vehicle.dto';

@Injectable({ providedIn: 'root' })
export class BusquedaService {

  private readonly inspectionService = inject(InspectionService);
  private readonly vehicleService = inject(VehicleService);
  private readonly ownerService = inject(OwnerService);
  private readonly stateService = inject(BusquedaStateService);

  // ── Estado interno ────────────────────────────────────────────────────────
  private readonly _registros = signal<Registro[]>([]);
  private readonly _cargando = signal(false);
  private readonly _error = signal<string | null>(null);

  // ── API pública (solo lectura para los componentes) ───────────────────────
  readonly registros = this._registros.asReadonly();
  readonly cargando = this._cargando.asReadonly();
  readonly error = this._error.asReadonly();
  readonly realizada = this.stateService.busquedaRealizada;

  // ── Llamado por PanelBusquedaComponent ───────────────────────────────────
  buscar(filtros: PanelBusqueda): void {
    this.stateService.emitirFiltros(filtros);
    this._ejecutarConsulta(filtros);
  }

  // ── Llamado por TablaRegistroComponent en ngOnInit ────────────────────────
  cargarDesdeEstado(): void {
    const filtros = this.stateService.filtros();
    if (filtros) this._ejecutarConsulta(filtros);
  }

  // ── Llamado por PanelBusquedaComponent al limpiar ────────────────────────
  limpiar(): void {
    this.stateService.limpiar();
    this._registros.set([]);
    this._error.set(null);
  }

  // ── Llamado por TablaRegistroComponent al eliminar ────────────────────────
  eliminar(id: number): void {
    this.inspectionService.delete(id).subscribe({
      next: () => this._registros.update(list => list.filter(r => r.id !== id)),
      error: () => this._error.set('No se pudo eliminar el registro.'),
    });
  }

  // ── Lógica de consulta (privada) ──────────────────────────────────────────
  private _ejecutarConsulta(filtros: PanelBusqueda): void {
    this._cargando.set(true);
    this._error.set(null);

    this.inspectionService.search(filtros).subscribe({       // ← una sola llamada
      next:  (inspecciones) => this._enriquecerYSetear(inspecciones),
      error: (err) => {
        if (err.status === 404) this._setResultado([]);
        else this._setError('Error al conectar con el servidor.');
      },
    });
  }

  private _enriquecerYSetear(inspecciones: InspectionResponse[]): void {    if (inspecciones.length === 0) {
      this._setResultado([]);
      return;
    }

    const peticiones = inspecciones.map((inspeccion) =>
      this.vehicleService.getByPlate(inspeccion.vehiclePlate).pipe(
        catchError(() => of(null)),
        switchMap((vehicle) => {
          if (!vehicle) {
            return of(this._mapear(inspeccion, null, null));
          }
          return this.ownerService.getById(vehicle.ownerId).pipe(
            catchError(() => of(null)),
            switchMap((owner) => of(this._mapear(inspeccion, vehicle, owner)))
          );
        })
      )
    );

    forkJoin(peticiones).subscribe({
      next: (registros) => this._setResultado(registros, true),
      error: () => this._setError('Error al enriquecer los registros.'),
    });
  }

  // ── Mapper: Inspection + Vehicle + Owner (backend) → Registro (frontend) ──
  private _mapear(
    inspeccion: InspectionResponse,
    vehicle: VehicleDTO | null,
    owner: OwnerResponse | null
  ): Registro {
    return {
      id: inspeccion.id,
      fechaInicio: inspeccion.validFrom ?? '',
      fechaFin: inspeccion.validUntil ?? '',
      placa: inspeccion.vehiclePlate,
      estado: inspeccion.status?.toLowerCase() ?? '',
      documento: owner?.documentNumber ?? '',
      tipoDoc: owner?.documentType ?? '',
      categoria: vehicle?.category ?? inspeccion.vehicleInfo ?? '',
      linea: vehicle?.line ?? '',
      propietario: owner?.fullName ?? vehicle?.ownerFullName ?? '',
    };
  }

  // ── Helper: ya recibe Registro[] mapeado, solo setea estado ────────────────
  private _setResultado(registros: Registro[], yaMapeado = false): void {
    if (yaMapeado) {
      this._registros.set(registros);
    } else {
      this._registros.set([]); // caso vacío explícito
    }
    this._cargando.set(false);
  }

  private _setError(mensaje: string): void {
    this._error.set(mensaje);
    this._cargando.set(false);
  }
}
