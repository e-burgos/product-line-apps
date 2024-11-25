import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@product-manager-app/lib/db';
import { DataTable } from '@product-line/datatable';
import useProductVariantColumns from '../../hooks/use-product-variant-columns';

interface ProductVariantsDatatableProps {
  productId?: number;
}

const ProductVariantsDatatable: React.FC<ProductVariantsDatatableProps> = ({
  productId,
}) => {
  const { columns } = useProductVariantColumns();
  const variants = useLiveQuery(() => db.variants.toArray())?.filter(
    (v) => v.productId === Number(productId)
  );

  return (
    <DataTable
      tableId="product-variants"
      data={variants || []}
      columns={columns}
      pagination={{
        showPagination: true,
        pageSize: 5,
        pageIndex: 0,
        takeDefaultPagination: true,
      }}
      stateMessage={{
        noData: 'No hay variantes'.toLocaleUpperCase(),
        noDataDescription:
          'No hay variantes disponibles para este producto. Puede agregar una nueva variante haciendo clic en el botón "Agregar".',
      }}
    />
  );
};

export default ProductVariantsDatatable;
