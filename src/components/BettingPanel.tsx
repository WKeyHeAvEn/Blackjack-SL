import { Coins, Plus, Minus } from 'lucide-react';

interface BettingPanelProps {
  tokens: number;
  currentBet: number;
  onBetChange: (bet: number) => void;
  onDeal: () => void;
  disabled?: boolean;
}

const betAmounts = [5, 10, 25, 50, 100];

export function BettingPanel({
  tokens,
  currentBet,
  onBetChange,
  onDeal,
  disabled = false,
}: BettingPanelProps) {
  const adjustBet = (amount: number) => {
    const newBet = Math.max(5, Math.min(tokens, currentBet + amount));
    onBetChange(newBet);
  };

  const setBetAmount = (amount: number) => {
    const newBet = Math.min(tokens, amount);
    onBetChange(newBet);
  };

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-6 shadow-2xl border-2 border-gray-700">
      <div className="flex items-center justify-center mb-6">
        <Coins className="w-6 h-6 text-yellow-500 mr-2" />
        <span className="text-2xl font-bold text-yellow-500">{tokens}</span>
        <span className="text-gray-400 ml-2">Tokens</span>
      </div>

      <div className="mb-6">
        <label className="block text-center text-gray-300 mb-3 font-semibold">
          Einsatz
        </label>
        <div className="flex items-center justify-center gap-3 mb-4">
          <button
            onClick={() => adjustBet(-5)}
            disabled={disabled || currentBet <= 5}
            className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Minus className="w-5 h-5 text-white" />
          </button>

          <div className="bg-gray-950 px-8 py-3 rounded-lg border-2 border-gray-600">
            <span className="text-3xl font-bold text-green-400">{currentBet}</span>
          </div>

          <button
            onClick={() => adjustBet(5)}
            disabled={disabled || currentBet >= tokens}
            className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="flex gap-2 justify-center">
          {betAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => setBetAmount(amount)}
              disabled={disabled || amount > tokens}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors text-sm"
            >
              {amount}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onDeal}
        disabled={disabled || currentBet > tokens}
        className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white font-bold text-xl rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:transform-none"
      >
        Deal
      </button>
    </div>
  );
}
