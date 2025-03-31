import { FC, useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import {
  Budget,
  BudgetDetail,
  useBudgetMethods,
  useProductMethods,
  type Product,
} from '@product-line/dexie';
import { CardTitle, Input } from 'libs/ui/src/components';
import { formatCurrency } from 'libs/features/src/utils/utils';
import Button from 'libs/ui/src/components/button';
import InputLabel from 'libs/ui/src/components/input-label';
import Listbox, { ListboxOption } from 'libs/ui/src/components/list-box';
import { useBudgetStore } from '../hooks/use-budget-store';
import { BudgetDetailsFormData } from './validations';
import { DollarSign } from 'lucide-react';
interface EditBudgetDetailsFormProps {
  budgetDetail: BudgetDetail;
}

export const EditBudgetDetailsForm: FC<EditBudgetDetailsFormProps> = ({
  budgetDetail,
}) => {
  const { updateBudgetDetail, budgets } = useBudgetMethods();
  const { products, getProductById } = useProductMethods();
  const { setOpenEditDetailModal } = useBudgetStore();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<BudgetDetailsFormData>();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === 'change') {
        trigger(name);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  const title = watch('title');
  const description = watch('description');
  const amount = watch('amount');
  const quantity = watch('quantity');
  const product = getProductById(budgetDetail.productId);

  useEffect(() => {
    function loadBudgetDetail() {
      if (budgetDetail) {
        setValue('title', budgetDetail.title);
        setValue('description', budgetDetail.description);
        setValue('amount', budgetDetail.amount);
        setValue('quantity', budgetDetail?.quantity);
        setValue('productId', budgetDetail.productId);
        setValue('budgetId', budgetDetail.budgetId);
      }
    }
    loadBudgetDetail();
  }, [budgetDetail, setValue]);

  async function onSubmit(values: BudgetDetailsFormData) {
    if (product?.id && budgetDetail?.id) {
      const update = await updateBudgetDetail({
        id: budgetDetail.id,
        budgetId: budgetDetail.budgetId,
        productId: budgetDetail.productId,
        title: title,
        description: description,
        quantity: Number(values.quantity),
        amount: Number(amount),
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
      <Listbox
        disabled
        label="Presupuestos"
        className="w-full"
        options={budgetOptions}
        selectedOption={budgetOptions?.find(
          (option) => option.value === budgetDetail?.budgetId.toString()
        )}
      />
      <Listbox
        disabled
        label="Productos"
        className="w-full"
        options={productOptions}
        selectedOption={productOptions?.find(
          (option) => option.value === budgetDetail?.productId.toString()
        )}
        onSelect={(value) => setValue('productId', value)}
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
        <div className="flex gap-4 md:flex-row flex-col pt-4">
          <CardTitle title="Producto">
            <Input
              label="Nombre"
              className="w-full mb-4"
              value={product?.title}
              disabled
            />
            <Input
              label="Descripción"
              className="w-full mb-4"
              value={product?.description}
              disabled
            />
            <Input
              label="Monto Total"
              className="w-full mb-4"
              icon={<DollarSign className="h-4 w-4" />}
              value={`${Number(product?.amount) * Number(quantity)}`}
              disabled
            />
          </CardTitle>

          <CardTitle title="Editar Detalle">
            <Input
              required
              className="w-full mb-4"
              label="Título Detalle"
              id="title"
              error={errors?.title?.message}
              {...register('title', {
                required: 'El título es obligatorio',
              })}
            />
            <Input
              className="w-full mb-4"
              label="Descripción Detalle"
              id="description"
              error={errors?.description?.message}
              {...register('description', {
                required: 'La descripción es obligatoria',
              })}
            />
            <Input
              id="amount"
              label="Monto Total"
              type="number"
              step="0.01"
              placeholder="0.00"
              icon={<DollarSign className="h-4 w-4" />}
              {...register('amount', {
                required: 'El precio es requerido',
                pattern: {
                  value: /^[0-9]+[.,]?[0-9]*$/,
                  message: 'El precio debe ser un número válido',
                },
              })}
              error={errors.amount?.message}
            />
          </CardTitle>
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
