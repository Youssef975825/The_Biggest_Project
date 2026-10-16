import React, { useState, useEffect } from 'react';

interface CardItem {
  id: number;
  name: string;
  icon: string;
  type: 'living' | 'non-living';
}

interface HoneycombSortProps {
  onBackToGames: () => void;
}

const INITIAL_CARDS: CardItem[] = [
  { id: 1, name: 'Bee', icon: '🐝', type: 'living' },
  { id: 2, name: 'Tree', icon: '🌳', type: 'living' },
  { id: 3, name: 'Rock', icon: '🪨', type: 'non-living' },
  { id: 4, name: 'Flower', icon: '🌸', type: 'living' },
  { id: 5, name: 'Sun', icon: '☀️', type: 'non-living' },
  { id: 6, name: 'Butterfly', icon: '🦋', type: 'living' },
  { id: 7, name: 'Car', icon: '🚗', type: 'non-living' },
  { id: 8, name: 'Bird', icon: '🐦', type: 'living' },
  { id: 9, name: 'Chair', icon: '🪑', type: 'non-living' },
  { id: 10, name: 'Mushroom', icon: '🍄', type: 'living' },
];

export default function Honeycomb_Sort({ onBackToGames }: HoneycombSortProps) {
  const [cards, setCards] = useState<CardItem[]>(INITIAL_CARDS);
  const [livingBin, setLivingBin] = useState<CardItem[]>([]);
  const [nonLivingBin, setNonLivingBin] = useState<CardItem[]>([]);
  const [gameMessage, setGameMessage] = useState<string>('Look at each picture card, decide if it is LIVING or NON-LIVING, and place it under the correct beehive!');
  const [isWon, setIsWon] = useState<boolean>(false);

  const handleSort = (card: CardItem, targetType: 'living' | 'non-living'): void => {
    if (isWon) return;

    if (card.type === targetType) {
      setCards(prev => prev.filter(c => c.id !== card.id));
      if (targetType === 'living') {
        setLivingBin(prev => [...prev, card]);
      } else {
        setNonLivingBin(prev => [...prev, card]);
      }
      setGameMessage(`Great job! ${card.name} is correctly sorted! ✨`);
    } else {
      setGameMessage(`❌ Oops! ${card.name} does not belong here. Try the other hive! 🐝`);
    }
  };

  useEffect(() => {
    if (cards.length === 0 && (livingBin.length > 0 || nonLivingBin.length > 0)) {
      setIsWon(true);
      setGameMessage('🎉 Amazing! All cards are sorted perfectly into Living and Non-living hives!');
    }
  }, [cards, livingBin, nonLivingBin]);

  const resetGame = (): void => {
    setCards(INITIAL_CARDS);
    setLivingBin([]);
    setNonLivingBin([]);
    setIsWon(false);
    setGameMessage('Look at each picture card, decide if it is LIVING or NON-LIVING, and place it under the correct beehive!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-amber-50 to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-6 md:p-12 flex flex-col items-center transition-colors duration-300">
      <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <button 
          onClick={onBackToGames}
          className="px-5 py-2.5 rounded-2xl bg-white dark:bg-gray-900 shadow-md text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all border border-amber-200 dark:border-amber-900/50 cursor-pointer flex items-center gap-2"
        >
          ← Back to Games Hub
        </button>
        <div className="font-bold text-amber-900 dark:text-amber-300 bg-white/80 dark:bg-gray-900/80 px-4 py-2 rounded-2xl shadow-sm border border-amber-200 dark:border-amber-900/50">
          🃏 Remaining Cards: {cards.length}
        </div>
      </div>

      <div className="text-center space-y-2 mb-6">
        <span className="text-5xl inline-block animate-bounce">🍯</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-amber-900 dark:text-amber-300">
          Honeycomb Sort
        </h1>
        <p className="text-amber-800 dark:text-amber-400 font-bold text-lg">
          Sort the cards into: <span className="text-emerald-700 dark:text-emerald-400">Living</span> / <span className="text-rose-600 dark:text-rose-400">Non-living</span>
        </p>
      </div>

      <div className="w-full max-w-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl p-4 shadow-md border border-amber-200 dark:border-amber-900/50 text-center mb-8">
        <p className="text-amber-900 dark:text-amber-300 font-semibold text-sm md:text-base">
          {gameMessage}
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Living Hive */}
        <div className="bg-emerald-50 dark:bg-gray-900 border-3 border-emerald-400 dark:border-emerald-800 rounded-3xl p-6 shadow-xl flex flex-col items-center min-h-[240px]">
          <div className="bg-emerald-600 text-white font-extrabold px-6 py-1.5 rounded-full shadow-md mb-3 tracking-wider text-sm">
            LIVING 🌿
          </div>
          <div className="text-5xl mb-2">🏡</div>
          <div className="flex flex-wrap gap-2 justify-center w-full mt-2">
            {livingBin.map(card => (
              <div key={card.id} className="bg-white dark:bg-gray-800 px-3 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-700 shadow-sm flex items-center gap-1.5 text-xs font-bold text-emerald-900 dark:text-emerald-200">
                <span>{card.icon}</span>
                <span>{card.name}</span>
              </div>
            ))}
            {livingBin.length === 0 && <span className="text-emerald-700/50 dark:text-emerald-400/50 text-xs italic mt-4">Place living cards here</span>}
          </div>
        </div>

        {/* Non-living Hive */}
        <div className="bg-rose-50 dark:bg-gray-900 border-3 border-rose-400 dark:border-rose-800 rounded-3xl p-6 shadow-xl flex flex-col items-center min-h-[240px]">
          <div className="bg-rose-600 text-white font-extrabold px-6 py-1.5 rounded-full shadow-md mb-3 tracking-wider text-sm">
            NON-LIVING 🪨
          </div>
          <div className="text-5xl mb-2">🏡</div>
          <div className="flex flex-wrap gap-2 justify-center w-full mt-2">
            {nonLivingBin.map(card => (
              <div key={card.id} className="bg-white dark:bg-gray-800 px-3 py-1.5 rounded-xl border border-rose-300 dark:border-rose-700 shadow-sm flex items-center gap-1.5 text-xs font-bold text-rose-900 dark:text-rose-200">
                <span>{card.icon}</span>
                <span>{card.name}</span>
              </div>
            ))}
            {nonLivingBin.length === 0 && <span className="text-rose-700/50 dark:text-rose-400/50 text-xs italic mt-4">Place non-living cards here</span>}
          </div>
        </div>
      </div>

      {/* Cards Pool */}
      <div className="w-full max-w-4xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border-2 border-amber-200 dark:border-amber-900/50 mb-8">
        <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 text-center">
          Choose a card and sort it to the correct hive:
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {cards.map(card => (
            <div
              key={card.id}
              className="bg-amber-50 dark:bg-gray-800 border-2 border-dashed border-amber-300 dark:border-amber-700 rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm"
            >
              <span className="text-3xl mb-1">{card.icon}</span>
              <span className="text-xs font-bold text-amber-900 dark:text-amber-200 mb-2">{card.name}</span>
              <div className="flex gap-1 w-full">
                <button
                  onClick={() => handleSort(card, 'living')}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold py-1 rounded cursor-pointer"
                >
                  Living
                </button>
                <button
                  onClick={() => handleSort(card, 'non-living')}
                  className="flex-1 bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold py-1 rounded cursor-pointer"
                >
                  Non-Living
                </button>
              </div>
            </div>
          ))}
          {cards.length === 0 && (
            <div className="col-span-full text-center py-4 text-emerald-700 dark:text-emerald-400 font-extrabold text-base">
              ✨ All cards have been sorted successfully! Great job!
            </div>
          )}
        </div>
      </div>

      {isWon && (
        <button
          onClick={resetGame}
          className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold shadow-xl transition-all cursor-pointer text-lg animate-bounce"
        >
          Play Again 🔄
        </button>
      )}
    </div>
  );
}