import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Customer } from '../types/db-types';
import { useToastStore } from 'libs/ui/src/hooks';
import { v4 as uuidv4 } from 'uuid';
import { useCallback } from 'react';

export const useCustomerMethods = () => {
  const { addToast } = useToastStore();

  const addCustomer = async (customer: Customer) => {
    try {
      await db.customers.add({
        ...customer,
        id: uuidv4(),
      });
      addToast({
        id: 'customer-created',
        title: 'Cliente creado',
        message: 'El cliente se ha creado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false, customer };
    } catch (error) {
      console.error(error);
      addToast({
        id: 'customer-error',
        title: 'Error',
        message: 'No se pudo crear el cliente.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true, customer: null };
    }
  };

  const updateCustomer = async (customer: Customer) => {
    try {
      await db.customers.update(customer.id, {
        ...customer,
      });
      addToast({
        id: 'customer-updated',
        title: 'Cliente actualizado',
        message: 'El cliente se ha actualizado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false, customer };
    } catch (error) {
      console.error(error);
      addToast({
        id: 'customer-error',
        title: 'Error',
        message: 'No se pudo crear el cliente.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true, customer: null };
    }
  };

  const deleteCustomer = async (customerId: string) => {
    try {
      await db.prescriptions.where('customerId').equals(customerId).delete();
      await db.customers.delete(customerId);
      addToast({
        id: 'customer-deleted',
        title: 'Cliente eliminado',
        message: 'El cliente se ha eliminado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false };
    } catch (error) {
      console.error(error);
      addToast({
        id: 'customer-error',
        title: 'Error',
        message: 'No se pudo eliminar el cliente.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true };
    }
  };

  const customers = useLiveQuery(() => db.customers.orderBy('name').toArray());

  const getCustomerById = useCallback(
    (customerId: string) =>
      customers?.find((customer) => customer.id === customerId),
    [customers]
  );

  return {
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerById,
    customers,
  };
};

export default useCustomerMethods;
