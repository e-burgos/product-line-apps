import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Tag } from 'lucide-react';
import DeleteVariant from '../modals/delete-variant';
import EditVariantModal from '../modals/edit-variant-modal';
import { db } from '@product-manager-app/lib/db';
import { formatCurrency } from '@product-manager-app/lib/utils';

interface ProductVariantsProps {
  productId?: number;
}

const ProductVariants: React.FC<ProductVariantsProps> = ({ productId }) => {
  const variants = useLiveQuery(() => db.variants.toArray())?.filter(
    (v) => v.productId === Number(productId)
  );

  return (
    <div className="p-4 bg-muted/50 rounded-md">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="h-4 w-4" />
        <h4 className="font-medium">{'Variantes'}</h4>
      </div>
      {variants?.length === 0 && (
        <p className="font-thin">
          {'No se encontraron variantes agregadas a este producto.'}
        </p>
      )}
      <div className="space-y-2">
        {variants?.length !== 0 && (
          <div className="grid grid-cols-4 gap-4 p-2 bg-background items-center rounded-md">
            <div>
              <span className="text-muted-foreground">{'Nombre'}</span>
            </div>
            <div className="text-muted-foreground">{'Descripción'}</div>
            <div className="text-muted-foreground text-right">{'Monto'}</div>
            <div className="text-muted-foreground text-right">{'Acciones'}</div>
          </div>
        )}
        {variants?.length !== 0 &&
          variants?.map((variant) => (
            <div
              key={variant.id}
              className="grid grid-cols-4 gap-4 p-2 items-center bg-background rounded-md"
            >
              <div>
                <span className="font-medium">{variant.title || '-'}</span>
              </div>
              <div className="font-medium">{variant.description || '-'}</div>
              <div className="text-right">
                {formatCurrency(variant.amount) || '-'}
              </div>
              <div className=" flex justify-end content-center gap-2">
                <DeleteVariant variant={variant} />
                <EditVariantModal variant={variant} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductVariants;
