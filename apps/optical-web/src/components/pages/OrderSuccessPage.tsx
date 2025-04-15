import React from 'react';
import { Link } from 'react-router-dom';

export const OrderSuccessPage = () => {
  return (
    <div className="bg-white">
      <div className="container-custom mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-16 w-16 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900">
            ¡Gracias por tu compra!
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Tu pedido ha sido recibido y está siendo procesado.
          </p>
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900">
              Información del pedido
            </h2>
            <dl className="mt-4 space-y-4">
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">
                  Número de Orden
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  #{Math.floor(100000 + Math.random() * 900000)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4">
                <dt className="text-sm font-medium text-gray-500">Estado</dt>
                <dd className="text-sm font-medium text-green-600">Recibido</dd>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4">
                <dt className="text-sm font-medium text-gray-500">Fecha</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {new Date().toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900">
              ¿Qué sucede a continuación?
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-optical-blue-100text-brand">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Recibirás un email con la confirmación de tu pedido
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-optical-blue-100text-brand">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Te contactaremos si necesitamos más información sobre tu
                  pedido
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-optical-blue-100text-brand">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Prepararemos tu pedido y te notificaremos cuando esté listo
                  para envío
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              to="/"
              className="inline-block rounded-md border border-transparent bg-optical-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-optical-blue-700"
            >
              Volver a la Tienda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
