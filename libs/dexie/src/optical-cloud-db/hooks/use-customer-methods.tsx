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
  const { prescriptions, deleteBulkPrescriptions } = usePrescriptionMethods();

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
      const prescriptions = getPrescriptionsByCustomerId(customerId);

      if (prescriptions.length > 0) {
        await deleteBulkPrescriptions(prescriptions);
      }

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

  const addBulkCustomers = async (customers: Customer[]) => {
    try {
      await db.customers.bulkAdd(customers);
      addToast({
        id: 'customer-created',
        title: 'Clientes Masivos',
        message: 'Los clientes se han agregado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false };
    } catch (e) {
      console.error(e);
      addToast({
        id: 'customer-error',
        title: 'Error',
        message: 'No se pudo agregar clientes masivos.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true };
    }
  };

  const updateBulkCustomers = async (customers: Customer[]) => {
    try {
      await db.customers.bulkPut(customers);
      addToast({
        id: 'customer-updated',
        title: 'Clientes Masivos',
        message: 'Los clientes se han actualizado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false };
    } catch (e) {
      console.error(e);
      addToast({
        id: 'customer-error',
        title: 'Error',
        message: 'No se pudo actualizar clientes masivos.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true };
    }
  };

  const deleteBulkCustomers = async (customers: Customer[]) => {
    try {
      await db.customers.bulkDelete(customers.map((c) => c.id));
      addToast({
        id: 'customer-deleted',
        title: 'Clientes Masivos',
        message: 'Los clientes se han eliminado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false };
    } catch (e) {
      console.error(e);
      addToast({
        id: 'customer-error',
        title: 'Error',
        message: 'No se pudo eliminar clientes masivos.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true };
    }
  };

  return {
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomers,
    getCustomerById,
    getPrescriptionsByCustomerId,
    checkIsCustomer,
    addBulkCustomers,
    updateBulkCustomers,
    deleteBulkCustomers,
    customers,
  };
};

export default useCustomerMethods;
