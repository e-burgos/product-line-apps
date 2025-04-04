import { storage } from 'libs/integrations/src/local-storage';
import { create } from 'zustand';
import { TokenFinalResponse } from '../types/apiTypes';

export interface TokenStore {
  tokenData: TokenFinalResponse | null;
  setTokenData: (tokenData: TokenFinalResponse | null) => void;
}

export const useTokenStore = create<TokenStore>((set) => {
  const tokenData = storage.get('token-data');
  return {
    tokenData: tokenData?.tokenData || null,
    setTokenData: (tokenData) => {
      storage.set('token-data', { tokenData });
      set({ tokenData });
    },
  };
});
