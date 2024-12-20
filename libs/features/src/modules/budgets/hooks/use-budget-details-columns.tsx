import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Edit2, ListIcon, X } from 'lucide-react';
import { formatCurrency } from 'libs/features/src/utils/utils';
import { BudgetVariant } from '@product-line/dexie';
import Button from 'libs/ui/src/components/button/button';
import { useBudgetStore } from './use-budget-store';
import {
  sortingCompareNumberFn,
  sortingCompareStringFn,
} from '@product-line/datatable';

export const useBudgetDetailsColumns = () => {
  const { setOpenDeleteDetailModal, setOpenEditDetailModal } = useBudgetStore();
  const columns: ColumnDef<BudgetVariant, BudgetVariant>[] = useMemo(
    () => [
      {
        id: 'title',
        header: 'Producto',
        sortingFn: (rowA, rowB) =>
          sortingCompareStringFn(rowA.original?.title, rowB.original?.title),
        meta: {
          filterVariant: 'text',
        },
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
        enablePinning: false,
        enableSorting: false,
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
        id: 'quantity',
        header: 'Cantidad',
        enablePinning: false,
        enableSorting: false,
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
        id: 'actions',
        header: 'Acciones',
        size: 50,
        maxSize: 50,
        minSize: 50,
        enablePinning: false,
        enableResizing: false,
        enableSorting: false,
        enableHiding: false,
        accessorFn: (row) => row,
        cell: () => {
          return (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="mini"
                shape="circle"
                onClick={() => {
                  setOpenEditDetailModal(true);
                }}
              >
                <Edit2 size={16} />
              </Button>
              <Button
                variant="ghost"
                size="mini"
                shape="circle"
                onClick={() => {
                  setOpenDeleteDetailModal(true);
                }}
              >
                <X size={16} />
              </Button>
            </div>
          );
        },
      },
    ],
    [setOpenDeleteDetailModal, setOpenEditDetailModal]
  );
  return { columns: columns || [] };
};

export default useBudgetDetailsColumns;
