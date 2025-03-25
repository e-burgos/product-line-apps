import { storage } from 'libs/integrations/src/local-storage';
import { create } from 'zustand';
import { TokenFinalResponse } from '../../api/types/apiTypes';

export interface AdminStore {
  tokenData: TokenFinalResponse | null;
  setTokenData: (tokenData: TokenFinalResponse | null) => void;
}

export const useAdminStore = create<AdminStore>((set) => {
  const adminData = storage.get('admin-data');
  return {
    tokenData: adminData?.tokenData || null,
    setTokenData: (tokenData) => {
      storage.set('admin-data', { tokenData });
      set({ tokenData });
    },
  };
});
