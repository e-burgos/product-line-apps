import { FC } from 'react';
import { useProductStore } from '../../hooks/use-product-store';
import Modal from 'libs/ui/src/components/modal';
import { EditProductVariantForm } from '../forms/edit-product-variant-form';

export const EditVariantModal: FC = () => {
  const { openEditVariantModal, setOpenEditVariantModal, currentVariant } =
    useProductStore();
  const variant = currentVariant;

  return (
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
  );
};

export default EditVariantModal;
