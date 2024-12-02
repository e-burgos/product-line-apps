import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { User, ReceiptText, CalendarDays } from 'lucide-react';
import { Prescription } from '@optical-system-app/lib/db';
import useCustomerData from '@optical-system-app/modules/customers/hooks/use-customer-data';
import { formatCurrency, formatDate } from '@product-line/features';

const usePrescriptionColumns = (hideCustomerColumn?: boolean) => {
  const { getCustomer } = useCustomerData();
  const columns: ColumnDef<Prescription, Prescription>[] = useMemo(
    () => [
      {
        id: 'receiptNumber',
        header: 'Número de Ficha',
        enablePinning: false,
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
        id: 'customer',
        header: 'Cliente',
        enablePinning: false,
        accessorFn: (row) => row,
        cell: (info) => {
          const customer = getCustomer(info?.getValue()?.customerId);
          return (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{`${customer?.name} ${customer?.lastName}` || '-'}</span>
            </div>
          );
        },
        hidden: hideCustomerColumn,
      },
      {
        id: 'date',
        header: 'Fecha',
        enablePinning: false,
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
        id: 'paymentMethod',
        header: 'Método de Pago',
        enablePinning: false,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <div className="flex items-center gap-2">
              <span>{info?.getValue()?.paymentMethod || '-'}</span>
            </div>
          );
        },
      },
      {
        id: 'balanceAmount',
        header: 'Saldo',
        enablePinning: false,
        enableSorting: false,
        maxSize: 100,
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
        enablePinning: false,
        enableSorting: false,
        maxSize: 100,
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
    ],
    [getCustomer, hideCustomerColumn]
  );
  return { columns: columns || [] };
};

export default usePrescriptionColumns;
