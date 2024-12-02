/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { useToastStore } from 'libs/ui/src/hooks/use-toast-store';
import Modal from 'libs/ui/src/components/modal';
import { useCustomerStore } from '../../hooks/use-customer-store';
import { Customer, db } from '@optical-system-app/lib/db';
import Button from 'libs/ui/src/components/button';
import { UserRoundXIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DeleteCustomerModalProps {
  showButton?: boolean;
  customerId?: number;
  backToCustomers?: boolean;
}

const DeleteCustomerModal: React.FC<DeleteCustomerModalProps> = ({
  showButton,
  customerId: id,
  backToCustomers,
}) => {
  const navigate = useNavigate();
  const { openDeleteModal, setOpenDeleteModal, currentCustomer } =
    useCustomerStore();
  const { addToast } = useToastStore();
  const customer = currentCustomer as Customer;
  const customerId = id || customer?.id;

  const handleDelete = async () => {
    if (customer?.id !== undefined) {
      await db.prescriptions.where('customerId').equals(customerId!).delete();
      await db.customers.delete(customerId!);
      addToast({
        id: 'customer-deleted',
        title: 'Cliente eliminado',
        message: 'Los datos del cliente y sus fichas han sido eliminados.',
        variant: 'success',
      });
      setOpenDeleteModal(false);
      if (backToCustomers) navigate('/customers');
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
