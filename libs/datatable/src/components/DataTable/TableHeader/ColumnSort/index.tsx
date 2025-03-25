import React, { ReactNode, useMemo } from 'react';
import { flexRender, Header } from '@tanstack/react-table';
import { TData } from '../../../../common/types';
import ArrowLongIndicator from '../../../Assets/ArrowLongIndicator';
import FilterIndicator from '../../../Assets/FilterIndicator';
import { IconButton } from '../../../Common/IconButton';

interface ColumnSortProps {
  header: Header<TData, unknown>;
  isPinned?: boolean;
}

const sorterIcons: Record<string, ReactNode> = {
  asc: <ArrowLongIndicator direction="up" size={19.5} />,
  desc: <ArrowLongIndicator direction="down" size={19.5} />,
};

const ColumnSort: React.FC<ColumnSortProps> = ({ header, isPinned }) => {
  const renderIcon = useMemo(() => {
    if (header.isPlaceholder) return null;
    return (
      <>
        {flexRender(
          !header.column.getIsSorted() ? <FilterIndicator size={18} /> : null,
          header.getContext(),
        )}
        {sorterIcons?.[header.column.getIsSorted() as string] ?? null}
      </>
    );
  }, [header]);

  return (
    <IconButton
      isPinned={isPinned}
      onClick={header.column.getToggleSortingHandler()}
      title={
        header.column.getCanSort()
          ? header.column.getNextSortingOrder() === 'asc'
            ? 'Sort ascending'
            : header.column.getNextSortingOrder() === 'desc'
              ? 'Sort descending'
              : 'Clear sort'
          : undefined
      }
      icon={renderIcon}
    />
  );
};

export default ColumnSort;
