import { Fragment } from "react";
import { Dialog, DialogPanel, TransitionChild } from "@/components/ui/dialog";
import { Transition } from "@/components/ui/transition";
import DrawerFilters from "@/components/search/filters";
import { defaultMenuItems } from "@/app/router/menu-items";
import Sidebar from "@/app/layouts/sidebar/_default";
import SidebarRetro from "@/app/layouts/sidebar/_retro-left";
import SidebarExpandable from "@/app/layouts/sidebar/_expandable";
import DrawerMenu from "@/app/layouts/sidebar/_layout-menu";
import { DRAWER_VIEW, useDrawerViewStore } from "./useDrawerViewStore";
import { LAYOUT_OPTIONS } from "@/themes/config";

export function renderDrawerContent(view: DRAWER_VIEW | string) {
  switch (view) {
    case "DEFAULT_SIDEBAR":
      return <Sidebar menuItems={defaultMenuItems} />;
    case "RETRO_SIDEBAR":
      return <SidebarRetro menuItems={defaultMenuItems} />;
    case "CLASSIC_SIDEBAR":
      return <DrawerMenu menuItems={defaultMenuItems} />;
    case "EXPANDABLE_MENU":
      return <SidebarExpandable />;
    case "DRAWER_SEARCH":
      return <DrawerFilters />;
    default:
      return <DrawerMenu />;
  }
}

export function renderDrawerContentByLayout(layout: LAYOUT_OPTIONS) {
  switch (layout) {
    case LAYOUT_OPTIONS.MODERN:
      return <Sidebar menuItems={defaultMenuItems} />;
    case LAYOUT_OPTIONS.RETRO:
      return <Sidebar menuItems={defaultMenuItems} />;
    case LAYOUT_OPTIONS.CLASSIC:
      return <DrawerMenu menuItems={defaultMenuItems} />;
    case LAYOUT_OPTIONS.MINIMAL:
      return <DrawerFilters />;
    default:
      return <DrawerMenu />;
  }
}

export default function DrawersContainer() {
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
            {view && renderDrawerContent(view)}
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
