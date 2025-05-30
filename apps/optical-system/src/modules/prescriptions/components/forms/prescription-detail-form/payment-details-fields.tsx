import Input from 'libs/ui/src/components/forms/input';
import React, { useEffect, useState } from 'react';
import Listbox, { ListboxOption } from 'libs/ui/src/components/list-box';
import usePrescriptionData from '@optical-system-app/modules/prescriptions/hooks/use-prescription-data';
import Textarea from 'libs/ui/src/components/forms/textarea';
import CardTitle from 'libs/ui/src/components/forms/card-title';
import { CreditCard, DollarSign, SquareDivideIcon } from 'lucide-react';
import { Prescription } from '@product-line/dexie';

interface PaymentDetailsFieldsProps {
  prescriptionData: Prescription;
}

const PaymentDetailsFields: React.FC<PaymentDetailsFieldsProps> = ({
  prescriptionData,
}) => {
  const { paymentMethodList, creditCardList } = usePrescriptionData();
  const [creditCardSelected, setCreditCardSelected] = useState<ListboxOption>();
  const [paymentMethodSelected, setPaymentMethodSelected] =
    useState<ListboxOption>();

  const prescriptionPaymentData = prescriptionData?.prescriptionPayment;
  const paymentMethod = prescriptionPaymentData?.paymentMethod;
  const creditCardType = prescriptionPaymentData?.creditCardType;
  const creditCardDeposit = prescriptionPaymentData?.creditCardDeposit;
  const creditCardNumber = prescriptionPaymentData?.creditCardNumber;
  const creditCardInstallments =
    prescriptionPaymentData?.creditCardInstallments;
  const cashDeposit = prescriptionPaymentData?.cashDeposit;
  const balanceAmount = prescriptionData?.balanceAmount;
  const totalAmount = prescriptionData?.totalAmount;
  const description = prescriptionData?.description;

  useEffect(() => {
    if (paymentMethod)
      setPaymentMethodSelected(
        paymentMethodList?.find((method) => method.value === paymentMethod)
      );
    if (creditCardType)
      setCreditCardSelected(
        creditCardList.find((card) => card.value === creditCardType)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prescriptionPaymentData]);

  return (
    <>
      <CardTitle title="Detalles de Pago">
        <div className="flex flex-row flex-wrap justify-between gap-2">
          <Listbox
            className="w-full mb-4"
            label="Método de pago"
            options={paymentMethodList}
            selectedOption={paymentMethodSelected}
            onChange={(e) => setPaymentMethodSelected(e as ListboxOption)}
            disabled
          />
          {paymentMethodSelected?.value?.includes('Tarjeta') && (
            <>
              <Listbox
                className="w-full sm:w-calc-50-minus-8 mb-4"
                label="Tarjeta de crédito/débito"
                options={creditCardList}
                selectedOption={creditCardSelected}
                onChange={(e) => setCreditCardSelected(e as ListboxOption)}
                disabled
              />
              <Input
                disabled
                value={creditCardDeposit}
                className="w-full sm:w-calc-50-minus-8 mb-4"
                label="Pago con tarjeta"
                id="creditCardDeposit"
                type="number"
                step="0.01"
                min="0"
                max="9999999999"
                icon={<DollarSign className="h-4 w-4 mt-1" />}
              />
              <Input
                disabled
                value={creditCardNumber}
                className="w-full sm:w-calc-50-minus-8 mb-4"
                label="Número de tarjeta"
                id="creditCardNumber"
                type="number"
                icon={<CreditCard className="h-4 w-4 mt-1" />}
              />
              <Input
                disabled
                value={creditCardInstallments}
                className="w-full sm:w-calc-50-minus-8 mb-4"
                label="Cuotas de la tarjeta"
                id="creditCardInstallments"
                type="number"
                icon={<SquareDivideIcon className="h-4 w-4 mt-1" />}
              />
            </>
          )}
        </div>
        {paymentMethodSelected?.value?.includes('Efectivo') && (
          <>
            <Input
              disabled
              value={cashDeposit}
              className="w-full mb-4"
              label="Pago en efectivo"
              id="cashDeposit"
              type="number"
              step="0.01"
              min="0"
              max="9999999999"
              icon={<DollarSign className="h-4 w-4 mt-1" />}
            />
          </>
        )}

        <div className="flex flex-row flex-wrap justify-between gap-2 my-4 border-t border-b py-6 border-gray-200 dark:border-gray-700">
          <Input
            disabled
            value={balanceAmount}
            className="w-full sm:w-calc-50-minus-10 mb-1"
            label="Saldo"
            id="balanceAmount"
            type="number"
            step="0.01"
            min="0"
            max="9999999999"
            icon={<DollarSign className="h-4 w-4 mt-1" />}
          />
          <Input
            disabled
            value={totalAmount}
            className="w-full sm:w-calc-50-minus-10 mb-1"
            label="Total a pagar"
            id="totalAmount"
            type="number"
            step="0.01"
            min="0"
            max="9999999999"
            icon={<DollarSign className="h-4 w-4 mt-1" />}
          />
        </div>
        <Textarea
          disabled
          value={description}
          className="w-full"
          label="Comentarios"
          id="description"
        />
      </CardTitle>
    </>
  );
};

export default PaymentDetailsFields;
