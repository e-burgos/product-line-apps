import { useCallback, useEffect, useRef, useState } from 'react';
import { Row } from '@tanstack/react-table';
import {
  HoverType,
  IRowActions,
  RowActionsType,
  TData,
} from '../../../../../common/types';
import useTableColors from '../../../../../hooks/useTableColors';
import AssetButton from '../../../../Assets/AssetButton';
import DeleteIndicator from '../../../../Assets/DeleteIndicator';
import DownloadIndicator from '../../../../Assets/DownloadIndicator';
import EditIndicator from '../../../../Assets/EditIndicator';
import MoreIndicator from '../../../../Assets/MoreIndicator';
import VisibilityIndicator from '../../../../Assets/VisibilityIndicator';
import VoidIndicator from '../../../../Assets/VoidIndicator';
import styles from './row-actions-cell.module.css';

interface RowActionsCellProps {
  tableId: string;
  row: Row<TData>;
  hoverRow: HoverType;
  rowActions?: IRowActions<TData>[];
  setHoverRow: (value: HoverType) => void;
  setOpenActions: (value: boolean) => void;
}

interface RowActionsCellProps {
  tableId: string;
  row: Row<TData>;
  hoverRow: HoverType;
  rowActions?: IRowActions<TData>[];
  setHoverRow: (value: HoverType) => void;
  setOpenActions: (value: boolean) => void;
}

const RowActionsCell: React.FC<RowActionsCellProps> = ({
  tableId,
  row,
  hoverRow,
  rowActions,
  setOpenActions,
  setHoverRow,
}) => {
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

  const toggleMenu = () => {
    setOpenActions(!openOptions);
    setOpenOptions((prev) => !prev);
    updateMenuPosition();
    updateOptionsContainerHeight();
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
        return <MoreIndicator size={20} direction={'vertical'} />;
      case 'view':
        return <VisibilityIndicator size={20} visibility={'on'} />;
      case 'delete':
        return <DeleteIndicator size={20} />;
      case 'edit':
        return <EditIndicator size={20} />;
      case 'download':
        return <DownloadIndicator size={20} />;
      case 'void':
        return <VoidIndicator size={20} />;
      default:
        return <MoreIndicator size={20} direction={'vertical'} />;
    }
  };

  const rowsLength = row
    ?.getAllCells()[0]
    ?.getContext()
    ?.table?.getCenterRows()?.length;
  const pagination = row
    ?.getAllCells()[0]
    ?.getContext()
    ?.table?.getState()?.pagination;
  const pageSize = pagination?.pageSize;
  const rowIndexInPage = row.index % pageSize;

  const handleOptionsContainerPosition = useCallback(
    (containerHeight: number) => {
      if (rowsLength > 1 && rowIndexInPage < rowsLength / 2 - 1)
        return menuPosition.top;
      return menuPosition.bottom - containerHeight;
    },
    [menuPosition.bottom, menuPosition.top, rowIndexInPage, rowsLength]
  );

  useEffect(() => {
    setOpenActions?.(openOptions);
    if (!hoverRow.hover) setOpenOptions(false);
  }, [hoverRow.hover, openOptions, setOpenActions]);

  return (
    <div
      style={{
        visibility: hoverRow.hover || openOptions ? 'visible' : 'hidden',
        position: 'relative',
      }}
      className={styles.buttonContainer}
    >
      {rowActions?.length === 1 &&
      (rowActions[0]?.showOptions?.(row) === undefined ||
        rowActions[0]?.showOptions?.(row)) ? (
        <AssetButton
          bgColor="actionBg"
          active
          onClick={() => {
            rowActions[0]?.onClick?.(row);
          }}
        >
          {handleAssetAction(rowActions[0]?.action)}
        </AssetButton>
      ) : (
        <button
          ref={buttonRef as React.RefObject<HTMLButtonElement>}
          onClick={() => toggleMenu()}
          className={styles.optionButton}
          style={{
            backgroundColor: colors?.actionBg,
            color: colors?.primaryText,
          }}
        >
          {handleAssetAction('more')}
        </button>
      )}

      <div
        ref={optionsContainerRef}
        style={{
          backgroundColor: colors?.paperBg,
          visibility: openOptions ? 'visible' : 'hidden',
          border: `1px solid ${colors?.divider}`,
          position: 'fixed',
          zIndex: 1000,
          top: handleOptionsContainerPosition(optionsContainerHeight as number),
          left: menuPosition.left - 180,
        }}
        className={styles.optionsContainer}
        onMouseLeave={() => {
          setHoverOption({ hover: false, index: 0 });
          setOpenOptions(false);
          setOpenActions(false);
        }}
      >
        {rowActions?.map((action, index) => (
          <div
            key={`${tableId}-${action.label(row)}`}
            className={styles.option}
            onClick={() => {
              action.onClick(row);
              setOpenOptions(false);
              setOpenActions(false);
              setHoverRow({ hover: false, index: 0 });
            }}
            style={{
              display:
                action?.showOptions?.(row) === undefined ||
                action?.showOptions?.(row)
                  ? 'flex'
                  : 'none',
              backgroundColor:
                hoverOption.hover && hoverOption.index === index
                  ? colors?.rowHover
                  : colors?.paperBg,
            }}
            onPointerEnter={() => setHoverOption({ hover: true, index })}
            onPointerLeave={() => setHoverOption({ hover: false, index })}
          >
            <p
              style={{
                color: colors?.primaryText,
              }}
            >
              {action.label(row)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RowActionsCell;
