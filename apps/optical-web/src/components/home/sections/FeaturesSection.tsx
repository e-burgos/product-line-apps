import React from 'react';
import InfoCard from '../../ui/InfoCard';

interface InfoCardType {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FeaturesSectionProps {
  infoCards: InfoCardType[];
  bgClass?: string;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  infoCards,
  bgClass,
}) => {
  return (
    <div className={bgClass}>
      <div className="py-16 sm:py-24 lg:max-w-7xl lg:mx-auto lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold ">
            Por qué elegir OpticaGestión
          </h2>
        </div>
        <div className="mt-16 max-w-2xl mx-auto px-4 grid grid-cols-1 gap-y-10 gap-x-8 sm:px-6 sm:grid-cols-2 md:grid-cols-3 lg:max-w-none lg:px-0">
          {infoCards.map((card) => (
            <InfoCard
              key={card.title}
              title={card.title}
              description={card.description}
              icon={card.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
