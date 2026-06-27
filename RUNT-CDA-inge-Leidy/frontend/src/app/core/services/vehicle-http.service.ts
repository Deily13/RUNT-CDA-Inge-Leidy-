import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { VehicleDTO } from '../dto/vehicle.dto';

@Injectable({ providedIn: 'root' })
export class VehicleHttpService {
  private readonly baseUrl = `${environment.apiUrl}/vehicles`;

  constructor(private http: HttpClient) { }

  create(dto: VehicleDTO): Observable<VehicleDTO> {
    return this.http.post<VehicleDTO>(this.baseUrl, dto);
  }

  existsByPlate(plate: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/exists/${plate}`);
  }

  getByPlate(plate: string): Observable<VehicleDTO> {
    return this.http.get<VehicleDTO>(`${this.baseUrl}/${plate}`);
  }

  update(vehicle: VehicleDTO): Observable<VehicleDTO> {
    return this.http.put<VehicleDTO>(`${this.baseUrl}/${vehicle.plate}`, vehicle);
  }


}
