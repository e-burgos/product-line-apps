import { FC, useEffect } from 'react';
import { useProductStore } from '../../hooks/use-product-store';
import { Input } from '@product-line/ui';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from 'libs/ui/src/components/button';
import { useProductMethods } from '@product-line/dexie';
import { AddCategoryFormData } from './validations';

export const AddCategoryForm: FC = () => {
  const { setOpenCreateCategoryModal } = useProductStore();
  const { addCategory } = useProductMethods();
  const {
    handleSubmit,
    register,
    reset,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<AddCategoryFormData>();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === 'change') {
        trigger(name);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  const onSubmit: SubmitHandler<AddCategoryFormData> = async (values) => {
    const add = await addCategory({
      title: values.title,
      description: values.description,
    });
    if (add.isSuccess) {
      reset();
      setOpenCreateCategoryModal(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 px-4"
    >
      <div>
        <Input
          required
          id="title"
          label="Título"
          {...register('title', { required: 'El título es requerido' })}
          error={errors.title?.message}
        />
      </div>
      <div>
        <Input
          required
          id="description"
          label="Descripción"
          {...register('description', {
            required: 'La descripción es requerida',
          })}
          error={errors.description?.message}
        />
      </div>
      <div className="flex justify-end space-x-2 pt-4">
        <Button
          size="medium"
          shape="rounded"
          onClick={() => setOpenCreateCategoryModal(false)}
        >
          Cancelar
        </Button>
        <Button size="medium" shape="rounded" type="submit" disabled={!isValid}>
          Crear
        </Button>
      </div>
    </form>
  );
};
