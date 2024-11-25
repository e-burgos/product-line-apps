import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@product-manager-app/lib/db';
import { DataTable } from '@product-line/datatable';
import useBudgetDetailsColumns from '../hooks/use-budget-details-columns';

interface BudgetDetailsDatatableProps {
  budgetId?: number;
}

const BudgetDetailsDatatable: React.FC<BudgetDetailsDatatableProps> = ({
  budgetId,
}) => {
  const { columns } = useBudgetDetailsColumns();
  const details = useLiveQuery(() => db.budgetVariants.toArray())?.filter(
    (v) => v.budgetId === Number(budgetId)
  );

  return (
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
    />
  );
};

export default BudgetDetailsDatatable;
