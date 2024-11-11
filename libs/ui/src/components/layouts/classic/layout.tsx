import cn from 'classnames';
import { ClassicHeader } from '../header/header';
import Sidebar from '../sidebar/_expandable';
import { IMenuItem } from '../../../types';

export default function ClassicLayout({
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
    <div className="ltr:xl:pl-24 rtl:xl:pr-24 ltr:2xl:pl-28 rtl:2xl:pr-28 ">
      <ClassicHeader routePaths={routePaths} />
      <Sidebar
        className="hidden xl:block"
        menuItems={menuItems}
        routePaths={routePaths}
      />
      <main
        className={cn(
          'min-h-screen px-4 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-8 xl:pb-24 xl:pt-5 3xl:px-10',
          contentClassName
        )}
      >
        {children}
      </main>
    </div>
  );
}
