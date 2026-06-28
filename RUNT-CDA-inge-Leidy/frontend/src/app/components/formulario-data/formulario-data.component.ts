import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { VehicleRegistrationService } from '../../core/services/business/vehicle-registration.service';
import {VehicleDTO} from '../../core/dto/vehicle.dto';

interface SelectOption { value: string; label: string; }

export interface FormularioData {
  fechaInicio: string;
  fechaFin: string;
  placa: string;
  marca: string;
  modelo: string;
  linea: string;
  categoria: string;
  estado: string;
  tipoDocumento: string;
  documento: string;
  telefono1: string;
  telefono2: string;
  nombrePropietario: string;
}


// ── Validadores personalizados ────────────────────────────────
function noFutureDate(control: AbstractControl): { [key: string]: boolean } | null {
  if (!control.value) return null;
  const today = new Date(); today.setHours(23, 59, 59, 999);
  const val = new Date(control.value + 'T00:00:00');
  return val > today ? { futureDate: true } : null;
}

function alphaOnly(control: AbstractControl): { [key: string]: boolean } | null {
  if (!control.value) return null;
  const clean = control.value.replace(/\s+/g, '');
  return /^[a-zA-ZÁÉÍÓÚáéíóúÑñ]+$/.test(clean) ? null : { alphaOnly: true };
}

function alphanumericPlate(control: AbstractControl): { [key: string]: boolean } | null {
  if (!control.value) return null;
  return /^[A-Z0-9]{6}$/.test(control.value.toUpperCase()) ? null : { invalidPlate: true };
}

@Component({
  selector: 'app-formulario-data',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './formulario-data.component.html',
  styleUrls: ['./formulario-data.component.css'],
})
export class FormularioDataComponent {

  @Input() mode: 'create' | 'update' = 'create';


  @Input() vehicleData?: FormularioData;

  @Output() saved = new EventEmitter<FormularioData>();
  @Output() cancelled = new EventEmitter<void>();

  vehicleForm!: FormGroup;
  searchPlate: string = '';
  showNotFoundModal: boolean = false;
  todayStr: string = '';
  submitting: boolean = false;
  submitError: string | null = null;
  formVisible: boolean = false;


  estados: SelectOption[] = [
    { value: 'Inedito', label: 'Inédito' },
    { value: 'Actualizado', label: 'Actualizado' },
    { value: 'Vencido', label: 'Vencido' },
    { value: 'Reportado', label: 'Reportado' },
    { value: 'Ingresado', label: 'Ingresado' },
    { value: 'Declinado', label: 'Declinado' },
  ];

  categorias: SelectOption[] = [
    { value: 'MOTOCICLETA', label: 'Motocicleta' },
    { value: 'AUTOMOVIL', label: 'Automovil' },
    { value: 'CAMPERO', label: 'Campero' },
    { value: 'MOTOCARGUERO', label: 'Motocarguero' },
    { value: 'CAMIONETA', label: 'Camioneta' },
  ];

  years: number[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private vehicleRegistrationService: VehicleRegistrationService,) {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear + 1;
    const endYear = startYear - 16;

    for (let y = startYear; y >= endYear; y--) {
      this.years.push(y);
    }
  }

  ngOnInit(): void {
    this.mode = this.route.snapshot.data['mode'] ?? 'create';
    this.todayStr = this.formatDate(new Date());
    this.buildForm();
    this.formVisible = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vehicleData'] && this.vehicleData && this.vehicleForm) {
      this.populateForm(this.vehicleData);
    }
    if (changes['mode'] && this.vehicleForm) {
      this.applyModeConstraints();
    }
  }


  private buildForm(): void {
    this.vehicleForm = this.fb.group({
      fechaInicio: ['', [Validators.required, noFutureDate]],
      fechaFin: [{ value: '', disabled: true }],
      placa: ['', [Validators.required, alphanumericPlate]],
      marca: ['', [Validators.required, Validators.minLength(2), alphaOnly]],
      modelo: ['', [Validators.required]],
      linea: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      tipoDocumento: ['', [Validators.required]],
      documento: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      telefono1: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      telefono2: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      nombrePropietario: ['', [Validators.required, alphaOnly]],
    });

    this.vehicleForm.get('fechaInicio')!.valueChanges.subscribe(val => {
      if (val) {
        const start = new Date(val + 'T00:00:00');
        start.setDate(start.getDate() + 365);
        const fechaFin = this.formatDate(start);
        this.vehicleForm.get('fechaFin')!.setValue(fechaFin, { emitEvent: false });

        // ── Estado automático ──
        const estado = this.resolveEstadoByFechaFin(fechaFin);
        this.vehicleForm.get('estado')!.setValue(estado, { emitEvent: false });
      } else {
        this.vehicleForm.get('fechaFin')!.setValue('', { emitEvent: false });
        this.vehicleForm.get('estado')!.setValue('', { emitEvent: false });
      }
    });

    this.applyModeConstraints();
  }

  private resolveEstadoByFechaFin(fechaFin: string): string {
    if (!fechaFin) return '';
    const currentYear = new Date().getFullYear();
    const finYear = new Date(fechaFin + 'T00:00:00').getFullYear();

    if (finYear > currentYear) return 'Actualizado';
    if (finYear === currentYear) return 'Inedito';
    return '';
  }

  private applyModeConstraints(): void {
    const readonlyInUpdate = ['placa', 'marca', 'modelo', 'linea', 'categoria'];
    if (this.mode === 'update') {
      readonlyInUpdate.forEach(f => this.vehicleForm.get(f)?.disable());
    } else {
      readonlyInUpdate.forEach(f => this.vehicleForm.get(f)?.enable());
    }
  }


  private populateForm(data: FormularioData): void {
    this.vehicleForm.patchValue({
      fechaInicio: data.fechaInicio,
      placa: data.placa,
      marca: data.marca,
      modelo: data.modelo,
      linea: data.linea,
      categoria: data.categoria,
      estado: data.estado,
      tipoDocumento: data.tipoDocumento,
      documento: data.documento,
      telefono1: data.telefono1,
      telefono2: data.telefono2,
      nombrePropietario: data.nombrePropietario,
    });

    this.vehicleForm.get('fechaFin')!.setValue(data.fechaFin);
    const estado = this.resolveEstadoByFechaFin(data.fechaFin);
    this.vehicleForm.get('estado')!.setValue(estado, { emitEvent: false });

  }

  onSearchChange(val: string): void {
    this.searchPlate = val.toUpperCase().replace(/[^A-Z0-9]/g, '');
  }


  searchVehicle(): void {
    const plate = this.searchPlate.trim().toUpperCase();
    if (!plate) return;


    if (this.mode === 'update') {
      this.vehicleRegistrationService.getFullVehicleData(plate).subscribe({
        next: (found: FormularioData) => {
          this.populateForm(found);
          this.formVisible = true;
          this.showNotFoundModal = false;
        },
        error: () => {
          alert('No se pudo buscar el vehículo. Intenta nuevamente.');
        }
      });
      return;
    }


    this.vehicleRegistrationService.checkPlateExists(plate).subscribe({
      next: (exists) => {
        if (exists) {
          this.formVisible = false;
          alert(`La placa ${plate} ya está registrada. No se pueden crear duplicados.`);
        } else {
          this.vehicleForm.get('placa')!.setValue(plate);
          this.formVisible = true;
        }
      },
      error: () => alert('No se pudo verificar la placa. Intenta nuevamente.'),
    });
  }

  clearSearch(): void {
    this.searchPlate = '';
    this.formVisible = false;
    if (this.mode === 'create') {
      this.vehicleForm.reset();
    }
  }

  closeModal(): void { this.showNotFoundModal = false; }

  toUpperCase(field: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const upper = input.value.toUpperCase();
    input.value = upper;
    this.vehicleForm.get(field)!.setValue(upper, { emitEvent: false });
  }

  onlyNumeric(field: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const clean = input.value.replace(/\D/g, '');
    input.value = clean;
    this.vehicleForm.get(field)!.setValue(clean, { emitEvent: false });
  }

  onlyAlpha(field: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const clean = input.value.replace(/[^a-zA-ZÁÉÍÓÚáéíóúÑñ\s]/g, '').toUpperCase();
    input.value = clean;
    this.vehicleForm.get(field)!.setValue(clean, { emitEvent: false });
  }

  isInvalid(field: string): boolean {
    const ctrl = this.vehicleForm.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  getError(field: string): string {
    const ctrl = this.vehicleForm.get(field);
    if (!ctrl || !ctrl.errors || !(ctrl.dirty || ctrl.touched)) return '';
    const e = ctrl.errors;
    if (e['required']) return 'Campo obligatorio';
    if (e['invalidPlate']) return 'Debe tener 6 caracteres alfanuméricos';
    if (e['futureDate']) return 'No puede superar la fecha actual';
    if (e['alphaOnly']) return 'Solo se permiten caracteres alfabéticos';
    if (e['pattern']) {
      if (field === 'documento') return 'Solo se permiten números';
      if (field.startsWith('telefono')) return 'Debe tener exactamente 10 dígitos';
    }
    if (e['minlength']) return `Mínimo ${e['minlength'].requiredLength} caracteres`;
    return 'Campo inválido';
  }


  onSubmit(): void {
    this.vehicleForm.markAllAsTouched();

    if (this.vehicleForm.invalid) return;
    const raw = this.vehicleForm.getRawValue();

    const record: FormularioData = {
      fechaInicio: raw.fechaInicio,
      fechaFin: raw.fechaFin,
      placa: raw.placa.toUpperCase(),
      marca: raw.marca.toUpperCase(),
      modelo: raw.modelo,
      linea: raw.linea.toUpperCase(),
      categoria: raw.categoria,
      estado: raw.estado,
      tipoDocumento: raw.tipoDocumento,
      documento: raw.documento,
      telefono1: raw.telefono1,
      telefono2: raw.telefono2,
      nombrePropietario: raw.nombrePropietario.toUpperCase(),
    };

    this.submitting = true;
    this.submitError = null;

    if (this.mode === 'update') {

      this.vehicleRegistrationService.updateFullRecord(record).subscribe({
        next: () => {
          this.submitting = false;
          this.saved.emit(record);
        },
        error: (err: HttpErrorResponse) => {
          this.submitting = false;
          this.handleSubmitError(err);
        },
      });
      return;
    }

    this.vehicleRegistrationService.registerNewVehicle(record).subscribe({
      next: () => {
        this.submitting = false;
        this.saved.emit(record);
      },
      error: (err: HttpErrorResponse) => {
        this.submitting = false;
        this.handleSubmitError(err);
      },
    });
  }

  private handleSubmitError(err: HttpErrorResponse): void {
    const backendMessage = (err.error && (err.error.message || err.error.error)) as string | undefined;
    this.submitError = backendMessage || 'Ocurrió un error al guardar el registro. Intenta nuevamente.';
  }

  // ── Botones adicionales ────────────────────────────────────
  onCancel(): void {
    this.vehicleForm.reset();
    this.searchPlate = '';
    this.cancelled.emit();
  }

  //onProvisional(): void {
  // Lógica de provisional — conectar con el servicio correspondiente
  //console.log('Acción provisional iniciada');
  //}

  onRectificarRunt(): void {
    // Lógica para rectificación en RUNT
    console.log('Rectificar en RUNT:', this.vehicleForm.getRawValue().placa);
  }

  // ── Utilidades ─────────────────────────────────────────────
  private formatDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

}
