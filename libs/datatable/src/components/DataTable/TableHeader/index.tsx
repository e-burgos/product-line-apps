/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Children,
  CSSProperties,
  FC,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { flexRender, Header, HeaderGroup } from '@tanstack/react-table';
import { cn } from '../../../common/helpers/cn';
import { ExpandedColumn } from '../../../common/helpers/ExpandedColumn';
import { OffsetColumn } from '../../../common/helpers/OffsetColumn';
import { RowActionsColumn } from '../../../common/helpers/RowActionsColumn';
import { RowSelectionColumn } from '../../../common/helpers/RowSelectionColumn';
import animationStyles from '../../../common/styles/animations.module.css';
import {
  HeaderActionType,
  HoverType,
  IHeaderOptions,
  TData,
} from '../../../common/types';
import { useComponentEventListener } from '../../../hooks/useComponentEventListener';
import useGetCommonPinningStyles from '../../../hooks/useGetCommonPinningStyles';
import useTableColors from '../../../hooks/useTableColors';
import DragIndicator from '../../Assets/DragIndicator';
import ColumnPin from './ColumnPin';
import ColumnSearcher from './ColumnSearcher';
import ColumnSort from './ColumnSort';
import ColumnVisibility from './ColumnVisibility';
import styles from './table-header.module.css';

interface TableHeaderProps {
  header: Header<TData, unknown>;
  headerGroup: HeaderGroup<TData>;
  index: number;
  headerOptions?: IHeaderOptions;
  disabled?: boolean;
  isHeaderFixed?: boolean;
  style?: React.CSSProperties;
  columnOffset: number;
  tableId: string;
}

const TableHeader: FC<TableHeaderProps> = ({
  header,
  //headerGroup,
  index,
  headerOptions,
  disabled,
  isHeaderFixed,
  style,
  columnOffset,
  tableId,
}) => {
  const { element: tableContainer } = useComponentEventListener(
    `${tableId}-container`,
  );
  const { colors } = useTableColors();
  const { pinStyles, isPinned } = useGetCommonPinningStyles(header.column);
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id,
    });

  const [isHoverResize, setIsHoverResize] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [hoverColumn, setHoverColumn] = useState<boolean>(false);
  const [hoverDrag, setHoverDrag] = useState<HoverType>({
    hover: false,
    index,
  });

  const handleHeaderAction = (action: HeaderActionType) => {
    if (disabled) return false;
    else
      switch (action) {
        case 'drag':
          return headerOptions?.enableDragColumns ?? true;
        case 'sort':
          return headerOptions?.enableSortColumns ?? true;
        case 'pin-left':
          return headerOptions?.enablePinLeftColumns ?? true;
        case 'pin-right':
          return headerOptions?.enablePinRightColumns;
        case 'visibility':
          return headerOptions?.enableHideColumns;
        case 'resize':
          return headerOptions?.enableResizeColumns ?? true;
        default:
          break;
      }
  };

  const enableDragColumns = handleHeaderAction('drag');
  const enableSortColumns = handleHeaderAction('sort');
  const enablePinLeftColumns = handleHeaderAction('pin-left');
  const enablePinRightColumns = handleHeaderAction('pin-right');
  const enableHideColumns = handleHeaderAction('visibility');
  const enableResizeColumns = handleHeaderAction('resize');

  const enableDraggableColumnConfig = header.column.columnDef.enableDraggable;
  const isExpandedColumn = header.column.columnDef?.id === ExpandedColumn.id;
  const rowSelectionColumn =
    header.column.columnDef?.id === RowSelectionColumn.id;
  const isRowActionsColumn = header.column.id === RowActionsColumn.id;
  const isOffsetColumn = header?.column?.id === OffsetColumn?.id;
  const isEnabledActions = !isDragging || isHoverResize;
  const isEnabledResize =
    !isRowActionsColumn && !isOffsetColumn && !isDragging && !isExpandedColumn;

  const draggableColumn =
    enableDraggableColumnConfig &&
    enableDragColumns &&
    !isExpandedColumn &&
    !rowSelectionColumn &&
    !isRowActionsColumn &&
    !isOffsetColumn;

  const handleBgColor = () => {
    if (isDragging) return colors.draggedBg;
    if (isHeaderFixed) return colors.headerPinned;
    if (isPinned) {
      if (isRowActionsColumn) return 'transparent';
      if (isExpandedColumn) return colors.headerPinned;
      if (rowSelectionColumn) return colors.headerPinned;
      return colors?.headerBg;
    }
    return style?.backgroundColor;
  };

  const isDragColumn = isHover || isDragging;

  const dragStyle: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.8 : 1,
  };

  const renderActions = useMemo(() => {
    if (isOffsetColumn) return [];

    const show = isHoverResize || hoverColumn;

    return [
      // sort icon
      enableSortColumns &&
        header.column.getCanSort() &&
        (header.column.getIsSorted() ? (
          <ColumnSort header={header} isPinned />
        ) : (
          show && <ColumnSort header={header} />
        )),

      // visibility icon
      enableHideColumns && header.column.getCanHide() && show && (
        <ColumnVisibility header={header} />
      ),

      // TODO: Search icon
      header.column.getCanFilter() && show && (
        <ColumnSearcher column={header.column} />
      ),

      // pin icon
      header.column.getCanPin() &&
        (header.column.getIsPinned() ? (
          <ColumnPin
            enablePinLeftColumns={enablePinLeftColumns}
            enablePinRightColumns={enablePinRightColumns}
            header={header}
          />
        ) : (
          show && (
            <ColumnPin
              enablePinLeftColumns={enablePinLeftColumns}
              enablePinRightColumns={enablePinRightColumns}
              header={header}
            />
          )
        )),
    ].filter(Boolean);
  }, [
    isOffsetColumn,
    isHoverResize,
    hoverColumn,
    enableSortColumns,
    header,
    enableHideColumns,
    enablePinLeftColumns,
    enablePinRightColumns,
  ]);

  const actionsLength = Children.count(renderActions);

  // review
  const width = useMemo(() => {
    const value = isOffsetColumn ? columnOffset : pinStyles?.width;

    if (Number.isNaN(value)) {
      return 0;
    }

    return value;
  }, [columnOffset, isOffsetColumn, pinStyles?.width]);

  useEffect(() => {
    if (tableContainer) {
      if (isDragging) tableContainer.style.overflow = 'hidden';
      else tableContainer.style.overflow = 'auto';
    }
  }, [isDragging, tableContainer]);

  // effect for reset hover resize
  useEffect(() => {
    const handleDocumentMouseUp = () => {
      setIsHoverResize(false);
    };

    document.addEventListener('mouseup', handleDocumentMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleDocumentMouseUp);
    };
  }, []);

  if (isOffsetColumn && width === 0) return null;

  const enabledDraggableIcon =
    (hoverColumn || isDragColumn) &&
    draggableColumn &&
    !isPinned &&
    !isOffsetColumn &&
    enableDraggableColumnConfig &&
    !isHoverResize;

  return (
    <th
      key={`header-${header.column.id || index}`}
      id={`col-${header.column.id}`}
      colSpan={header.colSpan}
      ref={setNodeRef}
      style={{
        ...style,
        ...dragStyle,
        ...pinStyles,
        width: width,
        minWidth: isOffsetColumn ? undefined : pinStyles?.minWidth,
        zIndex: isRowActionsColumn ? 0 : isDragColumn || isPinned ? 10 : 0,
        backgroundColor: handleBgColor(),
      }}
      className={cn([styles.th, isPinned && styles.pinColumn])}
      onDoubleClick={() => header.column.resetSize()}
      onMouseEnter={() => setHoverColumn(true)}
      onMouseLeave={() => setHoverColumn(false)}
      onBlur={() => setHoverColumn(false)}
    >
      {/* Wrapper of column header for launch drag events */}
      <div
        className={cn([
          isExpandedColumn || rowSelectionColumn
            ? styles.flexHeader
            : styles.headerLeftContent,
        ])}
      >
        {/* padding left */}
        <div className={styles.paddingWidth} />

        {/* Header title */}
        <div
          className={cn([
            styles.headerLeftContentOverflow,
            isDragging && styles.allAnimationEaseInOut,
          ])}
          style={{
            // 28px width button and 2px gap and 24px of padding
            width: `calc(100% - ${(isEnabledActions ? actionsLength * (28 + 2) : 0) + 24}px)`,
            paddingLeft: isDragging ? 5 : 0,
          }}
        >
          {/* Only show when columns is dragging */}
          {enabledDraggableIcon && (
            <span
              className={cn([
                (hoverColumn || isDragging) && styles.pinned,
                styles.cursorPointer,
                styles.allAnimationEaseInOut,
                animationStyles?.fadeIn,
              ])}
              style={{
                paddingLeft: isDragging ? 5 : 0,
              }}
              onMouseEnter={() => {
                setIsHover(true);
                draggableColumn &&
                  hoverColumn &&
                  setHoverDrag({ hover: true, index });
              }}
              onMouseLeave={() => {
                setIsHover(false);
                draggableColumn &&
                  hoverColumn &&
                  setHoverDrag({ hover: false, index });
              }}
              {...attributes}
              {...listeners}
            >
              <DragIndicator
                size={16}
                direction="vertical"
                color={isDragColumn ? colors.primaryText : colors.disabled}
              />
            </span>
          )}

          {/* Render name of the column */}
          {!header.isPlaceholder &&
            flexRender(
              header.column.columnDef.header,
              header.getContext() as any,
            )}
        </div>

        {/* padding right */}
        <div className={styles.paddingWidth} />
      </div>

      {/* Render actions like sort, pinned... */}
      {isEnabledActions && (
        <div
          key={`headerRightContent-${header.column.id || index}`}
          className={styles.headerRightContent}
        >
          {renderActions}
        </div>
      )}

      {/* Resize component wrapper */}
      {isEnabledResize && (
        <div
          onMouseUp={() => setIsHoverResize(false)}
          onMouseDown={(e) => {
            setIsHoverResize(true);
            return enableResizeColumns && !hoverDrag.hover
              ? header.getResizeHandler()(e)
              : undefined;
          }}
          onTouchStart={
            enableResizeColumns && !hoverDrag.hover
              ? header.getResizeHandler()
              : undefined
          }
          className={cn([
            styles.resizerWrapper,
            header.column.getCanResize() && styles.enabledResizer,
            isHoverResize && styles.hoverResize,
          ])}
        >
          {/* Resize ui bar */}
          <div
            // style={handleColumnDividerIndicator()}
            className={cn([styles.resizer])}
          />
        </div>
      )}
    </th>
  );
};

export default TableHeader;
