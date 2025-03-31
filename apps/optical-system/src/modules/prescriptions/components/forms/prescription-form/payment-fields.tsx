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

  const prescriptionPaymentData = currentPrescription?.prescriptionPayment;
  const paymentMethod = prescriptionPaymentData?.paymentMethod;
  const creditCardType = prescriptionPaymentData?.creditCardType;
  const creditCardNumber = prescriptionPaymentData?.creditCardNumber;
  const creditCardInstallments =
    prescriptionPaymentData?.creditCardInstallments;
  const creditCardDepositData = prescriptionPaymentData?.creditCardDeposit;
  const cashDepositData = prescriptionPaymentData?.cashDeposit;

  const subTotalAmount = watch('subtotalAmount') || 0;
  const cashDeposit = watch('cashDeposit') || 0;
  const creditCardDeposit = watch('creditCardDeposit') || 0;

  const handleBalanceAmount = useCallback(() => {
    const totalDeposit = Number(cashDeposit) + Number(creditCardDeposit);
    return Math.max(0, Number(subTotalAmount) - totalDeposit);
  }, [cashDeposit, creditCardDeposit, subTotalAmount]);

  const handlePaymentMethod = useCallback(() => {
    const method = paymentMethodList?.find(
      (method) => method.value === paymentMethod
    );
    if (method) {
      setPaymentMethodSelected(method);
      setValue('paymentMethod', method.value);
    }
  }, [paymentMethod, paymentMethodList, setValue]);

  const handleCreditCard = useCallback(() => {
    const card = creditCardList?.find((card) => card.value === creditCardType);
    if (card) {
      setCreditCardSelected(card);
      setValue('creditCardType', card.value);
    }
  }, [creditCardList, creditCardType, setValue]);

  const initialValues = useCallback(() => {
    handlePaymentMethod();
    handleCreditCard();
    setValue('creditCardDeposit', creditCardDepositData || 0);
    setValue('creditCardNumber', creditCardNumber || 0);
    setValue('creditCardInstallments', creditCardInstallments || 0);
    setValue('cashDeposit', cashDepositData || 0);
    setValue('creditCardDeposit', creditCardDepositData || 0);
  }, [
    cashDepositData,
    creditCardDepositData,
    creditCardInstallments,
    creditCardNumber,
    handleCreditCard,
    handlePaymentMethod,
    setValue,
  ]);

  const handleSelectPaymentMethod = useCallback(() => {
    switch (paymentMethodSelected?.value) {
      case 'Efectivo':
        setValue('creditCardDeposit', 0);
        setValue('creditCardNumber', 0);
        setValue('creditCardInstallments', 0);
        setValue('creditCardDeposit', 0);
        setValue('creditCardType', '');
        setValue('cashDeposit', cashDepositData as number);
        break;
      case 'Tarjeta de crédito':
      case 'Tarjeta de débito':
        setValue('creditCardDeposit', creditCardDepositData as number);
        setValue('creditCardNumber', creditCardNumber as number);
        setValue('creditCardInstallments', creditCardInstallments as number);
        setValue('creditCardDeposit', creditCardDepositData as number);
        setValue('creditCardType', creditCardType as string);
        setValue('cashDeposit', 0);
        break;
      case 'Efectivo + Tarjeta':
        setValue('creditCardDeposit', creditCardDepositData as number);
        setValue('creditCardNumber', creditCardNumber as number);
        setValue('creditCardInstallments', creditCardInstallments as number);
        setValue('creditCardDeposit', creditCardDepositData as number);
        setValue('creditCardType', creditCardType as string);
        setValue('cashDeposit', cashDepositData as number);
        break;
      default:
        setValue('creditCardDeposit', 0);
        setValue('creditCardNumber', 0);
        setValue('creditCardInstallments', 0);
        setValue('creditCardDeposit', 0);
        setValue('creditCardType', '');
        setValue('cashDeposit', 0);
        break;
    }
  }, [
    cashDepositData,
    creditCardDepositData,
    creditCardInstallments,
    creditCardNumber,
    creditCardType,
    paymentMethodSelected?.value,
    setValue,
  ]);

  useEffect(() => {
    initialValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleSelectPaymentMethod();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethodSelected?.value]);

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
            onChange={(e) => {
              setPaymentMethodSelected(e as ListboxOption);
              setValue('paymentMethod', (e as ListboxOption).value);
            }}
            disabled={forDetail}
          />
          {paymentMethodSelected?.value?.includes('Tarjeta') && (
            <>
              <Listbox
                className="w-full sm:w-calc-50-minus-8 mb-4"
                label="Tarjeta de crédito/débito"
                options={creditCardList}
                selectedOption={creditCardSelected}
                onChange={(e) => {
                  setCreditCardSelected(e as ListboxOption);
                  setValue('creditCardType', (e as ListboxOption).value);
                }}
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
                max={subTotalAmount}
                placeholder="Ingrese un monto"
                icon={<DollarSign className="h-4 w-4 mt-1" />}
                error={errors?.creditCardDeposit?.message}
                {...register('creditCardDeposit', {
                  pattern: {
                    value: /^[0-9]+(\.[0-9]{1,2})?$/,
                    message:
                      'El precio debe ser válido. Utilice punto o coma para max 2 decimales.',
                  },
                  validate: (value) => {
                    const total = Number(value) + Number(cashDeposit);
                    return total <= subTotalAmount || 'El pago excede el total';
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
                icon={<CreditCard className="h-4 w-4 mt-1" />}
                error={errors?.creditCardNumber?.message}
                {...register('creditCardNumber', {
                  pattern: {
                    value: /^[0-9\s]{16}$/,
                    message: 'Número de tarjeta inválido',
                  },
                })}
              />
              <Input
                disabled={forDetail}
                className="w-full sm:w-calc-50-minus-8 mb-4"
                label="Cuotas de la tarjeta"
                id="creditCardInstallments"
                placeholder='Ingrese la cantidad de cuotas. Ej: "3"'
                type="number"
                min="1"
                max="24"
                icon={<SquareDivideIcon className="h-4 w-4 mt-1" />}
                error={errors?.creditCardInstallments?.message}
                {...register('creditCardInstallments', {
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Las cuotas deben ser un número entero.',
                  },
                  min: {
                    value: 1,
                    message: 'Mínimo 1 cuota',
                  },
                  max: {
                    value: 24,
                    message: 'Máximo 24 cuotas',
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
              max={subTotalAmount}
              placeholder="Ingrese un monto"
              icon={<DollarSign className="h-4 w-4 mt-1" />}
              error={errors?.cashDeposit?.message}
              {...register('cashDeposit', {
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/,
                  message:
                    'El precio debe ser válido. Utilice punto o coma para max 2 decimales.',
                },
                validate: (value) => {
                  const total = Number(value) + Number(creditCardDeposit);
                  return total <= subTotalAmount || 'El pago excede el total';
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
            disabled={
              paymentMethodSelected?.value?.includes('Efectivo') ||
              paymentMethodSelected?.value?.includes('Tarjeta')
            }
            icon={<DollarSign className="h-4 w-4 mt-1" />}
            error={errors?.balanceAmount?.message}
            {...register('balanceAmount')}
          />
          <Input
            className="w-full sm:w-calc-50-minus-10 mb-1"
            label="Total a pagar"
            id="totalAmount"
            type="number"
            step="0.01"
            min="0"
            disabled
            icon={<DollarSign className="h-4 w-4 mt-1" />}
            error={errors?.totalAmount?.message}
            {...register('totalAmount')}
          />
        </div>
        <Textarea
          disabled={forDetail}
          className="w-full"
          label="Comentarios"
          placeholder="Ingrese un comentario, si es necesario, por ejemplo: 'Descuento por pago en efectivo'"
          {...register('description')}
        />
      </CardTitle>
    </>
  );
};

export default PaymentFields;
