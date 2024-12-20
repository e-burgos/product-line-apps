import Layout from '@optical-system-app/components/layout';
import AddPrescriptionModal from '@optical-system-app/modules/prescriptions/components/modals/add-prescription-modal';
import PrescriptionsTable from '@optical-system-app/modules/prescriptions/components/tables/prescriptions-table';
import Button from 'libs/ui/src/components/button/button';
import { ReceiptText, Download, Share2 } from 'lucide-react';

function PrescriptionsPage() {
  return (
    <Layout
      header={{
        title: 'Fichas de Servicio',
        titleIcon: <ReceiptText className="h-6 w-6" />,
        headerContent: (
          <>
            <Button
              variant="ghost"
              size="small"
              shape="rounded"
              //onClick={null}
              title="Exportar a Excel"
              className="p-2"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="small"
              shape="rounded"
              //onClick={shareData}
              title="Compartir"
              className="p-2"
            >
              <Share2 className="h-4 w-4" />
            </Button>
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
