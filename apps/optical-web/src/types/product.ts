export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: ProductCategory;
  brand: string;
  tags: string[];
  features: string[];
  specifications: Record<string, string>;
  variants: ProductVariant[];
  reviews: ProductReview[];
  rating: number;
  stock: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ProductCategory = 'sun' | 'prescription' | 'sports' | 'kids';

export interface ProductVariant {
  id: string;
  name: string;
  color: string;
  colorCode: string;
  frameSize: string;
  stock: number;
  images: string[];
}

export interface ProductReview {
  id: string;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  date: string;
}
