import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Budget,
  db,
  Variant,
  type Product,
} from 'libs/features/src/data/product-db';
import { useLiveQuery } from 'dexie-react-hooks';
import { useToastStore } from 'libs/ui/src/hooks/use-toast-store';
import { Input } from 'libs/ui/src/components';
import { formatCurrency } from 'libs/features/src/utils/utils';
import Button from 'libs/ui/src/components/button';
import InputLabel from 'libs/ui/src/components/input-label';
import Listbox, { ListboxOption } from 'libs/ui/src/components/list-box';
import { useBudgetStore } from '../hooks/use-budget-store';

export type AddBudgetDetailsFormData = {
  budgetId: string;
  productId: string;
  variantId: string;
  quantity: string;
};

export const AddBudgetDetailsForm: FC = () => {
  const { setOpenCreateModal } = useBudgetStore();
  const [selectedBudget, setSelectedBudget] = useState<ListboxOption>();
  const [selectedProduct, setSelectedProduct] = useState<ListboxOption>();
  const [selectedVariantOption, setSelectedVariantOption] =
    useState<ListboxOption>();
  const [selectedVariant, setSelectedVariant] = useState<Variant>();
  const { addToast } = useToastStore();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<AddBudgetDetailsFormData>();

  const budgetId = watch('budgetId');
  const productId = watch('productId');
  const quantity = watch('quantity');

  const budgets = useLiveQuery(() => db.budgets.toArray()) as Budget[];
  const products = useLiveQuery(() => db.products.toArray());
  const variants = useLiveQuery(() => db.variants.toArray())?.filter(
    (v: Variant) => v.productId === Number(productId)
  );

  async function onSubmit(values: AddBudgetDetailsFormData) {
    try {
      if (selectedVariant?.id) {
        await db.budgetVariants.add({
          budgetId: Number(values.budgetId),
          productId: Number(values.productId),
          variantId: Number(values.variantId),
          title: selectedVariant?.title,
          description: selectedVariant?.description,
          quantity: Number(values.quantity),
          amount: Number(selectedVariant?.amount) * Number(values.quantity),
        });
        reset();
        setSelectedBudget(undefined);
        setSelectedProduct(undefined);
        setSelectedVariant(undefined);
        addToast({
          id: 'detail-created',
          title: 'Detalle creado',
          message: 'El detalle se ha creado correctamente.',
          variant: 'success',
        });
      }
    } catch {
      addToast({
        id: 'detail-error',
        title: 'Error',
        message: 'No se pudo crear el detalle.',
        variant: 'destructive',
      });
    }
  }

  const budgetOptions: ListboxOption[] =
    budgets?.map((budget: Budget) => ({
      name: budget.title,
      value: budget.id?.toString() || '',
    })) || [];

  const productOptions: ListboxOption[] =
    products?.map((product: Product) => ({
      name: product.title,
      value: product.id?.toString() || '',
    })) || [];

  const variantOptions: ListboxOption[] =
    variants?.map((variant: Variant) => ({
      name: variant.title,
      value: variant.id?.toString() || '',
    })) || [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <InputLabel title={'Presupuestos'} />
        <Listbox
          className="w-full"
          options={budgetOptions}
          selectedOption={selectedBudget}
          onChange={(e) => setSelectedBudget(e as ListboxOption)}
          onSelect={(value) => setValue('budgetId', value)}
        />
      </div>

      {products?.length !== 0 && budgetId && (
        <div>
          <InputLabel title={'Productos'} />
          <Listbox
            className="w-full"
            options={productOptions}
            selectedOption={selectedProduct}
            onChange={(e) => setSelectedProduct(e as ListboxOption)}
            onSelect={(value) => setValue('productId', value)}
          />
        </div>
      )}

      {budgetId && products?.length === 0 && (
        <p className="text-destructive-foreground">
          No se encontraron productos.
        </p>
      )}

      {productId &&
        budgetId &&
        products?.length !== 0 &&
        variants?.length === 0 && (
          <p className="text-destructive-foreground">
            No se encontraron variantes para este producto.
          </p>
        )}

      {productId && variants?.length !== 0 && (
        <div>
          <InputLabel title={'Variantes'} />
          <Listbox
            className="w-full"
            options={variantOptions}
            selectedOption={selectedVariantOption}
            onChange={(e) => setSelectedVariantOption(e as ListboxOption)}
            onSelect={(value) => {
              setValue('variantId', value);
              setSelectedVariant(
                variants?.find((p) => p.id === parseInt(value))
              );
            }}
          />
        </div>
      )}

      {selectedVariant?.id && (
        <Input
          className="w-full mb-4"
          required
          label="Cantidad"
          id="quantity"
          inputMode="decimal"
          error={errors?.quantity?.message}
          {...register('quantity', {
            required: 'La cantidad es obligatoria',
            validate: (value) =>
              Number(value) > 0 || 'La cantidad debe ser mayor a 0',
          })}
        />
      )}

      {selectedVariant?.id && quantity && (
        <div>
          <InputLabel className="" title={'Detalle'} />
          <Input
            className="mt-2"
            value={`Nombre: ${selectedVariant?.title}`}
            disabled
          />
          <Input
            value={`Descripción: ${selectedVariant?.description}`}
            disabled
          />
          <Input
            value={`Monto Total: ${formatCurrency(
              selectedVariant?.amount * Number(quantity)
            )}`}
            disabled
          />
        </div>
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
