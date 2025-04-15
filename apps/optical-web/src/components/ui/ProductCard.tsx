import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name, price, discountPrice, images, slug, isNew, isBestSeller } =
    product;
  const [imageLoaded, setImageLoaded] = useState(true);
  const [imageError, setImageError] = useState<string>('');

  // Imagen por defecto en caso de que no existan imágenes
  const defaultImage =
    'https://sistema.inmosuite.mx/images/not-available-es.png';

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log('handleImageError', e);
    if (e.type === 'error') setImageError(defaultImage);
    //e.currentTarget.src = defaultImage || '';
    setImageLoaded(false);
  };

  // Verificar si hay imágenes disponibles
  const productImage = images && images.length > 0 ? images[0] : defaultImage;

  return (
    <div className="relative group">
      <div className="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden">
        <Link to={`/producto/${id}`}>
          <img
            src={imageError || productImage}
            alt={name}
            onError={handleImageError}
            onLoad={() => setImageLoaded(true)}
            className="w-full h-full object-center object-cover group-hover:opacity-75 transition-opacity duration-300"
          />
        </Link>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link to={`/producto/${id}`}>
              <span className="absolute inset-0" />
              {name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
        </div>
        <div className="text-right">
          {discountPrice ? (
            <>
              <p className="text-sm font-medium text-gray-900">
                ${discountPrice.toFixed(2)}
              </p>
              <p className="text-sm font-medium text-gray-400 line-through">
                ${price.toFixed(2)}
              </p>
            </>
          ) : (
            <p className="text-sm font-medium text-gray-900">
              ${price.toFixed(2)}
            </p>
          )}
        </div>
      </div>
      {/* Solo mostrar etiquetas si la imagen se ha cargado correctamente */}
      {imageLoaded && (isNew || isBestSeller) && (
        <div className="absolute top-0 left-0 mt-2 ml-2 flex space-x-1">
          {isNew && (
            <span className="px-2 py-1 text-xs font-semibold rounded-md bg-optical-blue-500 text-white">
              Nuevo
            </span>
          )}
          {isBestSeller && (
            <span className="px-2 py-1 text-xs font-semibold rounded-md bg-amber-500 text-white">
              Top Ventas
            </span>
          )}
        </div>
      )}
    </div>
  );
};
