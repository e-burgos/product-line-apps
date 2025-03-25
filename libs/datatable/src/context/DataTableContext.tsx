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
import { DebouncedFunc } from 'lodash';
import { create } from 'zustand';
import { ExpandedColumn } from '../common/helpers/ExpandedColumn';
import { RowActionsColumn } from '../common/helpers/RowActionsColumn';
import { RowSelectionColumn } from '../common/helpers/RowSelectionColumn';
import { IHeaderOptions, ManualPaginationState, TData } from '../common/types';
import useDataTable from '../hooks/useDataTable';

/**
 * Interface representing the options to enable various row features in a data table.
 *
 * @category ui/datatable
 * @subcategory Types
 *
 * @property {boolean} [rowActions] - Indicates whether row actions are enabled.
 * @property {boolean} [rowSelection] - Indicates whether row selection is enabled.
 * @property {boolean} [renderSubDataTable] - Indicates whether a sub-data table should be rendered.
 * @property {boolean} [renderSubComponent] - Indicates whether a sub-component should be rendered.
 */
export interface EnableRows {
  rowActions?: boolean;
  rowSelection?: boolean;
  renderSubDataTable?: boolean;
  renderSubComponent?: boolean;
}

/**
 * Interface representing the properties for scroll functionality.
 *
 * @category ui/datatable
 * @subcategory Context
 *
 * @property {number} containerWith - Width of the container.
 * @property {boolean} isScrollable - Indicates if the container is scrollable.
 * @property {number} scrollX - Horizontal scroll position.
 * @property {DebouncedFunc<function(React.UIEvent<HTMLDivElement, UIEvent>): void>} handleScroll - Debounced function to handle scroll events.
 */
export interface IScrollProps {
  containerWith: number;
  isScrollable: boolean;
  scrollX: number;
  handleScroll: DebouncedFunc<
    (e: React.UIEvent<HTMLDivElement, UIEvent>) => void
  >;
}

/**
 * Interface representing the value provided by the DataTable context.
 *
 * @category ui/datatable
 * @subcategory Context
 *
 * @property {string} tableId - Unique identifier for the table.
 * @property {Table<TData>} table - The table instance.
 * @property {Array<TData>} data - Array of data to be displayed in the table.
 * @property {PaginationState} pagination - State of the table's pagination.
 * @property {SortingState} sorting - State of the table's sorting.
 * @property {Array<ColumnDef<any, any>>} columns - Definitions of the table's columns.
 * @property {EnableRows | false} enableRows - Configuration for enabling rows or false if rows are not enabled.
 * @property {Partial<ColumnDef<TData, unknown>>} [initialConfig] - Initial configuration for the columns, optional.
 * @property {ColumnOrderState} columnOrder - State of the column order.
 * @property {VisibilityState} columnVisibility - State of the column visibility.
 * @property {ColumnPinningState} columnPinning - State of the column pinning.
 * @property {ManualPaginationState} manualPagination - State of manual pagination.
 * @property {React.MutableRefObject<HTMLDivElement>} tableContainerRef - Reference to the table container element.
 * @property {IScrollProps} scrollProps - Properties related to scrolling within the table container.
 * @property {Dispatch<SetStateAction<Array<TData>>>} setData - Function to set the table data.
 * @property {Dispatch<SetStateAction<PaginationState>>} setPagination - Function to set the pagination state.
 * @property {Dispatch<SetStateAction<SortingState>>} setSorting - Function to set the sorting state.
 * @property {Dispatch<SetStateAction<ColumnOrderState>>} setColumnOrder - Function to set the column order state.
 * @property {Dispatch<SetStateAction<VisibilityState>>} setColumnVisibility - Function to set the column visibility state.
 * @property {Dispatch<SetStateAction<ColumnPinningState>>} setColumnPinning - Function to set the column pinning state.
 * @property {Dispatch<SetStateAction<ManualPaginationState>>} setManualPagination - Function to set the manual pagination state.
 * @property {function(): void} resetTable - Function to reset the table to its initial state.
 */
export interface DataTableProviderValue {
  tableId: string;
  table: Table<TData>;
  data: Array<TData>;
  pagination: PaginationState;
  sorting: SortingState;
  columns: Array<ColumnDef<any, any>>;
  enableRows: EnableRows | false;
  initialConfig?: Partial<ColumnDef<TData, unknown>>;
  columnOrder: ColumnOrderState;
  columnVisibility: VisibilityState;
  columnPinning: ColumnPinningState;
  manualPagination: ManualPaginationState;
  tableContainerRef: React.MutableRefObject<HTMLDivElement>;
  scrollProps: IScrollProps;
  setData: Dispatch<SetStateAction<Array<TData>>>;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  setSorting: Dispatch<SetStateAction<SortingState>>;
  setColumnOrder: Dispatch<SetStateAction<ColumnOrderState>>;
  setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>;
  setColumnPinning: Dispatch<SetStateAction<ColumnPinningState>>;
  setManualPagination: Dispatch<SetStateAction<ManualPaginationState>>;
  resetTable: () => void;
}

const Context = React.createContext<DataTableProviderValue | null>(null);

/**
 * Props for the DataTableProvider component.
 *
 * @category ui/datatable
 * @subcategory Context
 *
 * @property {string} tableId - Unique identifier for the table.
 * @property {Array<TData>} defaultData - Default data to be displayed in the table.
 * @property {Array<ColumnDef<any, any>>} defaultColumns - Default column definitions for the table.
 * @property {EnableRows | false} enableRows - Configuration to enable or disable rows.
 * @property {Partial<ColumnDef<TData, unknown>>} [initialConfig] - Optional initial configuration for the columns.
 * @property {React.ReactNode} [children] - Optional children elements to be rendered within the provider.
 * @property {IHeaderOptions} [headerOptions] - Optional header options for the table.
 */

export interface DataTableProviderProps {
  tableId: string;
  defaultData: Array<TData>;
  defaultColumns: Array<ColumnDef<any, any>>;
  enableRows: EnableRows | false;
  initialConfig?: Partial<ColumnDef<TData, unknown>>;
  children?: React.ReactNode;
  headerOptions?: IHeaderOptions;
}

/**
 * DataTableProvider is a React component that provides a context for the data table.
 * This component should only be imported and used directly if the parent component/module is already wrapping the child components
 * with the necessary parameters provided by `useDataTable` hook.
 * For more information, see the [React Table documentation](https://tanstack.com/react-table/).
 *
 * @category ui/datatable
 * @subcategory Components
 *
 * @component
 * @param {DataTableProviderProps} props The properties passed to the component.
 *
 * @param {string} props.tableId - The unique identifier for the table.
 * @param {Array<TData>} props.defaultData - The default data to be displayed in the table.
 * @param {Array<ColumnDef<any, any>>} props.defaultColumns - The default columns configuration for the table.
 * @param {EnableRows | false} props.enableRows - Configuration to enable specific row features such as actions, selection, sub-tables, or sub-components.
 * @param {Partial<ColumnDef<TData, unknown>>} [props.initialConfig] - Optional initial configuration for the columns.
 * @param {React.ReactNode} props.children - The child components that will be wrapped by the provider.
 *
 * @returns {JSX.Element} The context provider component for the data table.
 */

const DataTableProvider = ({
  tableId,
  defaultData,
  defaultColumns,
  enableRows,
  initialConfig,
  children,
  headerOptions,
}: DataTableProviderProps): JSX.Element => {
  const {
    table,
    data,
    sorting,
    pagination,
    columnOrder,
    columnVisibility,
    columnPinning,
    manualPagination,
    tableContainerRef,
    scrollProps,
    setData,
    setSorting,
    setPagination,
    setColumnOrder,
    setColumnVisibility,
    setColumnPinning,
    setManualPagination,
    resetTable,
  } = useDataTable({
    tableId,
    defaultData,
    defaultColumns,
    initialConfig,
    enableHideColumns: headerOptions?.enableHideColumns,
    offset: [
      enableRows && enableRows?.rowActions ? RowActionsColumn.size : 0,
      enableRows && enableRows?.rowSelection ? RowSelectionColumn.size : 0,
      (enableRows && enableRows?.renderSubDataTable) ||
      (enableRows && enableRows?.renderSubComponent)
        ? ExpandedColumn.size
        : 0,
    ].reduce((acc, r) => acc + r, 0),
  });

  const useStore = React.useMemo(
    () =>
      create<DataTableProviderValue>((_set) => ({
        tableId,
        table,
        data,
        columns: defaultColumns,
        initialConfig,
        enableRows,
        pagination,
        sorting,
        columnOrder,
        columnVisibility,
        columnPinning,
        manualPagination,
        tableContainerRef,
        scrollProps,
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
      enableRows,
      pagination,
      sorting,
      columnOrder,
      columnVisibility,
      columnPinning,
      manualPagination,
      tableContainerRef,
      scrollProps,
      setData,
      setPagination,
      setSorting,
      setColumnOrder,
      setColumnVisibility,
      setColumnPinning,
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
