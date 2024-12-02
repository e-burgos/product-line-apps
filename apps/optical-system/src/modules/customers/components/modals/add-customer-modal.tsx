import { Plus } from 'lucide-react';
import Modal from 'libs/ui/src/components/modal';
import Button from 'libs/ui/src/components/button';
import { useCustomerStore } from '../../hooks/use-customer-store';
import AddCustomerForm from '../forms/add-customer-form';
import { useWindowSize } from 'react-use';

const AddCustomerModal = () => {
  const { openCreateModal, setOpenCreateModal } = useCustomerStore();
  const { width } = useWindowSize();
  return (
    <>
      <Button
        variant="solid"
        shape="rounded"
        size="small"
        onClick={() => setOpenCreateModal(true)}
      >
        <div className="flex items-center">
          <Plus className={width > 700 ? 'h-4 w-4 mr-2' : 'h-6 w-6'} />
          {width > 700 && 'Agregar Cliente'}
        </div>
      </Button>

      <Modal
        isOpen={openCreateModal}
        setIsOpen={setOpenCreateModal}
        text={{
          title: 'Nuevo Cliente',
        }}
        hideButtons
      >
        <AddCustomerForm />
      </Modal>
    </>
  );
};

export default AddCustomerModal;
