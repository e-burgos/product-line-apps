import Layout from '@optical-system-app/components/layout';
import { Settings } from 'lucide-react';
import { useAdminQueries } from 'libs/dexie/src/optical-cloud-db';
import UsersTable from '@optical-system-app/modules/admin/components/tables/users-table';

function AdminPage() {
  const { tokenData } = useAdminQueries();

  return (
    <Layout
      header={{
        title: 'Adminstrador',
        titleIcon: <Settings className="h-6 w-6" />,
      }}
    >
      {tokenData?.accessToken && <UsersTable />}
    </Layout>
  );
}

export default AdminPage;
