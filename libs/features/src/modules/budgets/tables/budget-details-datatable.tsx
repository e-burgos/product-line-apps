import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { BudgetVariant, db } from 'libs/features/src/data/product-db';
import { DataTable } from '@product-line/datatable';
import useBudgetDetailsColumns from '../hooks/use-budget-details-columns';
import DeleteDetail from '../modals/delete-detail';
import EditBudgetDetailModal from '../modals/edit-budget-detail-modal';
import { useBudgetStore } from '../hooks/use-budget-store';

interface BudgetDetailsDatatableProps {
  budgetId?: number;
}

export const BudgetDetailsDatatable: React.FC<BudgetDetailsDatatableProps> = ({
  budgetId,
}) => {
  const { setCurrentDetail, setOpenDeleteDetailModal, setOpenEditDetailModal } =
    useBudgetStore();
  const { columns } = useBudgetDetailsColumns();
  const details = useLiveQuery(() => db.budgetVariants.toArray())?.filter(
    (v) => v.budgetId === Number(budgetId)
  );

  return (
    <>
      <DataTable
        tableId="budget-details"
        data={details || []}
        columns={columns}
        pagination={{
          showPagination: true,
          pageSize: 5,
          pageIndex: 0,
          takeDefaultPagination: true,
        }}
        stateMessage={{
          noData: 'No hay detalles'.toLocaleUpperCase(),
          noDataDescription:
            'No hay detalles disponibles para este presupuesto. Puede agregar un nuevo detalle haciendo clic en el botón "Agregar".',
        }}
        setCurrentRow={(row) =>
          setCurrentDetail(row?.original as BudgetVariant)
        }
        rowActions={[
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
        ]}
      />
      <DeleteDetail />
      <EditBudgetDetailModal />
    </>
  );
};

export default BudgetDetailsDatatable;
