import DeletePrescriptionModal from '@optical-system-app/modules/prescriptions/components/modals/delete-prescription-modal';
import EditPrescriptionModal from '@optical-system-app/modules/prescriptions/components/modals/edit-prescription-modal';
import usePrescriptionColumns from '@optical-system-app/modules/prescriptions/hooks/use-prescription-columns';
import { usePrescriptionStore } from '@optical-system-app/modules/prescriptions/hooks/use-prescription-store';
import { DataTable } from '@product-line/datatable';
import { Prescription, usePrescriptionMethods } from '@product-line/dexie';
import {
  CardContainer,
  CardTitle,
  InputSearcher,
  InputSwitch,
} from '@product-line/ui';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import usePrescriptionFullColumns from '../../hooks/use-prescription-full-columns';

function PrescriptionsTable() {
  const navigate = useNavigate();
  const { columns } = usePrescriptionColumns();
  const { columns: fullColumns } = usePrescriptionFullColumns();
  const { prescriptions } = usePrescriptionMethods();

  const {
    currentPrescription,
    setCurrentPrescription,
    setOpenDeleteModal,
    setOpenEditModal,
  } = usePrescriptionStore();

  const [search, setSearch] = useState<string>('');
  const [showFullColumns, setShowFullColumns] = useState<boolean>(false);

  const filteredData = useCallback(
    (data: Prescription[]) => {
      if (!search) return data;
      return data?.filter(
        (prescription) =>
          prescription?.receiptNumber
            ?.toString()
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          prescription?.customer?.name
            ?.toString()
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          prescription?.customer?.lastName
            ?.toString()
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    },
    [search]
  );

  const data = filteredData(prescriptions || []);

  return (
    <>
      <CardContainer>
        <CardTitle title="Buscador" className="mt-6">
          <DataTable
            data={data}
            tableId={'prescriptions'}
            columns={showFullColumns ? fullColumns : columns}
            border
            pagination={{
              showPagination: true,
              pageSize: 10,
              pageIndex: 0,
              takeDefaultPagination: true,
              rowsInfo: true,
            }}
            headerOptions={{
              enableDragColumns: false,
              headerContainer: (
                <div className="flex justify-between items-center w-full !h-20 max-h-20 p-4">
                  <InputSearcher
                    placeholder="Buscar por número de ficha"
                    className="w-full max-w-80"
                    value={search}
                    onChange={(value) => setSearch(value as string)}
                  />
                  <InputSwitch
                    label="Mostrar todas las columnas"
                    checked={showFullColumns}
                    onChange={() => setShowFullColumns(!showFullColumns)}
                  />
                </div>
              ),
            }}
            stateMessage={{
              noData:
                search && data.length === 0
                  ? 'No se encontraron resultados'.toLocaleUpperCase()
                  : 'No hay fichas registradas'.toLocaleUpperCase(),
              noDataDescription:
                search && data.length === 0
                  ? 'Intenta con otra búsqueda.'
                  : 'Registra una ficha para comenzar. Para agregar una ficha, haz clic en el botón "Agregar". Tips: Puedes exportar tus fichas a Excel o compartirlas con otras personas.',
            }}
            setCurrentRow={(row) =>
              setCurrentPrescription(row?.original as Prescription)
            }
            rowActions={[
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
                onClick: (row) =>
                  navigate(`/prescriptions/${row?.original?.id}`),
              },
            ]}
          />
        </CardTitle>
      </CardContainer>
      <DeletePrescriptionModal />
      <EditPrescriptionModal prescriptionId={currentPrescription?.id} />
    </>
  );
}

export default PrescriptionsTable;
