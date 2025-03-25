import Layout from '@optical-system-app/components/layout';
import Button from 'libs/ui/src/components/button/button';
import { Users, Share2, Sheet } from 'lucide-react';
import AddCustomerModal from '@optical-system-app/modules/customers/components/modals/add-customer-modal';
import useCustomerData from '@optical-system-app/modules/customers/hooks/use-customer-data';
import CustomersTable from '@optical-system-app/modules/customers/tables/customers-table';

function CustomersPage() {
  const { shareCustomersData, exportCustomersToExcel } = useCustomerData();

  return (
    <Layout
      header={{
        title: 'Clientes',
        titleIcon: <Users className="h-6 w-6" />,
        headerContent: (
          <>
            <Button
              variant="ghost"
              size="small"
              shape="rounded"
              onClick={() => exportCustomersToExcel()}
              tooltip="Exportar a Excel"
              className="p-2"
            >
              <Sheet className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="small"
              shape="rounded"
              onClick={() => shareCustomersData()}
              tooltip="Compartir Datos"
              className="p-2"
            >
              <Share2 className="h-4 w-4" />
            </Button>
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
