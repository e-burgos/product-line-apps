import cn from 'classnames';
import AuthorCard from '@/components/ui/author-card';
import Logo from '@/components/ui/logo';
import { MenuItem } from '@/components/ui/collapsible-menu';
import Button from '@/components/ui/button';
import { Close } from '@/components/icons/close';
import { defaultMenuItems } from '@/app/router/menu-items';
import AuthorImage from '@/assets/images/author.jpg';
import { useDrawerViewStore } from '@/components/drawer-views/useDrawerViewStore';

export default function Sidebar({
  className,
  menuItems = defaultMenuItems,
}: {
  className?: string;
  menuItems?: any[];
}) {
  const { closeDrawer } = useDrawerViewStore();
  const retroMenu = menuItems.map((item) => ({
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
        className,
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
            name="Contactar Soporte"
            role="admin"
          />

          <div className="mt-12">
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
          {/* <div className="relative mt-20 hidden flex-col rounded-lg bg-gray-200 p-6 dark:bg-[#333E59] lg:flex">
            <div className="-mt-12">
              <Image src={ShapeImage} alt="Shape image" width={200} />
            </div>
            <h2 className="mb-7 mt-5 text-center text-[20px] font-semibold leading-8 text-light-dark dark:text-white">
              Explore the new Blockchain System
            </h2>
            <button className="h-12 rounded-lg bg-brand text-white">
              Try Now{" "}
            </button>
          </div> */}
        </div>
      </div>
    </aside>
  );
}
