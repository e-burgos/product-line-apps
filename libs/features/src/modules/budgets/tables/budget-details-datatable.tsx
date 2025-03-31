import React from 'react';
import { DataTable } from '@product-line/datatable';
import useBudgetDetailsColumns from '../hooks/use-budget-details-columns';
import DeleteDetail from '../modals/delete-detail';
import EditBudgetDetailModal from '../modals/edit-budget-detail-modal';
import { useBudgetStore } from '../hooks/use-budget-store';
import { useBudgetMethods } from '@product-line/dexie';
interface BudgetDetailsDatatableProps {
  budgetId: string;
}

export const BudgetDetailsDatatable: React.FC<BudgetDetailsDatatableProps> = ({
  budgetId,
}) => {
  const { setCurrentDetail } = useBudgetStore();
  const { getBudgetDetails } = useBudgetMethods();
  const { columns } = useBudgetDetailsColumns();
  const details = getBudgetDetails(budgetId);

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
        smallAnatomy={true}
        stateMessage={{
          noData: 'No hay detalles'.toLocaleUpperCase(),
          noDataDescription:
            'No hay detalles disponibles para este presupuesto. Puede agregar un nuevo detalle haciendo click en "Agregar Detalle" dentro de las opciones del presupuesto.',
        }}
        setCurrentRow={(row) => setCurrentDetail(row?.original)}
      />
      <DeleteDetail />
      <EditBudgetDetailModal />
    </>
  );
};

export default BudgetDetailsDatatable;
