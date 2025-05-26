import { create } from 'zustand';
import { Product } from '../types/product';

interface ProductStore {
  products: Product[];
  filteredProducts: Product[];
  sortBy: string;
  brands: string[];
  selectedBrands: string[];
  priceRange: [number, number];
  searchQuery: string;
  setProducts: (products: Product[]) => void;
  setFilteredProducts: (filteredProducts: Product[]) => void;
  setSortBy: (sortBy: string) => void;
  setBrands: (brands: string[]) => void;
  setSelectedBrands: (selectedBrands: string[]) => void;
  setPriceRange: (priceRange: [number, number]) => void;
  setSearchQuery: (searchQuery: string) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  filteredProducts: [],
  sortBy: 'featured',
  brands: [],
  selectedBrands: [],
  priceRange: [0, 1000],
  searchQuery: '',
  setProducts: (products) => set({ products }),
  setFilteredProducts: (filteredProducts) => set({ filteredProducts }),
  setSortBy: (sortBy) => set({ sortBy }),
  setBrands: (brands) => set({ brands }),
  setSelectedBrands: (selectedBrands) => set({ selectedBrands }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
