import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import Button from 'libs/ui/src/components/button/button';
import { ShoppingBag, Menu, XIcon } from 'lucide-react';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cart, isCartOpen, setIsCartOpen } = useCartStore();

  const cartItemsCount = cart.items.reduce(
    (total: number, item: { quantity: number }) => total + item.quantity,
    0
  );

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Anteojos de Sol', href: '/products/sun' },
    { name: 'Anteojos de Receta', href: '/products/prescription' },
    { name: 'Deportivos', href: '/products/sports' },
    { name: 'Niños', href: '/products/kids' },
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
    <header className="sticky top-0 z-50 bg-white dark:bg-black dark:text-white text-current shadow-inner border-b border-gray-100 dark:border-gray-800">
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

          <div className="hidden sm:ml-6 sm:flex sm:items-center relative">
            <Button
              variant="transparent"
              size="mini"
              shape="circle"
              onClick={toggleCart}
              aria-label="Ver carrito"
              className=""
            >
              <ShoppingBag className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute z-10 top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </div>

          <div className="-mr-2 flex items-center sm:hidden relative">
            {/* Botón del carrito para móviles */}
            <Button
              variant="transparent"
              size="mini"
              shape="circle"
              onClick={toggleCart}
              aria-label="Ver carrito"
              className="mr-2"
            >
              <ShoppingBag className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-1 -mt-1 -mr-0 bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Button>
            {/* Botón del menú para móviles */}
            <Button
              variant="ghost"
              size="mini"
              shape="circle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Abrir menú principal"
              className="h-6 w-6"
            >
              <span className="sr-only">Abrir menú principal</span>
              <Menu
                className={`${!isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
              />

              <XIcon
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
              />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } sm:hidden shadow-inner pattern-diagonal-lines pattern-gray-50 dark:pattern-gray-950 pattern-bg-white dark:pattern-bg-black pattern-size-2 pattern-opacity-100 border-b border-gray-200 dark:border-gray-800`}
      >
        <div className="pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                isActive(item.href)
                  ? 'bg-brand/15 border-brand text-current dark:text-white'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-800 dark:hover:text-gray-200'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};
