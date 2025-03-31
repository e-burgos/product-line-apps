import { UserCog2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import CardContainer from 'libs/ui/src/components/forms/card-container';
import DetailCustomerForm from '@optical-system-app/modules/customers/components/forms/detail-customer-form';
import { useEffect, useState } from 'react';
import EditCustomerModal from '@optical-system-app/modules/customers/components/modals/edit-customer-modal';
import CardTitle from 'libs/ui/src/components/forms/card-title';
import DeleteCustomerModal from '@optical-system-app/modules/customers/components/modals/delete-customer-modal';
import Layout from '@optical-system-app/components/layout';
import CustomerPrescriptionsTable from '@optical-system-app/modules/customers/tables/customer-prescriptions-table';
import { Customer, useCustomerMethods } from '@product-line/dexie';
import ShareButtons from '@optical-system-app/components/share-buttons';

function CustomerDetailPage() {
  const { getCustomerById, checkIsCustomer } = useCustomerMethods();

  const { id } = useParams();
  const customerId = id;
  const [customer, setCustomer] = useState<Customer | null>();

  useEffect(() => {
    if (customerId) setCustomer(getCustomerById(customerId));
  }, [customerId, getCustomerById]);

  return (
    <Layout
      header={{
        title: 'Detalles del Cliente',
        titleIcon: <UserCog2 className="h-6 w-6 text-brand" />,
        headerContent: (
          <>
            {/* TODO: Add share buttons */}
            <ShareButtons />
            <DeleteCustomerModal
              showButton
              customerId={customerId}
              backToCustomers
            />
            <EditCustomerModal
              showButton
              customerId={customerId}
              customer={customer}
            />
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
