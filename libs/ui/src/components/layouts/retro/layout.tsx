import cn from 'classnames';
import Sidebar from '../sidebar/_retro-left';
import SidebarTwo from '../sidebar/_retro-right';
import { RetroHeader } from '../header/header';
import { IMenuItem } from '../../../types';

export default function RetroLayout({
  children,
  contentClassName,
  isNotificationButton,
  rightButton,
  menuItems,
  balance,
  blockchainSidebar = true,
}: React.PropsWithChildren<{
  contentClassName?: string;
  isNotificationButton?: boolean;
  rightButton?: React.ReactNode;
  menuItems: IMenuItem[];
  balance?: number;
  blockchainSidebar?: boolean;
}>) {
  return (
    <>
      <RetroHeader
        isNotificationButton={isNotificationButton}
        rightButton={rightButton}
        className="ltr:xl:pl-72 rtl:xl:pr-72 ltr:2xl:pl-[320px] rtl:2xl:pr-[320px] ltr:3xl:pl-80 rtl:3xl:pr-80"
      />
      <Sidebar className="z-40 hidden xl:block" menuItems={menuItems} />
      <main
        className={cn(
          'min-h-full pb-16 pt-4 sm:pb-20 ltr:lg:pr-80 rtl:lg:pl-80 xl:pb-24 ltr:xl:pl-72 rtl:xl:pr-72 ltr:2xl:pl-80 rtl:2xl:pr-80 3xl:pt-0.5 ltr:3xl:pr-[350px] rtl:3xl:pl-[350px]',
          contentClassName
        )}
      >
        <div className="px-4 sm:px-6 lg:px-8 3xl:px-10">{children}</div>
      </main>
      {blockchainSidebar && (
        <SidebarTwo
          className="ltr:left-auto ltr:right-0 rtl:left-0 rtl:right-auto  xl:block"
          balance={balance || 0}
        />
      )}
    </>
  );
}
