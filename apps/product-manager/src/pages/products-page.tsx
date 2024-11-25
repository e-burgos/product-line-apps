import { DataTable } from '@product-line/datatable';
import Layout from '@product-manager-app/components/layout';
import { Product } from '@product-manager-app/lib/db';
import AddProductModal from '@product-manager-app/modules/products/components/modals/add-product-modal';
import AddVariantModal from '@product-manager-app/modules/products/components/modals/add-variant-modal';
import DeleteProduct from '@product-manager-app/modules/products/components/modals/delete-product';
import EditProductModal from '@product-manager-app/modules/products/components/modals/edit-product-modal';
import ProductVariantsDatatable from '@product-manager-app/modules/products/components/tables/product-variants-datatable';
import useProductColumns from '@product-manager-app/modules/products/hooks/use-product-columns';
import useProductData from '@product-manager-app/modules/products/hooks/use-product-data';
import { useProductStore } from '@product-manager-app/modules/products/hooks/use-product-store';
import Button from 'libs/ui/src/components/button/button';
import { Download, Package2Icon, Share2 } from 'lucide-react';

export function ProductsPage() {
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
              size="mini"
              shape="rounded"
              onClick={exportToExcel}
              title="Exportar a Excel"
              className="p-2"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="mini"
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
      <EditProductModal />
      <DeleteProduct />
      <AddVariantModal />
    </Layout>
  );
}

export default ProductsPage;
