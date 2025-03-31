import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import {
  Product,
  ProductCategory,
  ProductSubCategory,
} from '../types/db-types';
import { useToastStore } from 'libs/ui/src/hooks';
import { v4 as uuidv4 } from 'uuid';

export const useProductMethods = () => {
  const { addToast } = useToastStore();

  // Product methods
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
        message: 'No se pudo actualizar el producto.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true, product: null };
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      await db.products.delete(productId);
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

  // Category methods
  const addCategory = async (category: ProductCategory) => {
    try {
      await db.productCategories.add({
        ...category,
        id: uuidv4(),
      });
      addToast({
        id: 'category-created',
        title: 'Categoría creada',
        message: 'La categoría se ha creado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false, category };
    } catch (error) {
      console.error(error);
      addToast({
        id: 'category-error',
        title: 'Error',
        message: 'No se pudo crear la categoría.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true, category: null };
    }
  };

  const updateCategory = async (category: ProductCategory) => {
    try {
      await db.productCategories.update(category.id, {
        ...category,
      });
      addToast({
        id: 'category-updated',
        title: 'Categoría actualizada',
        message: 'La categoría se ha actualizado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false, category };
    } catch (error) {
      console.error(error);
      addToast({
        id: 'category-error',
        title: 'Error',
        message: 'No se pudo actualizar la categoría.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true, category: null };
    }
  };

  const deleteCategory = async (categoryId: string) => {
    try {
      await db.productCategories.delete(categoryId);
      addToast({
        id: 'category-deleted',
        title: 'Categoría eliminada',
        message: 'La categoría se ha eliminado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false };
    } catch (error) {
      console.error(error);
      addToast({
        id: 'category-error',
        title: 'Error',
        message: 'No se pudo eliminar la categoría.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true };
    }
  };

  // SubCategory methods
  const addSubCategory = async (
    subCategory: ProductSubCategory,
    category: ProductCategory
  ) => {
    try {
      const newSubCategory = {
        ...subCategory,
        id: uuidv4(),
      };

      await db.productSubCategories.add(newSubCategory);

      const updatedCategory = {
        ...category,
        subcategories: [...(category.subcategories || []), newSubCategory],
      };

      await db.productCategories.update(category.id, updatedCategory);

      addToast({
        id: 'subcategory-created',
        title: 'Subcategoría creada',
        message: 'La subcategoría se ha creado correctamente.',
        variant: 'success',
      });

      return { isSuccess: true, isError: false, subCategory: newSubCategory };
    } catch (error) {
      console.error(error);
      addToast({
        id: 'subcategory-error',
        title: 'Error',
        message: 'No se pudo crear la subcategoría.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true, subCategory: null };
    }
  };

  const updateSubCategory = async (
    subCategory: ProductSubCategory,
    category: ProductCategory,
    currentCategory: ProductCategory
  ) => {
    try {
      await db.productSubCategories.update(subCategory.id, {
        ...subCategory,
      });

      if (currentCategory.id !== category.id) {
        const currentCategoryData = {
          ...currentCategory,
          subcategories: currentCategory.subcategories?.filter(
            (subC) => subC.id !== subCategory.id
          ),
        };

        const newSelectedCategoryData = {
          ...category,
          subcategories: [
            ...(category.subcategories?.filter(
              (subC) => subC.id !== subCategory.id
            ) || []),
            subCategory,
          ],
        };

        await db.productCategories.update(
          currentCategory.id,
          currentCategoryData
        );
        await db.productCategories.update(category.id, newSelectedCategoryData);
      }

      addToast({
        id: 'subcategory-updated',
        title: 'Subcategoría actualizada',
        message: 'La subcategoría se ha actualizado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false, subCategory };
    } catch (error) {
      console.error(error);
      addToast({
        id: 'subcategory-error',
        title: 'Error',
        message: 'No se pudo actualizar la subcategoría.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true, subCategory: null };
    }
  };

  const deleteSubCategory = async (subCategoryId: string) => {
    try {
      const subCategory = await db.productSubCategories.get(subCategoryId);
      const category = await db.productCategories.get(subCategory?.categoryId);
      if (category) {
        await db.productCategories.update(category.id, {
          ...category,
          subcategories: category.subcategories?.filter(
            (subC) => subC.id !== subCategoryId
          ),
        });
      }
      await db.productSubCategories.delete(subCategoryId);
      addToast({
        id: 'subcategory-deleted',
        title: 'Subcategoría eliminada',
        message: 'La subcategoría se ha eliminado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false };
    } catch (error) {
      console.error(error);
      addToast({
        id: 'subcategory-error',
        title: 'Error',
        message: 'No se pudo eliminar la subcategoría.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true };
    }
  };

  // Queries
  const products = useLiveQuery(() => db.products.toArray());
  const categories = useLiveQuery(() => db.productCategories.toArray());
  const subCategories = useLiveQuery(() => db.productSubCategories.toArray());

  const getProductById = (productId: string) => {
    const product = products?.find((product) => product.id === productId);
    return product;
  };

  const getCategoryById = (categoryId: string) => {
    const category = categories?.find((category) => category.id === categoryId);
    return category;
  };

  const getCategoryByProductId = (productId: string) => {
    const product = products?.find((product) => product.id === productId);
    const category = categories?.find(
      (category) => category.id === product?.category?.id
    );
    return category;
  };

  const getSubCategoryByProductId = (productId: string) => {
    const product = products?.find((product) => product.id === productId);
    const subCategory = subCategories?.find(
      (subCategory) => subCategory.id === product?.subcategory?.id
    );
    return subCategory;
  };

  const getSubCategoryById = (subCategoryId: string) => {
    const subCategory = subCategories?.find(
      (subCategory) => subCategory.id === subCategoryId
    );
    return subCategory;
  };

  const getSubCategoriesByCategoryId = (categoryId: string) => {
    const subCategoriesByCategoryId = subCategories?.filter(
      (subCategory) => subCategory.categoryId === categoryId
    );
    return subCategoriesByCategoryId;
  };

  return {
    products,
    categories,
    subCategories,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    addSubCategory,
    updateSubCategory,
    deleteSubCategory,
    getProductById,
    getCategoryById,
    getSubCategoryById,
    getSubCategoriesByCategoryId,
    getCategoryByProductId,
    getSubCategoryByProductId,
  };
};

export default useProductMethods;
