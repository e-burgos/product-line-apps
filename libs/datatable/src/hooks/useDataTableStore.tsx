import {
  ColumnFiltersState,
  ColumnOrderState,
  ColumnPinningState,
  PaginationState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import { create } from 'zustand';
import { ManualPaginationState } from '../common/types';
import { storage } from 'libs/ui/src/libs/local-storage';

export interface ITableData {
  id: string;
  pagination: PaginationState;
  sorting: SortingState;
  columnOrder: ColumnOrderState;
  columnVisibility: VisibilityState;
  columnPinning: ColumnPinningState;
  columnFilters: ColumnFiltersState;
  manualPagination: ManualPaginationState;
}

export interface DataTableStore {
  tableData: ITableData;
  setPagination: (value: PaginationState) => void;
  setTotalCount?: (value: number) => void;
  setSorting: (value: SortingState) => void;
  setColumnOrder: (value: ColumnOrderState) => void;
  setColumnVisibility: (value: VisibilityState) => void;
  setColumnPinning: (value: ColumnPinningState) => void;
  setColumnFilters: (value: ColumnFiltersState) => void;
  setManualPagination: (value: ManualPaginationState) => void;
  resetStoreData: () => void;
}

export const useDataTableStore = (tableId: string) => {
  const useTableStore = create<DataTableStore>((set) => {
    const tableDataStorage: ITableData =
      storage.get(`${tableId}-datatable`) || null;
    return {
      tableData: {
        id: tableId,
        pagination: {
          pageSize: tableDataStorage?.pagination?.pageSize || 10,
          pageIndex: tableDataStorage?.pagination?.pageIndex || 0,
        },
        sorting: tableDataStorage?.sorting || [],
        columnOrder: tableDataStorage?.columnOrder || [],
        columnVisibility: tableDataStorage?.columnVisibility || {},
        columnPinning: tableDataStorage?.columnPinning || {
          left: [],
          right: [],
        },
        columnFilters: tableDataStorage?.columnFilters || [],
        manualPagination: tableDataStorage?.manualPagination || {
          enabled: false,
          rowCount: undefined,
        },
      },
      setPagination: (value: PaginationState) => {
        if (tableId) {
          return set((state) => {
            storage.set(`${tableId}-datatable`, {
              ...state.tableData,
              pagination: value,
            });
            return {
              tableData: {
                ...state.tableData,
                pagination: value,
              },
            };
          });
        }
      },
      setTotalCount: (value: number) => {
        if (tableId) {
          return set((state) => {
            storage.set(`${tableId}-datatable`, {
              ...state.tableData,
              totalCount: value,
            });
            return {
              tableData: {
                ...state.tableData,
                totalCount: value,
              },
            };
          });
        }
      },
      setSorting: (value: SortingState) => {
        if (tableId)
          return set((state) => {
            storage.set(`${tableId}-datatable`, {
              ...state.tableData,
              sorting: value,
            });
            return {
              tableData: {
                ...state.tableData,
                sorting: value,
              },
            };
          });
        return null;
      },
      setColumnOrder: (value: ColumnOrderState) => {
        if (tableId)
          return set((state) => {
            storage.set(`${tableId}-datatable`, {
              ...state.tableData,
              columnOrder: value,
            });
            return {
              tableData: {
                ...state.tableData,
                columnOrder: value,
              },
            };
          });
        return null;
      },
      setColumnVisibility: (value: VisibilityState) => {
        if (tableId)
          return set((state) => {
            storage.set(`${tableId}-datatable`, {
              ...state.tableData,
              columnVisibility: value,
            });
            return {
              tableData: {
                ...state.tableData,
                columnVisibility: value,
              },
            };
          });
        return null;
      },
      setColumnPinning: (value: ColumnPinningState) => {
        if (tableId)
          return set((state) => {
            storage.set(`${tableId}-datatable`, {
              ...state.tableData,
              columnPinning: value,
            });
            return {
              tableData: {
                ...state.tableData,
                columnPinning: value,
              },
            };
          });
        return null;
      },
      setColumnFilters: (value: ColumnFiltersState) => {
        if (tableId)
          return set((state) => {
            storage.set(`${tableId}-datatable`, {
              ...state.tableData,
              columnFilters: value,
            });
            return {
              tableData: {
                ...state.tableData,
                columnFilters: value,
              },
            };
          });
        return null;
      },
      setManualPagination: (value: ManualPaginationState) => {
        if (tableId)
          return set((state) => {
            storage.set(`${tableId}-datatable`, {
              ...state.tableData,
              manualPagination: value,
            });
            return {
              tableData: {
                ...state.tableData,
                manualPagination: value,
              },
            };
          });
        return null;
      },
      resetStoreData: () => {
        if (tableId)
          return set(() => {
            storage.remove(`${tableId}-datatable`);
            return {
              tableData: {
                id: tableId,
                table: null,
                pagination: {
                  pageSize: 10,
                  pageIndex: 0,
                },
                totalCount: 0,
                sorting: [],
                columnOrder: [],
                columnVisibility: {},
                columnPinning: {
                  left: [],
                  right: [],
                },
                columnFilters: [],
                manualPagination: {
                  enabled: false,
                  rowCount: undefined,
                },
              },
            };
          });
        return null;
      },
    };
  });

  const {
    tableData: {
      pagination,
      sorting,
      columnOrder,
      columnVisibility,
      columnPinning,
      columnFilters,
      manualPagination,
    },
    setPagination,
    setTotalCount,
    setSorting,
    setColumnOrder,
    setColumnVisibility,
    setColumnPinning,
    setColumnFilters,
    setManualPagination,
    resetStoreData,
  } = useTableStore();

  return {
    pagination,
    sorting,
    columnOrder,
    columnVisibility,
    columnPinning,
    columnFilters,
    manualPagination,
    setPagination,
    setTotalCount,
    setSorting,
    setColumnOrder,
    setColumnVisibility,
    setColumnPinning,
    setColumnFilters,
    setManualPagination,
    resetStoreData,
  };
};
export default useDataTableStore;
