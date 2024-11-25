import { useEffect, useRef, useState } from 'react';
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

  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const updateMenuPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.top,
        left: rect.left,
      });
    }
  };

  const toggleMenu = () => {
    setOpenOptions((prev) => !prev);
    updateMenuPosition();
  };

  useEffect(() => {
    const handleScrollOrResize = () => {
      if (openOptions) {
        updateMenuPosition();
      }
    };

    window.addEventListener('scroll', handleScrollOrResize);
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [openOptions]);

  useEffect(() => {
    setOpenActions?.(openOptions);
    if (!hoverRow.hover) setOpenOptions(false);
  }, [openOptions, setOpenActions, hoverRow.hover]);

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
      {openOptions && (
        <div
          style={{
            backgroundColor: colors?.paperBg,
            border: `1px solid ${colors?.divider}`,
            position: 'fixed',
            zIndex: 1000,
            top: menuPosition.top,
            left: menuPosition.left - 180,
          }}
          className={styles.optionsContainer}
          onMouseLeave={() => {
            setOpenOptions(false);
            setHoverOption({ hover: false, index: 0 });
          }}
        >
          {rowActions?.map((action, index) => (
            <div
              key={`${tableId}-${action.label(row)}`}
              className={styles.option}
              onClick={() => {
                action.onClick(row);
                setOpenOptions(false);
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
      )}
    </div>
  );
};

export default RowActionsCell;
