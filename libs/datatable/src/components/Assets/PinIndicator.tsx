import React from 'react';
import useTableColors from '../../hooks/useTableColors';

interface PinIndicatorProps {
  size?: number;
  color?: string;
  direction: 'up' | 'down' | 'left' | 'right';
}

const PinIndicator: React.FC<PinIndicatorProps> = ({
  size,
  color,
  direction,
}) => {
  const { colors } = useTableColors();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="PinIndicator"
      width={size || 24}
      height={size || 24}
      fill="none"
      transform={
        direction === 'up'
          ? 'rotate(180)'
          : direction === 'left'
          ? 'rotate(90)'
          : direction === 'right'
          ? 'rotate(270)'
          : undefined
      }
    >
      <mask maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <rect width="24" height="24" fill={color || colors?.secondaryText} />
      </mask>
      <g>
        <path
          d="M16 5V12L17.7 13.7C17.8 13.8 17.875 13.9125 17.925 14.0375C17.975 14.1625 18 14.2917 18 14.425V15C18 15.2833 17.9042 15.5208 17.7125 15.7125C17.5208 15.9042 17.2833 16 17 16H13V21.85C13 22.1333 12.9042 22.3708 12.7125 22.5625C12.5208 22.7542 12.2833 22.85 12 22.85C11.7167 22.85 11.4792 22.7542 11.2875 22.5625C11.0958 22.3708 11 22.1333 11 21.85V16H7C6.71667 16 6.47917 15.9042 6.2875 15.7125C6.09583 15.5208 6 15.2833 6 15V14.425C6 14.2917 6.025 14.1625 6.075 14.0375C6.125 13.9125 6.2 13.8 6.3 13.7L8 12V5C7.71667 5 7.47917 4.90417 7.2875 4.7125C7.09583 4.52083 7 4.28333 7 4C7 3.71667 7.09583 3.47917 7.2875 3.2875C7.47917 3.09583 7.71667 3 8 3H16C16.2833 3 16.5208 3.09583 16.7125 3.2875C16.9042 3.47917 17 3.71667 17 4C17 4.28333 16.9042 4.52083 16.7125 4.7125C16.5208 4.90417 16.2833 5 16 5ZM8.85 14H15.15L14 12.85V5H10V12.85L8.85 14Z"
          fill={color || colors?.secondaryText}
        />
      </g>
    </svg>
  );
};

export default PinIndicator;