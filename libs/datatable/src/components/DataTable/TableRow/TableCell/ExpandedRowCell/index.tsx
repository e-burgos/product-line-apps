import { Row } from '@tanstack/react-table';
import { HoverType, TData } from '../../../../../common/types';
import ArrowIndicator from '../../../../Assets/ArrowIndicator';
import { IconButton } from '../../../../Common/IconButton';
import styles from './expanded-row-cell.module.css';

interface ExpandedRowCellProps {
  row: Row<TData>;
  hoverRow: HoverType;
}

const ExpandedRowCell: React.FC<ExpandedRowCellProps> = ({
  row,
  //hoverRow
}) => {
  return (
    <div className={styles.container}>
      <IconButton
        data-id="expanded-row-cell"
        onClick={row.getToggleExpandedHandler()}
        icon={
          row.getIsExpanded() ? (
            <ArrowIndicator direction="up" size={18} />
          ) : (
            <ArrowIndicator direction="down" size={18} />
          )
        }
      />
    </div>
  );
};

export default ExpandedRowCell;
