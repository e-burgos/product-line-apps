import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../lib/store/cartStore';
import Button from 'libs/ui/src/components/button/button';
import CounterButton from '../ui/CounterButton';

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
      <div className="bg-transparent text-current dark:text-white min-h-[calc(100vh-60px)] flex flex-col items-center justify-center text-center">
        <div className=" mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-extrabold tracking-tight mb-6">
              Tu carrito está vacío.
            </h1>

            <Button shape="rounded" onClick={() => navigate('/products')}>
              Continuar comprando
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent text-current dark:text-white min-h-[calc(100vh-60px)]">
      <div className="mx-auto py-16 px-6 sm:py-24 sm:px-8 lg:px-16">
        <h1 className="text-3xl font-extrabold tracking-tight">Tu carrito</h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <div className="lg:col-span-7">
            <ul className="divide-y divide-gray-200 border-t border-b border-gray-200 dark:divide-gray-700 dark:border-gray-700">
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
                        <CounterButton
                          quantity={item.quantity}
                          onDecrement={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          onIncrement={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          disabledDecrement={item.quantity <= 1}
                          disabledIncrement={
                            item.variant?.stock
                              ? item.quantity >= item.variant.stock
                              : item.quantity >= item.product.stock
                          }
                        />
                      </div>
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
