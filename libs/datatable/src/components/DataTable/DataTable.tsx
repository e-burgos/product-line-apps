/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef, SortingState } from '@tanstack/react-table';
import { ExpandedColumn } from '../../common/helpers/ExpandedColumn';
import { RowActionsColumn } from '../../common/helpers/RowActionsColumn';
import { RowSelectionColumn } from '../../common/helpers/RowSelectionColumn';
import { IOptionalDataTableProps, TData } from '../../common/types';
import { useDataTable } from '../../hooks';
import DataTableComponent from './DataTableComponent';

/**
 * Props for the DataTable component.
 *
 * @category ui/datatable
 * @subcategory Props
 *
 * @template T - The type of data used in the table.
 * @extends IOptionalDataTableProps<T> - Extends the optional properties for the data table.
 *
 * @property {string} tableId - Unique identifier for the table.
 * @property {boolean} [enableMultiSort] - Whether multi-column sorting is enabled.
 * @property {boolean} [manualSorting] - Whether sorting is handled manually.
 * @property {Array<T>} data - The data to be displayed in the table.
 * @property {Array<ColumnDef<any, any>>} columns - The column definitions for the table.
 * @property {boolean} [showHeader] - Whether to show the table header.
 * @property {function(SortingState): void} [onSortModelChange] - Callback triggered when the sorting model changes.
 */
export interface DataTableProps<T = TData> extends IOptionalDataTableProps<T> {
  tableId: string;
  enableMultiSort?: boolean;
  manualSorting?: boolean;
  data: Array<T>;
  columns: Array<ColumnDef<any, any>>;
  showHeader?: boolean;
  onSortModelChange?: (model: SortingState) => void;
}

/**
 * DataTable component for rendering a data table with customizable columns, sorting, and other features. This component is a wrapper around the DataTableComponent, which is the actual table implementation.
 *
 * @category ui/datatable
 * @subcategory Components
 *
 * @component
 * @template TData - The type of data used in the table.
 * @extends IOptionalDataTableProps<TData> - Extends the optional properties for the data table.
 * @param {DataTableProps<TData>} props The properties passed to the component.
 *
 * Parameters for useDataTable hook.
 * @param {string} props.tableId Table ID.
 * @param {Array<ColumnDef<TData, TData>>} props.columns Array of column definitions.
 * @param {Array<TData>} props.data Array of data to display.
 * @param {function(SortingState): void} props.onSortModelChange Function to handle sort model changes.
 * @param {boolean} props.enableMultiSort Whether multi-sorting is enabled.
 * @param {string} props.title Title of the data table.
 *
 * @returns {ReactElement} Returns the data table UI.
 */

function DataTable<TData>({
  tableId,
  data: defaultData,
  columns,
  onSortModelChange,
  enableMultiSort,
  ...props
}: DataTableProps<TData>): JSX.Element {
  const {
    table,
    data,
    columnOrder,
    columnVisibility,
    scrollProps,
    tableContainerRef,
    setColumnOrder,
    setColumnVisibility,
    setManualPagination,
  } = useDataTable({
    tableId,
    defaultData,
    enableMultiSort,
    onSortModelChange,
    defaultColumns: columns,
    enableHideColumns: props?.headerOptions?.enableHideColumns,
    initialConfig: props?.initialConfig,
    offset: [
      props?.rowActions ? RowActionsColumn.size : 0,
      props?.rowSelection ? RowSelectionColumn.size : 0,
      props?.renderSubDataTable || props?.renderSubComponent
        ? ExpandedColumn.size
        : 0,
    ].reduce((acc, r) => acc + r, 0),
  });

  return (
    <DataTableComponent
      tableId={tableId}
      table={table}
      data={data}
      columnOrder={columnOrder}
      columnVisibility={columnVisibility}
      setColumnOrder={setColumnOrder}
      setColumnVisibility={setColumnVisibility}
      setManualPagination={setManualPagination}
      scrollProps={scrollProps}
      tableContainerRef={tableContainerRef}
      {...props}
    />
  );
}

export default DataTable;
