import { FC, useState } from 'react';
import { useProductStore } from '../../hooks/use-product-store';
import Listbox, { ListboxOption } from 'libs/ui/src/components/list-box';
import { db, Product } from '@product-manager-app/lib/db';
import { useToastStore } from 'libs/ui/src/hooks/use-toast-store';
import { useForm } from 'react-hook-form';
import { useLiveQuery } from 'dexie-react-hooks';
import { Input } from 'libs/ui/src/components';
import Button from 'libs/ui/src/components/button';

export type AddProductVariantFormData = {
  productId: string;
  title: string;
  description: string;
  amount: string;
};

export const AddProductVariantForm: FC = () => {
  const { setOpenCreateModal } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState<ListboxOption>();
  const { addToast } = useToastStore();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<AddProductVariantFormData>();

  const products = useLiveQuery(() => db.products.toArray());

  async function onSubmit(values: AddProductVariantFormData) {
    try {
      await db.variants.add({
        productId: parseInt(selectedProduct?.value || ''),
        title: values.title,
        description: values.description,
        amount: parseFloat(values.amount),
      });
      addToast({
        id: 'variant-created',
        title: 'Variante creada',
        message: 'La variante se ha creado correctamente.',
        variant: 'success',
      });
      reset();
      setSelectedProduct(undefined);
    } catch {
      addToast({
        id: 'variant-error',
        variant: 'destructive',
        title: 'Error',
        message: 'No se pudo crear la variante.',
      });
    }
  }

  const productOptions: ListboxOption[] =
    products?.map((product: Product) => ({
      name: product.title,
      value: product.id?.toString() || '',
    })) || [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Listbox
        className="w-full"
        label="Productos"
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
            required
            label="Descripción"
            id="description"
            error={errors?.description?.message}
            {...register('description', {
              required: 'La descripción es obligatoria',
            })}
          />
          <Input
            className="w-full mb-4"
            required
            label="Precio"
            id="amount"
            inputMode="decimal"
            error={errors?.amount?.message}
            {...register('amount', {
              required: 'El precio es obligatorio',
              validate: (value) =>
                Number(value) > 0 || 'El monto debe ser mayor a 0',
            })}
          />
        </>
      )}

      <div className="flex justify-end gap-2">
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
