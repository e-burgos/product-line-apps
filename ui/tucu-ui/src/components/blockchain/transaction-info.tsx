import cn from 'classnames';

export interface TransactionInfoTypes {
  label: string;
  value?: string | number;
  className?: string;
}

export function TransactionInfo({
  label,
  value,
  className,
}: TransactionInfoTypes) {
  return (
    <div
      className={cn(
        'flex items-center justify-between dark:text-gray-300',
        className
      )}
    >
      <span className="font-medium">{label}</span>
      <span>{value ? value : '_ _'}</span>
    </div>
  );
}

export default TransactionInfo;
