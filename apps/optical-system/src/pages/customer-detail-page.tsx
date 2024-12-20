import Button from 'libs/ui/src/components/button/button';
import { UserCog2, Download, Share2 } from 'lucide-react';
import useCustomerData from '@optical-system-app/modules/customers/hooks/use-customer-data';
import { useParams } from 'react-router-dom';
import CardContainer from 'libs/ui/src/components/forms/card-container';
import DetailCustomerForm from '@optical-system-app/modules/customers/components/forms/detail-customer-form';
import { useEffect, useState } from 'react';
import EditCustomerModal from '@optical-system-app/modules/customers/components/modals/edit-customer-modal';
import CardTitle from 'libs/ui/src/components/forms/card-title';
import DeleteCustomerModal from '@optical-system-app/modules/customers/components/modals/delete-customer-modal';
import Layout from '@optical-system-app/components/layout';
import CustomerPrescriptionsTable from '@optical-system-app/modules/customers/tables/customer-prescriptions-table';
import { Customer } from '@product-line/dexie';

function CustomerDetailPage() {
  const {
    getCustomer,
    shareOneCustomer,
    exportOneCustomerToExcel,
    checkIsCustomer,
  } = useCustomerData();

  const { id } = useParams();
  const customerId = id;
  const [customer, setCustomer] = useState<Customer | null>();

  useEffect(() => {
    if (customerId) setCustomer(getCustomer(customerId));
  }, [customerId, getCustomer]);

  return (
    <Layout
      header={{
        title: 'Detalles del Cliente',
        titleIcon: <UserCog2 className="h-6 w-6" />,
        linkToBack: '/customers',
        headerContent: (
          <>
            <Button
              variant="ghost"
              size="small"
              shape="rounded"
              onClick={() => exportOneCustomerToExcel(customerId)}
              title="Exportar a Excel"
              className="p-2"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="small"
              shape="rounded"
              onClick={() => shareOneCustomer(customerId)}
              title="Compartir"
              className="p-2"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <DeleteCustomerModal
              showButton
              customerId={customerId}
              backToCustomers
            />
            <EditCustomerModal showButton customerId={customerId} />
          </>
        ),
      }}
    >
      {!checkIsCustomer(customerId) ? (
        <CardContainer className="sm:py-10 py-8">
          <CardTitle title="Cliente no encontrado" className="sm:p-4 p-4">
            <p>El cliente que buscas no existe o ha sido eliminado.</p>
          </CardTitle>
        </CardContainer>
      ) : (
        <>
          {customer && (
            <CardContainer className="sm:py-12 py-8 gap-12">
              <CardTitle title="Datos del Cliente" className="sm:py-4 py-4">
                <DetailCustomerForm customer={customer} />
              </CardTitle>
              <CardTitle title="Fichas del Cliente" className="sm:p-4 p-4">
                <CustomerPrescriptionsTable />
              </CardTitle>
            </CardContainer>
          )}
        </>
      )}
    </Layout>
  );
}

export default CustomerDetailPage;
