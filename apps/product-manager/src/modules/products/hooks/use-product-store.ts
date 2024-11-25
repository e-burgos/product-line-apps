import { Product } from '@product-manager-app/lib/db';
import { create } from 'zustand';

export interface IProductStore {
  currentProduct: Product | null;
  openDeleteModal: boolean;
  openDeleteVariantModal: boolean;
  openEditModal: boolean;
  openEditVariantModal: boolean;
  openCreateModal: boolean;
  openCreateVariantModal: boolean;
  setCurrentProduct: (product: Product | null) => void;
  setOpenDeleteModal: (isOpen: boolean) => void;
  setOpenDeleteVariantModal: (isOpen: boolean) => void;
  setOpenEditVariantModal: (isOpen: boolean) => void;
  setOpenEditModal: (isOpen: boolean) => void;
  setOpenCreateModal: (isOpen: boolean) => void;
  setOpenCreateVariantModal: (isOpen: boolean) => void;
}

export const useProductStore = create<IProductStore>((set) => ({
  currentProduct: null,
  openDeleteModal: false,
  openEditModal: false,
  openEditVariantModal: false,
  openDeleteVariantModal: false,
  openCreateModal: false,
  openCreateVariantModal: false,
  setCurrentProduct: (product) => set({ currentProduct: product }),
  setOpenDeleteModal: (isOpen) => set({ openDeleteModal: isOpen }),
  setOpenDeleteVariantModal: (isOpen) =>
    set({ openDeleteVariantModal: isOpen }),
  setOpenEditModal: (isOpen) => set({ openEditModal: isOpen }),
  setOpenEditVariantModal: (isOpen) => set({ openEditVariantModal: isOpen }),
  setOpenCreateModal: (isOpen) => set({ openCreateModal: isOpen }),
  setOpenCreateVariantModal: (isOpen) =>
    set({ openCreateVariantModal: isOpen }),
}));
