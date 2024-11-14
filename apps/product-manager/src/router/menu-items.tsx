import { HomeIcon } from 'libs/ui/src/components/icons/home';
import { IMenuItem } from 'libs/ui/src/types';
import HomePage from '../pages/home-page';

export const menuItems: IMenuItem[] = [
  {
    name: 'Presupuestos',
    icon: <HomeIcon />,
    href: '/',
    component: <HomePage />,
  },
  {
    name: 'Productos',
    icon: <HomeIcon />,
    href: '/products',
    component: <HomePage />,
  },
  {
    name: 'Categorías',
    icon: <HomeIcon />,
    href: '/categories',
    component: <HomePage />,
  },
];
