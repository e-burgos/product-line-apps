import React from 'react';
import {
  IOptionalDataTableProps,
  SubComponentDataTableProps,
  TData,
} from '../../common/types';
import useTableColors from '../../hooks/useTableColors';
import DataTable from '../DataTable/DataTable';
import styles from './sub-component-datatable.module.css';

type IDataTableProps = SubComponentDataTableProps &
  IOptionalDataTableProps<TData>;

const SubComponentDataTable: React.FC<IDataTableProps> = ({
  row,
  tableId,
  renderSubDataTable,
  ...props
}) => {
  const { colors } = useTableColors();

  return (
    <DataTable
      tableId={`${tableId}-${row?.index || 'sub-table'}`}
      smallAnatomy
      data={renderSubDataTable.data}
      columns={renderSubDataTable.columns}
      pagination={{
        pageSize: 5,
        pageIndex: 0,
        showPagination: true,
        hideRecordsSelector: true,
        takeDefaultPagination: true,
        ...props.pagination,
      }}
      headerOptions={{
        enableDragColumns: false,
        enableResizeColumns: false,
        enablePinLeftColumns: false,
        ...props.headerOptions,
      }}
      border={false}
      stateMessage={{
        className: styles.subComponentDataTable,
        ...props.stateMessage,
      }}
      sx={{
        wrapper: {
          backgroundColor: colors.rowExpandedBg,
        },
        wrapperContainer: {
          backgroundColor: 'transparent',
        },
        tableContainer: {
          paddingLeft:
            renderSubDataTable?.expandedColumnSize === 0
              ? 0
              : renderSubDataTable?.expandedColumnSize || 50,
        },
        header: {
          borderTop: `1px solid ${colors.divider}`,
        },
      }}
      {...props}
    />
  );
};

export default SubComponentDataTable;
