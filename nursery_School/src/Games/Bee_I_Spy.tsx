import React, { useState } from 'react';

interface TargetItem {
  id: number;
  name: string;
  icon: string;
}

interface BeeISpyProps {
  onBackToGames: () => void;
}

const TARGET_ITEMS: TargetItem[] = [
  { id: 1, name: 'Bee with Honey', icon: '🐝🍯' },
  { id: 2, name: 'Beehive', icon: '🏡' },
  { id: 3, name: 'Pink Flower', icon: '🌸' },
  { id: 4, name: 'Blue Bird', icon: '🐦' },
  { id: 5, name: 'Sunflower', icon: '🌻' },
  { id: 6, name: 'Butterfly', icon: '🦋' },
  { id: 7, name: 'Mushroom', icon: '🍄' },
  { id: 8, name: 'Honey Pot', icon: '🍯' },
];

export default function BeeISpy({ onBackToGames }: BeeISpyProps) {
  const [foundItems, setFoundItems] = useState<number[]>([]);
  const [currentRandomIndex, setCurrentRandomIndex] = useState<number>(() => 
    Math.floor(Math.random() * TARGET_ITEMS.length)
  );
  const [gameMessage, setGameMessage] = useState<string>('Look at the busy beehive scene and find the target item on your active card!');
  const [isWon, setIsWon] = useState<boolean>(false);
  const [wrongClickedId, setWrongClickedId] = useState<number | null>(null);

  const remainingItems = TARGET_ITEMS.filter(item => !foundItems.includes(item.id));
  const activeIndex = currentRandomIndex >= remainingItems.length ? 0 : currentRandomIndex;
  const currentTarget = remainingItems.length > 0 ? remainingItems[activeIndex] : null;

  const handleItemClick = (item: TargetItem): void => {
    if (isWon || foundItems.includes(item.id) || !currentTarget) return;

    if (item.id === currentTarget.id) {
      const newFound = [...foundItems, item.id];
      setFoundItems(newFound);
      setWrongClickedId(null);

      if (newFound.length === TARGET_ITEMS.length) {
        setIsWon(true);
        setGameMessage('🎉 Hurray! You found all the hidden items in the beehive scene! "I found it!"');
      } else {
        const newRemainingCount = TARGET_ITEMS.length - newFound.length;
        const nextRandom = Math.floor(Math.random() * newRemainingCount);
        setCurrentRandomIndex(nextRandom);
        setGameMessage('✨ Great job! Now look at your new active card and find it in the scene!');
      }
    } else {
      setWrongClickedId(item.id);
      setGameMessage(`❌ Oops! That is "${item.name}", not "${currentTarget.name}". Look closer!`);
      
      setTimeout(() => {
        setWrongClickedId(null);
      }, 1000);
    }
  };

  const resetGame = (): void => {
    setFoundItems([]);
    setCurrentRandomIndex(Math.floor(Math.random() * TARGET_ITEMS.length));
    setIsWon(false);
    setWrongClickedId(null);
    setGameMessage('Look at the busy beehive scene and find the target item!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-amber-50 to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-6 md:p-12 flex flex-col items-center transition-colors duration-300">
      <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <button 
          onClick={onBackToGames}
          className="px-5 py-2.5 rounded-2xl bg-white dark:bg-gray-900 shadow-md text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all border border-amber-200 dark:border-amber-900/50 cursor-pointer flex items-center gap-2"
        >
          ← Back to Games Hub
        </button>
        <div className="font-bold text-amber-900 dark:text-amber-300 bg-white/80 dark:bg-gray-900/80 px-4 py-2 rounded-2xl shadow-sm border border-amber-200 dark:border-amber-900/50">
          🔍 Found: {foundItems.length} / {TARGET_ITEMS.length}
        </div>
      </div>

      <div className="text-center space-y-2 mb-6">
        <span className="text-5xl inline-block animate-bounce">🔍</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-amber-900 dark:text-amber-300">
          Bee I Spy!
        </h1>
        <p className="text-amber-800 dark:text-amber-400 font-medium max-w-lg mx-auto">
          Find the picture on your active card in the busy beehive scene! Say "I found it!" when found.
        </p>
      </div>

      <div className="w-full max-w-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl p-4 shadow-md border border-amber-200 dark:border-amber-900/50 text-center mb-8">
        <p className="text-amber-900 dark:text-amber-300 font-bold text-base md:text-lg">
          {gameMessage}
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-emerald-100/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border-3 border-emerald-400 dark:border-emerald-800 flex flex-col items-center relative min-h-[350px]">
          <h3 className="text-sm font-extrabold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider mb-4">
            Busy Beehive Scene (Click the matching item!)
          </h3>

          <div className="grid grid-cols-4 gap-4 w-full h-full items-center justify-items-center py-6">
            {TARGET_ITEMS.map((item) => {
              const isFound = foundItems.includes(item.id);
              const isWrong = wrongClickedId === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl flex flex-col items-center justify-center text-3xl md:text-4xl transition-all shadow-md relative cursor-pointer ${
                    isFound 
                      ? 'bg-emerald-300 dark:bg-emerald-900/60 border-4 border-emerald-600 dark:border-emerald-700 opacity-60 scale-95' 
                      : isWrong
                      ? 'bg-rose-200 border-4 border-rose-500 animate-shake scale-90'
                      : 'bg-white dark:bg-gray-800 hover:bg-amber-100 dark:hover:bg-gray-700 border-2 border-amber-300 dark:border-amber-800 hover:scale-110'
                  }`}
                >
                  <span>{item.icon}</span>
                  {isFound && (
                    <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                      Found ✓
                    </span>
                  )}
                  {isWrong && (
                    <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                      Not Here ✗
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-xl border-3 border-amber-300 dark:border-amber-800 flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
            Your Active Card
          </span>

          {!isWon && currentTarget ? (
            <div className="w-40 h-44 rounded-2xl bg-amber-50 dark:bg-gray-800 border-3 border-dashed border-amber-400 dark:border-amber-700 flex flex-col items-center justify-center p-4 shadow-inner animate-pulse">
              <span className="text-6xl mb-3">{currentTarget.icon}</span>
              <span className="text-sm font-extrabold text-amber-900 dark:text-amber-300">{currentTarget.name}</span>
            </div>
          ) : (
            <div className="py-8 space-y-3">
              <span className="text-5xl">🏆</span>
              <p className="text-emerald-700 dark:text-emerald-400 font-extrabold text-lg">All Cards Found!</p>
              <button
                onClick={resetGame}
                className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold shadow-lg transition-all cursor-pointer"
              >
                Play Again 🔄
              </button>
            </div>
          )}

          <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 font-medium">
            Age 3+ • 2-4 Players
          </div>
        </div>
      </div>
    </div>
  );
}