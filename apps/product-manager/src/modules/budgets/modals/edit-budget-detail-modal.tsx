import { Edit2 } from 'lucide-react';
import { FC } from 'react';
import { BudgetVariant } from '@product-manager-app/lib/db';
import { useBudgetStore } from '../hooks/use-budget-store';
import Modal from 'libs/ui/src/components/modal';
import Button from 'libs/ui/src/components/button';
import { EditBudgetDetailsForm } from '../forms/edit-budget-detail-form';

interface EditBudgetDetailModalProps {
  detail: BudgetVariant;
}

const EditBudgetDetailModal: FC<EditBudgetDetailModalProps> = ({ detail }) => {
  const { openEditDetailModal, setOpenEditDetailModal } = useBudgetStore();
  return (
    <>
      <Button
        variant="ghost"
        shape="circle"
        size="mini"
        onClick={() => setOpenEditDetailModal(true)}
      >
        <Edit2 className="h-4 w-4" />
      </Button>

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
    </>
  );
};

export default EditBudgetDetailModal;
