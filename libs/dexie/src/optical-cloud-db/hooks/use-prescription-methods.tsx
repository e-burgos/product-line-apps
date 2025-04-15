import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Customer, Prescription } from '../types/db-types';
import { useToastStore } from 'libs/ui/src/hooks';
import { v4 as uuidv4 } from 'uuid';
import { useCallback } from 'react';

export const usePrescriptionMethods = () => {
  const { addToast } = useToastStore();

  const addPrescription = async (prescription: Prescription) => {
    try {
      if (
        !prescription.customer ||
        !prescription.crystalSpecs ||
        !prescription.prescriptionPayment ||
        !prescription.prescriptionDetail
      ) {
        throw new Error('Missing required related entities');
      }
      // Add prescription
      await db.prescriptions.add({
        ...prescription,
        id: uuidv4(),
      });

      if (prescription.customer) {
        await db.customers.update(prescription.customer.id, {
          ...prescription.customer,
          prescriptions: [
            ...(prescription?.customer?.prescriptions || []),
            prescription,
          ],
        });
      }

      addToast({
        id: 'prescription-created',
        title: 'Ficha creada',
        message: 'La ficha se ha creado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false, prescription };
    } catch (e) {
      console.error(e);
      addToast({
        id: 'prescription-error',
        title: 'Error',
        message: 'No se pudo crear la ficha.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true, prescription: null };
    }
  };

  const updatePrescription = async (
    prescription: Prescription,
    lastCustomer: Customer
  ) => {
    try {
      if (
        !prescription.customer ||
        !prescription.crystalSpecs ||
        !prescription.prescriptionPayment ||
        !prescription.prescriptionDetail
      ) {
        throw new Error('Missing required related entities');
      }

      // Update prescription
      await db.prescriptions.update(prescription.id, {
        ...prescription,
      });

      if (lastCustomer.id !== prescription.customer?.id) {
        if (lastCustomer) {
          await db.customers.update(lastCustomer.id, {
            ...lastCustomer,
            prescriptions: [
              ...(lastCustomer?.prescriptions || []).filter(
                (p) => p.id !== prescription.id
              ),
            ],
          });
        }
      }

      if (prescription.customer) {
        await db.customers.update(prescription.customer.id, {
          ...prescription.customer,
          prescriptions: [
            ...(prescription?.customer?.prescriptions || []).filter(
              (p) => p.id !== prescription.id
            ),
            prescription,
          ],
        });
      }

      addToast({
        id: 'prescription-updated',
        title: 'Ficha actualizada',
        message: 'La ficha se ha actualizado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false, prescription };
    } catch (e) {
      console.error(e);
      addToast({
        id: 'prescription-error',
        title: 'Error',
        message: 'No se pudo actualizar la ficha.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true, prescription: null };
    }
  };

  const deletePrescription = async (prescriptionId: string) => {
    try {
      // Delete prescription
      await db.prescriptions.delete(prescriptionId);

      addToast({
        id: 'prescription-deleted',
        title: 'Ficha eliminada',
        message: 'La ficha se ha eliminado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false };
    } catch (e) {
      console.error(e);
      addToast({
        id: 'prescription-error',
        title: 'Error',
        message: 'No se pudo eliminar la ficha.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true };
    }
  };

  const prescriptions = useLiveQuery(
    () => db.prescriptions.orderBy('receiptNumber').toArray() || []
  );

  const getPrescriptionsByCustomerId = useCallback(
    (customerId: string) => {
      return (
        prescriptions?.filter(
          (prescription) => prescription.customer?.id === customerId
        ) || []
      );
    },
    [prescriptions]
  );

  const getPrescriptionById = useCallback(
    (id: string) => {
      const prescription = prescriptions?.find((p) => p.id === id);
      if (!prescription) return null;
      return prescription;
    },
    [prescriptions]
  );

  const checkIsPrescription = (prescriptionId: string) =>
    prescriptions?.find((p) => p.id === prescriptionId) ? true : false;

  const addBulkPrescriptions = async (prescriptions: Prescription[]) => {
    try {
      await db.prescriptions.bulkAdd(prescriptions);
      addToast({
        id: 'prescription-created',
        title: 'Fichas Masivas',
        message: 'Las fichas se han agregado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false };
    } catch (e) {
      console.error(e);
      addToast({
        id: 'prescription-error',
        title: 'Error',
        message: 'No se pudo agregar fichas masivas.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true };
    }
  };

  const addTransactionBulkPrescriptions = async (
    prescriptions: Prescription[]
  ) => {
    try {
      await db.transaction('rw', db.prescriptions, async () => {
        await db.prescriptions.bulkAdd(prescriptions);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const addSimplePrescription = async (prescription: Prescription) => {
    try {
      const response = await db.prescriptions.add(prescription);
      console.log('response', response);
      return response;
    } catch (e) {
      console.error(e);
    }
  };

  const updateBulkPrescriptions = async (prescriptions: Prescription[]) => {
    try {
      await db.prescriptions.bulkPut(prescriptions);
      addToast({
        id: 'prescription-updated',
        title: 'Fichas Masivas',
        message: 'Las fichas se han actualizado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false };
    } catch (e) {
      console.error(e);
      addToast({
        id: 'prescription-error',
        title: 'Error',
        message: 'No se pudo actualizar fichas masivas.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true };
    }
  };

  const deleteBulkPrescriptions = async (prescriptions: Prescription[]) => {
    try {
      await db.prescriptions.bulkDelete(prescriptions.map((p) => p.id));
      addToast({
        id: 'prescription-deleted',
        title: 'Fichas Masivas',
        message: 'Las fichas se han eliminado correctamente.',
        variant: 'success',
      });
      return { isSuccess: true, isError: false };
    } catch (e) {
      console.error(e);
      addToast({
        id: 'prescription-error',
        title: 'Error',
        message: 'No se pudo eliminar fichas masivas.',
        variant: 'destructive',
      });
      return { isSuccess: false, isError: true };
    }
  };

  return {
    addPrescription,
    updatePrescription,
    deletePrescription,
    getPrescriptionsByCustomerId,
    getPrescriptionById,
    checkIsPrescription,
    addBulkPrescriptions,
    addSimplePrescription,
    updateBulkPrescriptions,
    deleteBulkPrescriptions,
    addTransactionBulkPrescriptions,
    prescriptions,
  };
};

export default usePrescriptionMethods;
