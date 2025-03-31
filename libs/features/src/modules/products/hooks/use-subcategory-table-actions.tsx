import { IRowActions } from 'libs/datatable/src/common/types';
import { ProductSubCategory } from 'libs/dexie/src/optical-cloud-db/types/db-types';
import { DexieCloudEntity } from 'dexie-cloud-addon/dist/modern/DexieCloudTable';
import { useProductStore } from './use-product-store';

const useSubCategoryTableActions = () => {
  const { setOpenEditSubCategoryModal, setOpenDeleteSubCategoryModal } =
    useProductStore();

  const rowActions: IRowActions<ProductSubCategory & DexieCloudEntity>[] = [
    {
      action: 'edit',
      label: () => 'Editar',
      onClick: () => setOpenEditSubCategoryModal(true),
    },
    {
      action: 'delete',
      label: () => 'Borrar',
      onClick: () => setOpenDeleteSubCategoryModal(true),
    },
  ];
  return { rowActions };
};

export default useSubCategoryTableActions;
