import Button from 'libs/ui/src/components/button/button';
import { Download, ReceiptIcon, Share2 } from 'lucide-react';
import useCustomerData from '@optical-system-app/modules/customers/hooks/use-customer-data';
import { Customer, Prescription } from '@optical-system-app/lib/db';
import { useParams } from 'react-router-dom';
import CardContainer from 'libs/ui/src/components/forms/card-container';
import { useEffect, useState } from 'react';
import CardTitle from 'libs/ui/src/components/forms/card-title';
import Layout from '@optical-system-app/components/layout';
import usePrescriptionData from '@optical-system-app/modules/prescriptions/hooks/use-prescription-data';
import EditPrescriptionModal from '@optical-system-app/modules/prescriptions/components/modals/edit-prescription-modal';
import DeletePrescriptionModal from '@optical-system-app/modules/prescriptions/components/modals/delete-customer-modal';
import DetailPrescriptionForm from '@optical-system-app/modules/prescriptions/components/forms/prescription-detail-form';

function PrescriptionDetailPage() {
  const { getCustomer, shareOneCustomer, exportOneCustomerToExcel } =
    useCustomerData();
  const { getPrescriptionById, checkIsPrescription } = usePrescriptionData();

  const { id } = useParams();
  const prescriptionId = Number(id);
  const [customer, setCustomer] = useState<Customer | null>();
  const prescription = getPrescriptionById(prescriptionId);

  useEffect(() => {
    if (prescription?.customerId)
      setCustomer(getCustomer(prescription?.customerId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prescription?.customerId]);

  console.log(prescription);
  console.log(customer);

  return (
    <Layout
      header={{
        title: 'Detalles de Ficha',
        titleIcon: <ReceiptIcon className="h-6 w-6" />,
        linkToBack: '/prescriptions',
        headerContent: (
          <>
            <Button
              variant="ghost"
              size="small"
              shape="rounded"
              onClick={() => exportOneCustomerToExcel(prescriptionId)}
              title="Exportar a Excel"
              className="p-2"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="small"
              shape="rounded"
              onClick={() => shareOneCustomer(prescriptionId)}
              title="Compartir"
              className="p-2"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <DeletePrescriptionModal
              showButton
              prescriptionData={prescription}
              backToPrescriptions
            />
            <EditPrescriptionModal showButton prescriptionId={prescriptionId} />
          </>
        ),
      }}
    >
      {!checkIsPrescription(prescriptionId) ? (
        <CardContainer className="sm:py-10 py-8">
          <CardTitle title="Ficha no encontrada" className="sm:p-4 p-4">
            <p>Esta ficha no existe o ha sido eliminada.</p>
          </CardTitle>
        </CardContainer>
      ) : (
        <CardContainer className="sm:py-12 py-8">
          {customer?.id && prescription?.id && (
            <DetailPrescriptionForm
              prescriptionData={prescription as Prescription}
              customerData={customer as Customer}
            />
          )}
        </CardContainer>
      )}
    </Layout>
  );
}

export default PrescriptionDetailPage;