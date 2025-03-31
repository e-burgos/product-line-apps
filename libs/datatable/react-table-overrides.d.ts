import {
  RowData,
  ColumnDefBase as OriginalColumnDefBase,
} from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  export interface ColumnDefBase<TData extends RowData, TValue = unknown>
    extends OriginalColumnDefBase<TData, TValue> {
    enableDraggable?: boolean;
    enableVisible?: boolean;
  }

  export interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select';
  }
}
