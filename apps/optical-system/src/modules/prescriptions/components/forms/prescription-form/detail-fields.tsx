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
}

const DetailFields: React.FC<DetailFieldsProps> = ({
  register,
  watch,
  setValue,
  errors,
}) => {
  const framePrice = watch('framePrice') || 0;
  const crystalPrice = watch('crystalPrice') || 0;
  const contactlensPrice = watch('contactlensPrice') || 0;
  const arrangementPrice = watch('arrangementPrice') || 0;

  const handleSubtotalAmount = useCallback(() => {
    return (
      Number(framePrice) +
      Number(crystalPrice) +
      Number(contactlensPrice) +
      Number(arrangementPrice)
    );
  }, [framePrice, crystalPrice, contactlensPrice, arrangementPrice]);

  useEffect(() => {
    setValue('subtotalAmount', handleSubtotalAmount());
  }, [handleSubtotalAmount, setValue]);

  return (
    <>
      <CardTitle title="Detalles del Servicio">
        <Input
          className="w-full mb-4"
          label="Nombre del doctor (Receta)"
          id="doctorName"
          error={errors?.doctorName?.message}
          {...register('doctorName')}
        />
        <div className="flex flex-row flex-wrap justify-between gap-2">
          <Input
            className="w-full sm:w-calc-50-minus-8 mb-0"
            label="Armazón"
            id="frameDesc"
            {...register('frameDesc')}
          />
          <Input
            className="w-full sm:w-calc-50-minus-8 mb-4"
            label="Monto"
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
            className="w-full sm:w-calc-50-minus-8 mb-0"
            label="Cristales"
            id="crystalDesc"
            {...register('crystalDesc')}
          />
          <Input
            className="w-full sm:w-calc-50-minus-8 mb-4"
            label="Monto"
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
            className="w-full sm:w-calc-50-minus-8 mb-0"
            label="Lentes de contacto"
            id="contactlensDesc"
            {...register('contactlensDesc')}
          />
          <Input
            className="w-full sm:w-calc-50-minus-8 mb-4"
            label="Monto"
            id="contactlensPrice"
            type="number"
            step="0.01"
            min="0"
            max="9999999999"
            icon={<DollarSign className="h-4 w-4 mt-1" />}
            error={errors?.contactlensPrice?.message}
            {...register('contactlensPrice', {
              pattern: {
                value: /^[0-9]+(\.[0-9]{1,2})?$/,
                message:
                  'El precio debe ser válido. Utilice punto o como para max 2 decimales.',
              },
            })}
          />
          <Input
            className="w-full sm:w-calc-50-minus-8 mb-0"
            label="Arreglos"
            id="arrangementDesc"
            {...register('arrangementDesc')}
          />
          <Input
            className="w-full sm:w-calc-50-minus-8 mb-4"
            label="Monto"
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
