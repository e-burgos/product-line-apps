import { useState } from 'react';
import { DataTable } from '@product-line/datatable';
import { Budget, useBudgetMethods } from '@product-line/dexie';
import {
  BudgetDetailsDatatable,
  DeleteBudget,
  EditBudgetModal,
  useBudgetColumns,
  useBudgetData,
  useBudgetStore,
} from '@product-line/features';
import { CardContainer, CardTitle, InputSearcher } from '@product-line/ui';
import AddBudgetDetailModal from '../modals/add-budget-detail-modal';

export function BudgetsDatatable() {
  const {
    setCurrentBudget,
    setOpenDeleteModal,
    setOpenEditModal,
    setOpenCreateDetailModal,
  } = useBudgetStore();
  const { budgets } = useBudgetMethods();
  const { columns } = useBudgetColumns();
  const { exportOneBudgetToExcel, shareOneBudget } = useBudgetData();

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
              enableDragColumns: false,
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
            renderSubComponent={(row) => {
              const budget = (row?.row?.original as Budget) || {};
              return <BudgetDetailsDatatable budgetId={budget?.id as string} />;
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
            rowActions={[
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
                onClick: (row) => shareOneBudget(row?.original?.id),
              },
              {
                action: 'download',
                label: () => 'Exportar a Excel',
                onClick: (row) => exportOneBudgetToExcel(row?.original?.id),
              },
            ]}
          />
        </CardTitle>
      </CardContainer>
      <EditBudgetModal />
      <AddBudgetDetailModal />
      <DeleteBudget />
    </>
  );
}

export default BudgetsDatatable;
