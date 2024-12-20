import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Prescription } from '../types/db-types';
import { useToastStore } from 'libs/ui/src/hooks';
import { v4 as uuidv4 } from 'uuid';
import { useCallback } from 'react';

export const usePrescriptionMethods = () => {
  const { addToast } = useToastStore();

  const addPrescription = async (prescription: Prescription) => {
    try {
      await db.prescriptions.add({
        ...prescription,
        id: uuidv4(),
      });
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

  const updatePrescription = async (prescription: Prescription) => {
    try {
      await db.prescriptions.update(prescription.id, {
        ...prescription,
      });
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

  const getPrescriptionsByCustomerId = useCallback(
    async (customerId: string) => {
      return await db.prescriptions
        .where('customerId')
        .equals(customerId)
        .toArray();
    },
    []
  );

  const prescriptions = useLiveQuery(
    () => db.prescriptions.orderBy('receiptNumber').toArray() || []
  );

  const getPrescriptionById = (id: string) =>
    prescriptions?.find(
      (prescription) => prescription.id === id
    ) as Prescription;

  return {
    addPrescription,
    updatePrescription,
    deletePrescription,
    getPrescriptionsByCustomerId,
    getPrescriptionById,
    prescriptions,
  };
};

export default usePrescriptionMethods;
