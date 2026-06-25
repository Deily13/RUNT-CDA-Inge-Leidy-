import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusquedaService } from '../../services/busqueda.service';

export const STATUS_MAP: Record<string, { label: string; color: string }> = {
  inedito:     { label: 'Inédito',     color: '#808080' },
  vencido:     { label: 'Vencido',     color: '#FF0000' },
  reportado:   { label: 'Reportado',   color: '#FFCD29' },
  ingresado:   { label: 'Ingresado',   color: '#26EEDD' },
  actualizado: { label: 'Actualizado', color: '#10B981' },
  declinado:   { label: 'Declinado',   color: '#B129FF' },
};

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

@Component({
  selector: 'tabla-registro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-registro.component.html',
  styleUrls: ['./tabla-registro.component.css'],
})
export class TablaRegistroComponent implements OnInit {

  private readonly busquedaService = inject(BusquedaService);

  // ── Señales expuestas al template ─────────────────────────────────────────
  readonly registros = this.busquedaService.registros;
  readonly cargando  = this.busquedaService.cargando;
  readonly error     = this.busquedaService.error;
  readonly realizada = this.busquedaService.realizada;

  // ── Paginación ────────────────────────────────────────────────────────────
  readonly pageSize = 10;
  currentPage       = 1;

  // ── Modales ───────────────────────────────────────────────────────────────
  // IMPORTANTE: Registro.id es number, NO string
  pendingDeleteId: number | null = null;
  showModalEmpty                 = false;
  showModalDelete                = false;

  readonly totalPages = computed(() =>
    Math.ceil(this.registros().length / this.pageSize)
  );

  readonly pagedRecords = computed(() => {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.registros().slice(start, start + this.pageSize);
  });

  readonly paginationInfo = computed(() => {
    const total = this.registros().length;
    if (total === 0) return 'Sin resultados';
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end   = Math.min(this.currentPage * this.pageSize, total);
    return `Mostrando ${start} a ${end} de ${total} resultados`;
  });

  readonly visiblePages = computed(() => {
    const max   = 5;
    const total = this.totalPages();
    let s = Math.max(1, this.currentPage - 2);
    let e = Math.min(total, s + max - 1);
    if (e - s < max - 1) s = Math.max(1, e - max + 1);
    return Array.from({ length: e - s + 1 }, (_, i) => s + i);
  });

  ngOnInit(): void {
    this.busquedaService.cargarDesdeEstado();
  }

  // ── Helpers visuales ──────────────────────────────────────────────────────
  getStatusLabel(estado: string): string {
    return STATUS_MAP[estado?.toLowerCase()]?.label ?? estado;
  }

  getStatusStyle(estado: string): Record<string, string> {
    const color = STATUS_MAP[estado?.toLowerCase()]?.color ?? '#808080';
    return { color, backgroundColor: hexToRgba(color, 0.20) };
  }

  getStatusDotColor(estado: string): string {
    return STATUS_MAP[estado?.toLowerCase()]?.color ?? '#808080';
  }

  // ── Paginación ────────────────────────────────────────────────────────────
  goPage(page: number): void {
    const total = this.totalPages();
    if (page < 1 || page > total) return;
    this.currentPage = page;
  }

  // ── Acciones de fila ──────────────────────────────────────────────────────
  // IMPORTANTE: reciben number (id), NO string (plate)
  handleEdit(id: number): void {
    console.log('Editar:', id);
  }

  handleManage(id: number): void {
    console.log('Gestionar:', id);
  }

  openDeleteModal(id: number): void {
    this.pendingDeleteId = id;
    this.showModalDelete = true;
  }

  confirmDelete(): void {
    if (this.pendingDeleteId === null) return;
    this.busquedaService.eliminar(this.pendingDeleteId);
    this.pendingDeleteId = null;
    this.showModalDelete = false;
    if (this.currentPage > this.totalPages() && this.totalPages() > 0) {
      this.currentPage = this.totalPages();
    }
    if (this.registros().length === 0) this.showModalEmpty = true;
  }

  cancelDelete(): void {
    this.pendingDeleteId = null;
    this.showModalDelete = false;
  }
}
