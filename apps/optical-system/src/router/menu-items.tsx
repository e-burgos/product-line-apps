import BudgetsPage from '@optical-system-app/pages/budgets-page';
import CustomerDetailPage from '@optical-system-app/pages/customer-detail-page';
import CustomersPage from '@optical-system-app/pages/customers-page';
import PrescriptionsPage from '@optical-system-app/pages/prescriptions-page';
import ProductsPage from '@optical-system-app/pages/products-page';
import { IMenuItem } from 'libs/ui/src/types';

import { Users, User, DockIcon, Package, FileBoxIcon } from 'lucide-react';

export const menuItems: IMenuItem[] = [
  {
    name: 'Clientes',
    icon: <Users className="h-18 w-18 -ml-1" />,
    href: '/customers',
    component: <CustomersPage />,
  },
  {
    name: 'Detalles del Cliente',
    icon: <User className="h-18 w-18 -ml-1" />,
    href: '/customers/:id',
    hide: true,
    component: <CustomerDetailPage />,
  },
  {
    name: 'Fichas',
    icon: <DockIcon className="h-18 w-18 -ml-1" />,
    href: '/prescriptions',
    component: <PrescriptionsPage />,
  },
  {
    name: 'Presupuestos',
    icon: <FileBoxIcon className="h-18 w-18 -ml-1" />,
    href: '/budgets',
    component: <BudgetsPage />,
  },
  {
    name: 'Productos',
    icon: <Package className="h-18 w-18 -ml-1" />,
    href: '/products',
    component: <ProductsPage />,
  },
];
