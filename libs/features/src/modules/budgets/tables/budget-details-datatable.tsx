import React from 'react';
import { DataTable } from '@product-line/datatable';
import useBudgetDetailsColumns from '../hooks/use-budget-details-columns';
import DeleteDetail from '../modals/delete-detail';
import EditBudgetDetailModal from '../modals/edit-budget-detail-modal';
import { useBudgetStore } from '../hooks/use-budget-store';
import { BudgetVariant, useBudgetMethods } from '@product-line/dexie';

interface BudgetDetailsDatatableProps {
  budgetId: string;
}

export const BudgetDetailsDatatable: React.FC<BudgetDetailsDatatableProps> = ({
  budgetId,
}) => {
  const { setCurrentDetail } = useBudgetStore();
  const { columns } = useBudgetDetailsColumns();
  const { getBudgetVariants } = useBudgetMethods();
  const details = getBudgetVariants(budgetId);

  return (
    <>
      <DataTable
        tableId="budget-details"
        data={details || []}
        columns={columns}
        pagination={{
          showPagination: false,
        }}
        headerOptions={{
          enableDragColumns: false,
          enablePinLeftColumns: false,
          enablePinRightColumns: false,
        }}
        stateMessage={{
          noData: 'No hay detalles'.toLocaleUpperCase(),
          noDataDescription:
            'No hay detalles disponibles para este presupuesto. Puede agregar un nuevo detalle haciendo clic en el botón "Agregar".',
        }}
        setCurrentRow={(row) =>
          setCurrentDetail(row?.original as BudgetVariant)
        }
      />
      <DeleteDetail />
      <EditBudgetDetailModal />
    </>
  );
};

export default BudgetDetailsDatatable;
