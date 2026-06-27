import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// Espejo exacto del JSON que devuelve OwnerDTO.java
export interface OwnerResponse {
    id: number;
    documentNumber: string;
    documentType: string;  // DocumentType enum (ej: "CC", "NIT")
    fullName: string;
    phone1: string;
    phone2: string;
}

@Injectable({ providedIn: 'root' })
export class OwnerService {

    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/owners`;

    /** GET /api/owners */
    getAll(): Observable<OwnerResponse[]> {
        return this.http.get<OwnerResponse[]>(this.baseUrl);
    }

    /** GET /api/owners/{id} */
    getById(id: number): Observable<OwnerResponse> {
        return this.http.get<OwnerResponse>(`${this.baseUrl}/${id}`);
    }

    /** GET /api/owners/document/{documentNumber} */
    getByDocument(documentNumber: string): Observable<OwnerResponse> {
        return this.http.get<OwnerResponse>(`${this.baseUrl}/document/${documentNumber}`);
    }

    /** POST /api/owners */
    create(dto: OwnerResponse): Observable<OwnerResponse> {
        return this.http.post<OwnerResponse>(this.baseUrl, dto);
    }

    /** PUT /api/owners/{id} */
    update(id: number, dto: OwnerResponse): Observable<OwnerResponse> {
        return this.http.put<OwnerResponse>(`${this.baseUrl}/${id}`, dto);
    }

    /** DELETE /api/owners/{id} */
    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
