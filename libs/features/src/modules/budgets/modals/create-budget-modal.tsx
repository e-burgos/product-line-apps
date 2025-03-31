import { Plus } from 'lucide-react';
import Modal from 'libs/ui/src/components/modal';
import Button from 'libs/ui/src/components/button';
import { AddBudgetForm } from '../forms/add-budget-form';
import { useBudgetStore } from '../hooks/use-budget-store';
import { useWindowSize } from 'react-use';

export const CreateBudgetModal = ({
  showButton = false,
}: {
  showButton?: boolean;
}) => {
  const { openCreateModal, setOpenCreateModal } = useBudgetStore();
  const { width } = useWindowSize();
  return (
    <>
      {showButton && (
        <Button
          variant="solid"
          shape="rounded"
          size="small"
          onClick={() => setOpenCreateModal(true)}
        >
          <div className="flex items-center">
            <Plus className={width > 700 ? 'h-4 w-4 mr-2' : 'h-6 w-6'} />
            {width > 700 && 'Agregar Presupuesto'}
          </div>
        </Button>
      )}

      <Modal
        isOpen={openCreateModal}
        setIsOpen={setOpenCreateModal}
        text={{
          title: 'Nuevo Presupuesto',
        }}
        className="w-full md:w-1/2"
        hideButtons
      >
        <AddBudgetForm />
      </Modal>
    </>
  );
};

export default CreateBudgetModal;
