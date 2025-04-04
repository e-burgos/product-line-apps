import Input from 'libs/ui/src/components/forms/input';
import React, { useCallback, useEffect } from 'react';
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { PrescriptionFormData } from './validations';
import CardTitle from 'libs/ui/src/components/forms/card-title';
import { DollarSign } from 'lucide-react';

interface DetailFieldsProps {
  register: UseFormRegister<PrescriptionFormData>;
  setValue: UseFormSetValue<PrescriptionFormData>;
  watch: UseFormWatch<PrescriptionFormData>;
  errors?: FieldErrors<PrescriptionFormData>;
  forDetail?: boolean;
}

const DetailFields: React.FC<DetailFieldsProps> = ({
  register,
  watch,
  setValue,
  errors,
  forDetail = false,
}) => {
  const framePrice = watch('framePrice') || 0;
  const crystalPrice = watch('crystalPrice') || 0;
  const contactLensPrice = watch('contactLensPrice') || 0;
  const arrangementPrice = watch('arrangementPrice') || 0;

  const handleSubtotalAmount = useCallback(() => {
    return (
      Number(framePrice) +
      Number(crystalPrice) +
      Number(contactLensPrice) +
      Number(arrangementPrice)
    );
  }, [framePrice, crystalPrice, contactLensPrice, arrangementPrice]);

  useEffect(() => {
    setValue('subtotalAmount', handleSubtotalAmount());
  }, [handleSubtotalAmount, setValue]);

  return (
    <>
      <CardTitle title="Detalles del Servicio">
        <Input
          disabled={forDetail}
          className="w-full mb-4"
          label="Receta realizada por"
          placeholder="Nombre del profesional"
          id="doctorName"
          error={errors?.doctorName?.message}
          {...register('doctorName')}
        />
        <div className="flex flex-row flex-wrap justify-between gap-2">
          <Input
            disabled={forDetail}
            className="w-full sm:w-calc-50-minus-8 mb-0"
            label="Armazón"
            placeholder='Ejemplo: "Armazón de acetato"'
            id="frameDesc"
            {...register('frameDesc')}
          />
          <Input
            disabled={forDetail}
            className="w-full sm:w-calc-50-minus-8 mb-4"
            label="Monto"
            placeholder="0.00"
            id="framePrice"
            type="number"
            step="0.01"
            min="0"
            max="9999999999"
            icon={<DollarSign className="h-4 w-4 mt-1" />}
            error={errors?.framePrice?.message}
            {...register('framePrice', {
              pattern: {
                value: /^[0-9]+(\.[0-9]{1,2})?$/,
                message:
                  'El precio debe ser válido. Utilice punto o como para max 2 decimales.',
              },
            })}
          />
          <Input
            disabled={forDetail}
            className="w-full sm:w-calc-50-minus-8 mb-0"
            label="Cristales"
            placeholder='Ejemplo: "Cristales antirreflejo"'
            id="crystalDesc"
            {...register('crystalDesc')}
          />
          <Input
            disabled={forDetail}
            className="w-full sm:w-calc-50-minus-8 mb-4"
            label="Monto"
            placeholder="0.00"
            id="crystalPrice"
            type="number"
            step="0.01"
            min="0"
            max="9999999999"
            icon={<DollarSign className="h-4 w-4 mt-1" />}
            error={errors?.crystalPrice?.message}
            {...register('crystalPrice', {
              pattern: {
                value: /^[0-9]+(\.[0-9]{1,2})?$/,
                message:
                  'El precio debe ser válido. Utilice punto o como para max 2 decimales.',
              },
            })}
          />
          <Input
            disabled={forDetail}
            className="w-full sm:w-calc-50-minus-8 mb-0"
            label="Lentes de contacto"
            placeholder='Ejemplo: "Lentes de contacto blandos"'
            id="contactLensDesc"
            {...register('contactLensDesc')}
          />
          <Input
            disabled={forDetail}
            className="w-full sm:w-calc-50-minus-8 mb-4"
            label="Monto"
            placeholder="0.00"
            id="contactLensPrice"
            type="number"
            step="0.01"
            min="0"
            max="9999999999"
            icon={<DollarSign className="h-4 w-4 mt-1" />}
            error={errors?.contactLensPrice?.message}
            {...register('contactLensPrice', {
              pattern: {
                value: /^[0-9]+(\.[0-9]{1,2})?$/,
                message:
                  'El precio debe ser válido. Utilice punto o como para max 2 decimales.',
              },
            })}
          />
          <Input
            disabled={forDetail}
            className="w-full sm:w-calc-50-minus-8 mb-0"
            label="Arreglos"
            placeholder='Ejemplo: "Ajuste de armazón"'
            id="arrangementDesc"
            {...register('arrangementDesc')}
          />
          <Input
            disabled={forDetail}
            className="w-full sm:w-calc-50-minus-8 mb-4"
            label="Monto"
            placeholder="0.00"
            id="arrangementPrice"
            type="number"
            step="0.01"
            min="0"
            max="9999999999"
            icon={<DollarSign className="h-4 w-4 mt-1" />}
            error={errors?.arrangementPrice?.message}
            {...register('arrangementPrice', {
              pattern: {
                value: /^[0-9]+(\.[0-9]{1,2})?$/,
                message:
                  'El precio debe ser válido. Utilice punto o como para max 2 decimales.',
              },
            })}
          />
          <Input
            className="w-full mb-4"
            label="Subtotal"
            id="subtotalAmount"
            type="number"
            step="0.01"
            min="0"
            max="9999999999"
            disabled
            icon={<DollarSign className="h-4 w-4 mt-1" />}
            error={errors?.subtotalAmount?.message}
            {...register('subtotalAmount', {
              pattern: {
                value: /^[0-9]+(\.[0-9]{1,2})?$/,
                message:
                  'El precio debe ser válido. Utilice punto o como para max 2 decimales.',
              },
            })}
          />
        </div>
      </CardTitle>
    </>
  );
};

export default DetailFields;
