import Layout from '@optical-system-app/components/layout';
import { Prescription } from '@optical-system-app/lib/db';
import AddPrescriptionModal from '@optical-system-app/modules/prescriptions/components/modals/add-prescription-modal';
import DeletePrescriptionModal from '@optical-system-app/modules/prescriptions/components/modals/delete-customer-modal';
import EditPrescriptionModal from '@optical-system-app/modules/prescriptions/components/modals/edit-prescription-modal';
import usePrescriptionColumns from '@optical-system-app/modules/prescriptions/hooks/use-prescription-columns';
import usePrescriptionData from '@optical-system-app/modules/prescriptions/hooks/use-prescription-data';
import { usePrescriptionStore } from '@optical-system-app/modules/prescriptions/hooks/use-prescription-store';
import { DataTable } from '@product-line/datatable';
import Button from 'libs/ui/src/components/button/button';
import CardContainer from 'libs/ui/src/components/forms/card-container';
import CardTitle from 'libs/ui/src/components/forms/card-title';
import InputSearcher from 'libs/ui/src/components/forms/input-searcher';
import { ReceiptText, Download, Share2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PrescriptionsPage() {
  const navigate = useNavigate();
  const { columns } = usePrescriptionColumns();
  const { prescriptions } = usePrescriptionData();
  const {
    currentPrescription,
    setCurrentPrescription,
    setOpenDeleteModal,
    setOpenEditModal,
  } = usePrescriptionStore();

  const [search, setSearch] = useState<string>('');

  const filterData = () => {
    if (!search) return prescriptions;
    if (prescriptions)
      return prescriptions?.filter((prescription) => {
        return prescription?.receiptNumber
          ?.toString()
          .includes(search.toLowerCase());
      });
    return [];
  };

  return (
    <Layout
      header={{
        title: 'Fichas de Servicio',
        titleIcon: <ReceiptText className="h-6 w-6" />,
        headerContent: (
          <>
            <Button
              variant="ghost"
              size="small"
              shape="rounded"
              //onClick={null}
              title="Exportar a Excel"
              className="p-2"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="small"
              shape="rounded"
              //onClick={shareData}
              title="Compartir"
              className="p-2"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <AddPrescriptionModal />
          </>
        ),
      }}
    >
      <CardContainer className="">
        <CardTitle title="Buscador" className="mt-6">
          <DataTable
            tableId={'prescriptions'}
            data={filterData() || []}
            columns={columns}
            border
            pagination={{
              showPagination: true,
              pageSize: 10,
              pageIndex: 0,
              takeDefaultPagination: true,
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
                </div>
              ),
            }}
            stateMessage={{
              noData:
                search && filterData()
                  ? 'No se encontraron resultados'.toLocaleUpperCase()
                  : 'No hay fichas registradas'.toLocaleUpperCase(),
              noDataDescription:
                search && filterData()
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
                onClick: () =>
                  navigate(`/prescriptions/${currentPrescription?.id}`),
              },
            ]}
          />
        </CardTitle>
      </CardContainer>
      <DeletePrescriptionModal />
      <EditPrescriptionModal hideButton />
    </Layout>
  );
}

export default PrescriptionsPage;
