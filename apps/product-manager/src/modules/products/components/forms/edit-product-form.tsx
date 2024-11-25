import { FC, useEffect } from 'react';
import { useProductStore } from '../../hooks/use-product-store';
import { Input, useToastStore } from '@product-line/ui';
import { useForm } from 'react-hook-form';
import { db } from '@product-manager-app/lib/db';
import Button from 'libs/ui/src/components/button';

export type EditProductFormData = {
  title: string;
  description: string;
};

interface EditProductFormProps {
  productId: number;
}

export const EditProductForm: FC<EditProductFormProps> = ({ productId }) => {
  const { setOpenEditModal } = useProductStore();
  const { addToast } = useToastStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<EditProductFormData>();

  useEffect(() => {
    async function loadProduct() {
      const product = await db.products.get(productId);
      if (product) {
        reset({
          title: product.title,
          description: product.description,
        });
      }
    }
    loadProduct();
  }, [productId, reset]);

  async function onSubmit(values: EditProductFormData) {
    try {
      await db.products.update(productId, {
        title: values.title,
        description: values.description,
      });
      addToast({
        id: 'product-udpated',
        title: 'Producto creado',
        message: 'El producto se actualizó correctamente.',
        variant: 'success',
      });
      setOpenEditModal(false);
    } catch {
      addToast({
        id: 'product-error',
        variant: 'destructive',
        title: 'Error',
        message: 'No se pudo actualizar el producto.',
      });
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
      <div className="flex justify-end gap-2 mt-6">
        <Button
          size="medium"
          shape="rounded"
          variant="ghost"
          onClick={() => setOpenEditModal(false)}
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
