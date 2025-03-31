/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from '@tanstack/react-table';

export const OffsetColumn: ColumnDef<any, any> = {
  id: 'OffsetColumn',
  enableResizing: false,
  enableSorting: false,
  enablePinning: true,
  enableHiding: false,
  enableDraggable: false,
  size: 0,
  header: () => null,
  cell: () => null,
};
