import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Tag } from 'lucide-react';
import DeleteDetail from '../modals/delete-detail';
import EditBudgetDetailModal from '../modals/edit-budget-detail-modal';
import { db } from '@product-manager-app/lib/db';
import { formatCurrency } from '@product-manager-app/lib/utils';

interface BudgetDetailsProps {
  budgetId?: number;
}

const BudgetDetails: React.FC<BudgetDetailsProps> = ({ budgetId }) => {
  const details = useLiveQuery(() => db.budgetVariants.toArray())?.filter(
    (v) => v.budgetId === Number(budgetId)
  );

  return (
    <div className="p-4 bg-muted/50 rounded-md">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="h-4 w-4" />
        <h4 className="font-medium">{'Detalles'}</h4>
      </div>
      {details?.length === 0 && (
        <p className="font-thin">
          {'No se encontraron detalles agregados a este presupuesto.'}
        </p>
      )}
      <div className="space-y-2">
        {details?.length !== 0 && (
          <div className="grid grid-cols-5 gap-4 p-2 bg-background items-center rounded-md">
            <div>
              <span className="text-muted-foreground">{'Producto'}</span>
            </div>
            <div className="text-muted-foreground">{'Descripción'}</div>
            <div className="text-muted-foreground">{'Cantidad'}</div>
            <div className="text-muted-foreground text-right">{'Subtotal'}</div>
            <div className="text-muted-foreground text-right">{'Acciones'}</div>
          </div>
        )}
        {details?.length !== 0 &&
          details?.map((detail) => (
            <div
              key={detail.id}
              className="grid grid-cols-5 gap-4 p-2 bg-background items-center rounded-md"
            >
              <div>
                <span className="font-medium">{detail.title || '-'}</span>
              </div>
              <div className="font-medium">{detail.description || '-'}</div>
              <div className="font-medium">{detail.quantity || '-'}</div>
              <div className="text-right">
                {formatCurrency(detail.amount) || '-'}
              </div>
              <div className="text-right">
                <DeleteDetail detail={detail} />
                <EditBudgetDetailModal detail={detail} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BudgetDetails;
