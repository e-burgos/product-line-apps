import { useForm } from 'react-hook-form';
import { Input } from '@product-line/ui';
import { useBudgetMethods } from '@product-line/dexie';
import Button from 'libs/ui/src/components/button';
import { FC, useEffect } from 'react';
import { useBudgetStore } from '../hooks/use-budget-store';

export type EditBudgetFormData = {
  title: string;
  description: string;
};

export const EditBudgetForm: FC = () => {
  const { updateBudget, getBudgetById } = useBudgetMethods();
  const { setOpenEditModal, currentBudget } = useBudgetStore();
  const budgetId = currentBudget?.id as string;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<EditBudgetFormData>();

  useEffect(() => {
    function loadBudgets() {
      const budget = getBudgetById(budgetId);
      if (budget) {
        reset({
          title: budget.title,
          description: budget.description,
        });
      }
    }
    loadBudgets();
  }, [budgetId, getBudgetById, reset]);

  async function onSubmit(values: EditBudgetFormData) {
    const add = await updateBudget({
      id: budgetId,
      title: values.title,
      description: values.description,
    });
    if (add.isSuccess) {
      reset();
      setOpenEditModal(false);
    }
    if (add.isError) {
      reset();
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 mt-6"
    >
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
      <div className="flex justify-end gap-2 pt-4">
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
