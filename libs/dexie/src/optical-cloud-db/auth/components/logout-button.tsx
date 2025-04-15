import Button from 'libs/ui/src/components/button';
import {
  WifiOff,
  Wifi,
  LogOut,
  UserRoundX,
  UserRoundCheck,
} from 'lucide-react';
import useWindowSize from 'react-use/lib/useWindowSize';
import useInitCloudDB from '../hooks/use-init-cloud-db';
import { commonRoutePaths } from 'libs/shell/src/router/routes';
import { AppRoutes } from '@optical-system-app/router/menu-items';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../hooks/use-auth-store';
import UserDataModal from './user-data-modal';

export const LogoutButton = () => {
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { setLastRouteVisited, setOpenUserDataModal } = useAuthStore();
  const { logout, dbStatus, isLoggedIn } = useInitCloudDB();

  const handleLogout = async () => {
    const response = await logout();
    console.log('response', response);
    if (response.isSuccess) {
      setLastRouteVisited(commonRoutePaths.signIn as AppRoutes);
      navigate(commonRoutePaths.signIn as AppRoutes);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="ghost"
        shape={'circle'}
        size="small"
        onClick={handleLogout}
      >
        <div className="flex items-center">
          <LogOut className={width > 700 ? 'h-5 w-5' : 'h-4 w-4'} />
        </div>
      </Button>
      <Button
        variant="ghost"
        shape={'circle'}
        size="small"
        color={!isLoggedIn ? 'danger' : 'success'}
        onClick={() => setOpenUserDataModal(true)}
      >
        <div className="flex items-center">
          {!isLoggedIn ? (
            <UserRoundX
              className={
                width > 700 ? 'h-5 w-5 text-red-500' : 'h-4 w-4 text-red-500'
              }
            />
          ) : (
            <UserRoundCheck
              className={
                width > 700
                  ? 'h-5 w-5 text-green-500'
                  : 'h-4 w-4 text-green-500'
              }
            />
          )}
        </div>
      </Button>
      <Button
        variant="ghost"
        shape="circle"
        size="small"
        color={dbStatus?.phase === 'offline' ? 'danger' : 'success'}
      >
        {dbStatus?.phase === 'offline' ? (
          <div className="flex items-center">
            <WifiOff className={width > 700 ? 'h-5 w-5' : 'h-4 w-4'} />
          </div>
        ) : (
          <div className="flex items-center">
            <Wifi className={width > 700 ? 'h-5 w-5' : 'h-4 w-4'} />
          </div>
        )}
      </Button>
      <UserDataModal />
    </div>
  );
};

export default LogoutButton;
