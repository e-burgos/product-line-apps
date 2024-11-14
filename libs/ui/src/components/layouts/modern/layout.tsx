import cn from 'classnames';
import Header from '../header/header';
import Sidebar from '../sidebar/_default';
import { IMenuItem } from '../../../types';

export default function ModernLayout({
  children,
  contentClassName,
  headerClassName,
  isNotificationButton,
  rightButton,
  menuItems,
}: React.PropsWithChildren<{
  contentClassName?: string;
  headerClassName?: string;
  isNotificationButton?: boolean;
  rightButton?: React.ReactNode;
  menuItems: IMenuItem[];
}>) {
  return (
    <div className="ltr:xl:pl-72 rtl:xl:pr-72 ltr:2xl:pl-80 rtl:2xl:pr-80">
      <Header
        className={headerClassName}
        isNotificationButton={isNotificationButton}
        rightButton={rightButton}
      />
      <Sidebar menuItems={menuItems} className="hidden xl:block" />
      <main
        className={cn(
          'min-h-[100vh] px-4 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-8 xl:pb-24 3xl:px-10 3xl:pt-0.5',
          contentClassName
        )}
      >
        {children}
      </main>
    </div>
  );
}
