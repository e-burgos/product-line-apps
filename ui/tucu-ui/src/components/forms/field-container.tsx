import React from 'react';

interface FieldContainerProps {
  className?: string;
  children?: React.ReactNode;
}

const FieldContainer: React.FC<FieldContainerProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={`lg:w-1/3 md:w-1/2 md:px-2 lg:px-2 w-full pb-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default FieldContainer;
