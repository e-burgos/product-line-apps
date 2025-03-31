import { IRowActions } from 'libs/datatable/src/common/types';
import { Budget } from 'libs/dexie/src/optical-cloud-db/types/db-types';
import { DexieCloudEntity } from 'dexie-cloud-addon/dist/modern/DexieCloudTable';
import { useBudgetStore } from './use-budget-store';
import useBudgetData from './use-budget-data';

const useBudgetTableActions = () => {
  const { exportOneBudgetToExcel, shareOneBudget } = useBudgetData();
  const { setOpenDeleteModal, setOpenEditModal, setOpenCreateDetailModal } =
    useBudgetStore();

  const rowActions: IRowActions<Budget & DexieCloudEntity>[] = [
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
    {
      action: 'edit',
      label: () => 'Agregar Detalle',
      onClick: () => setOpenCreateDetailModal(true),
    },
    {
      action: 'download',
      label: () => 'Compartir',
      onClick: (row) => shareOneBudget(Number(row?.original?.id)),
    },
    {
      action: 'download',
      label: () => 'Exportar a Excel',
      onClick: (row) => exportOneBudgetToExcel(row?.original?.id),
    },
  ];
  return { rowActions };
};

export default useBudgetTableActions;
