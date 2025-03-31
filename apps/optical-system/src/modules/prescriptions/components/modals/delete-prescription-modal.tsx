/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import Modal from 'libs/ui/src/components/modal';
import Button from 'libs/ui/src/components/button';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePrescriptionStore } from '../../hooks/use-prescription-store';
import { Prescription, usePrescriptionMethods } from '@product-line/dexie';

interface DeletePrescriptionModalProps {
  showButton?: boolean;
  prescriptionId?: string;
  prescriptionData?: Prescription;
  backToPrescriptions?: boolean;
}

const DeletePrescriptionModal: React.FC<DeletePrescriptionModalProps> = ({
  showButton,
  prescriptionId: id,
  prescriptionData,
  backToPrescriptions,
}) => {
  const { deletePrescription } = usePrescriptionMethods();
  const navigate = useNavigate();
  const { openDeleteModal, setOpenDeleteModal, currentPrescription } =
    usePrescriptionStore();
  const prescription = currentPrescription as Prescription;
  const prescriptionId = prescriptionData?.id || id || prescription?.id;

  const handleDelete = async () => {
    if (prescriptionId !== undefined) {
      const deleteOperation = await deletePrescription(prescriptionId);
      if (deleteOperation.isSuccess) {
        setOpenDeleteModal(false);
        if (backToPrescriptions) navigate('/prescriptions');
      }
      if (deleteOperation.isError) setOpenDeleteModal(false);
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
            <Trash2 className="h-4 w-4" />
          </div>
        </Button>
      )}
      <Modal
        isOpen={openDeleteModal}
        className="w-[500px]"
        setIsOpen={setOpenDeleteModal}
        text={{
          title: `Eliminar ficha N° ${
            prescriptionData?.receiptNumber || prescription?.receiptNumber || ''
          } 
          `,
          content: '¿Estás seguro de que deseas eliminar a esta ficha?',
        }}
        onSubmit={handleDelete}
      />
    </>
  );
};

export default DeletePrescriptionModal;
