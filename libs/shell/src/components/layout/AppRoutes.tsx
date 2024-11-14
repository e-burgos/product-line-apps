import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from '../pages/not-found';
import { commonRoutePaths } from '../../router/routes';
import { IMenuItem } from 'libs/ui/src/types';

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
    <Routes>
      {routes.map((route) => (
        <Route key={route.key} path={route.path} element={route.element} />
      ))}
      <Route
        key={'not-found-page'}
        path={commonRoutePaths.notFound}
        element={<NotFoundPage />}
      />
    </Routes>
  );
};

export default AppRoutes;
