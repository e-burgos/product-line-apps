import { IRowActions } from 'libs/datatable/src/common/types';
import { Product } from 'libs/dexie/src/optical-cloud-db/types/db-types';
import { DexieCloudEntity } from 'dexie-cloud-addon/dist/modern/DexieCloudTable';
import { useProductStore } from './use-product-store';

const useProductTableActions = () => {
  const { setOpenDeleteModal, setOpenEditModal } = useProductStore();

  const rowActions: IRowActions<Product & DexieCloudEntity>[] = [
    {
      action: 'edit',
      label: () => 'Editar',
      onClick: () => setOpenEditModal(true),
    },
    {
      action: 'delete',
      label: () => 'Borrar',
      onClick: () => setOpenDeleteModal(true),
    },
  ];
  return { rowActions };
};

export default useProductTableActions;
