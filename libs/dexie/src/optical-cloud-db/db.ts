import Dexie from 'dexie';
import dexieCloud, { DexieCloudTable } from 'dexie-cloud-addon';
import {
  Product,
  ProductCategory,
  ProductSubCategory,
  Budget,
  BudgetDetail,
  Customer,
  Prescription,
} from './types/db-types';
import { dexieDbUrl } from './const';

export class OpticalCloudDB extends Dexie {
  products!: DexieCloudTable<Product, 'id'>;
  productCategories!: DexieCloudTable<ProductCategory, 'id'>;
  productSubCategories!: DexieCloudTable<ProductSubCategory, 'id'>;
  budgets!: DexieCloudTable<Budget, 'id'>;
  budgetDetails!: DexieCloudTable<BudgetDetail, 'id'>;
  customers!: DexieCloudTable<Customer, 'id'>;
  prescriptions!: DexieCloudTable<Prescription, 'id'>;

  constructor() {
    super('OpticalCloudDB', {
      addons: [dexieCloud],
      //cache: 'immutable'
    });

    this.version(1).stores({
      products: 'id, title',
      productCategories: 'id, title',
      productSubCategories: 'id, title, categoryId',
      budgets: 'id, title',
      budgetDetails: 'id, budgetId, title, productId',
      customers: 'id, name, lastName',
      prescriptions: 'id, receiptNumber',
      realms: '@realmId',
      members: '@id,[realmId+email]',
      roles: '[realmId+name]',
    });

    this.cloud.configure({
      databaseUrl: dexieDbUrl,
      tryUseServiceWorker: true,
      requireAuth: true,
      customLoginGui: true,
      disableEagerSync: false,
      disableWebSocket: false,
      periodicSync: {
        minInterval: 60000 * 5,
      },
    });
  }
}

export const db = new OpticalCloudDB();
