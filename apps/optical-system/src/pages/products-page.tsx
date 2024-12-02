import Layout from '@optical-system-app/components/layout';
import { DataTable } from '@product-line/datatable';
import {
  AddProductModal,
  AddVariantModal,
  DeleteProduct,
  EditProductModal,
  Product,
  ProductVariantsDatatable,
  useProductColumns,
  useProductData,
  useProductStore,
} from '@product-line/features';
import { CardContainer } from '@product-line/ui';
import Button from 'libs/ui/src/components/button/button';
import { Download, Package2Icon, Share2 } from 'lucide-react';

function ProductsPage() {
  const {
    setCurrentProduct,
    setOpenDeleteModal,
    setOpenEditModal,
    setOpenCreateVariantModal,
  } = useProductStore();
  const { columns } = useProductColumns();
  const {
    products,
    exportToExcel,
    shareData,
    shareOneProduct,
    exportOneProductToExcel,
  } = useProductData();

  return (
    <Layout
      header={{
        title: 'Productos',
        titleIcon: <Package2Icon className="h-6 w-6" />,
        headerContent: (
          <>
            <Button
              variant="ghost"
              size="small"
              shape="rounded"
              onClick={exportToExcel}
              title="Exportar a Excel"
              className="p-2"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="small"
              shape="rounded"
              onClick={shareData}
              title="Compartir"
              className="p-2"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <AddProductModal />
          </>
        ),
      }}
    >
      <CardContainer className="">
        <DataTable
          tableId={'products'}
          data={products || []}
          columns={columns}
          border
          pagination={{
            showPagination: true,
            pageSize: 5,
            pageIndex: 0,
            takeDefaultPagination: true,
          }}
          renderSubComponent={(row) => {
            const product = (row?.row?.original as Product) || {};
            return <ProductVariantsDatatable productId={product?.id} />;
          }}
          stateMessage={{
            noData: 'No hay productos registrados'.toLocaleUpperCase(),
            noDataDescription:
              'Registra un producto para comenzar a agregar variantes. Para agregar un producto, haz clic en el botón "Agregar". Tips: Puedes exportar los productos a Excel o compartirlos con otras personas.',
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
      </CardContainer>
      <EditProductModal />
      <DeleteProduct />
      <AddVariantModal />
    </Layout>
  );
}

export default ProductsPage;
