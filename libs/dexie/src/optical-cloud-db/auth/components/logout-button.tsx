import Button from 'libs/ui/src/components/button';
import { WifiOff, Wifi, LogOut } from 'lucide-react';
import useWindowSize from 'react-use/lib/useWindowSize';
import useInitCloudDB from '../hooks/use-init-cloud-db';

export const LogoutButton = () => {
  const { width } = useWindowSize();
  const { logout, isUserAuthorized, dbStatus } = useInitCloudDB();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex items-center gap-3">
      {isUserAuthorized && (
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
      )}
      {
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
      }
    </div>
  );
};

export default LogoutButton;
