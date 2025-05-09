import React from 'react';
import { IManualPaginationOptions } from '../../common/types';
import useTableColors from '../../hooks/useTableColors';
import ArrowIndicator from '../Assets/ArrowIndicator';
import ArrowPaginationIndicator from '../Assets/ArrowPaginationIndicator';
import { IconButton } from '../Common/IconButton';
import styles from './pagination.module.css';

interface ManualPaginationProps {
  manualPagination?: IManualPaginationOptions;
  hideRecordsSelector?: boolean;
  rowsInfo?: boolean;
  style?: React.CSSProperties;
}

const ManualPagination: React.FC<ManualPaginationProps> = ({
  manualPagination,
  rowsInfo = false,
  hideRecordsSelector,
  style,
}) => {
  const { colors } = useTableColors();

  // Pagination state
  const pagination = manualPagination?.pagination;
  const setPagination = manualPagination?.setPagination;
  const pageIndex = pagination?.pageIndex || 0;
  const pageSize = pagination?.pageSize || 10;
  const paginationRowCount = manualPagination?.rowCount;
  const paginationPageCount = Math.ceil(paginationRowCount / pageSize) - 1;

  // Pagination controls
  const previousPageDisabled = pageIndex === 0;
  const nextPageDisabled =
    pageIndex === paginationPageCount || !paginationRowCount;
  const initialRows = pageSize * pageIndex + 1;
  const finalRows = pageSize * (pageIndex + 1);
  const preFinalRows = pageSize * pageIndex + 1;

  const pageSizeOptions = [5, 10, 20, 30, 40, 50];
  const options = pageSizeOptions?.includes(pageSize)
    ? pageSizeOptions
    : [pageSize, ...pageSizeOptions]?.sort((a, b) => a - b);

  return (
    <div className={styles.container} style={{ ...style }}>
      <div className={styles.leftContent}>
        {rowsInfo && (
          <p
            className={styles.captionText}
            style={{ color: colors.primaryText }}
          >
            {`Showing ${!nextPageDisabled ? initialRows : preFinalRows} of ${paginationRowCount} Rows`}
          </p>
        )}
      </div>
      <div className={styles.rightContent}>
        {!hideRecordsSelector && (
          <div className={styles.records}>
            <p
              className={styles.captionText}
              style={{ color: colors.primaryText }}
            >{`per page:`}</p>
            <select
              value={pageSize}
              onChange={(e) => {
                setPagination({
                  pageIndex: 0,
                  pageSize: Number(e.target.value),
                });
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
            {`${!nextPageDisabled ? initialRows : preFinalRows}-${!nextPageDisabled ? finalRows : paginationRowCount}
            of ${paginationRowCount} Rows`}
          </p>
        </div>
        <div className={styles.buttons}>
          <IconButton
            size="xl"
            isPinned
            onClick={() => {
              setPagination({
                pageIndex: 0,
                pageSize: pagination.pageSize,
              });
            }}
            disabled={previousPageDisabled}
            icon={<ArrowPaginationIndicator direction="first" />}
          />
          <IconButton
            size="xl"
            isPinned
            onClick={() => {
              setPagination({
                pageIndex: pageIndex - 1,
                pageSize: pageSize,
              });
            }}
            disabled={previousPageDisabled}
            icon={<ArrowIndicator direction="left" />}
          />
          <IconButton
            size="xl"
            isPinned
            onClick={() => {
              setPagination({
                pageIndex: pageIndex + 1,
                pageSize: pageSize,
              });
            }}
            disabled={nextPageDisabled}
            icon={<ArrowIndicator direction="right" />}
          />
          <IconButton
            size="xl"
            isPinned
            onClick={() => {
              setPagination({
                pageIndex: paginationPageCount,
                pageSize: pageSize,
              });
            }}
            disabled={nextPageDisabled}
            icon={<ArrowPaginationIndicator direction="last" />}
          />
        </div>
      </div>
    </div>
  );
};

export default ManualPagination;
