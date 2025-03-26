import { useCallback, useEffect, useRef, useState } from 'react';
import { Row } from '@tanstack/react-table';
import {
  HoverType,
  IRowActions,
  RowActionsType,
  TData,
} from '../../../../../common/types';
import useComponentEventListener from '../../../../../hooks/useComponentEventListener';
import useTableColors from '../../../../../hooks/useTableColors';
import DeleteIndicator from '../../../../Assets/DeleteIndicator';
import DownloadIndicator from '../../../../Assets/DownloadIndicator';
import EditIndicator from '../../../../Assets/EditIndicator';
import MoreIndicator from '../../../../Assets/MoreIndicator';
import OpenNewTab from '../../../../Assets/OpenNewTab';
import VisibilityIndicator from '../../../../Assets/VisibilityIndicator';
import VoidIndicator from '../../../../Assets/VoidIndicator';
import { IconButton } from '../../../../Common/IconButton';
import { Tooltip } from '../../../../Common/Tooltip';
import styles from './row-actions-cell.module.css';

export interface RowActionsCellProps {
  tableId: string;
  row: Row<TData>;
  hoverRow: HoverType;
  rowActions?: IRowActions<TData>[];
  setHoverRow: (value: HoverType) => void;
  setOpenActions?: (value: boolean) => void;
  forceShowMenuActions?: boolean;
}

const RowActionsCell: React.FC<RowActionsCellProps> = ({
  tableId,
  row,
  hoverRow,
  rowActions,
  setOpenActions,
  setHoverRow,
  forceShowMenuActions,
}) => {
  const { element: tableContainer } = useComponentEventListener(
    `${tableId}-container`
  );
  const { colors } = useTableColors();
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [hoverOption, setHoverOption] = useState<HoverType>({
    hover: false,
    index: 0,
  });
  const [optionsContainerHeight, setOptionsContainerHeight] = useState<
    number | null
  >(null);
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
    bottom: 0,
  });
  const optionsContainerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const updateMenuPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.top,
        left: rect.left,
        bottom: rect.bottom,
      });
    }
  };

  const updateOptionsContainerHeight = () => {
    if (optionsContainerRef.current) {
      setOptionsContainerHeight(optionsContainerRef.current.clientHeight);
    }
  };

  const closeMenu = useCallback(() => {
    setOpenActions?.(false);
    setOpenOptions(false);
    updateMenuPosition();
    updateOptionsContainerHeight();
  }, [setOpenActions]);

  const openMenu = () => {
    const event = new CustomEvent('closeAllMenus');
    window.dispatchEvent(event);

    if (openOptions) {
      setOpenActions?.(false);
      setOpenOptions(false);
    } else {
      setOpenActions?.(true);
      setOpenOptions(true);
      updateMenuPosition();
      updateOptionsContainerHeight();
    }
  };

  useEffect(() => {
    const handleScrollOrResize = () => {
      if (openOptions) {
        updateMenuPosition();
        updateOptionsContainerHeight();
      }
    };

    window.addEventListener('scroll', handleScrollOrResize);
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [openOptions]);

  const handleAssetAction = (action: RowActionsType) => {
    switch (action) {
      case 'more':
        return <MoreIndicator size={18} direction={'vertical'} />;
      case 'view':
        return <VisibilityIndicator size={18} visibility={'on'} />;
      case 'delete':
        return <DeleteIndicator size={18} />;
      case 'edit':
        return <EditIndicator size={18} />;
      case 'download':
        return <DownloadIndicator size={18} />;
      case 'void':
        return <VoidIndicator size={18} />;
      case 'open-new-tab':
        return <OpenNewTab size={18} />;
      default:
        return <MoreIndicator size={18} direction={'vertical'} />;
    }
  };

  // const rowsLength = row
  //   ?._getAllVisibleCells()[0]
  //   ?.getContext()
  //   ?.table?.getCenterRows()?.length;
  // const pagination = row
  //   ?.getAllCells()[0]
  //   ?.getContext()
  //   ?.table?.getState()?.pagination;
  //const pageSize = pagination?.pageSize;
  //const rowIndexInPage = row.index % pageSize;

  const handleOptionsContainerPosition = useCallback(
    (_containerHeight: number) => {
      // NOT ACTIVATE - Condition to show the options on top or bottom
      //if (rowIndexInPage < rowsLength / 2 - 1) return menuPosition.top;
      //return menuPosition.bottom - _containerHeight;

      // Always show the options on top
      return menuPosition.top;
    },
    [menuPosition.top]
  );

  const isRowActionDisabled = (action: IRowActions<TData>) => action?.disabled;

  const toggleTableScroll = useCallback(() => {
    if (tableContainer)
      tableContainer.style.overflow = openOptions ? 'hidden' : 'auto';
  }, [openOptions, tableContainer]);

  useEffect(() => {
    toggleTableScroll();
    setOpenActions?.(openOptions);
    // if (!hoverRow.hover) setOpenOptions(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoverRow.hover, openOptions, setOpenActions]);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (
        openOptions &&
        optionsContainerRef.current &&
        !optionsContainerRef.current.contains(event.target as Node)
      ) {
        setHoverOption({ hover: false, index: 0 });
        setOpenOptions(false);
        setOpenActions?.(false);
      }
    };

    window.addEventListener('click', onClickOutside);

    return () => window.removeEventListener('click', onClickOutside);
  }, [openOptions, setOpenActions]);

  useEffect(() => {
    const handleCloseAllMenus = () => {
      closeMenu();
    };

    window.addEventListener('closeAllMenus', handleCloseAllMenus);
    return () => {
      window.removeEventListener('closeAllMenus', handleCloseAllMenus);
    };
  }, [closeMenu]);

  const firstActionRow = rowActions?.[0];
  const showMoreMenu = rowActions?.length === 1 && !forceShowMenuActions;

  const hideSingleAction = firstActionRow?.hidden?.(row);
  const singleActionLabel =
    firstActionRow?.showLabelInTooltip && firstActionRow?.label?.(row);
  const isSingleActionDisabled = firstActionRow
    ? Boolean(isRowActionDisabled(firstActionRow))
    : false;

  return (
    <div
      style={{
        visibility:
          (hoverRow.hover || openOptions) && !hideSingleAction
            ? 'visible'
            : 'hidden',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      {showMoreMenu &&
      (firstActionRow?.showOptions?.(row) === undefined ||
        !firstActionRow?.showOptions?.(row)) ? (
        <Tooltip text={singleActionLabel || ''}>
          <IconButton
            isPinned
            icon={handleAssetAction(firstActionRow?.action ?? 'more')}
            onClick={(event) => {
              // NO DELETE: stop event when send setRowClick in table
              event?.stopPropagation?.();
              firstActionRow?.onClick?.(row);
            }}
            disabled={isSingleActionDisabled}
            style={{
              margin: '0 auto',
            }}
          />
        </Tooltip>
      ) : (
        <IconButton
          icon={handleAssetAction('more')}
          ref={buttonRef as React.RefObject<HTMLButtonElement>}
          onClick={(event) => {
            // NO DELETE: stop event when send setRowClick in table
            event?.stopPropagation?.();
            openMenu();
          }}
          style={{
            margin: '0 auto',
          }}
        />
      )}

      <div
        ref={optionsContainerRef}
        style={{
          backgroundColor: colors?.paperBg,
          opacity: openOptions ? 1 : 0,
          border: `1px solid ${colors?.divider}`,
          position: 'fixed',
          zIndex: 1000,
          top: handleOptionsContainerPosition(optionsContainerHeight ?? 0),
          left: menuPosition.left - 180,
          transition: 'all 0.1s ease-in',
          display: openOptions ? 'flex' : 'none',
        }}
        className={styles.optionsContainer}
        // onMouseLeave={() => {
        //   setHoverOption({ hover: false, index: 0 });
        //   setOpenOptions(false);
        //   setOpenActions(false);
        // }}
      >
        {rowActions?.map((action, index) => {
          const disabled = isRowActionDisabled(action);
          return (
            <div
              key={`${tableId}-${action.label(row)}`}
              className={styles.option}
              onClick={() => {
                if (disabled) return;
                action.onClick(row);
                setOpenOptions(false);
                setOpenActions?.(false);
                setHoverRow({ hover: false, index: 0 });
              }}
              style={{
                display:
                  action?.showOptions?.(row) === undefined ||
                  action?.showOptions?.(row)
                    ? 'flex'
                    : 'none',
                backgroundColor:
                  !disabled && hoverOption.hover && hoverOption.index === index
                    ? colors?.rowHover
                    : colors?.paperBg,
                cursor: disabled ? 'default' : 'pointer',
              }}
              onPointerEnter={() => setHoverOption({ hover: true, index })}
              onPointerLeave={() => setHoverOption({ hover: false, index })}
            >
              <p
                style={{
                  color: disabled ? colors?.disabled : colors?.primaryText,
                }}
              >
                {action.label(row)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RowActionsCell;
