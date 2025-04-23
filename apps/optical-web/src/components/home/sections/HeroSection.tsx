import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="Anteojos"
        />
        <div className="absolute inset-0 bg-gray-500 mix-blend-multiply" />
      </div>
      <div className="relative py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          OpticaGestión
        </h1>
        <p className="mt-6 max-w-lg text-xl text-white">
          Descubre nuestra colección de anteojos de sol y receta de las mejores
          marcas.
        </p>
        <div className="mt-10 flex space-x-4">
          <Link
            to="/products/sun"
            className="inline-flex items-center bg-optical-blue-600 py-3 px-5 text-base font-medium text-white hover:bg-optical-blue-700 rounded-md shadow-md hover:shadow-lg transition-all duration-200"
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
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            Anteojos de Sol
          </Link>
          <Link
            to="/products/prescription"
            className="inline-flex items-center bg-white py-3 px-5 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md shadow-md hover:shadow-lg transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
              />
            </svg>
            Anteojos de Receta
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
