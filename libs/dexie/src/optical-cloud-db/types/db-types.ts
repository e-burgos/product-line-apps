export interface Budget {
  id?: string;
  title: string;
  description: string;
  totalAmount?: number;
}

export interface BudgetVariant {
  id?: string;
  budgetId: string;
  variantId: string;
  productId: string;
  title: string;
  description: string;
  quantity: number;
  amount: number;
}

export type Budgets = Budget[] | undefined;

export interface BudgetWithVariants extends Budget {
  count?: number;
  variants?: BudgetVariant[];
}

export interface Variant {
  id?: string;
  productId: string;
  title: string;
  description: string;
  amount: number;
}

export interface Product {
  id?: string;
  title: string;
  description: string;
}

export interface ProductWithVariants extends Product {
  count?: number;
  variants?: Variant[];
}

export type Products = Product[] | undefined;

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
}
export interface CustomerWithPrescriptions extends Customer {
  prescriptions: Prescription[];
}

export type Customers = Customer[] | undefined;

export interface CrystalSpecs {
  id?: string;
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
  id?: string;
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
  id?: string;
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
  id?: string;
  customerId: string;
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
  id?: string;
  date: string;
  description: string;
  customer: Customer;
  crystalSpecs: CrystalSpecs;
  prescriptionPayment: PrescriptionPayment;
  prescriptionDetail: PrescriptionDetail;
}
