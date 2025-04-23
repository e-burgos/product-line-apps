import Button from 'libs/ui/src/components/button/button';
import React from 'react';

interface CounterButtonProps {
  quantity: number;
  disabledDecrement: boolean;
  disabledIncrement: boolean;
  onDecrement: () => void;
  onIncrement: () => void;
}

const CounterButton: React.FC<CounterButtonProps> = ({
  quantity,
  onDecrement,
  onIncrement,
  disabledDecrement,
  disabledIncrement,
}) => {
  return (
    <div className="flex box-border border border-gray-200 dark:border-gray-700 rounded-full pt-1 pb-0.5 px-1">
      <Button
        variant="transparent"
        color="gray"
        size="tiny"
        className="border-r border-gray-200 dark:border-gray-700"
        onClick={onDecrement}
        disabled={quantity <= 1 || disabledDecrement}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 12H4"
          />
        </svg>
      </Button>
      <span className="w-8 text-center text-gray-700 dark:text-gray-300">
        {quantity}
      </span>
      <Button
        variant="transparent"
        color="gray"
        size="tiny"
        className="border-l border-gray-200 dark:border-gray-700"
        onClick={onIncrement}
        disabled={disabledIncrement}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </Button>
    </div>
  );
};

export default CounterButton;
