import Dexie from 'dexie';
import dexieCloud, { DexieCloudTable } from 'dexie-cloud-addon';
import {
  Budget,
  BudgetVariant,
  Customer,
  Prescription,
  Product,
  Variant,
} from './types/db-types';
import { dexieDbUrl } from '@optical-system-app/utils/const';

export class OpticalCloudDB extends Dexie {
  products!: DexieCloudTable<Product, 'id'>;
  variants!: DexieCloudTable<Variant, 'id'>;
  budgets!: DexieCloudTable<Budget, 'id'>;
  budgetVariants!: DexieCloudTable<BudgetVariant, 'id'>;
  customers!: DexieCloudTable<Customer, 'id'>;
  prescriptions!: DexieCloudTable<Prescription, 'id'>;

  constructor() {
    super('OpticalCloudDB', { addons: [dexieCloud], cache: 'immutable' });

    this.version(14).stores({
      products: 'id, title',
      variants: 'id, productId, title',
      budgets: 'id, title',
      budgetVariants: 'id, budgetId, productId, variantId, title',
      customers: 'id, name, lastName',
      prescriptions: 'id, receiptNumber, customerId',
    });

    this.cloud.configure({
      databaseUrl: dexieDbUrl,
      tryUseServiceWorker: true,
      requireAuth: true,
      customLoginGui: true,
      periodicSync: {
        minInterval: 60000 * 5,
      },
    });
  }
}

export const db = new OpticalCloudDB();
