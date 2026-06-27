import { DocumentType } from './enums';

export interface OwnerDTO {
  id?: number;
  documentNumber: string;
  documentType: DocumentType;
  fullName: string;
  phone1: string;
  phone2?: string;
}
