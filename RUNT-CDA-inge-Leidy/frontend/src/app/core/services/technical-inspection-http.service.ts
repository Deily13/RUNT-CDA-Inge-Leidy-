import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TechnicalInspectionDTO } from '../dto/technical-inspection.dto';

@Injectable({ providedIn: 'root' })
export class TechnicalInspectionHttpService {
  private readonly baseUrl = `${environment.apiUrl}/inspections`;

  constructor(private http: HttpClient) {}

  create(dto: TechnicalInspectionDTO): Observable<TechnicalInspectionDTO> {
    return this.http.post<TechnicalInspectionDTO>(this.baseUrl, dto);
  }

  getByPlate(plate: string): Observable<TechnicalInspectionDTO> {
    return this.http.get<TechnicalInspectionDTO>(
      `${this.baseUrl}/vehicle/${plate}/latest`
    );
  }

  getAllByPlate(plate: string): Observable<TechnicalInspectionDTO[]> {
    return this.http.get<TechnicalInspectionDTO[]>(
      `${this.baseUrl}/vehicle/${plate}`
    );
  }

  update(id: number, dto: TechnicalInspectionDTO): Observable<TechnicalInspectionDTO> {
    return this.http.put<TechnicalInspectionDTO>(`${this.baseUrl}/${id}`, dto);
  }
}
