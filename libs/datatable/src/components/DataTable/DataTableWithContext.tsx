import { ReactElement } from 'react';
import { RowData } from '@tanstack/react-table';
import { IOptionalDataTableProps } from '../../common/types';
import { useDataTableProvider } from '../../context/DataTableContext';
import DataTableComponent from './DataTableComponent';

/**
 * Represents the properties for a DataTable component with context.
 *
 * @category ui/datatable
 * @subcategory Props
 *
 * @template TData - The type of data that the DataTable will handle.
 */
export type DataTableWithContextProps<TData> = IOptionalDataTableProps<TData>;

/**
 * DataTableWithContext is a React component that displays a table of data with sorting, pagination, and optional subComponents.
 * This component should only be imported within the DataTableContext context using the DataTableProvider provider
 * to be able to take the data and columns necessary for its rendering. The main idea of this implementation
 * is to share the table instance provided by the provider with other isolated components.
 * For more information, see the [React Table documentation](https://tanstack.com/react-table/).
 *
 * @category ui/datatable
 * @subcategory Components
 *
 * @component
 * @template TData - The type of data that the DataTable will handle.
 *
 * @param {DataTableWithContextProps<TData>} props - The properties passed to the component.
 *
 * Parameters for useDataTable hook:
 * @param {string} props.tableId - Table ID.
 * @param {Array<ColumnDef<any, any>>} props.columns - Array of column definitions.
 * @param {Array<TData>} props.data - Array of data to display.
 *
 * Optional data table properties:
 * @param {IOptionalDataTableProps} props - Optional properties for the data table.
 *
 * @returns {ReactElement} Returns the data table UI.
 */

function DataTableWithContext<TData = RowData>(
  props: DataTableWithContextProps<TData>,
): ReactElement {
  const {
    tableId,
    table,
    data,
    columnOrder,
    columnVisibility,
    scrollProps,
    tableContainerRef,
    setColumnOrder,
    setColumnVisibility,
    setManualPagination,
  } = useDataTableProvider();

  const visibleColumns = table
    .getAllColumns()
    .filter(
      (column) =>
        column.getIsVisible() &&
        column.id !== 'Expanded' &&
        column.id !== 'RowActionsColumn' &&
        column.id !== 'RowSelectionColumn' &&
        column.id !== 'OffsetColumn',
    );

  const isAllColumnsHidden = visibleColumns.every(
    (column) => !column.getIsVisible(),
  );

  return (
    <DataTableComponent
      tableId={tableId}
      table={table}
      data={isAllColumnsHidden ? [] : data}
      columnOrder={columnOrder}
      columnVisibility={columnVisibility}
      setColumnOrder={setColumnOrder}
      setColumnVisibility={setColumnVisibility}
      setManualPagination={setManualPagination}
      scrollProps={scrollProps}
      tableContainerRef={tableContainerRef}
      {...props}
      stateMessage={{
        ...props.stateMessage,
        noData: isAllColumnsHidden
          ? 'All columns are hidden'
          : props.stateMessage?.noData,
        noDataDescription: isAllColumnsHidden
          ? 'Enable at least one column to see the data'
          : props.stateMessage?.noDataDescription,
      }}
    />
  );
}

export default DataTableWithContext;
