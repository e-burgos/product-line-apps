import React from 'react';

interface InfoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="bg-gray-200 dark:bg-gray-900 rounded-xl text-center py-8 px-6">
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand text-white mx-auto">
        {icon}
      </div>
      <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};

export default InfoCard;
