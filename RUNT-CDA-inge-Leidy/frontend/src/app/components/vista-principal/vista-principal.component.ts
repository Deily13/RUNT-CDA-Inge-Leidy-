import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vista-principal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-principal.component.html',
  styleUrls: ['./vista-principal.component.css']
})
export class VistaPrincipal {

  constructor(private router: Router) { }

  onSearch(): void {
    this.router.navigate(['/base/panel-busqueda']);
  }

  onNew(): void {
    this.router.navigate(['/base/formulario-data/nuevo']);
  }

  onUpdate(): void {
    this.router.navigate(['/base/formulario-data/actualizar']);
  }

  onVerReporte(): void {
    // this.router.navigate(['/base/reporte-mensual']);
  }

  onRegistrosPendientes(): void {
    // this.router.navigate(['/base/registros-pendientes']);
  }
}