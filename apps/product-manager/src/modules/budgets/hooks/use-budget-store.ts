import { Budget } from '@product-manager-app/lib/db';
import { create } from 'zustand';

export interface IBudgetStore {
  currentBudget: Budget | null;
  openDeleteModal: boolean;
  openDeleteDetailModal: boolean;
  openEditModal: boolean;
  openEditDetailModal: boolean;
  openCreateModal: boolean;
  setCurrentBudget: (budget: Budget | null) => void;
  setOpenDeleteModal: (isOpen: boolean) => void;
  setOpenDeleteDetailModal: (isOpen: boolean) => void;
  setOpenEditDetailModal: (isOpen: boolean) => void;
  setOpenEditModal: (isOpen: boolean) => void;
  setOpenCreateModal: (isOpen: boolean) => void;
}

export const useBudgetStore = create<IBudgetStore>((set) => ({
  currentBudget: null,
  openDeleteModal: false,
  openEditModal: false,
  openEditDetailModal: false,
  openDeleteDetailModal: false,
  openCreateModal: false,
  setCurrentBudget: (budget) => set({ currentBudget: budget }),
  setOpenDeleteModal: (isOpen) => set({ openDeleteModal: isOpen }),
  setOpenDeleteDetailModal: (isOpen) => set({ openDeleteDetailModal: isOpen }),
  setOpenEditModal: (isOpen) => set({ openEditModal: isOpen }),
  setOpenEditDetailModal: (isOpen) => set({ openEditDetailModal: isOpen }),
  setOpenCreateModal: (isOpen) => set({ openCreateModal: isOpen }),
}));
