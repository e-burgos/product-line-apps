import { FC } from 'react';
import { useProductStore } from '../../hooks/use-product-store';
import { EditSubCategoryForm } from '../forms/edit-subcategory-form';
import { ProductSubCategory } from '@product-line/dexie';
import Modal from 'libs/ui/src/components/modal';

export const EditSubCategoryModal: FC = () => {
  const {
    openEditSubCategoryModal,
    setOpenEditSubCategoryModal,
    currentSubCategory,
  } = useProductStore();
  const subCategory = currentSubCategory as ProductSubCategory;

  return (
    <Modal
      isOpen={openEditSubCategoryModal}
      setIsOpen={setOpenEditSubCategoryModal}
      hideButtons
      closeable
      className="w-full md:w-1/2"
      text={{
        title: `Editar ${subCategory?.title || 'Subcategoría'}`,
      }}
    >
      {subCategory?.id ? (
        <EditSubCategoryForm subCategoryId={subCategory.id} />
      ) : null}
    </Modal>
  );
};
