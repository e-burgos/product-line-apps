import { useForm } from 'react-hook-form';
import { Input, useToastStore } from '@product-line/ui';
import { db } from 'libs/features/src/data/product-db';
import Button from 'libs/ui/src/components/button';
import { FC, useEffect } from 'react';
import { useBudgetStore } from '../hooks/use-budget-store';

export type EditBudgetFormData = {
  title: string;
  description: string;
};

export const EditBudgetForm: FC = () => {
  const { setOpenEditModal, currentBudget } = useBudgetStore();
  const { addToast } = useToastStore();
  const budgetId = currentBudget?.id as number;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<EditBudgetFormData>();

  useEffect(() => {
    async function loadBudgets() {
      const budget = await db.budgets.get(budgetId);
      if (budget) {
        reset({
          title: budget.title,
          description: budget.description,
        });
      }
    }
    loadBudgets();
  }, [budgetId, reset]);

  async function onSubmit(values: EditBudgetFormData) {
    try {
      await db.budgets.update(budgetId, {
        title: values.title,
        description: values.description,
      });
      addToast({
        id: 'budget-updated',
        title: 'Presupuesto actualizado',
        message: 'El presupuesto se ha actualizado correctamente.',
        variant: 'success',
      });
      setOpenEditModal(false);
    } catch {
      reset();
      addToast({
        id: 'budget-error',
        variant: 'destructive',
        title: 'Error',
        message: 'No se pudo actualizar el presupuesto.',
      });
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Input
        className="w-full mb-4"
        required
        label="Título"
        id="title"
        error={errors?.title?.message}
        {...register('title', {
          required: 'El título es obligatorio',
          validate: (value) =>
            value.length > 3 || 'El título debe tener al menos 3 caracteres',
        })}
      />
      <Input
        className="w-full mb-4"
        label="Descripción"
        id="description"
        error={errors?.description?.message}
        {...register('description', {
          required: 'La descripción es obligatoria',
        })}
      />
      <div className="flex justify-end gap-2 mt-6">
        <Button
          size="medium"
          shape="rounded"
          variant="ghost"
          onClick={() => setOpenEditModal(false)}
        >
          {'Cerrar'}
        </Button>
        <Button size="medium" shape="rounded" type="submit" disabled={!isValid}>
          {'Actualizar'}
        </Button>
      </div>
    </form>
  );
};

export default EditBudgetForm;
