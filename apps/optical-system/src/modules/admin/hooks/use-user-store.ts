import { DBUserJsonModel } from '@product-line/dexie';
import { create } from 'zustand';

export interface IUserStore {
  currentUser: DBUserJsonModel;
  openDeactivateUserModal: boolean;
  setCurrentUser: (users: DBUserJsonModel) => void;
  setOpenDeactivateUserModal: (value: boolean) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  currentUser: {} as DBUserJsonModel,
  openDeactivateUserModal: false,
  setCurrentUser: (users) => set({ currentUser: users }),
  setOpenDeactivateUserModal: (value) =>
    set({ openDeactivateUserModal: value }),
}));
