import ShareButtons from '@product-manager-app/components/share-buttons';
import { CreateProductModal, ProductTables } from '@product-line/features';
import Layout from '@product-manager-app/components/layout';
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
