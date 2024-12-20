import React from 'react';
import { DataTable } from '@product-line/datatable';
import useProductVariantColumns from '../../hooks/use-product-variant-columns';
import { useProductStore } from '../../hooks/use-product-store';
import DeleteVariant from '../modals/delete-variant';
import EditVariantModal from '../modals/edit-variant-modal';
import { useProductMethods, Variant } from '@product-line/dexie';

interface ProductVariantsDatatableProps {
  productId: string;
}

export const ProductVariantsDatatable: React.FC<
  ProductVariantsDatatableProps
> = ({ productId }) => {
  const { setCurrentVariant } = useProductStore();
  const { columns } = useProductVariantColumns();
  const { getProductVariantsById } = useProductMethods();
  const variants = getProductVariantsById(productId);

  return (
    <>
      <DataTable
        tableId="product-variants"
        data={variants || []}
        columns={columns}
        pagination={{
          showPagination: false,
        }}
        headerOptions={{
          enableDragColumns: false,
          enablePinLeftColumns: false,
          enablePinRightColumns: false,
        }}
        setCurrentRow={(row) => setCurrentVariant(row?.original as Variant)}
        stateMessage={{
          noData: 'No hay variantes'.toLocaleUpperCase(),
          noDataDescription:
            'No hay variantes disponibles para este producto. Puede agregar una nueva variante haciendo clic en el botón "Agregar".',
        }}
      />
      <DeleteVariant />
      <EditVariantModal />
    </>
  );
};

export default ProductVariantsDatatable;
