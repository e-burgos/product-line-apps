import MinimalLayout from 'libs/ui/src/components/layouts/minimal/layout';
import ClassicLayout from 'libs/ui/src/components/layouts/classic/layout';
import RetroLayout from 'libs/ui/src/components/layouts/retro/layout';
import ModernLayout from 'libs/ui/src/components/layouts/modern/layout';
import AuthLayout from 'libs/ui/src/components/layouts/authentication/layout';
import { LAYOUT_OPTIONS } from 'libs/ui/src/themes/config';
import { IMenuItem } from 'libs/ui/src/types';
import { FC } from 'react';
import { useTheme } from 'libs/ui/src/themes/use-theme';
import { useLocation } from 'react-router-dom';
import Toast from 'libs/ui/src/components/toast';

interface LayoutTypeProps {
  children: React.ReactNode;
  menuItems: IMenuItem[];
  layout?: LAYOUT_OPTIONS;
  isNotificationButton?: boolean;
  rightButton?: React.ReactNode;
}

export const LayoutType: FC<LayoutTypeProps> = ({
  children,
  layout,
  menuItems,
  isNotificationButton,
  rightButton,
}) => {
  const location = useLocation();
  const { layout: storeLayout } = useTheme();
  const selectedLayout = layout || storeLayout;

  const handleLayout = () => {
    if (location.pathname.includes('/auth/'))
      return <AuthLayout>{children}</AuthLayout>;
    switch (selectedLayout) {
      case LAYOUT_OPTIONS.MINIMAL:
        return (
          <MinimalLayout
            menuItems={menuItems}
            isNotificationButton={isNotificationButton}
            rightButton={rightButton}
          >
            {children}
            <Toast />
          </MinimalLayout>
        );
      case LAYOUT_OPTIONS.CLASSIC:
        return (
          <ClassicLayout
            menuItems={menuItems}
            isNotificationButton={isNotificationButton}
            rightButton={rightButton}
          >
            {children}
            <Toast />
          </ClassicLayout>
        );
      case LAYOUT_OPTIONS.RETRO:
        return (
          <RetroLayout
            menuItems={menuItems}
            isNotificationButton={isNotificationButton}
            rightButton={rightButton}
          >
            {children}
            <Toast />
          </RetroLayout>
        );
      default:
        return (
          <ModernLayout
            menuItems={menuItems}
            isNotificationButton={isNotificationButton}
            rightButton={rightButton}
          >
            {children}
            <Toast />
          </ModernLayout>
        );
    }
  };

  return handleLayout();
};

export default LayoutType;
