import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../../data/products';
import { useCartStore } from '../../lib/store/cartStore';
import { Product, ProductVariant } from '../../types/product';
import Button from 'libs/ui/src/components/button/button';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCartStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [imagesStatus, setImagesStatus] = useState({
    main: true,
    thumbnails: [] as boolean[],
  });

  // Valor por defecto para imágenes no disponibles
  const defaultImage =
    'https://via.placeholder.com/400x400?text=Imagen+no+disponible';

  // Determinar qué imágenes mostrar (producto o variante)
  const getDisplayImages = () => {
    if (selectedVariant?.images && selectedVariant.images.length > 0) {
      return selectedVariant.images;
    } else if (product?.images && product.images.length > 0) {
      return product.images;
    } else {
      return [defaultImage];
    }
  };

  const displayImages = getDisplayImages();

  // Actualizar el estado de las miniaturas si cambia el número de imágenes
  useEffect(() => {
    setImagesStatus((prev) => ({
      ...prev,
      thumbnails: Array(displayImages.length).fill(true),
    }));
  }, [displayImages.length]);

  useEffect(() => {
    if (id) {
      const loadedProduct = getProductById(id);

      if (loadedProduct) {
        setProduct(loadedProduct);

        // Seleccionar la primera variante por defecto
        if (loadedProduct.variants.length > 0) {
          setSelectedVariant(loadedProduct.variants[0]);
        }

        // Inicializar el estado de las imágenes
        const imagesLength = loadedProduct.images?.length || 0;
        setImagesStatus({
          main: true,
          thumbnails: Array(imagesLength).fill(true),
        });
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
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
          <h2 className="mt-4 text-lg font-medium text-gray-900">
            Producto no encontrado
          </h2>
          <p className="mt-2 text-gray-500">
            Lo sentimos, el producto que estás buscando no existe o ha sido
            removido.
          </p>
          <div className="mt-6">
            <Link
              to="/productos"
              className="text-optical-blue-600 hover:text-optical-blue-500"
            >
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleVariantChange = (variantId: string) => {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) {
      setSelectedVariant(variant);
      // Si la variante tiene imágenes propias, mostrar la primera
      if (variant.images.length > 0) {
        setCurrentImageIndex(0);
      }
    }
  };

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, Math.min(10, value)));
  };

  const handleAddToCart = () => {
    if (product && selectedVariant) {
      setIsAdding(true);

      // Añadir al carrito
      addToCart(product, selectedVariant, quantity);

      // Mostrar efecto de éxito por un breve periodo
      setTimeout(() => {
        setIsAdding(false);
        // Opcional: redireccionar al carrito
        // navigate('/carrito');
      }, 1000);
    }
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement>,
    index?: number
  ) => {
    e.currentTarget.src = defaultImage;

    if (typeof index === 'number') {
      // Si es una miniatura
      setImagesStatus((prev) => {
        const newThumbnails = [...prev.thumbnails];
        newThumbnails[index] = false;
        return { ...prev, thumbnails: newThumbnails };
      });
    } else {
      // Si es la imagen principal
      setImagesStatus((prev) => ({ ...prev, main: false }));
    }
  };

  return (
    <div className="bg-transparent">
      <div className="container-custom mx-auto py-16 px-4 sm:py-24 sm:px-6">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Galería de imágenes */}
          <div className="lg:max-w-lg lg:self-end">
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link
                    to="/"
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    Inicio
                  </Link>
                </li>
                <li className="text-sm">
                  <span className="mx-2 text-gray-400 dark:text-gray-500">
                    /
                  </span>
                  <Link
                    to="/productos"
                    className="font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    Productos
                  </Link>
                </li>
                <li className="text-sm">
                  <span className="mx-2 text-gray-400 dark:text-gray-500">
                    /
                  </span>
                  <Link
                    to={`/productos/${product.category}`}
                    className="font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {product.category === 'sun'
                      ? 'Anteojos de Sol'
                      : product.category === 'prescription'
                      ? 'Anteojos de Receta'
                      : product.category === 'sports'
                      ? 'Deportivos'
                      : 'Niños'}
                  </Link>
                </li>
              </ol>
            </nav>

            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              <img
                src={displayImages[currentImageIndex]}
                alt={product.name}
                onError={(e) => handleImageError(e)}
                className="w-full h-full object-center object-cover"
              />
            </div>

            {/* Miniaturas de imágenes */}
            {displayImages.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {displayImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden ${
                      index === currentImageIndex
                        ? 'ring-2 ring-optical-blue-500'
                        : 'ring-1 ring-gray-200 dark:ring-gray-700'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Vista ${index + 1} de ${product.name}`}
                      onError={(e) => handleImageError(e, index)}
                      className="w-full h-full object-center object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-start">
            <div className="mb-4">
              {imagesStatus.main && product.isNew && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-optical-blue-100 text-optical-blue-800 dark:bg-optical-blue-900 dark:text-optical-blue-200">
                  Nuevo
                </span>
              )}
              {imagesStatus.main && product.isBestSeller && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                  Top Ventas
                </span>
              )}
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              {product.name}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Información del producto</h2>
              <p className="text-3xl text-gray-900 dark:text-white">
                {product.discountPrice ? (
                  <>
                    <span>${product.discountPrice.toFixed(2)}</span>
                    <span className="ml-2 text-lg text-gray-500 dark:text-gray-400 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span>${product.price.toFixed(2)}</span>
                )}
              </p>
            </div>

            {/* Rating */}
            <div className="mt-3">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <svg
                      key={rating}
                      className={`${
                        product.rating > rating
                          ? 'text-amber-500'
                          : 'text-gray-300 dark:text-gray-600'
                      } h-5 w-5 flex-shrink-0`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  {product.reviews.length} valoraciones
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Descripción</h3>
              <div className="text-base text-gray-700 dark:text-gray-300 space-y-6">
                <p>{product.description}</p>
              </div>
            </div>

            <div className="mt-8">
              {/* Selector de variante */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Color
                </h3>
                <div className="mt-2">
                  <div className="flex items-center space-x-3">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        type="button"
                        className={`relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ${
                          selectedVariant?.id === variant.id
                            ? 'ring-2 ring-optical-blue-500'
                            : ''
                        }`}
                        onClick={() => handleVariantChange(variant.id)}
                      >
                        <span
                          className="h-8 w-8 rounded-full border border-black border-opacity-10 dark:border-white dark:border-opacity-10"
                          style={{ backgroundColor: variant.colorCode }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Información de la variante seleccionada */}
              {selectedVariant && (
                <div className="mt-4">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Variante seleccionada
                    </h3>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {selectedVariant.name}
                    </p>
                  </div>
                  <div className="mt-1 flex justify-between">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Disponibilidad
                    </h3>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {selectedVariant.stock > 0
                        ? `${selectedVariant.stock} unidades disponibles`
                        : 'Agotado'}
                    </p>
                  </div>
                </div>
              )}

              {/* Selector de cantidad */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Cantidad
                  </h3>
                  <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md">
                    <Button
                      variant="transparent"
                      color="gray"
                      size="tiny"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="border-r border-gray-200 dark:border-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 12H4"
                        />
                      </svg>
                    </Button>
                    <div className="w-12 text-center text-gray-900 dark:text-white py-2">
                      {quantity}
                    </div>
                    <Button
                      variant="transparent"
                      color="gray"
                      size="tiny"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={
                        selectedVariant
                          ? quantity >= selectedVariant.stock
                          : false
                      }
                      className="border-l border-gray-200 dark:border-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Botón agregar al carrito */}
              <div className="mt-8">
                <Button
                  color={
                    isAdding
                      ? 'success'
                      : selectedVariant?.stock === 0
                      ? 'gray'
                      : 'primary'
                  }
                  disabled={isAdding || selectedVariant?.stock === 0}
                  onClick={handleAddToCart}
                  fullWidth
                  className="flex items-center justify-center"
                >
                  {isAdding ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 -ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Agregado
                    </>
                  ) : selectedVariant?.stock === 0 ? (
                    <>
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
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Agotado
                    </>
                  ) : (
                    <>
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
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                      Agregar al carrito
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Detalles adicionales */}
            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Características
              </h3>
              <div className="mt-4">
                <ul className="list-disc pl-4 space-y-2">
                  {product.features.map((feature, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-700 dark:text-gray-300"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Especificaciones */}
            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Especificaciones
              </h3>
              <div className="mt-4 space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {key}
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reseñas */}
        <div className="mt-16 lg:mt-24">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Valoraciones de clientes
          </h2>

          <div className="mt-6 space-y-10">
            {product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-t border-gray-200 dark:border-gray-700 pt-10"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {review.userName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <svg
                        key={rating}
                        className={`${
                          review.rating > rating
                            ? 'text-amber-500'
                            : 'text-gray-300 dark:text-gray-600'
                        } h-5 w-5 flex-shrink-0`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="mt-4 space-y-6 text-base italic text-gray-600 dark:text-gray-400">
                    <p>{review.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Este producto aún no tiene valoraciones.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
