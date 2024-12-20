import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from 'libs/ui/src/components';
import { formatCurrency } from 'libs/features/src/utils/utils';
import Button from 'libs/ui/src/components/button';
import InputLabel from 'libs/ui/src/components/input-label';
import Listbox, { ListboxOption } from 'libs/ui/src/components/list-box';
import { useBudgetStore } from '../hooks/use-budget-store';
import {
  Budget,
  Product,
  useBudgetMethods,
  useProductMethods,
  Variant,
} from '@product-line/dexie';

export type AddBudgetDetailFormData = {
  productId: string;
  variantId: string;
  quantity: string;
};

interface AddBudgetDetailInLineFormProps {
  budgetId: string;
}

export const AddBudgetDetailInLineForm: FC<AddBudgetDetailInLineFormProps> = ({
  budgetId,
}) => {
  const { addBudgetVariant, budgets } = useBudgetMethods();
  const { getProductVariantsById } = useProductMethods();
  const { products } = useProductMethods();
  const { setOpenCreateDetailModal } = useBudgetStore();
  const [selectedProduct, setSelectedProduct] = useState<ListboxOption>();
  const [selectedVariantOption, setSelectedVariantOption] =
    useState<ListboxOption>();
  const [selectedVariant, setSelectedVariant] = useState<Variant>();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<AddBudgetDetailFormData>();

  const productId = watch('productId');
  const quantity = watch('quantity');
  const variants = getProductVariantsById(productId);

  async function onSubmit(values: AddBudgetDetailFormData) {
    if (selectedVariant?.id) {
      const add = await addBudgetVariant({
        budgetId: budgetId,
        productId: values.productId,
        variantId: values.variantId,
        title: selectedVariant?.title,
        description: selectedVariant?.description,
        quantity: Number(values.quantity),
        amount: Number(selectedVariant?.amount) * Number(values.quantity),
      });
      if (add.isSuccess) {
        reset();
        setSelectedProduct(undefined);
        setSelectedVariant(undefined);
        setOpenCreateDetailModal(false);
      }
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
      <div>
        <InputLabel title={'Presupuestos'} />
        <Listbox
          disabled
          label="Presupuestos"
          className="w-full"
          options={budgetOptions}
          selectedOption={budgetOptions.find(
            (option) => option.value === budgetId
          )}
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
              setSelectedVariant(variants?.find((p) => p.id === value));
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
      <div className="flex justify-end gap-2 pt-4">
        <Button
          size="medium"
          shape="rounded"
          variant="ghost"
          onClick={() => setOpenCreateDetailModal(false)}
        >
          {'Cerrar'}
        </Button>
        <Button
          size="medium"
          shape="rounded"
          type="submit"
          disabled={!isValid || !selectedVariant?.id || !quantity}
        >
          {'Guardar'}
        </Button>
      </div>
    </form>
  );
};
