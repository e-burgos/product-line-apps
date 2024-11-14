import { Fragment } from 'react';
import { Dialog, DialogPanel, TransitionChild } from '../dialog';
import { Transition } from '../transition';
import Sidebar from '../layouts/sidebar/_default';
import SidebarRetro from '../layouts/sidebar/_retro-left';
import SidebarExpandable from '../layouts/sidebar/_expandable';
import DrawerMenu from '../layouts/sidebar/_layout-menu';
import { DRAWER_VIEW, useDrawerViewStore } from './useDrawerViewStore';
import { LAYOUT_OPTIONS } from '../../themes/config';
import DrawerFilters from '../modal-views/search/filters';
import { IMenuItem } from '../../types';

export function renderDrawerContent(
  view: DRAWER_VIEW | string,
  menuItems: IMenuItem[]
) {
  switch (view) {
    case 'DEFAULT_SIDEBAR':
      return <Sidebar menuItems={menuItems} />;
    case 'RETRO_SIDEBAR':
      return <SidebarRetro menuItems={menuItems} />;
    case 'CLASSIC_SIDEBAR':
      return <DrawerMenu menuItems={menuItems} />;
    case 'EXPANDABLE_MENU':
      return <SidebarExpandable menuItems={menuItems} />;
    case 'DRAWER_SEARCH':
      return <DrawerFilters />;
    default:
      return <DrawerMenu menuItems={menuItems} />;
  }
}

export function renderDrawerContentByLayout(
  layout: LAYOUT_OPTIONS,
  menuItems: IMenuItem[]
) {
  switch (layout) {
    case LAYOUT_OPTIONS.MODERN:
      return <Sidebar menuItems={menuItems} />;
    case LAYOUT_OPTIONS.RETRO:
      return <Sidebar menuItems={menuItems} />;
    case LAYOUT_OPTIONS.CLASSIC:
      return <DrawerMenu menuItems={menuItems} />;
    case LAYOUT_OPTIONS.MINIMAL:
      return <DrawerFilters />;
    default:
      return <DrawerMenu menuItems={menuItems} />;
  }
}

export default function DrawersContainer({
  menuItems,
}: {
  menuItems: IMenuItem[];
}) {
  const { view, isOpen, closeDrawer } = useDrawerViewStore();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 overflow-hidden"
        onClose={() => null}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogPanel
            onClick={closeDrawer}
            className="fixed inset-0 bg-gray-700 bg-opacity-60 backdrop-blur"
          />
        </TransitionChild>
        <TransitionChild
          as={Fragment}
          enter="transform transition ease-out duration-300"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in duration-300"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="fixed inset-y-0 left-0 flex w-full max-w-full xs:w-auto">
            {view && renderDrawerContent(view, menuItems)}
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
