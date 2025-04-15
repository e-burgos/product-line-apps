import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../../lib/store/cartStore';
import { CustomerInfo, PaymentMethod } from '../../types/cart';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCartStore();

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'Argentina',
    },
  });

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('credit_card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validar carrito vacío
  if (cart.items.length === 0) {
    return (
      <div className="bg-white">
        <div className="container-custom mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Checkout
            </h1>
            <p className="mt-4 text-gray-500">
              Tu carrito está vacío. No puedes proceder al checkout.
            </p>
            <div className="mt-6">
              <Link
                to="/productos"
                className="inline-block bg-optical-blue-600 py-3 px-8 rounded-md font-medium text-white hover:bg-optical-blue-700"
              >
                Ver productos
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setCustomerInfo((prev) => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value,
        },
      }));
    } else {
      setCustomerInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Limpiar error cuando se corrige
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(e.target.value as PaymentMethod);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validar campos requeridos
    if (!customerInfo.firstName)
      newErrors['firstName'] = 'El nombre es requerido';
    if (!customerInfo.lastName)
      newErrors['lastName'] = 'El apellido es requerido';
    if (!customerInfo.email) {
      newErrors['email'] = 'El email es requerido';
    } else if (!/^\S+@\S+\.\S+$/.test(customerInfo.email)) {
      newErrors['email'] = 'El email no es válido';
    }
    if (!customerInfo.phone) newErrors['phone'] = 'El teléfono es requerido';
    if (!customerInfo.address.street)
      newErrors['address.street'] = 'La dirección es requerida';
    if (!customerInfo.address.city)
      newErrors['address.city'] = 'La ciudad es requerida';
    if (!customerInfo.address.state)
      newErrors['address.state'] = 'La provincia es requerida';
    if (!customerInfo.address.postalCode)
      newErrors['address.postalCode'] = 'El código postal es requerido';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Simular procesamiento de la orden
    setTimeout(() => {
      // En una aplicación real, aquí enviarías la orden al backend
      clearCart();
      navigate('/pedido-exitoso');
    }, 1500);
  };

  return (
    <div className="bg-gray-50">
      <div className="container-custom mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 text-center mb-12">
          Checkout
        </h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          {/* Formulario */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              {/* Información Personal */}
              <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Información Personal
                </h2>

                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={customerInfo.firstName}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-optical-blue-500 focus:ring-optical-blue-500 sm:text-sm ${
                        errors['firstName'] ? 'border-red-300' : ''
                      }`}
                    />
                    {errors['firstName'] && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors['firstName']}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Apellido
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={customerInfo.lastName}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-optical-blue-500 focus:ring-optical-blue-500 sm:text-sm ${
                        errors['lastName'] ? 'border-red-300' : ''
                      }`}
                    />
                    {errors['lastName'] && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors['lastName']}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-optical-blue-500 focus:ring-optical-blue-500 sm:text-sm ${
                        errors['email'] ? 'border-red-300' : ''
                      }`}
                    />
                    {errors['email'] && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors['email']}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-optical-blue-500 focus:ring-optical-blue-500 sm:text-sm ${
                        errors['phone'] ? 'border-red-300' : ''
                      }`}
                    />
                    {errors['phone'] && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors['phone']}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Dirección de Envío */}
              <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Dirección de Envío
                </h2>

                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="street"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Dirección
                    </label>
                    <input
                      type="text"
                      id="street"
                      name="address.street"
                      value={customerInfo.address.street}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-optical-blue-500 focus:ring-optical-blue-500 sm:text-sm ${
                        errors['address.street'] ? 'border-red-300' : ''
                      }`}
                    />
                    {errors['address.street'] && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors['address.street']}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Ciudad
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="address.city"
                      value={customerInfo.address.city}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-optical-blue-500 focus:ring-optical-blue-500 sm:text-sm ${
                        errors['address.city'] ? 'border-red-300' : ''
                      }`}
                    />
                    {errors['address.city'] && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors['address.city']}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Provincia
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="address.state"
                      value={customerInfo.address.state}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-optical-blue-500 focus:ring-optical-blue-500 sm:text-sm ${
                        errors['address.state'] ? 'border-red-300' : ''
                      }`}
                    />
                    {errors['address.state'] && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors['address.state']}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="postalCode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Código Postal
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="address.postalCode"
                      value={customerInfo.address.postalCode}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-optical-blue-500 focus:ring-optical-blue-500 sm:text-sm ${
                        errors['address.postalCode'] ? 'border-red-300' : ''
                      }`}
                    />
                    {errors['address.postalCode'] && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors['address.postalCode']}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      País
                    </label>
                    <select
                      id="country"
                      name="address.country"
                      value={customerInfo.address.country}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-optical-blue-500 focus:ring-optical-blue-500 sm:text-sm"
                    >
                      <option value="Argentina">Argentina</option>
                      <option value="Chile">Chile</option>
                      <option value="Uruguay">Uruguay</option>
                      <option value="Paraguay">Paraguay</option>
                      <option value="Bolivia">Bolivia</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Método de Pago */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Método de Pago
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="credit_card"
                      name="paymentMethod"
                      type="radio"
                      value="credit_card"
                      checked={paymentMethod === 'credit_card'}
                      onChange={handlePaymentMethodChange}
                      className="h-4 w-4text-brand focus:ring-optical-blue-500 border-gray-300"
                    />
                    <label
                      htmlFor="credit_card"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Tarjeta de Crédito
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="debit_card"
                      name="paymentMethod"
                      type="radio"
                      value="debit_card"
                      checked={paymentMethod === 'debit_card'}
                      onChange={handlePaymentMethodChange}
                      className="h-4 w-4text-brand focus:ring-optical-blue-500 border-gray-300"
                    />
                    <label
                      htmlFor="debit_card"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Tarjeta de Débito
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="bank_transfer"
                      name="paymentMethod"
                      type="radio"
                      value="bank_transfer"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={handlePaymentMethodChange}
                      className="h-4 w-4text-brand focus:ring-optical-blue-500 border-gray-300"
                    />
                    <label
                      htmlFor="bank_transfer"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Transferencia Bancaria
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="cash"
                      name="paymentMethod"
                      type="radio"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={handlePaymentMethodChange}
                      className="h-4 w-4text-brand focus:ring-optical-blue-500 border-gray-300"
                    />
                    <label
                      htmlFor="cash"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Pago en Efectivo (Contrareembolso)
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="store_pickup"
                      name="paymentMethod"
                      type="radio"
                      value="store_pickup"
                      checked={paymentMethod === 'store_pickup'}
                      onChange={handlePaymentMethodChange}
                      className="h-4 w-4text-brand focus:ring-optical-blue-500 border-gray-300"
                    />
                    <label
                      htmlFor="store_pickup"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Retirar y Pagar en Tienda
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Resumen del Pedido */}
          <div className="mt-10 lg:mt-0 lg:col-span-5">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Resumen del Pedido
              </h2>

              <ul className="divide-y divide-gray-200">
                {cart.items.map((item) => (
                  <li key={item.id} className="py-4 flex">
                    <div className="flex-shrink-0">
                      <img
                        src={item.variant.images[0] || item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-md object-center object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1 flex flex-col">
                      <div>
                        <div className="flex justify-between text-sm font-medium text-gray-900">
                          <h3>{item.product.name}</h3>
                          <p>
                            $
                            {(
                              (item.product.discountPrice ||
                                item.product.price) * item.quantity
                            ).toFixed(2)}
                          </p>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          {item.variant.name}
                        </p>
                      </div>
                      <div className="flex-1 flex items-end justify-between text-xs">
                        <p className="text-gray-500">Cant. {item.quantity}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-medium text-gray-900">
                    ${cart.subtotal.toFixed(2)}
                  </p>
                </div>

                <div className="flex justify-between text-sm mt-2">
                  <p className="text-gray-600">Envío</p>
                  <p className="font-medium text-gray-900">
                    ${cart.shipping.toFixed(2)}
                  </p>
                </div>

                <div className="flex justify-between text-sm mt-2">
                  <p className="text-gray-600">Impuestos</p>
                  <p className="font-medium text-gray-900">
                    ${cart.tax.toFixed(2)}
                  </p>
                </div>

                <div className="flex justify-between text-base font-medium text-gray-900 mt-4">
                  <p>Total</p>
                  <p>${cart.total.toFixed(2)}</p>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full bg-optical-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-optical-blue-500 flex items-center justify-center ${
                    isSubmitting
                      ? 'opacity-75 cursor-not-allowed'
                      : 'hover:bg-optical-blue-700'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Procesando...
                    </>
                  ) : (
                    <>
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
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Finalizar compra
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4">
                <Link
                  to="/carrito"
                  className="text-sm font-mediumtext-brand hover:text-optical-blue-500 inline-flex items-center"
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Volver al carrito
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
