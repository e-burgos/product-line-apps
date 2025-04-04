import {
  useAuthStore,
  useCustomerMethods,
  useInitCloudDB,
} from '@product-line/dexie';
import { commonRoutePaths } from 'libs/shell/src/router/routes';
import Spinner from 'libs/ui/src/components/spinner';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppRoutes } from './menu-items';
interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: AppRoutes;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, syncDb } = useInitCloudDB();
  const { customers } = useCustomerMethods();
  const { setLastRouteVisited, setLoading, loading, isLoggedIn } =
    useAuthStore();

  const isSignInPage = location?.pathname === commonRoutePaths.signIn;
  const [statusPage, setStatusPage] = useState<'loading' | 'syncing' | 'ready'>(
    'loading'
  );

  const handleCheckLogin = useCallback(async () => {
    setStatusPage('syncing');
    if (!isSignInPage) {
      setLastRouteVisited(location?.pathname);
      login();
      setTimeout(() => {
        if (!isLoggedIn) navigate(commonRoutePaths.signIn);
        if (isLoggedIn) {
          setLoading(false);
          syncDb();
          setStatusPage('ready');
        }
      }, 2000);
    }
  }, [
    isLoggedIn,
    isSignInPage,
    location?.pathname,
    login,
    navigate,
    setLastRouteVisited,
    setLoading,
    syncDb,
  ]);

  useEffect(() => {
    handleCheckLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (statusPage === 'ready') {
      if (customers === undefined) navigate(0);
    }
  }, [statusPage, customers, navigate]);

  return (
    <>
      {loading && !isSignInPage ? (
        <div className="flex h-screen w-screen items-center justify-center fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <Spinner />
          <div style={{ visibility: 'hidden', position: 'absolute' }}>
            {children}
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default ProtectedRoute;
