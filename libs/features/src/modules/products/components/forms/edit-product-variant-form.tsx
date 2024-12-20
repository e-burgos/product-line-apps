import { FC, useEffect, useState } from 'react';
import { useProductStore } from '../../hooks/use-product-store';
import { useForm } from 'react-hook-form';
import { Input } from 'libs/ui/src/components';
import Button from 'libs/ui/src/components/button';
import { useProductMethods, Variant } from '@product-line/dexie';
import { DollarSign } from 'lucide-react';

export type EditProductVariantFormData = {
  productId: string;
  title: string;
  description: string;
  amount: string;
};

interface EditProductVariantFormProps {
  variantId: string;
}

export const EditProductVariantForm: FC<EditProductVariantFormProps> = ({
  variantId,
}) => {
  const { getProductVariantById, updateProductVariant } = useProductMethods();
  const { setOpenEditVariantModal } = useProductStore();
  const [variant, setVariant] = useState<Variant>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<EditProductVariantFormData>();

  console.log(errors);

  useEffect(() => {
    function loadVariant() {
      const variant = getProductVariantById(variantId);
      if (variant) {
        setVariant(variant);
        reset({
          productId: variant.productId.toString(),
          title: variant.title,
          description: variant.description,
          amount: variant.amount.toString(),
        });
      }
    }
    loadVariant();
  }, [getProductVariantById, reset, variantId]);

  async function onSubmit(values: EditProductVariantFormData) {
    const update = await updateProductVariant({
      id: variantId,
      productId: variant?.productId as string,
      title: values.title,
      description: values.description,
      amount: parseFloat(values.amount),
    });
    if (update.isSuccess) {
      reset();
      setOpenEditVariantModal(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        className="w-full mb-4"
        required
        label="Título"
        id="title"
        placeholder='Ejemplo: "Talle M", "Color Azul"'
        error={errors?.title?.message}
        {...register('title', {
          required: 'El título es obligatorio',
          validate: (value) =>
            value.length > 3 || 'El título debe tener al menos 3 caracteres',
        })}
      />
      <Input
        className="w-full mb-4"
        label="Descripción"
        id="description"
        placeholder='Ejemplo: "Descripción del talle M"'
        error={errors?.description?.message}
        {...register('description', {})}
      />
      <Input
        className="w-full mb-4"
        required
        placeholder="0.00"
        label="Precio"
        id="amount"
        type="number"
        step="0.01"
        min="0"
        max="9999999999"
        icon={<DollarSign className="h-4 w-4 mt-1" />}
        error={errors?.amount?.message}
        {...register('amount', {
          required: 'El precio es obligatorio',
          validate: (value) =>
            Number(value) > 0 || 'El monto debe ser mayor a 0',
          pattern: {
            value: /^[0-9]+(\.[0-9]{1,2})?$/,
            message:
              'El precio debe ser válido. Utilice punto o como para max 2 decimales.',
          },
        })}
      />

      <div className="flex justify-end gap-2">
        <Button
          size="medium"
          shape="rounded"
          variant="ghost"
          onClick={() => setOpenEditVariantModal(false)}
        >
          {'Cerrar'}
        </Button>
        <Button size="medium" shape="rounded" type="submit" disabled={!isValid}>
          {'Actualizar'}
        </Button>
      </div>
    </form>
  );
};
