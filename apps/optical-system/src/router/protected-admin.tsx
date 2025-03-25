import { useInitCloudDB } from '@product-line/dexie';
import { commonRoutePaths } from 'libs/shell/src/router/routes';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedAdminProps {
  children: React.ReactNode;
}

const ProtectedAdmin: React.FC<ProtectedAdminProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isAdmin, getUserLogged } = useInitCloudDB();

  useEffect(() => {
    getUserLogged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isAdmin) navigate(commonRoutePaths.signIn);
  }, [isAdmin, navigate]);

  return <>{children}</>;
};

export default ProtectedAdmin;
