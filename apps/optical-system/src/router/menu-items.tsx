import BudgetsPage from '@optical-system-app/pages/budgets-page';
import CustomerDetailPage from '@optical-system-app/pages/customer-detail-page';
import CustomersPage from '@optical-system-app/pages/customers-page';
import PrescriptionDetailPage from '@optical-system-app/pages/prescription-detail-page';
import PrescriptionsPage from '@optical-system-app/pages/prescriptions-page';
import ProductsPage from '@optical-system-app/pages/products-page';
import SignInPage from '@optical-system-app/pages/sign-in';
import {
  commonRouteLabels,
  commonRoutePaths,
} from 'libs/shell/src/router/routes';
import { IMenuItem } from 'libs/ui/src/types';

import {
  Users,
  User,
  ReceiptIcon,
  Package,
  FileBoxIcon,
  Settings,
} from 'lucide-react';
import ProtectedRoute from './protected-route';
import { useMemo } from 'react';
import { useInitCloudDB } from '@product-line/dexie';
import ProtectedAdmin from './protected-admin';
import AdminPage from '@optical-system-app/pages/admin-page';

export const appRoutes = {
  customers: '/customers',
  prescriptions: '/prescriptions',
  products: '/products',
  budgets: '/budgets',
  admin: '/admin',
};

export const useMenuItems = (): IMenuItem[] => {
  const { isAdmin } = useInitCloudDB();
  return useMemo(
    () => [
      {
        name: 'Clientes',
        icon: <Users className="h-18 w-18 -ml-1" />,
        href: appRoutes.customers,
        component: (
          <ProtectedRoute>
            <CustomersPage />
          </ProtectedRoute>
        ),
      },
      {
        name: 'Detalles del Cliente',
        icon: <User className="h-18 w-18 -ml-1" />,
        href: `${appRoutes.customers}/:id`,
        hide: true,
        component: (
          <ProtectedRoute>
            <CustomerDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        name: 'Fichas',
        icon: <ReceiptIcon className="h-18 w-18 -ml-1" />,
        href: appRoutes.prescriptions,
        component: (
          <ProtectedRoute>
            <PrescriptionsPage />
          </ProtectedRoute>
        ),
      },
      {
        name: 'Detalles de la Ficha',
        icon: <ReceiptIcon className="h-18 w-18 -ml-1" />,
        href: `${appRoutes.prescriptions}/:id`,
        hide: true,
        component: (
          <ProtectedRoute>
            <PrescriptionDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        name: 'Presupuestos',
        icon: <FileBoxIcon className="h-18 w-18 -ml-1" />,
        href: appRoutes.budgets,
        component: (
          <ProtectedRoute>
            <BudgetsPage />
          </ProtectedRoute>
        ),
      },
      {
        name: 'Productos',
        icon: <Package className="h-18 w-18 -ml-1" />,
        href: appRoutes.products,
        component: (
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        ),
      },
      {
        name: commonRouteLabels.signIn,
        href: commonRoutePaths.signIn,
        hide: true,
        component: <SignInPage />,
      },
      {
        name: 'Administración',
        icon: <Settings className="h-18 w-18 -ml-1" />,
        href: appRoutes.admin,
        hide: !isAdmin,
        component: (
          <ProtectedAdmin>
            <AdminPage />
          </ProtectedAdmin>
        ),
      },
    ],
    [isAdmin]
  );
};
