/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { useToastStore } from 'libs/ui/src/hooks/use-toast-store';
import Modal from 'libs/ui/src/components/modal';
import { Prescription, db } from '@optical-system-app/lib/db';
import Button from 'libs/ui/src/components/button';
import { UserRoundXIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePrescriptionStore } from '../../hooks/use-prescription-store';

interface DeletePrescriptionModalProps {
  showButton?: boolean;
  prescriptionId?: number;
  backToPrescriptions?: boolean;
}

const DeletePrescriptionModal: React.FC<DeletePrescriptionModalProps> = ({
  showButton,
  prescriptionId: id,
  backToPrescriptions,
}) => {
  const navigate = useNavigate();
  const { openDeleteModal, setOpenDeleteModal, currentPrescription } =
    usePrescriptionStore();
  const { addToast } = useToastStore();
  const prescription = currentPrescription as Prescription;
  const prescriptionId = id || prescription?.id;

  const handleDelete = async () => {
    if (prescription?.id !== undefined) {
      try {
        await db.prescriptions.delete(prescriptionId!);
        addToast({
          id: 'prescription-deleted',
          title: 'Ficha eliminada',
          message: 'Los datos de esta ficha han sido eliminados.',
          variant: 'success',
        });
        setOpenDeleteModal(false);
        if (backToPrescriptions) navigate('/prescriptions');
      } catch {
        addToast({
          id: 'error-deleting-prescription',
          title: 'Error',
          message: 'Ocurrió un error al eliminar la ficha',
          variant: 'destructive',
        });
        setOpenDeleteModal(false);
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
          title: `Eliminar ficha N° ${prescription?.receiptNumber}`,
          content: '¿Estás seguro de que deseas eliminar a esta ficha?',
        }}
        onSubmit={handleDelete}
      />
    </>
  );
};

export default DeletePrescriptionModal;
