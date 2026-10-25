import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { shuffle } from '../lib/shuffle';

interface Card {
  id: number;
  name: string;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const dinoCardsData = [
  { name: 'T-Rex', icon: '🦖' },
  { name: 'Stegosaurus', icon: '🦕' },
  { name: 'Dino Egg', icon: '🥚' },
  { name: 'Volcano', icon: '🌋' },
  { name: 'Footprint', icon: '🐾' },
];

function buildDeck(): Card[] {
  const duplicated = [...dinoCardsData, ...dinoCardsData].map((card, index) => ({
    ...card,
    id: index,
    isFlipped: false,
    isMatched: false,
  }));
  return shuffle(duplicated);
}

interface DinoMemoryMatchProps {
  onBackToGames: () => void;
}

export default function DinoMemoryMatch({ onBackToGames }: DinoMemoryMatchProps) {
  const [cards, setCards] = useState<Card[]>(buildDeck);
  const [firstSelection, setFirstSelection] = useState<Card | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [moves, setMoves] = useState(0);
  const [matchesCount, setMatchesCount] = useState(0);

  const resetTurn = () => {
    setFirstSelection(null);
    setIsChecking(false);
  };

  const initializeGame = () => {
    setCards(buildDeck());
    setFirstSelection(null);
    setIsChecking(false);
    setMoves(0);
    setMatchesCount(0);
  };

  const handleCardClick = (clickedCard: Card) => {
    if (isChecking || clickedCard.isFlipped || clickedCard.isMatched) return;

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === clickedCard.id ? { ...card, isFlipped: true } : card
      )
    );

    if (!firstSelection) {
      setFirstSelection(clickedCard);
      return;
    }

    // Second card: evaluate the pair right here instead of in an effect
    setIsChecking(true);
    setMoves((prev) => prev + 1);

    if (firstSelection.name === clickedCard.name) {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.name === firstSelection.name ? { ...card, isMatched: true } : card
        )
      );
      setMatchesCount((prev) => prev + 1);
      resetTurn();
    } else {
      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstSelection.id || card.id === clickedCard.id
              ? { ...card, isFlipped: false }
              : card
          )
        );
        resetTurn();
      }, 1000);
    }
  };

  useEffect(() => {
    if (matchesCount === dinoCardsData.length) {
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch {
        /* confetti is decorative; ignore failures */
      }
    }
  }, [matchesCount]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-6 md:p-12 flex flex-col items-center transition-colors duration-300">
      {/* Back button */}
      <div className="w-full max-w-3xl flex justify-start mb-6">
        <button
          onClick={onBackToGames}
          className="px-5 py-2.5 rounded-2xl bg-white dark:bg-gray-900 shadow-md text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all border border-teal-200 dark:border-teal-900/50 cursor-pointer flex items-center gap-2"
        >
          ← Back to Dino Games
        </button>
      </div>

      {/* Game title and stats */}
      <div className="text-center space-y-2 mb-8">
        <span className="text-5xl">🧩</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-teal-950 dark:text-teal-300">
          Dino Memory Match
        </h1>
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          Find the matching pairs by turning the cards over! Moves: <span className="text-teal-700 dark:text-teal-400 font-bold">{moves}</span>
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-3xl w-full mb-8">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            className={`h-32 rounded-2xl flex flex-col items-center justify-center cursor-pointer shadow-lg transition-all duration-300 transform select-none ${
              card.isFlipped || card.isMatched
                ? 'bg-white dark:bg-gray-800 border-2 border-teal-400 dark:border-teal-700 text-5xl text-gray-900 dark:text-white'
                : 'bg-gradient-to-tr from-teal-600 to-cyan-700 dark:from-teal-800 dark:to-cyan-900 hover:from-teal-500 hover:to-cyan-600 text-white shadow-teal-900/20 border-2 border-teal-500 dark:border-teal-700'
            }`}
          >
            {card.isFlipped || card.isMatched ? (
              <span>{card.icon}</span>
            ) : (
              <div className="flex flex-col items-center space-y-1">
                <span className="text-3xl animate-pulse">🦖</span>
                <span className="text-xs font-bold tracking-wider text-teal-100 uppercase opacity-80">Dino</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Win screen */}
      {matchesCount === dinoCardsData.length && (
        <div className="text-center bg-white/90 dark:bg-gray-900/95 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-teal-300 dark:border-teal-800 animate-bounce mt-4 max-w-md w-full">
          <h2 className="text-2xl font-extrabold text-teal-900 dark:text-teal-300 mb-2">🎉 Congratulations, champ!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">You finished the game in {moves} moves!</p>
          <button
            onClick={initializeGame}
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer"
          >
            Play Again 🔄
          </button>
        </div>
      )}
    </div>
  );
}