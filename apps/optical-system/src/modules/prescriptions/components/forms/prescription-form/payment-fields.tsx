import Input from 'libs/ui/src/components/forms/input';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { PrescriptionFormData } from './validations';
import Listbox, { ListboxOption } from 'libs/ui/src/components/list-box';
import usePrescriptionData from '@optical-system-app/modules/prescriptions/hooks/use-prescription-data';
import Textarea from 'libs/ui/src/components/forms/textarea';
import CardTitle from 'libs/ui/src/components/forms/card-title';
import { CreditCard, DollarSign, SquareDivideIcon } from 'lucide-react';
import { usePrescriptionStore } from '@optical-system-app/modules/prescriptions/hooks/use-prescription-store';

interface PaymentFieldsProps {
  register: UseFormRegister<PrescriptionFormData>;
  setValue: UseFormSetValue<PrescriptionFormData>;
  watch: UseFormWatch<PrescriptionFormData>;
  errors?: FieldErrors<PrescriptionFormData>;
  forDetail?: boolean;
}

const PaymentFields: React.FC<PaymentFieldsProps> = ({
  register,
  setValue,
  watch,
  errors,
  forDetail = false,
}) => {
  const { currentPrescription } = usePrescriptionStore();
  const { paymentMethodList, creditCardList } = usePrescriptionData();
  const [creditCardSelected, setCreditCardSelected] = useState<ListboxOption>();
  const [paymentMethodSelected, setPaymentMethodSelected] =
    useState<ListboxOption>();

  useEffect(() => {
    if (currentPrescription?.paymentMethod)
      setPaymentMethodSelected(
        paymentMethodList.find(
          (method) => method.value === currentPrescription.paymentMethod
        )
      );
    if (currentPrescription?.creditCardType)
      setCreditCardSelected(
        creditCardList.find(
          (card) => card.value === currentPrescription.creditCardType
        )
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subTotalAmount = watch('subtotalAmount') || 0;
  const cashDeposit = watch('cashDeposit') || 0;
  const creditCardDeposit = watch('creditCardDeposit') || 0;

  const handleBalanceAmount = useCallback(() => {
    if (
      paymentMethodSelected?.value?.includes('Efectivo') &&
      !creditCardDeposit
    ) {
      return Number(subTotalAmount) - Number(cashDeposit);
    }
    if (paymentMethodSelected?.value?.includes('Tarjeta') && !cashDeposit) {
      return Number(subTotalAmount) - Number(creditCardDeposit);
    }
    if (paymentMethodSelected?.value?.includes('Efectivo + Tarjeta')) {
      return (
        Number(subTotalAmount) - Number(cashDeposit) - Number(creditCardDeposit)
      );
    }
    return 0;
  }, [
    cashDeposit,
    creditCardDeposit,
    paymentMethodSelected?.value,
    subTotalAmount,
  ]);

  const handleSelectPaymentMethod = useCallback(() => {
    if (paymentMethodSelected?.value === 'Efectivo') {
      setValue('creditCardDeposit', 0);
    }
    if (
      paymentMethodSelected?.value === 'Tarjeta de crédito' ||
      paymentMethodSelected?.value === 'Tarjeta de débito'
    ) {
      setValue('cashDeposit', 0);
    }
    if (paymentMethodSelected?.value === 'Efectivo + Tarjeta') {
      setValue('creditCardDeposit', 0);
      setValue('cashDeposit', 0);
    }
  }, [paymentMethodSelected?.value, setValue]);

  useEffect(() => {
    handleSelectPaymentMethod();
  }, [handleSelectPaymentMethod]);

  useEffect(() => {
    setValue('balanceAmount', handleBalanceAmount());
    setValue('totalAmount', subTotalAmount);
  }, [handleBalanceAmount, setValue, subTotalAmount]);

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
            onSelect={(e) => setValue('paymentMethod', e)}
            disabled={forDetail}
          />
          {paymentMethodSelected?.value?.includes('Tarjeta') && (
            <>
              <Listbox
                className="w-full sm:w-calc-50-minus-8 mb-4"
                label="Tarjeta de crédito/débito"
                options={creditCardList}
                selectedOption={creditCardSelected}
                onChange={(e) => setCreditCardSelected(e as ListboxOption)}
                onSelect={(e) => setValue('creditCardType', e)}
                disabled={forDetail}
              />
              <Input
                disabled={forDetail}
                className="w-full sm:w-calc-50-minus-8 mb-4"
                label="Pago con tarjeta"
                id="creditCardDeposit"
                type="number"
                step="0.01"
                min="0"
                max="9999999999"
                placeholder="Ingrese un monto"
                icon={<DollarSign className="h-4 w-4 mt-1" />}
                error={errors?.creditCardDeposit?.message}
                {...register('creditCardDeposit', {
                  pattern: {
                    value: /^[0-9]+(\.[0-9]{1,2})?$/,
                    message:
                      'El precio debe ser válido. Utilice punto o como para max 2 decimales.',
                  },
                })}
              />
              <Input
                disabled={forDetail}
                className="w-full sm:w-calc-50-minus-8 mb-4"
                label="Número de tarjeta"
                placeholder="Ingrese el número de tarjeta"
                id="creditCardNumber"
                type="number"
                mask="9999 9999 9999 9999"
                icon={<CreditCard className="h-4 w-4 mt-1" />}
                error={errors?.creditCardNumber?.message}
                {...register('creditCardNumber')}
              />
              <Input
                disabled={forDetail}
                className="w-full sm:w-calc-50-minus-8 mb-4"
                label="Cuotas de la tarjeta"
                id="creditCardInstallments"
                placeholder='Ingrese la cantidad de cuotas. Ej: "3"'
                type="number"
                icon={<SquareDivideIcon className="h-4 w-4 mt-1" />}
                error={errors?.creditCardInstallments?.message}
                {...register('creditCardInstallments', {
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Las cuotas deben ser un número entero.',
                  },
                })}
              />
            </>
          )}
        </div>
        {paymentMethodSelected?.value?.includes('Efectivo') && (
          <>
            <Input
              disabled={forDetail}
              className="w-full mb-4"
              label="Pago en efectivo"
              id="cashDeposit"
              type="number"
              step="0.01"
              min="0"
              max="9999999999"
              icon={<DollarSign className="h-4 w-4 mt-1" />}
              error={errors?.cashDeposit?.message}
              {...register('cashDeposit', {
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/,
                  message:
                    'El precio debe ser válido. Utilice punto o como para max 2 decimales.',
                },
              })}
            />
          </>
        )}

        <div className="flex flex-row flex-wrap justify-between gap-2 my-4 border-t border-b py-6 border-gray-200 dark:border-gray-700">
          <Input
            className="w-full sm:w-calc-50-minus-10 mb-1"
            label="Saldo"
            id="balanceAmount"
            type="number"
            step="0.01"
            min="0"
            max="9999999999"
            disabled
            icon={<DollarSign className="h-4 w-4 mt-1" />}
            error={errors?.balanceAmount?.message}
            {...register('balanceAmount', {
              pattern: {
                value: /^[0-9]+(\.[0-9]{1,2})?$/,
                message:
                  'El precio debe ser válido. Utilice punto o como para max 2 decimales.',
              },
            })}
          />
          <Input
            className="w-full sm:w-calc-50-minus-10 mb-1"
            label="Total a pagar"
            id="totalAmount"
            type="number"
            step="0.01"
            min="0"
            max="9999999999"
            disabled
            icon={<DollarSign className="h-4 w-4 mt-1" />}
            error={errors?.totalAmount?.message}
            {...register('totalAmount', {
              pattern: {
                value: /^[0-9]+(\.[0-9]{1,2})?$/,
                message:
                  'El precio debe ser válido. Utilice punto o como para max 2 decimales.',
              },
            })}
          />
        </div>
        <Textarea
          disabled={forDetail}
          className="w-full"
          label="Comentarios"
          placeholder="Ingrese un comentario, si es necesario, por ejemplo: 'Descuento por pago en efectivo'"
          id="description"
          {...register('description')}
        />
      </CardTitle>
    </>
  );
};

export default PaymentFields;
