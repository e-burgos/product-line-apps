import { ListboxOption } from '@product-line/ui';
import * as XLSX from 'xlsx';

export const PAYMENT_METHODS = {
  CASH: 'Efectivo',
  CASH_AND_CREDIT_CARD: 'Efectivo + Tarjeta',
  CREDIT_CARD: 'Tarjeta de crédito',
  DEBIT_CARD: 'Tarjeta de débito',
  TRANSFER: 'Transferencia',
  MERCADO_PAGO: 'Mercado Pago',
  CHEQUE: 'Cheque',
  OTHER: 'Otro',
};

export const PAYMENT_METHODS_LIST = [
  { name: PAYMENT_METHODS.CASH, value: PAYMENT_METHODS.CASH },
  {
    name: PAYMENT_METHODS.CASH_AND_CREDIT_CARD,
    value: PAYMENT_METHODS.CASH_AND_CREDIT_CARD,
  },
  { name: PAYMENT_METHODS.CREDIT_CARD, value: PAYMENT_METHODS.CREDIT_CARD },
  { name: PAYMENT_METHODS.DEBIT_CARD, value: PAYMENT_METHODS.DEBIT_CARD },
  { name: PAYMENT_METHODS.TRANSFER, value: PAYMENT_METHODS.TRANSFER },
  { name: PAYMENT_METHODS.MERCADO_PAGO, value: PAYMENT_METHODS.MERCADO_PAGO },
  { name: PAYMENT_METHODS.CHEQUE, value: PAYMENT_METHODS.CHEQUE },
  { name: PAYMENT_METHODS.OTHER, value: PAYMENT_METHODS.OTHER },
];

export const CREDIT_CARD_TYPES = {
  VISA: 'Visa',
  MASTERCARD: 'Mastercard',
  AMERICAN_EXPRESS: 'American Express',
  DINERS_CLUB: 'Diners Club',
  DISCOVER: 'Discover',
  NARANJA: 'Naranja',
  CABAL: 'Cabal',
  ARGENCARD: 'Argencard',
  CENCOSUD: 'Cencosud',
  NATIVA: 'Nativa',
  PATAGONIA_365: 'Patagonia 365',
  TUYA: 'Tuya',
  OTHER: 'Otra',
};

export const CREDIT_CARD_TYPES_LIST = [
  { name: CREDIT_CARD_TYPES.VISA, value: CREDIT_CARD_TYPES.VISA },
  { name: CREDIT_CARD_TYPES.MASTERCARD, value: CREDIT_CARD_TYPES.MASTERCARD },
  {
    name: CREDIT_CARD_TYPES.AMERICAN_EXPRESS,
    value: CREDIT_CARD_TYPES.AMERICAN_EXPRESS,
  },
  { name: CREDIT_CARD_TYPES.DINERS_CLUB, value: CREDIT_CARD_TYPES.DINERS_CLUB },
  { name: CREDIT_CARD_TYPES.DISCOVER, value: CREDIT_CARD_TYPES.DISCOVER },
  { name: CREDIT_CARD_TYPES.NARANJA, value: CREDIT_CARD_TYPES.NARANJA },
  { name: CREDIT_CARD_TYPES.CABAL, value: CREDIT_CARD_TYPES.CABAL },
  { name: CREDIT_CARD_TYPES.ARGENCARD, value: CREDIT_CARD_TYPES.ARGENCARD },
  { name: CREDIT_CARD_TYPES.CENCOSUD, value: CREDIT_CARD_TYPES.CENCOSUD },
  { name: CREDIT_CARD_TYPES.NATIVA, value: CREDIT_CARD_TYPES.NATIVA },
  {
    name: CREDIT_CARD_TYPES.PATAGONIA_365,
    value: CREDIT_CARD_TYPES.PATAGONIA_365,
  },
  { name: CREDIT_CARD_TYPES.TUYA, value: CREDIT_CARD_TYPES.TUYA },
  { name: CREDIT_CARD_TYPES.OTHER, value: CREDIT_CARD_TYPES.OTHER },
];

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
