import { FC, useState } from 'react';
import { DataTable } from '@product-line/datatable';
import { useProductStore } from '../../hooks/use-product-store';
import { useProductMethods } from '@product-line/dexie';
import { CreateSubCategoryModal } from '../modals/create-subcategory-modal';
import Button from 'libs/ui/src/components/button';
import { Plus } from 'lucide-react';
import CardTitle from 'libs/ui/src/components/forms/card-title';
import CardContainer from 'libs/ui/src/components/forms/card-container';
import useWindowSize from 'react-use/lib/useWindowSize';
import useSubCategoryColumns from '../../hooks/use-subcategory-columns';
import InputSearcher from 'libs/ui/src/components/forms/input-searcher';
import { EditSubCategoryModal } from '../modals/edit-subcategory-modal';
import useSubCategoryTableActions from '../../hooks/use-subcategory-table-actions';
import { DeleteSubCategoryModal } from '../modals/delete-subcategory-modal';

export const SubCategoriesTable: FC = () => {
  const { width } = useWindowSize();
  const { subCategories } = useProductMethods();
  const { setOpenCreateSubCategoryModal, setCurrentSubCategory } =
    useProductStore();

  const { columns } = useSubCategoryColumns();
  const { rowActions } = useSubCategoryTableActions();

  const [search, setSearch] = useState<string>('');

  const filterData = () => {
    if (!search) return subCategories;
    if (subCategories)
      return subCategories?.filter((subCategory) => {
        return subCategory?.title
          ?.toLocaleLowerCase()
          ?.includes(search.toLowerCase());
      });
    return [];
  };

  return (
    <div className="space-y-4">
      <CardContainer>
        <CardTitle title="Buscador" className="mt-6">
          <DataTable
            tableId={'subcategories'}
            data={filterData() || []}
            columns={columns}
            border
            headerOptions={{
              enableDragColumns: false,
              enablePinLeftColumns: false,
              enablePinRightColumns: false,
              headerContainer: (
                <div className="flex justify-between items-center w-full !h-20 max-h-20 p-4">
                  <InputSearcher
                    placeholder="Buscar por nombre de subcategoría"
                    className="w-full max-w-80"
                    value={search}
                    onChange={(value) => setSearch(value as string)}
                  />
                  <div className="flex space-x-4">
                    <Button
                      variant="ghost"
                      shape="rounded"
                      size="small"
                      onClick={() => setOpenCreateSubCategoryModal(true)}
                    >
                      <div className="flex items-center">
                        <Plus
                          className={width > 700 ? 'h-4 w-4 mr-2' : 'h-6 w-6'}
                        />
                        {width > 700 && 'Subcategoría'}
                      </div>
                    </Button>
                  </div>
                </div>
              ),
            }}
            pagination={{
              showPagination: true,
              pageSize: 5,
              pageIndex: 0,
              takeDefaultPagination: true,
            }}
            stateMessage={{
              noData:
                search && filterData()
                  ? 'No se encontraron resultados'.toLocaleUpperCase()
                  : 'No hay subcategorías registradas'.toLocaleUpperCase(),
              noDataDescription:
                search && filterData()
                  ? 'Intenta con otra búsqueda.'
                  : 'Registra una subcategoría para comenzar a agregar productos. Para agregar una subcategoría, haz clic en el botón "Agregar". Tips: Puedes exportar las subcategorías a Excel o compartirlas con otras personas.',
            }}
            setCurrentRow={(row) => setCurrentSubCategory(row?.original)}
            rowActions={rowActions}
          />
        </CardTitle>
      </CardContainer>
      <CreateSubCategoryModal />
      <EditSubCategoryModal />
      <DeleteSubCategoryModal />
    </div>
  );
};
