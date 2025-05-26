import { useState } from 'react';
import { RadioGroup, Radio } from '@headlessui/react';
import Collapse from 'libs/ui/src/components/collapse';

export function Status() {
  const [plan, setPlan] = useState('buy-now');
  return (
    <RadioGroup
      value={plan}
      onChange={setPlan}
      className="grid grid-cols-2 gap-2 p-5"
    >
      <Radio value="buy-now">
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
              checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            Buy Now
          </span>
        )}
      </Radio>
      <Radio value="on-auction">
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
              checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            On Auction
          </span>
        )}
      </Radio>
      <Radio value="new">
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
              checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            New
          </span>
        )}
      </Radio>
      <Radio value="has-offers">
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
              checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            Has offers
          </span>
        )}
      </Radio>
    </RadioGroup>
  );
}

export function StatusFilterCard() {
  return (
    <Collapse label="Estado" initialOpen>
      <Status />
    </Collapse>
  );
}
