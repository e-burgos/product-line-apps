import { FC, useEffect } from 'react';
import { useProductStore } from '../../hooks/use-product-store';
import { Input } from '@product-line/ui';
import { useForm } from 'react-hook-form';
import Button from 'libs/ui/src/components/button';
import { useProductMethods } from '@product-line/dexie';
import { AddCategoryFormData } from './validations';

interface EditCategoryFormProps {
  categoryId: string;
}

export const EditCategoryForm: FC<EditCategoryFormProps> = ({ categoryId }) => {
  const { getCategoryById, updateCategory } = useProductMethods();
  const { setOpenEditCategoryModal } = useProductStore();
  const category = getCategoryById(categoryId);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm<AddCategoryFormData>();

  useEffect(() => {
    const subscription = watch((_value, { name, type }) => {
      if (type === 'change') {
        trigger(name);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  useEffect(() => {
    function loadCategory() {
      if (category) {
        reset({
          title: category.title,
          description: category.description,
        });
      }
    }
    loadCategory();
  }, [reset, category]);

  const onSubmit = async (values: AddCategoryFormData) => {
    const update = await updateCategory({
      id: categoryId,
      title: values.title,
      description: values.description,
      subcategories: category?.subcategories || [],
    });

    if (update.isSuccess) {
      setOpenEditCategoryModal(false);
    }
  };

  const handleErrors = () => {
    if (!watch('title') || !watch('description')) return true;
    return false;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 pr-4"
    >
      <div>
        <Input
          required
          id="title"
          label="Título"
          placeholder="Nombre de la categoría"
          {...register('title', {
            required: 'El título es requerido',
          })}
          error={errors?.title?.message}
        />
      </div>
      <div>
        <Input
          required
          id="description"
          label="Descripción"
          placeholder="Descripción de la categoría"
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
          variant="ghost"
          onClick={() => setOpenEditCategoryModal(false)}
        >
          Cancelar
        </Button>
        <Button
          size="medium"
          shape="rounded"
          type="submit"
          disabled={handleErrors()}
        >
          Actualizar
        </Button>
      </div>
    </form>
  );
};
