/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react';
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
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { ManualPaginationState, TData } from '../common/types';
import useDataTableStore from './useDataTableStore';
import useInitialState from './useInitialState';

export const useDataTable = (
  tableId: string,
  defaultData: TData[],
  defaultColumns: ColumnDef<any, any>[],
  initialConfig?: Partial<ColumnDef<TData, unknown>>
) => {
  const {
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
    initialColumnOrder,
    initialColumnPinning,
    initialColumnVisibility,
    initialManualPagination,
    defaultSorting,
    defaultColumnOrder,
    defaultColumnVisibility,
    defaultColumnPinning,
    defaultPagination,
    defaultManualPagination,
  } = useInitialState(tableId, defaultColumns);

  // states
  const [data, setData] = useState(defaultData);
  const [pagination, setPagination] =
    useState<PaginationState>(initialPagination);
  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [columnOrder, setColumnOrder] =
    useState<ColumnOrderState>(initialColumnOrder);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialColumnVisibility
  );
  const [columnPinning, setColumnPinning] =
    useState<ColumnPinningState>(initialColumnPinning);
  const [manualPagination, setManualPagination] =
    useState<ManualPaginationState>(initialManualPagination);

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      sorting,
      columnOrder,
      columnVisibility,
      columnPinning: {
        ...columnPinning,
        left: ['Expanded', ...(columnPinning.left ?? [])],
        right: [...(columnPinning.right ?? []), 'RowActionsColumn'],
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
    manualPagination: manualPagination?.enabled ?? false,
    rowCount: manualPagination?.rowCount ?? undefined,
    columnResizeMode: 'onChange',
    enableMultiSort: true,
    maxMultiSortColCount: 2,
    autoResetPageIndex: false,
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
      enableMultiSort: initialConfig?.enableMultiSort || true,
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
    setColumnVisibility(defaultColumnVisibility);
    table.setColumnVisibility(defaultColumnVisibility);
    setColumnPinning(defaultColumnPinning);
    table.setColumnPinning(defaultColumnPinning);
    setManualPagination(defaultManualPagination);
    setPagination(defaultPagination);
    table.setPagination(defaultPagination);
    table.reset();
  }, [
    defaultColumnOrder,
    defaultColumnPinning,
    defaultColumnVisibility,
    defaultManualPagination,
    defaultPagination,
    defaultSorting,
    resetStoreData,
    table,
  ]);

  useEffect(() => {
    if (defaultData) setData(defaultData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultData]);

  useEffect(() => {
    if (sorting) setSortingStore(sorting);
    if (columnOrder) setColumnOrderStore(columnOrder);
    if (columnVisibility) setColumnVisibilityStore(columnVisibility);
    if (columnPinning) setColumnPinningStore(columnPinning);
    if (manualPagination) setManualPaginationStore(manualPagination);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnOrder, columnPinning, columnVisibility, sorting]);

  return {
    table,
    data,
    sorting,
    pagination,
    columnOrder,
    columnVisibility,
    columnPinning,
    manualPagination,
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
