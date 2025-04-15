import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../lib/store/cartStore';
import Button from 'libs/ui/src/components/button/button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart } = useCartStore();

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2text-brand dark:text-optical-blue-400"
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
              Mi Carrito (
              {cart.items.reduce((acc, item) => acc + item.quantity, 0)} items)
            </h2>
            <Button
              variant="transparent"
              color="gray"
              size="mini"
              shape="circle"
              onClick={onClose}
              aria-label="Cerrar"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto px-4 py-2">
            {cart.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mb-4 text-gray-300 dark:text-gray-600"
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
                <p className="text-lg font-medium">Tu carrito está vacío</p>
                <p className="mt-1">
                  Agrega productos a tu carrito para continuar comprando
                </p>
                <div className="mt-4">
                  <Button
                    color="primary"
                    onClick={onClose}
                    className="flex items-center"
                  >
                    <span>Ver Productos</span>
                  </Button>
                </div>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {cart.items.map((item) => (
                  <li key={item.id} className="py-4 flex">
                    <div className="flex-shrink-0 w-16 h-16 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                      <img
                        src={item.variant.images[0] || item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1 flex flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                          <h3>
                            <Link
                              to={`/producto/${item.product.id}`}
                              onClick={onClose}
                            >
                              {item.product.name}
                            </Link>
                          </h3>
                          <p className="ml-4">
                            $
                            {(
                              (item.product.discountPrice ||
                                item.product.price) * item.quantity
                            ).toFixed(2)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {item.variant.name} - {item.variant.color}
                        </p>
                      </div>
                      <div className="flex-1 flex items-end justify-between text-sm">
                        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md">
                          <Button
                            variant="transparent"
                            color="gray"
                            size="tiny"
                            className="border-r border-gray-200 dark:border-gray-700"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 12H4"
                              />
                            </svg>
                          </Button>
                          <span className="w-8 text-center text-gray-700 dark:text-gray-300">
                            {item.quantity}
                          </span>
                          <Button
                            variant="transparent"
                            color="gray"
                            size="tiny"
                            className="border-l border-gray-200 dark:border-gray-700"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={item.quantity >= item.variant.stock}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </Button>
                        </div>
                        <Button
                          variant="transparent"
                          color="danger"
                          size="tiny"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Eliminar"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </li>
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
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="ghost"
                  className="flex justify-center"
                  onClick={onClose}
                >
                  Ver Carrito
                </Button>
                <Button
                  variant="solid"
                  color="primary"
                  className="flex justify-center"
                  onClick={onClose}
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
