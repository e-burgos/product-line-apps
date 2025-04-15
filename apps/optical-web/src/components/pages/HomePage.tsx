import React from 'react';
import { Link } from 'react-router-dom';
import { getNewProducts, getBestSellers } from '../../data/products';
import { ProductCard } from '../../components/ui/ProductCard';
import { CreditCard, Shield, Star, Truck } from 'lucide-react';

export const HomePage = () => {
  const newProducts = getNewProducts();
  const bestSellers = getBestSellers();

  const categories = [
    {
      id: 'sun',
      name: 'Anteojos de Sol',
      description: 'Protección y estilo para tus ojos durante todo el año.',
      image:
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&h=580&q=80',
      icon: (
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
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      href: '/productos/sun',
    },
    {
      id: 'prescription',
      name: 'Anteojos de Receta',
      description: 'Visualiza el mundo con la mejor claridad y comodidad.',
      image:
        'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&h=580&q=80',
      icon: (
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
            d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
          />
        </svg>
      ),
      href: '/productos/prescription',
    },
    {
      id: 'sports',
      name: 'Deportivos',
      description: 'Rendimiento y protección para todas tus actividades.',
      image:
        'https://images.unsplash.com/photo-1517948430535-b7e89f3072a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&h=580&q=80',
      icon: (
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      href: '/productos/sports',
    },
    {
      id: 'kids',
      name: 'Niños',
      description: 'Diseños divertidos y resistentes para los más pequeños.',
      image:
        'https://images.unsplash.com/photo-1629310175560-3cbf4fb56b94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&h=580&q=80',
      icon: (
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
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      href: '/productos/kids',
    },
  ];

  return (
    <div className="bg-transparent">
      {/* Hero section */}
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
            OpticaWeb
          </h1>
          <p className="mt-6 max-w-lg text-xl text-white">
            Descubre nuestra colección de anteojos de sol y receta de las
            mejores marcas.
          </p>
          <div className="mt-10 flex space-x-4">
            <Link
              to="/productos/sun"
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
              to="/productos/prescription"
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

      {/* Categories section */}
      <div className="py-16 sm:py-24 lg:max-w-7xl lg:mx-auto lg:px-8 dark:text-white text-current">
        <div className="px-4 flex items-center justify-between sm:px-6 lg:px-0">
          <h2 className="text-2xl font-extrabold tracking-tight">
            Nuestras Categorías
          </h2>
          <Link
            to="/productos"
            className="inline-flex items-center text-sm font-semibold hover:text-brand"
          >
            Ver todas las categorías
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>

        <div className="mt-8 pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-0">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group relative flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="absolute top-0 left-0 p-4">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white bg-opacity-80text-brand shadow-md">
                    {category.icon}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between p-6 bg-white">
                  <div className="flex-1">
                    <Link to={category.href} className="block">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-optical-blue-600 transition-colors duration-300">
                        {category.name}
                      </h3>
                      <p className="mt-3 text-base text-gray-500">
                        {category.description}
                      </p>
                    </Link>
                  </div>
                  <div className="mt-4">
                    <Link
                      to={category.href}
                      className="text-sm font-mediumtext-brand hover:text-optical-blue-500 inline-flex items-center group"
                    >
                      Ver productos
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New arrivals */}
      <div className="bg-gray-100 dark:bg-gray-800">
        <div className="py-16 sm:py-24 lg:max-w-7xl lg:mx-auto lg:px-8">
          <div className="px-4 flex items-center justify-between sm:px-6 lg:px-0">
            <h2 className="text-2xl font-extrabold tracking-tight ">
              Novedades
            </h2>
            <Link
              to="/productos"
              className="inline-flex items-center text-sm font-semiboldtext-brand hover:text-optical-blue-500"
            >
              Ver todos los productos
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>

          <div className="mt-8 relative">
            <div className="relative w-full overflow-x-auto">
              <div className="mx-4 grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {newProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Best sellers */}
      <div className="bg-transparent">
        <div className="py-16 sm:py-24 lg:max-w-7xl lg:mx-auto lg:px-8">
          <div className="px-4 flex items-center justify-between sm:px-6 lg:px-0">
            <h2 className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
              <Star />
              Los más vendidos
            </h2>
            <Link
              to="/productos"
              className="inline-flex items-center text-sm font-semiboldtext-brand hover:text-optical-blue-500"
            >
              Ver todos los productos
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>

          <div className="mt-8 relative">
            <div className="relative w-full overflow-x-auto">
              <div className="mx-4 grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {bestSellers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="bg-gray-100 dark:bg-gray-800">
        <div className="py-16 sm:py-24 lg:max-w-7xl lg:mx-auto lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold ">
              Por qué elegir OpticaWeb
            </h2>
          </div>
          <div className="mt-16 max-w-2xl mx-auto px-4 grid grid-cols-1 gap-y-10 gap-x-8 sm:px-6 sm:grid-cols-2 md:grid-cols-3 lg:max-w-none lg:px-0">
            <div className="bg-gray-100 dark:bg-gray-900 rounded-md text-center p-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-slate-50 dark:bg-gray-400 text-gray-900 dark:text-white mx-auto">
                <Truck />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-white">
                Envío rápido
              </h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Recibe tus anteojos en 24-48 horas hábiles.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-900 rounded-md text-center p-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-slate-50 dark:bg-gray-400 text-gray-900 dark:text-white mx-auto">
                <Shield />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-white">
                Garantía de calidad
              </h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400 ">
                Todos nuestros productos son originales y garantizados.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-900 rounded-md text-center p-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-slate-50 dark:bg-gray-400 text-gray-900 dark:text-white mx-auto">
                <CreditCard />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-white">
                Pago seguro
              </h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Múltiples métodos de pago seguros y confiables.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
