/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useLiveQuery } from 'dexie-react-hooks';
import * as XLSX from 'xlsx';
import { useToastStore } from 'libs/ui/src/hooks/use-toast-store';
import { Budgets, db } from 'libs/features/src/data/product-db';
import { formatCurrency } from 'libs/features/src/utils/utils';

export const useBudgetData = () => {
  const { addToast } = useToastStore();

  const budgets: Budgets = useLiveQuery(async () => {
    const budgets = await db.budgets.toArray();
    const budgetsWithVariants = await Promise.all(
      budgets.map(async (budget) => {
        const variants = await db.budgetVariants
          .where('budgetId')
          .equals(budget.id!)
          .toArray();
        const totalAmount = variants.reduce(
          (sum, variant) => sum + variant.amount,
          0
        );
        return {
          ...budget,
          variants,
          totalAmount,
        };
      })
    );
    return budgetsWithVariants;
  });

  const budgetVariants = useLiveQuery(() => db.budgetVariants.toArray());

  const getBudgetDetails = (budgetId: number | undefined) =>
    budgetVariants?.filter((v) => v.budgetId === budgetId) || [];

  const exportToExcel = () => {
    const data: any[] = [];
    if (!budgets) return;

    budgets.forEach((budget) => {
      data.push({
        Presupuesto: budget.title,
        Descripción: budget.description || '-',
        'Monto Total': formatCurrency(budget.totalAmount || 0),
      });

      getBudgetDetails(budget.id).forEach((detail) => {
        data.push({
          Presupuesto: '',
          Descripción: '',
          'Monto Total': '',
          Producto: detail.title,
          Detalle: detail.description,
          Cantidad: detail.quantity.toString(),
          Subtotal: formatCurrency(detail.amount),
        });
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Presupuestos');
    XLSX.writeFile(workbook, 'presupuestos.xlsx');
  };

  const exportOneBudgetToExcel = (budgetId: number | undefined) => {
    if (!budgetId) return;
    const budget = budgets?.find((b) => b.id === budgetId);
    if (!budget) return;

    const data: any[] = [];
    data.push({
      Presupuesto: budget.title,
      Descripción: budget.description || '-',
      'Monto Total': formatCurrency(budget.totalAmount || 0),
    });

    getBudgetDetails(budget.id).forEach((detail) => {
      data.push({
        Presupuesto: '',
        Descripción: '',
        'Monto Total': '',
        Producto: detail.title,
        Detalle: detail.description,
        Cantidad: detail.quantity.toString(),
        Subtotal: formatCurrency(detail.amount),
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      `Presupuesto ${budget.title}`
    );
    XLSX.writeFile(workbook, `presupuesto-${budget.title}.xlsx`);
  };

  const shareData = async () => {
    if (!budgets) return;

    const shareText = budgets
      .map(
        (budget) =>
          `Presupuesto: ${budget.title}\nDescripción: ${
            budget.description || '-'
          }\nTotal: ${new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
          }).format(budget.totalAmount || 0)}\n\nDetalles:\n${getBudgetDetails(
            budget.id
          )
            ?.map(
              (v) =>
                `- Producto: ${v.title} (${
                  v.quantity
                } unidades): ${new Intl.NumberFormat('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                }).format(v.amount)}`
            )
            .join('\n')}\n\n`
      )
      .join('---\n\n');

    try {
      await navigator.share({
        title: 'Lista de Presupuestos',
        text: shareText,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      addToast({
        id: 'share-error',
        variant: 'destructive',
        message:
          'No se pudo compartir. Intenta copiar el contenido manualmente.',
      });
    }
  };

  const shareOneBudget = async (budgetId: number | undefined) => {
    if (!budgets) return;
    const budget = budgets?.find((b) => b.id === budgetId);
    if (!budget) return;

    const shareText = `Presupuesto: ${budget.title}\nDescripción: ${
      budget.description || '-'
    }\nTotal: ${new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(budget.totalAmount || 0)}\n\nDetalles:\n${getBudgetDetails(
      budget.id
    )
      ?.map(
        (v) =>
          `- Producto: ${v.title} (${
            v.quantity
          } unidades): ${new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
          }).format(v.amount)}`
      )
      .join('\n')}`;

    try {
      await navigator.share({
        title: 'Presupuesto',
        text: shareText,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      addToast({
        id: 'share-error',
        variant: 'destructive',
        message:
          'No se pudo compartir. Intenta copiar el contenido manualmente.',
      });
    }
  };

  return {
    budgets,
    exportToExcel,
    shareData,
    shareOneBudget,
    exportOneBudgetToExcel,
  };
};

export default useBudgetData;
