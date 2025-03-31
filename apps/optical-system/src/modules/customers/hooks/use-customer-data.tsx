/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCustomerMethods } from '@product-line/dexie';
import { formatCurrency } from '@product-line/features';
import { useToastStore } from '@product-line/ui';
import * as XLSX from 'xlsx';
import { useCallback } from 'react';
import { useCustomerStore } from './use-customer-store';

const useCustomerData = () => {
  const { addToast } = useToastStore();
  const { customers, getPrescriptionsByCustomerId } = useCustomerMethods();
  const { setLoading, setError } = useCustomerStore();

  const exportToExcel = useCallback(() => {
    try {
      setLoading(true);
      const data: any[] = [];
      if (!customers) return;

      customers.forEach((customer) => {
        data.push({
          Cliente: customer.name,
          Direccion: customer.address,
          Email: customer.email,
          Teléfono: customer.phone,
          Dirección: customer.address,
        });

        getPrescriptionsByCustomerId(customer.id as string).forEach(
          (prescription) => {
            data.push({
              Cliente: '',
              Direccion: '',
              Email: '',
              Teléfono: '',
              Dirección: '',
              Id: prescription?.id,
              Fecha: prescription?.date,
              Doctor: prescription?.prescriptionDetail?.doctorName,
              Saldo: formatCurrency(prescription?.balanceAmount || 0),
              'Monto Total': formatCurrency(prescription?.totalAmount || 0),
            });
          }
        );
      });
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes');
      XLSX.writeFile(workbook, 'clientes.xlsx');
    } catch (error) {
      setError('Error al exportar a Excel');
      addToast({
        id: 'export-error',
        variant: 'destructive',
        title: 'Error',
        message: 'No se pudo exportar a Excel.',
      });
    } finally {
      setLoading(false);
    }
  }, [customers, getPrescriptionsByCustomerId, setLoading, setError, addToast]);

  const exportCustomersToExcel = useCallback(() => {
    try {
      setLoading(true);
      const data: any[] = [];
      if (!customers) return;

      customers.forEach((customer) => {
        data.push({
          Nombre: customer?.name || '-',
          Apellido: customer?.lastName || '-',
          'Fecha de Nacimiento': customer?.birthDate || '-',
          Dirección: customer?.address || '-',
          'Código Postal': customer?.postalCode || '-',
          Provincia: customer?.province || '-',
          Localidad: customer?.locality || '-',
          Teléfono: customer?.phone || '-',
          Móvil: customer?.mobile || '-',
          Email: customer?.email || '-',
          Comentarios: customer?.comments || '-',
        });
      });
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes');
      XLSX.writeFile(workbook, 'clientes.xlsx');
    } catch (error) {
      setError('Error al exportar a Excel');
      addToast({
        id: 'export-error',
        variant: 'destructive',
        title: 'Error',
        message: 'No se pudo exportar a Excel.',
      });
    } finally {
      setLoading(false);
    }
  }, [customers, setLoading, setError, addToast]);

  const exportOneCustomerToExcel = useCallback(
    (customerId: string | undefined) => {
      try {
        setLoading(true);
        if (!customerId) return;
        const customer = customers?.find((c) => c.id === customerId);
        if (!customer) return;

        const data: any[] = [];
        data.push({
          Cliente: customer.name,
          Direccion: customer.address,
          Email: customer.email,
          Teléfono: customer.phone,
          Dirección: customer.address,
        });

        getPrescriptionsByCustomerId(customer.id as string).forEach(
          (prescription) => {
            data.push({
              Cliente: '',
              Direccion: '',
              Email: '',
              Teléfono: '',
              Dirección: '',
              Id: prescription?.id,
              Fecha: prescription?.date,
              Doctor: prescription?.prescriptionDetail?.doctorName,
              Saldo: formatCurrency(prescription?.balanceAmount || 0),
              'Monto Total': formatCurrency(prescription?.totalAmount || 0),
            });
          }
        );

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
          workbook,
          worksheet,
          `Cliente ${customer.name}`
        );
        XLSX.writeFile(workbook, `cliente-${customer.name}.xlsx`);
      } catch (error) {
        setError('Error al exportar a Excel');
        addToast({
          id: 'export-error',
          variant: 'destructive',
          title: 'Error',
          message: 'No se pudo exportar a Excel.',
        });
      } finally {
        setLoading(false);
      }
    },
    [customers, getPrescriptionsByCustomerId, setLoading, setError, addToast]
  );

  const shareCustomersData = useCallback(async () => {
    try {
      setLoading(true);
      if (!customers) return;

      const shareText = customers
        ?.map(
          (c) =>
            `Nombre: ${c.name}\nDirección: ${c.address}\nEmail: ${
              c.email
            }\nTeléfono: ${c.phone}\n\nFichas:\n${getPrescriptionsByCustomerId(
              c.id as string
            )
              ?.map((p) => `- ${p.date}: ${formatCurrency(p.totalAmount || 0)}`)
              .join('\n')}\n\n`
        )
        .join('\n');

      await navigator.share({
        title: 'Clientes',
        text: shareText,
      });
    } catch (error) {
      setError('Error al compartir');
      addToast({
        id: 'share-error',
        variant: 'destructive',
        title: 'Error',
        message:
          'No se pudo compartir. Intenta copiar el contenido manualmente.',
      });
    } finally {
      setLoading(false);
    }
  }, [customers, getPrescriptionsByCustomerId, setLoading, setError, addToast]);

  const shareOneCustomer = useCallback(
    async (customerId: string | undefined) => {
      try {
        setLoading(true);
        if (!customers) return;
        const customer = customers?.find((c) => c.id === customerId);
        if (!customer) return;

        const shareText = `Nombre: ${customer.name}\nDirección: ${
          customer.address
        }\nEmail: ${customer.email}\nTeléfono: ${
          customer.phone
        }\n\nFichas:\n${getPrescriptionsByCustomerId(customer.id as string)
          ?.map((p) => `- ${p.date}: ${formatCurrency(p.totalAmount || 0)}`)
          .join('\n')}\n\n`;

        await navigator.share({
          title: `Cliente ${customer.name}`,
          text: shareText,
        });
      } catch (error) {
        setError('Error al compartir');
        addToast({
          id: 'share-error',
          variant: 'destructive',
          title: 'Error',
          message:
            'No se pudo compartir. Intenta copiar el contenido manualmente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [customers, getPrescriptionsByCustomerId, setLoading, setError, addToast]
  );

  return {
    customers,
    getPrescriptionsByCustomerId,
    exportToExcel,
    exportCustomersToExcel,
    exportOneCustomerToExcel,
    shareCustomersData,
    shareOneCustomer,
  };
};

export default useCustomerData;
