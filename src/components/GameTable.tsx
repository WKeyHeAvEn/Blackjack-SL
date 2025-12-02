import { Card as CardType, calculateHandValue } from '../lib/cards';
import { Card } from './Card';

interface GameTableProps {
  playerHand: CardType[];
  dealerHand: CardType[];
  dealerCardHidden: boolean;
  playerValue: number;
  dealerValue: number;
}

export function GameTable({
  playerHand,
  dealerHand,
  dealerCardHidden,
  playerValue,
  dealerValue,
}: GameTableProps) {
  const visibleDealerValue = dealerCardHidden
    ? calculateHandValue([dealerHand[0]])
    : dealerValue;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-12">
        <div className="flex items-center justify-center mb-4">
          <h3 className="text-2xl font-bold text-white">Dealer</h3>
          <span className="ml-4 text-xl font-semibold text-green-400">
            {dealerCardHidden ? '?' : visibleDealerValue}
          </span>
        </div>
        <div className="flex justify-center gap-3">
          {dealerHand.map((card, index) => (
            <div
              key={card.id}
              className="animate-slide-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Card card={card} hidden={index === 1 && dealerCardHidden} />
            </div>
          ))}
        </div>
      </div>

      <div className="h-32 flex items-center justify-center">
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-green-600 to-transparent"></div>
      </div>

      <div>
        <div className="flex items-center justify-center mb-4">
          <h3 className="text-2xl font-bold text-white">Spieler</h3>
          <span className="ml-4 text-xl font-semibold text-green-400">
            {playerValue}
          </span>
        </div>
        <div className="flex justify-center gap-3">
          {playerHand.map((card, index) => (
            <div
              key={card.id}
              className="animate-slide-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Card card={card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
