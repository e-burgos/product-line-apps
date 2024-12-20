import { FC, useEffect } from 'react';
import { useProductStore } from '../../hooks/use-product-store';
import { Input } from '@product-line/ui';
import { useForm } from 'react-hook-form';
import Button from 'libs/ui/src/components/button';
import { useProductMethods } from '@product-line/dexie';

export type EditProductFormData = {
  title: string;
  description: string;
};

interface EditProductFormProps {
  productId: string;
}

export const EditProductForm: FC<EditProductFormProps> = ({ productId }) => {
  const { getProductById, updateProduct } = useProductMethods();
  const { setOpenEditModal } = useProductStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<EditProductFormData>();

  useEffect(() => {
    function loadProduct() {
      const product = getProductById(productId);
      if (product) {
        reset({
          title: product.title,
          description: product.description,
        });
      }
    }
    loadProduct();
  }, [getProductById, productId, reset]);

  async function onSubmit(values: EditProductFormData) {
    const update = await updateProduct({
      id: productId,
      title: values.title,
      description: values.description,
    });
    if (update.isSuccess) {
      reset();
      setOpenEditModal(false);
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 mt-4"
    >
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
      <div className="flex justify-end gap-2 pt-4">
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
