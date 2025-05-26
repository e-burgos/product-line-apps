import { ProductCard } from './ProductCard';
import { useProductStore } from '../../../store/useProductStore';

interface GalleryProductsProps {
  showSort?: boolean;
}

export const GalleryProducts = ({ showSort = true }: GalleryProductsProps) => {
  const { sortBy, filteredProducts, setSortBy } = useProductStore();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  if (filteredProducts.length === 0) {
    return (
      <div className="mt-6 lg:col-span-3 lg:mt-0">
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
      </div>
    );
  }

  return (
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
    </div>
  );
};
