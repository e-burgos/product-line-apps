import cn from 'classnames';
import AuthorCard from '../../author-card';
import Logo from '../../logo';
import { MenuItem } from '../../collapsible-menu';
import Button from '../../button';
import { Close } from '../../icons/close';
import AuthorImage from '../../../assets/images/author-dark.jpeg';
import { useDrawerViewStore } from '../../drawer-views/useDrawerViewStore';
import { IMenuItem } from '../../../types';

export default function Sidebar({
  className,
  menuItems,
}: {
  className?: string;
  menuItems: IMenuItem[];
}) {
  const { closeDrawer } = useDrawerViewStore();
  const retroMenu = menuItems.map((item) => ({
    name: item.name,
    icon: item.icon,
    href: item.href,
    ...(item.dropdownItems && {
      dropdownItems: item?.dropdownItems?.map((dropdownItem) => ({
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
        <div className="px-6 pb-2 2xl:px-8">
          <div className="mt-8">
            {retroMenu.map((item, index) => (
              <MenuItem
                onClick={closeDrawer}
                key={`retro-left-${index}`}
                name={item.name}
                href={item.href}
                icon={item.icon}
                dropdownItems={item.dropdownItems}
              />
            ))}
          </div>
        </div>
        <AuthorCard
          image={AuthorImage}
          name="Contactar Soporte"
          authorRole="Necesitas ayuda?"
        />
      </div>
    </aside>
  );
}
