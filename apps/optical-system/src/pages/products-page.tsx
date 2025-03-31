import Layout from '@optical-system-app/components/layout';
import ShareButtons from '@optical-system-app/components/share-buttons';
import { CreateProductModal, ProductTables } from '@product-line/features';
import { Package2Icon } from 'lucide-react';

function ProductsPage() {
  return (
    <Layout
      header={{
        title: 'Productos',
        titleIcon: <Package2Icon className="h-6 w-6 text-brand" />,
        headerContent: (
          <>
            {/* TODO: Add share buttons */}
            <ShareButtons />
            <CreateProductModal showButton={true} />
          </>
        ),
      }}
    >
      <ProductTables />
    </Layout>
  );
}

export default ProductsPage;
