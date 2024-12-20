import { FC, useState } from 'react';
import { useProductStore } from '../../hooks/use-product-store';
import Listbox, { ListboxOption } from 'libs/ui/src/components/list-box';
import { useForm } from 'react-hook-form';
import { Input } from 'libs/ui/src/components';
import Button from 'libs/ui/src/components/button';
import { Product, useProductMethods } from '@product-line/dexie';
import { DollarSign } from 'lucide-react';

export type AddProductVariantInLineFormData = {
  productId: string;
  title: string;
  description: string;
  amount: string;
};

export const AddProductVariantInLineForm: FC = () => {
  const { addProductVariant, products } = useProductMethods();
  const { currentProduct, setOpenCreateVariantModal } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState<ListboxOption>({
    name: currentProduct?.title || '',
    value: currentProduct?.id?.toString() || '',
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<AddProductVariantInLineFormData>();

  async function onSubmit(values: AddProductVariantInLineFormData) {
    const add = await addProductVariant({
      productId: selectedProduct.value,
      title: values.title,
      description: values.description,
      amount: parseFloat(values.amount),
    });
    if (add.isSuccess) {
      reset();
      setOpenCreateVariantModal(false);
    }
  }

  const productOptions: ListboxOption[] =
    products?.map((product: Product) => ({
      name: product.title,
      value: product.id?.toString() || '',
    })) || [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
      <Listbox
        disabled
        label="Producto"
        className="w-full"
        options={productOptions}
        selectedOption={selectedProduct}
        onChange={(e) => setSelectedProduct(e as ListboxOption)}
        onSelect={(value) => setValue('productId', value)}
      />

      {products?.length === 0 && (
        <p className="text-destructive-foreground">
          No se encontraron productos.
        </p>
      )}

      {selectedProduct?.value && (
        <>
          <Input
            className="w-full mb-4"
            required
            label="Título"
            id="title"
            placeholder="Ejemplo: variante de armazón"
            error={errors?.title?.message}
            {...register('title', {
              required: 'El título es obligatorio',
              validate: (value) =>
                value.length > 3 ||
                'El título debe tener al menos 3 caracteres',
            })}
          />
          <Input
            className="w-full mb-4"
            label="Descripción"
            id="description"
            placeholder="Ejemplo: descripción del armazón"
            error={errors?.description?.message}
            {...register('description', {})}
          />
          <Input
            className="w-full mb-4"
            required
            placeholder="0.00"
            label="Precio"
            id="amount"
            type="number"
            step="0.01"
            min="0"
            max="9999999999"
            icon={<DollarSign className="h-4 w-4 mt-1" />}
            error={errors?.amount?.message}
            {...register('amount', {
              required: 'El precio es obligatorio',
              validate: (value) =>
                Number(value) > 0 || 'El monto debe ser mayor a 0',
              pattern: {
                value: /^[0-9]+(\.[0-9]{1,2})?$/,
                message:
                  'El precio debe ser válido. Utilice punto o como para max 2 decimales.',
              },
            })}
          />
        </>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <Button
          size="medium"
          shape="rounded"
          variant="ghost"
          onClick={() => setOpenCreateVariantModal(false)}
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
