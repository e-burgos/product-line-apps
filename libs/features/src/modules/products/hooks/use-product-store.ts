import {
  Product,
  ProductCategory,
  ProductSubCategory,
} from '@product-line/dexie';
import { create } from 'zustand';

export interface IProductStore {
  currentProduct: Product | null;
  currentCategory: ProductCategory | null;
  currentSubCategory: ProductSubCategory | null;
  openDeleteModal: boolean;
  openDeleteCategoryModal: boolean;
  openDeleteSubCategoryModal: boolean;
  openEditModal: boolean;
  openEditCategoryModal: boolean;
  openEditSubCategoryModal: boolean;
  openCreateModal: boolean;
  openCreateCategoryModal: boolean;
  openCreateSubCategoryModal: boolean;
  setCurrentProduct: (product: Product | null) => void;
  setCurrentCategory: (category: ProductCategory | null) => void;
  setCurrentSubCategory: (subCategory: ProductSubCategory | null) => void;
  setOpenDeleteModal: (isOpen: boolean) => void;
  setOpenDeleteCategoryModal: (isOpen: boolean) => void;
  setOpenDeleteSubCategoryModal: (isOpen: boolean) => void;
  setOpenEditModal: (isOpen: boolean) => void;
  setOpenEditCategoryModal: (isOpen: boolean) => void;
  setOpenEditSubCategoryModal: (isOpen: boolean) => void;
  setOpenCreateModal: (isOpen: boolean) => void;
  setOpenCreateCategoryModal: (isOpen: boolean) => void;
  setOpenCreateSubCategoryModal: (isOpen: boolean) => void;
}

export const useProductStore = create<IProductStore>((set) => ({
  currentProduct: null,
  currentCategory: null,
  currentSubCategory: null,
  openDeleteModal: false,
  openDeleteCategoryModal: false,
  openDeleteSubCategoryModal: false,
  openEditModal: false,
  openEditCategoryModal: false,
  openEditSubCategoryModal: false,
  openCreateModal: false,
  openCreateCategoryModal: false,
  openCreateSubCategoryModal: false,
  setCurrentProduct: (product) => set({ currentProduct: product }),
  setCurrentCategory: (category) => set({ currentCategory: category }),
  setCurrentSubCategory: (subCategory) =>
    set({ currentSubCategory: subCategory }),
  setOpenDeleteModal: (isOpen) => set({ openDeleteModal: isOpen }),
  setOpenDeleteCategoryModal: (isOpen) =>
    set({ openDeleteCategoryModal: isOpen }),
  setOpenDeleteSubCategoryModal: (isOpen) =>
    set({ openDeleteSubCategoryModal: isOpen }),
  setOpenEditModal: (isOpen) => set({ openEditModal: isOpen }),
  setOpenEditCategoryModal: (isOpen) => set({ openEditCategoryModal: isOpen }),
  setOpenEditSubCategoryModal: (isOpen) =>
    set({ openEditSubCategoryModal: isOpen }),
  setOpenCreateModal: (isOpen) => set({ openCreateModal: isOpen }),
  setOpenCreateCategoryModal: (isOpen) =>
    set({ openCreateCategoryModal: isOpen }),
  setOpenCreateSubCategoryModal: (isOpen) =>
    set({ openCreateSubCategoryModal: isOpen }),
}));
