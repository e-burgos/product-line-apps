import { DataTable } from '@product-line/datatable';
import {
  DBUserJsonModel,
  useAuthQueries,
  //usePrescriptionQueries,
  //useTokenStore,
} from '@product-line/dexie';
import CardContainer from 'libs/ui/src/components/forms/card-container';
import CardTitle from 'libs/ui/src/components/forms/card-title';
import InputSearcher from 'libs/ui/src/components/forms/input-searcher';
import { FC, useState } from 'react';
import useUsersColumns from '../../hooks/use-users-columns';
import { useUserStore } from '../../hooks/use-user-store';
import DeactivateUserModal from '../modals/deactivate-user-modal';

const UsersTable: FC = () => {
  const { columns } = useUsersColumns();
  const { getAllUsers } = useAuthQueries();
  const { setCurrentUser, setOpenDeactivateUserModal } = useUserStore();

  // const { useGetUserPrescriptions, useGetAllUserPrescriptions } =
  //   usePrescriptionQueries();

  // const { data: userPrescriptions } = useGetUserPrescriptions(
  //   'siochanavision@hotmail.com'
  // );
  // console.log('userPrescriptions', userPrescriptions?.data);

  // const { data: allUserPrescriptions } = useGetAllUserPrescriptions();
  // console.log('allUserPrescriptions', allUserPrescriptions?.data);

  const [search, setSearch] = useState<string>('');

  const users = getAllUsers?.data?.data?.data;

  const filterData = () => {
    if (!search) return users;
    if (users)
      return users?.filter((users) => {
        return users?.userId
          ?.toLocaleLowerCase()
          .includes(search.toLowerCase());
      });
    return [];
  };

  return (
    <>
      <CardContainer>
        <CardTitle title="Buscador" className="mt-6">
          <DataTable
            tableId={'users-table'}
            data={filterData() || []}
            columns={columns}
            border
            isLoading={getAllUsers.isLoading}
            isError={getAllUsers.isError}
            isFetching={getAllUsers.isFetching}
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
                    placeholder="Buscar por email"
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
                  : 'No hay usuarios'.toLocaleUpperCase(),
              noDataDescription:
                search && filterData()
                  ? 'Intenta con otra búsqueda.'
                  : 'No hay usuarios registrados.',
            }}
            setCurrentRow={(row) =>
              setCurrentUser(row?.original as DBUserJsonModel)
            }
            rowActions={[
              {
                action: 'edit',
                label: () => 'Desactivar',
                onClick: () => setOpenDeactivateUserModal(true),
              },
              // {
              //   action: 'delete',
              //   label: () => 'Eliminar',
              //   onClick: () => setOpenDeleteModal(true),
              // },
              // {
              //   action: 'view',
              //   label: () => 'Detalles',
              //   onClick: () =>
              //     navigate(`/prescriptions/${currentPrescription?.id}`),
              // },
            ]}
          />
        </CardTitle>
      </CardContainer>
      <DeactivateUserModal />
    </>
  );
};

export default UsersTable;
