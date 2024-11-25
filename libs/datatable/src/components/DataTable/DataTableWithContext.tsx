/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { useDataTableProvider } from '../../context/DataTableContext';
import DataTableComponent, {
  IOptionalDataTableProps,
} from './DataTableComponent';

/**
 * `DataTableWithContext` is a React component that displays a table of data with sorting, pagination, and optional subComponents.
 * This component should only be imported inside within the DataTableContext context using the DataTableProvider provider to be
 * able to take the data and columns necessary for its rendering. The main idea of this implementation is to share the table
 * instance provided by the provider with other isolated components.
 * For more information, see the [React Table documentation](https://tanstack.com/react-table/).
 *
 * @component
 * @param {DataTableWithContextProps<TData>} props The properties passed to the component.
 *
 * Parameters for useDataTable hook.
 * @param {string} props.tableId Table ID.
 * @param {ColumnDef<TData, TData>[]} props.columns Array of column definitions.
 * @param {TData[]} props.data Array of data to display.
 *
 * Optional data table properties.
 * @param {IOptionalDataTableProps} props Optional data table properties.
 *
 * @returns {ReactElement} Returns the data table UI.
 */

export type DataTableWithContextProps<TData> = IOptionalDataTableProps<TData>;

// @ts-ignore
const DataTableWithContext: React.FC<DataTableWithContextProps<TData>> = ({
  ...props
}) => {
  const {
    tableId,
    table,
    data,
    columnOrder,
    columnVisibility,
    setColumnOrder,
    setColumnVisibility,
    setManualPagination,
  } = useDataTableProvider();

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
      {...props}
    />
  );
};

export default DataTableWithContext;
