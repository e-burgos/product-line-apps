import React, { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import 'overlayscrollbars/overlayscrollbars.css';
import 'swiper/css';
import 'swiper/css/pagination';
import '../../assets/css/scrollbar.css';
import '../../assets/css/globals.css';
import '../../assets/css/range-slider.css';
import '../../assets/css/fonts.css';
import { useTheme } from 'libs/ui/src/themes/use-theme';
import SettingsButton from 'libs/ui/src/themes/components/settings-button';
import SettingsDrawer from 'libs/ui/src/themes/components/settings-drawer';
import { CartDrawer } from '../cart/CartDrawer';
import { useCartStore } from '../../lib/store/cartStore';
interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isCartOpen, setIsCartOpen } = useCartStore();
  const { mode, settingActions, setSettingActions } = useTheme();
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

  useEffect(() => {
    setSettingActions({
      ...settingActions,
      disabledLayout: true,
      disabledPreset: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="overflow-x-hidden flex-1 bg-gradient-to-b from-neutral-50 to-white dark:from-gray-800 dark:to-black dark:text-white text-current">
        {children}
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </main>
      <Footer />
      <SettingsButton />
      <SettingsDrawer />
    </div>
  );
};
