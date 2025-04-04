import { FC } from 'react';
import { useProductStore } from '../../hooks/use-product-store';
import { ProductSubCategory } from '@product-line/dexie';
import Modal from 'libs/ui/src/components/modal';
import Button from 'libs/ui/src/components/button';
import { useProductMethods } from '@product-line/dexie';

export const DeleteSubCategoryModal: FC = () => {
  const {
    openDeleteSubCategoryModal,
    setOpenDeleteSubCategoryModal,
    currentSubCategory,
  } = useProductStore();
  const { deleteSubCategory } = useProductMethods();
  const subCategory = currentSubCategory as ProductSubCategory;

  const handleDelete = async () => {
    if (subCategory?.id) {
      const result = await deleteSubCategory(subCategory.id);
      if (result.isSuccess) {
        setOpenDeleteSubCategoryModal(false);
      }
    }
  };

  return (
    <Modal
      isOpen={openDeleteSubCategoryModal}
      setIsOpen={setOpenDeleteSubCategoryModal}
      hideButtons
      closeable
      className="w-full md:w-1/2"
      text={{
        title: `Eliminar ${subCategory?.title || 'Subcategoría'}`,
        content: `¿Estás seguro que deseas eliminar la subcategoría "${subCategory?.title}"? Esta acción no se puede deshacer.`,
      }}
    >
      <div className="flex justify-end space-x-2 pt-4 mt-4">
        <Button
          size="medium"
          shape="rounded"
          variant="ghost"
          onClick={() => setOpenDeleteSubCategoryModal(false)}
        >
          Cancelar
        </Button>
        <Button type="button" variant="solid" onClick={handleDelete}>
          Eliminar
        </Button>
      </div>
    </Modal>
  );
};
