import React from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../../ui/ProductCard';
import { Star } from 'lucide-react';
import { Product } from '../../../types/product';

interface ProductsSectionProps {
  title: string;
  products: Product[];
  showStar?: boolean;
  bgClass?: string;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({
  title,
  products,
  showStar = false,
  bgClass = 'bg-transparent',
}) => {
  return (
    <div className={bgClass}>
      <div className="py-16 sm:py-24 lg:max-w-7xl lg:mx-auto lg:px-8">
        <div className="px-4 flex items-center justify-between sm:px-6 lg:px-0">
          <h2 className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
            {showStar && <Star />}
            {title}
          </h2>
          <Link
            to="/products"
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
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
