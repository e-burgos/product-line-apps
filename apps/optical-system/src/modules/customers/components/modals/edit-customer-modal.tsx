import { FC } from 'react';
import { UserRoundPenIcon } from 'lucide-react';
import Modal from 'libs/ui/src/components/modal';
import Button from 'libs/ui/src/components/button';
import { useCustomerStore } from '../../hooks/use-customer-store';
import EditCustomerForm from '../forms/edit-customer-form';

interface EditCustomerModalProps {
  showButton?: boolean;
  customerId?: string;
}

const EditCustomerModal: FC<EditCustomerModalProps> = ({
  showButton = false,
  customerId,
}) => {
  const { openEditModal, setOpenEditModal, currentCustomer } =
    useCustomerStore();
  return (
    <>
      {showButton && (
        <Button
          variant="solid"
          shape="rounded"
          size="small"
          onClick={() => setOpenEditModal(true)}
        >
          <div className="flex items-center">
            <UserRoundPenIcon className="h-4 w-4" />
          </div>
        </Button>
      )}

      <Modal
        isOpen={openEditModal}
        setIsOpen={setOpenEditModal}
        text={{
          title: `Editar Cliente ${currentCustomer?.name || ''} ${
            currentCustomer?.lastName || ''
          }`,
        }}
        hideButtons
      >
        <EditCustomerForm
          customerId={customerId || (currentCustomer?.id as string)}
        />
      </Modal>
    </>
  );
};

export default EditCustomerModal;
