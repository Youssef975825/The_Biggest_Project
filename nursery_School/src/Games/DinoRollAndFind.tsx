import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface DinoRollAndFindProps {
  onBackToGames: () => void;
}

const boardItems = [
  { id: 1, name: 'T-Rex', icon: '🦖', desc: 'The friendly giant dinosaur' },
  { id: 2, name: 'Stegosaurus', icon: '🦕', desc: 'The one with the back plates' },
  { id: 3, name: 'Dino Egg', icon: '🥚', desc: 'The surprise dino egg' },
  { id: 4, name: 'Volcano', icon: '🌋', desc: 'The blazing volcano in the jungle' },
  { id: 5, name: 'Footprint', icon: '🐾', desc: 'The big dino footprint' },
  { id: 6, name: 'Jungle Leaves', icon: '🌿', desc: 'Thick jungle leaves' },
];

export default function DinoRollAndFind({ onBackToGames }: DinoRollAndFindProps) {
  const [diceNumber, setDiceNumber] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [targetItem, setTargetItem] = useState<(typeof boardItems[0]) | null>(null);
  const [foundItems, setFoundItems] = useState<number[]>([]);
  const [message, setMessage] = useState<string>('Press the Roll Dice button to start the challenge!');

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    setDiceNumber(null);
    setMessage('Rolling the dice... 🎲');

    let counter = 0;
    const interval = setInterval(() => {
      const randomTemp = Math.floor(Math.random() * 6) + 1;
      setDiceNumber(randomTemp);
      counter++;
      if (counter > 10) {
        clearInterval(interval);
        const finalDice = Math.floor(Math.random() * 6) + 1;
        setDiceNumber(finalDice);
        setIsRolling(false);

        const selected = boardItems[finalDice - 1];
        setTargetItem(selected);
        setMessage(`Great! You rolled ${finalDice}. Find ${selected.name} (${selected.icon}) on the board and click it!`);
      }
    }, 80);
  };

  const handleItemClick = (item: typeof boardItems[0]) => {
    if (!targetItem) {
      alert('Please roll the dice first to get your target!');
      return;
    }

    if (item.id === targetItem.id) {
      if (!foundItems.includes(item.id)) {
        const updatedFound = [...foundItems, item.id];
        setFoundItems(updatedFound);
        setMessage(`🎉 Well done, champ! You found "${item.name}".`);

        if (updatedFound.length === boardItems.length) {
          try {
            confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
          } catch (e) {}
          setMessage('🏆 Congratulations! You found all the dinosaurs and jungle items!');
        } else {
          setTargetItem(null);
        }
      } else {
        setMessage('You already found this item! Roll the dice to look for a new one.');
      }
    } else {
      setMessage(`❌ Not that one! Look for: ${targetItem.name} (${targetItem.icon})`);
    }
  };

  const resetGame = () => {
    setDiceNumber(null);
    setTargetItem(null);
    setFoundItems([]);
    setMessage('Press the Roll Dice button to start the challenge again!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-6 md:p-12 flex flex-col items-center transition-colors duration-300">
      {/* Back button */}
      <div className="w-full max-w-4xl flex justify-start mb-6">
        <button
          onClick={onBackToGames}
          className="px-5 py-2.5 rounded-2xl bg-white dark:bg-gray-900 shadow-md text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all border border-teal-200 dark:border-teal-900/50 cursor-pointer flex items-center gap-2"
        >
          ← Back to Dino Games
        </button>
      </div>

      {/* Title */}
      <div className="text-center space-y-2 mb-6">
        <span className="text-5xl">🎲</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-teal-950 dark:text-teal-300">
          Roll & Find Dino
        </h1>
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          Roll the dice, follow the clues, and discover dinosaurs and items in the jungle!
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-teal-200 dark:border-teal-900/50 rounded-3xl p-6 shadow-xl max-w-md w-full text-center mb-8 space-y-4">
        <div className="text-xl font-bold text-teal-900 dark:text-teal-300 min-h-[3rem] flex items-center justify-center px-2">
          {message}
        </div>

        <div className="flex items-center justify-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-teal-600 text-white flex items-center justify-center text-3xl font-extrabold shadow-lg animate-pulse">
            {diceNumber !== null ? diceNumber : '🎲'}
          </div>

          <button
            onClick={rollDice}
            disabled={isRolling || foundItems.length === boardItems.length}
            className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-extrabold rounded-2xl shadow-lg transition-all cursor-pointer disabled:opacity-50"
          >
            {isRolling ? 'Rolling...' : 'Roll Dice 🎲'}
          </button>
        </div>
      </div>

      {/* Board grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-4xl w-full mb-8">
        {boardItems.map((item) => {
          const isFound = foundItems.includes(item.id);
          const isCurrentTarget = targetItem?.id === item.id;

          return (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`rounded-3xl p-6 border-2 shadow-lg transition-all transform flex flex-col items-center justify-center text-center cursor-pointer min-h-[160px] relative ${
                isFound
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-700 opacity-60 scale-95'
                  : isCurrentTarget
                  ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-400 dark:border-amber-700 ring-4 ring-amber-300 animate-bounce'
                  : 'bg-white dark:bg-gray-900 border-teal-200 dark:border-teal-900/50 hover:border-teal-400 hover:-translate-y-1'
              }`}
            >
              {isFound && (
                <span className="absolute top-3 right-3 bg-emerald-500 text-white text-xs px-2.5 py-1 rounded-full font-bold">
                  Found ✓
                </span>
              )}
              <span className="text-6xl mb-3">{item.icon}</span>
              <h3 className="text-lg font-extrabold text-teal-950 dark:text-white mb-1">{item.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {foundItems.length === boardItems.length && (
        <button
          onClick={resetGame}
          className="px-8 py-3 bg-teal-600 hover:bg-teal-500 text-white font-extrabold rounded-2xl shadow-xl transition-all cursor-pointer"
        >
          Play Again 🔄
        </button>
      )}
    </div>
  );
}