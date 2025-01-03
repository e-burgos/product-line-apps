import { FC } from 'react';
import { useBudgetStore } from '../hooks/use-budget-store';
import Modal from 'libs/ui/src/components/modal';
import { EditBudgetForm } from '../forms/edit-budget-form';
import { Budget } from '@product-line/dexie';

export const EditBudgetModal: FC = () => {
  const { openEditModal, setOpenEditModal, currentBudget } = useBudgetStore();
  const budget = currentBudget as Budget;

  return (
    <Modal
      isOpen={openEditModal}
      setIsOpen={setOpenEditModal}
      hideButtons
      closeable
      text={{
        title: `Editar ${budget?.title || 'Presupuesto'}`,
      }}
    >
      {budget?.id ? <EditBudgetForm /> : null}
    </Modal>
  );
};

export default EditBudgetModal;
