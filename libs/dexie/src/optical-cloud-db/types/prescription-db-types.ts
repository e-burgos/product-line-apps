import { Customer } from './customer-db-types';
import { Product } from './product-db-types';

export interface PrescriptionCrystalSpecs {
  prescriptionId?: string;
  nearRightSphere: string;
  nearRightCylinder: string;
  nearRightAxis: string;
  nearLeftSphere: string;
  nearLeftCylinder: string;
  nearLeftAxis: string;
  farRightSphere: string;
  farRightCylinder: string;
  farRightAxis: string;
  farLeftSphere: string;
  farLeftCylinder: string;
  farLeftAxis: string;
}

export interface PrescriptionPayment {
  prescriptionId?: string;
  paymentMethod: string;
  cashDeposit: number;
  creditCardDeposit: number;
  creditCardType: string;
  creditCardNumber: number;
  creditCardInstallments: number;
}

export interface PrescriptionDetail {
  prescriptionId?: string;
  doctorName: string;
  frameDesc: string;
  framePrice: number;
  crystalDesc: string;
  crystalPrice: number;
  contactLensDesc: string;
  contactLensPrice: number;
  arrangementDesc: string;
  arrangementPrice: number;
  products: Product[];
  subtotalAmount: number;
}

export interface PrescriptionBaseData {
  id?: string;
  receiptNumber: number;
  date: string;
  description: string;
  balanceAmount: number;
  totalAmount: number;
}

export interface Prescription extends PrescriptionBaseData {
  customer?: Customer;
  crystalSpecs?: PrescriptionCrystalSpecs;
  prescriptionPayment?: PrescriptionPayment;
  prescriptionDetail?: PrescriptionDetail;
}

// export interface Prescription {
//   id?: string;
//   customerId: string;
//   receiptNumber: number;
//   date: string;
//   description: string;
//   nearRightSphere: string;
//   nearRightCylinder: string;
//   nearRightAxis: string;
//   nearLeftSphere: string;
//   nearLeftCylinder: string;
//   nearLeftAxis: string;
//   farRightSphere: string;
//   farRightCylinder: string;
//   farRightAxis: string;
//   farLeftSphere: string;
//   farLeftCylinder: string;
//   farLeftAxis: string;
//   doctorName: string;
//   frameDesc: string;
//   crystalDesc: string;
//   contactLensDesc: string;
//   arrangementDesc: string;
//   framePrice: number;
//   crystalPrice: number;
//   contactLensPrice: number;
//   arrangementPrice: number;
//   subtotalAmount: number;
//   paymentMethod: string;
//   cashDeposit: number;
//   creditCardDeposit: number;
//   creditCardType: string;
//   creditCardNumber: number;
//   creditCardInstallments: number;
//   balanceAmount: number;
//   totalAmount: number;
// }
