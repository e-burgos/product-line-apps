import React from 'react';
import { useBudgetStore } from '../hooks/use-budget-store';
import Modal from 'libs/ui/src/components/modal';
import { useBudgetMethods } from '@product-line/dexie';

export const DeleteDetail: React.FC = () => {
  const { deleteBudgetDetail } = useBudgetMethods();
  const { openDeleteDetailModal, currentDetail, setOpenDeleteDetailModal } =
    useBudgetStore();
  const detail = currentDetail;

  const handleDelete = async () => {
    if (detail?.id) {
      const deleted = await deleteBudgetDetail(detail.id);
      if (deleted) {
        setOpenDeleteDetailModal(false);
      }
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
