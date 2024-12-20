import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Budget,
  BudgetVariant,
  useBudgetMethods,
  useProductMethods,
  Variant,
  type Product,
} from '@product-line/dexie';
import { Input } from 'libs/ui/src/components';
import { formatCurrency } from 'libs/features/src/utils/utils';
import Button from 'libs/ui/src/components/button';
import InputLabel from 'libs/ui/src/components/input-label';
import Listbox, { ListboxOption } from 'libs/ui/src/components/list-box';
import { useBudgetStore } from '../hooks/use-budget-store';

export type EditBudgetDetailsFormData = {
  budgetId: string;
  productId: string;
  variantId: string;
  quantity: string;
};

interface EditBudgetDetailsFormProps {
  budgetDetail: BudgetVariant;
}

export const EditBudgetDetailsForm: FC<EditBudgetDetailsFormProps> = ({
  budgetDetail,
}) => {
  const { updateBudgetVariant, budgets } = useBudgetMethods();
  const { products, getProductVariantById, getProductVariantsById } =
    useProductMethods();
  const { setOpenEditDetailModal } = useBudgetStore();
  const [selectedVariant, setSelectedVariant] = useState<Variant>();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<EditBudgetDetailsFormData>();

  const quantity = watch('quantity');
  const productVariant = getProductVariantById(
    budgetDetail?.variantId as string
  );

  useEffect(() => {
    function loadBudgetDetail() {
      if (budgetDetail) {
        setValue('quantity', budgetDetail?.quantity.toString());
        setValue('variantId', budgetDetail.variantId.toString());
        setValue('productId', budgetDetail.productId.toString());
        setValue('budgetId', budgetDetail.budgetId.toString());
      }
      if (productVariant?.id) {
        setSelectedVariant(productVariant);
      }
    }
    loadBudgetDetail();
  }, [budgetDetail, productVariant, setValue]);

  async function onSubmit(values: EditBudgetDetailsFormData) {
    if (selectedVariant?.id && budgetDetail?.id) {
      const update = await updateBudgetVariant({
        id: budgetDetail.id,
        budgetId: budgetDetail.budgetId,
        variantId: selectedVariant?.id,
        title: selectedVariant?.title,
        description: selectedVariant?.description,
        quantity: Number(values.quantity),
        amount: Number(selectedVariant?.amount) * Number(values.quantity),
        productId: budgetDetail.productId,
      });
      if (update.isSuccess) {
        reset();
        setOpenEditDetailModal(false);
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
    getProductVariantsById(budgetDetail?.productId)?.map(
      (variant: Variant) => ({
        name: variant.title,
        value: variant.id?.toString() || '',
      })
    ) || [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
      <Listbox
        disabled
        label="Presupuestos"
        className="w-full"
        options={budgetOptions}
        selectedOption={budgetOptions.find(
          (option) => option.value === budgetDetail?.budgetId.toString()
        )}
      />
      <Listbox
        disabled
        label="Productos"
        className="w-full"
        options={productOptions}
        selectedOption={productOptions.find(
          (option) => option.value === budgetDetail?.productId.toString()
        )}
      />
      <Listbox
        disabled
        label="Variantes"
        className="w-full"
        options={variantOptions}
        selectedOption={variantOptions.find(
          (option) => option.value === budgetDetail?.variantId.toString()
        )}
      />
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

      {quantity && (
        <div className="">
          <InputLabel className="p-2" title={'Detalle'} />
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
              Number(selectedVariant?.amount) * Number(quantity)
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
          onClick={() => setOpenEditDetailModal(false)}
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
