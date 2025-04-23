/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { CartItem } from '../../types/cart';
import Button from 'libs/ui/src/components/button/button';
import { TrashIcon } from 'lucide-react';
import { useCartStore } from '../../lib/store/cartStore';
import { Link } from 'react-router-dom';
import CounterButton from '../ui/CounterButton';
import { notAvailableImage } from '../../data/products';
interface CartProductItemProps {
  item: CartItem;
  onClose: () => void;
}

const CartProductItem: React.FC<CartProductItemProps> = ({ item, onClose }) => {
  const { updateQuantity, removeFromCart } = useCartStore();

  const [_imageLoaded, setImageLoaded] = useState(true);
  const [imageError, setImageError] = useState<string>('');

  const defaultImage = notAvailableImage;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (e.type === 'error') setImageError(defaultImage);
    setImageLoaded(false);
  };

  return (
    <li key={item.id} className="py-4 flex">
      <div className="flex-shrink-0 w-16 h-16 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
        <img
          src={imageError || item.variant.images[0] || item.product.images[0]}
          alt={item.product.name}
          className="w-full h-full object-center object-cover"
          onError={handleImageError}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className="ml-4 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
            <h3 className="hover:text-brand">
              <Link to={`/product/${item.product.id}`} onClick={onClose}>
                {item.product.name}
              </Link>
            </h3>
            <p className="ml-4">
              $
              {(
                (item.product.discountPrice || item.product.price) *
                item.quantity
              ).toFixed(2)}
            </p>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {item.variant.name} - {item.variant.color}
          </p>
        </div>
        <div className="flex-1 flex items-end justify-between text-sm mt-2">
          <CounterButton
            quantity={item.quantity}
            onDecrement={() => updateQuantity(item.id, item.quantity - 1)}
            onIncrement={() => updateQuantity(item.id, item.quantity + 1)}
            disabledDecrement={item.quantity <= 1}
            disabledIncrement={item.quantity >= item.variant.stock}
          />
          <Button
            variant="ghost"
            color="danger"
            size="mini"
            onClick={() => removeFromCart(item.id)}
            aria-label="Eliminar"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </li>
  );
};

export default CartProductItem;
