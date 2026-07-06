import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MensajeRevisionData {
  placa: string;
  fecha: string;
  categoria: string;
  precio: string;
  descuento: string;
  imagenUrl: string;
  direccion: string;
  telefono?: string;
  horario: {
    semana: string;
    sabado: string;
    domingoFestivo: string;
  };
}

@Component({
  selector: 'app-mensaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeCardComponent {
  @Input() data: MensajeRevisionData = {
    placa: 'ABC123',
    fecha: '15 de julio de 2026',
    categoria: 'Vehículo Particular',
    precio: '85.000',
    descuento: '10% adicional',
    imagenUrl: 'assets/img/cda-llano-verde.jpg',
    direccion: 'Carrera 33 #23-57, Barrio San Benito, Villavicencio, Meta 500004',
    horario: {
      semana: '7am–7pm',
      sabado: '8am–5pm',
      domingoFestivo: '8am–1pm'
    }
  };

  mensajeCopiado = false;
  descuentoCopiado = false;

  get mensajePrincipal(): string {
    return `Hola 👋, soy la Ing. Leidy del CDA Llano Verde – Tecno-mecánica.

Queremos recordarte que la Revisión Técnico-Mecánica de tu vehículo de placa ${this.data.placa} venció el ${this.data.fecha}.

✅${this.data.categoria}: $${this.data.precio}

🕐 Lunes a viernes: ${this.data.horario.semana} | Sábados: ${this.data.horario.sabado} | Domingos y festivos: ${this.data.horario.domingoFestivo}
📍 ${this.data.direccion}

¡No lo dejes para última hora!`;
  }

  get mensajeDescuento(): string {
    return `⚠️Importante:
📞 Llama antes de ingresar al CDA y obtén tu descuento especial
✅ *Descuentos:*
${this.data.categoria}: ${this.data.descuento}`;
  }

  copiarMensaje(): void {
    navigator.clipboard.writeText(this.mensajePrincipal).then(() => {
      this.mensajeCopiado = true;
      setTimeout(() => (this.mensajeCopiado = false), 2000);
    });
  }

  copiarDescuento(): void {
    navigator.clipboard.writeText(this.mensajeDescuento).then(() => {
      this.descuentoCopiado = true;
      setTimeout(() => (this.descuentoCopiado = false), 2000);
    });
  }
}