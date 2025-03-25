/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment } from 'react';
import Logo from '../../logo';
import Button from '../../button';
import ActiveLink from '../../links/active-link';
import { Close } from '../../icons/close';
import { ChevronDown } from '../../icons/chevron-down';
import { MenuItem } from '../../collapsible-menu';
import { ChevronRight } from '../../icons/chevron-right';
import { useDrawerViewStore } from '../../drawer-views/useDrawerViewStore';
import { IMenuItem } from '../../../types';
import { motion } from 'framer-motion';
import AuthorCard from '../../author-card';
import AuthorImage from '../../../assets/images/author-dark.jpeg';
import cn from 'classnames';

const handleMenuItems = (layoutMenuItems: IMenuItem[]) =>
  layoutMenuItems.map((item) => ({
    name: item.name,
    icon: item.icon,
    href: item.href === '/' ? '' : item.href,
    ...(item.dropdownItems && {
      dropdownItems: item?.dropdownItems?.map((dropdownItem) => ({
        name: dropdownItem.name,
        ...(dropdownItem?.icon && { icon: dropdownItem.icon }),
        href: dropdownItem.href,
        ...(item.dropdownItems && {
          dropdownItems: dropdownItem?.dropdownItems?.map((subItem) => ({
            name: subItem.name,
            ...(subItem?.icon && { icon: subItem.icon }),
            href: subItem.href,
          })),
        }),
      })),
    }),
  }));

export function MenuItems({ menuItems }: { menuItems: IMenuItem[] }) {
  return (
    <div className="flex items-center xl:px-9 2xl:px-14 3xl:px-16">
      <ul className="relative flex items-center gap-4 2xl:gap-6">
        {handleMenuItems(menuItems).map((item, index) => (
          <Fragment key={'layout' + item.name + index}>
            {item.dropdownItems ? (
              <li className="group/parent relative">
                <div className="flex w-full items-center text-sm font-medium uppercase text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  <span className="text-[14px]">{item.name}</span>
                  <span className="z-[1] transition-transform duration-200 ltr:ml-3 rtl:mr-3">
                    <ChevronDown className="h-2.5 w-2.5" />
                  </span>
                </div>
                <ul className="invisible absolute right-0 top-[130%] mt-2 w-64 rounded-lg bg-white p-3 opacity-0 shadow-large transition-all group-hover/parent:visible group-hover/parent:top-full group-hover/parent:opacity-100 ltr:right-0 rtl:left-0 dark:bg-gray-800">
                  {item.dropdownItems.map((dropDownItem, index) => (
                    <li
                      className="group relative"
                      key={dropDownItem.name + index}
                    >
                      {dropDownItem.dropdownItems ? (
                        <>
                          <div className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium uppercase text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:hover:text-white">
                            <span className="text-[12px]">
                              {dropDownItem.name}
                            </span>
                            <span className="z-[1] -mt-1 transition-transform duration-200 ltr:ml-3 rtl:mr-3">
                              <ChevronRight className="h-2.5 w-2.5" />
                            </span>
                          </div>
                          <ul className="invisible absolute left-[107%] right-0 top-[130%] w-64 rounded-lg bg-white p-3 opacity-0 shadow-large transition-all group-hover:visible group-hover/parent:top-0 group-hover:opacity-100 ltr:right-0 rtl:left-0 dark:bg-gray-800">
                            {dropDownItem?.dropdownItems?.map(
                              (subMenu, index) => (
                                <li key={subMenu.name + index.toString()}>
                                  <ActiveLink
                                    href={subMenu.href}
                                    to={subMenu.href}
                                    className="block rounded-lg px-3 py-2 text-sm font-medium uppercase !text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 dark:!text-white dark:hover:bg-gray-700/50"
                                    activeClassName="!bg-gray-100 dark:!bg-gray-700 my-1 last:mb-0 first:mt-0 !text-gray-900 dark:!text-white"
                                  >
                                    <span className="text-[12px]">
                                      {subMenu.name}
                                    </span>
                                  </ActiveLink>
                                </li>
                              )
                            )}
                          </ul>
                        </>
                      ) : (
                        <ActiveLink
                          to={dropDownItem.href}
                          href={dropDownItem.href}
                          className="block rounded-lg px-3 py-2 text-sm font-medium uppercase !text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 dark:!text-white dark:hover:bg-gray-700/50"
                          activeClassName="!bg-gray-100 dark:!bg-gray-700 my-1 last:mb-0 first:mt-0 !text-gray-900 dark:!text-white"
                        >
                          <span className="text-[14px]">
                            {dropDownItem.name}
                          </span>
                        </ActiveLink>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li>
                <ActiveLink
                  to={item.href}
                  href={item.href}
                  className="mx-2 text-[13px] font-medium uppercase  transition first:ml-0 last:mr-0 hover:text-brand dark:text-gray-300 dark:hover:text-brand 2xl:mx-3 2xl:text-sm 3xl:mx-4"
                  activeClassName={cn('!text-brand dark:!text-brand')}
                >
                  <span className="text-[14px]">{item.name}</span>
                </ActiveLink>
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </div>
  );
}

interface DrawerMenuProps {
  menuItems: IMenuItem[];
}

export default function DrawerMenu({ menuItems }: DrawerMenuProps) {
  const { closeDrawer } = useDrawerViewStore();
  const drawerMenuItems = menuItems.map((item) => ({
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
    <div className="relative w-full max-w-full bg-white dark:bg-dark xs:w-80 pb-4">
      <div className="flex h-24 items-center justify-between overflow-hidden px-6 py-4">
        <Logo />
        <div className="2xl:hidden">
          <Button
            title="Close"
            color="white"
            shape="circle"
            variant="transparent"
            size="mini"
            onClick={closeDrawer}
          >
            <Close className="h-auto w-2.5" />
          </Button>
        </div>
      </div>
      <div className="custom-scrollbar h-[calc(100%-180px)] overflow-hidden overflow-y-auto">
        <div className="px-6 pb-14 2xl:px-8">
          <div className="mt-2 sm:mt-4">
            {drawerMenuItems?.map((item, index) => (
              <MenuItem
                onClick={closeDrawer}
                key={'drawer' + item.name + index}
                name={item.name}
                href={item.href}
                icon={item.icon}
                dropdownItems={item.dropdownItems}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="sticky mb-1 px-6">
        <motion.div
          initial={{ y: '80%' }}
          animate={{
            y: 0,
            transition: {
              delay: 0.1,
            },
          }}
        >
          <AuthorCard
            image={AuthorImage}
            name="Contactar Soporte"
            authorRole="Necesitas ayuda?"
          />
        </motion.div>
      </div>
    </div>
  );
}
