/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { storage } from '../../libs';

export type MODAL_VIEW =
  | 'SEARCH_VIEW'
  | 'SHARE_VIEW'
  | 'WALLET_CONNECT_VIEW'
  | 'PROFILE_INFO_VIEW'
  | 'FOLLOWING_VIEW'
  | 'FOLLOWERS_VIEW'
  | 'NFT_PREVIEW'
  | 'FUND_TRANSFER_PREVIEW'
  | 'PROFIT_TRANSFER_PREVIEW'
  | 'DCA_ORDER_HISTORY'
  | 'DCA_STEPPER';

interface IViewsStore {
  isOpen: boolean;
  view: MODAL_VIEW;
  data: any;
}

interface IModalViewStore {
  isOpen: boolean;
  view: MODAL_VIEW;
  data: any;
  setData: (data: any) => void;
  openModal: (view: MODAL_VIEW, data?: any) => void;
  closeModal: (data?: any) => void;
}

export const useModalViewStore = create<IModalViewStore>((set) => {
  const modalStorage: IViewsStore = storage.get('modal-view');
  return {
    isOpen: modalStorage?.isOpen || false,
    view: modalStorage?.view || 'SEARCH_VIEW',
    data: modalStorage?.data || null,
    openModal: (view, data) => {
      storage.set('modal-view', {
        ...modalStorage,
        isOpen: true,
        data: data || modalStorage?.data || null,
      });
      set((state) => ({
        ...state,
        isOpen: true,
        view,
        data: data || modalStorage?.data || null,
      }));
    },
    setData: (data) => {
      storage.set('modal-view', { ...modalStorage, data });
      set((state) => ({ ...state, data }));
    },
    closeModal: (data) => {
      set((state) => {
        storage.set('modal-view', {
          ...modalStorage,
          isOpen: false,
          data: data || state.data || modalStorage?.data,
          view: state.view || modalStorage?.view,
        });
        return {
          ...state,
          isOpen: false,
        };
      });
    },
  };
});
