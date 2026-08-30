import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { VehicleDTO } from '../core/dto/vehicle.dto';


@Injectable({ providedIn: 'root' })
export class VehicleService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/vehicles`;

  /** GET /api/vehicles */
  getAll(): Observable<VehicleDTO[]> {
    return this.http.get<VehicleDTO[]>(this.baseUrl);
  }

  /** GET /api/vehicles/exists/{plate} */
  existsByPlate(plate: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/exists/${plate}`);
  }

  /** GET /api/vehicles/{plate} */
  getByPlate(plate: string): Observable<VehicleDTO> {
    return this.http.get<VehicleDTO>(`${this.baseUrl}/${plate}`);
  }

  /** GET /api/vehicles/owner/{ownerId} */
  getByOwner(ownerId: number): Observable<VehicleDTO[]> {
    return this.http.get<VehicleDTO[]>(`${this.baseUrl}/owner/${ownerId}`);
  }

  /** POST /api/vehicles */
  create(dto: VehicleDTO): Observable<VehicleDTO> {
    return this.http.post<VehicleDTO>(this.baseUrl, dto);
  }

  /** PUT /api/vehicles/{plate} */
  update(plate: string, dto: VehicleDTO): Observable<VehicleDTO> {
    return this.http.put<VehicleDTO>(`${this.baseUrl}/${plate}`, dto);
  }

  /** DELETE /api/vehicles/{plate} */
  delete(plate: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${plate}`);
  }
}
