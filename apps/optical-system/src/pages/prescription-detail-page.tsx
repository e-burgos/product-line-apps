import { ReceiptIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import CardContainer from 'libs/ui/src/components/forms/card-container';
import CardTitle from 'libs/ui/src/components/forms/card-title';
import Layout from '@optical-system-app/components/layout';
import EditPrescriptionModal from '@optical-system-app/modules/prescriptions/components/modals/edit-prescription-modal';
import DeletePrescriptionModal from '@optical-system-app/modules/prescriptions/components/modals/delete-prescription-modal';
import DetailPrescriptionForm from '@optical-system-app/modules/prescriptions/components/forms/prescription-detail-form';
import { Prescription, usePrescriptionMethods } from '@product-line/dexie';
import ShareButtons from '@optical-system-app/components/share-buttons';

function PrescriptionDetailPage() {
  const { getPrescriptionById, checkIsPrescription } = usePrescriptionMethods();

  const { id } = useParams();
  const prescriptionId = id?.toString() as string;
  const prescription = getPrescriptionById(prescriptionId);

  return (
    <Layout
      header={{
        title: 'Detalles de Ficha',
        titleIcon: <ReceiptIcon className="h-6 w-6 text-brand" />,
        headerContent: (
          <>
            {/* TODO: Add share buttons */}
            <ShareButtons />
            <DeletePrescriptionModal
              showButton
              prescriptionData={prescription as Prescription}
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
          {prescription?.id && (
            <DetailPrescriptionForm
              prescriptionData={prescription as Prescription}
            />
          )}
        </CardContainer>
      )}
    </Layout>
  );
}

export default PrescriptionDetailPage;
