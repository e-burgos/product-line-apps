import React from 'react';
import {
  ColumnDef,
  ColumnPinningState,
  PaginationState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import { ExpandedColumn } from '../common/helpers/ExpandedColumn';
import { RowActionsColumn } from '../common/helpers/RowActionsColumn';
import { ManualPaginationState, TData } from '../common/types';
import useDataTableStore from './useDataTableStore';

export const useInitialState = (
  tableId: string,
  defaultColumns: ColumnDef<TData, TData>[]
) => {
  const {
    pagination: paginationStore,
    sorting: sortingStore,
    columnOrder: columnOrderStore,
    columnVisibility: columnVisibilityStore,
    columnPinning: columnPinningStore,
    manualPagination: manualPaginationStore,
  } = useDataTableStore(tableId);

  const columns = React.useMemo<typeof defaultColumns>(
    () => [ExpandedColumn, ...defaultColumns, RowActionsColumn],
    [defaultColumns]
  );

  const initialPagination = React.useMemo<PaginationState>(() => {
    return {
      pageIndex: paginationStore?.pageIndex || 0,
      pageSize: paginationStore?.pageSize || 10,
    };
  }, [paginationStore]);

  const defaultPagination = React.useMemo<PaginationState>(() => {
    return {
      pageIndex: 0,
      pageSize: 10,
    };
  }, []);

  const initialSorting = React.useMemo<SortingState>(() => {
    if (sortingStore?.length === 0) return [];
    return sortingStore;
  }, [sortingStore]);

  const defaultSorting = React.useMemo<SortingState>(() => {
    return [];
  }, []);

  const initialColumnOrder = React.useMemo<string[]>(() => {
    if (columnOrderStore?.length !== 0)
      return columnOrderStore.filter((id): id is string => id !== undefined);
    const initialState = columns
      .map((c) => c.id)
      .filter((id): id is string => id !== undefined);
    return initialState;
  }, [columnOrderStore, columns]);

  const defaultColumnOrder = React.useMemo<string[]>(() => {
    return columns
      .map((c) => c.id)
      .filter((id): id is string => id !== undefined);
  }, [columns]);

  const initialColumnVisibility = React.useMemo<VisibilityState>(() => {
    if (columnVisibilityStore !== undefined) return columnVisibilityStore;
    const initialState = columns.reduce<VisibilityState>((acc, c) => {
      if (c.id !== undefined) {
        acc[c.id] = true;
      }
      return acc;
    }, {});
    return initialState;
  }, [columnVisibilityStore, columns]);

  const defaultColumnVisibility = React.useMemo<VisibilityState>(() => {
    return columns.reduce<VisibilityState>((acc, c) => {
      if (c.id !== undefined) {
        acc[c.id] = true;
      }
      return acc;
    }, {});
  }, [columns]);

  const initialColumnPinning = React.useMemo<ColumnPinningState>(() => {
    if (columnPinningStore !== undefined) return columnPinningStore;
    const initialState: ColumnPinningState = {
      left: [] as string[],
      right: [] as string[],
    };
    return initialState;
  }, [columnPinningStore]);

  const defaultColumnPinning = React.useMemo<ColumnPinningState>(() => {
    return {
      left: [] as string[],
      right: [] as string[],
    };
  }, []);

  const initialManualPagination = React.useMemo<ManualPaginationState>(() => {
    return {
      enabled: manualPaginationStore?.enabled ?? false,
      rowCount: manualPaginationStore?.rowCount ?? undefined,
    };
  }, [manualPaginationStore]);

  const defaultManualPagination = React.useMemo<ManualPaginationState>(() => {
    return {
      enabled: false,
      rowCount: undefined,
    };
  }, []);

  return {
    columns,
    initialPagination,
    initialSorting,
    initialColumnOrder,
    initialColumnVisibility,
    initialColumnPinning,
    initialManualPagination,
    defaultPagination,
    defaultSorting,
    defaultColumnOrder,
    defaultColumnVisibility,
    defaultColumnPinning,
    defaultManualPagination,
  };
};

export default useInitialState;
