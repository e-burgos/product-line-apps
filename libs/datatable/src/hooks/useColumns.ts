import { ColumnDef, RowData } from '@tanstack/react-table';

export function getColumns<TData = RowData, TValue = unknown>(
  columns: Array<ColumnDef<TData, TValue>>,
  containerWidth: number,
  offset = 0,
): Array<ColumnDef<TData, TValue>> {
  const initialOffsetColumnSize = columns.reduce((acc, current) => {
    if (current?.enableVisible === false) return acc;
    if (current?.size) {
      return acc + current.size;
    }
    return acc;
  }, offset);

  const columnsLength = columns.filter((column) => {
    if (column?.enableVisible === false) return false;
    return column?.size === undefined;
  }).length;

  const maxWidth = containerWidth - initialOffsetColumnSize;

  return columns.map((column) => ({
    ...column,
    size: column?.size ?? maxWidth / columnsLength,
  }));
}
