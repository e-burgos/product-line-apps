import { useCallback, useEffect } from 'react';
import { Row, Table } from '@tanstack/react-table';
import { IRowSelection, TData } from '../../../../../common/types';
import { RowSelection } from '../../../../RowSelection';
import styles from './row-selection-cell.module.css';

interface RowSelectionCellProps {
  row: Row<TData>;
  rowSelection: IRowSelection<TData>;
  table: Table<TData>;
}

const RowSelectionCell: React.FC<RowSelectionCellProps> = ({
  row,
  rowSelection,
  table,
}) => {
  const rowSelectionState = table?.getState()?.rowSelection;
  const setRowSelectionState = table?.setRowSelection;
  const isSomeSelected = Object.keys(rowSelectionState).length !== 0;

  const handleRowSelectionIdToRowData = useCallback(() => {
    rowSelection?.getSelection?.([]);
    const selectedRowData: Row<TData>[] = [];
    Object.keys(rowSelectionState).forEach((key) => {
      const row = table?.getRow(key);
      selectedRowData.push(row);
    });
    return selectedRowData;
  }, [rowSelection, rowSelectionState, table]);

  useEffect(() => {
    if (rowSelection?.type === 'checkbox' && isSomeSelected)
      rowSelection?.getSelection?.(handleRowSelectionIdToRowData());
    if (!isSomeSelected) rowSelection?.getSelection?.([]);
  }, [handleRowSelectionIdToRowData, isSomeSelected, rowSelection]);

  const key = row.getIsSelected().toString();

  return (
    <div
      className={styles.container}
      key={key}
      onClick={(e) => {
        // prevent setOnRowClick from being called
        e?.stopPropagation?.();
      }}
    >
      {rowSelection?.type === 'checkbox' && (
        <RowSelection
          {...{
            type: 'checkbox',
            indeterminate: row.getIsSomeSelected(),
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      )}
      {rowSelection?.type === 'radio' && (
        <RowSelection
          {...{
            type: 'radio',
            indeterminate: row.getIsSomeSelected(),
            checked: rowSelectionState[row.id],
            disabled: !row.getCanSelect(),
            onClick: () => {
              setRowSelectionState({ [row.id]: true });
              rowSelection?.getSelection?.([row]);
            },
          }}
        />
      )}
    </div>
  );
};

export default RowSelectionCell;
