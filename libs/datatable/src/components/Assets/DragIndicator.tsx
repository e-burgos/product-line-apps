import React from 'react';
import useTableColors from '../../hooks/useTableColors';

interface DragIndicatorProps {
  size?: number;
  color?: string;
  direction: 'vertical' | 'horizontal';
}

const DragIndicator: React.FC<DragIndicatorProps> = ({
  size,
  color,
  direction,
}) => {
  const { colors } = useTableColors();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      data-testid="DragIndicator"
      width={size || 24}
      height={size || 24}
      fill="none"
      transform={direction === 'horizontal' ? 'rotate(90)' : ''}
    >
      <mask maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <rect width="24" height="24" fill={color || colors?.secondaryText} />
      </mask>
      <g>
        <path
          d="M9.00002 19.6153C8.55585 19.6153 8.1756 19.4571 7.85927 19.1408C7.54293 18.8244 7.38477 18.4442 7.38477 18C7.38477 17.5558 7.54293 17.1756 7.85927 16.8593C8.1756 16.5429 8.55585 16.3848 9.00002 16.3848C9.44418 16.3848 9.82443 16.5429 10.1408 16.8593C10.4571 17.1756 10.6153 17.5558 10.6153 18C10.6153 18.4442 10.4571 18.8244 10.1408 19.1408C9.82443 19.4571 9.44418 19.6153 9.00002 19.6153ZM15 19.6153C14.5558 19.6153 14.1756 19.4571 13.8593 19.1408C13.5429 18.8244 13.3848 18.4442 13.3848 18C13.3848 17.5558 13.5429 17.1756 13.8593 16.8593C14.1756 16.5429 14.5558 16.3848 15 16.3848C15.4442 16.3848 15.8244 16.5429 16.1408 16.8593C16.4571 17.1756 16.6153 17.5558 16.6153 18C16.6153 18.4442 16.4571 18.8244 16.1408 19.1408C15.8244 19.4571 15.4442 19.6153 15 19.6153ZM9.00002 13.6153C8.55585 13.6153 8.1756 13.4571 7.85927 13.1408C7.54293 12.8244 7.38477 12.4442 7.38477 12C7.38477 11.5558 7.54293 11.1756 7.85927 10.8593C8.1756 10.5429 8.55585 10.3848 9.00002 10.3848C9.44418 10.3848 9.82443 10.5429 10.1408 10.8593C10.4571 11.1756 10.6153 11.5558 10.6153 12C10.6153 12.4442 10.4571 12.8244 10.1408 13.1408C9.82443 13.4571 9.44418 13.6153 9.00002 13.6153ZM15 13.6153C14.5558 13.6153 14.1756 13.4571 13.8593 13.1408C13.5429 12.8244 13.3848 12.4442 13.3848 12C13.3848 11.5558 13.5429 11.1756 13.8593 10.8593C14.1756 10.5429 14.5558 10.3848 15 10.3848C15.4442 10.3848 15.8244 10.5429 16.1408 10.8593C16.4571 11.1756 16.6153 11.5558 16.6153 12C16.6153 12.4442 16.4571 12.8244 16.1408 13.1408C15.8244 13.4571 15.4442 13.6153 15 13.6153ZM9.00002 7.61526C8.55585 7.61526 8.1756 7.4571 7.85927 7.14077C7.54293 6.82443 7.38477 6.44418 7.38477 6.00002C7.38477 5.55585 7.54293 5.1756 7.85927 4.85927C8.1756 4.54293 8.55585 4.38477 9.00002 4.38477C9.44418 4.38477 9.82443 4.54293 10.1408 4.85927C10.4571 5.1756 10.6153 5.55585 10.6153 6.00002C10.6153 6.44418 10.4571 6.82443 10.1408 7.14077C9.82443 7.4571 9.44418 7.61526 9.00002 7.61526ZM15 7.61526C14.5558 7.61526 14.1756 7.4571 13.8593 7.14077C13.5429 6.82443 13.3848 6.44418 13.3848 6.00002C13.3848 5.55585 13.5429 5.1756 13.8593 4.85927C14.1756 4.54293 14.5558 4.38477 15 4.38477C15.4442 4.38477 15.8244 4.54293 16.1408 4.85927C16.4571 5.1756 16.6153 5.55585 16.6153 6.00002C16.6153 6.44418 16.4571 6.82443 16.1408 7.14077C15.8244 7.4571 15.4442 7.61526 15 7.61526Z"
          fill={color || colors?.secondaryText}
        />
      </g>
    </svg>
  );
};

export default DragIndicator;