import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PanelBusqueda } from '../components/panel-busqueda/panel-busqueda.component';

const MESES = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre',
];

export interface InspectionResponse {
  id:           number;
  vehiclePlate: string;
  vehicleInfo:  string;
  validFrom:    string;
  validUntil:   string;
  status:       string;
  origin:       string;
  price:        number;
  discount:     number;
}

@Injectable({ providedIn: 'root' })
export class InspectionService {

  private readonly http    = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/inspections`;

  /** GET /api/inspections */
  getAll(): Observable<InspectionResponse[]> {
    return this.http.get<InspectionResponse[]>(this.baseUrl);
  }

  /** GET /api/inspections/{id} */
  getById(id: number): Observable<InspectionResponse> {
    return this.http.get<InspectionResponse>(`${this.baseUrl}/${id}`);
  }

  /** GET /api/inspections/vehicle/{plate} */
  getByVehicle(plate: string): Observable<InspectionResponse[]> {
    return this.http.get<InspectionResponse[]>(`${this.baseUrl}/vehicle/${plate}`);
  }

  /** GET /api/inspections/vehicle/{plate}/latest */
  getLatestByVehicle(plate: string): Observable<InspectionResponse> {
    return this.http.get<InspectionResponse>(`${this.baseUrl}/vehicle/${plate}/latest`);
  }

  /** GET /api/inspections/search?params */
  search(filtros: PanelBusqueda): Observable<InspectionResponse[]> {
    return this.http.get<InspectionResponse[]>(
      `${this.baseUrl}/search`,
      { params: this._buildParams(filtros) }
    );
  }

  /** POST /api/inspections */
  create(dto: InspectionResponse): Observable<InspectionResponse> {
    return this.http.post<InspectionResponse>(this.baseUrl, dto);
  }

  /** PUT /api/inspections/{id} */
  update(id: number, dto: InspectionResponse): Observable<InspectionResponse> {
    return this.http.put<InspectionResponse>(`${this.baseUrl}/${id}`, dto);
  }

  /** DELETE /api/inspections/{id} */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // ── Privado ───────────────────────────────────────────────────────────────

  private _buildParams(f: PanelBusqueda): HttpParams {
    let params = new HttpParams();

    if (f.categoria?.trim())       params = params.set('categoria',       f.categoria.trim());
    if (f.estados?.length)         params = params.set('estado',          f.estados.join(','));
    if (f.numeroDocumento?.trim()) params = params.set('numeroDocumento', f.numeroDocumento.trim());
    if (f.tipoDocumento?.trim())   params = params.set('tipoDocumento',   f.tipoDocumento.trim());
    if (f.fecha?.trim())           params = params.set('fecha',           f.fecha.trim());
    if (f.placa?.trim())           params = params.set('placa',           f.placa.trim());
    if (f.mes?.trim()) {
      const mesNum = MESES.indexOf(f.mes) + 1;
      if (mesNum > 0)              params = params.set('mes',             String(mesNum));
    }
    if (f.anio?.trim())            params = params.set('anio',            f.anio.trim());

    return params;
  }
}
