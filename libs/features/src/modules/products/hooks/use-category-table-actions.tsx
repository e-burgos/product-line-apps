import { IRowActions } from 'libs/datatable/src/common/types';
import { ProductCategory } from 'libs/dexie/src/optical-cloud-db/types/db-types';
import { DexieCloudEntity } from 'dexie-cloud-addon/dist/modern/DexieCloudTable';
import { useProductStore } from './use-product-store';

const useCategoryTableActions = () => {
  const { setOpenEditCategoryModal, setOpenDeleteCategoryModal } =
    useProductStore();

  const rowActions: IRowActions<ProductCategory & DexieCloudEntity>[] = [
    {
      action: 'edit',
      label: () => 'Editar',
      onClick: () => setOpenEditCategoryModal(true),
    },
    {
      action: 'delete',
      label: () => 'Borrar',
      onClick: () => setOpenDeleteCategoryModal(true),
    },
  ];
  return { rowActions };
};

export default useCategoryTableActions;
