import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '../../lib/store/cartStore';
import { CartDrawer } from '../cart/CartDrawer';
import Button from 'libs/ui/src/components/button/button';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const { cart } = useCartStore();

  const cartItemsCount = cart.items.reduce(
    (total: number, item: { quantity: number }) => total + item.quantity,
    0
  );

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Anteojos de Sol', href: '/productos/sun' },
    { name: 'Anteojos de Receta', href: '/productos/prescription' },
    { name: 'Deportivos', href: '/productos/sports' },
    { name: 'Niños', href: '/productos/kids' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <header className="bg-white dark:bg-dark dark:text-white text-current shadow-md sticky top-0 z-50">
        <nav className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-2xl font-bold text-brand">
                  OpticalName
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      isActive(item.href)
                        ? 'border-brand text-brand font-extrabold text-lg'
                        : 'border-transparent text-sm dark:text-white text-current hover:border-brand hover:text-brand dark:hover:text-brand'
                    } inline-flex items-center px-1 pt-1 border-b-2`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Button
                variant="transparent"
                color="gray"
                size="mini"
                shape="circle"
                onClick={toggleCart}
                aria-label="Ver carrito"
                className="relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartItemsCount > 0 && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </div>

            <div className="-mr-2 flex items-center sm:hidden">
              {/* Botón del carrito para móviles */}
              <Button
                variant="transparent"
                color="gray"
                size="mini"
                shape="circle"
                onClick={toggleCart}
                aria-label="Ver carrito"
                className="relative mr-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartItemsCount > 0 && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {cartItemsCount}
                  </span>
                )}
              </Button>

              {/* Botón del menú para móviles */}
              <Button
                variant="transparent"
                color="gray"
                size="mini"
                shape="circle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-label="Abrir menú principal"
              >
                <span className="sr-only">Abrir menú principal</span>
                <svg
                  className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>

                <svg
                  className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  isActive(item.href)
                    ? 'bg-optical-blue-50 dark:bg-optical-blue-900 border-optical-blue-500 text-optical-blue-700 dark:text-optical-blue-300'
                    : 'border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-800 dark:hover:text-gray-200'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
