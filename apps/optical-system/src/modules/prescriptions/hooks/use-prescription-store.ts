import { Prescription } from '@product-line/dexie';
import { create } from 'zustand';

export interface IPrescriptionStore {
  currentPrescription: Prescription | null;
  openDeleteModal: boolean;
  openEditModal: boolean;
  openCreateModal: boolean;
  setCurrentPrescription: (prescription: Prescription | null) => void;
  setOpenDeleteModal: (isOpen: boolean) => void;
  setOpenEditModal: (isOpen: boolean) => void;
  setOpenCreateModal: (isOpen: boolean) => void;
}

export const usePrescriptionStore = create<IPrescriptionStore>((set) => ({
  currentPrescription: null,
  openDeleteModal: false,
  openEditModal: false,
  openCreateModal: false,
  setCurrentPrescription: (prescription) =>
    set({ currentPrescription: prescription }),
  setOpenDeleteModal: (isOpen) => set({ openDeleteModal: isOpen }),
  setOpenEditModal: (isOpen) => set({ openEditModal: isOpen }),
  setOpenCreateModal: (isOpen) => set({ openCreateModal: isOpen }),
}));
