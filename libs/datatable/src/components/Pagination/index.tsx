import React, { useCallback, useEffect } from 'react';
import { Table } from '@tanstack/react-table';
import { TData, IPaginationOptions } from '../../common/types';
import { useDataTableStore } from '../../hooks';
import useTableColors from '../../hooks/useTableColors';
import ArrowIndicator from '../Assets/ArrowIndicator';
import ArrowPaginationIndicator from '../Assets/ArrowPaginationIndicator';
import { IconButton } from '../Common/IconButton';
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
            style={{ color: colors.primaryText }}
          >
            {`Showing ${table.getCanNextPage() ? initialRows : preFinalRows} of ${table.getRowCount()} Rows`}
          </p>
        )}
      </div>
      <div className={styles.rightContent}>
        {!pagination?.hideRecordsSelector && (
          <div className={styles.records}>
            <p
              className={styles.captionText}
              style={{ color: colors.primaryText }}
            >{`per page:`}</p>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              style={{ color: colors.primaryText }}
            >
              {options.map((pageSize) => (
                <option
                  style={{
                    color: colors.primaryText,
                    background: colors.rowExpandedBg,
                  }}
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
            style={{ color: colors.primaryText }}
          >
            {`${table.getCanNextPage() ? initialRows : preFinalRows}-${table.getCanNextPage() ? finalRows : table.getRowCount()}
            of ${table.getRowCount()} Rows`}
          </p>
        </div>
        <div className={styles.buttons}>
          <IconButton
            size="xl"
            isPinned
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            icon={<ArrowPaginationIndicator direction="first" />}
          />
          <IconButton
            size="xl"
            isPinned
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            icon={<ArrowIndicator direction="left" />}
          />
          <IconButton
            size="xl"
            isPinned
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            icon={<ArrowIndicator direction="right" />}
          />
          <IconButton
            size="xl"
            isPinned
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            icon={<ArrowPaginationIndicator direction="last" />}
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
