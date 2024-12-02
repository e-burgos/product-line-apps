/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { useProductStore } from '../../hooks/use-product-store';
import { useToastStore } from '@product-line/ui';
import Modal from 'libs/ui/src/components/modal';
import { db, Product } from 'libs/features/src/data/product-db';

export const DeleteProduct: React.FC = () => {
  const { openDeleteModal, setOpenDeleteModal, currentProduct } =
    useProductStore();
  const { addToast } = useToastStore();
  const product = currentProduct as Product;

  const handleDelete = async () => {
    if (product?.id !== undefined) {
      await db.variants.where('productId').equals(product.id!).delete();
      await db.products.delete(product.id!);
      addToast({
        id: 'product-deleted',
        title: 'Producto eliminado',
        message: 'El producto y sus variantes han sido eliminados.',
        variant: 'success',
      });
      setOpenDeleteModal(false);
    }
  };
  return (
    <Modal
      isOpen={openDeleteModal}
      setIsOpen={setOpenDeleteModal}
      text={{
        title: `Eliminar ${product?.title || 'Producto'}`,
        content: '¿Estás seguro de que deseas eliminar este producto?',
      }}
      onSubmit={handleDelete}
    />
  );
};

export default DeleteProduct;
