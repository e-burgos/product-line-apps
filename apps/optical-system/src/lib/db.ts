import Dexie, { type Table } from 'dexie';

export interface Budget {
  id?: number;
  title: string;
  description: string;
  totalAmount?: number;
}

export type Budgets = Budget[] | undefined;

export interface BudgetVariant {
  id?: number;
  budgetId: number;
  variantId: number;
  productId: number;
  title: string;
  description: string;
  quantity: number;
  amount: number;
}

export interface Product {
  id?: number;
  title: string;
  description: string;
  totalAmount?: number;
}

export type Products = Product[] | undefined;

export interface Variant {
  id?: number;
  productId: number;
  title: string;
  description: string;
  amount: number;
}

export interface Customer {
  id?: number;
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
}
export interface CustomerWithPrescriptions extends Customer {
  prescriptions: Prescription[];
}

export type Customers = Customer[] | undefined;

export interface CrystalSpecs {
  id?: number;
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
  id?: number;
  paymentMethod: string;
  cashDeposit: number;
  creditCardDeposit: number;
  creditCardType: string;
  creditCardNumber: number;
  creditCardInstallments: number;
  balanceAmount: number;
  totalAmount: number;
}

export interface PrescriptionDetail {
  id?: number;
  doctorName: string;
  frameDesc: string;
  framePrice: number;
  crystalDesc: string;
  crystalPrice: number;
  contactlensDesc: string;
  contactlensPrice: number;
  arrangementDesc: string;
  arrangementPrice: number;
  subtotalAmount: number;
}

export interface Prescription {
  id?: number;
  customerId: number;
  receiptNumber: number;
  date: string;
  description: string;
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
  doctorName: string;
  frameDesc: string;
  crystalDesc: string;
  contactlensDesc: string;
  arrangementDesc: string;
  framePrice: number;
  crystalPrice: number;
  contactlensPrice: number;
  arrangementPrice: number;
  subtotalAmount: number;
  paymentMethod: string;
  cashDeposit: number;
  creditCardDeposit: number;
  creditCardType: string;
  creditCardNumber: number;
  creditCardInstallments: number;
  balanceAmount: number;
  totalAmount: number;
}

export interface PrescriptionFullData {
  id?: number;
  date: string;
  description: string;
  customer: Customer;
  crystalSpecs: CrystalSpecs;
  prescriptionPayment: PrescriptionPayment;
  prescriptionDetail: PrescriptionDetail;
}

export class ProductDatabase extends Dexie {
  products!: Table<Product>;
  variants!: Table<Variant>;
  budgets!: Table<Budget>;
  budgetVariants!: Table<BudgetVariant>;
  customers!: Table<Customer>;
  prescriptions!: Table<Prescription>;

  constructor() {
    super('OpticalDB');
    this.version(1).stores({
      products: '++id, title',
      variants: '++id, productId, title',
      budgets: '++id, title',
      budgetVariants: '++id, budgetId, productId, variantId, title',
      customers: '++id, name, lastName',
      prescriptions: '++id, receiptNumber, customerId',
    });
  }
}

export const db = new ProductDatabase();
