import { useInitCloudDB } from '@product-line/dexie';
import { commonRoutePaths } from 'libs/shell/src/router/routes';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isUserAuthorized, getUserLogged } = useInitCloudDB();

  useEffect(() => {
    getUserLogged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isUserAuthorized) navigate(commonRoutePaths.signIn);
  }, [isUserAuthorized, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
