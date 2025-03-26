import { Customer } from '@product-line/dexie';
import { ColumnDef } from '@tanstack/react-table';
import { User } from 'lucide-react';
import { useMemo } from 'react';

const useCustomerColumns = () => {
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
    ],
    []
  );
  return { columns: columns || [] };
};

export default useCustomerColumns;
