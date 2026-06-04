import { Component, OnInit } from '@angular/core';

export interface Registro {
  id: number;
  fechaInicio: string;
  fechaFin: string;
  placa: string;
  estado: string;
  documento: string;
  tipoDoc: string;
  categoria: string;
  linea: string;
  propietario: string;
  telefono: string;
}


export const STATUS_MAP: Record<string, { label: string; color: string }> = {
  inedito: { label: 'Inédito', color: '#808080' },
  vencido: { label: 'Vencido', color: '#FF0000' },
  reportado: { label: 'Reportado', color: '#FFCD29' },
  ingresado: { label: 'Ingresado', color: '#26EEDD' },
  actualizado: { label: 'Actualizado', color: '#10B981' },
  declinado: { label: 'Declinado', color: '#B129FF' },
};

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

@Component({
  selector: 'app-registros-consultados',
  templateUrl: './registros-consultados.component.html',
  styleUrls: ['./registros-consultados.component.css'],
})
export class RegistrosConsultadosComponent implements OnInit {

  allRecords: Registro[] = [
    { id: 1, fechaInicio: '2023-10-24', fechaFin: '2024-10-24', placa: 'KLT 456', estado: 'actualizado', documento: '1020456789', tipoDoc: 'CC', categoria: 'Automóvil', linea: 'Sedan', propietario: 'Carlos Arturo Perez', telefono: '310 456 7890' },
    { id: 2, fechaInicio: '2023-10-22', fechaFin: '2024-10-22', placa: 'MNO 980', estado: 'vencido', documento: '800123456-1', tipoDoc: 'NIT', categoria: 'Camión', linea: 'Carga', propietario: 'Logística Integral S.A.S', telefono: '300 111 2233' },
    { id: 3, fechaInicio: '2023-10-21', fechaFin: '2024-10-21', placa: 'XYZ 123', estado: 'inedito', documento: '52456789', tipoDoc: 'CC', categoria: 'Motocicleta', linea: 'Sport', propietario: 'Martha Lucia Gomez', telefono: '315 999 8877' },
    { id: 4, fechaInicio: '2023-09-15', fechaFin: '2024-09-15', placa: 'ABC 789', estado: 'reportado', documento: '80345678', tipoDoc: 'CC', categoria: 'Automóvil', linea: 'SUV', propietario: 'Juan Diego Torres', telefono: '312 345 6789' },
    { id: 5, fechaInicio: '2023-08-10', fechaFin: '2024-08-10', placa: 'DEF 321', estado: 'declinado', documento: '900112233-2', tipoDoc: 'NIT', categoria: 'Bus', linea: 'Colectivo', propietario: 'Transporte Rápido SAS', telefono: '601 234 5678' },
    { id: 6, fechaInicio: '2023-07-05', fechaFin: '2024-07-05', placa: 'GHI 654', estado: 'ingresado', documento: '71234567', tipoDoc: 'CC', categoria: 'Camioneta', linea: 'Pick-Up', propietario: 'Alejandro Ríos', telefono: '313 678 9012' },
    { id: 7, fechaInicio: '2023-06-20', fechaFin: '2024-06-20', placa: 'JKL 987', estado: 'actualizado', documento: '45678901', tipoDoc: 'CE', categoria: 'Automóvil', linea: 'Hatchback', propietario: 'Maria Fernanda Silva', telefono: '318 456 1234' },
    { id: 8, fechaInicio: '2023-05-12', fechaFin: '2024-05-12', placa: 'MNP 135', estado: 'reportado', documento: '60234567', tipoDoc: 'CC', categoria: 'Motocicleta', linea: 'Enduro', propietario: 'Pedro Alonso Gutiérrez', telefono: '316 789 3456' },
    { id: 9, fechaInicio: '2023-04-08', fechaFin: '2024-04-08', placa: 'QRS 246', estado: 'vencido', documento: '850012345-1', tipoDoc: 'NIT', categoria: 'Camión', linea: 'Volqueta', propietario: 'Constructora Pico S.A', telefono: '604 987 6543' },
    { id: 10, fechaInicio: '2023-03-01', fechaFin: '2024-03-01', placa: 'TUV 369', estado: 'inedito', documento: '32109876', tipoDoc: 'CC', categoria: 'Automóvil', linea: 'Sedán', propietario: 'Luisa Marcela Vargas', telefono: '311 222 3344' },
    { id: 11, fechaInicio: '2023-02-14', fechaFin: '2024-02-14', placa: 'WXY 482', estado: 'ingresado', documento: '19876543', tipoDoc: 'CC', categoria: 'Taxi', linea: 'Sedán', propietario: 'Rodrigo Castillo', telefono: '317 554 7788' },
    { id: 12, fechaInicio: '2023-01-07', fechaFin: '2024-01-07', placa: 'ZAB 591', estado: 'declinado', documento: '75123456', tipoDoc: 'CC', categoria: 'Motocicleta', linea: 'Scooter', propietario: 'Valentina Herrera', telefono: '319 665 8899' },
  ];

  readonly pageSize = 10;
  currentPage = 1;
  pendingDeleteId: number | null = null;
  showModalEmpty = false;
  showModalDelete = false;

  get totalPages(): number {
    return Math.ceil(this.allRecords.length / this.pageSize);
  }

  get pagedRecords(): Registro[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.allRecords.slice(start, start + this.pageSize);
  }

  get paginationInfo(): string {
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, this.allRecords.length);
    return `Mostrando ${start} a ${end} de ${this.allRecords.length} resultados`;
  }

  get visiblePages(): number[] {
    const max = 5;
    let s = Math.max(1, this.currentPage - 2);
    let e = Math.min(this.totalPages, s + max - 1);
    if (e - s < max - 1) s = Math.max(1, e - max + 1);
    return Array.from({ length: e - s + 1 }, (_, i) => s + i);
  }

  ngOnInit(): void {
    if (this.allRecords.length === 0) this.showModalEmpty = true;
  }


  getStatusLabel(estado: string): string {
    return STATUS_MAP[estado.toLowerCase()]?.label ?? estado;
  }

  getStatusStyle(estado: string): Record<string, string> {
    const key = estado.toLowerCase();
    const color = STATUS_MAP[key]?.color ?? '#808080';
    return {
      color: color,
      backgroundColor: hexToRgba(color, 0.20),
    };
  }

  getStatusDotColor(estado: string): string {
    return STATUS_MAP[estado.toLowerCase()]?.color ?? '#808080';
  }

  goPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  handleEdit(id: number): void {
    console.log('Editar registro:', id);
    // this.router.navigate(['/registros/editar', id]);
  }

  handleManage(id: number): void {
    console.log('Gestionar registro:', id);
    // this.router.navigate(['/registros/gestionar', id]);
  }

  openDeleteModal(id: number): void {
    this.pendingDeleteId = id;
    this.showModalDelete = true;
  }

  confirmDelete(): void {
    if (this.pendingDeleteId === null) return;
    this.allRecords = this.allRecords.filter(r => r.id !== this.pendingDeleteId);
    this.pendingDeleteId = null;
    this.showModalDelete = false;
    if (this.currentPage > this.totalPages && this.totalPages > 0) this.currentPage = this.totalPages;
    if (this.allRecords.length === 0) this.showModalEmpty = true;
  }

  cancelDelete(): void {
    this.pendingDeleteId = null;
    this.showModalDelete = false;
  }
}