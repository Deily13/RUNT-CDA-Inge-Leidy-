import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusquedaService } from '../../services/busqueda.service';
import { TablaRegistroComponent } from '../tabla-registro/tabla-registro.component';
import {VehicleCategory} from '../../core/dto/enums';


export interface PanelBusqueda {
  fecha: string;
  mes: string;
  anio: string;
  categoria: string;
  numeroDocumento: string;
  placa: string;
  tipoDocumento: string;
  estados: string[];
}

export interface OpcionEstado {
  value: string;
  label: string;
  checked: boolean;
}

export interface OpcionCategoria {
  value: VehicleCategory;
  label: string;
}

// ── Constantes ────────────────────────────────────────────────────────────────
const MESES: string[] = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const ANIOS: string[] = ['2020', '2021', '2022', '2023', '2024', '2025', '2026'];

const CATEGORIAS_VEHICULO: OpcionCategoria[] = [
  { value: 'MOTOCICLETA', label: 'Motocicleta' },
  { value: 'AUTOMOVIL',   label: 'Automóvil'  },
  { value: 'CAMPERO',     label: 'Campero'     },
  { value: 'MOTOCARGUERO',label: 'Motocarguero'},
  { value: 'CAMIONETA',   label: 'Camioneta'   },
];

const TIPOS_DOCUMENTO: string[] = ['CC', 'NIT'];
const ESTADOS_INICIALES: OpcionEstado[] = [
  { value: 'Inedito', label: 'Inédito', checked: false },
  { value: 'Vencido', label: 'Vencido', checked: false },
  { value: 'Reportado', label: 'Reportado', checked: false },
  { value: 'Ingresado', label: 'Ingresado', checked: false },
  { value: 'Actualizado', label: 'Actualizado', checked: false },
  { value: 'Declinado', label: 'Declinado', checked: false },
];

@Component({
  selector: 'panel-busqueda',
  standalone: true,
  imports: [CommonModule, FormsModule, TablaRegistroComponent],
  templateUrl: './panel-busqueda.component.html',
  styleUrl: './panel-busqueda.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelBusquedaComponent implements OnInit, OnDestroy {

  // ── Dependencia: solo el servicio de lógica ───────────────────────────────
  private readonly busquedaService = inject(BusquedaService);

  // ── Listas de opciones ────────────────────────────────────────────────────
  readonly meses = MESES;
  readonly anios = ANIOS;
  readonly categoriasVehiculo: OpcionCategoria[] = CATEGORIAS_VEHICULO;
  readonly tiposDocumento = TIPOS_DOCUMENTO;

  // ── Modelo de formulario ──────────────────────────────────────────────────
  fecha = '';
  mes = '';
  anio = '';
  categoria = '';
  numeroDocumento = '';
  placa = '';
  tipoDocumento = '';

  // ── Estado del multi-select (signals) ─────────────────────────────────────
  estadoOpciones = signal<OpcionEstado[]>(ESTADOS_INICIALES.map(e => ({ ...e })));
  estadoDropdownAbierto = signal(false);

  readonly estadoTexto = computed(() => {
    const seleccionados = this.estadoOpciones().filter(e => e.checked).map(e => e.label);
    return seleccionados.length ? seleccionados.join(', ') : 'Seleccione estados';
  });

  readonly tieneEstados = computed(() => this.estadoOpciones().some(e => e.checked));

  // ── Lifecycle ─────────────────────────────────────────────────────────────
  ngOnInit(): void { }
  ngOnDestroy(): void { }

  // ── Multi-select ──────────────────────────────────────────────────────────
  toggleDropdownEstado(): void {
    this.estadoDropdownAbierto.update(v => !v);
  }

  onKeydownTrigger(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleDropdownEstado();
    }
    if (event.key === 'Escape') this.estadoDropdownAbierto.set(false);
  }

  toggleEstado(index: number): void {
    this.estadoOpciones.update(opciones =>
      opciones.map((op, i) => i === index ? { ...op, checked: !op.checked } : op)
    );
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.multi-select-wrap')) this.estadoDropdownAbierto.set(false);
  }

  // ── Placa en mayúsculas ───────────────────────────────────────────────────
  onPlacaInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.placa = input.value.toUpperCase();
  }

  // ── Acciones: delegan completamente al servicio ───────────────────────────

  onBuscar(): void {
    const filtros: PanelBusqueda = {
      fecha: this.fecha,
      mes: this.mes,
      anio: this.anio,
      categoria: this.categoria,
      numeroDocumento: this.numeroDocumento,
      placa: this.placa,
      tipoDocumento: this.tipoDocumento,
      estados: this.estadoOpciones().filter(e => e.checked).map(e => e.value),
    };
    this.busquedaService.buscar(filtros);
  }

  onLimpiar(): void {
    this.fecha = '';
    this.mes = '';
    this.anio = '';
    this.categoria = '';
    this.numeroDocumento = '';
    this.placa = '';
    this.tipoDocumento = '';
    this.estadoOpciones.set(ESTADOS_INICIALES.map(e => ({ ...e })));
    this.estadoDropdownAbierto.set(false);
    this.busquedaService.limpiar();
  }
}
