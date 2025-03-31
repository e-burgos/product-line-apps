import Layout from '@optical-system-app/components/layout';
import ShareButtons from '@optical-system-app/components/share-buttons';
import AddPrescriptionModal from '@optical-system-app/modules/prescriptions/components/modals/add-prescription-modal';
import PrescriptionsTable from '@optical-system-app/modules/prescriptions/components/tables/prescriptions-table';
import { ReceiptText } from 'lucide-react';

function PrescriptionsPage() {
  return (
    <Layout
      header={{
        title: 'Fichas de Servicio',
        titleIcon: <ReceiptText className="h-6 w-6 text-brand" />,
        headerContent: (
          <>
            {/* TODO: Add share buttons */}
            <ShareButtons />
            <AddPrescriptionModal />
          </>
        ),
      }}
    >
      <PrescriptionsTable />
    </Layout>
  );
}

export default PrescriptionsPage;
