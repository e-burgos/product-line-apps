import { DataTable } from '@product-line/datatable';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePrescriptionStore } from '@optical-system-app/modules/prescriptions/hooks/use-prescription-store';
import AddPrescriptionModal from '@optical-system-app/modules/prescriptions/components/modals/add-prescription-modal';
import EditPrescriptionModal from '@optical-system-app/modules/prescriptions/components/modals/edit-prescription-modal';
import DeletePrescriptionModal from '@optical-system-app/modules/prescriptions/components/modals/delete-prescription-modal';
import useCustomerPrescriptionsColumns from '../hooks/use-customer-prescriptions-columns';
import {
  Customer,
  Prescription,
  useCustomerMethods,
  usePrescriptionMethods,
} from '@product-line/dexie';
import useCustomerPrescriptionsTableActions from '../hooks/use-customer-prescriptions-table-actions';

function CustomerPrescriptionsTable() {
  const { getCustomerById } = useCustomerMethods();
  const { columns } = useCustomerPrescriptionsColumns();
  const { rowActions } = useCustomerPrescriptionsTableActions();
  const { currentPrescription, setCurrentPrescription } =
    usePrescriptionStore();
  const { getPrescriptionsByCustomerId } = usePrescriptionMethods();

  const { id } = useParams();
  const customerId = id;
  const [customer, setCustomer] = useState<Customer | null>();
  const customerPrescriptions = getPrescriptionsByCustomerId(
    customerId as string
  );

  useEffect(() => {
    if (customerId) setCustomer(getCustomerById(customerId));
  }, [customerId, getCustomerById]);

  return (
    <>
      <DataTable
        tableId={'customer-prescriptions'}
        data={customerPrescriptions || []}
        columns={columns}
        border
        pagination={{
          showPagination: true,
          pageSize: 5,
          pageIndex: 0,
          takeDefaultPagination: true,
        }}
        headerOptions={{
          enableDragColumns: false,
          headerContainer: (
            <div className="flex justify-end items-center w-full !h-20 max-h-20 p-4">
              <AddPrescriptionModal
                customerData={customer as Customer}
                type="create"
              />
            </div>
          ),
        }}
        stateMessage={{
          noData: 'No hay fichas registradas'.toLocaleUpperCase(),
          noDataDescription:
            'Para agregar una nueva ficha, haz clic en el botón "Agregar".',
        }}
        setCurrentRow={(row) =>
          setCurrentPrescription(row?.original as Prescription)
        }
        rowActions={rowActions}
      />
      <DeletePrescriptionModal />
      <EditPrescriptionModal prescriptionId={currentPrescription?.id} />
    </>
  );
}

export default CustomerPrescriptionsTable;
