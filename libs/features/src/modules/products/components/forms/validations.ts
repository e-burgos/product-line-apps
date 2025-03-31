export interface AddProductFormData {
  title: string;
  description: string;
  amount: string;
  stock: string;
  status: 'active' | 'disabled';
}

export interface AddCategoryFormData {
  title: string;
  description: string;
}

export interface AddSubCategoryFormData {
  title: string;
  description: string;
  categoryId: string;
}
