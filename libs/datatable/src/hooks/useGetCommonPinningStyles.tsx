import { CSSProperties } from 'react';
import { Column } from '@tanstack/react-table';
import { TData } from '../common/types';
import useTableColors from './useTableColors';

export const useGetCommonPinningStyles = (column: Column<TData>) => {
  const { colors } = useTableColors();
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right');
  const expandedColumn = column.id === 'Expanded';
  const rowActionsColumn = column.id === 'RowActionsColumn';
  const rowSelectionColumn = column.id === 'RowSelectionColumn';
  const isPinColumn = expandedColumn || rowActionsColumn || rowSelectionColumn;

  const pinStyles: Omit<CSSProperties, 'width'> & { width: number } = {
    boxShadow: isLastLeftPinnedColumn
      ? `-5px 0 4px -4px ${isPinColumn ? 'transparent' : colors.divider} inset`
      : isFirstRightPinnedColumn
        ? `5px 0 4px -4px ${isPinColumn ? 'transparent' : colors.divider} inset`
        : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: isPinned ? 1 : undefined,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    // REMOVE: if not the resize not working and columns not set width correctly
    minWidth: column.columnDef?.minSize,
    maxWidth: column.columnDef?.maxSize,
    zIndex: isPinned ? 1 : 0,
  };

  return {
    pinStyles,
    isPinned,
    isFirstRightPinnedColumn,
    isLastLeftPinnedColumn,
  };
};

export default useGetCommonPinningStyles;
