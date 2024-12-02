/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Customers, db } from '@optical-system-app/lib/db';
import { formatCurrency } from '@product-line/features';
import { useToastStore } from '@product-line/ui';
import { useLiveQuery } from 'dexie-react-hooks';
import * as XLSX from 'xlsx';

const useCustomerData = () => {
  const { addToast } = useToastStore();

  const customers: Customers = useLiveQuery(
    () => db.customers?.toArray() || []
  );

  const prescriptions = useLiveQuery(() => db.prescriptions?.toArray() || []);

  const checkIsCustomer = (customerId: number) =>
    customers?.find((c) => c.id === customerId) ? true : false;

  const getCustomer = (customerId: number) =>
    customers?.find((c) => c.id === customerId) || null;

  const getCustomerPrescriptions = (customerId: number | undefined) =>
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

      getCustomerPrescriptions(customer.id).forEach((prescription) => {
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
    });
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes');
    XLSX.writeFile(workbook, 'clientes.xlsx');
  };

  const exportOneCustomerToExcel = (customerId: number | undefined) => {
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

    getCustomerPrescriptions(customer.id).forEach((prescription) => {
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
          }\nTeléfono: ${c.phone}\n\nFichas:\n${getCustomerPrescriptions(c.id)
            ?.map(
              (p) =>
                `- ${p.date}: ${formatCurrency(
                  getCustomerPrescriptions(c?.id)[0]?.totalAmount || 0
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

  const shareOneCustomer = async (customerId: number | undefined) => {
    if (!customers) return;
    const customer = customers?.find((c) => c.id === customerId);
    if (!customer) return;

    const shareText = `Nombre: ${customer.name}\nDirección: ${
      customer.address
    }\nEmail: ${customer.email}\nTeléfono: ${
      customer.phone
    }\n\nFichas:\n${getCustomerPrescriptions(customer.id)
      ?.map(
        (p) =>
          `- ${p.date}: ${formatCurrency(
            getCustomerPrescriptions(customer.id)[0]?.totalAmount || 0
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
