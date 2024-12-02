import cn from 'classnames';
import { ClassicHeader } from '../header/header';
import Sidebar from '../sidebar/_expandable';
import { IMenuItem } from '../../../types';

export default function ClassicLayout({
  children,
  contentClassName,
  menuItems,
  isNotificationButton,
  rightButton,
}: React.PropsWithChildren<{
  contentClassName?: string;
  menuItems: IMenuItem[];
  isNotificationButton?: boolean;
  rightButton?: React.ReactNode;
}>) {
  return (
    <div className="ltr:xl:pl-24 rtl:xl:pr-24 ltr:2xl:pl-28 rtl:2xl:pr-28 ">
      <ClassicHeader
        isNotificationButton={isNotificationButton}
        rightButton={rightButton}
      />
      <Sidebar className="hidden xl:block" menuItems={menuItems} />
      <main
        className={cn(
          'min-h-full px-4 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-8 xl:pb-24 xl:pt-5 3xl:px-10',
          contentClassName
        )}
      >
        {children}
      </main>
    </div>
  );
}
