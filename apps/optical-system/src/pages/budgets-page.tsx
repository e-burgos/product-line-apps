import Layout from '@optical-system-app/components/layout';
import {
  AddBudgetModal,
  BudgetsDatatable,
  useBudgetData,
} from '@product-line/features';
import Button from 'libs/ui/src/components/button/button';
import { Download, Share2, TableCellsSplitIcon } from 'lucide-react';

function BudgetsPage() {
  const { exportToExcel, shareData } = useBudgetData();

  return (
    <Layout
      header={{
        title: 'Presupuestos',
        titleIcon: <TableCellsSplitIcon className="h-6 w-6" />,
        headerContent: (
          <>
            <Button
              variant="ghost"
              size="small"
              shape="rounded"
              onClick={exportToExcel}
              title="Exportar a Excel"
              className="p-2"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="small"
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
      <BudgetsDatatable />
    </Layout>
  );
}

export default BudgetsPage;
