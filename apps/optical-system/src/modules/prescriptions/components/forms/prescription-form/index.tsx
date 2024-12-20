import React, { useState, useEffect, FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import PrescriptionFields from './prescription-fields';
import EyeSpecsFields from './eye-specs-fields';
import DetailFields from './detail-fields';
import PaymentFields from './payment-fields';
import PrescriptionButtons from './prescription-buttons';
import { PrescriptionFormData } from './validations';
import { useCustomerStore } from '@optical-system-app/modules/customers/hooks/use-customer-store';
import { usePrescriptionStore } from '@optical-system-app/modules/prescriptions/hooks/use-prescription-store';
import {
  Customer,
  Prescription,
  usePrescriptionMethods,
} from '@product-line/dexie';

interface PrescriptionFormProps {
  type?: 'create' | 'update';
  prescriptionData?: Prescription;
  customerData?: Customer;
}

export const PrescriptionForm: FC<PrescriptionFormProps> = ({
  type = 'create',
  prescriptionData,
  customerData,
}) => {
  const { addPrescription, updatePrescription } = usePrescriptionMethods();
  const { currentCustomer, setCurrentCustomer } = useCustomerStore();
  const { setOpenCreateModal, setOpenEditModal, setCurrentPrescription } =
    usePrescriptionStore();
  const {
    handleSubmit,
    register,
    reset,
    watch,
    trigger,
    setValue,
    formState: { isValid, errors },
  } = useForm<PrescriptionFormData>();

  useEffect(() => {
    if (customerData) setCurrentCustomer(customerData);
    if (prescriptionData) {
      Object.entries(prescriptionData).forEach(([key, value]) => {
        setValue(key as keyof PrescriptionFormData, value);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === 'change') {
        trigger(name);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  const [selectedTab, setSelectedTab] = useState(0);

  const onSubmit: SubmitHandler<PrescriptionFormData> = async (data) => {
    if (type === 'create') {
      const add = await addPrescription({
        ...data,
        framePrice: Number(data.framePrice),
        crystalPrice: Number(data.crystalPrice),
        contactlensPrice: Number(data.contactlensPrice),
        arrangementPrice: Number(data.arrangementPrice),
        subtotalAmount: Number(data.subtotalAmount),
        cashDeposit: Number(data.cashDeposit),
        creditCardDeposit: Number(data.creditCardDeposit),
        balanceAmount: Number(data.balanceAmount),
        totalAmount: Number(data.totalAmount),
        customerId: currentCustomer?.id as string,
      });
      if (add.isSuccess) {
        reset();
        setCurrentCustomer(null);
        setCurrentPrescription(null);
        setOpenCreateModal(false);
      }
    }
    if (type === 'update') {
      const update = await updatePrescription({
        ...data,
        framePrice: Number(data.framePrice),
        crystalPrice: Number(data.crystalPrice),
        contactlensPrice: Number(data.contactlensPrice),
        arrangementPrice: Number(data.arrangementPrice),
        subtotalAmount: Number(data.subtotalAmount),
        cashDeposit: Number(data.cashDeposit),
        creditCardDeposit: Number(data.creditCardDeposit),
        balanceAmount: Number(data.balanceAmount),
        totalAmount: Number(data.totalAmount),
        customerId: currentCustomer?.id as string,
        id: prescriptionData?.id as string,
      });
      if (update.isSuccess) {
        reset();
        setCurrentCustomer(null);
        setCurrentPrescription(null);
        setOpenEditModal(false);
      }
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: selectedTab === 0 ? 'block' : 'none' }}>
        <PrescriptionFields
          type={type}
          setValue={setValue}
          register={register}
          errors={errors}
          customerData={customerData}
        />
      </div>
      <div style={{ display: selectedTab === 1 ? 'block' : 'none' }}>
        <EyeSpecsFields register={register} errors={errors} />
      </div>
      <div style={{ display: selectedTab === 2 ? 'block' : 'none' }}>
        <DetailFields
          register={register}
          watch={watch}
          setValue={setValue}
          errors={errors}
        />
      </div>
      <div style={{ display: selectedTab === 3 ? 'block' : 'none' }}>
        <PaymentFields
          setValue={setValue}
          watch={watch}
          register={register}
          errors={errors}
        />
      </div>
      <PrescriptionButtons
        type={type}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        reset={reset}
        isValid={isValid}
        errors={errors}
        watch={watch}
      />
    </form>
  );
};

export default PrescriptionForm;
