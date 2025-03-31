import { sortingCompareStringFn } from '@product-line/datatable';
import { Product } from '@product-line/dexie';
import { ColumnDef } from '@tanstack/react-table';
import Badge from 'libs/ui/src/components/badge';
import { DollarSign, Package } from 'lucide-react';
import { useMemo } from 'react';

export const useProductColumns = () => {
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
        accessorKey: 'title',
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
        id: 'amount',
        header: 'Precio',
        accessorFn: (row) => row,
        accessorKey: 'amount',
        cell: (info) => {
          return (
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>{info?.getValue()?.amount || '-'}</span>
            </div>
          );
        },
      },
      {
        id: 'stock',
        header: 'Stock',
        accessorFn: (row) => row,
        accessorKey: 'stock',
        enableHiding: false,
        enableSorting: false,
        enablePinning: false,
        size: 100,
        cell: (info) => {
          return (
            <Badge
              status={info?.getValue()?.stock !== 0 ? 'active' : 'inactive'}
            >
              {info?.getValue()?.stock || 0}
            </Badge>
          );
        },
      },
      {
        id: 'status',
        header: 'Estado',
        accessorFn: (row) => row,
        accessorKey: 'status',
        cell: (info) => {
          return (
            <Badge
              size="lg"
              className="mr-4"
              variant="outline"
              status={
                info?.getValue()?.status === 'active' ? 'active' : 'inactive'
              }
            >
              {info?.getValue()?.status === 'active' ? 'Activo' : 'Inactivo'}
            </Badge>
          );
        },
      },
      {
        id: 'category',
        header: 'Categoría',
        accessorFn: (row) => row,
        accessorKey: 'category.title',
        cell: (info) => {
          return (
            <div className="flex items-center gap-2">
              <span>{info?.getValue()?.category?.title || '-'}</span>
            </div>
          );
        },
      },
      {
        id: 'subcategory',
        header: 'SubCategoría',
        accessorFn: (row) => row,
        accessorKey: 'subcategory.title',
        cell: (info) => {
          return (
            <div className="flex items-center gap-2">
              <span>{info?.getValue()?.subcategory?.title || '-'}</span>
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
