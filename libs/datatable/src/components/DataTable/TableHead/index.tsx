import React from 'react';
import { ColumnOrderState, Table } from '@tanstack/react-table';
import { cn } from '../../../common/helpers/cn';
import styles from '../../../common/styles/main.module.css';
import { IDataTableStyles, IHeaderOptions } from '../../../common/types';
import DragDropContentContext from '../../../context/DragDropContentContext';
import useTableColors from '../../../hooks/useTableColors';
import TableHeader from '../TableHeader';

export interface TableHeadProps<TData> {
  sx?: IDataTableStyles;
  tableId: string;
  table: Table<TData>;
  data: TData[];
  columnOrder: ColumnOrderState;
  smallAnatomy?: boolean;
  headerOptions?: IHeaderOptions;
  disabled?: boolean;
  setHoverColumns: (value: boolean) => void;
  columnOffset: number;
}

function TableHead<TData>({
  sx,
  tableId,
  table,
  columnOrder,
  smallAnatomy,
  headerOptions,
  disabled,
  setHoverColumns,
  columnOffset,
}: TableHeadProps<TData>) {
  // hooks
  const { colors } = useTableColors();

  return (
    <thead
      id={`${tableId}-header`}
      role="rowheader"
      onMouseEnter={() => setHoverColumns(true)}
      onMouseLeave={() => setHoverColumns(false)}
      className={cn([
        styles.header,
        smallAnatomy && styles.smallHeader,
        headerOptions?.className,
      ])}
      style={{
        color: colors.primaryText,
        position: 'sticky',
        top: 0,
        zIndex: 1,
        ...sx?.thead,
      }}
    >
      <DragDropContentContext key={'drag-context'} columnOrder={columnOrder}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr
            key={headerGroup.id}
            style={{
              backgroundColor: colors.headerBg,
              borderBottom: `1px solid ${colors.divider}`,
              ...sx?.header,
            }}
          >
            {headerGroup.headers
              .filter((header) => header.column.getIsVisible()) // filter only visible columns
              .map((header, index) => {
                return (
                  <TableHeader
                    key={`${header.id}-${index}`}
                    index={index}
                    header={header}
                    headerGroup={headerGroup}
                    headerOptions={headerOptions}
                    disabled={disabled}
                    style={sx?.header}
                    columnOffset={columnOffset}
                    tableId={tableId}
                  />
                );
              })}
          </tr>
        ))}
      </DragDropContentContext>
    </thead>
  );
}

export default TableHead;
