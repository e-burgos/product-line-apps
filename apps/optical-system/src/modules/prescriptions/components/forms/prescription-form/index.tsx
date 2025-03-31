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

const convertToNumber = (value: string | number | undefined): number => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return Number(value) || 0;
  return 0;
};

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
      if (prescriptionData?.crystalSpecs) {
        Object.entries(prescriptionData.crystalSpecs).forEach(
          ([key, value]) => {
            if (key !== 'prescriptionId') {
              setValue(key as keyof PrescriptionFormData, value as string);
            }
          }
        );
      }
      if (prescriptionData?.prescriptionPayment) {
        Object.entries(prescriptionData.prescriptionPayment).forEach(
          ([key, value]) => {
            setValue(key as keyof PrescriptionFormData, value as string);
          }
        );
      }
      if (prescriptionData?.prescriptionDetail) {
        Object.entries(prescriptionData.prescriptionDetail).forEach(
          ([key, value]) => {
            setValue(key as keyof PrescriptionFormData, value as string);
          }
        );
      }
    }
  }, [customerData, prescriptionData, setCurrentCustomer, setValue]);

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
    const crystalSpecsData = {
      nearRightSphere: data.nearRightSphere,
      nearRightCylinder: data.nearRightCylinder,
      nearRightAxis: data.nearRightAxis,
      nearLeftSphere: data.nearLeftSphere,
      nearLeftCylinder: data.nearLeftCylinder,
      nearLeftAxis: data.nearLeftAxis,
      farRightSphere: data.farRightSphere,
      farRightCylinder: data.farRightCylinder,
      farRightAxis: data.farRightAxis,
      farLeftSphere: data.farLeftSphere,
      farLeftCylinder: data.farLeftCylinder,
      farLeftAxis: data.farLeftAxis,
    };

    const prescriptionPaymentData = {
      paymentMethod: data.paymentMethod,
      cashDeposit: convertToNumber(data.cashDeposit),
      creditCardDeposit: convertToNumber(data.creditCardDeposit),
      creditCardType: data.creditCardType,
      creditCardNumber: convertToNumber(data.creditCardNumber),
      creditCardInstallments: convertToNumber(data.creditCardInstallments),
    };

    const prescriptionDetailData = {
      doctorName: data.doctorName,
      frameDesc: data.frameDesc,
      framePrice: convertToNumber(data.framePrice),
      crystalDesc: data.crystalDesc,
      crystalPrice: convertToNumber(data.crystalPrice),
      contactLensDesc: data.contactLensDesc,
      contactLensPrice: convertToNumber(data.contactLensPrice),
      arrangementDesc: data.arrangementDesc,
      arrangementPrice: convertToNumber(data.arrangementPrice),
      subtotalAmount: convertToNumber(data.subtotalAmount),
      products: [],
    };

    const prescription = {
      receiptNumber: convertToNumber(data.receiptNumber),
      date: data.date,
      description: data.description,
      balanceAmount: convertToNumber(data.balanceAmount),
      totalAmount: convertToNumber(data.totalAmount),
      customer: currentCustomer,
      crystalSpecs: crystalSpecsData,
      prescriptionPayment: prescriptionPaymentData,
      prescriptionDetail: prescriptionDetailData,
    } as Prescription;

    if (type === 'create') {
      const add = await addPrescription(prescription);
      if (add.isSuccess) {
        reset();
        setCurrentCustomer(null);
        setCurrentPrescription(null);
        setOpenCreateModal(false);
      }
    }
    if (type === 'update' && prescriptionData?.id) {
      const update = await updatePrescription({
        ...prescription,
        id: prescriptionData.id,
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
