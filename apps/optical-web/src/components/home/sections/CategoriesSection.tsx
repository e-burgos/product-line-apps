import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryType {
  id: string;
  name: string;
  description: string;
  image: string;
  href: string;
  icon: React.ReactNode;
}

interface CategoriesSectionProps {
  categories: CategoryType[];
  bgClass?: string;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  bgClass,
}) => {
  return (
    <div className={bgClass}>
      <div
        className={`py-16 sm:py-24 lg:max-w-7xl lg:mx-auto lg:px-8 dark:text-white text-current`}
      >
        <div className="px-4 flex items-center justify-between sm:px-6 lg:px-0">
          <h2 className="text-2xl font-extrabold tracking-tight">
            Nuestras Categorías
          </h2>
          <Link
            to="/products"
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
    </div>
  );
};

export default CategoriesSection;
