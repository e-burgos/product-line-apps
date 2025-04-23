import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../lib/store/cartStore';
import Button from 'libs/ui/src/components/button/button';
import { ShoppingBagIcon, XIcon } from 'lucide-react';
import CartProductItem from './CartProductItem';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cart } = useCartStore();

  // Handler para cerrar al hacer clic fuera del drawer
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={handleOutsideClick}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-white dark:bg-dark shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-4 py-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
              <ShoppingBagIcon className="h-5 w-5 mr-2 text-brand dark:text-optical-blue-400" />
              Mi Carrito (
              {cart?.items?.reduce((acc, item) => acc + item.quantity, 0)}{' '}
              items)
            </h2>
            <Button
              variant="ghost"
              size="mini"
              shape="circle"
              onClick={onClose}
              aria-label="Cerrar"
            >
              <XIcon className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-2">
            {cart?.items?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
                <ShoppingBagIcon className="h-16 w-16 mb-4 text-gray-300 dark:text-gray-400" />
                <p className="text-lg font-medium text-current dark:text-white">
                  Tu carrito está vacío
                </p>
                <p className="mt-1">
                  Agrega productos a tu carrito para continuar comprando
                </p>
                <div className="mt-4">
                  <Button
                    variant="solid"
                    shape="rounded"
                    onClick={() => {
                      navigate('/products');
                      onClose();
                    }}
                  >
                    Ver Productos
                  </Button>
                </div>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {cart.items.map((item) => (
                  <CartProductItem
                    key={item.id}
                    item={item}
                    onClose={onClose}
                  />
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {cart.items.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 py-4 px-4">
              <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white mb-4">
                <p>Subtotal</p>
                <p>${cart.subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between w-full gap-4">
                <Button
                  variant="ghost"
                  shape="rounded"
                  size="medium"
                  fullWidth
                  onClick={() => {
                    navigate('/cart');
                    onClose();
                  }}
                >
                  Ver Carrito
                </Button>
                <Button
                  variant="solid"
                  color="primary"
                  shape="rounded"
                  size="medium"
                  fullWidth
                  onClick={() => {
                    navigate('/checkout');
                    onClose();
                  }}
                >
                  Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
