import { sortingCompareStringFn } from '@product-line/datatable';
import { ProductSubCategory } from '@product-line/dexie';
import { ColumnDef } from '@tanstack/react-table';
import { Package } from 'lucide-react';
import { useMemo } from 'react';

export const useSubCategorySubCategoriesColumns = () => {
  const columns: ColumnDef<ProductSubCategory, ProductSubCategory>[] = useMemo(
    () => [
      {
        id: 'title',
        header: 'Subcategoría',
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
    ],
    []
  );
  return { columns: columns || [] };
};

export default useSubCategorySubCategoriesColumns;
