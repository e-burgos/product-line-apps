import { useCallback } from 'react';
import { db } from '../db';
import { Customer } from '../types/db-types';
import { useToastStore } from 'libs/ui/src/hooks';
import { v4 as uuidv4 } from 'uuid';
import usePrescriptionMethods from './use-prescription-methods';
import useInitCloudDB from '../auth/hooks/use-init-cloud-db';
import { useLiveQuery } from 'dexie-react-hooks';

export const useCustomerMethods = () => {
  const { addToast } = useToastStore();
  const { isLoggedIn } = useInitCloudDB();
  const { prescriptions } = usePrescriptionMethods();

  const addCustomer = async (customer: Customer) => {
    try {
      await db.customers.add({
        ...customer,
        prescriptions: [],
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

  const getCustomers = useCallback(async () => {
    try {
      const response = await db.customers.orderBy('name').toArray();
      return response;
    } catch (error) {
      console.error(error);
      return [];
    }
  }, []);

  const getLiveCustomers = useLiveQuery(
    () => db.customers.orderBy('name').toArray(),
    [isLoggedIn]
  );

  const customers = getLiveCustomers;

  const getCustomerById = useCallback(
    (customerId: string) =>
      customers?.find((customer) => customer.id === customerId),
    [customers]
  );

  const getPrescriptionsByCustomerId = (customerId: string) =>
    prescriptions?.filter((p) => p?.customer?.id === customerId) || [];

  const checkIsCustomer = (customerId: string | undefined) =>
    customers?.find((c) => c.id === customerId) ? true : false;

  return {
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomers,
    getCustomerById,
    getPrescriptionsByCustomerId,
    checkIsCustomer,
    customers,
  };
};

export default useCustomerMethods;
