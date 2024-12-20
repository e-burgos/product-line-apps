import { sortingCompareStringFn } from '@product-line/datatable';
import { Product, useProductMethods } from '@product-line/dexie';
import { ColumnDef } from '@tanstack/react-table';
import { Package } from 'lucide-react';
import { useMemo } from 'react';

export const useProductColumns = () => {
  const { getProductVariantsById } = useProductMethods();
  const columns: ColumnDef<Product, Product>[] = useMemo(
    () => [
      {
        id: 'title',
        header: 'Producto',
        sortingFn: (rowA, rowB) =>
          sortingCompareStringFn(rowA.original?.title, rowB.original?.title),
        meta: {
          filterVariant: 'text',
        },
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
        id: 'count',
        header: 'Cantidad',
        enablePinning: false,
        enableSorting: false,
        maxSize: 100,
        accessorFn: (row) => row,
        cell: (info) => {
          const amount =
            getProductVariantsById(info?.getValue()?.id as string)?.length || 0;

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
    [getProductVariantsById]
  );
  return { columns: columns || [] };
};

export default useProductColumns;
