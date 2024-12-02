import { useForm } from 'react-hook-form';
import { Input, useToastStore } from '@product-line/ui';
import { db } from 'libs/features/src/data/product-db';
import Button from 'libs/ui/src/components/button';
import { FC } from 'react';
import { useBudgetStore } from '../hooks/use-budget-store';

export type AddBudgetFormData = {
  title: string;
  description: string;
};

export const AddBudgetForm: FC = () => {
  const { setOpenCreateModal } = useBudgetStore();
  const { addToast } = useToastStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<AddBudgetFormData>();

  async function onSubmit(values: AddBudgetFormData) {
    try {
      await db.budgets.add({
        title: values.title,
        description: values.description,
      });
      reset();
      addToast({
        id: 'budget-created',
        title: 'Presupuesto creado',
        message: 'El presupuesto se ha creado correctamente.',
        variant: 'success',
      });
    } catch {
      addToast({
        id: 'budget-error',
        title: 'Error',
        message: 'No se pudo crear el presupuesto.',
        variant: 'destructive',
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

export default AddBudgetForm;
