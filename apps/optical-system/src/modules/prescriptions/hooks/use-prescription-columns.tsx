import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { User, ReceiptText, CalendarDays } from 'lucide-react';
import { formatCurrency, formatDate } from '@product-line/features';
import { Prescription } from '@product-line/dexie';

const usePrescriptionColumns = () => {
  const columns: ColumnDef<Prescription, Prescription>[] = useMemo(
    () => [
      {
        id: 'id',
        header: 'ID',
        accessorKey: 'id',
        minSize: 100,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span className="truncate text-ellipsis">
              {info?.getValue()?.id || '-'}
            </span>
          );
        },
      },
      {
        id: 'receiptNumber',
        header: 'Número de Ficha',
        accessorKey: 'receiptNumber',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <div className="flex items-center gap-2">
              <ReceiptText className="h-4 w-4 text-muted-foreground" />
              <span>{info?.getValue()?.receiptNumber || '-'}</span>
            </div>
          );
        },
      },
      {
        id: 'date',
        header: 'Fecha',
        accessorKey: 'date',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          const date = info?.getValue()?.date;
          return (
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span>{formatDate(date) || '-'}</span>
            </div>
          );
        },
      },
      {
        id: 'customer',
        header: 'Cliente',
        accessorKey: 'customer',
        minSize: 200,
        accessorFn: (row) => row,
        size: 250,
        cell: (info) => {
          const customer = `${info?.getValue()?.customer?.name || '-'} ${
            info?.getValue()?.customer?.lastName || ''
          }`;
          return (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{customer || '-'}</span>
            </div>
          );
        },
      },
      {
        id: 'paymentMethod',
        header: 'Método de Pago',
        accessorKey: 'paymentMethod.paymentMethod',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <div className="flex items-center gap-2">
              <span>
                {info?.getValue()?.prescriptionPayment?.paymentMethod || '-'}
              </span>
            </div>
          );
        },
      },
      {
        id: 'balanceAmount',
        header: 'Saldo',
        accessorKey: 'balanceAmount',
        minSize: 200,
        enableSorting: false,
        accessorFn: (row) => row,
        cell: (info) => {
          const amount = parseFloat(
            info?.getValue()?.balanceAmount?.toString() || '0'
          );
          return (
            <div className="flex items-center gap-2">
              <span>{formatCurrency(amount)}</span>
            </div>
          );
        },
      },
      {
        id: 'totalAmount',
        header: 'Monto Total',
        accessorKey: 'totalAmount',
        enableSorting: false,
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          const amount = parseFloat(
            info?.getValue()?.totalAmount?.toString() || '0'
          );
          return (
            <div className="flex items-center gap-2">
              <span>{formatCurrency(amount)}</span>
            </div>
          );
        },
      },
      {
        id: 'description',
        header: 'Comentarios',
        accessorKey: 'description',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span className="truncate text-ellipsis">
              {info?.getValue()?.description || '-'}
            </span>
          );
        },
      },
    ],
    []
  );
  return { columns: columns || [] };
};

export default usePrescriptionColumns;
