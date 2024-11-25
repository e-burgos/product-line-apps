import { DataTable } from '@product-line/datatable';
import Layout from '@product-manager-app/components/layout';
import { Budget } from '@product-manager-app/lib/db';
import useBudgetColumns from '@product-manager-app/modules/budgets/hooks/use-budget-columns';
import useBudgetData from '@product-manager-app/modules/budgets/hooks/use-budget-data';
import { useBudgetStore } from '@product-manager-app/modules/budgets/hooks/use-budget-store';
import AddBudgetModal from '@product-manager-app/modules/budgets/modals/add-budget-modal';
import DeleteBudget from '@product-manager-app/modules/budgets/modals/delete-budget';
import EditBudgetModal from '@product-manager-app/modules/budgets/modals/edit-budget-modal';
import BudgetDetailsDatatable from '@product-manager-app/modules/budgets/tables/budget-details-datatable';
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
