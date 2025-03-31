import { Product } from './product-db-types';

export interface Budget {
  id?: string;
  title: string;
  description: string;
  totalAmount?: number;
  detailsCount?: number;
  details?: BudgetDetail[];
}

export interface BudgetDetail {
  id?: string;
  budgetId: string;
  title: string;
  description: string;
  quantity: number;
  amount: number;
  productId: string;
  product?: Product;
}

export type Budgets = Budget[] | undefined;
