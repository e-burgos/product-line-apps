import Input from 'libs/ui/src/components/forms/input';
import React from 'react';
import CardTitle from 'libs/ui/src/components/forms/card-title';
import InputLabel from 'libs/ui/src/components/input-label';
import { Prescription } from '@optical-system-app/lib/db';

interface EyeSpecsDetailsFieldsProps {
  prescriptionData: Prescription;
}

const EyeSpecsDetailsFields: React.FC<EyeSpecsDetailsFieldsProps> = ({
  prescriptionData,
}) => {
  return (
    <>
      <CardTitle title="Lejos">
        <div>
          <InputLabel title="Ojo Derecho" className="mb-0" />
          <div className="flex flex-row flex-wrap justify-between gap-2">
            <Input
              disabled
              value={prescriptionData?.farRightSphere}
              className="w-full sm:w-calc-33-minus-4 mb-1"
              id="farRightSphere"
              type="decimal"
              pattern="^[-+]?[0-9]*\.?[0-9]+$"
            />
            <Input
              disabled
              value={prescriptionData?.farRightCylinder}
              className="w-full sm:w-calc-33-minus-4 mb-1"
              id="farRightCylinder"
              type="decimal"
            />
            <Input
              disabled
              value={prescriptionData?.farRightAxis}
              className="w-full sm:w-calc-33-minus-4 mb-1"
              id="farRightAxis"
              type="number"
            />
          </div>
        </div>
        <div>
          <InputLabel title="Ojo Izquierdo" className="mb-0 mt-4" />
          <div className="flex flex-row flex-wrap justify-between gap-2">
            <Input
              disabled
              value={prescriptionData?.farLeftSphere}
              className="w-full sm:w-calc-33-minus-4 mb-1"
              id="farLeftSphere"
              type="decimal"
            />
            <Input
              disabled
              value={prescriptionData?.farLeftCylinder}
              className="w-full sm:w-calc-33-minus-4 mb-1"
              id="farLeftCylinder"
              type="decimal"
            />
            <Input
              disabled
              value={prescriptionData?.farLeftAxis}
              className="w-full sm:w-calc-33-minus-4 mb-1"
              id="farLeftAxis"
              type="number"
            />
          </div>
        </div>
      </CardTitle>
      <CardTitle title="Cerca" className="mt-8">
        <div>
          <InputLabel title="Ojo Derecho" className="mb-0" />
          <div className="flex flex-row flex-wrap justify-between gap-2">
            <Input
              disabled
              value={prescriptionData?.nearRightSphere}
              className="w-full sm:w-calc-33-minus-4 mb-1"
              id="nearRightSphere"
              type="decimal"
              pattern="^[-+]?[0-9]*\.?[0-9]+$"
            />
            <Input
              disabled
              value={prescriptionData?.nearRightCylinder}
              className="w-full sm:w-calc-33-minus-4 mb-1"
              id="nearRightCylinder"
              type="decimal"
            />
            <Input
              disabled
              value={prescriptionData?.nearRightAxis}
              className="w-full sm:w-calc-33-minus-4 mb-1"
              id="nearRightAxis"
              type="number"
            />
          </div>
        </div>
        <div>
          <InputLabel title="Ojo Izquierdo" className="mb-0 mt-4" />
          <div className="flex flex-row flex-wrap justify-between gap-2">
            <Input
              disabled
              value={prescriptionData?.nearLeftSphere}
              className="w-full sm:w-calc-33-minus-4 mb-1"
              id="nearLeftSphere"
              type="decimal"
            />
            <Input
              disabled
              value={prescriptionData?.nearLeftCylinder}
              className="w-full sm:w-calc-33-minus-4 mb-1"
              id="nearLeftCylinder"
              type="decimal"
            />
            <Input
              disabled
              value={prescriptionData?.nearLeftAxis}
              className="w-full sm:w-calc-33-minus-4 mb-1"
              id="nearLeftAxis"
              type="number"
            />
          </div>
        </div>
      </CardTitle>
    </>
  );
};

export default EyeSpecsDetailsFields;
