/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { CSSProperties, useMemo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Cell, flexRender, Row, Table } from '@tanstack/react-table';
import { cn } from '../../../../common/helpers/cn';
import { ExpandedColumn } from '../../../../common/helpers/ExpandedColumn';
import { OffsetColumn } from '../../../../common/helpers/OffsetColumn';
import { RowActionsColumn } from '../../../../common/helpers/RowActionsColumn';
import { RowSelectionColumn } from '../../../../common/helpers/RowSelectionColumn';
import {
  HoverType,
  IRowActions,
  IRowSelection,
  TData,
} from '../../../../common/types';
import useGetCommonPinningStyles from '../../../../hooks/useGetCommonPinningStyles';
import useTableColors from '../../../../hooks/useTableColors';
import styles from '../table-row.module.css';
import ExpandedRowCell from './ExpandedRowCell';
import RowActionsCell from './RowActionsCell';
import RowSelectionCell from './RowSelectionCell';

interface TableCellProps {
  tableId: string;
  table: Table<TData>;
  row: Row<TData>;
  cell: Cell<TData, unknown>;
  hoverRow: HoverType;
  rowActions?: IRowActions<TData>[];
  style?: React.CSSProperties;
  setHoverRow: (value: HoverType) => void;
  setOpenActions?: (value: boolean) => void;
  forceShowMenuActions?: boolean;
  columnOffset: number;
  rowSelection?: IRowSelection<TData>;
}

const TableCell: React.FC<TableCellProps> = ({
  tableId,
  table,
  cell,
  row,
  hoverRow,
  rowActions,
  style,
  setHoverRow,
  setOpenActions,
  forceShowMenuActions,
  columnOffset,
  rowSelection,
}) => {
  const { colors } = useTableColors();
  const { pinStyles, isPinned } = useGetCommonPinningStyles(cell.column);
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
  });

  const columnSize = cell.column.getSize();
  const isExpanded = row.getIsExpanded();
  const isExpandedColumn = cell.column.id === ExpandedColumn.id;
  const isOffsetCell = cell.column?.id === OffsetColumn?.id;
  const isRowActionsColumn = cell.column.id === RowActionsColumn.id;
  const isRowSelectionColumn = cell.column.id === RowSelectionColumn.id;

  const customStyles: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    width: cell.column.getSize(),
    opacity: isDragging ? 0.8 : 1,
  };

  const handleCellComponents = () => {
    if (isOffsetCell) return flexRender(OffsetColumn.cell, cell.getContext());
    if (isRowActionsColumn)
      return (
        <RowActionsCell
          tableId={tableId}
          row={row}
          hoverRow={hoverRow}
          setHoverRow={setHoverRow}
          rowActions={rowActions}
          setOpenActions={setOpenActions}
          forceShowMenuActions={forceShowMenuActions}
        />
      );
    if (isExpandedColumn)
      return <ExpandedRowCell row={row} hoverRow={hoverRow} />;
    if (isRowSelectionColumn && rowSelection)
      return (
        <RowSelectionCell row={row} rowSelection={rowSelection} table={table} />
      );
    if (columnSize < 40) return <span>...</span>;
    return flexRender(cell.column.columnDef.cell, cell.getContext());
  };

  const width = useMemo(() => {
    const value = isOffsetCell ? columnOffset : pinStyles?.width;

    if (Number.isNaN(value)) {
      return 0;
    }

    return value;
  }, [columnOffset, isOffsetCell, pinStyles?.width]);

  if (isOffsetCell && !width) return null;

  return (
    <td
      ref={setNodeRef}
      id={`col-${cell.id}`}
      className={cn(
        styles.tdWrapper,
        isExpanded ? styles.tdExpanded : styles.tdDefaultColor,
        isDragging && styles.tdDragged,
      )}
      style={{
        ...style,
        ...customStyles,
        ...pinStyles,
        width: width,
        zIndex: isDragging || isPinned ? 10 : 0,
        borderBottom: isExpanded ? 'none' : `1px solid ${colors.divider}`,
        flexShrink: 0,
        padding: 0,
      }}
    >
      <div
        className={styles.tdContent}
        style={{
          zIndex: 1,
          width: 'inherit',
          height: '100%',
          justifyContent: isRowActionsColumn ? 'center' : 'flex-start',
          padding: isRowActionsColumn ? '0' : '0 12px',
          boxSizing: 'border-box',
        }}
      >
        {handleCellComponents()}
      </div>
    </td>
  );
};

export default TableCell;
