import { Suspense, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ModalsContainer from '../modal-views/container';
import DrawersContainer from '../drawer-views/container';
import { LAYOUT_OPTIONS } from '../../themes/config';
import { useTheme } from '../../themes/use-theme';
import MinimalLayout from './minimal/layout';
import ClassicLayout from './classic/layout';
import RetroLayout from './retro/layout';
import ModernLayout from './modern/layout';

// base css file
import 'overlayscrollbars/overlayscrollbars.css';
import 'swiper/css';
import 'swiper/css/pagination';
import '../../assets/css/scrollbar.css';
import '../../assets/css/globals.css';
import '../../assets/css/range-slider.css';
import '../../assets/css/fonts.css';
import AuthLayout from './authentication/layout';
import { IMenuItem } from '../../types';
import SettingsButton from '../../themes/components/settings-button';
import SettingsDrawer from '../../themes/components/settings-drawer';

interface LayoutTypeProps {
  children: React.ReactNode;
  routePaths: Record<string, string>;
  menuItems: IMenuItem[];
}

const LayoutType = ({ children, routePaths, menuItems }: LayoutTypeProps) => {
  const { layout } = useTheme();
  if (layout === LAYOUT_OPTIONS.AUTH) {
    return <AuthLayout>{children}</AuthLayout>;
  }
  if (layout === LAYOUT_OPTIONS.MINIMAL) {
    return (
      <MinimalLayout
        notificationPath={routePaths.notifications || '/'}
        menuItems={menuItems}
      >
        {children}
      </MinimalLayout>
    );
  }
  if (layout === LAYOUT_OPTIONS.CLASSIC) {
    return (
      <ClassicLayout menuItems={menuItems} routePaths={routePaths}>
        {children}
      </ClassicLayout>
    );
  }
  if (layout === LAYOUT_OPTIONS.RETRO) {
    return <RetroLayout routePaths={routePaths}>{children}</RetroLayout>;
  }
  return (
    <ModernLayout menuItems={menuItems} routePaths={routePaths}>
      {children}
    </ModernLayout>
  );
};

export default function RootLayout({
  children,
  routePaths,
  menuItems,
}: {
  children: React.ReactNode;
  routePaths: Record<string, string>;
  menuItems: IMenuItem[];
}) {
  const { mode } = useTheme();
  const htmlTag = document.documentElement;

  useEffect(() => {
    if (htmlTag) {
      if (mode === 'dark') {
        htmlTag.classList.remove('light');
        htmlTag.classList.add('dark');
      } else {
        htmlTag.classList.remove('dark');
        htmlTag.classList.add('light');
      }
    }
  }, [htmlTag, mode]);

  return (
    <BrowserRouter>
      {/* <WagmiConfig>
        <QueryClientProvider> */}
      <SettingsButton />
      <SettingsDrawer />
      <Suspense fallback={null}>
        <ModalsContainer />
        <DrawersContainer />
      </Suspense>
      <LayoutType routePaths={routePaths} menuItems={menuItems}>
        {children}
      </LayoutType>
      {/* </QueryClientProvider>
      </WagmiConfig> */}
    </BrowserRouter>
  );
}
