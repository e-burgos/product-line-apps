import Input from 'libs/ui/src/components/forms/input';
import React, { useEffect, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { PrescriptionFormData } from './validations';
import Listbox, { ListboxOption } from 'libs/ui/src/components/list-box';
import useCustomerData from '@optical-system-app/modules/customers/hooks/use-customer-data';
import { useCustomerStore } from '@optical-system-app/modules/customers/hooks/use-customer-store';
import { CardTitle } from '@product-line/ui';

interface PrescriptionFieldsProps {
  type: 'create' | 'update';
  register: UseFormRegister<PrescriptionFormData>;
  setValue: UseFormSetValue<PrescriptionFormData>;
  errors: FieldErrors<PrescriptionFormData>;
}

const PrescriptionFields: React.FC<PrescriptionFieldsProps> = ({
  type = 'create',
  register,
  errors,
}) => {
  const { customers, getCustomer } = useCustomerData();
  const { currentCustomer, setCurrentCustomer } = useCustomerStore();

  const [customerList, setCustomerList] = useState<ListboxOption[]>();
  const [selectedCustomer, setSelectedCustomer] = useState<ListboxOption>();

  useEffect(() => {
    if (customers) {
      const customersData = customers?.map((state) => ({
        name: `${state.name} ${state.lastName}`,
        value: state?.id?.toString() as string,
      }));
      setCustomerList(customersData);
    }
  }, [customers]);

  useEffect(() => {
    if (type === 'create' && selectedCustomer) {
      const customer = getCustomer(Number(selectedCustomer.value));
      setCurrentCustomer(customer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCustomer, type]);

  useEffect(() => {
    if (type === 'update' && currentCustomer?.id)
      setSelectedCustomer({
        name: `${currentCustomer.name} ${currentCustomer.lastName}`,
        value: currentCustomer?.id?.toString() as string,
      });
  }, [currentCustomer, type]);

  return (
    <CardTitle title="Datos de Ficha">
      <div className="flex flex-row flex-wrap justify-between gap-2">
        <Input
          className="w-full sm:w-calc-50-minus-8 mb-4"
          required
          label="Comprobante N°"
          id="receiptNumber"
          type="number"
          mask="999999"
          error={errors?.receiptNumber?.message}
          {...register('receiptNumber', {
            required: 'El numero de comprobante es obligatorio',
          })}
        />
        <Input
          className="w-full sm:w-calc-50-minus-8 mb-4"
          required
          label="Fecha"
          id="date"
          type="date"
          error={errors?.date?.message}
          {...register('date', {
            required: 'La fecha es obligatoria',
            max: {
              value: new Date().toISOString().split('T')[0],
              message: 'La fecha no puede ser mayor a la actual',
            },
            min: {
              value: '2020-01-01',
              message: 'La fecha no puede ser menor a 2020',
            },
          })}
        />
        <Listbox
          className="w-full mb-4"
          label="Seleccionar Cliente"
          options={customerList || []}
          selectedOption={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e as ListboxOption)}
        />
        {currentCustomer && (
          <>
            <Input
              className="w-full sm:w-calc-50-minus-8 mb-4"
              label="Nombre"
              disabled
              value={currentCustomer.name}
            />
            <Input
              className="w-full sm:w-calc-50-minus-8 mb-4"
              label="Apellido"
              disabled
              value={currentCustomer.lastName}
            />
            {currentCustomer.mobile && (
              <Input
                className="w-full sm:w-calc-50-minus-8 mb-4"
                label="Telefono"
                disabled
                value={currentCustomer.mobile}
              />
            )}
            {currentCustomer.email && (
              <Input
                className="w-full sm:w-calc-50-minus-8 mb-4"
                label="Email"
                disabled
                value={currentCustomer.email}
              />
            )}
            {currentCustomer.address && (
              <Input
                className="w-full sm:w-calc-50-minus-8 mb-4"
                label="Direccion"
                disabled
                value={currentCustomer.address}
              />
            )}
            {currentCustomer.province && (
              <Input
                className="w-full sm:w-calc-50-minus-8 mb-4"
                label="Provincia"
                disabled
                value={currentCustomer.province}
              />
            )}
            {currentCustomer.locality && (
              <Input
                className="w-full sm:w-calc-50-minus-8 mb-4"
                label="Localidad"
                disabled
                value={currentCustomer.locality}
              />
            )}
          </>
        )}
      </div>
    </CardTitle>
  );
};

export default PrescriptionFields;
