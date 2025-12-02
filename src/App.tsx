import { useState, useEffect } from 'react';
import { Coins } from 'lucide-react';
import { GameTable } from './components/GameTable';
import { BettingPanel } from './components/BettingPanel';
import { GameControls } from './components/GameControls';
import { GameMessage } from './components/GameMessage';
import {
  Card,
  createDeck,
  shuffleDeck,
  calculateHandValue,
  isBlackjack,
} from './lib/cards';
import {
  initializePlayer,
  updatePlayerTokens,
  resetPlayerTokens,
} from './lib/tokenManager';

type GamePhase = 'betting' | 'playing' | 'dealer' | 'finished';
type GameResult = 'win' | 'lose' | 'push' | 'blackjack' | 'none';

function App() {
  const [tokens, setTokens] = useState<number>(100);
  const [currentBet, setCurrentBet] = useState<number>(10);
  const [gamePhase, setGamePhase] = useState<GamePhase>('betting');
  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameResult, setGameResult] = useState<GameResult>('none');
  const [resultMessage, setResultMessage] = useState<string>('');
  const [winAmount, setWinAmount] = useState<number>(0);
  const [canDouble, setCanDouble] = useState<boolean>(false);
  const [canSplit, setCanSplit] = useState<boolean>(false);

  useEffect(() => {
    const loadPlayer = async () => {
      const playerTokens = await initializePlayer();
      setTokens(playerTokens);
    };
    loadPlayer();
  }, []);

  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);

  const dealCards = () => {
    if (currentBet > tokens) return;

    const newDeck = shuffleDeck(createDeck());
    const player = [newDeck[0], newDeck[2]];
    const dealer = [newDeck[1], newDeck[3]];

    setDeck(newDeck.slice(4));
    setPlayerHand(player);
    setDealerHand(dealer);
    setGamePhase('playing');
    setGameResult('none');

    const playerVal = calculateHandValue(player);
    setCanDouble(tokens >= currentBet * 2);
    setCanSplit(
      player[0].rank === player[1].rank && tokens >= currentBet * 2
    );

    if (isBlackjack(player)) {
      if (isBlackjack(dealer)) {
        endGame('push', 0);
      } else {
        endGame('blackjack', Math.floor(currentBet * 2.5));
      }
    } else if (playerVal === 21) {
      stand();
    }
  };

  const hit = () => {
    if (gamePhase !== 'playing') return;

    const newCard = deck[0];
    const newPlayerHand = [...playerHand, newCard];
    const newDeck = deck.slice(1);

    setPlayerHand(newPlayerHand);
    setDeck(newDeck);
    setCanDouble(false);
    setCanSplit(false);

    const newValue = calculateHandValue(newPlayerHand);

    if (newValue > 21) {
      endGame('lose', -currentBet);
    } else if (newValue === 21) {
      stand();
    }
  };

  const stand = () => {
    if (gamePhase !== 'playing') return;

    setGamePhase('dealer');
    playDealerHand();
  };

  const playDealerHand = () => {
    let currentDealerHand = [...dealerHand];
    let currentDeck = [...deck];

    setTimeout(() => {
      const dealerPlay = () => {
        let dealerVal = calculateHandValue(currentDealerHand);

        if (dealerVal < 17) {
          const newCard = currentDeck[0];
          currentDealerHand = [...currentDealerHand, newCard];
          currentDeck = currentDeck.slice(1);

          setDealerHand(currentDealerHand);
          setDeck(currentDeck);

          setTimeout(dealerPlay, 1000);
        } else {
          determineWinner(currentDealerHand);
        }
      };

      dealerPlay();
    }, 500);
  };

  const determineWinner = (finalDealerHand: Card[]) => {
    const finalPlayerValue = calculateHandValue(playerHand);
    const finalDealerValue = calculateHandValue(finalDealerHand);

    if (finalDealerValue > 21) {
      endGame('win', currentBet * 2);
    } else if (finalPlayerValue > finalDealerValue) {
      endGame('win', currentBet * 2);
    } else if (finalPlayerValue < finalDealerValue) {
      endGame('lose', -currentBet);
    } else {
      endGame('push', 0);
    }
  };

  const doubleDown = () => {
    if (!canDouble || tokens < currentBet * 2) return;

    setCurrentBet(currentBet * 2);
    setCanDouble(false);
    setCanSplit(false);

    const newCard = deck[0];
    const newPlayerHand = [...playerHand, newCard];
    const newDeck = deck.slice(1);

    setPlayerHand(newPlayerHand);
    setDeck(newDeck);

    const newValue = calculateHandValue(newPlayerHand);

    if (newValue > 21) {
      endGame('lose', -currentBet * 2);
    } else {
      setGamePhase('dealer');
      playDealerHand();
    }
  };

  const split = () => {
    if (!canSplit) return;
    alert('Split wird in dieser Version noch nicht unterstützt!');
  };

  const endGame = async (result: GameResult, amount: number) => {
    setGameResult(result);
    setWinAmount(amount);
    setGamePhase('finished');

    const messages = {
      win: 'Gewonnen!',
      lose: 'Verloren!',
      push: 'Unentschieden!',
      blackjack: 'BLACKJACK!',
      none: '',
    };

    setResultMessage(messages[result]);

    const newTokens = tokens + amount;
    setTokens(newTokens);
    await updatePlayerTokens(newTokens);
  };

  const newRound = () => {
    setGamePhase('betting');
    setPlayerHand([]);
    setDealerHand([]);
    setGameResult('none');
    setResultMessage('');
    setWinAmount(0);
    setCanDouble(false);
    setCanSplit(false);
  };

  const handleResetTokens = async () => {
    const newTokens = await resetPlayerTokens();
    setTokens(newTokens);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-900 to-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-yellow-400 mb-2 drop-shadow-lg">
            BLACKJACK
          </h1>
          <p className="text-gray-300 text-lg">Klassisches Casino Spiel</p>
        </header>

        {tokens === 0 && gamePhase === 'betting' && (
          <div className="mb-6 bg-red-600 border-2 border-red-800 rounded-lg p-4 text-center">
            <p className="text-white font-bold text-xl mb-3">
              Keine Tokens mehr!
            </p>
            <button
              onClick={handleResetTokens}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-lg transition-colors flex items-center gap-2 mx-auto"
            >
              <Coins className="w-5 h-5" />
              Tokens abholen (100)
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {gamePhase !== 'betting' && (
              <GameTable
                playerHand={playerHand}
                dealerHand={dealerHand}
                dealerCardHidden={gamePhase === 'playing'}
                playerValue={playerValue}
                dealerValue={dealerValue}
              />
            )}

            {gamePhase === 'betting' && (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <p className="text-3xl text-white font-bold mb-4">
                    Platziere deinen Einsatz!
                  </p>
                  <p className="text-gray-400 text-lg">
                    Wähle einen Betrag und drücke Deal
                  </p>
                </div>
              </div>
            )}

            {gamePhase === 'playing' && (
              <div className="mt-8">
                <GameControls
                  onHit={hit}
                  onStand={stand}
                  onDouble={doubleDown}
                  onSplit={split}
                  canHit={true}
                  canStand={true}
                  canDouble={canDouble}
                  canSplit={canSplit}
                />
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <BettingPanel
              tokens={tokens}
              currentBet={currentBet}
              onBetChange={setCurrentBet}
              onDeal={dealCards}
              disabled={gamePhase !== 'betting' || tokens === 0}
            />
          </div>
        </div>

        <GameMessage
          message={resultMessage}
          type={gameResult}
          winAmount={winAmount}
          onNewRound={newRound}
        />
      </div>
    </div>
  );
}

export default App;
