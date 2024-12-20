import { create } from 'zustand';

export interface AuthStore {
  openLoginModal: boolean;
  isLogged: boolean;
  setOpenLoginModal: (open: boolean) => void;
  setIsLogged: (logged: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  openLoginModal: false,
  isLogged: false,
  setOpenLoginModal: (open) => set({ openLoginModal: open }),
  setIsLogged: (logged) => set({ isLogged: logged }),
}));
