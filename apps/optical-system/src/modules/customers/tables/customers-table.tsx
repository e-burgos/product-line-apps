import { useCustomerStore } from '@optical-system-app/modules/customers/hooks/use-customer-store';
import { useCustomerColumns } from '@optical-system-app/modules/customers/hooks/use-customer-columns';
import useCustomerData from '@optical-system-app/modules/customers/hooks/use-customer-data';
import { DataTable } from '@product-line/datatable';
import DeleteCustomerModal from '@optical-system-app/modules/customers/components/modals/delete-customer-modal';
import EditCustomerModal from '@optical-system-app/modules/customers/components/modals/edit-customer-modal';
import CardContainer from 'libs/ui/src/components/forms/card-container';
import InputSearcher from 'libs/ui/src/components/forms/input-searcher';
import { useState } from 'react';
import CardTitle from 'libs/ui/src/components/forms/card-title';
import AddPrescriptionModal from '@optical-system-app/modules/prescriptions/components/modals/add-prescription-modal';
import { Customer } from '@product-line/dexie';
import useCustomerTableActions from '../hooks/use-customer-table-actions';

function CustomersTable() {
  const { setCurrentCustomer } = useCustomerStore();
  const { columns } = useCustomerColumns();
  const { customers } = useCustomerData();
  const { rowActions } = useCustomerTableActions();

  const [search, setSearch] = useState<string>('');

  const filterData = () => {
    if (!search) return customers;
    if (customers)
      return customers?.filter((customer) => {
        return (
          customer?.name.toLowerCase().includes(search.toLowerCase()) ||
          customer?.lastName.toLowerCase().includes(search.toLowerCase()) ||
          customer?.email.toLowerCase().includes(search.toLowerCase()) ||
          (customer?.phone &&
            customer?.phone.toLowerCase().includes(search.toLowerCase()))
        );
      });
    return [];
  };

  return (
    <>
      <CardContainer>
        <CardTitle title="Buscador" className="mt-6">
          <DataTable
            tableId={'customers'}
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
                </div>
              ),
            }}
            stateMessage={{
              noData:
                search && filterData()
                  ? 'No se encontraron resultados'.toLocaleUpperCase()
                  : 'No hay clientes registrados'.toLocaleUpperCase(),
              noDataDescription:
                search && filterData()
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
