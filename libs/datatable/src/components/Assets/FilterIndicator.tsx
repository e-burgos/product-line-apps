import React from 'react';
import useTableColors from '../../hooks/useTableColors';

interface FilterIndicatorProps {
  size?: number;
  color?: string;
}

const FilterIndicator: React.FC<FilterIndicatorProps> = ({ size, color }) => {
  const { colors } = useTableColors();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      data-testid="FilterIndicator"
      width={size || 24}
      height={size || 24}
      fill="none"
    >
      <mask maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <rect width="24" height="24" fill={color || colors.secondaryText} />
      </mask>
      <g>
        <path
          d="M10.25 17.75V16.25H13.75V17.75H10.25ZM6.25 12.55V11.05H17.75V12.55H6.25ZM3.25 7.375V5.875H20.75V7.375H3.25Z"
          fill={color || colors.secondaryText}
        />
      </g>
    </svg>
  );
};

export default FilterIndicator;
