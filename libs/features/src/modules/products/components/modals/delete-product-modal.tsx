import React from 'react';
import { useProductStore } from '../../hooks/use-product-store';
import Modal from 'libs/ui/src/components/modal';
import { Product, useProductMethods } from '@product-line/dexie';

export const DeleteProductModal: React.FC = () => {
  const { openDeleteModal, setOpenDeleteModal, currentProduct } =
    useProductStore();
  const { deleteProduct } = useProductMethods();
  const product = currentProduct as Product;

  const handleDelete = async () => {
    if (product?.id !== undefined) {
      const deleted = await deleteProduct(product.id);
      if (deleted.isSuccess) {
        setOpenDeleteModal(false);
      }
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
      className="w-full md:w-1/2"
      onSubmit={handleDelete}
    />
  );
};

export default DeleteProductModal;
