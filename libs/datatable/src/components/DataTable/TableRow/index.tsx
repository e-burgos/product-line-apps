import { FC, CSSProperties, useState, Fragment } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Row, Table } from '@tanstack/react-table';
import { cn } from '../../../common/helpers/cn';
import generalStyles from '../../../common/styles/main.module.css';
import {
  HoverType,
  IRowActions,
  IRowSelection,
  TData,
} from '../../../common/types';
import useTableColors from '../../../hooks/useTableColors';
import styles from './table-row.module.css';
import TableCell from './TableCell';

interface RowProps {
  tableId: string;
  table: Table<TData>;
  row: Row<TData>;
  index: number;
  columnOrder: string[];
  style?: {
    row?: CSSProperties;
    cell?: CSSProperties;
  };
  isColumn: boolean;
  rowActions?: IRowActions<TData>[];
  onClick?: React.MouseEventHandler<HTMLTableRowElement>;
  forceShowMenuActions?: boolean;
  columnOffset: number;
  rowSelection?: IRowSelection<TData>;
  smallAnatomy?: boolean;
}

const TableRow: FC<RowProps> = ({
  tableId,
  table,
  row,
  index,
  style,
  isColumn,
  rowActions,
  onClick,
  forceShowMenuActions,
  columnOffset,
  rowSelection,
  smallAnatomy,
}) => {
  const [openActions, setOpenActions] = useState<boolean>(false);
  const [hoverRow, setHoverRow] = useState<HoverType>({
    hover: false,
    index: 0,
  });

  const { colors } = useTableColors();
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: index.toString(),
  });

  const cssTransform = CSS.Transform.toString(transform);

  const handleRowBg = () => {
    if (row.getIsExpanded())
      return hoverRow.hover ? colors.rowHover : colors.rowExpandedBg;
    if (isDragging) return colors.paperBg;
    if (hoverRow.hover) return colors.rowHover;
    return style?.row?.backgroundColor || colors.rowBg;
  };

  const dragStyles: CSSProperties = {
    transform: cssTransform,
    transition: transition,
    zIndex: isDragging ? 10 : openActions ? 1 : 0,
    opacity: isDragging ? 0.8 : 1,
    color: colors.primaryText,
  };

  return (
    <tr
      ref={!isColumn ? setNodeRef : undefined}
      onClick={onClick}
      onMouseEnter={() => {
        setHoverRow({ hover: true, index });
      }}
      onMouseLeave={() => setHoverRow({ hover: false, index })}
      className={cn([
        styles.draggable,
        styles.trWrapper,
        smallAnatomy ? generalStyles.smallRow : generalStyles.row,
        // class for row expanded
        row.getIsExpanded() ? 'data-table-expanded-principal-row' : '',
      ])}
      style={{
        ...style?.row,
        ...dragStyles,
        zIndex: openActions ? 11 : hoverRow.hover ? 10 : 0,
        backgroundColor: handleRowBg(),
        outline: hoverRow.hover ? `1px solid transparent` : 'none',
        outlineOffset: '-1px',
      }}
    >
      {row.getVisibleCells().map((cell) => {
        return (
          <Fragment key={cell.id}>
            <TableCell
              tableId={tableId}
              table={table}
              key={cell.id}
              cell={cell}
              row={row}
              hoverRow={hoverRow}
              setHoverRow={setHoverRow}
              setOpenActions={setOpenActions}
              style={{
                ...style?.cell,
                backgroundColor: hoverRow.hover ? colors.rowHover : undefined,
              }}
              rowActions={rowActions}
              forceShowMenuActions={forceShowMenuActions}
              columnOffset={columnOffset}
              rowSelection={rowSelection}
            />
          </Fragment>
        );
      })}
    </tr>
  );
};

export default TableRow;
