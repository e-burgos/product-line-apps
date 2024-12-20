import Layout from '@optical-system-app/components/layout';
import {
  AddProductModal,
  ProductsDataTable,
  useProductData,
} from '@product-line/features';
import Button from 'libs/ui/src/components/button/button';
import { Download, Package2Icon, Share2 } from 'lucide-react';

function ProductsPage() {
  const { exportToExcel, shareData } = useProductData();

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
      <ProductsDataTable />
    </Layout>
  );
}

export default ProductsPage;
