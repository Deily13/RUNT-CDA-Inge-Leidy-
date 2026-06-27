import { RtmStatus, Origin } from './enums';

export interface TechnicalInspectionDTO {
  id?: number;
  vehiclePlate: string;
  vehicleInfo?: string;
  validFrom: string;
  validUntil: string;
  status: RtmStatus;
  origin: Origin;
  price: number;
  discount?: number;
}
