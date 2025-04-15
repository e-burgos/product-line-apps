import { useCallback, useState } from 'react';
import { useCustomerStore } from '@optical-system-app/modules/customers/hooks/use-customer-store';
import { useCustomerColumns } from '@optical-system-app/modules/customers/hooks/use-customer-columns';
import { DataTable } from '@product-line/datatable';
import DeleteCustomerModal from '@optical-system-app/modules/customers/components/modals/delete-customer-modal';
import EditCustomerModal from '@optical-system-app/modules/customers/components/modals/edit-customer-modal';
import CardContainer from 'libs/ui/src/components/forms/card-container';
import InputSearcher from 'libs/ui/src/components/forms/input-searcher';
import CardTitle from 'libs/ui/src/components/forms/card-title';
import AddPrescriptionModal from '@optical-system-app/modules/prescriptions/components/modals/add-prescription-modal';
import { Customer, useCustomerMethods } from '@product-line/dexie';
import useCustomerTableActions from '../hooks/use-customer-table-actions';
import useCustomerFullColumns from '../hooks/use-customer-full-columns';
import InputSwitch from 'libs/ui/src/components/forms/input-switch';

function CustomersTable() {
  const { setCurrentCustomer } = useCustomerStore();
  const { columns } = useCustomerColumns();
  const { columns: fullColumns } = useCustomerFullColumns();
  const { customers } = useCustomerMethods();
  const { rowActions } = useCustomerTableActions();

  const [search, setSearch] = useState<string>('');
  const [showFullColumns, setShowFullColumns] = useState<boolean>(false);

  const filterData = useCallback(
    (data: Customer[]) => {
      if (!search) return data;
      if (data)
        return data?.filter((customer) => {
          return (
            customer?.name.toLowerCase().includes(search.toLowerCase()) ||
            customer?.lastName.toLowerCase().includes(search.toLowerCase()) ||
            customer?.email.toLowerCase().includes(search.toLowerCase()) ||
            (customer?.phone &&
              customer?.phone.toLowerCase().includes(search.toLowerCase()))
          );
        });
      return [];
    },
    [search]
  );

  const data = filterData(customers || []);

  return (
    <>
      <CardContainer>
        <CardTitle title="Buscador" className="mt-6">
          <DataTable
            tableId={'customers'}
            data={data}
            columns={showFullColumns ? fullColumns : columns}
            isLoading={customers === null}
            // isError={isError}
            border
            pagination={{
              showPagination: true,
              pageSize: 10,
              pageIndex: 0,
              takeDefaultPagination: true,
            }}
            headerOptions={{
              enableDragColumns: true,
              enableHideColumns: false,
              enablePinLeftColumns: true,
              headerContainer: (
                <div className="flex justify-between items-center w-full !h-20 max-h-20 p-4">
                  <InputSearcher
                    placeholder="Buscar por nombre, email o teléfono"
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
                  : 'No hay clientes registrados'.toLocaleUpperCase(),
              noDataDescription:
                search && data.length === 0
                  ? 'Intenta con otra búsqueda.'
                  : 'Registra un cliente para comenzar a agregar fichas. Para agregar un cliente, haz clic en el botón "Agregar". Tips: Puedes exportar los clientes a Excel o compartirlos con otras personas.',
            }}
            setCurrentRow={(row) =>
              setCurrentCustomer(row?.original as Customer)
            }
            rowActions={rowActions}
          />
        </CardTitle>
      </CardContainer>
      <DeleteCustomerModal />
      <EditCustomerModal />
      <AddPrescriptionModal hideButton type="create" />
    </>
  );
}

export default CustomersTable;
