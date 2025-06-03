
import React from 'react';

interface KPICard {
  title: string;
  value: string;
  subtitle: string;
  color: string;
}

interface KPICardsRowProps {
  title: string;
  cards: KPICard[];
}

export const KPICardsRow: React.FC<KPICardsRowProps> = ({ title, cards }) => {
  return (
    <div>
      <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 flex items-center gap-2 px-1">
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {cards.map((card, index) => (
          <div 
            key={index}
            className={`${card.color} rounded-lg p-3 sm:p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[80px] sm:min-h-[90px]`}
          >
            <div className="text-xs font-medium opacity-90 mb-1">{card.title}</div>
            <div className="text-lg sm:text-xl font-bold mb-1">{card.value}</div>
            <div className="text-xs opacity-80">{card.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
