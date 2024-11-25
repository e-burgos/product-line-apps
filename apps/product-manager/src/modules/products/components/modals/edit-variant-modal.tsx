import { FC } from 'react';
import { Variant } from '@product-manager-app/lib/db';
import { useProductStore } from '../../hooks/use-product-store';
import Button from 'libs/ui/src/components/button';
import { Edit2 } from 'lucide-react';
import Modal from 'libs/ui/src/components/modal';
import { EditProductVariantForm } from '../forms/edit-product-variant-form';

interface EditVariantModalProps {
  variant: Variant;
}

const EditVariantModal: FC<EditVariantModalProps> = ({ variant }) => {
  const { openEditVariantModal, setOpenEditVariantModal } = useProductStore();
  return (
    <>
      <Button
        variant="ghost"
        shape="circle"
        size="mini"
        onClick={() => setOpenEditVariantModal(true)}
      >
        <Edit2 className="h-4 w-4" />
      </Button>
      <Modal
        isOpen={openEditVariantModal}
        setIsOpen={setOpenEditVariantModal}
        text={{
          title: `Editar Variante ${variant?.title || ''}`,
        }}
        hideButtons
      >
        {variant?.id ? <EditProductVariantForm variantId={variant.id} /> : null}
      </Modal>
    </>
  );
};

export default EditVariantModal;
