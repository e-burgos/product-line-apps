/* eslint-disable @typescript-eslint/no-explicit-any */
import cn from 'classnames';
import AuthorCard from '../../author-card';
import Logo from '../../logo';
import { MenuItem } from '../../collapsible-menu';
import Button from '../../button';
import { Close } from '../../icons/close';
import AuthorImage from '../../../assets/images/author-dark.jpeg';
import { IMenuItem } from '../../../types';
import { useDrawerViewStore } from '../../drawer-views/useDrawerViewStore';

interface SidebarProps {
  className?: string;
  menuItems: IMenuItem[];
}

export default function Sidebar({ className, menuItems }: SidebarProps) {
  const { closeDrawer } = useDrawerViewStore();
  const sideBarMenus = menuItems?.map((item) => ({
    name: item.name,
    icon: item.icon,
    href: item.href,
    ...(item.dropdownItems && {
      dropdownItems: item?.dropdownItems?.map((dropdownItem: any) => ({
        name: dropdownItem.name,
        ...(dropdownItem?.icon && { icon: dropdownItem.icon }),
        href: dropdownItem.href,
      })),
    }),
  }));

  return (
    <aside
      className={cn(
        'top-0 z-40 h-full w-full max-w-full border-dashed border-gray-200 bg-body ltr:left-0 ltr:border-r rtl:right-0 rtl:border-l dark:border-gray-700 dark:bg-dark xs:w-80 xl:fixed  xl:w-72 2xl:w-80',
        className
      )}
    >
      <div className="relative flex h-24 items-center justify-between overflow-hidden px-6 py-4 2xl:px-8">
        <Logo />
        <div className="md:hidden">
          <Button
            title="Close"
            color="white"
            shape="circle"
            variant="transparent"
            size="small"
            onClick={closeDrawer}
          >
            <Close className="h-auto w-2.5" />
          </Button>
        </div>
      </div>

      <div className="custom-scrollbar h-[calc(100%-98px)] overflow-hidden overflow-y-auto">
        <div className="px-6 pb-5 2xl:px-8">
          <AuthorCard
            image={AuthorImage}
            name="Esteban Burgos"
            authorRole="Admin"
          />

          <div className="mt-12">
            {sideBarMenus?.map((item, index) => (
              <MenuItem
                onClick={closeDrawer}
                key={'default' + item.name + index}
                name={item.name}
                href={item.href}
                icon={item.icon}
                dropdownItems={item.dropdownItems}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}