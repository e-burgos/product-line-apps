import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="bg-white min-h-[calc(100vh-64px)]">
      <div className="container-custom mx-auto px-4 py-16 sm:py-24 flex flex-col items-center justify-center text-center">
        <div className="flex justify-center">
          <svg
            className="h-24 w-24 text-optical-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="mt-5 text-4xl font-extrabold text-gray-900 tracking-tight">
          Página no encontrada
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-optical-blue-600 hover:bg-optical-blue-700"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};
