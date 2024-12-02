import { Edit } from 'lucide-react';
import Modal from 'libs/ui/src/components/modal';
import Button from 'libs/ui/src/components/button';
import { usePrescriptionStore } from '../../hooks/use-prescription-store';
import { useWindowSize } from 'react-use';
import PrescriptionForm from '../forms/prescription-form';
import { FC, useCallback, useEffect } from 'react';
import usePrescriptionData from '../../hooks/use-prescription-data';
import useCustomerData from '@optical-system-app/modules/customers/hooks/use-customer-data';
import { Customer } from '@optical-system-app/lib/db';
import { useCustomerStore } from '@optical-system-app/modules/customers/hooks/use-customer-store';

interface EditPrescriptionModalProps {
  hideButton?: boolean;
  prescriptionId?: number;
}

const EditPrescriptionModal: FC<EditPrescriptionModalProps> = ({
  hideButton = false,
  prescriptionId: id,
}) => {
  const {
    openEditModal,
    currentPrescription,
    setOpenEditModal,
    setCurrentPrescription,
  } = usePrescriptionStore();
  const { getCustomer } = useCustomerData();
  const { setCurrentCustomer } = useCustomerStore();
  const { getPrescriptionById } = usePrescriptionData();
  const { width } = useWindowSize();

  const getPrescription = useCallback(() => {
    if (currentPrescription?.id) return currentPrescription;
    if (id) return setCurrentPrescription(getPrescriptionById(id));
  }, [currentPrescription, getPrescriptionById, id, setCurrentPrescription]);

  useEffect(() => {
    if (openEditModal) getPrescription();
  }, [getPrescription, openEditModal]);

  useEffect(() => {
    if (!openEditModal) {
      setCurrentCustomer(null);
      setCurrentPrescription(null);
    }
  }, [openEditModal, setCurrentCustomer, setCurrentPrescription]);

  return (
    <>
      {!hideButton && (
        <Button
          variant="solid"
          shape="rounded"
          size="small"
          onClick={() => setOpenEditModal(true)}
        >
          <div className="flex items-center">
            <Edit className={width > 700 ? 'h-4 w-4 mr-2' : 'h-6 w-6'} />
            {width > 700 && 'Editar Ficha'}
          </div>
        </Button>
      )}

      <Modal
        isOpen={openEditModal}
        setIsOpen={setOpenEditModal}
        text={{
          title: 'Nueva Ficha',
        }}
        hideButtons
      >
        {currentPrescription && (
          <PrescriptionForm
            type="update"
            prescriptionData={currentPrescription}
            customerData={
              getCustomer(currentPrescription.customerId) as Customer
            }
          />
        )}
      </Modal>
    </>
  );
};

export default EditPrescriptionModal;
