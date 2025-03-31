/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ColumnDef,
  ColumnOrderState,
  ColumnPinningState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { OnChangeFn } from '@tanstack/table-core/src/types';
import { ExpandedColumn } from '../common/helpers/ExpandedColumn';
import { RowActionsColumn } from '../common/helpers/RowActionsColumn';
import { RowSelectionColumn } from '../common/helpers/RowSelectionColumn';
import { ManualPaginationState, TData } from '../common/types';
import { DataTableProps } from '../components/DataTable/DataTable';
import { getColumns } from './useColumns';
import useDataTableStore from './useDataTableStore';
import useInitialState from './useInitialState';
import useScrollableTable from './useScrollableTable';

export type UseDataTableProps = Pick<
  DataTableProps,
  'tableId' | 'enableMultiSort' | 'onSortModelChange' | 'manualSorting'
> & {
  defaultData: TData[];
  defaultColumns: ColumnDef<any, any>[];
  initialConfig?: Partial<ColumnDef<TData, unknown>>;
  offset?: number;
  enableHideColumns?: boolean;
};

export const useDataTable = ({
  tableId,
  defaultData,
  defaultColumns,
  initialConfig,
  onSortModelChange,
  enableHideColumns,
  manualSorting = !!onSortModelChange,
  enableMultiSort = true,
  offset = 0,
}: UseDataTableProps) => {
  // Saving it to a ref helps avoid infinite re-renders
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const scrollProps = useScrollableTable(tableContainerRef);
  const [resolveColumns, setResolveColumns] = useState([]);
  const enableHideColumnsRef = useRef<boolean>(enableHideColumns);

  useEffect(() => {
    setResolveColumns(
      getColumns(defaultColumns, scrollProps?.containerWith, offset),
    );
  }, [defaultColumns, offset, scrollProps?.containerWith]);

  const {
    columnOrder: columnOrderStore,
    setPagination: setPaginationStore,
    setSorting: setSortingStore,
    setColumnOrder: setColumnOrderStore,
    setColumnVisibility: setColumnVisibilityStore,
    setColumnPinning: setColumnPinningStore,
    setManualPagination: setManualPaginationStore,
    resetStoreData,
  } = useDataTableStore(tableId);

  const {
    columns,
    initialPagination,
    initialSorting,
    initialColumnPinning,
    initialColumnVisibility,
    initialManualPagination,
    defaultSorting,
    defaultColumnOrder,
    defaultColumnPinning,
    defaultPagination,
    defaultManualPagination,
  } = useInitialState(tableId, resolveColumns);

  // states
  const [data, setData] = useState(defaultData);
  const [pagination, setPagination] =
    useState<PaginationState>(initialPagination);
  const [sorting, setInternalSorting] = useState<SortingState>(initialSorting);
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    columnOrderStore?.length > 0
      ? columnOrderStore
      : (defaultColumns?.map((c) => c.id) as ColumnOrderState),
  );
  // TODO: state unnecessary use columnVisibility of table state
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialColumnVisibility,
  );
  const [columnPinning, setColumnPinning] =
    useState<ColumnPinningState>(initialColumnPinning);
  const [manualPagination, setManualPagination] =
    useState<ManualPaginationState>(initialManualPagination);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const setSorting = useCallback<OnChangeFn<SortingState>>(
    (sortingUpdater) => {
      setInternalSorting((prev) => {
        const newSortVal =
          typeof sortingUpdater === 'function'
            ? sortingUpdater?.(prev)
            : sortingUpdater;

        // send sort model to BE
        onSortModelChange?.(newSortVal);
        return newSortVal;
      });
    },
    [onSortModelChange],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      sorting,
      columnOrder,
      columnVisibility,
      rowSelection,
      columnPinning: {
        ...columnPinning,
        left: [ExpandedColumn.id, RowSelectionColumn.id, ...columnPinning.left],
        right: [...columnPinning.right, RowActionsColumn.id],
      },
    },
    onPaginationChange: (updater) => {
      const newPaginationValue =
        updater instanceof Function ? updater(pagination) : updater;
      setPagination(updater);
      setPaginationStore(newPaginationValue);
    },
    onColumnOrderChange: setColumnOrder,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnPinningChange: setColumnPinning,
    onRowSelectionChange: setRowSelection,
    manualPagination: manualPagination?.enabled ?? false,
    rowCount: manualPagination?.rowCount ?? undefined,
    columnResizeMode: 'onChange',
    enableMultiSort,
    manualSorting,
    maxMultiSortColCount: 2,
    autoResetPageIndex: false,
    enableRowSelection: true,
    isMultiSortEvent: () => true,
    getRowCanExpand: () => true,
    getRowId: (_row, index) => index.toString(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    defaultColumn: {
      size: initialConfig?.size,
      minSize: initialConfig?.minSize,
      maxSize: initialConfig?.maxSize,
      enableResizing: initialConfig?.enableResizing || true,
      enableSorting: initialConfig?.enableSorting || true,
      enableMultiSort: initialConfig?.enableMultiSort || enableMultiSort,
      enablePinning: initialConfig?.enablePinning || true,
      enableHiding: initialConfig?.enableHiding || true,
      enableColumnFilter: initialConfig?.enableColumnFilter || false,
      ...initialConfig,
    },
  });

  const resetTable = useCallback(() => {
    resetStoreData();
    setSorting(defaultSorting);
    table.setSorting(defaultSorting);
    setColumnOrder(defaultColumnOrder);
    table.setColumnOrder(defaultColumnOrder);
    setColumnVisibility(initialColumnVisibility);
    table.setColumnVisibility(initialColumnVisibility);
    setColumnPinning(defaultColumnPinning);
    table.setColumnPinning(defaultColumnPinning);
    setManualPagination(defaultManualPagination);
    setPagination(defaultPagination);
    table.setPagination(defaultPagination);
    table.reset();
  }, [
    resetStoreData,
    setSorting,
    defaultSorting,
    table,
    defaultColumnOrder,
    initialColumnVisibility,
    defaultColumnPinning,
    defaultManualPagination,
    defaultPagination,
  ]);

  useEffect(() => {
    if (defaultData) setData(defaultData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultData]);

  useEffect(() => {
    if (sorting) setSortingStore(sorting);
    if (columnOrder) setColumnOrderStore(columnOrder);
    if (columnVisibility) {
      setColumnVisibilityStore(columnVisibility);
      if (enableHideColumnsRef?.current) {
        const newColumns = [...defaultColumns];

        Object.entries(columnVisibility).forEach(([key, visible]) => {
          const index = newColumns.findIndex((item) => item.id === key);
          if (index !== -1) {
            newColumns[index].enableVisible = visible;
          }
        });
        setResolveColumns(
          getColumns(newColumns, scrollProps?.containerWith, offset),
        );
      }
    }
    if (columnPinning) setColumnPinningStore(columnPinning);
    if (manualPagination) setManualPaginationStore(manualPagination);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnOrder, columnPinning, columnVisibility, sorting]);

  useEffect(() => {
    if (!enableHideColumnsRef?.current) {
      // TODO: review save column visibility in zustand storage
      table.getAllColumns().forEach((column) => {
        if (column?.columnDef?.enableVisible !== undefined)
          column.toggleVisibility(column?.columnDef?.enableVisible ?? true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolveColumns]);

  return {
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
  };
};
export default useDataTable;
