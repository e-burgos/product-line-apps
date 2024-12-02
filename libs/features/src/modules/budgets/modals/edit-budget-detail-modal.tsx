import { FC } from 'react';
import { useBudgetStore } from '../hooks/use-budget-store';
import Modal from 'libs/ui/src/components/modal';
import { EditBudgetDetailsForm } from '../forms/edit-budget-detail-form';

export const EditBudgetDetailModal: FC = () => {
  const { currentDetail, openEditDetailModal, setOpenEditDetailModal } =
    useBudgetStore();
  const detail = currentDetail;

  return (
    <Modal
      isOpen={openEditDetailModal}
      setIsOpen={setOpenEditDetailModal}
      text={{
        title: `Editar Detalle ${detail?.title || ''}`,
      }}
      hideButtons
    >
      {detail?.id ? <EditBudgetDetailsForm budgetDetail={detail} /> : null}
    </Modal>
  );
};

export default EditBudgetDetailModal;
