import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartItem } from '../../types/cart';
import { Product, ProductVariant } from '../../types/product';

interface CartStore {
  isCartOpen: boolean;
  setIsCartOpen: (isCartOpen: boolean) => void;
  cart: Cart;
  addToCart: (
    product: Product,
    variant: ProductVariant,
    quantity: number
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const TAX_RATE = 0.21; // 21% IVA
const SHIPPING_COST = 5.99;

const calculateCartTotals = (
  items: CartItem[]
): { subtotal: number; shipping: number; tax: number; total: number } => {
  const subtotal = Number(
    items
      .reduce(
        (sum, item) =>
          sum +
          (item.product.discountPrice || item.product.price) * item.quantity,
        0
      )
      .toFixed(2)
  );
  const shipping = items.length ? SHIPPING_COST : 0;
  const tax = Number((subtotal * TAX_RATE).toFixed(2));
  const total = Number((subtotal + shipping + tax).toFixed(2));

  return { subtotal, shipping, tax, total };
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: {
        items: [],
        subtotal: 0,
        shipping: 0,
        tax: 0,
        total: 0,
      },
      isCartOpen: false,
      setIsCartOpen: (isCartOpen: boolean) => set({ isCartOpen }),
      addToCart: (product, variant, quantity) => {
        const currentCart = get().cart;
        const existingItemIndex = currentCart.items.findIndex(
          (item) =>
            item.product.id === product.id && item.variant.id === variant.id
        );

        let updatedItems;

        if (existingItemIndex >= 0) {
          // Actualizar cantidad si ya existe
          updatedItems = [...currentCart.items];
          updatedItems[existingItemIndex].quantity += quantity;
        } else {
          // Agregar nuevo item
          const newItem: CartItem = {
            id: `${product.id}-${variant.id}-${Date.now()}`,
            product,
            variant,
            quantity,
          };
          updatedItems = [...currentCart.items, newItem];
        }

        const totals = calculateCartTotals(updatedItems);

        set({
          cart: {
            items: updatedItems,
            ...totals,
          },
        });
      },

      removeFromCart: (itemId) => {
        const currentCart = get().cart;
        const updatedItems = currentCart.items.filter(
          (item) => item.id !== itemId
        );
        const totals = calculateCartTotals(updatedItems);

        set({
          cart: {
            items: updatedItems,
            ...totals,
          },
        });
      },

      updateQuantity: (itemId, quantity) => {
        const currentCart = get().cart;
        const updatedItems = currentCart.items.map((item) => {
          if (item.id === itemId) {
            return { ...item, quantity: Math.max(1, quantity) };
          }
          return item;
        });

        const totals = calculateCartTotals(updatedItems);

        set({
          cart: {
            items: updatedItems,
            ...totals,
          },
        });
      },

      clearCart: () => {
        set({
          cart: {
            items: [],
            subtotal: 0,
            shipping: 0,
            tax: 0,
            total: 0,
          },
        });
      },
    }),
    {
      name: 'optical-cart-storage',
    }
  )
);
