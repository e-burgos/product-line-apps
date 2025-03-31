import { Customer } from '@product-line/dexie';
import { ColumnDef } from '@tanstack/react-table';
import Badge from 'libs/ui/src/components/badge';
import { User } from 'lucide-react';
import { useMemo } from 'react';

export const useCustomerColumns = () => {
  const columns: ColumnDef<Customer, Customer>[] = useMemo(
    () => [
      {
        id: 'name',
        header: 'Nombre',
        accessorKey: 'name',
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{info?.getValue()?.name || '-'}</span>
            </div>
          );
        },
      },
      {
        id: 'lastName',
        header: 'Apellido',
        accessorKey: 'lastName',
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <div className="flex items-center gap-2">
              <span>{info?.getValue()?.lastName || '-'}</span>
            </div>
          );
        },
      },
      {
        id: 'address',
        header: 'Dirección',
        accessorKey: 'address',
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <div className="flex items-center gap-2">
              <span>{info?.getValue()?.address || '-'}</span>
            </div>
          );
        },
      },
      {
        id: 'mobile',
        header: 'Celular',
        accessorKey: 'mobile',
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <div className="flex items-center gap-2">
              <span>{info?.getValue()?.mobile || '-'}</span>
            </div>
          );
        },
      },
      {
        id: 'email',
        header: 'Correo',
        accessorKey: 'email',
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <div className="flex items-center gap-2">
              <span>{info?.getValue()?.email || '-'}</span>
            </div>
          );
        },
      },
      {
        id: 'prescriptions',
        header: 'Recetas',
        accessorKey: 'prescriptions',
        enableHiding: false,
        enableSorting: false,
        enablePinning: false,
        size: 100,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <Badge
              status={
                info?.getValue()?.prescriptions?.length ? 'active' : 'inactive'
              }
            >
              {info?.getValue()?.prescriptions?.length || '0'}
            </Badge>
          );
        },
      },
    ],
    []
  );
  return { columns: columns || [] };
};

export default useCustomerColumns;
