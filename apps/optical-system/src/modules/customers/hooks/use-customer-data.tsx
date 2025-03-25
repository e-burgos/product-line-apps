/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCustomerMethods } from '@product-line/dexie';
import { formatCurrency } from '@product-line/features';
import { useToastStore } from '@product-line/ui';
import * as XLSX from 'xlsx';

const useCustomerData = () => {
  const { addToast } = useToastStore();
  const { customers, getPrescriptionsByCustomerId } = useCustomerMethods();

  const exportToExcel = () => {
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
            Doctor: prescription?.doctorName,
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
  };

  const exportCustomersToExcel = () => {
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
  };

  const exportOneCustomerToExcel = (customerId: string | undefined) => {
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
          Doctor: prescription?.doctorName,
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
  };

  const shareCustomersData = async () => {
    if (!customers) return;

    const shareText = customers
      ?.map(
        (c) =>
          `Nombre: ${c.name}\nDirección: ${c.address}\nEmail: ${
            c.email
          }\nTeléfono: ${c.phone}\n\nFichas:\n${getPrescriptionsByCustomerId(
            c.id as string
          )
            ?.map(
              (p) =>
                `- ${p.date}: ${formatCurrency(
                  getPrescriptionsByCustomerId(c?.id as string)[0]
                    ?.totalAmount || 0
                )}`
            )
            .join('\n')}\n\n`
      )
      .join('\n');

    try {
      await navigator.share({
        title: 'Clientes',
        text: shareText,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      addToast({
        id: 'share-error',
        variant: 'destructive',
        title: 'Error',
        message:
          'No se pudo compartir. Intenta copiar el contenido manualmente.',
      });
    }
  };

  const shareOneCustomer = async (customerId: string | undefined) => {
    if (!customers) return;
    const customer = customers?.find((c) => c.id === customerId);
    if (!customer) return;

    const shareText = `Nombre: ${customer.name}\nDirección: ${
      customer.address
    }\nEmail: ${customer.email}\nTeléfono: ${
      customer.phone
    }\n\nFichas:\n${getPrescriptionsByCustomerId(customer.id as string)
      ?.map(
        (p) =>
          `- ${p.date}: ${formatCurrency(
            getPrescriptionsByCustomerId(customer.id as string)[0]
              ?.totalAmount || 0
          )}`
      )
      .join('\n')}\n\n`;

    try {
      await navigator.share({
        title: `Cliente ${customer.name}`,
        text: shareText,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      addToast({
        id: 'share-error',
        variant: 'destructive',
        title: 'Error',
        message:
          'No se pudo compartir. Intenta copiar el contenido manualmente.',
      });
    }
  };

  return {
    customers,
    exportToExcel,
    exportCustomersToExcel,
    exportOneCustomerToExcel,
    shareCustomersData,
    shareOneCustomer,
  };
};

export default useCustomerData;
