import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { IMenuItem } from 'libs/ui/src/types';
import { commonRoutePaths } from 'libs/shell/src/router/routes';
import NotAuthorizedPage from 'libs/shell/src/components/pages/not-authorized';
import { NotFoundPage } from 'libs/shell/src/components/pages/not-found';
import ProtectedRoute from './protected-route';

export type AppRouteType = { key: string; path: string; element: JSX.Element };

interface AppRoutesProps {
  menuItems: IMenuItem[];
}

export const AppRoutes: FC<AppRoutesProps> = ({ menuItems }) => {
  const handleRoutes = () => {
    const filterRoutes: AppRouteType[] = [];
    menuItems.forEach((route, index) => {
      if (route.component)
        filterRoutes.push({
          key: `route-${index}`,
          path: route.href,
          element: route.component,
        });
      if (route.dropdownItems) {
        route.dropdownItems.forEach((dropdownRoute, dropdownIndex) => {
          if (dropdownRoute.component)
            filterRoutes.push({
              key: `route-${index}-${dropdownIndex}`,
              path: dropdownRoute.href,
              element: dropdownRoute.component,
            });
        });
      }
    });
    return filterRoutes;
  };

  const routes = handleRoutes();

  return (
    <ProtectedRoute>
      <Routes>
        {routes.map((route) => (
          <Route key={route.key} path={route.path} element={route.element} />
        ))}
        <Route
          key={'home-page'}
          path={'/'}
          element={<Navigate replace to={routes[0].path} />}
        />
        <Route
          key={'not-authorized-page'}
          path={commonRoutePaths.noAuthorized}
          element={<NotAuthorizedPage />}
        />
        <Route
          key={'not-found-page'}
          path={commonRoutePaths.notFound}
          element={<NotFoundPage />}
        />
      </Routes>
    </ProtectedRoute>
  );
};

export default AppRoutes;
