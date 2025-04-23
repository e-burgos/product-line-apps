import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../../lib/store/cartStore';
import { CustomerInfo, PaymentMethod } from '../../types/cart';
import Button from 'libs/ui/src/components/button/button';
import { CircleDollarSign, ShoppingBag } from 'lucide-react';
import { Input } from '@product-line/ui';
import Listbox, { ListboxOption } from 'libs/ui/src/components/list-box';
import { State, City } from 'country-state-city';

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
      locality: '',
      province: '',
      postalCode: '',
      country: 'Argentina',
    },
  });

  console.log(customerInfo);

  const [provinces, setProvinces] = useState<ListboxOption[]>([]);
  const [localities, setLocalities] = useState<ListboxOption[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<ListboxOption>({
    name: '',
    value: '',
  });
  const [selectedLocality, setSelectedLocality] = useState<ListboxOption>({
    name: '',
    value: '',
  });

  useEffect(() => {
    const provincesData = State.getStatesOfCountry('AR').map((state) => ({
      name: state.name,
      value: state.isoCode,
    }));
    setProvinces(provincesData);
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const localitiesData = City.getCitiesOfState(
        'AR',
        selectedProvince.value
      ).map((city) => ({
        name: city.name,
        value: city.name,
      }));
      setLocalities(localitiesData);
      setSelectedLocality({
        name: '',
        value: '',
      });
      setCustomerInfo((prev) => ({
        ...prev,
        address: { ...prev.address, province: selectedProvince.name },
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvince]);

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('credit_card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validar carrito vacío
  if (cart.items.length === 0) {
    return (
      <div className="bg-transparent flex justify-center items-center text-center min-h-[calc(100vh-100px)]">
        <div className=" mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center flex-col text-center gap-4">
            <ShoppingBag className="w-16 h-16" />
            <h1 className="text-3xl font-extrabold tracking-tight">Checkout</h1>
            <p className="text-gray-400">
              Tu carrito está vacío. No puedes proceder al checkout.
            </p>
            <div className="mt-4">
              <Button
                variant="solid"
                color="primary"
                shape="rounded"
                size="large"
                fullWidth
              >
                <Link
                  to="/products"
                  className="inline-block bg-optical-blue-600 py-3 px-8 rounded-md font-medium text-white hover:bg-optical-blue-700"
                >
                  Ver productos
                </Link>
              </Button>
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
    if (!customerInfo.address.locality)
      newErrors['address.locality'] = 'La ciudad es requerida';
    if (!customerInfo.address.province)
      newErrors['address.province'] = 'La provincia es requerida';
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
      navigate('/order-success');
    }, 1500);
  };

  return (
    <div className="bg-transparent">
      <div className="mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-center mb-12">
          Finalizar Compra
        </h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          {/* Formulario */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-brand/5 dark:bg-light-dark p-6 rounded-lg shadow-sm"
            >
              {/* Información Personal */}
              <div className="mb-8">
                <h2 className="text-lg font-medium mb-4">
                  Información Personal
                </h2>

                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <Input
                      type="text"
                      label="Nombre"
                      id="firstName"
                      name="firstName"
                      value={customerInfo.firstName}
                      onChange={handleInputChange}
                      error={errors['firstName']}
                    />
                  </div>

                  <div>
                    <Input
                      type="text"
                      label="Apellido"
                      id="lastName"
                      name="lastName"
                      value={customerInfo.lastName}
                      onChange={handleInputChange}
                      error={errors['lastName']}
                    />
                  </div>

                  <div>
                    <Input
                      type="email"
                      label="Email"
                      id="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      error={errors['email']}
                    />
                  </div>

                  <div>
                    <Input
                      type="tel"
                      label="Teléfono"
                      id="phone"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      error={errors['phone']}
                    />
                  </div>
                </div>
              </div>

              {/* Dirección de Envío */}
              <div className="mb-8">
                <h2 className="text-lg font-medium mb-4">
                  Dirección de Envío (Solo Argentina)
                </h2>

                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="sm:col-span-2">
                    <Input
                      type="text"
                      label="Dirección"
                      id="street"
                      name="address.street"
                      value={customerInfo.address.street}
                      onChange={handleInputChange}
                      error={errors['address.street']}
                    />
                  </div>
                  <div>
                    <Listbox
                      label="Provincia"
                      options={provinces}
                      selectedOption={selectedProvince}
                      onChange={(e) => setSelectedProvince(e as ListboxOption)}
                    />
                  </div>
                  <div>
                    <Listbox
                      label="Localidad"
                      options={localities}
                      selectedOption={selectedLocality}
                      onChange={(e) => setSelectedLocality(e as ListboxOption)}
                      onSelect={(value) =>
                        setCustomerInfo((prev) => ({
                          ...prev,
                          address: { ...prev.address, locality: value },
                        }))
                      }
                    />
                  </div>

                  <div>
                    <Input
                      type="text"
                      label="Código Postal"
                      id="postalCode"
                      name="address.postalCode"
                      value={customerInfo.address.postalCode}
                      onChange={handleInputChange}
                      error={errors['address.postalCode']}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Resumen del Pedido */}
          <div className="mt-10 lg:mt-0 lg:col-span-5">
            <div className="bg-brand/5 dark:bg-light-dark p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">Resumen del Pedido</h2>

              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
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
                        <div className="flex justify-between text-sm font-medium text-gray-900 dark:text-white">
                          <h3>{item.product.name}</h3>
                          <p>
                            $
                            {(
                              (item.product.discountPrice ||
                                item.product.price) * item.quantity
                            ).toFixed(2)}
                          </p>
                        </div>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {item.variant.name}
                        </p>
                      </div>
                      <div className="flex-1 flex items-end justify-between text-xs">
                        <p className="text-gray-500 dark:text-gray-400">
                          Cant. {item.quantity}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Método de Pago */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 mb-8">
                <h2 className="text-lg font-medium mb-4">Método de Pago</h2>
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
                      className="ml-3 block text-sm font-medium text-gray-700 dark:text-white"
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
                      className="ml-3 block text-sm font-medium text-gray-700 dark:text-white"
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
                      className="h-4 w-4text-brand focus:ring-current border-brand"
                    />
                    <label
                      htmlFor="bank_transfer"
                      className="ml-3 block text-sm font-medium text-gray-700 dark:text-white"
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
                      className="ml-3 block text-sm font-medium text-gray-700 dark:text-white"
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
                      className="ml-3 block text-sm font-medium text-gray-700 dark:text-white"
                    >
                      Retirar y Pagar en Tienda
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600 dark:text-gray-400">Subtotal</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    ${cart.subtotal.toFixed(2)}
                  </p>
                </div>

                <div className="flex justify-between text-sm mt-2">
                  <p className="text-gray-600 dark:text-gray-400">Envío</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    ${cart.shipping.toFixed(2)}
                  </p>
                </div>

                <div className="flex justify-between text-sm mt-2">
                  <p className="text-gray-600 dark:text-gray-400">Impuestos</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    ${cart.tax.toFixed(2)}
                  </p>
                </div>

                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white mt-4">
                  <p>Total</p>
                  <p>${cart.total.toFixed(2)}</p>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  variant="solid"
                  color="primary"
                  shape="rounded"
                  size="large"
                  fullWidth
                >
                  <div className="flex items-center">
                    <CircleDollarSign className="w-6 h-6 mr-2" />
                    Finalizar compra
                  </div>
                </Button>
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
