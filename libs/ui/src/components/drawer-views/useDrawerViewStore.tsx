import { create } from 'zustand';
import { storage } from '../../libs/local-storage';

export type DRAWER_VIEW =
  | 'DEFAULT_SIDEBAR'
  | 'RETRO_SIDEBAR'
  | 'CLASSIC_SIDEBAR'
  | 'DRAWER_MENU'
  | 'EXPANDABLE_MENU'
  | 'DRAWER_SEARCH'
  | 'DRAWER_FILTER';

interface IViewsStore {
  isOpen: boolean;
  view: DRAWER_VIEW;
}

interface IDrawerViewStore {
  isOpen: boolean;
  view: DRAWER_VIEW;
  openDrawer: (view: DRAWER_VIEW) => void;
  closeDrawer: () => void;
}

export const useDrawerViewStore = create<IDrawerViewStore>((set) => {
  const drawerStorage: IViewsStore = storage.get('drawer-view');
  return {
    isOpen: drawerStorage?.isOpen || false,
    view: drawerStorage?.view || 'DEFAULT_SIDEBAR',
    openDrawer: (view: DRAWER_VIEW) => {
      storage.set('drawer-view', { isOpen: true, view });
      set({ isOpen: true, view });
    },
    closeDrawer: () => {
      storage.remove('drawer-view');
      set({ isOpen: false, view: 'DEFAULT_SIDEBAR' });
    },
  };
});
