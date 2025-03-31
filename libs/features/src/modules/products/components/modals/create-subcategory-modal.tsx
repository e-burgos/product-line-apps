import { FC } from 'react';
import { useProductStore } from '../../hooks/use-product-store';
import { AddSubCategoryForm } from '../forms/add-subcategory-form';
import Modal from 'libs/ui/src/components/modal';

export const CreateSubCategoryModal: FC = () => {
  const { openCreateSubCategoryModal, setOpenCreateSubCategoryModal } =
    useProductStore();

  return (
    <Modal
      isOpen={openCreateSubCategoryModal}
      setIsOpen={setOpenCreateSubCategoryModal}
      closeable
      text={{
        title: 'Crear Subcategoría',
      }}
      hideButtons
      className="w-full md:w-1/2"
    >
      <AddSubCategoryForm />
    </Modal>
  );
};
