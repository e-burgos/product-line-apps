export type ProductStatus = 'active' | 'disabled';

export interface Product {
  id?: string;
  title: string;
  description: string;
  amount: number;
  status: ProductStatus;
  stock: number;
  category: ProductCategory;
  subcategory?: ProductSubCategory | undefined;
}

export interface ProductCategory {
  id?: string;
  title: string;
  description: string;
  subcategories?: ProductSubCategory[];
}

export interface ProductSubCategory {
  id?: string;
  title: string;
  description: string;
  categoryId: string;
  category?: ProductCategory;
}

export type ProductCategories = ProductCategory[] | [];

export type Products = Product[] | undefined;
