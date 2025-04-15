import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(amount);
}

export function formatDate(date: string) {
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return '-';
  }
  return new Intl.DateTimeFormat('es-AR').format(dateObj);
}

export const convertToNumber = (value: string | number | undefined): number => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return Number(value) || 0;
  return 0;
};
