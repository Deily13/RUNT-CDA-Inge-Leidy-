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
import { SoatRegistrationService } from '../../core/services/business/soat-registration.service';

interface SelectOption { value: string; label: string; }

export interface SoatData {
  fechaInicio: string;
  fechaFin: string;
  placa: string;
  categoria: string;
  nombreApoderado: string;
  tipoDocumento: string;
  documento: string;
  telefono: string;
  correo: string;
  aseguradora: string;
  precio: string;
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
  selector: 'app-soat',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './soat.component.html',
  styleUrls: ['./soat.component.css'],
})
export class SoatComponent implements OnInit, OnChanges {

  @Input() mode: 'create' | 'update' = 'create';
  @Input() soatData?: SoatData;

  @Output() saved = new EventEmitter<SoatData>();
  @Output() cancelled = new EventEmitter<void>();

  soatForm!: FormGroup;
  searchPlate: string = '';
  showNotFoundModal: boolean = false;
  todayStr: string = '';
  submitting: boolean = false;
  submitError: string | null = null;
  formVisible: boolean = false;

  categorias: SelectOption[] = [
    { value: 'MOTOCICLETA', label: 'Motocicleta' },
    { value: 'AUTOMOVIL', label: 'Automóvil' },
    { value: 'CAMPERO', label: 'Campero' },
    { value: 'MOTOCARGUERO', label: 'Motocarguero' },
    { value: 'CAMIONETA', label: 'Camioneta' },
  ];

  aseguradoras: SelectOption[] = [
    { value: 'SURA', label: 'Sura' },
    { value: 'BOLIVAR', label: 'Bolívar' },
    { value: 'LIBERTY', label: 'Liberty' },
    { value: 'MAPFRE', label: 'Mapfre' },
    { value: 'AXA', label: 'AXA Colpatria' },
    { value: 'ALLIANZ', label: 'Allianz' },
    { value: 'MUNDIAL', label: 'Mundial' },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private soatRegistrationService: SoatRegistrationService,
  ) {}

  ngOnInit(): void {
    this.mode = this.route.snapshot.data['mode'] ?? 'create';
    this.todayStr = this.formatDate(new Date());
    this.buildForm();
    this.formVisible = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['soatData'] && this.soatData && this.soatForm) {
      this.populateForm(this.soatData);
    }
    if (changes['mode'] && this.soatForm) {
      this.applyModeConstraints();
    }
  }

  // ── Construcción del formulario ───────────────────────────
  private buildForm(): void {
    this.soatForm = this.fb.group({
      fechaInicio:      ['', [Validators.required, noFutureDate]],
      fechaFin:         [{ value: '', disabled: true }],
      placa:            ['', [Validators.required, alphanumericPlate]],
      categoria:        ['', [Validators.required]],
      nombreApoderado:  ['', [Validators.required, alphaOnly]],
      tipoDocumento:    ['', [Validators.required]],
      documento:        ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      telefono:         ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      correo:           ['', [Validators.required, Validators.email]],
      aseguradora:      ['', [Validators.required]],
      precio:           ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });

    // Auto-calcular fechaFin = fechaInicio + 1 año
    this.soatForm.get('fechaInicio')!.valueChanges.subscribe(val => {
      if (val) {
        const start = new Date(val + 'T00:00:00');
        start.setFullYear(start.getFullYear() + 1);
        start.setDate(start.getDate() - 1); // mismo día, un año después
        this.soatForm.get('fechaFin')!.setValue(this.formatDate(start), { emitEvent: false });
      } else {
        this.soatForm.get('fechaFin')!.setValue('', { emitEvent: false });
      }
    });

    this.applyModeConstraints();
  }

  private applyModeConstraints(): void {
    // En modo update: placa y categoría no se pueden editar
    const readonlyInUpdate = ['placa', 'categoria'];
    if (this.mode === 'update') {
      readonlyInUpdate.forEach(f => this.soatForm.get(f)?.disable());
    } else {
      readonlyInUpdate.forEach(f => this.soatForm.get(f)?.enable());
    }
  }

  private populateForm(data: SoatData): void {
    this.soatForm.patchValue({
      fechaInicio:     data.fechaInicio,
      placa:           data.placa,
      categoria:       data.categoria,
      nombreApoderado: data.nombreApoderado,
      tipoDocumento:   data.tipoDocumento,
      documento:       data.documento,
      telefono:        data.telefono,
      correo:          data.correo,
      aseguradora:     data.aseguradora,
      precio:          data.precio,
    });
    this.soatForm.get('fechaFin')!.setValue(data.fechaFin);
  }

  // ── Búsqueda por placa ────────────────────────────────────
  onSearchChange(val: string): void {
    this.searchPlate = val.toUpperCase().replace(/[^A-Z0-9]/g, '');
  }

  searchVehicle(): void {
    const plate = this.searchPlate.trim().toUpperCase();
    if (!plate) return;

    if (this.mode === 'update') {
      this.soatRegistrationService.getFullSoatData(plate).subscribe({
        next: (found: SoatData) => {
          this.populateForm(found);
          this.formVisible = true;
          this.showNotFoundModal = false;
        },
        error: () => {
          this.showNotFoundModal = true;
        },
      });
      return;
    }

    // Modo create: verificar que la placa exista en el sistema de vehículos
    this.soatRegistrationService.checkPlateExists(plate).subscribe({
      next: (exists) => {
        if (!exists) {
          this.formVisible = false;
          this.showNotFoundModal = true;
        } else {
          this.soatForm.get('placa')!.setValue(plate);
          this.formVisible = true;
          this.showNotFoundModal = false;
        }
      },
      error: () => alert('No se pudo verificar la placa. Intenta nuevamente.'),
    });
  }

  clearSearch(): void {
    this.searchPlate = '';
    this.formVisible = false;
    this.showNotFoundModal = false;
    if (this.mode === 'create') {
      this.soatForm.reset();
    }
  }

  closeModal(): void { this.showNotFoundModal = false; }

  // ── Transformaciones de input ─────────────────────────────
  toUpperCase(field: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const upper = input.value.toUpperCase();
    input.value = upper;
    this.soatForm.get(field)!.setValue(upper, { emitEvent: false });
  }

  onlyNumeric(field: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const clean = input.value.replace(/\D/g, '');
    input.value = clean;
    this.soatForm.get(field)!.setValue(clean, { emitEvent: false });
  }

  onlyAlpha(field: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const clean = input.value.replace(/[^a-zA-ZÁÉÍÓÚáéíóúÑñ\s]/g, '').toUpperCase();
    input.value = clean;
    this.soatForm.get(field)!.setValue(clean, { emitEvent: false });
  }

  // ── Validación visual ─────────────────────────────────────
  isInvalid(field: string): boolean {
    const ctrl = this.soatForm.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  getError(field: string): string {
    const ctrl = this.soatForm.get(field);
    if (!ctrl || !ctrl.errors || !(ctrl.dirty || ctrl.touched)) return '';
    const e = ctrl.errors;
    if (e['required'])     return 'Campo obligatorio';
    if (e['invalidPlate']) return 'Debe tener 6 caracteres alfanuméricos';
    if (e['futureDate'])   return 'No puede superar la fecha actual';
    if (e['alphaOnly'])    return 'Solo se permiten caracteres alfabéticos';
    if (e['email'])        return 'Correo electrónico inválido';
    if (e['pattern']) {
      if (field === 'documento') return 'Solo se permiten números';
      if (field === 'telefono')  return 'Debe tener exactamente 10 dígitos';
      if (field === 'precio')    return 'Solo se permiten números';
    }
    if (e['minlength']) return `Mínimo ${e['minlength'].requiredLength} caracteres`;
    return 'Campo inválido';
  }

  // ── Envío ─────────────────────────────────────────────────
  onSubmit(): void {
    this.soatForm.markAllAsTouched();
    if (this.soatForm.invalid) return;

    const raw = this.soatForm.getRawValue();

    const record: SoatData = {
      fechaInicio:     raw.fechaInicio,
      fechaFin:        raw.fechaFin,
      placa:           raw.placa.toUpperCase(),
      categoria:       raw.categoria,
      nombreApoderado: raw.nombreApoderado.toUpperCase(),
      tipoDocumento:   raw.tipoDocumento,
      documento:       raw.documento,
      telefono:        raw.telefono,
      correo:          raw.correo.toLowerCase(),
      aseguradora:     raw.aseguradora,
      precio:          raw.precio,
    };

    this.submitting = true;
    this.submitError = null;

    const request$ = this.mode === 'update'
      ? this.soatRegistrationService.updateSoat(record)
      : this.soatRegistrationService.registerSoat(record);

    request$.subscribe({
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

  onCancel(): void {
    this.soatForm.reset();
    this.searchPlate = '';
    this.formVisible = false;
    this.cancelled.emit();
  }

  onRectificarRunt(): void {
    console.log('Rectificar en RUNT:', this.soatForm.getRawValue().placa);
  }

  // ── Utilidades ────────────────────────────────────────────
  private formatDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
}
