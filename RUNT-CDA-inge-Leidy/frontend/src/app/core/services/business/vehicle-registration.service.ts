import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {Observable, of, tap, throwError} from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { OwnerHttpService } from '../owner-http.service';
import { VehicleHttpService } from '../vehicle-http.service';
import { TechnicalInspectionHttpService } from '../technical-inspection-http.service';

import { OwnerDTO } from '../../dto/owner.dto';
import { VehicleDTO } from '../../dto/vehicle.dto';
import { TechnicalInspectionDTO } from '../../dto/technical-inspection.dto';
import { DocumentType, VehicleCategory, RtmStatus } from '../../dto/enums';

import { FormularioData } from '../../../components/formulario-data/formulario-data.component';

@Injectable({ providedIn: 'root' })
export class VehicleRegistrationService {

  constructor(
    private ownerHttp: OwnerHttpService,
    private vehicleHttp: VehicleHttpService,
    private inspectionHttp: TechnicalInspectionHttpService,
  ) { }

  registerNewVehicle(formData: FormularioData): Observable<TechnicalInspectionDTO> {
    const ownerDto: OwnerDTO = {
      documentNumber: formData.documento,
      documentType: formData.tipoDocumento as DocumentType,
      fullName: formData.nombrePropietario,
      phone1: formData.telefono1,
      phone2: formData.telefono2,
    };



    return this.ownerHttp.create(ownerDto).pipe(
      switchMap(owner => {
        const vehicleDto: VehicleDTO = {
          plate: formData.placa,
          ownerId: owner.id!,
          category: formData.categoria as VehicleCategory,
          brand: formData.marca,
          modelYear: formData.modelo,
          line: formData.linea,
        };
        return this.vehicleHttp.create(vehicleDto);
      }),
      switchMap(vehicle => {
        const inspectionDto: TechnicalInspectionDTO = {
          vehiclePlate: vehicle.plate,
          validFrom: formData.fechaInicio,
          validUntil: formData.fechaFin,
          status: formData.estado as RtmStatus,
          origin: 'cliente',
          price: 0,
        };
        return this.inspectionHttp.create(inspectionDto);
      }),
    );
  }

  getFullVehicleData(plate: string): Observable<FormularioData> {
    return this.vehicleHttp.getByPlate(plate).pipe(
      tap(vehicle => console.log('VehicleDTO recibido:', vehicle)),
      switchMap((vehicle: VehicleDTO) =>
        this.ownerHttp.getById(vehicle.ownerId).pipe(
          tap(owner => console.log('OwnerDTO recibido:', owner)),
          switchMap((owner: OwnerDTO) =>
            this.inspectionHttp.getByPlate(plate).pipe(
              map((inspection: TechnicalInspectionDTO) => ({
                fechaInicio: inspection.validFrom,
                fechaFin: inspection.validUntil,
                placa: vehicle.plate,
                marca: vehicle.brand,
                modelo: vehicle.modelYear,
                linea: vehicle.line,
                categoria: vehicle.category,
                estado: inspection.status,
                tipoDocumento: owner.documentType,
                documento: owner.documentNumber,
                telefono1: owner.phone1,
                telefono2: owner.phone2,
                nombrePropietario: owner.fullName,
              } as FormularioData))
            )
          )
        )
      )
    );
  }

  updateFullRecord(data: FormularioData): Observable<TechnicalInspectionDTO> {

    return this.vehicleHttp.getByPlate(data.placa).pipe(

      switchMap(vehicle =>
        this.inspectionHttp.getByPlate(data.placa).pipe(
          map(inspection => ({ ownerId: vehicle.ownerId, inspection }))
        )
      ),

      switchMap(({ ownerId, inspection }) => {

        const ownerDto: OwnerDTO = {
          documentNumber: data.documento,
          documentType:   data.tipoDocumento as DocumentType,
          fullName:       data.nombrePropietario,
          phone1:         data.telefono1,
          phone2:         data.telefono2,
        };

        const inspectionDto: TechnicalInspectionDTO = {
          ...inspection,
          validFrom:  data.fechaInicio,
          validUntil: data.fechaFin,
          status:     data.estado as RtmStatus,
        };

        return this.ownerHttp.update(ownerId, ownerDto).pipe(
          switchMap(() => this.inspectionHttp.update(inspection.id!, inspectionDto))
        );
      })
    );
  }

  checkPlateExists(plate: string): Observable<boolean> {
    return this.vehicleHttp.existsByPlate(plate);
  }

  getByPlate(plate: string): Observable<VehicleDTO> {
    return this.vehicleHttp.getByPlate(plate);
  }


}
