import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { User } from 'lucide-react';
import { DBUserJsonModel } from '@product-line/dexie';
import { formatDateTime } from '@optical-system-app/utils';

const useUsersColumns = () => {
  const columns: ColumnDef<DBUserJsonModel, DBUserJsonModel>[] = useMemo(
    () => [
      {
        id: 'userId',
        header: 'ID',
        accessorKey: 'userId',
        minSize: 250,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{info?.getValue()?.userId || '-'}</span>
            </div>
          );
        },
      },
      {
        id: 'displayName',
        header: 'Display Name',
        accessorKey: 'displayName',
        accessorFn: (row) => row,
        cell: (info) => {
          return <span>{info?.getValue()?.data?.displayName || '-'}</span>;
        },
      },
      {
        id: 'type',
        header: 'Type',
        accessorKey: 'type',
        accessorFn: (row) => row,
        cell: (info) => {
          return <span>{info?.getValue()?.type || '-'}</span>;
        },
      },
      {
        id: 'deactivated',
        header: 'Deactivated',
        accessorKey: 'deactivated',
        accessorFn: (row) => row,
        cell: (info) => {
          return <span>{info?.getValue()?.deactivated ? 'Yes' : 'No'}</span>;
        },
      },
      {
        id: 'created',
        header: 'Created',
        accessorKey: 'created',
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span>
              {formatDateTime(info?.getValue()?.created)?.date || '-'}
            </span>
          );
        },
      },
      {
        id: 'updated',
        header: 'Updated',
        accessorKey: 'updated',
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span>
              {formatDateTime(info?.getValue()?.updated)?.date || '-'}
            </span>
          );
        },
      },
      {
        id: 'lastLogin',
        header: 'Last Login',
        accessorKey: 'lastLogin',
        size: 200,
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <span>
              {formatDateTime(info?.getValue()?.lastLogin || '')?.datetime ||
                '-'}
            </span>
          );
        },
      },
    ],
    []
  );
  return { columns: columns || [] };
};

export default useUsersColumns;
