import React from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';
import {
  horizontalListSortingStrategy,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface DragDropWithRowsContentContextProps {
  children: React.ReactNode;
  columnOrder: string[];
  dataIds: UniqueIdentifier[];
  isColumn: boolean;
}

const DragDropWithRowsContentContext: React.FC<
  DragDropWithRowsContentContextProps
> = ({ children, columnOrder, dataIds, isColumn }) => {
  return (
    <SortableContext
      items={isColumn ? columnOrder : dataIds}
      strategy={
        isColumn ? horizontalListSortingStrategy : verticalListSortingStrategy
      }
    >
      {children}
    </SortableContext>
  );
};

export default DragDropWithRowsContentContext;
