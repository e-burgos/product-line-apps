import { Suspense, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ModalsContainer from 'libs/ui/src/components/modal-views/container';
import DrawersContainer from 'libs/ui/src/components/drawer-views/container';
import SettingsButton from 'libs/ui/src/themes/components/settings-button';
import SettingsDrawer from 'libs/ui/src/themes/components/settings-drawer';
import { WalletConnect, WagmiConfig } from 'libs/integrations/src';
import { QueryClientProvider } from '../../config/query-client-provider';
import { useTheme } from 'libs/ui/src/themes/use-theme';
import { IMenuItem } from 'libs/ui/src/types';
import LayoutType from './LayoutType';
import AppRoutes from './AppRoutes';
import { commonMenuItems } from '../../router/menu-items';
import {
  ColorPreset,
  defaultColorPreset,
  defaultLogo,
  defaultSettingActions,
  ISettingAction,
  IThemeItem,
  LAYOUT_OPTIONS,
  LogoType,
  PresetColorType,
} from 'libs/ui/src/themes/config';

// base css file
import 'overlayscrollbars/overlayscrollbars.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'libs/ui/src/assets/css/scrollbar.css';
import 'libs/ui/src/assets/css/globals.css';
import 'libs/ui/src/assets/css/range-slider.css';
import 'libs/ui/src/assets/css/fonts.css';

interface MainLayoutProps {
  menuItems: IMenuItem[];
  isWagmiConfig?: boolean;
  layout?: LAYOUT_OPTIONS;
  isNotificationButton?: boolean;
  rightButton?: React.ReactNode;
  logo?: LogoType;
  brandColor?: PresetColorType;
  showSettings?: boolean;
  showSearch?: boolean;
  settingActions?: ISettingAction;
}

export function MainLayout({
  menuItems: appMenuItems,
  layout,
  isWagmiConfig = false,
  isNotificationButton,
  rightButton,
  logo,
  brandColor,
  showSettings,
  showSearch,
  settingActions = defaultSettingActions,
}: MainLayoutProps) {
  const {
    mode,
    setLogo,
    setPreset,
    setShowSettings,
    setShowSearch,
    setSettingActions,
  } = useTheme();
  const htmlTag = document.documentElement;
  const menuItems = [...appMenuItems, ...commonMenuItems];
  const menuList = menuItems.filter((item) => !item.hide);

  const selectedColor = ColorPreset.find(
    (item: IThemeItem) => item.label === brandColor
  );

  const checkSettingActions = settingActions || layout || brandColor;

  useEffect(() => {
    if (logo) {
      setLogo(logo);
    } else setLogo(defaultLogo);

    if (selectedColor) {
      setPreset(selectedColor);
    } else setPreset(defaultColorPreset);

    if (showSettings) {
      setShowSettings(showSettings);
    } else setShowSettings(false);

    if (showSearch) {
      setShowSearch(showSearch);
    } else setShowSearch(false);

    if (checkSettingActions) {
      setSettingActions({
        ...defaultSettingActions,
        disabledLayout: layout || settingActions?.disabledLayout ? true : false,
        disabledPreset:
          brandColor || settingActions?.disabledPreset ? true : false,
        disabledDirection: settingActions?.disabledDirection ? true : false,
        disabledMode: settingActions?.disabledMode ? true : false,
      });
    } else setSettingActions(defaultSettingActions);
  }, [
    logo,
    showSettings,
    showSearch,
    settingActions,
    selectedColor,
    setLogo,
    setPreset,
    setShowSettings,
    setShowSearch,
    setSettingActions,
    layout,
    brandColor,
    checkSettingActions,
  ]);

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

  if (isWagmiConfig)
    return (
      <BrowserRouter>
        <WagmiConfig>
          <QueryClientProvider>
            <SettingsButton />
            <SettingsDrawer />
            <Suspense fallback={null}>
              <ModalsContainer />
              <DrawersContainer menuItems={menuList} />
            </Suspense>
            <LayoutType
              layout={layout}
              menuItems={menuList}
              isNotificationButton={isNotificationButton}
              rightButton={<WalletConnect />}
            >
              <AppRoutes menuItems={menuItems} />
            </LayoutType>
          </QueryClientProvider>
        </WagmiConfig>
      </BrowserRouter>
    );

  return (
    <BrowserRouter>
      <QueryClientProvider>
        <SettingsButton />
        <SettingsDrawer />
        <Suspense fallback={null}>
          <ModalsContainer />
          <DrawersContainer menuItems={menuList} />
        </Suspense>
        <LayoutType
          layout={layout}
          menuItems={menuList}
          isNotificationButton={isNotificationButton}
          rightButton={rightButton}
        >
          <AppRoutes menuItems={menuItems} />
        </LayoutType>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default MainLayout;
