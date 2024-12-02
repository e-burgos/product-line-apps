import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Table2 } from 'lucide-react';
import { Budget } from 'libs/features/src/data/product-db';
import { formatCurrency } from 'libs/features/src/utils/utils';

export const useBudgetColumns = () => {
  const columns: ColumnDef<Budget, Budget>[] = useMemo(
    () => [
      {
        id: 'title',
        header: 'Presupuesto',
        enablePinning: false,
        size: 150,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <div className="flex items-center gap-2">
              <Table2 className="h-4 w-4 text-muted-foreground" />
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
        size: 300,
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
        id: 'totalAmount',
        header: 'Monto Total',
        enablePinning: false,
        enableSorting: false,
        maxSize: 100,
        accessorFn: (row) => row,
        cell: (info) => {
          const amount = parseFloat(
            info?.getValue()?.totalAmount?.toString() || '0'
          );
          return (
            <div className="flex items-center gap-2">
              <span>{formatCurrency(amount)}</span>
            </div>
          );
        },
      },
    ],
    []
  );
  return { columns: columns || [] };
};

export default useBudgetColumns;
