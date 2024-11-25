/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { SubComponentDataTableProps, TData } from '../../common/types';
import useTableColors from '../../hooks/useTableColors';
import DataTable from '../DataTable/DataTable';
import { IOptionalDataTableProps } from '../DataTable/DataTableComponent';
import styles from './sub-component-datatable.module.css';

type IDataTableProps = SubComponentDataTableProps &
  IOptionalDataTableProps<TData>;

const SubComponentDataTable: React.FC<IDataTableProps> = ({
  row,
  tableId,
  data,
  columns,
  expandedColumnSize,
  ...props
}) => {
  const { colors, themeMode } = useTableColors();

  return (
    <DataTable
      tableId={`${tableId}-${row?.index || 'sub-table'}`}
      smallAnatomy
      data={data}
      columns={columns}
      pagination={{
        pageSize: 5,
        pageIndex: 0,
        showPagination: true,
        hideRecordsSelector: true,
        takeDefaultPagination: true,
      }}
      headerOptions={{
        headerSticky: false,
        enableDragColumns: false,
        enableResizeColumns: false,
        enablePinLeftColumns: false,
      }}
      border={false}
      stateMessage={{
        className: styles.subComponentDataTable,
      }}
      sx={{
        wrapper: {
          backgroundColor:
            themeMode === 'light' ? colors?.rowPinned : colors?.boxBg,
        },
        container: {
          backgroundColor: colors?.boxBg,
          paddingLeft: expandedColumnSize || 50,
        },
        header: {
          borderTop: `1px solid ${colors?.divider}`,
          backgroundColor: colors?.boxBg,
        },
        row: {
          backgroundColor: colors?.rowBg,
        },
        pagination: {
          backgroundColor: colors?.boxBg,
        },
      }}
      {...props}
    />
  );
};

export default SubComponentDataTable;
