import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppRoutes } from '../menu-items';
import { useAuthStore } from '@product-line/dexie';

const useLastRouteVisited = () => {
  const { pathname } = useLocation();
  const { setLastRouteVisited, lastRouteVisited } = useAuthStore();

  useEffect(() => {
    setLastRouteVisited(pathname as AppRoutes);
  }, [pathname, setLastRouteVisited]);

  return { lastRouteVisited };
};

export default useLastRouteVisited;
