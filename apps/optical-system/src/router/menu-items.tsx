import BudgetsPage from '@optical-system-app/pages/budgets-page';
import CustomerDetailPage from '@optical-system-app/pages/customer-detail-page';
import CustomersPage from '@optical-system-app/pages/customers-page';
import PrescriptionDetailPage from '@optical-system-app/pages/prescription-detail-page';
import PrescriptionsPage from '@optical-system-app/pages/prescriptions-page';
import ProductsPage from '@optical-system-app/pages/products-page';
import SignInPage from '@optical-system-app/pages/sign-in';
import { IMenuItem } from 'libs/ui/src/types';
import { useMemo } from 'react';
import { useInitCloudDB } from '@product-line/dexie';
import ProtectedAdmin from './protected-admin';
import AdminPage from '@optical-system-app/pages/admin-page';
import {
  Users,
  User,
  ReceiptIcon,
  Package,
  FileBoxIcon,
  Settings,
} from 'lucide-react';

export enum AppRoutes {
  HOME = '/',
  CUSTOMERS = '/customers',
  CUSTOMERS_DETAIL = '/customers/:id',
  PRESCRIPTIONS = '/prescriptions',
  PRESCRIPTIONS_DETAIL = '/prescriptions/:id',
  PRODUCTS = '/products',
  BUDGETS = '/budgets',
  ADMIN = '/admin',
  SIGN_IN = '/auth/sign-in',
  NO_AUTHORIZED = '/no-authorized',
  NOT_FOUND = '*',
}

export const appRoutes = {
  home: AppRoutes.HOME,
  customers: AppRoutes.CUSTOMERS,
  customersDetail: AppRoutes.CUSTOMERS_DETAIL,
  prescriptions: AppRoutes.PRESCRIPTIONS,
  prescriptionsDetail: AppRoutes.PRESCRIPTIONS_DETAIL,
  products: AppRoutes.PRODUCTS,
  budgets: AppRoutes.BUDGETS,
  admin: AppRoutes.ADMIN,
  signIn: AppRoutes.SIGN_IN,
  noAuthorized: AppRoutes.NO_AUTHORIZED,
  notFound: AppRoutes.NOT_FOUND,
};

export const useMenuItems = (): IMenuItem[] => {
  const { isAdmin } = useInitCloudDB();
  return useMemo(
    () => [
      {
        name: 'Clientes',
        icon: <Users className="h-18 w-18 -ml-1" />,
        href: appRoutes.customers,
        component: <CustomersPage />,
      },
      {
        name: 'Detalles del Cliente',
        icon: <User className="h-18 w-18 -ml-1" />,
        href: appRoutes.customersDetail,
        hide: true,
        component: <CustomerDetailPage />,
      },
      {
        name: 'Fichas',
        icon: <ReceiptIcon className="h-18 w-18 -ml-1" />,
        href: appRoutes.prescriptions,
        component: <PrescriptionsPage />,
      },
      {
        name: 'Detalles de la Ficha',
        icon: <ReceiptIcon className="h-18 w-18 -ml-1" />,
        href: appRoutes.prescriptionsDetail,
        hide: true,
        component: <PrescriptionDetailPage />,
      },
      {
        name: 'Presupuestos',
        icon: <FileBoxIcon className="h-18 w-18 -ml-1" />,
        href: appRoutes.budgets,
        component: <BudgetsPage />,
      },
      {
        name: 'Productos',
        icon: <Package className="h-18 w-18 -ml-1" />,
        href: appRoutes.products,
        component: <ProductsPage />,
      },
      {
        name: 'Administración',
        icon: <Settings className="h-18 w-18 -ml-1" />,
        href: appRoutes.admin,
        hide: !isAdmin,
        component: (
          <ProtectedAdmin redirectTo={appRoutes.admin}>
            <AdminPage />
          </ProtectedAdmin>
        ),
      },
      {
        name: appRoutes.signIn,
        href: appRoutes.signIn,
        hide: true,
        component: <SignInPage />,
      },
    ],
    [isAdmin]
  );
};
