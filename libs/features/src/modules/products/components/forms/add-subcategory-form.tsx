import { FC, useEffect } from 'react';
import { useProductStore } from '../../hooks/use-product-store';
import { Input } from '@product-line/ui';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from 'libs/ui/src/components/button';
import { ProductSubCategory, useProductMethods } from '@product-line/dexie';
import Listbox, { ListboxOption } from 'libs/ui/src/components/list-box';
import { useState } from 'react';
import { AddSubCategoryFormData } from './validations';

export const AddSubCategoryForm: FC = () => {
  const { setOpenCreateSubCategoryModal } = useProductStore();
  const { addSubCategory, categories, updateCategory } = useProductMethods();
  const [selectedCategory, setSelectedCategory] = useState<ListboxOption>({
    name: 'Seleccionar categoría',
    value: '',
  });

  const {
    handleSubmit,
    register,
    reset,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<AddSubCategoryFormData>();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === 'change') {
        trigger(name);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  const onSubmit: SubmitHandler<AddSubCategoryFormData> = async (values) => {
    const category = categories?.find((c) => c.id === selectedCategory.value);

    if (!category) {
      return;
    }

    const subCategory: ProductSubCategory = {
      title: values.title,
      description: values.description,
      categoryId: category?.id || selectedCategory.value,
      category,
    };

    const add = await addSubCategory(subCategory, category);

    if (add.isSuccess) {
      reset();
      setOpenCreateSubCategoryModal(false);
      setSelectedCategory({ name: 'Seleccionar categoría', value: '' });
    }
  };

  const categoryOptions: ListboxOption[] =
    categories?.map((category) => ({
      name: category.title,
      value: category.id?.toString() || '',
    })) || [];

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
      <div>
        <Listbox
          required
          label="Categoría"
          options={categoryOptions}
          selectedOption={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>
      <div className="flex justify-end space-x-2 pt-4">
        <Button
          size="medium"
          shape="rounded"
          variant="ghost"
          onClick={() => setOpenCreateSubCategoryModal(false)}
        >
          Cancelar
        </Button>
        <Button
          size="medium"
          shape="rounded"
          type="submit"
          disabled={!isValid || !selectedCategory.value}
        >
          Crear
        </Button>
      </div>
    </form>
  );
};
