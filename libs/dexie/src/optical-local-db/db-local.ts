import Dexie, { type Table } from 'dexie';
import {
  Budget,
  BudgetVariant,
  Customer,
  Prescription,
  Product,
  Variant,
} from '../optical-cloud-db/types/db-types';

export class OpticalLocalDB extends Dexie {
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

export const opticalLocalDB = new OpticalLocalDB();
