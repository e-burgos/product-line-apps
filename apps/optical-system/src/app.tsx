import MainLayout from 'libs/shell/src/components/layout/MainLayout';
import { menuItems } from './router/menu-items';
import { LAYOUT_OPTIONS } from 'libs/ui/src/themes/config';

export function App() {
  return (
    <MainLayout
      layout={LAYOUT_OPTIONS.CLASSIC}
      menuItems={menuItems}
      logo={{ name: 'Siochana', secondName: 'Visión' }}
      brandColor="Red"
      showSettings
      settingActions={{
        disabledDirection: true,
      }}
    />
  );
}

export default App;
