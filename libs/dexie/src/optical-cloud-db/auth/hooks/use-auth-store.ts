import { storage } from '@product-line/integrations';
import { create } from 'zustand';

export interface AuthStore {
  openLoginModal: boolean;
  isLoggedIn: boolean;
  loading: boolean;
  lastRouteVisited: string;
  setOpenLoginModal: (open: boolean) => void;
  setIsLoggedIn: (logged: boolean) => void;
  setLoading: (loading: boolean) => void;
  setLastRouteVisited: (lastRouteVisited: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => {
  const authStore = storage.get('auth-store');
  return {
    openLoginModal: false,
    isLoggedIn: authStore?.isLoggedIn || false,
    loading: authStore?.loading || false,
    lastRouteVisited: authStore?.lastRouteVisited || '',
    setOpenLoginModal: (open) => set({ openLoginModal: open }),
    setIsLoggedIn: (logged) => {
      const authStore = storage.get('auth-store');
      set({ isLoggedIn: logged });
      storage.set('auth-store', { ...authStore, isLoggedIn: logged });
    },
    setLoading: (loading) => {
      const authStore = storage.get('auth-store');
      set({ loading });
      storage.set('auth-store', { ...authStore, loading });
    },
    setLastRouteVisited: (lastRouteVisited) => {
      const authStore = storage.get('auth-store');
      set({ lastRouteVisited });
      storage.set('auth-store', { ...authStore, lastRouteVisited });
    },
  };
});
