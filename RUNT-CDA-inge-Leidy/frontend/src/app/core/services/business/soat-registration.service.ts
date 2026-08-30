import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SoatData } from '../../../components/soat/soat.component';

// ── DTOs de request/response ──────────────────────────────────

/**
 * Payload que se envía al backend al crear o actualizar un SOAT.
 * Los campos coinciden 1:1 con SoatData; se tipan explícitamente
 * para que el compilador detecte cambios en la interfaz.
 */
export interface SoatRequestDTO {
  fechaInicio:     string;   // 'YYYY-MM-DD'
  fechaFin:        string;   // 'YYYY-MM-DD'  (calculado en frontend, enviado al backend)
  placa:           string;   // 6 chars, ej. 'ABC123'
  categoria:       string;   // 'MOTOCICLETA' | 'AUTOMOVIL' | ...
  nombreApoderado: string;
  tipoDocumento:   string;   // 'CC' | 'NIT'
  documento:       string;
  telefono:        string;   // 10 dígitos
  correo:          string;
  aseguradora:     string;   // 'SURA' | 'BOLIVAR' | ...
  precio:          string;   // numérico como string
}

/**
 * Respuesta genérica del backend para operaciones de escritura.
 */
export interface ApiResponse<T = void> {
  success: boolean;
  message?: string;
  data?: T;
}

@Injectable({
  providedIn: 'root',
})
export class SoatRegistrationService {

  // ── URL base — ajusta según tu ambiente ──────────────────
  private readonly BASE_URL = 'http://localhost:8080/api';

  // Endpoints
  private readonly SOAT_URL    = `${this.BASE_URL}/soat`;
  private readonly VEHICLE_URL = `${this.BASE_URL}/vehicles`;

  constructor(private http: HttpClient) {}

  // ── 1. Verificar existencia de placa en el sistema ───────
  /**
   * Llama a GET /api/vehicles/exists/{plate}
   * Retorna true si la placa ya tiene un vehículo registrado.
   * Usado en modo 'create' para confirmar que el vehículo existe
   * antes de registrar su SOAT.
   */
  checkPlateExists(plate: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.VEHICLE_URL}/exists/${plate.toUpperCase()}`
    );
  }

  // ── 2. Obtener SOAT existente por placa ──────────────────
  /**
   * Llama a GET /api/soat/{plate}
   * Retorna los datos completos del SOAT asociado a esa placa.
   * Usado en modo 'update' para pre-poblar el formulario.
   */
  getFullSoatData(plate: string): Observable<SoatData> {
    return this.http
      .get<SoatRequestDTO>(`${this.SOAT_URL}/${plate.toUpperCase()}`)
      .pipe(
        map(dto => this.mapDtoToSoatData(dto))
      );
  }

  // ── 3. Registrar nuevo SOAT ───────────────────────────────
  /**
   * Llama a POST /api/soat
   * Crea un nuevo registro SOAT en el backend.
   */
  registerSoat(data: SoatData): Observable<void> {
    const payload: SoatRequestDTO = this.mapSoatDataToDto(data);
    return this.http.post<void>(this.SOAT_URL, payload);
  }

  // ── 4. Actualizar SOAT existente ──────────────────────────
  /**
   * Llama a PUT /api/soat/{plate}
   * Actualiza el SOAT de un vehículo ya registrado.
   */
  updateSoat(data: SoatData): Observable<void> {
    const payload: SoatRequestDTO = this.mapSoatDataToDto(data);
    return this.http.put<void>(
      `${this.SOAT_URL}/${data.placa.toUpperCase()}`,
      payload
    );
  }

  // ── Mappers internos ──────────────────────────────────────

  /**
   * Convierte SoatData (modelo del formulario) → SoatRequestDTO (payload HTTP).
   * Centraliza cualquier transformación de nombres de campo o formato.
   */
  private mapSoatDataToDto(data: SoatData): SoatRequestDTO {
    return {
      fechaInicio:     data.fechaInicio,
      fechaFin:        data.fechaFin,
      placa:           data.placa.toUpperCase(),
      categoria:       data.categoria,
      nombreApoderado: data.nombreApoderado.toUpperCase(),
      tipoDocumento:   data.tipoDocumento,
      documento:       data.documento,
      telefono:        data.telefono,
      correo:          data.correo.toLowerCase(),
      aseguradora:     data.aseguradora,
      precio:          data.precio,
    };
  }

  /**
   * Convierte SoatRequestDTO (respuesta HTTP) → SoatData (modelo del formulario).
   */
  private mapDtoToSoatData(dto: SoatRequestDTO): SoatData {
    return {
      fechaInicio:     dto.fechaInicio,
      fechaFin:        dto.fechaFin,
      placa:           dto.placa,
      categoria:       dto.categoria,
      nombreApoderado: dto.nombreApoderado,
      tipoDocumento:   dto.tipoDocumento,
      documento:       dto.documento,
      telefono:        dto.telefono,
      correo:          dto.correo,
      aseguradora:     dto.aseguradora,
      precio:          dto.precio,
    };
  }
}
