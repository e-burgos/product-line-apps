import cn from 'classnames';
import Header from '../header/header';
import Sidebar from '../sidebar/_default';
import { IMenuItem } from '../../../types';

export default function ModernLayout({
  children,
  contentClassName,
  routePaths,
  menuItems,
}: React.PropsWithChildren<{
  contentClassName?: string;
  routePaths: Record<string, string>;
  menuItems: IMenuItem[];
}>) {
  return (
    <div className="ltr:xl:pl-72 rtl:xl:pr-72 ltr:2xl:pl-80 rtl:2xl:pr-80">
      <Header routePaths={routePaths} />
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
