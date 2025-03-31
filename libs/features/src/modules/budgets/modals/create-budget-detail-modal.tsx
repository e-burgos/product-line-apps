import { Plus } from 'lucide-react';
import Modal from 'libs/ui/src/components/modal';
import Button from 'libs/ui/src/components/button';
import { AddBudgetDetailsForm } from '../forms/add-budget-detail-form';
import { useBudgetStore } from '../hooks/use-budget-store';
import { useWindowSize } from 'react-use';

export const CreateBudgetDetailModal = ({
  showButton = false,
}: {
  showButton?: boolean;
}) => {
  const { openCreateDetailModal, currentBudget, setOpenCreateDetailModal } =
    useBudgetStore();
  const { width } = useWindowSize();
  return (
    <>
      {showButton && (
        <Button
          variant="solid"
          shape="rounded"
          size="small"
          onClick={() => setOpenCreateDetailModal(true)}
        >
          <div className="flex items-center">
            <Plus className={width > 700 ? 'h-4 w-4 mr-2' : 'h-6 w-6'} />
            {width > 700 && 'Agregar Detalle'}
          </div>
        </Button>
      )}

      <Modal
        isOpen={openCreateDetailModal}
        setIsOpen={setOpenCreateDetailModal}
        text={{
          title: 'Nuevo Detalle de Presupuesto',
        }}
        className="w-full md:w-1/2"
        hideButtons
      >
        {currentBudget && <AddBudgetDetailsForm budget={currentBudget} />}
      </Modal>
    </>
  );
};

export default CreateBudgetDetailModal;
