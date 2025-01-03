import { HomeIcon } from 'libs/ui/src/components/icons/home';
import { IMenuItem } from 'libs/ui/src/types';
import BudgetsPage from '../pages/budgets-page';
import ProductsPage from '@product-manager-app/pages/products-page';

export const menuItems: IMenuItem[] = [
  {
    name: 'Presupuestos',
    icon: <HomeIcon />,
    href: '/budgets',
    component: <BudgetsPage />,
  },
  {
    name: 'Productos',
    icon: <HomeIcon />,
    href: '/products',
    component: <ProductsPage />,
  },
];
