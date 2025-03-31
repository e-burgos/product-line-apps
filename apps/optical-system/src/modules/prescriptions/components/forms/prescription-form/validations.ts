export interface PrescriptionFormData {
  // Prescription data
  date: string;
  receiptNumber: number;
  balanceAmount: number;
  totalAmount: number;
  description: string;

  // Eye specs data
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

  // Detail data
  doctorName: string;
  frameDesc: string;
  framePrice: number;
  crystalDesc: string;
  crystalPrice: number;
  contactLensDesc: string;
  contactLensPrice: number;
  arrangementDesc: string;
  arrangementPrice: number;
  subtotalAmount: number;

  // Payment data
  paymentMethod: string;
  cashDeposit: number;
  creditCardDeposit: number;
  creditCardType: string;
  creditCardNumber: number;
  creditCardInstallments: number;
}
