import Modal from 'libs/ui/src/components/modal';
import { FC } from 'react';
import { useProductStore } from '../../hooks/use-product-store';
import { ProductCategory } from '@product-line/dexie';
import { EditCategoryForm } from '../forms/edit-category-form';

export const EditCategoryModal: FC = () => {
  const { openEditCategoryModal, setOpenEditCategoryModal, currentCategory } =
    useProductStore();
  const category = currentCategory as ProductCategory;

  return (
    <Modal
      isOpen={openEditCategoryModal}
      setIsOpen={setOpenEditCategoryModal}
      hideButtons
      closeable
      className="w-full md:w-1/2"
      text={{
        title: `Editar ${category?.title || 'Categoría'}`,
      }}
    >
      {category?.id ? <EditCategoryForm categoryId={category.id} /> : null}
    </Modal>
  );
};

export default EditCategoryModal;
