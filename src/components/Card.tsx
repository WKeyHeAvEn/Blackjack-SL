import { Card as CardType } from '../lib/cards';
import { Heart, Diamond, Club, Spade } from 'lucide-react';

interface CardProps {
  card: CardType;
  hidden?: boolean;
}

const suitIcons = {
  hearts: Heart,
  diamonds: Diamond,
  clubs: Club,
  spades: Spade,
};

const suitColors = {
  hearts: 'text-red-600',
  diamonds: 'text-red-600',
  clubs: 'text-gray-900',
  spades: 'text-gray-900',
};

export function Card({ card, hidden = false }: CardProps) {
  const SuitIcon = suitIcons[card.suit];

  if (hidden) {
    return (
      <div className="relative w-20 h-28 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-lg border-2 border-blue-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-16 border-4 border-blue-400 rounded-md opacity-30"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-20 h-28 bg-white rounded-lg shadow-lg border-2 border-gray-300 transform transition-all hover:scale-105">
      <div className="absolute top-1 left-1 flex flex-col items-center">
        <span className={`text-xl font-bold ${suitColors[card.suit]}`}>
          {card.rank}
        </span>
        <SuitIcon className={`w-4 h-4 ${suitColors[card.suit]}`} strokeWidth={2.5} />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <SuitIcon className={`w-10 h-10 ${suitColors[card.suit]} opacity-20`} strokeWidth={1.5} />
      </div>

      <div className="absolute bottom-1 right-1 flex flex-col items-center rotate-180">
        <span className={`text-xl font-bold ${suitColors[card.suit]}`}>
          {card.rank}
        </span>
        <SuitIcon className={`w-4 h-4 ${suitColors[card.suit]}`} strokeWidth={2.5} />
      </div>
    </div>
  );
}
