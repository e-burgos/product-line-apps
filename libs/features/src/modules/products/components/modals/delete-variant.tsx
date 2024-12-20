import React from 'react';
import { useProductStore } from '../../hooks/use-product-store';
import Modal from 'libs/ui/src/components/modal';
import { useProductMethods } from '@product-line/dexie';

export const DeleteVariant: React.FC = () => {
  const { deleteProductVariant } = useProductMethods();
  const { openDeleteVariantModal, setOpenDeleteVariantModal, currentVariant } =
    useProductStore();

  const variant = currentVariant;

  const handleDelete = async () => {
    if (variant?.id) {
      const deleted = await deleteProductVariant(variant.id);
      if (deleted.isSuccess) setOpenDeleteVariantModal(false);
    }
  };
  return (
    <Modal
      isOpen={openDeleteVariantModal}
      setIsOpen={setOpenDeleteVariantModal}
      text={{
        title: `Eliminar Variante ${variant?.title || ''}`,
        content:
          '¿Estás seguro de que deseas eliminar esta variante de producto?',
      }}
      className="w-full md:w-1/2"
      onSubmit={handleDelete}
    />
  );
};

export default DeleteVariant;
