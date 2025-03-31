import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Table2 } from 'lucide-react';
import { Budget } from '@product-line/dexie';
import { formatCurrency } from 'libs/features/src/utils/utils';
import Badge from 'libs/ui/src/components/badge';

export const useBudgetColumns = () => {
  const columns: ColumnDef<Budget, Budget>[] = useMemo(
    () => [
      {
        id: 'title',
        header: 'Presupuesto',
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
        id: 'detailsCount',
        header: 'Detalles',
        enablePinning: false,
        enableSorting: false,
        accessorKey: 'detailsCount',
        size: 120,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <Badge
              variant="outline"
              status={
                info?.getValue()?.detailsCount !== 0 &&
                info?.getValue()?.detailsCount !== undefined
                  ? 'active'
                  : 'inactive'
              }
            >
              {info?.getValue()?.detailsCount || '0'}
            </Badge>
          );
        },
      },
      {
        id: 'totalAmount',
        header: 'Monto Total',
        enablePinning: false,
        enableSorting: false,
        size: 150,
        accessorKey: 'totalAmount',
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <div className="flex items-center gap-2">
              <span>{formatCurrency(info?.getValue()?.totalAmount || 0)}</span>
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
