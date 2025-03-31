import { useState } from 'react';
import { DataTable } from '@product-line/datatable';
import { Budget, useBudgetMethods } from '@product-line/dexie';
import { CardContainer, CardTitle, InputSearcher } from '@product-line/ui';
import useBudgetTableActions from '../hooks/use-budget-table-actions';
import { useBudgetStore } from '../hooks/use-budget-store';
import useBudgetColumns from '../hooks/use-budget-columns';
import BudgetDetailsDatatable from './budget-details-datatable';
import EditBudgetModal from '../modals/edit-budget-modal';
import CreateBudgetDetailModal from '../modals/create-budget-detail-modal';
import DeleteBudget from '../modals/delete-budget';

export function BudgetsDatatable() {
  const { setCurrentBudget } = useBudgetStore();
  const { budgets } = useBudgetMethods();
  const { columns } = useBudgetColumns();
  const { rowActions } = useBudgetTableActions();

  const [search, setSearch] = useState<string>('');

  const filterData = () => {
    if (!search) return budgets;
    if (budgets)
      return budgets?.filter((budget) => {
        return budget?.title
          ?.toLocaleLowerCase()
          ?.includes(search.toLowerCase());
      });
    return [];
  };

  return (
    <>
      <CardContainer>
        <CardTitle title="Buscador" className="mt-6">
          <DataTable
            tableId={'budgets'}
            data={filterData() || []}
            columns={columns}
            border
            headerOptions={{
              enableDragColumns: true,
              enablePinLeftColumns: false,
              enablePinRightColumns: false,
              headerContainer: (
                <div className="flex justify-between items-center w-full !h-20 max-h-20 p-4">
                  <InputSearcher
                    placeholder="Buscar por nombre de presupuesto"
                    className="w-full max-w-80"
                    value={search}
                    onChange={(value) => setSearch(value as string)}
                  />
                </div>
              ),
            }}
            pagination={{
              showPagination: true,
              pageSize: 5,
              pageIndex: 0,
              takeDefaultPagination: true,
            }}
            stateMessage={{
              noData:
                search && filterData()
                  ? 'No se encontraron resultados'.toLocaleUpperCase()
                  : 'No hay presupuestos registrados'.toLocaleUpperCase(),
              noDataDescription:
                search && filterData()
                  ? 'Intenta con otra búsqueda.'
                  : 'Agrega un nuevo presupuesto para comenzar. Para agregar un nuevo presupuesto, haz clic en el botón "Agregar". Tips: Puedes exportar los presupuestos a Excel o compartirlos con otras personas.',
            }}
            setCurrentRow={(row) => setCurrentBudget(row?.original as Budget)}
            rowActions={rowActions}
            renderSubComponent={(row) => {
              const budget = (row?.row?.original as Budget) || {};
              return <BudgetDetailsDatatable budgetId={budget?.id as string} />;
            }}
          />
        </CardTitle>
      </CardContainer>
      <EditBudgetModal />
      <CreateBudgetDetailModal />
      <DeleteBudget />
    </>
  );
}

export default BudgetsDatatable;
