import MainLayout from 'libs/shell/src/components/layout/MainLayout';
import { LAYOUT_OPTIONS } from 'libs/ui/src/themes/config';
import { appName } from './utils/const';
import { LogoutButton } from '@product-line/dexie';
import { appRoutes, useMenuItems } from './router/menu-items';
import { useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import AppRoutes from './router/app-routes';
import './assets/styles/styles.css';

export function App() {
  const menuItems = useMenuItems();
  const [queryClient] = useState(() => new QueryClient());

  const firstName = appName?.split(' ')[0] || '';
  const secondName = appName?.split(' ')[1] || '';

  return (
    <MainLayout
      showSettings
      layout={LAYOUT_OPTIONS.MINIMAL}
      brandColor="Red"
      menuItems={menuItems}
      queryClient={queryClient}
      logo={{ name: firstName, secondName: secondName }}
      rightButton={<LogoutButton redirectTo={appRoutes.signIn} />}
      customRoutes={<AppRoutes menuItems={menuItems} />}
      settingActions={{
        disabledDirection: true,
      }}
    />
  );
}

export default App;
