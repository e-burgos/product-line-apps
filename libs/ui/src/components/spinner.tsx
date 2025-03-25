import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size, color }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-brand"></div>
    </div>
  );
};

export default Spinner;
