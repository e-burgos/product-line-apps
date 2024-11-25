import { ColumnDef } from '@tanstack/react-table';
import { Package } from 'lucide-react';
import { useMemo } from 'react';
import { Product } from '@product-manager-app/lib/db';

const useProductColumns = () => {
  const columns: ColumnDef<Product, Product>[] = useMemo(
    () => [
      {
        id: 'title',
        header: 'Producto',
        enablePinning: false,
        size: 150,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
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
        header: 'Cantidad',
        enablePinning: false,
        enableSorting: false,
        maxSize: 100,
        accessorFn: (row) => row,
        cell: (info) => {
          const amount = info?.getValue()?.totalAmount || 0;

          return (
            <div className="flex items-center gap-2">
              <span>{`${amount}  ${
                amount > 1 ? 'variantes' : 'variante'
              }`}</span>
            </div>
          );
        },
      },
    ],
    []
  );
  return { columns: columns || [] };
};

export default useProductColumns;
