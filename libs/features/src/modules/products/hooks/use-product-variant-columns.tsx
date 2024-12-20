import { ColumnDef } from '@tanstack/react-table';
import { Edit2, Package2, X } from 'lucide-react';
import { useMemo } from 'react';
import { formatCurrency } from 'libs/features/src/utils/utils';
import { Variant } from '@product-line/dexie';
import { useProductStore } from './use-product-store';
import Button from 'libs/ui/src/components/button/button';
import {
  sortingCompareNumberFn,
  sortingCompareStringFn,
} from '@product-line/datatable';

export const useProductVariantColumns = () => {
  const { setOpenDeleteVariantModal, setOpenEditVariantModal } =
    useProductStore();
  const columns: ColumnDef<Variant, Variant>[] = useMemo(
    () => [
      {
        id: 'title',
        header: 'Variante de Producto',
        accessorFn: (row) => row,
        sortingFn: (rowA, rowB) =>
          sortingCompareStringFn(rowA.original?.title, rowB.original?.title),
        meta: {
          filterVariant: 'text',
        },
        cell: (info) => {
          return (
            <div className="flex items-center gap-2">
              <Package2 className="h-4 w-4 text-muted-foreground" />
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
        id: 'amount',
        header: 'Precio',
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
                  setOpenEditVariantModal(true);
                }}
              >
                <Edit2 size={16} />
              </Button>
              <Button
                variant="ghost"
                size="mini"
                shape="circle"
                onClick={() => {
                  setOpenDeleteVariantModal(true);
                }}
              >
                <X size={16} />
              </Button>
            </div>
          );
        },
      },
    ],
    [setOpenDeleteVariantModal, setOpenEditVariantModal]
  );
  return { columns: columns || [] };
};

export default useProductVariantColumns;
