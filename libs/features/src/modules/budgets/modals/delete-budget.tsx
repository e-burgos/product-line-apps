/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { useToastStore } from 'libs/ui/src/hooks/use-toast-store';
import { Budget, db } from 'libs/features/src/data/product-db';
import Modal from 'libs/ui/src/components/modal';
import { useBudgetStore } from '../hooks/use-budget-store';

export const DeleteBudget: React.FC = () => {
  const { openDeleteModal, setOpenDeleteModal, currentBudget } =
    useBudgetStore();
  const { addToast } = useToastStore();
  const budget = currentBudget as Budget;

  const handleDelete = async () => {
    if (budget?.id !== undefined) {
      await db.budgetVariants.where('budgetId').equals(budget.id!).delete();
      await db.budgets.delete(budget.id!);
      addToast({
        id: 'budget-deleted',
        title: 'Presupuesto eliminado',
        message: 'El presupuesto y sus detalles han sido eliminados.',
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
        title: `Eliminar Presupuesto ${budget?.title || ''}`,
        content: '¿Estás seguro de que deseas eliminar este presupuesto?',
      }}
      onSubmit={handleDelete}
    />
  );
};

export default DeleteBudget;
