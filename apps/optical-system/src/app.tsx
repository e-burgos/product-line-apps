import MainLayout from 'libs/shell/src/components/layout/MainLayout';
import { menuItems } from './router/menu-items';
import { LAYOUT_OPTIONS } from 'libs/ui/src/themes/config';
import { appName } from './utils/const';
import { LogoutButton } from '@product-line/dexie';

export function App() {
  const firstName = appName?.split(' ')[0] || '';
  const secondName = appName?.split(' ')[1] || '';
  return (
    <MainLayout
      rightButton={<LogoutButton />}
      layout={LAYOUT_OPTIONS.MINIMAL}
      menuItems={menuItems}
      logo={{ name: firstName, secondName: secondName }}
      brandColor="Red"
      showSettings
      settingActions={{
        disabledDirection: true,
      }}
    />
  );
}

export default App;
