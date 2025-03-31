import { usePrescriptionStore } from '@optical-system-app/modules/prescriptions/hooks/use-prescription-store';
import { IRowActions } from 'libs/datatable/src/common/types';
import { Prescription } from 'libs/dexie/src/optical-cloud-db/types/db-types';
import { DexieCloudEntity } from 'dexie-cloud-addon/dist/modern/DexieCloudTable';
import { useNavigate } from 'react-router-dom';

const useCustomerPrescriptionsTableActions = () => {
  const navigate = useNavigate();
  const { setOpenDeleteModal, setOpenEditModal } = usePrescriptionStore();

  const rowActions: IRowActions<Prescription & DexieCloudEntity>[] = [
    {
      action: 'view',
      label: () => 'Detalles',
      onClick: (row) => navigate(`/prescriptions/${row.original?.id}`),
    },
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
  ];

  return { rowActions };
};

export default useCustomerPrescriptionsTableActions;
