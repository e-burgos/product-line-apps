import { DataTable } from '@product-line/datatable';
import {
  AddBudgetModal,
  Budget,
  BudgetDetailsDatatable,
  DeleteBudget,
  EditBudgetModal,
  useBudgetColumns,
  useBudgetData,
  useBudgetStore,
} from '@product-line/features';
import Layout from '@product-manager-app/components/layout';
import Button from 'libs/ui/src/components/button/button';
import { Download, Share2, TableCellsSplitIcon } from 'lucide-react';

export function BudgetsPage() {
  const { setCurrentBudget, setOpenDeleteModal, setOpenEditModal } =
    useBudgetStore();
  const { columns } = useBudgetColumns();
  const {
    budgets,
    exportToExcel,
    shareData,
    exportOneBudgetToExcel,
    shareOneBudget,
  } = useBudgetData();

  return (
    <Layout
      header={{
        title: 'Presupuestos',
        titleIcon: <TableCellsSplitIcon className="h-6 w-6" />,
        headerContent: (
          <>
            <Button
              variant="ghost"
              size="mini"
              shape="rounded"
              onClick={exportToExcel}
              title="Exportar a Excel"
              className="p-2"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="mini"
              shape="rounded"
              onClick={shareData}
              title="Compartir"
              className="p-2"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <AddBudgetModal />
          </>
        ),
      }}
    >
      <DataTable
        tableId={'budgets'}
        data={budgets || []}
        columns={columns}
        border
        pagination={{
          showPagination: true,
          pageSize: 5,
          pageIndex: 0,
          takeDefaultPagination: true,
        }}
        renderSubComponent={(row) => {
          const budget = (row?.row?.original as Budget) || {};
          return <BudgetDetailsDatatable budgetId={budget?.id} />;
        }}
        stateMessage={{
          noData: 'No hay presupuestos'.toLocaleUpperCase(),
          noDataDescription:
            'Agrega un nuevo presupuesto para comenzar. Para agregar un nuevo presupuesto, haz clic en el botón "Agregar". Tips: Puedes exportar los presupuestos a Excel o compartirlos con otras personas.',
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
      <EditBudgetModal />
      <DeleteBudget />
    </Layout>
  );
}

export default BudgetsPage;
