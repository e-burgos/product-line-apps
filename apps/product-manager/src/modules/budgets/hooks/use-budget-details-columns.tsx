import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ListIcon } from 'lucide-react';
import { BudgetVariant } from '@product-manager-app/lib/db';
import { formatCurrency } from '@product-manager-app/lib/utils';
import DeleteDetail from '../modals/delete-detail';
import EditBudgetDetailModal from '../modals/edit-budget-detail-modal';

const useBudgetDetailsColumns = () => {
  const columns: ColumnDef<BudgetVariant, BudgetVariant>[] = useMemo(
    () => [
      {
        id: 'title',
        header: 'Producto',
        enablePinning: false,
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
        enablePinning: false,
        enableSorting: false,
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
        enablePinning: false,
        enableSorting: false,
        maxSize: 50,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <div className=" flex justify-start content-center gap-2">
              <DeleteDetail detail={info?.getValue()} />
              <EditBudgetDetailModal detail={info?.getValue()} />
            </div>
          );
        },
      },
    ],
    []
  );
  return { columns: columns || [] };
};

export default useBudgetDetailsColumns;