import { usePrescriptionStore } from '@optical-system-app/modules/prescriptions/hooks/use-prescription-store';
import { useCustomerStore } from './use-customer-store';
import { IRowActions } from 'libs/datatable/src/common/types';
import { Customer } from 'libs/dexie/src/optical-cloud-db/types/db-types';
import { DexieCloudEntity } from 'dexie-cloud-addon/dist/modern/DexieCloudTable';
import { useNavigate } from 'react-router-dom';

const useCustomerTableActions = () => {
  const navigate = useNavigate();
  const { setOpenDeleteModal, setOpenEditModal } = useCustomerStore();
  const { setOpenCreateModal: setOpenCreatePrescriptionModal } =
    usePrescriptionStore();

  const rowActions: IRowActions<Customer & DexieCloudEntity>[] = [
    {
      action: 'edit',
      label: () => 'Editar',
      onClick: () => setOpenEditModal(true),
    },
    {
      action: 'delete',
      label: () => 'Eliminar',
      onClick: () => setOpenDeleteModal(true),
    },
    {
      action: 'view',
      label: () => 'Detalles',
      onClick: (row) => navigate(`/customers/${row?.original?.id}`),
    },
    {
      action: 'more',
      label: () => 'Agregar Ficha',
      onClick: () => setOpenCreatePrescriptionModal(true),
    },
  ];
  return { rowActions };
};

export default useCustomerTableActions;
