import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Budget, BudgetDetail } from '../types/db-types';
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
      await db.budgetDetails.where('budgetId').equals(budgetId).delete();
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

  const addBudgetDetail = async (budgetDetail: BudgetDetail) => {
    try {
      await db.budgetDetails.add({
        ...budgetDetail,
        id: uuidv4(),
      });

      const details = await db.budgetDetails
        .where('budgetId')
        .equals(budgetDetail.budgetId)
        .toArray();

      await db.budgets.update(budgetDetail.budgetId, {
        details: details,
        detailsCount: details.length,
        totalAmount: details.reduce((sum, detail) => sum + detail.amount, 0),
      });

      addToast({
        id: 'detail-created',
        title: 'Detalle creado',
        message: 'El detalle se ha creado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false, budgetDetail };
    } catch (error) {
      console.error(error);
      addToast({
        id: 'detail-error',
        title: 'Error',
        message: 'No se pudo crear el detalle.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true, budgetDetail: null };
    }
  };

  const updateBudgetDetail = async (budgetDetail: BudgetDetail) => {
    try {
      await db.budgetDetails.update(budgetDetail.id, {
        ...budgetDetail,
      });

      const details = await db.budgetDetails
        .where('budgetId')
        .equals(budgetDetail.budgetId)
        .toArray();

      await db.budgets.update(budgetDetail.budgetId, {
        details: details,
        detailsCount: details.length,
        totalAmount: details.reduce((sum, detail) => sum + detail.amount, 0),
      });

      addToast({
        id: 'update-detail',
        title: 'Detalle actualizado',
        message: 'El detalle se actualizó correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false, budgetDetail };
    } catch (error) {
      console.error(error);
      addToast({
        id: 'error-update-detail',
        title: 'Error',
        message: 'No se pudo actualizar el detalle.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true, budgetDetail: null };
    }
  };

  const deleteBudgetDetail = async (budgetDetailId: string) => {
    const budgetDetail = getBudgetDetailById(budgetDetailId);
    try {
      await db.budgetDetails.delete(budgetDetailId);

      const details = budgetDetails?.filter(
        (detail) => detail?.id !== budgetDetailId
      );

      await db.budgets.update(budgetDetail?.budgetId as string, {
        details: details,
        detailsCount: details?.length || 0,
        totalAmount: details?.reduce((sum, detail) => sum + detail.amount, 0),
      });

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

  const budgetDetails = useLiveQuery(() =>
    db.budgetDetails.orderBy('budgetId').toArray()
  );

  const getBudgetDetailById = useCallback(
    (budgetDetailId: string) =>
      budgetDetails?.find((budgetDetail) => budgetDetail.id === budgetDetailId),
    [budgetDetails]
  );

  const getBudgetDetails = useCallback(
    (budgetId: string) => budgetDetails?.filter((d) => d.budgetId === budgetId),
    [budgetDetails]
  );

  const getBudgetsWithDetails = useCallback(
    () =>
      budgets?.map((budget) => ({
        ...budget,
        totalAmount: getBudgetDetails(budget.id as string)?.reduce(
          (sum, detail) => sum + detail.amount,
          0
        ),
        detailsCount: getBudgetDetails(budget.id as string)?.length || 0,
        details: getBudgetDetails(budget.id as string) || [],
      })) || [],
    [budgets, getBudgetDetails]
  );

  return {
    addBudget,
    updateBudget,
    deleteBudget,
    getBudgetById,
    addBudgetDetail,
    updateBudgetDetail,
    deleteBudgetDetail,
    getBudgetDetailById,
    getBudgetDetails,
    getBudgetsWithDetails,
    budgets,
    budgetDetails,
  };
};

export default useBudgetMethods;
