/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  ColumnDef,
  ColumnOrderState,
  Row,
  RowData,
  Table,
  VisibilityState,
} from '@tanstack/react-table';
import styles from '../../../common/styles/main.module.css';
import {
  IDataTableStateMessage,
  IDataTableStyles,
  IHeaderOptions,
  IPaginationOptions,
  IRenderSubDataTable,
  IRowActions,
  ManualPaginationState,
  SubComponentProps,
  TData,
} from '../../../common/types';
import DragDropContentContext from '../../../context/DragDropContentContext';
import DragDropTableContext from '../../../context/DragDropTableContext';
import useScrollableTable from '../../../hooks/useScrollableTable';
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
 * `DataTableComponent` is a React component that displays a data table with sorting, pagination,
 * and optional subComponents. This component parameterized I expect by table of type Table<TData>
 * provided by TanStack Table, without this implementation I cannot work.
 * For more information, see the [React Table documentation](https://tanstack.com/react-table/).
 *
 * @component
 * @param {DataTableComponentProps<TData>} props The properties passed to the component.
 *
 * Data
 * @param {string} props.tableId Table id.
 * @param {Table<TData>} props.table Table instance.
 * @param {ColumnDef<TData, TData>[]} props.columns Array of column definitions.
 * @param {TData[]} props.data Array of data to display.
 * @param {React.Dispatch<React.SetStateAction<TData[]>>} props.setData Set data.
 *
 * State
 * @param {boolean} props.isLoading Loading state.
 * @param {boolean} props.isError Error state.
 * @param {ColumnOrderState} props.columnOrder Column order state.
 * @param {UniqueIdentifier[]} props.dataIds Data ids.
 * @param {React.Dispatch<React.SetStateAction<ColumnOrderState>>} props.setColumnOrder Set column order.
 *
 * Pagination
 * @param {IPaginationOptions} props.pagination Pagination options.
 * @param {boolean} props.pagination.showPagination Show pagination.
 * @param {number} props.pagination.pageIndex Page number.
 * @param {number} props.pagination.pageSize Page size.
 * @param {boolean} props.pagination.rowsInfo Show rows info.
 *
 * Others
 * @param {Partial<ColumnDef<TData, unknown>>} props.initialConfig Initial column configuration.
 * @param {boolean} props.showFooter Show footer.
 * @param {React.FC<SubComponentProps<TData>>} props.renderSubComponent Render subcomponent.
 * @param {string} props.title Table title.
 * @param {boolean} props.border Show border.
 * @param {IRowActions<TData>} props.rowActions Row actions.
 * @param {boolean} props.smallAnatomy Small anatomy.
 * @param {IDataTableStateMessage} props.stateMessage State message.
 *
 *
 * Header Options
 * @param {IHeaderOptions} props.headerOptions Header options.
 * @param {boolean} props.headerOptions.headerSticky Header sticky.
 * @param {React.ReactNode} props.headerOptions.headerContainer Header container.
 * @param {boolean} props.headerOptions.enableHideColumns Enable hide columns.
 * @param {boolean} props.headerOptions.enablePinLeftColumns Enable pin left columns.
 * @param {boolean} props.headerOptions.enablePinRightColumns Enable pin right columns.
 * @param {boolean} props.headerOptions.enableSortColumns Enable sort columns.
 * @param {boolean} props.headerOptions.enableResizeColumns Enable resize columns.
 * @param {boolean} props.headerOptions.enableDragColumns Enable drag columns.
 *
 *  * Custom Styles
 * @param {IDataTableStyles} props.sx Custom styles.
 * @param {React.CSSProperties} props.sx.container Custom styles for the container.
 * @param {React.CSSProperties} props.sx.messageContainer Custom styles for the message container.
 * @param {React.CSSProperties} props.sx.table Custom styles for the table.
 * @param {React.CSSProperties} props.sx.thead Custom styles for the header.
 * @param {React.CSSProperties} props.sx.tbody Custom styles for the tbody.
 * @param {React.CSSProperties} props.sx.tfoot Custom styles for the footer.
 * @param {React.CSSProperties} props.sx.header Custom styles for the header.
 * @param {React.CSSProperties} props.sx.row Custom styles for the row.
 * @param {React.CSSProperties} props.sx.column Custom styles for the column.
 * @param {React.CSSProperties} props.sx.cell Custom styles for the cell.
 *
 * @returns {ReactElement} Returns the data table UI.
 */

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    noDraggable: boolean;
  }
}

export interface IOptionalDataTableProps<TData> {
  sx?: IDataTableStyles;
  initialConfig?: Partial<ColumnDef<TData, unknown>>;
  isLoading?: boolean;
  isError?: boolean;
  isFetching?: boolean;
  pagination?: IPaginationOptions;
  title?: string;
  border?: boolean;
  headerOptions?: IHeaderOptions;
  smallAnatomy?: boolean;
  showFooter?: boolean;
  stateMessage?: IDataTableStateMessage;
  rowActions?: IRowActions<TData>[];
  renderSubComponent?: React.FC<SubComponentProps<TData>> | null;
  renderSubDataTable?: IRenderSubDataTable;
  setCurrentRow?: (row: Row<TData>) => void;
}

export interface DataTableComponentProps<TData>
  extends IOptionalDataTableProps<TData> {
  tableId: string;
  table: Table<TData>;
  data: TData[];
  columnOrder: ColumnOrderState;
  columnVisibility: VisibilityState;
  setColumnOrder: Dispatch<SetStateAction<ColumnOrderState>>;
  setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>;
  setManualPagination: Dispatch<SetStateAction<ManualPaginationState>>;
}

// @ts-ignore
const DataTableComponent: React.FC<DataTableComponentProps<TData>> = ({
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
}) => {
  // hooks
  const { colors } = useTableColors();
  const { containerWith, isScrollable, scrollX, handleScroll } =
    useScrollableTable(tableId);

  // states
  const [hoverColumns, setHoverColumns] = useState<boolean>(false);

  // options
  const isEmpty = !data || data?.length === 0;
  const checkState = isLoading || isError || isEmpty;
  const handleFetch = !isLoading && isFetching;
  const headerSticky = (!checkState && headerOptions?.headerSticky) ?? true;
  const headerContainer = headerOptions?.headerContainer;
  const isSubComponent = !!renderSubComponent || !!renderSubDataTable;
  const isRowActions = !!rowActions?.length;
  const isManualPagination = pagination?.manualPagination?.enabled;

  // internal columns
  const checkInternalColumns = isSubComponent || isRowActions;
  const checkInternalColumnsStorage =
    columnVisibility?.Expanded || columnVisibility?.RowActionsColumn;
  const hideInternalColumns = !isSubComponent && !isRowActions;

  const handleColumnVisibility = useCallback(
    (show?: boolean) => {
      table.setColumnVisibility((prev) => ({
        ...prev,
        Expanded: show ?? isSubComponent,
        RowActionsColumn: show ?? isRowActions,
      }));
      setColumnVisibility((prev) => ({
        ...prev,
        Expanded: show ?? isSubComponent,
        RowActionsColumn: show ?? isRowActions,
      }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isRowActions, isSubComponent, table]
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
        rowCount: pagination?.manualPagination?.rowCount,
      });
    }
    if (!isManualPagination) {
      setManualPagination({ enabled: false, rowCount: undefined });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, pagination, isManualPagination]);

  return (
    <TableWrapper
      tableId={tableId}
      title={title}
      border={border}
      isFetching={handleFetch}
      headerContainer={headerContainer}
      sx={sx}
    >
      <div
        id={`${tableId}-container`}
        onScroll={handleScroll}
        className={styles.container}
        style={{
          borderRadius:
            border && !title && !headerContainer ? '4px 4px 0px 0px' : '0px',
          backgroundColor: colors?.boxBg,
          ...sx?.container,
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
              width: table.getCenterTotalSize(),
              ...sx?.table,
            }}
          >
            <TableHead
              sx={sx}
              tableId={tableId}
              table={table}
              data={data}
              disabled={checkState}
              headerOptions={headerOptions}
              headerSticky={headerSticky}
              smallAnatomy={smallAnatomy}
              columnOrder={columnOrder}
              setHoverColumns={setHoverColumns}
            />
            {checkState && (
              <StateTableHandler
                isLoading={isLoading}
                isError={isError}
                isEmpty={isEmpty}
                containerWith={containerWith || 0}
                isScrollable={isScrollable}
                scrollX={scrollX}
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
                        {/* @ts-ignore */}
                        <TableRow
                          tableId={tableId}
                          table={table}
                          row={row}
                          index={index}
                          columnOrder={columnOrder}
                          isColumn={hoverColumns}
                          rowActions={rowActions}
                          style={{
                            row: sx?.row,
                            cell: sx?.cell,
                          }}
                          {...(setCurrentRow && {
                            onClick: (e) => {
                              e.preventDefault();
                              setCurrentRow && setCurrentRow(row);
                            },
                          })}
                        />
                        {isSubComponent && row.getIsExpanded() && (
                          <tr
                            style={{
                              width: containerWith,
                              position: 'relative',
                              borderBottom: `1px solid ${colors?.divider}`,
                            }}
                          >
                            <td
                              colSpan={row.getVisibleCells().length}
                              style={{
                                width: '100%',
                                height: '100%',
                                padding: 0,
                                position: 'relative',
                                backgroundColor: colors?.boxBg,
                              }}
                            >
                              <div
                                style={{
                                  width: containerWith,
                                  transform: isScrollable
                                    ? `translateX(${scrollX}px)`
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
                                    data={renderSubDataTable.data}
                                    columns={renderSubDataTable.columns}
                                    expandedColumnSize={50}
                                  />
                                ) : (
                                  renderSubComponent &&
                                  renderSubComponent({ row })
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
                  backgroundColor: colors?.headerBg,
                  color: colors?.secondaryText,
                  ...sx?.tfoot,
                }}
                table={table}
              />
            )}
          </table>
        </DragDropTableContext>
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
      </div>
    </TableWrapper>
  );
};

export default DataTableComponent;
