import Layout from '@optical-system-app/components/layout';
import { Users } from 'lucide-react';
import AddCustomerModal from '@optical-system-app/modules/customers/components/modals/add-customer-modal';
import CustomersTable from '@optical-system-app/modules/customers/tables/customers-table';
import ShareButtons from '@optical-system-app/components/share-buttons';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, useInitCloudDB } from '@product-line/dexie';

function CustomersPage() {
  const { isLoggedIn } = useInitCloudDB();
  useLiveQuery(() => db.customers.orderBy('name').toArray(), [isLoggedIn]);

  return (
    <Layout
      header={{
        title: 'Clientes',
        titleIcon: <Users className="h-6 w-6 text-brand" />,
        headerContent: (
          <>
            {/* TODO: Add share buttons */}
            <ShareButtons />
            <AddCustomerModal />
          </>
        ),
      }}
    >
      <CustomersTable />
    </Layout>
  );
}

export default CustomersPage;
