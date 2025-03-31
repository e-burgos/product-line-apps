import { FC, useState } from 'react';
import { DataTable } from '@product-line/datatable';
import { useProductStore } from '../../hooks/use-product-store';
import { useProductMethods } from '@product-line/dexie';
import { CreateCategoryModal } from '../modals/create-category-modal';
import Button from 'libs/ui/src/components/button';
import { Plus } from 'lucide-react';
import useWindowSize from 'react-use/lib/useWindowSize';
import { useCategoryColumns } from '../../hooks/use-category-columns';
import CardTitle from 'libs/ui/src/components/forms/card-title';
import CardContainer from 'libs/ui/src/components/forms/card-container';
import InputSearcher from 'libs/ui/src/components/forms/input-searcher';
import useCategoryTableActions from '../../hooks/use-category-table-actions';
import { EditCategoryModal } from '../modals/edit-category-modal';
import { DeleteCategoryModal } from '../modals/delete-category-modal';
import useSubCategorySubCategoriesColumns from '../../hooks/use-category-subcategories-columns';

export const CategoriesTable: FC = () => {
  const { width } = useWindowSize();
  const { categories, getSubCategoriesByCategoryId } = useProductMethods();
  const { setOpenCreateCategoryModal, setCurrentCategory, currentCategory } =
    useProductStore();
  const { rowActions } = useCategoryTableActions();
  const { columns } = useCategoryColumns();
  const { columns: subColumns } = useSubCategorySubCategoriesColumns();

  const [search, setSearch] = useState<string>('');

  const filterData = () => {
    if (!search) return categories;
    if (categories)
      return categories?.filter((category) => {
        return category?.title
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
            tableId={'categories'}
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
                    placeholder="Buscar por nombre de categoría"
                    className="w-full max-w-80"
                    value={search}
                    onChange={(value) => setSearch(value as string)}
                  />
                  <div className="flex space-x-4">
                    <Button
                      variant="ghost"
                      shape="rounded"
                      size="small"
                      onClick={() => setOpenCreateCategoryModal(true)}
                    >
                      <div className="flex items-center">
                        <Plus
                          className={width > 700 ? 'h-4 w-4 mr-2' : 'h-6 w-6'}
                        />
                        {width > 700 && 'Categoría'}
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
                  : 'No hay categorías registradas'.toLocaleUpperCase(),
              noDataDescription:
                search && filterData()
                  ? 'Intenta con otra búsqueda.'
                  : 'Registra una categoría para comenzar a agregar subcategorías. Para agregar una categoría, haz clic en el botón "Agregar". Tips: Puedes exportar las categorías a Excel o compartirlas con otras personas.',
            }}
            setCurrentRow={(row) => setCurrentCategory(row?.original)}
            rowActions={rowActions}
            renderSubDataTable={{
              columns: subColumns,
              expandedColumnSize: 0,
              data:
                getSubCategoriesByCategoryId(currentCategory?.id as string) ||
                [],
            }}
          />
        </CardTitle>
      </CardContainer>
      <CreateCategoryModal />
      <EditCategoryModal />
      <DeleteCategoryModal />
    </div>
  );
};
