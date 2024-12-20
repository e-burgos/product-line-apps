import { Plus } from 'lucide-react';
import Modal from 'libs/ui/src/components/modal';
import Button from 'libs/ui/src/components/button';
import { usePrescriptionStore } from '../../hooks/use-prescription-store';
import { useWindowSize } from 'react-use';
import PrescriptionForm from '../forms/prescription-form';
import { useCustomerStore } from '@optical-system-app/modules/customers/hooks/use-customer-store';
import { FC, useEffect } from 'react';
import { Customer } from '@product-line/dexie';

interface AddPrescriptionModalProps {
  hideButton?: boolean;
  customerData?: Customer;
  type?: 'create' | 'update';
}

const AddPrescriptionModal: FC<AddPrescriptionModalProps> = ({
  hideButton = false,
  customerData,
  type = 'create',
}) => {
  const { setCurrentCustomer } = useCustomerStore();
  const { openCreateModal, setOpenCreateModal } = usePrescriptionStore();
  const { width } = useWindowSize();

  useEffect(() => {
    if (!openCreateModal) setCurrentCustomer(null);
  }, [openCreateModal, setCurrentCustomer]);

  return (
    <>
      {!hideButton && (
        <Button
          variant="solid"
          shape="rounded"
          size="small"
          onClick={() => setOpenCreateModal(true)}
        >
          <div className="flex items-center">
            <Plus className={width > 700 ? 'h-4 w-4 mr-2' : 'h-6 w-6'} />
            {width > 700 && 'Agregar Ficha'}
          </div>
        </Button>
      )}

      <Modal
        isOpen={openCreateModal}
        setIsOpen={setOpenCreateModal}
        text={{
          title: 'Nueva Ficha',
        }}
        hideButtons
      >
        <PrescriptionForm type={type} customerData={customerData} />
      </Modal>
    </>
  );
};

export default AddPrescriptionModal;
