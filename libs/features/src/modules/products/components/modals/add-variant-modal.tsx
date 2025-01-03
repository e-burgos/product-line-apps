import { useProductStore } from '../../hooks/use-product-store';
import Modal from 'libs/ui/src/components/modal';
import { AddProductVariantInLineForm } from '../forms/add-variant-in-line-form';

export const AddVariantModal = () => {
  const { openCreateVariantModal, setOpenCreateVariantModal } =
    useProductStore();
  return (
    <Modal
      isOpen={openCreateVariantModal}
      setIsOpen={setOpenCreateVariantModal}
      closeable
      text={{
        title: 'Nueva Variante',
      }}
      hideButtons
      className="w-full md:w-1/2 "
    >
      <AddProductVariantInLineForm />
    </Modal>
  );
};

export default AddVariantModal;
