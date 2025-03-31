import { Budget, BudgetDetail } from '@product-line/dexie';
import { create } from 'zustand';

export interface IBudgetStore {
  currentBudget: Budget | null;
  currentDetail: BudgetDetail | null;
  openDeleteModal: boolean;
  openDeleteDetailModal: boolean;
  openEditModal: boolean;
  openEditDetailModal: boolean;
  openCreateModal: boolean;
  openCreateDetailModal: boolean;
  setCurrentBudget: (budget: Budget | null) => void;
  setCurrentDetail: (detail: BudgetDetail | null) => void;
  setOpenDeleteModal: (isOpen: boolean) => void;
  setOpenDeleteDetailModal: (isOpen: boolean) => void;
  setOpenEditDetailModal: (isOpen: boolean) => void;
  setOpenEditModal: (isOpen: boolean) => void;
  setOpenCreateModal: (isOpen: boolean) => void;
  setOpenCreateDetailModal: (isOpen: boolean) => void;
}

export const useBudgetStore = create<IBudgetStore>((set) => ({
  currentBudget: null,
  currentDetail: null,
  openDeleteModal: false,
  openEditModal: false,
  openEditDetailModal: false,
  openDeleteDetailModal: false,
  openCreateModal: false,
  openCreateDetailModal: false,
  setCurrentBudget: (budget) => set({ currentBudget: budget }),
  setCurrentDetail: (detail) => set({ currentDetail: detail }),
  setOpenDeleteModal: (isOpen) => set({ openDeleteModal: isOpen }),
  setOpenDeleteDetailModal: (isOpen) => set({ openDeleteDetailModal: isOpen }),
  setOpenEditModal: (isOpen) => set({ openEditModal: isOpen }),
  setOpenEditDetailModal: (isOpen) => set({ openEditDetailModal: isOpen }),
  setOpenCreateModal: (isOpen) => set({ openCreateModal: isOpen }),
  setOpenCreateDetailModal: (isOpen) => set({ openCreateDetailModal: isOpen }),
}));
