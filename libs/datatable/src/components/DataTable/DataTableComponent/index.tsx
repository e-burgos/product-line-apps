/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {
  Dispatch,
  Fragment,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ColumnOrderState,
  Table,
  VisibilityState,
} from '@tanstack/react-table';
import { OffsetColumn } from '../../../common/helpers/OffsetColumn';
import styles from '../../../common/styles/main.module.css';
import {
  IOptionalDataTableProps,
  ManualPaginationState,
} from '../../../common/types';
import { IScrollProps } from '../../../context/DataTableContext';
import DragDropContentContext from '../../../context/DragDropContentContext';
import DragDropTableContext from '../../../context/DragDropTableContext';
import useTableColors from '../../../hooks/useTableColors';
import Footer from '../../Footer';
import ManualPagination from '../../ManualPagination';
import Pagination from '../../Pagination';
import SubComponentDataTable from '../../SubComponentDataTable';
import StateTableHandler from '../StateTableHandler';
import TableHead from '../TableHead';
import TableRow from '../TableRow';
import TableWrapper from '../TableWrapper';

/**
 * Props for the DataTableComponent.
 *
 * @category ui/datatable
 * @subcategory Props
 *
 * @template TData - The type of data used in the table.
 * @extends IOptionalDataTableProps<TData> - Extends the optional properties for the data table.
 *
 * @property {string} tableId - Unique identifier for the table.
 * @property {Table<TData>} table - The table instance.
 * @property {Array<TData>} data - The data to be displayed in the table.
 * @property {boolean} [showHeader] - Whether to show the table header.
 * @property {ColumnOrderState} columnOrder - The order of columns in the table.
 * @property {VisibilityState} columnVisibility - The visibility state of columns.
 * @property {Dispatch<SetStateAction<ColumnOrderState>>} setColumnOrder - Function to set the order of columns.
 * @property {Dispatch<SetStateAction<VisibilityState>>} setColumnVisibility - Function to set the visibility of columns.
 * @property {Dispatch<SetStateAction<ManualPaginationState>>} setManualPagination - Function to manage manual pagination state.
 * @property {RefObject<HTMLDivElement>} [tableContainerRef] - Reference to the table container element.
 * @property {IScrollProps} [scrollProps] - Scroll-related properties for the table.
 */
export interface DataTableComponentProps<TData>
  extends IOptionalDataTableProps<TData> {
  tableId: string;
  table: Table<TData>;
  data: Array<TData>;
  showHeader?: boolean;
  columnOrder: ColumnOrderState;
  columnVisibility: VisibilityState;
  setColumnOrder: Dispatch<SetStateAction<ColumnOrderState>>;
  setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>;
  setManualPagination: Dispatch<SetStateAction<ManualPaginationState>>;
  tableContainerRef?: RefObject<HTMLDivElement>;
  scrollProps?: IScrollProps;
}

/**
 * DataTableComponent is a React component that displays a data table with sorting, pagination,
 * and optional subComponents, is a versatile and customizable table component designed to handle various data display needs.
 * It supports features like pagination, row selection, column visibility, and sub-components rendering.
 * This component is parameterized by a table of type `Table<TData>`
 * provided by TanStack Table. Without this implementation, it cannot function.
 * For more information, see the [React Table documentation](https://tanstack.com/react-table/).
 *
 * @category ui/datatable
 * @subcategory Components
 *
 * @component
 * @extends IOptionalDataTableProps<TData> - The data table properties.
 * @template TData - The type of data being displayed in the table.
 *
 * @param {DataTableComponentProps<TData>} props - The properties object.
 * @param {string} props.tableId - The unique identifier for the table.
 * @param {Table<TData>} props.table - The table instance.
 * @param {Array<TData>} props.data - The data to be displayed in the table.
 * @param {ColumnOrderState} props.columnOrder - The state of the column order.
 * @param {VisibilityState} props.columnVisibility - The state of the column visibility.
 * @param {Dispatch<SetStateAction<ColumnOrderState>>} props.setColumnOrder - Function to set the column order state.
 * @param {Dispatch<SetStateAction<VisibilityState>>} props.setColumnVisibility - Function to set the column visibility state.
 * @param {Dispatch<SetStateAction<ManualPaginationState>>} props.setManualPagination - Function to set the manual pagination state.
 * @param {RefObject<HTMLDivElement>} [props.tableContainerRef] - Optional reference to the table container element.
 * @param {IScrollProps} [props.scrollProps] - Optional scroll properties for the table.
 *
 * @returns {JSX.Element | null} The rendered DataTableComponent or null if the table instance is not provided.
 */

function DataTableComponent<TData>({
  tableId,
  table,
  data,
  initialConfig,
  isLoading = false,
  isError = false,
  isFetching = false,
  renderSubComponent,
  renderSubDataTable,
  showFooter,
  sx,
  title,
  border,
  headerOptions,
  rowActions,
  smallAnatomy,
  stateMessage,
  pagination,
  columnOrder,
  columnVisibility,
  setColumnOrder,
  setColumnVisibility,
  setManualPagination,
  setCurrentRow,
  forceShowMenuActions,
  scrollProps,
  tableContainerRef,
  rowSelection,
  showHeader = true,
}: DataTableComponentProps<TData>): JSX.Element | null {
  // hooks
  const { colors } = useTableColors();

  // states
  const [hoverColumns, setHoverColumns] = useState<boolean>(false);

  // options
  const isEmpty = !data || data?.length === 0;
  const checkState = isLoading || isError || isEmpty;
  const handleFetch = !isLoading && isFetching;
  const headerContainer = headerOptions?.headerContainer;
  const isSubComponent = !!renderSubComponent || !!renderSubDataTable;
  const isRowActions = !!rowActions?.length;
  const isRowSelection =
    rowSelection?.type === 'checkbox' || rowSelection?.type === 'radio';
  const isManualPagination = pagination?.manualPagination?.enabled;
  const containerWidth = scrollProps?.containerWith || 0;

  const columnsWidth: number = table.getAllColumns().reduce((acc, current) => {
    if ([OffsetColumn.id].includes(current.id)) return acc;
    if (
      // @ts-ignore
      current?.columnDef?.enableVisible === false ||
      !current.getIsVisible()
    ) {
      return acc;
    }
    return acc + current.getSize();
  }, 0);

  const columnOffset = useMemo(() => {
    const offset = containerWidth - columnsWidth;

    if (offset < 0) return 0;

    return offset;
  }, [columnsWidth, containerWidth]);

  // internal columns
  const checkInternalColumns = isSubComponent || isRowActions || isRowSelection;
  const checkInternalColumnsStorage =
    columnVisibility?.Expanded ||
    columnVisibility?.RowActionsColumn ||
    columnVisibility?.RowSelectionColumn;
  const hideInternalColumns =
    !isSubComponent && !isRowActions && !isRowSelection;

  const handleColumnVisibility = useCallback(
    (show?: boolean) => {
      table.setColumnVisibility((prev) => ({
        ...prev,
        Expanded: show ?? isSubComponent,
        RowActionsColumn: show ?? isRowActions,
        RowSelectionColumn: show ?? isRowSelection,
      }));
      setColumnVisibility((prev) => ({
        ...prev,
        Expanded: show ?? isSubComponent,
        RowActionsColumn: show ?? isRowActions,
        RowSelectionColumn: show ?? isRowSelection,
      }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isRowActions, isSubComponent, isRowSelection, table]
  );

  // filters
  useEffect(() => {
    if (initialConfig) table._getDefaultColumnDef = () => initialConfig;
    if (checkState) handleColumnVisibility(false);
    if (checkInternalColumns || checkInternalColumnsStorage)
      handleColumnVisibility();
    if (hideInternalColumns) handleColumnVisibility(false);
  }, [
    table,
    initialConfig,
    checkState,
    checkInternalColumns,
    hideInternalColumns,
    checkInternalColumnsStorage,
    handleColumnVisibility,
  ]);

  // Manual Pagination
  useEffect(() => {
    if (isManualPagination) {
      setManualPagination({
        enabled: true,
        rowCount: pagination?.manualPagination?.rowCount || 0,
      });
    }
    if (!isManualPagination) {
      setManualPagination({ enabled: false, rowCount: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, pagination, isManualPagination]);

  if (!table) return null;

  return (
    <TableWrapper
      tableId={tableId}
      title={title}
      border={border}
      isEmpty={isEmpty}
      isFetching={handleFetch}
      headerContainer={headerContainer}
      sx={sx}
    >
      <div
        id={`${tableId}-container`}
        onScroll={scrollProps?.handleScroll}
        ref={tableContainerRef}
        className={styles.tableContainer}
        style={{
          borderRadius:
            border && !title && !headerContainer ? '4px 4px 0px 0px' : '0px',
          backgroundColor: colors.boxBg,
          maxHeight: sx?.tableContainer?.maxHeight || '585px', // valid for 10 rows
          ...sx?.tableContainer,
        }}
      >
        <DragDropTableContext
          columnOrder={columnOrder}
          setColumnOrder={setColumnOrder}
        >
          <table
            id={`${tableId}-table`}
            className={styles.table}
            style={{
              width: table.getCenterTotalSize() || 0,
              ...sx?.table,
            }}
          >
            {showHeader && (
              <TableHead
                sx={sx}
                tableId={tableId}
                table={table}
                data={data}
                disabled={checkState}
                headerOptions={headerOptions}
                smallAnatomy={smallAnatomy}
                columnOrder={columnOrder}
                setHoverColumns={setHoverColumns}
                columnOffset={columnOffset}
              />
            )}
            {checkState && showHeader && (
              <StateTableHandler
                isLoading={isLoading}
                isError={isError}
                isEmpty={isEmpty}
                containerWith={containerWidth}
                isScrollable={scrollProps?.isScrollable || false}
                scrollX={scrollProps?.scrollX || 0}
                stateMessage={stateMessage}
              />
            )}
            {!checkState && (
              <tbody
                id="data-table-body"
                className={`${styles.tbody} ${smallAnatomy && styles.smallRow}`}
                style={{
                  position: 'relative',
                  ...sx?.tbody,
                }}
              >
                <DragDropContentContext columnOrder={columnOrder}>
                  {table.getRowModel().rows.map((row, index) => {
                    return (
                      <Fragment key={row.id}>
                        <TableRow
                          tableId={tableId}
                          table={table}
                          row={row}
                          index={index}
                          columnOrder={columnOrder}
                          isColumn={hoverColumns}
                          rowActions={rowActions}
                          rowSelection={rowSelection}
                          columnOffset={columnOffset}
                          smallAnatomy={smallAnatomy}
                          forceShowMenuActions={forceShowMenuActions}
                          style={{
                            row: sx?.row,
                            cell: sx?.cell,
                          }}
                          {...(setCurrentRow && {
                            onClick: (e) => {
                              e.preventDefault();
                              setCurrentRow(row);
                            },
                          })}
                        />
                        {isSubComponent && row.getIsExpanded() && (
                          <tr
                            className="datatable-expanded-row"
                            style={{
                              width: containerWidth,
                              position: 'relative',
                              borderBottom: `1px solid ${colors.divider}`,
                              ...sx?.rowExpanded,
                            }}
                          >
                            <td
                              colSpan={row.getVisibleCells().length}
                              style={{
                                width: '100%',
                                height: '100%',
                                padding: 0,
                                position: 'relative',
                                backgroundColor: colors.rowExpandedBg,
                              }}
                            >
                              <div
                                style={{
                                  width: containerWidth,
                                  transform: scrollProps?.isScrollable
                                    ? `translateX(${scrollProps?.scrollX}px)`
                                    : 'none',
                                  transition: 'transform 0.2s',
                                  transitionBehavior: 'smooth',
                                }}
                                className={styles.subComponent}
                              >
                                {renderSubDataTable ? (
                                  <SubComponentDataTable
                                    row={row}
                                    tableId={tableId}
                                    renderSubDataTable={renderSubDataTable}
                                  />
                                ) : (
                                  renderSubComponent &&
                                  renderSubComponent({
                                    row,
                                    columns: table.getAllColumns(),
                                  })
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
                </DragDropContentContext>
              </tbody>
            )}
            {!checkState && showFooter && (
              <Footer
                className={`${styles.footer} ${
                  smallAnatomy && styles.smallFooter
                }`}
                sx={{
                  backgroundColor: colors.headerBg,
                  color: colors.secondaryText,
                  ...sx?.tfoot,
                }}
                table={table}
              />
            )}
          </table>
        </DragDropTableContext>
      </div>
      {!isEmpty && (
        <>
          {!checkState && !isManualPagination && pagination?.showPagination && (
            <Pagination
              tableId={tableId}
              table={table}
              pagination={pagination}
              style={sx?.pagination}
            />
          )}
          {isManualPagination && pagination?.showPagination && (
            <ManualPagination
              manualPagination={pagination.manualPagination}
              rowsInfo={pagination.rowsInfo}
              hideRecordsSelector={pagination.hideRecordsSelector}
              style={sx?.pagination}
            />
          )}
        </>
      )}
    </TableWrapper>
  );
}

export default DataTableComponent;
