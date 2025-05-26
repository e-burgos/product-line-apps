import React from 'react';
import { useProductApi } from '../../../hooks/useProductApi';
import { Input } from 'libs/ui/src/components/forms/input';
import { SidebarFilters } from './SidebarFilters';

const Filters = () => {
  const {
    brands,
    products,
    selectedBrands,
    priceRange,
    searchQuery,
    formatPrice,
    handleBrandChange,
    handlePriceRangeChange,
    handleSearchChange,
  } = useProductApi();

  return (
    <aside className="hidden lg:block">
      <h2 className="text-lg font-medium">Filtros</h2>

      {/* Barra de búsqueda */}
      <div className="mt-6">
        <label htmlFor="search" className="sr-only">
          Buscar productos
        </label>
        <Input
          type="text"
          id="search"
          name="search"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Buscar productos..."
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-optical-blue-500 focus:ring-optical-blue-500"
        />
      </div>

      {/* Filtro de rango de precios */}
      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Precio</h3>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
            </span>
          </div>
          <div className="mt-4 space-y-5">
            <div className="relative">
              <input
                type="range"
                id="minPrice"
                name="minPrice"
                min={0}
                max={priceRange[1]}
                value={priceRange[0]}
                onChange={handlePriceRangeChange}
                className="price-range-slider"
              />
            </div>
            <div className="relative">
              <input
                type="range"
                id="maxPrice"
                name="maxPrice"
                min={priceRange[0]}
                max={Math.max(...products.map((p) => p.price))}
                value={priceRange[1]}
                onChange={handlePriceRangeChange}
                className="price-range-slider"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="font-medium">Marcas</h3>
        <div className="mt-4 space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center">
              <input
                id={`brand-${brand}`}
                name={`brand-${brand}`}
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-optical-blue-500"
              />
              <label
                htmlFor={`brand-${brand}`}
                className="ml-3 text-sm text-gray-600 dark:text-gray-400"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Filters;
