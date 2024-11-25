import { ColumnDef } from '@tanstack/react-table';
import { Package2 } from 'lucide-react';
import { useMemo } from 'react';
import { Variant } from '@product-manager-app/lib/db';
import { formatCurrency } from '@product-manager-app/lib/utils';
import DeleteVariant from '../components/modals/delete-variant';
import EditVariantModal from '../components/modals/edit-variant-modal';

const useProductVariantColumns = () => {
  const columns: ColumnDef<Variant, Variant>[] = useMemo(
    () => [
      {
        id: 'title',
        header: 'Variante',
        enablePinning: false,
        accessorFn: (row) => row,
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
        id: 'amount',
        header: 'Precio',
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
              <DeleteVariant variant={info?.getValue()} />
              <EditVariantModal variant={info?.getValue()} />
            </div>
          );
        },
      },
    ],
    []
  );
  return { columns: columns || [] };
};

export default useProductVariantColumns;
