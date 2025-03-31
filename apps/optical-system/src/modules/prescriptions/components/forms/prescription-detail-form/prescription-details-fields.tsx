import Input from 'libs/ui/src/components/forms/input';
import React, { useEffect, useState } from 'react';
import Listbox, { ListboxOption } from 'libs/ui/src/components/list-box';
import { CardTitle } from '@product-line/ui';
import { Prescription } from '@product-line/dexie';

interface PrescriptionDetailsFieldsProps {
  prescriptionData: Prescription;
}

const PrescriptionDetailsFields: React.FC<PrescriptionDetailsFieldsProps> = ({
  prescriptionData,
}) => {
  const [selectedCustomer, setSelectedCustomer] = useState<ListboxOption>();
  const customerData = prescriptionData?.customer;

  useEffect(() => {
    if (customerData?.id)
      setSelectedCustomer({
        name: `${customerData?.name} ${customerData?.lastName}`,
        value: customerData?.id?.toString() as string,
      });
  }, [customerData]);

  return (
    <CardTitle title="Datos de Ficha">
      <div className="flex flex-row flex-wrap justify-between gap-2">
        <Input
          disabled
          value={prescriptionData?.receiptNumber}
          className="w-full sm:w-calc-50-minus-8 mb-4"
          required
          label="Comprobante N°"
          placeholder="Ingrese el número de comprobante"
          id="receiptNumber"
          type="number"
          mask="999999"
        />
        <Input
          disabled
          className="w-full sm:w-calc-50-minus-8 mb-4"
          required
          label="Fecha"
          id="date"
          type="date"
          placeholder="Seleccione la fecha"
          value={prescriptionData?.date}
        />
        {selectedCustomer && (
          <Listbox
            disabled
            className="w-full mb-4"
            label={'Cliente'}
            options={[selectedCustomer as ListboxOption]}
            selectedOption={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e as ListboxOption)}
          />
        )}
        {customerData && (
          <>
            <Input
              className="w-full sm:w-calc-50-minus-8 mb-4"
              label="Nombre"
              disabled
              value={customerData.name}
            />
            <Input
              className="w-full sm:w-calc-50-minus-8 mb-4"
              label="Apellido"
              disabled
              value={customerData.lastName}
            />
            {customerData.mobile && (
              <Input
                className="w-full sm:w-calc-50-minus-8 mb-4"
                label="Telefono"
                disabled
                value={customerData.mobile}
              />
            )}
            {customerData.email && (
              <Input
                className="w-full sm:w-calc-50-minus-8 mb-4"
                label="Email"
                disabled
                value={customerData.email}
              />
            )}
            {customerData.address && (
              <Input
                className="w-full sm:w-calc-50-minus-8 mb-4"
                label="Direccion"
                disabled
                value={customerData.address}
              />
            )}
            {customerData.province && (
              <Input
                className="w-full sm:w-calc-50-minus-8 mb-4"
                label="Provincia"
                disabled
                value={customerData.province}
              />
            )}
            {customerData.locality && (
              <Input
                className="w-full sm:w-calc-50-minus-8 mb-4"
                label="Localidad"
                disabled
                value={customerData.locality}
              />
            )}
          </>
        )}
      </div>
    </CardTitle>
  );
};

export default PrescriptionDetailsFields;
