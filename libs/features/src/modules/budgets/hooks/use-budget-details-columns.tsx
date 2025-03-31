/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ListIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { formatCurrency } from 'libs/features/src/utils/utils';
import { BudgetDetail } from '@product-line/dexie';
import {
  sortingCompareNumberFn,
  sortingCompareStringFn,
} from '@product-line/datatable';
import useBudgetDetailTableActions from '../hooks/use-budget-detail-table-actions';
import Button from 'libs/ui/src/components/button';

export const useBudgetDetailsColumns = () => {
  const { rowActions } = useBudgetDetailTableActions();
  const columns: ColumnDef<BudgetDetail, BudgetDetail>[] = useMemo(
    () => [
      {
        id: 'title',
        header: 'Detalle',
        sortingFn: (rowA, rowB) =>
          sortingCompareStringFn(rowA.original?.title, rowB.original?.title),
        meta: {
          filterVariant: 'text',
        },
        accessorKey: 'title',
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <div className="flex items-center gap-2">
              <ListIcon className="h-4 w-4 text-muted-foreground" />
              <span>{info?.getValue()?.title || '-'}</span>
            </div>
          );
        },
      },
      {
        id: 'description',
        header: 'Descripción',
        accessorKey: 'description',
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <div className="flex items-center gap-2">
              <span>{info?.getValue()?.description || '-'}</span>
            </div>
          );
        },
      },
      {
        id: 'product',
        header: 'Producto',
        accessorKey: 'product',
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <div className="flex items-center gap-2">
              <span>{info?.getValue()?.product?.title || '-'}</span>
            </div>
          );
        },
      },
      {
        id: 'quantity',
        header: 'Cantidad',
        accessorKey: 'quantity',
        sortingFn: (rowA, rowB) =>
          sortingCompareNumberFn(
            Number(rowA.original?.quantity),
            Number(rowB.original?.quantity)
          ),
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <div className="flex items-center gap-2">
              <span>{info?.getValue()?.quantity.toString() || '0'}</span>
            </div>
          );
        },
      },
      {
        id: 'amount',
        header: 'Subtotal',
        accessorKey: 'amount',
        sortingFn: (rowA, rowB) =>
          sortingCompareNumberFn(
            Number(rowA.original?.amount),
            Number(rowB.original?.amount)
          ),
        accessorFn: (row) => row,
        cell: (info) => {
          const amount = parseFloat(
            info?.getValue()?.amount?.toString() || '0'
          );
          return (
            <div className="flex items-center gap-2">
              <span>{formatCurrency(amount)}</span>
            </div>
          );
        },
      },
      {
        id: 'ActionsColumn',
        header: 'Acciones',
        size: 120,
        cell: () => {
          return (
            <div className="flex items-center gap-2">
              {rowActions.map((action) => (
                <Button
                  key={action.action}
                  variant="transparent"
                  size="tiny"
                  shape="rounded"
                  // @ts-ignore
                  onClick={action.onClick}
                >
                  {action.action === 'edit' && (
                    <PencilIcon className="h-4 w-4" />
                  )}
                  {action.action === 'delete' && (
                    <TrashIcon className="h-4 w-4" />
                  )}
                </Button>
              ))}
            </div>
          );
        },
      },
    ],
    [rowActions]
  );
  return { columns: columns || [] };
};

export default useBudgetDetailsColumns;
