import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Product, ProductWithVariants, Variant } from '../types/db-types';
import { useToastStore } from 'libs/ui/src/hooks';
import { v4 as uuidv4 } from 'uuid';
import { useCallback } from 'react';

export const useProductMethods = () => {
  const { addToast } = useToastStore();

  const addProduct = async (product: Product) => {
    try {
      await db.products.add({
        ...product,
        id: uuidv4(),
      });
      addToast({
        id: 'product-created',
        title: 'Producto creado',
        message: 'El producto se ha creado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false, product };
    } catch (error) {
      console.error(error);
      addToast({
        id: 'product-error',
        title: 'Error',
        message: 'No se pudo crear el producto.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true, product: null };
    }
  };

  const updateProduct = async (product: Product) => {
    try {
      await db.products.update(product.id, {
        ...product,
      });
      addToast({
        id: 'product-updated',
        title: 'Producto actualizado',
        message: 'El producto se ha actualizado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false, product };
    } catch (error) {
      console.error(error);
      addToast({
        id: 'product-error',
        title: 'Error',
        message: 'No se pudo crear el producto.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true, product: null };
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      await db.products.delete(productId);
      await db.variants.where('productId').equals(productId).delete();
      addToast({
        id: 'product-deleted',
        title: 'Producto eliminado',
        message: 'El producto se ha eliminado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false };
    } catch (error) {
      console.error(error);
      addToast({
        id: 'product-error',
        title: 'Error',
        message: 'No se pudo eliminar el producto.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true };
    }
  };

  const products = useLiveQuery(
    () => db.products.orderBy('title').toArray() || []
  ) as Product[];

  const getProductById = useCallback(
    (productId: string) =>
      products?.find((product) => product.id === productId),
    [products]
  );

  const productVariants = useLiveQuery(() =>
    db.variants.orderBy('productId').toArray()
  ) as Variant[];

  const getProductVariantsById = useCallback(
    (productId: string) =>
      productVariants?.filter((variant) => variant.productId === productId),
    [productVariants]
  );

  const getProductWithVariantsById = useCallback(
    (productId: string): ProductWithVariants => {
      const product = getProductById(productId) as Product;
      const variants = getProductVariantsById(productId) as Variant[];
      const count = variants?.length;
      return {
        ...product,
        variants,
        count,
      };
    },
    [getProductById, getProductVariantsById]
  );

  const getProductVariantById = useCallback(
    (variantId: string) =>
      productVariants?.find((variant) => variant.id === variantId),
    [productVariants]
  );

  const getProductsWithVariants = useCallback((): ProductWithVariants[] => {
    return products?.map((product) => {
      const variants = getProductVariantsById(product.id as string);
      const count = variants?.length;
      return {
        ...product,
        variants,
        count,
      };
    });
  }, [getProductVariantsById, products]);

  const addProductVariant = async (variant: Variant) => {
    try {
      await db.variants.add({
        ...variant,
        id: uuidv4(),
      });
      addToast({
        id: 'variant-created',
        title: 'Variante creada',
        message: 'La variante se ha creado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false, variant };
    } catch (error) {
      console.error(error);
      addToast({
        id: 'variant-error',
        title: 'Error',
        message: 'No se pudo crear la variante.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true, variant: null };
    }
  };

  const updateProductVariant = async (variant: Variant) => {
    try {
      await db.variants.update(variant.id, {
        ...variant,
      });
      addToast({
        id: 'variant-updated',
        title: 'Variante actualizada',
        message: 'La variante se ha actualizado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false, variant };
    } catch (error) {
      console.error(error);
      addToast({
        id: 'variant-error',
        title: 'Error',
        message: 'No se pudo actualizar la variante.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true, variant: null };
    }
  };

  const deleteProductVariant = async (variantId: string) => {
    try {
      await db.variants.delete(variantId);
      addToast({
        id: 'variant-deleted',
        title: 'Variante eliminada',
        message: 'La variante se ha eliminado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false };
    } catch (error) {
      console.error(error);
      addToast({
        id: 'variant-error',
        title: 'Error',
        message: 'No se pudo eliminar la variante.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true };
    }
  };

  return {
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductVariantsById,
    getProductVariantById,
    getProductsWithVariants,
    addProductVariant,
    updateProductVariant,
    deleteProductVariant,
    getProductWithVariantsById,
    products,
    productVariants,
  };
};

export default useProductMethods;
