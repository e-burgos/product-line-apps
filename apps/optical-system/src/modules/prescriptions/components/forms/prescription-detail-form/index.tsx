import { FC } from 'react';
import { Customer, Prescription } from '@optical-system-app/lib/db';
import PrescriptionDetailsFields from './prescription-details-fields';
import EyeSpecsDetailsFields from './eye-specs-details-fields';
import PaymentDetailsFields from './payment-details-fields';
import DetailDetailsFields from './detail-details-fields';

interface DetailPrescriptionFormProps {
  prescriptionData: Prescription;
  customerData: Customer;
}

export const DetailPrescriptionForm: FC<DetailPrescriptionFormProps> = ({
  prescriptionData,
  customerData,
}) => {
  return (
    <form noValidate className=" space-y-10">
      <PrescriptionDetailsFields
        prescriptionData={prescriptionData}
        customerData={customerData}
      />
      <EyeSpecsDetailsFields prescriptionData={prescriptionData} />
      <DetailDetailsFields prescriptionData={prescriptionData} />
      <PaymentDetailsFields prescriptionData={prescriptionData} />
    </form>
  );
};

export default DetailPrescriptionForm;
