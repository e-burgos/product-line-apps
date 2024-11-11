'use client';

import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import cn from 'classnames';
import AuthorCard from '../../author-card';
import Logo from '../../logo';
import LogoIcon from '../../logo-icon';
import { MenuItem } from '../../collapsible-menu';
import Button from '../../button';
import { Close } from '../../icons/close';
import { useClickAway } from '../../../hooks/use-click-away';
import AuthorImage from '@/assets/images/author.jpg';
import { useDrawerViewStore } from '../../drawer-views/useDrawerViewStore';
import { IMenuItem } from '../../../types';

const sideBarMenuItems = (menuItems: IMenuItem[]) =>
  menuItems.map((item) => ({
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

export default function Sidebar({
  className,
  menuItems,
  routePaths,
}: {
  className?: string;
  menuItems: IMenuItem[];
  routePaths: Record<string, string>;
}) {
  const router = useNavigate();
  const pathname = useLocation().pathname;
  const { closeDrawer } = useDrawerViewStore();
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLElement>(null);
  useClickAway(ref, () => {
    setOpen(false);
  });

  function isSubMenuActive(
    submenu: Array<{ name: string; icon?: JSX.Element; href: string }>
  ) {
    return submenu?.map((item) => item.href).includes(pathname);
  }

  return (
    <aside
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={cn(
        open
          ? 'border-0 shadow-expand xs:w-80 xl:w-72 2xl:w-80 '
          : 'w-24 border-dashed border-gray-200 ltr:border-r rtl:border-l 2xl:w-28',
        'top-0 z-40 h-full max-w-full  bg-body duration-200 ltr:left-0 rtl:right-0  dark:border-gray-700 dark:bg-dark xl:fixed',
        className
      )}
    >
      <div
        className={cn(
          'relative flex h-24 items-center  overflow-hidden px-6 py-4 pt-0 2xl:px-8 3xl:pt-6',
          open ? 'flex-start' : 'justify-center'
        )}
      >
        {!open ? (
          <div onClick={() => setOpen(!open)}>
            <LogoIcon />
          </div>
        ) : (
          <Logo />
        )}

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

      <div
        className={cn(
          'custom-scrollbar -mt-4 overflow-hidden overflow-y-auto 2xl:-mt-7',
          open ? 'h-[calc(100%-190px)]' : 'h-[calc(100%-170px)]'
        )}
      >
        <div className="px-6 pb-5 2xl:px-8">
          {!open ? (
            <div className="mt-5 2xl:mt-8" onClick={() => setOpen(!open)}>
              {sideBarMenuItems(menuItems)?.length &&
                sideBarMenuItems(menuItems).map((item, index) => (
                  <MenuItem
                    isActive={
                      item.href === pathname ||
                      (item.dropdownItems &&
                        isSubMenuActive(item.dropdownItems))
                    }
                    key={'drawer' + item.name + index}
                    href=""
                    icon={item.icon}
                  />
                ))}
            </div>
          ) : (
            <div className="mt-5 2xl:mt-8">
              {sideBarMenuItems(menuItems)?.length &&
                sideBarMenuItems(menuItems).map((item, index) => (
                  <MenuItem
                    onClick={closeDrawer}
                    key={'drawer-full' + item.name + index}
                    name={item.name}
                    href={item.href}
                    icon={item.icon}
                    dropdownItems={item.dropdownItems}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
      <div className={cn('sticky bottom-5 mt-3 2xl:mt-12', open && 'px-8')}>
        {!open ? (
          <motion.div
            initial={{ x: 50, y: -5 }}
            animate={{
              x: 0,
              y: 0,
            }}
            className="cursor-pointer pb-2"
            onClick={() => router(routePaths.profile)}
          >
            <AuthorCard image={AuthorImage} />
          </motion.div>
        ) : (
          <div>
            <motion.div
              initial={{ y: '80%' }}
              animate={{
                y: 0,
                transition: {
                  delay: 0.1,
                },
              }}
              onClick={() => router(routePaths.profile)}
            >
              <AuthorCard
                image={AuthorImage}
                name="Esteban Burgos"
                authorRole="Admin"
              />
            </motion.div>
          </div>
        )}
      </div>
    </aside>
  );
}
