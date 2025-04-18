import Logo from '@/components/ui/logo';
import cn from 'classnames';
import { FlashIcon } from '@/components/icons/flash';
import SearchButton from '@/components/search/button';
import ActiveLink from '@/components/ui/links/active-link';
import Hamburger from '@/components/ui/hamburger';
import WalletConnect from '@/app/config/wagmi/wallet-connect';
import { MenuItems } from '@/app/layouts/sidebar/_layout-menu';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { useWindowScroll } from '@/hooks/use-window-scroll';
import { routePaths } from '@/app/router/routes';
import { useDrawerViewStore } from '@/components/drawer-views/useDrawerViewStore';

function NotificationButton() {
  const isMounted = useIsMounted();
  return (
    isMounted && (
      <ActiveLink to={routePaths.notification} href={routePaths.notification}>
        <div className="relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-100 bg-white text-brand shadow-main transition-all hover:-translate-y-0.5 hover:shadow-large focus:-translate-y-0.5 focus:shadow-large focus:outline-none dark:border-gray-700 dark:bg-light-dark dark:text-white sm:h-12 sm:w-12">
          <FlashIcon className="h-auto w-3 sm:w-auto" />
          <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-brand shadow-light dark:bg-white sm:h-3 sm:w-3" />
        </div>
      </ActiveLink>
    )
  );
}

function HeaderRightArea() {
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();
  const { openDrawer, isOpen } = useDrawerViewStore();
  return (
    <div className="order-last flex shrink-0 items-center">
      <div className="ltr:mr-3.5 rtl:ml-3.5 ltr:sm:mr-5 rtl:sm:ml-5 xl:hidden">
        <SearchButton
          color="white"
          className="shadow-main dark:border dark:border-solid dark:border-gray-700 dark:bg-light-dark dark:text-white"
        />
      </div>

      <div className="hidden gap-6 lg:flex 2xl:gap-8">
        {isMounted && ['xs', 'sm', 'md', 'lg'].indexOf(breakpoint) === -1 && (
          <div>
            <SearchButton variant="transparent" className="dark:text-white" />
          </div>
        )}
        <NotificationButton />
        <WalletConnect />
      </div>

      <div className="flex items-center lg:hidden">
        <NotificationButton />
        <Hamburger
          isOpen={isOpen}
          onClick={() => openDrawer('EXPANDABLE_MENU')}
          color="white"
          className="shadow-main ltr:ml-3.5 rtl:mr-3.5 dark:border dark:border-solid dark:border-gray-700 dark:bg-light-dark dark:text-white ltr:sm:ml-5 rtl:sm:mr-5"
        />
      </div>
    </div>
  );
}

export function Header() {
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();
  const windowScroll = useWindowScroll();
  const { openDrawer, isOpen } = useDrawerViewStore();
  return (
    <nav
      className={cn(
        'sticky top-0 z-30 flex w-full backdrop-blur items-center justify-between px-4 transition-all duration-300 ltr:right-0 rtl:left-0 sm:px-6 lg:px-8 3xl:px-10',
        isMounted && windowScroll.y > 17
          ? 'h-16 bg-white/80 shadow-card sm:h-20 dark:bg-dark/80'
          : 'h-16 sm:h-24',
      )}
    >
      <div className="mx-auto flex w-full max-w-[2160px] items-center justify-between">
        <div className="flex items-center">
          <div className="hidden lg:mr-6 lg:block xl:hidden">
            <Hamburger
              isOpen={isOpen}
              onClick={() => openDrawer('CLASSIC_SIDEBAR')}
              color="white"
              className="shadow-main dark:border dark:border-solid dark:border-gray-700 dark:bg-light-dark dark:text-white"
            />
          </div>
          <Logo />
          {isMounted && ['xs', 'sm', 'md', 'lg'].indexOf(breakpoint) === -1 && (
            <MenuItems />
          )}
        </div>
        <HeaderRightArea />
      </div>
    </nav>
  );
}

export default function MinimalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="bg-light-100 dark:bg-dark-100 mt-8 flex min-h-screen flex-col gap-6 px-4 sm:px-6 lg:px-8 3xl:px-10">
        <main className="mx-auto mb-12 flex w-full max-w-[2160px] flex-grow flex-col @container">
          {children}
        </main>
      </div>
    </>
  );
}
