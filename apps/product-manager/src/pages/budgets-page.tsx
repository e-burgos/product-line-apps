import { CreateBudgetModal, BudgetsDatatable } from '@product-line/features';
import Layout from '@product-manager-app/components/layout';
import ShareButtons from '@product-manager-app/components/share-buttons';
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
