import { IRowActions } from 'libs/datatable/src/common/types';
import { BudgetDetail } from 'libs/dexie/src/optical-cloud-db/types/db-types';
import { DexieCloudEntity } from 'dexie-cloud-addon/dist/modern/DexieCloudTable';
import { useBudgetStore } from './use-budget-store';

const useBudgetDetailTableActions = () => {
  const { setOpenDeleteDetailModal, setOpenEditDetailModal } = useBudgetStore();

  const rowActions: IRowActions<BudgetDetail & DexieCloudEntity>[] = [
    {
      action: 'edit',
      label: () => 'Editar',
      onClick: () => setOpenEditDetailModal(true),
    },
    {
      action: 'delete',
      label: () => 'Borrar',
      onClick: () => setOpenDeleteDetailModal(true),
    },
  ];
  return { rowActions };
};

export default useBudgetDetailTableActions;
