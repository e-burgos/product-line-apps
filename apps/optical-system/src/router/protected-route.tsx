import {
  useAuthStore,
  useCustomerMethods,
  useInitCloudDB,
} from '@product-line/dexie';
import Spinner from 'libs/ui/src/components/spinner';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { appRoutes, AppRoutes } from './menu-items';
interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: AppRoutes;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useInitCloudDB();
  const { customers } = useCustomerMethods();
  const { setLastRouteVisited, setLoading, loading, isLoggedIn } =
    useAuthStore();

  const isSignInPage = location?.pathname === appRoutes.signIn;
  const [statusPage, setStatusPage] = useState<'loading' | 'syncing' | 'ready'>(
    'loading'
  );

  const handleCheckLogin = useCallback(async () => {
    setStatusPage('syncing');
    if (!isSignInPage) {
      setLastRouteVisited(location?.pathname);
      login();

      setTimeout(() => {
        if (isLoggedIn) {
          setLoading(false);
          setStatusPage('ready');
        } else {
          navigate(appRoutes.signIn);
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
