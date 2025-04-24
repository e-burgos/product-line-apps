import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts, getProductsByCategory } from '../../data/products';
import { ProductCard } from '../../components/ui/ProductCard';
import { Product } from '../../types/product';
import Input from 'libs/ui/src/components/forms/input';

export const ProductsPage = () => {
  const { category } = useParams<{ category?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    // Cargar productos por categoría o todos los productos
    const loadedProducts = category
      ? getProductsByCategory(category)
      : getProducts();
    setProducts(loadedProducts);

    // Extraer marcas únicas
    const uniqueBrands = Array.from(
      new Set(loadedProducts.map((product) => product.brand))
    );
    setBrands(uniqueBrands);

    // Establecer rango de precios mínimo y máximo
    if (loadedProducts.length > 0) {
      const prices = loadedProducts.map(
        (product) => product.discountPrice || product.price
      );
      const minPrice = Math.floor(Math.min(...prices));
      const maxPrice = Math.ceil(Math.max(...prices));
      setPriceRange([minPrice, maxPrice]);
    }
  }, [category]);

  useEffect(() => {
    // Aplicar filtros y ordenación
    let result = [...products];

    // Filtrar por búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Filtrar por marcas seleccionadas
    if (selectedBrands.length > 0) {
      result = result.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    // Filtrar por rango de precios
    result = result.filter(
      (product) =>
        (product.discountPrice || product.price) >= priceRange[0] &&
        (product.discountPrice || product.price) <= priceRange[1]
    );

    // Ordenar productos
    switch (sortBy) {
      case 'price-low':
        result.sort(
          (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price)
        );
        break;
      case 'price-high':
        result.sort(
          (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price)
        );
        break;
      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default: // 'featured' - no cambiar el orden original
        break;
    }

    setFilteredProducts(result);
  }, [products, selectedBrands, sortBy, searchQuery, priceRange]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const handlePriceRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    const [min, max] = priceRange;

    if (event.target.name === 'minPrice') {
      setPriceRange([Math.min(value, max), max]);
    } else {
      setPriceRange([min, Math.max(value, min)]);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const categoryTitles: Record<string, string> = {
    sun: 'Anteojos de Sol',
    prescription: 'Anteojos de Receta',
    sports: 'Anteojos Deportivos',
    kids: 'Anteojos para Niños',
  };

  const pageTitle = category
    ? categoryTitles[category] || 'Productos'
    : 'Todos los Productos';

  return (
    <div className="bg-transparent text-current dark:text-white min-h-[calc(100vh-60px)]">
      <div className="container-custom mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight">{pageTitle}</h1>

        <div className="pt-12 lg:grid lg:grid-cols-4 lg:gap-x-8">
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

          <div className="mt-6 lg:col-span-3 lg:mt-0">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {filteredProducts.length} productos
              </p>

              <div className="flex items-center">
                <select
                  id="sort-by"
                  name="sort-by"
                  className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-optical-blue-600 sm:text-sm sm:leading-6"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="featured">Destacados</option>
                  <option value="price-low">Precio: Menor a mayor</option>
                  <option value="price-high">Precio: Mayor a menor</option>
                  <option value="newest">Más recientes</option>
                </select>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="mt-12 text-center">
                <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400"
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
                <h3 className="mt-2 text-sm font-medium text-current dark:text-white">
                  No se encontraron productos
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Prueba con otros filtros o busca en otra categoría.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
