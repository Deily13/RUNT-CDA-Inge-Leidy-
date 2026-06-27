import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OwnerDTO } from '../dto/owner.dto';

@Injectable({ providedIn: 'root' })
export class OwnerHttpService {
  private readonly baseUrl = `${environment.apiUrl}/owners`;

  constructor(private http: HttpClient) {}

  create(dto: OwnerDTO): Observable<OwnerDTO> {
    return this.http.post<OwnerDTO>(this.baseUrl, dto);
  }

  getById(id: number): Observable<OwnerDTO> {
    return this.http.get<OwnerDTO>(`${this.baseUrl}/${id}`);
  }

  update(id: number, dto: OwnerDTO): Observable<OwnerDTO> {
    return this.http.put<OwnerDTO>(`${this.baseUrl}/${id}`, dto);
  }

}
