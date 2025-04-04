import { FC, useEffect, useState } from 'react';
import { useProductStore } from '../../hooks/use-product-store';
import { Input } from '@product-line/ui';
import { useForm } from 'react-hook-form';
import Button from 'libs/ui/src/components/button';
import {
  ProductCategory,
  ProductSubCategory,
  useProductMethods,
} from '@product-line/dexie';
import Listbox, { ListboxOption } from 'libs/ui/src/components/list-box';
import { AddSubCategoryFormData } from './validations';

interface EditSubCategoryFormProps {
  subCategoryId: string;
}

export const EditSubCategoryForm: FC<EditSubCategoryFormProps> = ({
  subCategoryId,
}) => {
  const { getSubCategoryById, updateSubCategory, getCategoryById, categories } =
    useProductMethods();
  const { setOpenEditSubCategoryModal } = useProductStore();
  const subCategory = getSubCategoryById(subCategoryId);
  const currentCategory = getCategoryById(
    subCategory?.categoryId as string
  ) as ProductCategory;

  const [selectedCategory, setSelectedCategory] = useState<ListboxOption>({
    name: 'Seleccionar categoría',
    value: '',
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm<AddSubCategoryFormData>();

  useEffect(() => {
    const subscription = watch((_value, { name, type }) => {
      if (type === 'change') {
        trigger(name);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  useEffect(() => {
    function loadSubCategory() {
      if (subCategory) {
        reset({
          title: subCategory.title,
          description: subCategory.description,
        });
        setSelectedCategory({
          name: subCategory.category?.title || 'Seleccionar categoría',
          value: subCategory.categoryId || '',
        });
      }
    }
    loadSubCategory();
  }, [reset, subCategory]);

  const onSubmit = async (values: AddSubCategoryFormData) => {
    const category = categories?.find((c) => c.id === selectedCategory.value);

    if (!category) {
      return;
    }

    const subCategoryToUpdate: ProductSubCategory = {
      id: subCategoryId,
      title: values.title,
      description: values.description,
      categoryId: category?.id || selectedCategory.value,
      category,
    };

    const update = await updateSubCategory(
      subCategoryToUpdate,
      category,
      currentCategory
    );

    if (update.isSuccess) {
      setOpenEditSubCategoryModal(false);
    }
  };

  const categoryOptions: ListboxOption[] =
    categories?.map((category) => ({
      name: category.title,
      value: category.id?.toString() || '',
    })) || [];

  const handleErrors = () => {
    if (!watch('title') || !selectedCategory.value) return true;
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
          placeholder="Nombre de la subcategoría"
          {...register('title', {
            required: 'El título es requerido',
          })}
          error={errors?.title?.message}
        />
      </div>
      <div>
        <Input
          id="description"
          label="Descripción"
          placeholder="Descripción de la subcategoría"
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
          onClick={() => setOpenEditSubCategoryModal(false)}
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
