
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


export interface VehicleResponse {
    plate: string;
    ownerId: number;
    ownerFullName: string;
    category: string;
    brand: string;
    modelYear: string;
    line: string;
}

@Injectable({ providedIn: 'root' })
export class VehicleService {

    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/vehicles`;

    /** GET /api/vehicles */
    getAll(): Observable<VehicleResponse[]> {
        return this.http.get<VehicleResponse[]>(this.baseUrl);
    }

    /** GET /api/vehicles/exists/{plate} */
    existsByPlate(plate: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.baseUrl}/exists/${plate}`);
    }

    /** GET /api/vehicles/{plate} */
    getByPlate(plate: string): Observable<VehicleResponse> {
        return this.http.get<VehicleResponse>(`${this.baseUrl}/${plate}`);
    }

    /** GET /api/vehicles/owner/{ownerId} */
    getByOwner(ownerId: number): Observable<VehicleResponse[]> {
        return this.http.get<VehicleResponse[]>(`${this.baseUrl}/owner/${ownerId}`);
    }

    /** POST /api/vehicles */
    create(dto: VehicleResponse): Observable<VehicleResponse> {
        return this.http.post<VehicleResponse>(this.baseUrl, dto);
    }

    /** PUT /api/vehicles/{plate} */
    update(plate: string, dto: VehicleResponse): Observable<VehicleResponse> {
        return this.http.put<VehicleResponse>(`${this.baseUrl}/${plate}`, dto);
    }

    /** DELETE /api/vehicles/{plate} */
    delete(plate: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${plate}`);
    }
}