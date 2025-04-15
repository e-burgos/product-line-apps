import { Customer, usePrescriptionMethods } from '@product-line/dexie';
import { formatDate } from '@product-line/features';
import { ColumnDef } from '@tanstack/react-table';
import Badge from 'libs/ui/src/components/badge';
import { CalendarDays, User } from 'lucide-react';
import { useMemo } from 'react';

export const useCustomerFullColumns = () => {
  const { getPrescriptionsByCustomerId } = usePrescriptionMethods();
  const columns: ColumnDef<Customer, Customer>[] = useMemo(
    () => [
      {
        id: 'id',
        header: 'ID',
        accessorKey: 'id',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <div className="truncate text-ellipsis">
              {info?.getValue()?.id || '-'}
            </div>
          );
        },
      },
      {
        id: 'name',
        header: 'Nombre',
        accessorKey: 'name',
        minSize: 200,
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
        minSize: 200,
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
        id: 'birthDate',
        header: 'Fecha de nacimiento',
        accessorKey: 'birthDate',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          const date = info?.getValue()?.birthDate || '';
          return (
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span>{formatDate(date) || '-'}</span>
            </div>
          );
        },
      },
      {
        id: 'address',
        header: 'Dirección',
        accessorKey: 'address',
        minSize: 200,
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
        id: 'province',
        header: 'Provincia',
        accessorKey: 'province',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return <span>{info?.getValue()?.province || '-'}</span>;
        },
      },
      {
        id: 'locality',
        header: 'Localidad',
        accessorKey: 'locality',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return <span>{info?.getValue()?.locality || '-'}</span>;
        },
      },
      {
        id: 'postalCode',
        header: 'Código Postal',
        accessorKey: 'postalCode',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return <span>{info?.getValue()?.postalCode || '-'}</span>;
        },
      },
      {
        id: 'mobile',
        header: 'Celular',
        accessorKey: 'mobile',
        minSize: 200,
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
        id: 'phone',
        header: 'Teléfono',
        accessorKey: 'phone',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return <span>{info?.getValue()?.phone || '-'}</span>;
        },
      },
      {
        id: 'email',
        header: 'Correo',
        accessorKey: 'email',
        minSize: 200,
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
        minSize: 200,
        enableHiding: false,
        enableSorting: false,
        enablePinning: false,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <Badge
              status={
                getPrescriptionsByCustomerId(info?.getValue()?.id || '')
                  ?.length > 0
                  ? 'active'
                  : 'inactive'
              }
            >
              {getPrescriptionsByCustomerId(info?.getValue()?.id || '')
                ?.length || '0'}
            </Badge>
          );
        },
      },
      {
        id: 'comments',
        header: 'Comentarios',
        accessorKey: 'comments',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span className="truncate text-ellipsis">
              {info?.getValue()?.comments || '-'}
            </span>
          );
        },
      },
    ],
    [getPrescriptionsByCustomerId]
  );
  return { columns: columns || [] };
};

export default useCustomerFullColumns;
