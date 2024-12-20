import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Budget, BudgetVariant, BudgetWithVariants } from '../types/db-types';
import { useToastStore } from 'libs/ui/src/hooks';
import { v4 as uuidv4 } from 'uuid';
import { useCallback } from 'react';

export const useBudgetMethods = () => {
  const { addToast } = useToastStore();

  const addBudget = async (budget: Budget) => {
    try {
      await db.budgets.add({
        ...budget,
        id: uuidv4(),
      });
      addToast({
        id: 'budget-created',
        title: 'Presupuesto creado',
        message: 'El presupuesto se ha creado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false, budget };
    } catch (error) {
      console.error(error);
      addToast({
        id: 'budget-error',
        title: 'Error',
        message: 'No se pudo crear el presupuesto.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true, budget: null };
    }
  };

  const updateBudget = async (budget: Budget) => {
    try {
      await db.budgets.update(budget.id, {
        ...budget,
      });
      addToast({
        id: 'budget-updated',
        title: 'Presupuesto actualizado',
        message: 'El presupuesto se ha actualizado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false, budget };
    } catch (error) {
      console.error(error);
      addToast({
        id: 'budget-error',
        title: 'Error',
        message: 'No se pudo actualizar el presupuesto.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true, budget: null };
    }
  };

  const deleteBudget = async (budgetId: string) => {
    try {
      await db.budgets.delete(budgetId);
      await db.budgetVariants.where('budgetId').equals(budgetId).delete();
      addToast({
        id: 'budget-deleted',
        title: 'Presupuesto eliminado',
        message: 'El presupuesto se ha eliminado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false };
    } catch (error) {
      console.error(error);
      addToast({
        id: 'budget-error',
        title: 'Error',
        message: 'No se pudo eliminar el presupuesto.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true };
    }
  };

  const budgets = useLiveQuery(() => db.budgets.orderBy('title').toArray());

  const getBudgetById = useCallback(
    (budgetId: string) => budgets?.find((budget) => budget.id === budgetId),
    [budgets]
  );

  const addBudgetVariant = async (budgetVariant: BudgetVariant) => {
    try {
      await db.budgetVariants.add({
        ...budgetVariant,
        id: uuidv4(),
      });
      addToast({
        id: 'detail-created',
        title: 'Detalle creado',
        message: 'El detalle se ha creado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false, budgetVariant };
    } catch (error) {
      console.error(error);
      addToast({
        id: 'detail-error',
        title: 'Error',
        message: 'No se pudo crear el detalle.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true, budgetVariant: null };
    }
  };

  const updateBudgetVariant = async (budgetVariant: BudgetVariant) => {
    try {
      await db.budgetVariants.update(budgetVariant.id, {
        ...budgetVariant,
      });
      addToast({
        id: 'update-detail',
        title: 'Detalle actualizado',
        message: 'El detalle se actualizó correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false, budgetVariant };
    } catch (error) {
      console.error(error);
      addToast({
        id: 'error-update-detail',
        title: 'Error',
        message: 'No se pudo actualizar el detalle.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true, budgetVariant: null };
    }
  };

  const deleteBudgetVariant = async (budgetVariantId: string) => {
    try {
      await db.budgetVariants.delete(budgetVariantId);
      addToast({
        id: 'detail-deleted',
        title: 'Detalle eliminado',
        message: 'El detalle se ha eliminado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false };
    } catch (error) {
      console.error(error);
      addToast({
        id: 'detail-error',
        title: 'Error',
        message: 'No se pudo eliminar el detalle.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true };
    }
  };

  const budgetVariants = useLiveQuery(() =>
    db.budgetVariants.orderBy('budgetId').toArray()
  );

  const getBudgetVariantById = useCallback(
    (budgetVariantId: string) =>
      budgetVariants?.find(
        (budgetVariant) => budgetVariant.id === budgetVariantId
      ),
    [budgetVariants]
  );

  const getBudgetVariants = useCallback(
    (budgetId: string) =>
      budgetVariants?.filter((v) => v.budgetId === budgetId),
    [budgetVariants]
  );

  const getBudgetsWithVariants = useCallback(
    (): BudgetWithVariants[] =>
      budgets?.map((budget) => ({
        ...budget,
        totalAmount: getBudgetVariants(budget.id as string)?.reduce(
          (sum, variant) => sum + variant.amount,
          0
        ),
        count: getBudgetVariants(budget.id as string)?.length || 0,
        variants: getBudgetVariants(budget.id as string) || [],
      })) || [],
    [budgets, getBudgetVariants]
  );

  return {
    addBudget,
    updateBudget,
    deleteBudget,
    getBudgetById,
    addBudgetVariant,
    updateBudgetVariant,
    deleteBudgetVariant,
    getBudgetVariantById,
    getBudgetVariants,
    getBudgetsWithVariants,
    budgets,
    budgetVariants,
  };
};

export default useBudgetMethods;
