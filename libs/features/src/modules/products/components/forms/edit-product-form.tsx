import { FC, useCallback, useEffect, useState } from 'react';
import { useProductStore } from '../../hooks/use-product-store';
import { Input } from '@product-line/ui';
import { useForm } from 'react-hook-form';
import Button from 'libs/ui/src/components/button';
import { ProductStatus, useProductMethods } from '@product-line/dexie';
import Listbox, { ListboxOption } from 'libs/ui/src/components/list-box';
import { Box, DollarSign } from 'lucide-react';
import { AddProductFormData } from './validations';

interface EditProductFormProps {
  productId: string;
}

export const EditProductForm: FC<EditProductFormProps> = ({ productId }) => {
  const { setOpenEditModal } = useProductStore();
  const { getProductById, updateProduct, categories, subCategories } =
    useProductMethods();
  const product = getProductById(productId);

  const [selectedCategory, setSelectedCategory] = useState<ListboxOption>({
    name: 'Seleccionar categoría',
    value: '',
  });
  const [selectedSubCategory, setSelectedSubCategory] = useState<ListboxOption>(
    {
      name: 'Seleccionar subcategoría',
      value: '',
    }
  );
  const [selectedStatus, setSelectedStatus] = useState<ListboxOption>({
    name: 'Seleccionar estado',
    value: '',
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm<AddProductFormData>();

  useEffect(() => {
    const subscription = watch((_value, { name, type }) => {
      if (type === 'change') {
        trigger(name);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  const loadProduct = useCallback(() => {
    if (product) {
      reset({
        title: product.title,
        description: product.description,
        amount: product.amount?.toString(),
        stock: product.stock?.toString(),
      });
      setSelectedCategory({
        name: product.category?.title || 'Seleccionar categoría',
        value: product.category?.id || '',
      });
      setSelectedSubCategory({
        name: product.subcategory?.title || 'Seleccionar subcategoría',
        value: product.subcategory?.id || '',
      });
      setSelectedStatus({
        name: product.status === 'active' ? 'Activo' : 'Inactivo',
        value: product.status,
      });
    }
  }, [product, reset]);

  const onSubmit = async (values: AddProductFormData) => {
    const category = categories?.find((c) => c.id === selectedCategory.value);
    const subCategory = subCategories?.find(
      (sc) => sc.id === selectedSubCategory.value
    );

    if (!category) {
      return;
    }

    const update = await updateProduct({
      id: productId,
      title: values.title,
      description: values.description,
      amount: parseFloat(values.amount),
      stock: parseInt(values.stock) || 0,
      status: selectedStatus.value as ProductStatus,
      category,
      subcategory: subCategory || undefined,
    });

    if (update.isSuccess) {
      setOpenEditModal(false);
    }
  };

  const categoryOptions: ListboxOption[] =
    categories?.map((category) => ({
      name: category.title,
      value: category.id?.toString() || '',
    })) || [];

  const subCategoryOptions: ListboxOption[] =
    subCategories
      ?.filter((sc) => sc.categoryId === selectedCategory.value)
      .map((subCategory) => ({
        name: subCategory.title,
        value: subCategory.id?.toString() || '',
      })) || [];

  const statusOptions: ListboxOption[] = [
    { name: 'Seleccionar estado', value: '' },
    { name: 'Activo', value: 'active' },
    { name: 'Inactivo', value: 'disabled' },
  ];

  const handleErrors = () => {
    if (
      !watch('title') ||
      !watch('amount') ||
      !selectedCategory.value ||
      !selectedStatus.value
    )
      return true;
    return false;
  };

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

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
          placeholder="Nombre del producto"
          {...register('title', {
            pattern: {
              value: /^[a-zA-Z0-9\s]{5,}$/,
              message: 'El nombre debe tener al menos 5 caracteres',
            },
          })}
          error={errors?.title?.message}
        />
      </div>
      <div>
        <Input
          id="description"
          label="Descripción"
          placeholder="Descripción del producto"
          {...register('description', {
            required: 'La descripción es requerida',
          })}
          error={errors.description?.message}
        />
      </div>
      <div>
        <Input
          required
          id="amount"
          label="Precio"
          type="number"
          step="0.01"
          placeholder="0.00"
          icon={<DollarSign className="h-4 w-4" />}
          {...register('amount', {
            required: 'El precio es requerido',
            pattern: {
              value: /^[0-9]*\.?[0-9]+$/,
              message: 'El precio debe ser un número válido',
            },
          })}
          error={errors.amount?.message}
        />
      </div>
      <div>
        <Input
          id="stock"
          label="Stock"
          type="number"
          step="1"
          icon={<Box className="h-4 w-4" />}
          placeholder="0"
          {...register('stock', {
            validate: (value) =>
              parseInt(value) >= 0 || 'El stock no puede ser negativo',
          })}
          error={errors.stock?.message}
        />
      </div>
      <div>
        <Listbox
          required
          label="Estado"
          options={statusOptions}
          selectedOption={selectedStatus}
          onChange={setSelectedStatus}
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
      <div>
        <Listbox
          label="Subcategoría"
          options={subCategoryOptions}
          selectedOption={selectedSubCategory}
          onChange={setSelectedSubCategory}
        />
      </div>
      <div className="flex justify-end space-x-2 pt-4">
        <Button
          size="medium"
          shape="rounded"
          variant="ghost"
          onClick={() => setOpenEditModal(false)}
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
