import { FC, useEffect, useState } from 'react';
import { useProductStore } from '../../hooks/use-product-store';
import { db, Variant } from 'libs/features/src/data/product-db';
import { useToastStore } from 'libs/ui/src/hooks/use-toast-store';
import { useForm } from 'react-hook-form';
import { Input } from 'libs/ui/src/components';
import Button from 'libs/ui/src/components/button';

export type EditProductVariantFormData = {
  productId: string;
  title: string;
  description: string;
  amount: string;
};

interface EditProductVariantFormProps {
  variantId: number;
}

export const EditProductVariantForm: FC<EditProductVariantFormProps> = ({
  variantId,
}) => {
  const { setOpenEditVariantModal } = useProductStore();
  const [variant, setVariant] = useState<Variant>();

  const { addToast } = useToastStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<EditProductVariantFormData>();

  useEffect(() => {
    async function loadVariant() {
      const variant = await db.variants.get(variantId);
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
  }, [reset, variantId]);

  async function onSubmit(values: EditProductVariantFormData) {
    try {
      await db.variants.update(variantId, {
        productId: variant?.productId,
        id: variantId,
        title: values.title,
        description: values.description,
        amount: parseFloat(values.amount),
      });
      addToast({
        id: 'variant-updated',
        title: 'Variante actualizada',
        message: 'La variante se ha actualizado correctamente.',
        variant: 'success',
      });
      setOpenEditVariantModal(false);
    } catch {
      addToast({
        id: 'variant-error',
        title: 'Error',
        message: 'Hubo un error al actualizar la variante.',
        variant: 'destructive',
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        className="w-full mb-4"
        required
        label="Título"
        id="title"
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
        error={errors?.description?.message}
        {...register('description', {
          required: 'La descripción es obligatoria',
        })}
      />
      <Input
        className="w-full mb-4"
        required
        label="Precio"
        id="amount"
        inputMode="decimal"
        error={errors?.amount?.message}
        {...register('amount', {
          required: 'El precio es obligatorio',
          validate: (value) =>
            Number(value) > 0 || 'El monto debe ser mayor a 0',
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
