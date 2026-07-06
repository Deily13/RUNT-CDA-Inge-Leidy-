import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MensajeCardComponent } from '../mensaje/mensaje.component';

@Component({
  selector: 'app-reportar',
  templateUrl: './reportar.component.html',
  styleUrls: ['./reportar.component.css'],
  imports: [FormsModule, MensajeCardComponent],
})
export class ReportarComponent {
  // Propiedad enlazada al input

  searchPlate: string = '';

  // Método llamado al cambiar el input
  onSearchChange(value: string) {
    console.log('Placa buscada:', value);
  }

  // Método para limpiar el campo
  clearSearch() {
    this.searchPlate = '';
  }

  // Método para ejecutar la búsqueda
  searchVehicle() {
    console.log('Buscando vehículo con placa:', this.searchPlate);
    // Aquí podrías llamar a un servicio o API
  }
}
