import MainLayout from 'libs/shell/src/components/layout/MainLayout';
import { LAYOUT_OPTIONS } from 'libs/ui/src/themes/config';
import { appName } from './utils/const';
import { LogoutButton } from '@product-line/dexie';
import { useMenuItems } from './router/menu-items';
import { useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import AppRoutes from './router/app-routes';

export function App() {
  const menuItems = useMenuItems();
  const firstName = appName?.split(' ')[0] || '';
  const secondName = appName?.split(' ')[1] || '';
  const [queryClient] = useState(() => new QueryClient());
  return (
    <MainLayout
      rightButton={<LogoutButton />}
      layout={LAYOUT_OPTIONS.MINIMAL}
      menuItems={menuItems}
      queryClient={queryClient}
      logo={{ name: firstName, secondName: secondName }}
      brandColor="Red"
      showSettings
      settingActions={{
        disabledDirection: true,
      }}
      customRoutes={<AppRoutes menuItems={menuItems} />}
    />
  );
}

export default App;
