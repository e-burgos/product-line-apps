import { Edit } from 'lucide-react';
import Modal from 'libs/ui/src/components/modal';
import Button from 'libs/ui/src/components/button';
import { usePrescriptionStore } from '../../hooks/use-prescription-store';
import { useWindowSize } from 'react-use';
import PrescriptionForm from '../forms/prescription-form';
import { FC, useCallback, useEffect } from 'react';
import { useCustomerStore } from '@optical-system-app/modules/customers/hooks/use-customer-store';
import { useNavigate } from 'react-router-dom';
import {
  useCustomerMethods,
  usePrescriptionMethods,
} from '@product-line/dexie';

interface EditPrescriptionModalProps {
  showButton?: boolean;
  prescriptionId?: string;
  reloadPage?: boolean;
}

const EditPrescriptionModal: FC<EditPrescriptionModalProps> = ({
  showButton = false,
  prescriptionId: id,
  reloadPage = false,
}) => {
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { setCurrentCustomer } = useCustomerStore();
  const { getCustomerById } = useCustomerMethods();
  const { getPrescriptionById } = usePrescriptionMethods();
  const { currentCustomer } = useCustomerStore();
  const {
    openEditModal,
    currentPrescription,
    setOpenEditModal,
    setCurrentPrescription,
  } = usePrescriptionStore();

  const prescription = getPrescriptionById(id as string);
  const customer = currentCustomer?.id
    ? currentCustomer
    : getCustomerById(prescription?.customer?.id as string);

  const getPrescription = useCallback(() => {
    if (currentPrescription?.id) return currentPrescription;
    if (prescription) return setCurrentPrescription(prescription);
  }, [currentPrescription, prescription, setCurrentPrescription]);

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
      {showButton && (
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
        onClose={() => {
          setOpenEditModal(false);
          if (reloadPage) navigate(0);
        }}
        text={{
          title: `Editar Ficha ${currentPrescription?.receiptNumber || ''}`,
        }}
        hideButtons
      >
        {currentPrescription && (
          <PrescriptionForm
            type="update"
            prescriptionData={currentPrescription}
            customerData={customer}
          />
        )}
      </Modal>
    </>
  );
};

export default EditPrescriptionModal;
