import { Customer } from '@product-line/dexie';
import { create } from 'zustand';

export interface ICustomerStore {
  currentCustomer: Customer | null;
  openDeleteModal: boolean;
  openEditModal: boolean;
  openCreateModal: boolean;
  openViewModal: boolean;
  isLoading: boolean;
  error: string | null;
  setCurrentCustomer: (customer: Customer | null) => void;
  setOpenDeleteModal: (isOpen: boolean) => void;
  setOpenEditModal: (isOpen: boolean) => void;
  setOpenCreateModal: (isOpen: boolean) => void;
  setOpenViewModal: (isOpen: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetState: () => void;
}

const initialState = {
  currentCustomer: null,
  openDeleteModal: false,
  openEditModal: false,
  openCreateModal: false,
  openViewModal: false,
  isLoading: false,
  error: null,
};

export const useCustomerStore = create<ICustomerStore>((set) => ({
  ...initialState,
  setCurrentCustomer: (customer) => set({ currentCustomer: customer }),
  setOpenDeleteModal: (isOpen) => set({ openDeleteModal: isOpen }),
  setOpenEditModal: (isOpen) => set({ openEditModal: isOpen }),
  setOpenCreateModal: (isOpen) => set({ openCreateModal: isOpen }),
  setOpenViewModal: (isOpen) => set({ openViewModal: isOpen }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  resetState: () => set(initialState),
}));
