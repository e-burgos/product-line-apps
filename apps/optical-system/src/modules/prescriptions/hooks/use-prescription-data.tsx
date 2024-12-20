import { ListboxOption } from '@product-line/ui';
import * as XLSX from 'xlsx';

const usePrescriptionData = () => {
  //const { addToast } = useToastStore();

  const creditCardList: ListboxOption[] = [
    { name: 'Visa', value: 'Visa' },
    { name: 'Mastercard', value: 'Mastercard' },
    { name: 'American Express', value: 'American Express' },
    { name: 'Diners Club', value: 'Diners Club' },
    { name: 'Discover', value: 'Discover' },
    { name: 'Naranja', value: 'Naranja' },
    { name: 'Cabal', value: 'Cabal' },
    { name: 'Argencard', value: 'Argencard' },
    { name: 'Cencosud', value: 'Cencosud' },
    { name: 'Nativa', value: 'Nativa' },
    { name: 'Patagonia 365', value: 'Patagonia 365' },
    { name: 'Tuya', value: 'Tuya' },
    { name: 'Otra', value: 'Otra' },
  ];

  const paymentMethodList: ListboxOption[] = [
    { name: 'Efectivo', value: 'Efectivo' },
    { name: 'Efectivo + Tarjeta', value: 'Efectivo + Tarjeta' },
    { name: 'Tarjeta de crédito', value: 'Tarjeta de crédito' },
    { name: 'Tarjeta de débito', value: 'Tarjeta de débito' },
    { name: 'Transferencia', value: 'Transferencia' },
    { name: 'Mercado Pago', value: 'Mercado Pago' },
    { name: 'Cheque', value: 'Cheque' },
    { name: 'Otro', value: 'Otro' },
  ];

  return {
    creditCardList,
    paymentMethodList,
  };
};

export default usePrescriptionData;
