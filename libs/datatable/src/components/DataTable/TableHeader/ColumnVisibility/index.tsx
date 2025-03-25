import React from 'react';
import { Header } from '@tanstack/react-table';
import { TData } from '../../../../common/types';
import VisibilityIndicator from '../../../Assets/VisibilityIndicator';
import { IconButton } from '../../../Common/IconButton';

interface ColumnVisibilityProps {
  header: Header<TData, unknown>;
}

const ColumnVisibility: React.FC<ColumnVisibilityProps> = ({ header }) => {
  return (
    <IconButton
      icon={<VisibilityIndicator visibility={'off'} />}
      onClick={() => header.column.toggleVisibility()}
    />
  );
};

export default ColumnVisibility;
