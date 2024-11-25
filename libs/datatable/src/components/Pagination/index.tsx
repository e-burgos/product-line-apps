import React, { useCallback, useEffect } from 'react';
import { Table } from '@tanstack/react-table';
import { TData, IPaginationOptions } from '../../common/types';
import { useDataTableStore } from '../../hooks';
import useTableColors from '../../hooks/useTableColors';
import ArrowIndicator from '../Assets/ArrowIndicator';
import ArrowPaginationIndicator from '../Assets/ArrowPaginationIndicator';
import AssetButton from '../Assets/AssetButton';
import styles from './pagination.module.css';

interface PaginationProps {
  tableId: string;
  table: Table<TData>;
  pagination?: IPaginationOptions;
  style?: React.CSSProperties;
}
const Pagination: React.FC<PaginationProps> = ({
  tableId,
  table,
  pagination,
  style,
}) => {
  const { pagination: paginationStore } = useDataTableStore(tableId);
  const { colors } = useTableColors();
  const paginationPageSize = pagination?.pageSize || 10;
  const paginationPageIndex = pagination?.pageIndex || 0;
  const defaultPagination = pagination?.takeDefaultPagination || false;

  const handlePagination = useCallback(() => {
    if (paginationStore?.pageSize && !defaultPagination) {
      table.setPageSize(paginationStore.pageSize);
      table.setPageIndex(paginationStore.pageIndex);
      return;
    }
    table.setPageSize(paginationPageSize);
    table.setPageIndex(paginationPageIndex);
  }, [
    paginationPageIndex,
    paginationPageSize,
    paginationStore,
    defaultPagination,
    table,
  ]);

  useEffect(() => {
    handlePagination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialRows =
    table.getRowModel().rows.length * table.getState().pagination.pageIndex + 1;
  const finalRows =
    table.getState().pagination.pageSize *
    (table.getState().pagination.pageIndex + 1);
  const preFinalRows =
    table.getState().pagination.pageSize *
      table.getState().pagination.pageIndex +
    1;

  const pageSizeOptions = [5, 10, 20, 30, 40, 50];
  const options = pageSizeOptions?.includes(paginationPageSize)
    ? pageSizeOptions
    : [paginationPageSize, ...pageSizeOptions]?.sort((a, b) => a - b);

  return (
    <div className={styles.container} style={{ ...style }}>
      <div className={styles.leftContent}>
        {pagination?.rowsInfo && (
          <p
            className={styles.captionText}
            style={{ color: colors?.primaryText }}
          >
            {`Showing ${
              table.getCanNextPage() ? initialRows : preFinalRows
            } of ${table.getRowCount()} Rows`}
          </p>
        )}
      </div>
      <div className={styles.rightContent}>
        {!pagination?.hideRecordsSelector && (
          <div className={styles.records}>
            <p
              className={styles.captionText}
              style={{ color: colors?.primaryText }}
            >{`per page:`}</p>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              style={{ color: colors?.primaryText }}
            >
              {options.map((pageSize) => (
                <option
                  style={{ color: colors?.primaryText }}
                  key={pageSize}
                  value={pageSize}
                >
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={styles.pageInfo}>
          <p
            className={styles.captionText}
            style={{ color: colors?.primaryText }}
          >
            {`${table.getCanNextPage() ? initialRows : preFinalRows}-${
              table.getCanNextPage() ? finalRows : table.getRowCount()
            } 
            of ${table.getRowCount()} Rows`}
          </p>
        </div>
        <div className={styles.buttons}>
          <AssetButton
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowPaginationIndicator
              direction="first"
              size={20}
              color={!table.getCanPreviousPage() ? colors?.disabled : undefined}
            />
          </AssetButton>
          <AssetButton
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowIndicator
              direction="left"
              size={20}
              color={!table.getCanPreviousPage() ? colors?.disabled : undefined}
            />
          </AssetButton>
          <AssetButton
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ArrowIndicator
              direction="right"
              size={20}
              color={!table.getCanNextPage() ? colors?.disabled : ''}
            />
          </AssetButton>
          <AssetButton
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <ArrowPaginationIndicator
              direction="last"
              size={20}
              color={!table.getCanNextPage() ? colors?.disabled : undefined}
            />
          </AssetButton>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
