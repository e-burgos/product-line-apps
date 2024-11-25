import { FC } from 'react';
import { useProductStore } from '../../hooks/use-product-store';
import { Input, useToastStore } from '@product-line/ui';
import { useForm } from 'react-hook-form';
import { db } from '@product-manager-app/lib/db';
import Button from 'libs/ui/src/components/button';

export type AddProductFormData = {
  title: string;
  description: string;
};

export const AddProductForm: FC = () => {
  const { setOpenCreateModal } = useProductStore();
  const { addToast } = useToastStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<AddProductFormData>();

  async function onSubmit(values: AddProductFormData) {
    try {
      await db.products.add({
        title: values.title,
        description: values.description,
      });
      reset();
      addToast({
        id: 'product-created',
        title: 'Producto creado',
        message: 'El producto se ha creado correctamente.',
        variant: 'success',
      });
    } catch {
      addToast({
        id: 'product-error',
        variant: 'destructive',
        title: 'Error',
        message: 'No se pudo crear el producto.',
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
          onClick={() => setOpenCreateModal(false)}
        >
          {'Cerrar'}
        </Button>
        <Button size="medium" shape="rounded" type="submit" disabled={!isValid}>
          {'Guardar'}
        </Button>
      </div>
    </form>
  );
};
