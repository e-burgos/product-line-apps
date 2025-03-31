import Layout from '@optical-system-app/components/layout';
import ShareButtons from '@optical-system-app/components/share-buttons';
import { CreateBudgetModal, BudgetsDatatable } from '@product-line/features';
import { TableCellsSplitIcon } from 'lucide-react';

function BudgetsPage() {
  return (
    <Layout
      header={{
        title: 'Presupuestos',
        titleIcon: <TableCellsSplitIcon className="h-6 w-6 text-brand" />,
        headerContent: (
          <>
            {/* TODO: Add share buttons */}
            <ShareButtons />
            <CreateBudgetModal showButton={true} />
          </>
        ),
      }}
    >
      <BudgetsDatatable />
    </Layout>
  );
}

export default BudgetsPage;
