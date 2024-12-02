import { create } from 'zustand';
import { Budget, BudgetVariant } from 'libs/features/src/data/product-db';

export interface IBudgetStore {
  currentBudget: Budget | null;
  currentDetail: BudgetVariant | null;
  openDeleteModal: boolean;
  openDeleteDetailModal: boolean;
  openEditModal: boolean;
  openEditDetailModal: boolean;
  openCreateModal: boolean;
  setCurrentBudget: (budget: Budget | null) => void;
  setCurrentDetail: (detail: BudgetVariant | null) => void;
  setOpenDeleteModal: (isOpen: boolean) => void;
  setOpenDeleteDetailModal: (isOpen: boolean) => void;
  setOpenEditDetailModal: (isOpen: boolean) => void;
  setOpenEditModal: (isOpen: boolean) => void;
  setOpenCreateModal: (isOpen: boolean) => void;
}

export const useBudgetStore = create<IBudgetStore>((set) => ({
  currentBudget: null,
  currentDetail: null,
  openDeleteModal: false,
  openEditModal: false,
  openEditDetailModal: false,
  openDeleteDetailModal: false,
  openCreateModal: false,
  setCurrentBudget: (budget) => set({ currentBudget: budget }),
  setCurrentDetail: (detail) => set({ currentDetail: detail }),
  setOpenDeleteModal: (isOpen) => set({ openDeleteModal: isOpen }),
  setOpenDeleteDetailModal: (isOpen) => set({ openDeleteDetailModal: isOpen }),
  setOpenEditModal: (isOpen) => set({ openEditModal: isOpen }),
  setOpenEditDetailModal: (isOpen) => set({ openEditDetailModal: isOpen }),
  setOpenCreateModal: (isOpen) => set({ openCreateModal: isOpen }),
}));
