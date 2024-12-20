import React from 'react';
import Input from 'libs/ui/src/components/forms/input';
import CardTitle from 'libs/ui/src/components/forms/card-title';
import { DollarSign } from 'lucide-react';
import { Prescription } from '@product-line/dexie';

interface DetailDetailsFieldsProps {
  prescriptionData: Prescription;
}

const DetailDetailsFields: React.FC<DetailDetailsFieldsProps> = ({
  prescriptionData,
}) => {
  return (
    <>
      <CardTitle title="Detalles del Servicio">
        <Input
          disabled
          value={prescriptionData?.doctorName}
          className="w-full mb-4"
          label="Receta realizada por"
          placeholder="Nombre del profesional"
          id="doctorName"
        />
        <div className="flex flex-row flex-wrap justify-between gap-2">
          <Input
            disabled
            value={prescriptionData?.frameDesc}
            className="w-full sm:w-calc-50-minus-8 mb-0"
            label="Armazón"
            id="frameDesc"
          />
          <Input
            disabled
            value={prescriptionData?.framePrice}
            className="w-full sm:w-calc-50-minus-8 mb-4"
            label="Monto"
            placeholder="0.00"
            id="framePrice"
            type="number"
            step="0.01"
            min="0"
            max="9999999999"
            icon={<DollarSign className="h-4 w-4 mt-1" />}
          />
          <Input
            disabled
            value={prescriptionData?.crystalDesc}
            className="w-full sm:w-calc-50-minus-8 mb-0"
            label="Cristales"
            id="crystalDesc"
          />
          <Input
            disabled
            value={prescriptionData?.crystalPrice}
            className="w-full sm:w-calc-50-minus-8 mb-4"
            label="Monto"
            placeholder="0.00"
            id="crystalPrice"
            type="number"
            step="0.01"
            min="0"
            max="9999999999"
            icon={<DollarSign className="h-4 w-4 mt-1" />}
          />

          <Input
            disabled
            value={prescriptionData?.contactlensDesc}
            className="w-full sm:w-calc-50-minus-8 mb-0"
            label="Lentes de contacto"
            id="contactlensDesc"
          />
          <Input
            disabled
            value={prescriptionData?.contactlensPrice}
            className="w-full sm:w-calc-50-minus-8 mb-4"
            label="Monto"
            placeholder="0.00"
            id="contactlensPrice"
            type="number"
            step="0.01"
            min="0"
            max="9999999999"
            icon={<DollarSign className="h-4 w-4 mt-1" />}
          />
          <Input
            disabled
            value={prescriptionData?.arrangementDesc}
            className="w-full sm:w-calc-50-minus-8 mb-0"
            label="Arreglos"
            id="arrangementDesc"
          />
          <Input
            disabled
            value={prescriptionData?.arrangementPrice}
            className="w-full sm:w-calc-50-minus-8 mb-4"
            label="Monto"
            placeholder="0.00"
            id="arrangementPrice"
            type="number"
            step="0.01"
            min="0"
            max="9999999999"
            icon={<DollarSign className="h-4 w-4 mt-1" />}
          />
          <Input
            disabled
            value={prescriptionData?.subtotalAmount}
            className="w-full mb-4"
            label="Subtotal"
            id="subtotalAmount"
            type="number"
            step="0.01"
            min="0"
            max="9999999999"
            icon={<DollarSign className="h-4 w-4 mt-1" />}
          />
        </div>
      </CardTitle>
    </>
  );
};

export default DetailDetailsFields;
