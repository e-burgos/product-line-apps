import Layout from '@optical-system-app/components/layout';
import { Settings } from 'lucide-react';
import { useAuthQueries, useTokenStore } from 'libs/dexie/src/optical-cloud-db';
import UsersTable from '@optical-system-app/modules/admin/components/tables/users-table';
import { useEffect } from 'react';

function AdminPage() {
  const { getAdminToken } = useAuthQueries();
  const { tokenData } = useTokenStore();

  useEffect(() => {
    getAdminToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout
      header={{
        title: 'Adminstrador',
        titleIcon: <Settings className="h-6 w-6 text-brand" />,
      }}
    >
      {tokenData?.accessToken && <UsersTable />}
    </Layout>
  );
}

export default AdminPage;
