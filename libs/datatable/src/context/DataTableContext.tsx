/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, SetStateAction } from 'react';
import {
  ColumnDef,
  ColumnOrderState,
  ColumnPinningState,
  PaginationState,
  SortingState,
  Table,
  VisibilityState,
} from '@tanstack/react-table';
import { create } from 'zustand';
import { ManualPaginationState, TData } from '../common/types';
import useDataTable from '../hooks/useDataTable';

/**
 * `DataTableProvider` is a React component that provides a context for the data table.
 * This component should only be imported and used directly if the parent component/module is already wrapping the child components
 * with the necessary parameters provided by `useDataTable` hook.
 * For more information, see the [React Table documentation](https://tanstack.com/react-table/).
 *
 * @component
 *
 * @param {string} tableId Table ID.
 * @param {TData[]} defaultData Array of data to display.
 * @param {ColumnDef<any, any>[]} defaultColumns Array of column definitions.
 * @param {Partial<ColumnDef<TData, unknown>>} initialConfig Optional initial configuration.
 * @param {React.ReactNode} children The children to render.
 *
 * @returns {ReactElement} Returns the data table provider.
 *
 * @example
 *
 * import { DataTableProvider } from '@membrane-mfe-app/datatable';
 *
 * const App = () => {
 *  return (
 *   <DataTableProvider
 *    tableId="table-id"
 *    defaultData={data}
 *    defaultColumns={columns}
 *    initialConfig={initialConfig}
 *    >
 *      <DataTable />
 *    </DataTableProvider>
 * );
 *
 */

interface DataTableProviderValue {
  tableId: string;
  table: Table<TData>;
  data: TData[];
  columns: ColumnDef<TData, TData>[];
  initialConfig?: Partial<ColumnDef<TData, unknown>>;
  pagination: PaginationState;
  sorting: SortingState;
  columnOrder: ColumnOrderState;
  columnVisibility: VisibilityState;
  columnPinning: ColumnPinningState;
  manualPagination: ManualPaginationState;
  setData: Dispatch<SetStateAction<TData[]>>;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  setSorting: Dispatch<SetStateAction<SortingState>>;
  setColumnOrder: Dispatch<SetStateAction<ColumnOrderState>>;
  setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>;
  setColumnPinning: Dispatch<SetStateAction<ColumnPinningState>>;
  setManualPagination: Dispatch<SetStateAction<ManualPaginationState>>;
  resetTable: () => void;
}

const Context = React.createContext<DataTableProviderValue | null>(null);

const DataTableProvider = ({
  tableId,
  defaultData,
  defaultColumns,
  initialConfig,
  children,
}: {
  tableId: string;
  defaultData: TData[];
  defaultColumns: ColumnDef<any, any>[];
  initialConfig?: Partial<ColumnDef<TData, unknown>>;
  children: React.ReactNode;
}) => {
  const {
    table,
    data,
    pagination,
    sorting,
    columnOrder,
    columnVisibility,
    columnPinning,
    manualPagination,
    setData,
    setPagination,
    setSorting,
    setColumnOrder,
    setColumnVisibility,
    setColumnPinning,
    setManualPagination,
    resetTable,
  } = useDataTable(tableId, defaultData, defaultColumns, initialConfig);

  const useStore = React.useMemo(
    () =>
      create<DataTableProviderValue>((_set) => ({
        tableId,
        table,
        data,
        columns: defaultColumns,
        initialConfig,
        pagination,
        sorting,
        columnOrder,
        columnVisibility,
        columnPinning,
        manualPagination,
        setData,
        setPagination,
        setSorting,
        setColumnOrder,
        setColumnVisibility,
        setColumnPinning,
        setManualPagination,
        resetTable,
      })),
    [
      tableId,
      table,
      data,
      defaultColumns,
      initialConfig,
      pagination,
      sorting,
      columnOrder,
      columnPinning,
      columnVisibility,
      manualPagination,
      setData,
      setPagination,
      setSorting,
      setColumnOrder,
      setColumnPinning,
      setColumnVisibility,
      setManualPagination,
      resetTable,
    ],
  );

  const store = useStore();

  return <Context.Provider value={store}>{children}</Context.Provider>;
};
// Hook to access Context that indirectly exposes the created store.
const useDataTableProvider = (): DataTableProviderValue => {
  const ctx = React.useContext(Context);

  if (!ctx) throw Error(`Lack of provider`);

  return ctx;
};

export { DataTableProvider, useDataTableProvider };
