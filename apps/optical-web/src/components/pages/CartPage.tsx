import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../lib/store/cartStore';
import Button from 'libs/ui/src/components/button/button';

export const CartPage = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart } = useCartStore();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
  };

  if (cart.items.length === 0) {
    return (
      <div className="bg-transparent">
        <div className="container-custom mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Tu carrito
            </h1>
            <p className="mt-4 text-gray-500">Tu carrito está vacío.</p>
            <div className="mt-6">
              <Link
                to="/products"
                className="inline-flex items-center bg-optical-blue-600 py-3 px-8 rounded-md font-medium text-white hover:bg-optical-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
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
                Continuar comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent">
      <div className="container-custom mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Tu carrito</h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <div className="lg:col-span-7">
            <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {cart.items.map((item) => (
                <li key={item.id} className="flex py-6 sm:py-8">
                  <div className="flex-shrink-0">
                    <img
                      src={item.variant.images[0] || item.product.images[0]}
                      alt={item.product.name}
                      className="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32"
                    />
                  </div>

                  <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm">
                          <Link
                            to={`/product/${item.product.id}`}
                            className="font-medium text-current dark:text-white hover:text-brand dark:hover:text-brand"
                          >
                            {item.product.name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-400">
                          {item.variant.name}
                        </p>
                        <p className="mt-1 text-sm text-gray-400">
                          Color: {item.variant.color}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-current dark:text-white">
                        $
                        {(
                          (item.product.discountPrice || item.product.price) *
                          item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="rounded-l border border-gray-300 px-3 py-1 dark:border-gray-700 hover:text-optical-blue-600 hover:bg-white hover:dark:bg-gray-700 flex items-center justify-center transition-colors"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
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
                        </button>
                        <div className="w-12 border-t border-b border-gray-300 px-3 py-1 text-center text-current dark:text-white">
                          {item.quantity}
                        </div>
                        <button
                          type="button"
                          className="rounded-r border border-gray-300 px-3 py-1 dark:border-gray-700 hover:text-optical-blue-600 hover:bg-white hover:dark:bg-gray-700 flex items-center justify-center transition-colors"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
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
                        </button>
                      </div>

                      <button
                        type="button"
                        className="text-sm font-medium text-gray-500 hover:text-red-500 flex items-center rounded-md px-2 py-1 hover:bg-white border border-transparent hover:border-gray-200 transition-colors"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
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
                        <span>Eliminar</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16 lg:mt-0 lg:col-span-5">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
              <h2 className="text-lg font-medium text-current dark:text-white">
                Resumen del pedido
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Subtotal</p>
                  <p className="text-sm font-medium text-current dark:text-white">
                    ${cart.subtotal.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Envío</p>
                  <p className="text-sm font-medium text-current dark:text-white">
                    ${cart.shipping.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Impuestos</p>
                  <p className="text-sm font-medium text-current dark:text-white">
                    ${cart.tax.toFixed(2)}
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <p className="text-base font-medium text-current dark:text-white">
                    Total
                  </p>
                  <p className="text-base font-medium text-current dark:text-white">
                    ${cart.total.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="button"
                  variant="solid"
                  color="primary"
                  size="large"
                  shape="rounded"
                  className="w-full"
                  onClick={() => navigate('/checkout')}
                >
                  <span className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    Finalizar compra
                  </span>
                </Button>
              </div>

              <div className="mt-4 text-center">
                <Link
                  to="/products"
                  className="inline-flex items-center text-sm font-mediumtext-brand hover:text-optical-blue-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 17l-5-5m0 0l5-5m-5 5h12"
                    />
                  </svg>
                  Continuar comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
