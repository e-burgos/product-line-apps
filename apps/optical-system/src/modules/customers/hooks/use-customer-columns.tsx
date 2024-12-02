import { ColumnDef } from '@tanstack/react-table';
import { User } from 'lucide-react';
import { useMemo } from 'react';
import { Customer } from '@optical-system-app/lib/db';

const useCustomerColumns = () => {
  const columns: ColumnDef<Customer, Customer>[] = useMemo(
    () => [
      {
        id: 'name',
        header: 'Nombre',
        enablePinning: false,
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
        enablePinning: false,
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
        enablePinning: false,
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
        enablePinning: false,
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
        enablePinning: false,
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
