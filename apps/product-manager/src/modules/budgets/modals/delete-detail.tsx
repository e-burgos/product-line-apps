import React from 'react';
import { useToastStore } from 'libs/ui/src/hooks/use-toast-store';
import { db } from '@product-manager-app/lib/db';
import { useBudgetStore } from '../hooks/use-budget-store';
import Modal from 'libs/ui/src/components/modal';

const DeleteDetail: React.FC = () => {
  const { addToast } = useToastStore();
  const { openDeleteDetailModal, currentDetail, setOpenDeleteDetailModal } =
    useBudgetStore();
  const detail = currentDetail;

  const handleDelete = async () => {
    if (detail?.id) {
      await db.budgetVariants.delete(detail.id);
      addToast({
        id: 'detail-deleted',
        title: 'Detalle eliminado',
        message: 'El detalle han sido eliminado.',
        variant: 'success',
      });
      setOpenDeleteDetailModal(false);
    }
  };
  return (
    <Modal
      isOpen={openDeleteDetailModal}
      setIsOpen={setOpenDeleteDetailModal}
      text={{
        title: `Eliminar Detalle ${detail?.title || ''}`,
        content:
          '¿Estás seguro de que deseas eliminar este detalle de presupuesto?',
      }}
      onSubmit={handleDelete}
    />
  );
};

export default DeleteDetail;
