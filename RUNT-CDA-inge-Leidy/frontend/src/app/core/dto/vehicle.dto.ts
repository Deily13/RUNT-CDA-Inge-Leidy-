import { VehicleCategory } from './enums';

export interface VehicleDTO {
  plate: string;
  ownerId: number;
  ownerFullName?: string;
  category: VehicleCategory;
  brand: string;
  modelYear: string;
  line: string;
}
