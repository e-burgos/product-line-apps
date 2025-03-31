import { Prescription } from './prescription-db-types';

export interface Customer {
  id?: string;
  name: string;
  lastName: string;
  birthDate?: string;
  address?: string;
  postalCode?: string;
  province?: string;
  locality?: string;
  phone?: string;
  mobile?: string;
  email: string;
  comments?: string;
  prescriptions: Prescription[];
}

export type Customers = Customer[] | undefined;
