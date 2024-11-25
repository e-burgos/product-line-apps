import React from 'react';
import { db } from '@product-manager-app/lib/db';
import { useToastStore } from 'libs/ui/src/hooks/use-toast-store';
import { useProductStore } from '../../hooks/use-product-store';
import Modal from 'libs/ui/src/components/modal';

const DeleteVariant: React.FC = () => {
  const { addToast } = useToastStore();
  const { openDeleteVariantModal, setOpenDeleteVariantModal, currentVariant } =
    useProductStore();

  const variant = currentVariant;

  const handleDelete = async () => {
    if (variant?.id) {
      await db.variants.delete(variant.id);
      addToast({
        id: 'variant-deleted',
        title: 'Variante eliminada',
        message: 'La variante han sido eliminados.',
        variant: 'success',
      });
      setOpenDeleteVariantModal(false);
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
      onSubmit={handleDelete}
    />
  );
};

export default DeleteVariant;
