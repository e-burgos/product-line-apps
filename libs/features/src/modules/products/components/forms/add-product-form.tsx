import { FC } from 'react';
import { useProductStore } from '../../hooks/use-product-store';
import { Input } from '@product-line/ui';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from 'libs/ui/src/components/button';
import { useProductMethods } from '@product-line/dexie';

export interface AddProductFormData {
  title: string;
  description: string;
}

export const AddProductForm: FC = () => {
  const { setOpenCreateModal } = useProductStore();
  const { addProduct } = useProductMethods();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<AddProductFormData>();

  const onSubmit: SubmitHandler<AddProductFormData> = async (values) => {
    const add = await addProduct({
      title: values.title,
      description: values.description,
    });
    if (add.isSuccess) {
      reset();
      setOpenCreateModal(false);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 mt-8"
    >
      <Input
        className="w-full mb-4"
        required
        label="Título"
        id="title"
        placeholder="Título del producto"
        error={errors?.title?.message}
        {...register('title', {
          required: 'El nombre es obligatorio',
          validate: (value) =>
            value.length > 2 || 'El nombre debe tener al menos 3 caracteres',
        })}
      />
      <Input
        className="w-full mb-4"
        label="Descripción"
        id="description"
        placeholder="Descripción del producto"
        error={errors?.description?.message}
        {...register('description', {})}
      />
      <div className="flex justify-end gap-2 pt-4">
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
