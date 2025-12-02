import { Hand, Square, Divide, RotateCcw } from 'lucide-react';

interface GameControlsProps {
  onHit: () => void;
  onStand: () => void;
  onDouble: () => void;
  onSplit: () => void;
  canHit: boolean;
  canStand: boolean;
  canDouble: boolean;
  canSplit: boolean;
}

export function GameControls({
  onHit,
  onStand,
  onDouble,
  onSplit,
  canHit,
  canStand,
  canDouble,
  canSplit,
}: GameControlsProps) {
  return (
    <div className="flex gap-4 justify-center flex-wrap">
      <button
        onClick={onHit}
        disabled={!canHit}
        className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:transform-none"
      >
        <Hand className="w-6 h-6" />
        Hit
      </button>

      <button
        onClick={onStand}
        disabled={!canStand}
        className="flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:transform-none"
      >
        <Square className="w-6 h-6" />
        Stand
      </button>

      <button
        onClick={onDouble}
        disabled={!canDouble}
        className="flex items-center gap-2 px-8 py-4 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:transform-none"
      >
        <RotateCcw className="w-6 h-6" />
        Double
      </button>

      <button
        onClick={onSplit}
        disabled={!canSplit}
        className="flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:transform-none"
      >
        <Divide className="w-6 h-6" />
        Split
      </button>
    </div>
  );
}
