/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCustomerMethods,
  usePrescriptionMethods,
} from '@product-line/dexie';
import { formatCurrency } from '@product-line/features';
import { useToastStore } from '@product-line/ui';
import * as XLSX from 'xlsx';

const useCustomerData = () => {
  const { addToast } = useToastStore();
  const { customers } = useCustomerMethods();
  const { prescriptions } = usePrescriptionMethods();

  const checkIsCustomer = (customerId: string | undefined) =>
    customers?.find((c) => c.id === customerId) ? true : false;

  const getCustomer = (customerId: string) =>
    customers?.find((c) => c.id === customerId) || null;

  const getCustomerPrescriptions = (customerId: string) =>
    prescriptions?.filter((p) => p.customerId === customerId) || [];

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

      getCustomerPrescriptions(customer.id as string).forEach(
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

    getCustomerPrescriptions(customer.id as string).forEach((prescription) => {
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
    });

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
          }\nTeléfono: ${c.phone}\n\nFichas:\n${getCustomerPrescriptions(
            c.id as string
          )
            ?.map(
              (p) =>
                `- ${p.date}: ${formatCurrency(
                  getCustomerPrescriptions(c?.id as string)[0]?.totalAmount || 0
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
    }\n\nFichas:\n${getCustomerPrescriptions(customer.id as string)
      ?.map(
        (p) =>
          `- ${p.date}: ${formatCurrency(
            getCustomerPrescriptions(customer.id as string)[0]?.totalAmount || 0
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
    exportOneCustomerToExcel,
    shareCustomersData,
    shareOneCustomer,
    getCustomer,
    checkIsCustomer,
  };
};

export default useCustomerData;
