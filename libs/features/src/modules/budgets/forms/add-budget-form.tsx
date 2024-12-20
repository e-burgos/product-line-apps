import { useForm } from 'react-hook-form';
import { Input } from '@product-line/ui';
import Button from 'libs/ui/src/components/button';
import { FC } from 'react';
import { useBudgetStore } from '../hooks/use-budget-store';
import { useBudgetMethods } from '@product-line/dexie';

export type AddBudgetFormData = {
  title: string;
  description: string;
};

export const AddBudgetForm: FC = () => {
  const { addBudget } = useBudgetMethods();
  const { setOpenCreateModal } = useBudgetStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<AddBudgetFormData>();

  async function onSubmit(values: AddBudgetFormData) {
    const add = await addBudget({
      title: values.title,
      description: values.description,
    });
    if (add.isSuccess) {
      reset();
      setOpenCreateModal(false);
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 mt-8"
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
