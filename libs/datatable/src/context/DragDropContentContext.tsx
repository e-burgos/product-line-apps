import React from 'react';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { ColumnOrderState } from '@tanstack/react-table';

interface DragDropContentContextProps {
  children: React.ReactNode;
  columnOrder: ColumnOrderState;
}

const DragDropContentContext: React.FC<DragDropContentContextProps> = ({
  children,
  columnOrder,
}) => {
  const checkColumns = columnOrder.includes('null');
  return (
    <SortableContext
      items={!checkColumns ? columnOrder : []}
      strategy={horizontalListSortingStrategy}
    >
      {children}
    </SortableContext>
  );
};

export default DragDropContentContext;
