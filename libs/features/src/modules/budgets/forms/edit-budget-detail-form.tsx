import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Budget,
  BudgetVariant,
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
  const { setOpenEditDetailModal } = useBudgetStore();
  const [selectedVariant, setSelectedVariant] = useState<Variant>();
  const { addToast } = useToastStore();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<EditBudgetDetailsFormData>();

  const budgetId = watch('budgetId');
  const productId = watch('productId');
  const quantity = watch('quantity');

  const budgets = useLiveQuery(() => db.budgets.toArray()) as Budget[];
  const products = useLiveQuery(() => db.products.toArray());
  const variants = useLiveQuery(() => db.variants.toArray())?.filter(
    (v: Variant) => v.productId === Number(productId)
  );

  useEffect(() => {
    async function loadBudgetDetail() {
      if (budgetDetail) {
        const variant = await db.variants.get(budgetDetail?.variantId);
        setSelectedVariant(variant);
        if (variant) {
          reset({
            budgetId: budgetDetail.budgetId.toString(),
            productId: budgetDetail.productId.toString(),
            variantId: budgetDetail.variantId.toString(),
            quantity: budgetDetail.quantity.toString(),
          });
        }
      }
    }
    loadBudgetDetail();
  }, [budgetDetail, reset]);

  async function onSubmit(values: EditBudgetDetailsFormData) {
    try {
      if (selectedVariant?.id && budgetDetail?.id) {
        await db.budgetVariants.update(budgetDetail?.id, {
          budgetId: budgetDetail.budgetId,
          variantId: Number(selectedVariant?.id),
          title: selectedVariant?.title,
          description: selectedVariant?.description,
          quantity: Number(values.quantity),
          amount: Number(selectedVariant?.amount) * Number(values.quantity),
        });
        addToast({
          id: 'update-detail',
          title: 'Detalle actualizado',
          message: 'El detalle se actualizó correctamente.',
          variant: 'success',
        });
        reset();
        setOpenEditDetailModal(false);
      }
    } catch {
      addToast({
        id: 'error-update-detail',
        variant: 'destructive',
        title: 'Error',
        message: 'No se pudo actualizar el detalle.',
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
      <Listbox
        disabled
        label="Presupuestos"
        className="w-full"
        options={budgetOptions}
        selectedOption={budgetOptions.find(
          (option) => option.value === budgetId
        )}
      />
      <Listbox
        disabled
        label="Productos"
        className="w-full"
        options={productOptions}
        selectedOption={productOptions.find(
          (option) => option.value === productId
        )}
      />
      <Listbox
        disabled
        label="Variantes"
        className="w-full"
        options={variantOptions}
        selectedOption={variantOptions.find(
          (option) => option.value === watch('variantId')
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

      {selectedVariant?.id && quantity && (
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
