import { GalleryProducts } from '../products/gallery/GalleryProducts';
import { useProductApi } from '../../hooks/useProductApi';
import Filters from '../products/filters/Filters';

export const ProductsPage = () => {
  const { category } = useProductApi();

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
      <div className="mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight">{pageTitle}</h1>
        <div className="pt-12 lg:grid lg:grid-cols-4 lg:gap-x-8">
          <Filters />
          <GalleryProducts />
        </div>
      </div>
    </div>
  );
};
