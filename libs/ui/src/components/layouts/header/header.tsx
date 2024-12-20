import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import LogoIcon from '../../logo-icon';
import { useWindowScroll } from '../../../hooks/use-window-scroll';
import { FlashIcon } from '../../icons/flash';

import ActiveLink from '../../links/active-link';
import { useIsMounted } from '../../../hooks/use-is-mounted';
import { useDrawerViewStore } from '../../drawer-views/useDrawerViewStore';
import SearchButton from '../../modal-views/search/button';
import Hamburger from '../../hamburger';
import { commonRoutePaths } from 'libs/shell/src/router/routes';

export function NotificationButton() {
  const isMounted = useIsMounted();
  return (
    isMounted && (
      <ActiveLink
        to={commonRoutePaths.notification}
        href={commonRoutePaths.notification}
      >
        <div className="relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-100 bg-white text-brand shadow-main transition-all hover:-translate-y-0.5 hover:shadow-large focus:-translate-y-0.5 focus:shadow-large focus:outline-none dark:border-gray-700 dark:bg-light-dark dark:text-white sm:h-12 sm:w-12">
          <FlashIcon className="h-auto w-3 sm:w-auto" />
          <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-brand shadow-light dark:bg-slate-50 sm:h-3 sm:w-3" />
        </div>
      </ActiveLink>
    )
  );
}

function HeaderRightArea({
  isNotificationButton,
  rightButton,
}: {
  isNotificationButton?: boolean;
  rightButton?: React.ReactNode;
}) {
  return (
    <div className="relative order-last flex shrink-0 items-center gap-4 sm:gap-6 lg:gap-8">
      {isNotificationButton && <NotificationButton />}
      {rightButton && rightButton}
    </div>
  );
}

export function RetroHeader({
  className,
  isNotificationButton,
  rightButton,
}: {
  className?: string;
  isNotificationButton?: boolean;
  rightButton?: React.ReactNode;
}) {
  const navigate = useNavigate();
  const isMounted = useIsMounted();
  const { openDrawer } = useDrawerViewStore();
  const windowScroll = useWindowScroll();
  return (
    <nav
      className={cn(
        'sticky top-0 z-30 h-16 w-full backdrop-blur transition-all duration-300 ltr:right-0 rtl:left-0 sm:h-20 3xl:h-24',
        isMounted && windowScroll.y > 17
          ? 'bg-white/80 shadow-card dark:bg-dark/80'
          : '',
        className
      )}
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8 3xl:px-10">
        <div className="flex items-center">
          <div
            onClick={() => navigate(commonRoutePaths.home)}
            className="flex items-center xl:hidden"
          >
            <LogoIcon />
          </div>
          <SearchButton
            variant="transparent"
            className="ltr:-ml-[17px] rtl:-mr-[17px] dark:text-white"
          />
        </div>
        <HeaderRightArea
          isNotificationButton={isNotificationButton}
          rightButton={
            <div className="flex flex-row items-center justify-center ">
              {rightButton}
              <div className="mx-2 block sm:mx-4 xl:hidden">
                <Hamburger
                  isOpen={false}
                  onClick={() => openDrawer('DEFAULT_SIDEBAR')}
                  color="white"
                  className="shadow-main dark:border dark:border-solid dark:border-gray-700 dark:bg-light-dark dark:text-white"
                />
              </div>
            </div>
          }
        />
      </div>
    </nav>
  );
}

export function ClassicHeader({
  className,
  isNotificationButton,
  rightButton,
}: {
  className?: string;
  isNotificationButton?: boolean;
  rightButton?: React.ReactNode;
}) {
  const navigate = useNavigate();
  const isMounted = useIsMounted();
  const { openDrawer } = useDrawerViewStore();
  const windowScroll = useWindowScroll();
  return (
    <nav
      className={cn(
        'sticky top-0 z-30 h-16 w-full backdrop-blur transition-all duration-300 ltr:right-0 rtl:left-0 sm:h-20 3xl:h-24',
        ((isMounted && windowScroll.y) as number) > 2
          ? 'bg-white/80 dark:bg-dark/80 shadow-card'
          : '',
        className
      )}
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8 3xl:px-10">
        <div className="flex items-center">
          <div
            onClick={() => navigate('/')}
            className="flex items-center xl:hidden"
          >
            <LogoIcon />
          </div>

          <SearchButton
            variant="transparent"
            className="ltr:-ml-[17px] rtl:-mr-[17px] dark:text-white"
          />
        </div>
        <HeaderRightArea
          isNotificationButton={isNotificationButton}
          rightButton={
            <div className="flex flex-row items-center justify-center ">
              {rightButton}
              <div className="mx-2 block sm:mx-4 xl:hidden">
                <Hamburger
                  isOpen={false}
                  onClick={() => openDrawer('CLASSIC_SIDEBAR')}
                  color="white"
                  className="shadow-main dark:border dark:border-solid dark:border-gray-700 dark:bg-light-dark dark:text-white"
                />
              </div>
            </div>
          }
        />
      </div>
    </nav>
  );
}

export default function Header({
  className,
  isNotificationButton,
  rightButton,
}: {
  className?: string;
  isNotificationButton?: boolean;
  rightButton?: React.ReactNode;
}) {
  const navigate = useNavigate();
  const isMounted = useIsMounted();
  const { openDrawer } = useDrawerViewStore();
  const windowScroll = useWindowScroll();
  return (
    <nav
      className={cn(
        'sticky top-0 z-30 h-16 w-full backdrop-blur transition-shadow duration-300 ltr:right-0 rtl:left-0 sm:h-20 3xl:h-24',
        ((isMounted && windowScroll.y) as number) > 2
          ? 'bg-white/80 shadow-card dark:bg-dark/80'
          : '',
        className
      )}
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8 3xl:px-10">
        <div className="flex items-center">
          <div
            onClick={() => navigate(commonRoutePaths.home)}
            className="flex items-center xl:hidden"
          >
            <LogoIcon />
          </div>
          <SearchButton
            variant="transparent"
            className="ltr:-ml-[17px] rtl:-mr-[17px] dark:text-white"
          />
        </div>
        <HeaderRightArea
          isNotificationButton={isNotificationButton}
          rightButton={
            <div className="flex flex-row items-center justify-center ">
              {rightButton}
              <div className="mx-2 block sm:mx-4 xl:hidden">
                <Hamburger
                  isOpen={false}
                  onClick={() => openDrawer('DEFAULT_SIDEBAR')}
                  color="white"
                  className="shadow-main dark:border dark:border-solid dark:border-gray-700 dark:bg-light-dark dark:text-white"
                />
              </div>
            </div>
          }
        />
      </div>
    </nav>
  );
}
