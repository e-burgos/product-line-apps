import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { User, ReceiptText, CalendarDays } from 'lucide-react';
import { formatCurrency, formatDate } from '@product-line/features';
import { Prescription } from '@product-line/dexie';

const usePrescriptionFullColumns = () => {
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

      {
        id: 'doctorName',
        header: 'Doctor',
        accessorKey: 'prescriptionDetail.doctorName',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span className="truncate text-ellipsis">
              {info?.getValue()?.prescriptionDetail?.doctorName || '-'}
            </span>
          );
        },
      },
      {
        id: 'frameDesc',
        header: 'Armazón',
        accessorKey: 'prescriptionDetail.frameDesc',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span className="truncate text-ellipsis">
              {info?.getValue()?.prescriptionDetail?.frameDesc || '-'}
            </span>
          );
        },
      },
      {
        id: 'framePrice',
        header: 'Precio Armazón',
        accessorKey: 'prescriptionDetail.framePrice',
        minSize: 200,
        enableSorting: false,
        accessorFn: (row) => row,
        cell: (info) => {
          const amount = parseFloat(
            info?.getValue()?.prescriptionDetail?.framePrice?.toString() || '0'
          );
          return <span>{formatCurrency(amount)}</span>;
        },
      },
      {
        id: 'crystalDesc',
        header: 'Cristal',
        accessorKey: 'prescriptionDetail.crystalDesc',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span className="truncate text-ellipsis">
              {info?.getValue()?.prescriptionDetail?.crystalDesc || '-'}
            </span>
          );
        },
      },
      {
        id: 'crystalPrice',
        header: 'Precio Cristal',
        accessorKey: 'prescriptionDetail.crystalPrice',
        minSize: 200,
        enableSorting: false,
        accessorFn: (row) => row,
        cell: (info) => {
          const amount = parseFloat(
            info?.getValue()?.prescriptionDetail?.crystalPrice?.toString() ||
              '0'
          );
          return <span>{formatCurrency(amount)}</span>;
        },
      },
      {
        id: 'contactLensDesc',
        header: 'Lente de Contacto',
        accessorKey: 'prescriptionDetail.contactLensDesc',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span className="truncate text-ellipsis">
              {info?.getValue()?.prescriptionDetail?.contactLensDesc || '-'}
            </span>
          );
        },
      },
      {
        id: 'contactLensPrice',
        header: 'Precio Lente de Contacto',
        accessorKey: 'prescriptionDetail.contactLensPrice',
        minSize: 200,
        enableSorting: false,
        accessorFn: (row) => row,
        cell: (info) => {
          const amount = parseFloat(
            info
              ?.getValue()
              ?.prescriptionDetail?.contactLensPrice?.toString() || '0'
          );
          return <span>{formatCurrency(amount)}</span>;
        },
      },
      {
        id: 'arrangementDesc',
        header: 'Arreglo',
        accessorKey: 'prescriptionDetail.arrangementDesc',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span className="truncate text-ellipsis">
              {info?.getValue()?.prescriptionDetail?.arrangementDesc || '-'}
            </span>
          );
        },
      },
      {
        id: 'arrangementPrice',
        header: 'Precio Arreglo',
        accessorKey: 'prescriptionDetail.arrangementPrice',
        minSize: 200,
        enableSorting: false,
        accessorFn: (row) => row,
        cell: (info) => {
          const amount = parseFloat(
            info
              ?.getValue()
              ?.prescriptionDetail?.arrangementPrice?.toString() || '0'
          );
          return <span>{formatCurrency(amount)}</span>;
        },
      },
      {
        id: 'products',
        header: 'Productos',
        accessorKey: 'prescriptionDetail.products',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span className="truncate text-ellipsis">
              {info
                ?.getValue()
                ?.prescriptionDetail?.products?.map(
                  (product) => product.title
                ) || '-'}
            </span>
          );
        },
      },
      {
        id: 'subtotalAmount',
        header: 'Subtotal',
        accessorKey: 'prescriptionDetail.subtotalAmount',
        minSize: 200,
        enableSorting: false,
        accessorFn: (row) => row,
        cell: (info) => {
          const amount = parseFloat(
            info?.getValue()?.prescriptionDetail?.subtotalAmount?.toString() ||
              '0'
          );
          return <span>{formatCurrency(amount)}</span>;
        },
      },
      {
        id: 'paymentMethod',
        header: 'Método de Pago',
        accessorKey: 'prescriptionPayment.paymentMethod',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span className="truncate text-ellipsis">
              {info?.getValue()?.prescriptionPayment?.paymentMethod || '-'}
            </span>
          );
        },
      },
      {
        id: 'cashDeposit',
        header: 'Pago en Efectivo',
        accessorKey: 'prescriptionPayment.cashDeposit',
        minSize: 200,
        enableSorting: false,
        accessorFn: (row) => row,
        cell: (info) => {
          const amount = parseFloat(
            info?.getValue()?.prescriptionPayment?.cashDeposit?.toString() ||
              '0'
          );
          return <span>{formatCurrency(amount)}</span>;
        },
      },
      {
        id: 'creditCardDeposit',
        header: 'Pago con Tarjeta',
        accessorKey: 'prescriptionPayment.creditCardDeposit',
        minSize: 200,
        enableSorting: false,
        accessorFn: (row) => row,
        cell: (info) => {
          const amount = parseFloat(
            info
              ?.getValue()
              ?.prescriptionPayment?.creditCardDeposit?.toString() || '0'
          );
          return <span>{formatCurrency(amount)}</span>;
        },
      },
      {
        id: 'creditCardType',
        header: 'Tipo de Tarjeta',
        accessorKey: 'prescriptionPayment.creditCardType',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span className="truncate text-ellipsis">
              {info?.getValue()?.prescriptionPayment?.creditCardType || '-'}
            </span>
          );
        },
      },
      {
        id: 'creditCardNumber',
        header: 'Número de Tarjeta',
        accessorKey: 'prescriptionPayment.creditCardNumber',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span className="truncate text-ellipsis">
              {info?.getValue()?.prescriptionPayment?.creditCardNumber || '-'}
            </span>
          );
        },
      },
      {
        id: 'creditCardInstallments',
        header: 'Cuotas',
        accessorKey: 'prescriptionPayment.creditCardInstallments',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span className="truncate text-ellipsis">
              {info?.getValue()?.prescriptionPayment?.creditCardInstallments ||
                '-'}
            </span>
          );
        },
      },
      //     nearRightSphere: string;
      // nearRightCylinder: string;
      // nearRightAxis: string;
      // nearLeftSphere: string;
      // nearLeftCylinder: string;
      // nearLeftAxis: string;
      // farRightSphere: string;
      // farRightCylinder: string;
      // farRightAxis: string;
      // farLeftSphere: string;
      // farLeftCylinder: string;
      // farLeftAxis: string;
      {
        id: 'nearRightSphere',
        header: 'Esfera OD (cerca)',
        accessorKey: 'crystalSpecs.nearRightSphere',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span className="truncate text-ellipsis">
              {info?.getValue()?.crystalSpecs?.nearRightSphere || '-'}
            </span>
          );
        },
      },
      {
        id: 'nearRightCylinder',
        header: 'Cilindro OD (cerca)',
        accessorKey: 'crystalSpecs.nearRightCylinder',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span className="truncate text-ellipsis">
              {info?.getValue()?.crystalSpecs?.nearRightCylinder || '-'}
            </span>
          );
        },
      },
      {
        id: 'nearRightAxis',
        header: 'Eje OD (cerca)',
        accessorKey: 'crystalSpecs.nearRightAxis',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span className="truncate text-ellipsis">
              {info?.getValue()?.crystalSpecs?.nearRightAxis || '-'}
            </span>
          );
        },
      },
      {
        id: 'nearLeftSphere',
        header: 'Esfera OI (cerca)',
        accessorKey: 'crystalSpecs.nearLeftSphere',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span className="truncate text-ellipsis">
              {info?.getValue()?.crystalSpecs?.nearLeftSphere || '-'}
            </span>
          );
        },
      },
      {
        id: 'nearLeftCylinder',
        header: 'Cilindro OI (cerca)',
        accessorKey: 'crystalSpecs.nearLeftCylinder',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span className="truncate text-ellipsis">
              {info?.getValue()?.crystalSpecs?.nearLeftCylinder || '-'}
            </span>
          );
        },
      },
      {
        id: 'nearLeftAxis',
        header: 'Eje OI (cerca)',
        accessorKey: 'crystalSpecs.nearLeftAxis',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span>{info?.getValue()?.crystalSpecs?.nearLeftAxis || '-'}</span>
          );
        },
      },
      {
        id: 'farRightSphere',
        header: 'Esfera OD (lejos)',
        accessorKey: 'crystalSpecs.farRightSphere',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span className="truncate text-ellipsis">
              {info?.getValue()?.crystalSpecs?.farRightSphere || '-'}
            </span>
          );
        },
      },
      {
        id: 'farRightCylinder',
        header: 'Cilindro OD (lejos)',
        accessorKey: 'crystalSpecs.farRightCylinder',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span className="truncate text-ellipsis">
              {info?.getValue()?.crystalSpecs?.farRightCylinder || '-'}
            </span>
          );
        },
      },
      {
        id: 'farRightAxis',
        header: 'Eje OD (lejos)',
        accessorKey: 'crystalSpecs.farRightAxis',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span className="truncate text-ellipsis">
              {info?.getValue()?.crystalSpecs?.farRightAxis || '-'}
            </span>
          );
        },
      },
      {
        id: 'farLeftSphere',
        header: 'Esfera OI (lejos)',
        accessorKey: 'crystalSpecs.farLeftSphere',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span>{info?.getValue()?.crystalSpecs?.farLeftSphere || '-'}</span>
          );
        },
      },
      {
        id: 'farLeftCylinder',
        header: 'Cilindro OI (lejos)',
        accessorKey: 'crystalSpecs.farLeftCylinder',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span className="truncate text-ellipsis">
              {info?.getValue()?.crystalSpecs?.farLeftCylinder || '-'}
            </span>
          );
        },
      },
      {
        id: 'farLeftAxis',
        header: 'Eje OI (lejos)',
        accessorKey: 'crystalSpecs.farLeftAxis',
        minSize: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span className="truncate text-ellipsis">
              {info?.getValue()?.crystalSpecs?.farLeftAxis || '-'}
            </span>
          );
        },
      },
    ],
    []
  );
  return { columns: columns || [] };
};

export default usePrescriptionFullColumns;
