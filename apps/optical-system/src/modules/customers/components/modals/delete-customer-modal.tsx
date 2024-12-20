import React from 'react';
import Modal from 'libs/ui/src/components/modal';
import { useCustomerStore } from '../../hooks/use-customer-store';
import Button from 'libs/ui/src/components/button';
import { UserRoundXIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Customer, useCustomerMethods } from '@product-line/dexie';

interface DeleteCustomerModalProps {
  showButton?: boolean;
  customerId?: string;
  backToCustomers?: boolean;
}

const DeleteCustomerModal: React.FC<DeleteCustomerModalProps> = ({
  showButton,
  customerId: id,
  backToCustomers,
}) => {
  const { deleteCustomer } = useCustomerMethods();
  const navigate = useNavigate();
  const { openDeleteModal, setOpenDeleteModal, currentCustomer } =
    useCustomerStore();
  const customer = currentCustomer as Customer;
  const customerId = id || customer?.id;

  const handleDelete = async () => {
    if (customerId !== undefined) {
      const deleteMethod = await deleteCustomer(customerId);
      if (deleteMethod.isSuccess) {
        setOpenDeleteModal(false);
        if (backToCustomers) navigate('/customers');
      }
    }
  };

  return (
    <>
      {showButton && (
        <Button
          variant="solid"
          shape="rounded"
          size="small"
          onClick={() => setOpenDeleteModal(true)}
        >
          <div className="flex items-center">
            <UserRoundXIcon className="h-4 w-4" />
          </div>
        </Button>
      )}
      <Modal
        isOpen={openDeleteModal}
        className="w-[500px]"
        setIsOpen={setOpenDeleteModal}
        text={{
          title: `Eliminar Cliente ${customer?.name || ''} ${
            customer?.lastName || ''
          }`,
          content: '¿Estás seguro de que deseas eliminar a este cliente?',
        }}
        onSubmit={handleDelete}
      />
    </>
  );
};

export default DeleteCustomerModal;
