import React from 'react';
import { db, Variant } from '@product-manager-app/lib/db';
import { useToastStore } from 'libs/ui/src/hooks/use-toast-store';
import { useProductStore } from '../../hooks/use-product-store';
import Modal from 'libs/ui/src/components/modal';
import Button from 'libs/ui/src/components/button';
import { Trash2 } from 'lucide-react';

interface DeleteVariantProps {
  variant: Variant;
}

const DeleteVariant: React.FC<DeleteVariantProps> = ({ variant }) => {
  const { addToast } = useToastStore();
  const { openDeleteVariantModal, setOpenDeleteVariantModal } =
    useProductStore();

  const handleDelete = async () => {
    if (variant.id) {
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
    <>
      <Button
        variant="ghost"
        shape="circle"
        size="mini"
        onClick={() => setOpenDeleteVariantModal(true)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
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
    </>
  );
};

export default DeleteVariant;
