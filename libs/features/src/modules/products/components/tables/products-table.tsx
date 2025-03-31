import { FC, useState } from 'react';
import { DataTable } from '@product-line/datatable';
import { useProductStore } from '../../hooks/use-product-store';
import { useProductMethods } from '@product-line/dexie';
import { CreateCategoryModal } from '../modals/create-category-modal';
import { CreateSubCategoryModal } from '../modals/create-subcategory-modal';
import Button from 'libs/ui/src/components/button';
import { Plus } from 'lucide-react';
import useProductColumns from '../../hooks/use-product-columns';
import CardContainer from 'libs/ui/src/components/forms/card-container';
import CardTitle from 'libs/ui/src/components/forms/card-title';
import InputSearcher from 'libs/ui/src/components/forms/input-searcher';
import useWindowSize from 'react-use/lib/useWindowSize';
import useProductTableActions from '../../hooks/use-product-table-actions';
import { DeleteProductModal } from '../modals/delete-product-modal';
import EditProductModal from '../modals/edit-product-modal';

export const ProductsTable: FC = () => {
  const { width } = useWindowSize();
  const { products } = useProductMethods();
  const { columns } = useProductColumns();
  const { rowActions } = useProductTableActions();
  const {
    setCurrentProduct,
    setOpenCreateCategoryModal,
    setOpenCreateSubCategoryModal,
  } = useProductStore();

  const [search, setSearch] = useState<string>('');

  const filterData = () => {
    if (!search) return products;
    if (products)
      return products?.filter((product) => {
        return product?.title
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
            tableId={'products'}
            data={products || []}
            columns={columns}
            border={true}
            pagination={{
              showPagination: true,
              pageIndex: 0,
              pageSize: 5,
              takeDefaultPagination: true,
            }}
            headerOptions={{
              enableDragColumns: true,
              enablePinLeftColumns: true,
              enablePinRightColumns: false,
              headerContainer: (
                <div className="flex justify-between items-center w-full !h-20 max-h-20 p-4">
                  <InputSearcher
                    placeholder="Buscar por nombre de producto"
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
                        {width > 700 && 'SubCategoría'}
                      </div>
                    </Button>
                  </div>
                </div>
              ),
            }}
            stateMessage={{
              noData:
                search && filterData()
                  ? 'No se encontraron resultados'.toLocaleUpperCase()
                  : 'No hay productos registrados'.toLocaleUpperCase(),
              noDataDescription:
                search && filterData()
                  ? 'Intenta con otra búsqueda.'
                  : 'Registra un producto para comenzar a agregar variantes. Para agregar un producto, haz clic en el botón "Agregar". Tips: Puedes exportar los productos a Excel o compartirlos con otras personas.',
            }}
            setCurrentRow={(row) => setCurrentProduct(row?.original)}
            rowActions={rowActions}
          />
        </CardTitle>
      </CardContainer>
      <DeleteProductModal />
      <EditProductModal />
      <CreateCategoryModal />
      <CreateSubCategoryModal />
    </div>
  );
};
