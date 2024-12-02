import { Customer } from '@optical-system-app/lib/db';
import { create } from 'zustand';

export interface ICustomerStore {
  currentCustomer: Customer | null;
  openDeleteModal: boolean;
  openEditModal: boolean;
  openCreateModal: boolean;
  setCurrentCustomer: (customer: Customer | null) => void;
  setOpenDeleteModal: (isOpen: boolean) => void;
  setOpenEditModal: (isOpen: boolean) => void;
  setOpenCreateModal: (isOpen: boolean) => void;
}

export const useCustomerStore = create<ICustomerStore>((set) => ({
  currentCustomer: null,
  openDeleteModal: false,
  openEditModal: false,
  openCreateModal: false,
  setCurrentCustomer: (customer) => set({ currentCustomer: customer }),
  setOpenDeleteModal: (isOpen) => set({ openDeleteModal: isOpen }),
  setOpenEditModal: (isOpen) => set({ openEditModal: isOpen }),
  setOpenCreateModal: (isOpen) => set({ openCreateModal: isOpen }),
}));
