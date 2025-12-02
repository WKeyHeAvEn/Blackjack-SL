import { Trophy, XCircle, Minus } from 'lucide-react';

interface GameMessageProps {
  message: string;
  type: 'win' | 'lose' | 'push' | 'blackjack' | 'none';
  winAmount?: number;
  onNewRound: () => void;
}

export function GameMessage({ message, type, winAmount, onNewRound }: GameMessageProps) {
  if (type === 'none') return null;

  const getIcon = () => {
    switch (type) {
      case 'win':
      case 'blackjack':
        return <Trophy className="w-12 h-12 text-yellow-400" />;
      case 'lose':
        return <XCircle className="w-12 h-12 text-red-400" />;
      case 'push':
        return <Minus className="w-12 h-12 text-gray-400" />;
      default:
        return null;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'win':
      case 'blackjack':
        return 'bg-gradient-to-r from-green-600 to-green-700';
      case 'lose':
        return 'bg-gradient-to-r from-red-600 to-red-700';
      case 'push':
        return 'bg-gradient-to-r from-gray-600 to-gray-700';
      default:
        return 'bg-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 backdrop-blur-sm">
      <div className={`${getBgColor()} rounded-2xl p-8 shadow-2xl border-4 border-white max-w-md w-full mx-4 animate-bounce-in`}>
        <div className="flex flex-col items-center text-center">
          {getIcon()}
          <h2 className="text-4xl font-bold text-white mt-4 mb-2">{message}</h2>
          {winAmount !== undefined && winAmount !== 0 && (
            <p className="text-2xl font-semibold text-yellow-300 mb-6">
              {winAmount > 0 ? '+' : ''}{winAmount} Tokens
            </p>
          )}
          <button
            onClick={onNewRound}
            className="mt-4 px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 font-bold text-lg rounded-lg shadow-lg transition-all transform hover:scale-105"
          >
            Neue Runde
          </button>
        </div>
      </div>
    </div>
  );
}
