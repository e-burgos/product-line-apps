import React from 'react';

interface CardContainerProps {
  className?: string;
  children?: React.ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={`flex flex-wrap justify-start align-middle w-full rounded-lg bg-white p-4 shadow-card dark:bg-light-dark sm:p-6 h-full 2xl:px-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default CardContainer;
