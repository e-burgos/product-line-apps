import { FC } from 'react';
import { useProductStore } from '../../hooks/use-product-store';
import { AddCategoryForm } from '../forms/add-category-form';
import Modal from 'libs/ui/src/components/modal';

export const CreateCategoryModal: FC = () => {
  const { openCreateCategoryModal, setOpenCreateCategoryModal } =
    useProductStore();

  return (
    <Modal
      isOpen={openCreateCategoryModal}
      setIsOpen={setOpenCreateCategoryModal}
      closeable
      text={{
        title: 'Crear Categoría',
      }}
      hideButtons
      className="w-full md:w-1/2"
    >
      <AddCategoryForm />
    </Modal>
  );
};
