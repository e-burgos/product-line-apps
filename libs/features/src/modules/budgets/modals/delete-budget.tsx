import React from 'react';
import Modal from 'libs/ui/src/components/modal';
import { useBudgetStore } from '../hooks/use-budget-store';
import { Budget, useBudgetMethods } from '@product-line/dexie';

export const DeleteBudget: React.FC = () => {
  const { openDeleteModal, setOpenDeleteModal, currentBudget } =
    useBudgetStore();
  const { deleteBudget } = useBudgetMethods();
  const budget = currentBudget as Budget;

  const handleDelete = async () => {
    if (budget?.id !== undefined) {
      const deleted = await deleteBudget(budget.id);
      if (deleted) {
        setOpenDeleteModal(false);
      }
    }
  };

  return (
    <Modal
      isOpen={openDeleteModal}
      setIsOpen={setOpenDeleteModal}
      text={{
        title: `Eliminar Presupuesto ${budget?.title || ''}`,
        content: '¿Estás seguro de que deseas eliminar este presupuesto?',
      }}
      onSubmit={handleDelete}
    />
  );
};

export default DeleteBudget;
