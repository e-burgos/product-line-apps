import React from 'react';
import { Header } from '@tanstack/react-table';
import { TData } from '../../../../common/types';
import PinIndicator from '../../../Assets/PinIndicator';
import { IconButton } from '../../../Common/IconButton';
import styles from './column-pin.module.css';

interface ColumnPinProps {
  header: Header<TData, unknown>;
  disabled?: boolean;
  color?: string;
  enablePinLeftColumns?: boolean;
  enablePinRightColumns?: boolean;
}

const ColumnPin: React.FC<ColumnPinProps> = ({
  header,
  color,
  disabled,
  enablePinLeftColumns,
  enablePinRightColumns,
}) => {
  return (
    <div className={styles.container}>
      {enablePinLeftColumns &&
        !header.column.getIsPinned() &&
        header.column.getIsPinned() !== 'left' && (
          <IconButton
            color={color}
            disabled={disabled}
            icon={<PinIndicator direction="down" />}
            onClick={() => {
              header.column.pin('left');
            }}
          />
        )}
      {header.column.getIsPinned() && (
        <IconButton
          color={color}
          isPinned
          disabled={disabled}
          icon={<PinIndicator direction="down" />}
          onClick={() => {
            header.column.pin(false);
          }}
        />
      )}
      {enablePinRightColumns &&
        !header.column.getIsPinned() &&
        header.column.getIsPinned() !== 'right' && (
          <IconButton
            color={color}
            disabled={disabled}
            icon={<PinIndicator direction="right" />}
            onClick={() => {
              header.column.pin('right');
            }}
          />
        )}
    </div>
  );
};

export default ColumnPin;
