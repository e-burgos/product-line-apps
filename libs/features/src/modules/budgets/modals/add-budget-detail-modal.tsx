import Modal from 'libs/ui/src/components/modal';
import { useBudgetStore } from '../hooks/use-budget-store';
import { AddBudgetDetailInLineForm } from '../forms/add-budget-detail-in-line-form';

export const AddBudgetDetailModal = () => {
  const { currentBudget, openCreateDetailModal, setOpenCreateDetailModal } =
    useBudgetStore();
  return (
    <Modal
      isOpen={openCreateDetailModal}
      setIsOpen={setOpenCreateDetailModal}
      closeable
      text={{
        title: 'Nuevo Detalle de Presupuesto',
      }}
      hideButtons
    >
      {currentBudget?.id && (
        <AddBudgetDetailInLineForm budgetId={currentBudget?.id} />
      )}
    </Modal>
  );
};

export default AddBudgetDetailModal;
