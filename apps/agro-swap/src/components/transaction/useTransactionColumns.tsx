import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { LinkIcon } from "@/components/icons/link-icon";

export interface Transaction {
  id: number;
  transactionType: string;
  createdAt: string;
  symbol: string;
  status: string;
  address: string;
  amount: {
    balance: string;
    usdBalance: string;
  };
}

const useTransactionColumns = () => {
  const columns = useMemo<ColumnDef<Transaction, Transaction>[]>(
    () => [
      {
        id: "id",
        header: "ID",
        accessorFn: (row) => row.id,
        cell: (info) => `${info.getValue()}`,
        minSize: 60,
        maxSize: 60,
      },
      {
        id: "type",
        header: "Type",
        accessorFn: (row) => row.transactionType,
        cell: (info) => `${info.getValue()}`,
        minSize: 60,
        maxSize: 60,
      },
      {
        id: "date",
        header: () => <div className="ltr:ml-auto rtl:mr-auto">Date</div>,
        accessorFn: (row) => row.createdAt,
        cell: (info) => (
          <div className="ltr:text-right rtl:text-left">{`${info.getValue()}`}</div>
        ),
        minSize: 60,
        maxSize: 80,
      },
      {
        id: "symbol",
        header: () => <div className="ltr:ml-auto rtl:mr-auto">Asset</div>,
        accessorFn: (row) => row.symbol,
        cell: (info) => (
          <div className="ltr:text-right rtl:text-left">{`${info.getValue()}`}</div>
        ),
        minSize: 80,
        maxSize: 120,
      },
      {
        id: "status",
        header: () => <div className="ltr:ml-auto rtl:mr-auto">Status</div>,
        accessorFn: (row) => row.status,
        cell: (info) => (
          <div className="ltr:text-right rtl:text-left">{`${info.getValue()}`}</div>
        ),
        minSize: 100,
        maxSize: 180,
      },
      {
        id: "address",
        header: () => <div className="ltr:ml-auto rtl:mr-auto">Address</div>,
        accessorFn: (row) => row.address,
        cell: (info) => (
          <div className="flex items-center justify-end">
            <LinkIcon className="h-[18px] w-[18px] ltr:mr-2 rtl:ml-2" />{" "}
            {`${info.getValue()}`}
          </div>
        ),
        minSize: 220,
        maxSize: 280,
      },
      {
        id: "amount",
        header: () => <div className="ltr:ml-auto rtl:mr-auto">Amount</div>,
        accessorFn: (row) => row,
        cell: (info) => (
          <div className="-tracking-[1px] ltr:text-right rtl:text-left">
            <strong className="mb-0.5 flex justify-end text-base md:mb-1.5 md:text-lg lg:text-base 3xl:text-2xl">
              {`${info.getValue().amount.balance}`}
              <span className="inline-block ltr:ml-1.5 rtl:mr-1.5 md:ltr:ml-2 md:rtl:mr-2">
                BTC
              </span>
            </strong>
            <span className="text-gray-600 dark:text-gray-400">
              ${`${info.getValue().amount.usdBalance}`}
            </span>
          </div>
        ),
        minSize: 200,
        maxSize: 300,
      },
    ],
    []
  );
  return { columns };
};

export default useTransactionColumns;
