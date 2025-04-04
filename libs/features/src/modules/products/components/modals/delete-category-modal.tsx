import { FC } from 'react';
import { useProductStore } from '../../hooks/use-product-store';
import { ProductCategory } from '@product-line/dexie';
import Modal from 'libs/ui/src/components/modal';
import Button from 'libs/ui/src/components/button';
import { useProductMethods } from '@product-line/dexie';

export const DeleteCategoryModal: FC = () => {
  const {
    openDeleteCategoryModal,
    setOpenDeleteCategoryModal,
    currentCategory,
  } = useProductStore();
  const { deleteCategory } = useProductMethods();
  const category = currentCategory as ProductCategory;

  const handleDelete = async () => {
    if (category?.id) {
      const result = await deleteCategory(category.id);
      if (result.isSuccess) {
        setOpenDeleteCategoryModal(false);
      }
    }
  };

  return (
    <Modal
      isOpen={openDeleteCategoryModal}
      setIsOpen={setOpenDeleteCategoryModal}
      hideButtons
      closeable
      className="w-full md:w-1/2"
      text={{
        title: `Eliminar ${category?.title || 'Categoría'}`,
        content: `¿Estás seguro que deseas eliminar la categoría "${category?.title}"? Esta acción no se puede deshacer.`,
      }}
    >
      <div className="flex justify-end space-x-2 pt-4 mt-4">
        <Button
          size="medium"
          shape="rounded"
          variant="ghost"
          onClick={() => setOpenDeleteCategoryModal(false)}
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
