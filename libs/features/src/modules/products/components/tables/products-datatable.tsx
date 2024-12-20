import { DataTable } from '@product-line/datatable';
import { Product, useProductMethods } from '@product-line/dexie';
import { useProductStore } from '../../hooks/use-product-store';
import useProductColumns from '../../hooks/use-product-columns';
import useProductData from '../../hooks/use-product-data';
import ProductVariantsDatatable from './product-variants-datatable';
import EditProductModal from '../modals/edit-product-modal';
import DeleteProduct from '../modals/delete-product';
import AddVariantModal from '../modals/add-variant-modal';
import { CardContainer, CardTitle, InputSearcher } from '@product-line/ui';
import { useState } from 'react';

export function ProductsDataTable() {
  const {
    setCurrentProduct,
    setOpenDeleteModal,
    setOpenEditModal,
    setOpenCreateVariantModal,
  } = useProductStore();
  const { columns } = useProductColumns();
  const { products } = useProductMethods();
  const { shareOneProduct, exportOneProductToExcel } = useProductData();

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
    <>
      <CardContainer>
        <CardTitle title="Buscador" className="mt-6">
          <DataTable
            tableId={'products'}
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
                    placeholder="Buscar por nombre de producto"
                    className="w-full max-w-80"
                    value={search}
                    onChange={(value) => setSearch(value as string)}
                  />
                </div>
              ),
            }}
            pagination={{
              showPagination: true,
              pageSize: 5,
              pageIndex: 0,
              takeDefaultPagination: true,
            }}
            renderSubComponent={(row) => {
              const product = (row?.row?.original as Product) || {};
              return (
                <ProductVariantsDatatable productId={product?.id as string} />
              );
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
            setCurrentRow={(row) => setCurrentProduct(row?.original as Product)}
            rowActions={[
              {
                action: 'edit',
                label: () => 'Editar',
                onClick: () => setOpenEditModal(true),
              },
              {
                action: 'delete',
                label: () => 'Borrar',
                onClick: () => setOpenDeleteModal(true),
              },
              {
                action: 'more',
                label: () => 'Agregar Variante',
                onClick: () => setOpenCreateVariantModal(true),
              },
              {
                action: 'download',
                label: () => 'Exportar a Excel',
                onClick: (row) => exportOneProductToExcel(row?.original?.id),
              },
              {
                action: 'download',
                label: () => 'Compartir',
                onClick: (row) => shareOneProduct(row?.original?.id),
              },
            ]}
          />
        </CardTitle>
      </CardContainer>
      <EditProductModal />
      <DeleteProduct />
      <AddVariantModal />
    </>
  );
}

export default ProductsDataTable;
