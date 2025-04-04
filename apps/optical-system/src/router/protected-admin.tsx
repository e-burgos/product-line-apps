import { useAuthStore, useInitCloudDB } from '@product-line/dexie';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from './menu-items';

interface ProtectedAdminProps {
  children: React.ReactNode;
  redirectTo: AppRoutes;
}

const ProtectedAdmin: React.FC<ProtectedAdminProps> = ({
  children,
  redirectTo,
}) => {
  const navigate = useNavigate();
  const { isAdmin } = useInitCloudDB();
  const { setLastRouteVisited, lastRouteVisited } = useAuthStore();

  useEffect(() => {
    setLastRouteVisited(redirectTo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectTo]);

  useEffect(() => {
    if (!isAdmin) navigate(lastRouteVisited ?? '/');
  }, [isAdmin, navigate, lastRouteVisited]);

  return <>{children}</>;
};

export default ProtectedAdmin;
