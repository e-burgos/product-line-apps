import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, Variant } from 'libs/features/src/data/product-db';
import { DataTable } from '@product-line/datatable';
import useProductVariantColumns from '../../hooks/use-product-variant-columns';
import { useProductStore } from '../../hooks/use-product-store';
import DeleteVariant from '../modals/delete-variant';
import EditVariantModal from '../modals/edit-variant-modal';

interface ProductVariantsDatatableProps {
  productId?: number;
}

export const ProductVariantsDatatable: React.FC<
  ProductVariantsDatatableProps
> = ({ productId }) => {
  const {
    setCurrentVariant,
    setOpenDeleteVariantModal,
    setOpenEditVariantModal,
  } = useProductStore();
  const { columns } = useProductVariantColumns();
  const variants = useLiveQuery(() => db.variants.toArray())?.filter(
    (v) => v.productId === Number(productId)
  );

  return (
    <>
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
        setCurrentRow={(row) => setCurrentVariant(row?.original as Variant)}
        stateMessage={{
          noData: 'No hay variantes'.toLocaleUpperCase(),
          noDataDescription:
            'No hay variantes disponibles para este producto. Puede agregar una nueva variante haciendo clic en el botón "Agregar".',
        }}
        rowActions={[
          {
            action: 'edit',
            label: () => 'Editar',
            onClick: () => setOpenEditVariantModal(true),
          },
          {
            action: 'delete',
            label: () => 'Borrar',
            onClick: () => setOpenDeleteVariantModal(true),
          },
        ]}
      />
      <DeleteVariant />
      <EditVariantModal />
    </>
  );
};

export default ProductVariantsDatatable;
