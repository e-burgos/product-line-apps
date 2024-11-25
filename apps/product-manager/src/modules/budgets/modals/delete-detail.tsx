import React from 'react';
import { useToastStore } from 'libs/ui/src/hooks/use-toast-store';
import { BudgetVariant, db } from '@product-manager-app/lib/db';
import { useBudgetStore } from '../hooks/use-budget-store';
import Modal from 'libs/ui/src/components/modal';
import Button from 'libs/ui/src/components/button';
import { Trash2 } from 'lucide-react';

interface DeleteDetailProps {
  detail: BudgetVariant;
}

const DeleteDetail: React.FC<DeleteDetailProps> = ({ detail }) => {
  const { addToast } = useToastStore();
  const { openDeleteDetailModal, setOpenDeleteDetailModal } = useBudgetStore();

  const handleDelete = async () => {
    if (detail.id) {
      await db.budgetVariants.delete(detail.id);
      addToast({
        id: 'detail-deleted',
        title: 'Detalle eliminado',
        message: 'El detalle han sido eliminado.',
        variant: 'success',
      });
      setOpenDeleteDetailModal(false);
    }
  };
  return (
    <>
      <Button
        variant="ghost"
        shape="circle"
        size="mini"
        onClick={() => setOpenDeleteDetailModal(true)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <Modal
        isOpen={openDeleteDetailModal}
        setIsOpen={setOpenDeleteDetailModal}
        text={{
          title: `Eliminar Detalle ${detail?.title || ''}`,
          content:
            '¿Estás seguro de que deseas eliminar este detalle de presupuesto?',
        }}
        onSubmit={handleDelete}
      />
    </>
  );
};

export default DeleteDetail;
