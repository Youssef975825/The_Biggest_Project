import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface DinoEggSurpriseProps {
  onBackToGames: () => void;
}

const boardSteps = [
  { id: 1, name: 'START', x: 50, y: 15 },
  { id: 2, name: '2', x: 75, y: 20 },
  { id: 3, name: '3', x: 90, y: 40 },
  { id: 4, name: '4', x: 90, y: 65 },
  { id: 5, name: '5', x: 75, y: 85 },
  { id: 6, name: '6', x: 50, y: 90 },
  { id: 7, name: '7', x: 30, y: 90 },
  { id: 8, name: '8', x: 15, y: 75 },
  { id: 9, name: '9', x: 10, y: 55 },
  { id: 10, name: '10', x: 15, y: 35 },
  { id: 11, name: '11', x: 30, y: 20 },
  { id: 12, name: 'FINISH', x: 50, y: 45 },
];

const eggSurprises = [
  { id: 1, type: 'move', value: 2, text: '🎉 Surprise! Move forward 2 steps!' },
  { id: 2, type: 'action', value: 0, text: '🦖 Dino roar! Jump in place with joy!' },
  { id: 3, type: 'move', value: 1, text: '🌟 Lucky egg! Move forward 1 extra step.' },
  { id: 4, type: 'back', value: -1, text: '⚠️ A light storm! Go back 1 step.' },
  { id: 5, type: 'move', value: 3, text: '🚀 Wow! A giant leap, move forward 3 steps!' },
  { id: 6, type: 'action', value: 0, text: '🎨 Imitate the sound of a baby dinosaur!' },
  { id: 7, type: 'move', value: 2, text: '🥚 Golden egg! Move forward 2 steps.' },
  { id: 8, type: 'back', value: -2, text: '🍃 Tangled in the trees, go back 2 steps.' },
  { id: 9, type: 'move', value: 1, text: '✨ A lucky step forward!' },
  { id: 10, type: 'action', value: 0, text: '🦕 The happy dino dance!' },
  { id: 11, type: 'move', value: 2, text: '🔥 Lightning speed, move forward 2 steps!' },
  { id: 12, type: 'move', value: 1, text: '🏆 One step closer to the finish line!' },
];

export default function DinoEggSurprise({ onBackToGames }: DinoEggSurpriseProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [openedEggs, setOpenedEggs] = useState<number[]>([]);
  const [currentMessage, setCurrentMessage] = useState('Pick one of the 12 eggs to discover a surprise and move the dino!');
  const [isGameOver, setIsGameOver] = useState(false);
  const [activeSurprise, setActiveSurprise] = useState<string | null>(null);

  const handleEggClick = (eggId: number) => {
    if (isGameOver || openedEggs.includes(eggId)) return;

    const newOpenedEggs = [...openedEggs, eggId];
    setOpenedEggs(newOpenedEggs);

    const surprise = eggSurprises[(eggId - 1) % eggSurprises.length];
    setActiveSurprise(surprise.text);

    let newIndex = currentStepIndex;

    if (surprise.type === 'move') {
      newIndex = Math.min(boardSteps.length - 1, currentStepIndex + surprise.value);
    } else if (surprise.type === 'back') {
      newIndex = Math.max(0, currentStepIndex + surprise.value);
    }

    setCurrentStepIndex(newIndex);

    if (newIndex === boardSteps.length - 1) {
      setIsGameOver(true);
      setCurrentMessage('🏆 Congratulations, champ! The dino reached the finish line!');
      try {
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
      } catch (e) {}
    } else if (newOpenedEggs.length === eggSurprises.length) {
      setIsGameOver(true);
      setCurrentMessage('⚠️ You ran out of eggs before reaching the finish line! Try again.');
    } else {
      setCurrentMessage(surprise.text);
    }
  };

  const resetGame = () => {
    setCurrentStepIndex(0);
    setOpenedEggs([]);
    setIsGameOver(false);
    setActiveSurprise(null);
    setCurrentMessage('Pick one of the 12 eggs to discover a surprise and move the dino!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-4 md:p-8 flex flex-col items-center transition-colors duration-300">
      {/* Back button */}
      <div className="w-full max-w-4xl flex justify-start mb-4">
        <button
          onClick={onBackToGames}
          className="px-4 py-2 rounded-2xl bg-white dark:bg-gray-900 shadow-md text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all border border-amber-200 dark:border-amber-900/50 cursor-pointer flex items-center gap-2 text-sm"
        >
          ← Back to Dino Games
        </button>
      </div>

      {/* Game title */}
      <div className="text-center space-y-1 mb-4">
        <span className="text-4xl">🥚</span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-amber-950 dark:text-amber-300">
          Dino Egg Surprise Game
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm font-medium">
          Story 1 - Dino's Big Surprise: Open the eggs and help the dino reach the finish!
        </p>
      </div>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
        {/* Visual path board */}
        <div className="md:col-span-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-amber-200 dark:border-amber-900/50 rounded-3xl p-4 shadow-xl flex flex-col items-center space-y-4">
          <div className="w-full flex items-center justify-between bg-amber-100/80 dark:bg-amber-950/60 p-2.5 rounded-2xl border border-amber-300 dark:border-amber-800">
            <span className="text-sm font-extrabold text-amber-900 dark:text-amber-300">🗺️ Path Board</span>
            <span className="text-xs font-bold bg-amber-700 text-white px-2.5 py-0.5 rounded-full">
              Station: {boardSteps[currentStepIndex].name}
            </span>
          </div>

          <div className="relative w-full h-56 bg-amber-50/70 dark:bg-gray-800/50 border-2 border-dashed border-amber-300 dark:border-amber-800 rounded-2xl flex items-center justify-center p-2">
            {boardSteps.map((step, index) => {
              const isCurrent = index === currentStepIndex;
              return (
                <div
                  key={step.id}
                  style={{ top: `${step.y}%`, left: `${step.x}%` }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex flex-col items-center justify-center font-extrabold text-[10px] shadow-md transition-all duration-300 ${
                    isCurrent
                      ? 'bg-amber-600 text-white ring-4 ring-amber-300 scale-125 z-20 animate-bounce'
                      : index < currentStepIndex
                      ? 'bg-emerald-600 text-white opacity-80'
                      : 'bg-white dark:bg-gray-800 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-700'
                  }`}
                >
                  {isCurrent ? <span className="text-sm">🦖</span> : <span>{step.name}</span>}
                </div>
              );
            })}
          </div>

          {activeSurprise && (
            <div className="w-full bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-orange-900 dark:text-orange-300 font-extrabold text-center p-2 rounded-xl text-xs animate-pulse">
              {activeSurprise}
            </div>
          )}

          <div className="text-amber-900 dark:text-amber-300 font-bold text-center px-3 py-1.5 bg-amber-50 dark:bg-gray-800 rounded-xl w-full text-xs">
            {currentMessage}
          </div>
        </div>

        {/* Interactive eggs board */}
        <div className="md:col-span-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-amber-200 dark:border-amber-900/50 rounded-3xl p-4 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-center font-extrabold text-amber-950 dark:text-amber-300 text-sm mb-3">
              Choose one of the 12 eggs:
            </h3>
            {!isGameOver ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {eggSurprises.map((egg) => {
                  const isOpened = openedEggs.includes(egg.id);
                  return (
                    <button
                      key={egg.id}
                      onClick={() => handleEggClick(egg.id)}
                      disabled={isOpened}
                      className={`p-2.5 rounded-xl shadow-md font-extrabold flex flex-col items-center justify-center gap-1 transition-transform transform ${
                        isOpened
                          ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 opacity-50 cursor-not-allowed'
                          : 'bg-amber-700 hover:bg-amber-600 text-white hover:-translate-y-1 cursor-pointer'
                      }`}
                    >
                      <span className="text-2xl">🥚</span>
                      <span className="text-[10px]">Egg #{egg.id}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-center space-y-3 py-6">
                <span className="text-5xl">🎉</span>
                <h2 className="text-lg font-extrabold text-amber-900 dark:text-amber-300">Round over!</h2>
                <p className="text-gray-600 dark:text-gray-300 text-xs font-medium px-4">
                  {currentStepIndex === boardSteps.length - 1
                    ? 'You reached the finish line!'
                    : 'You ran out of eggs before reaching the finish. Try again!'}
                </p>
                <button
                  onClick={resetGame}
                  className="w-full py-2.5 bg-amber-700 hover:bg-amber-600 text-white font-extrabold rounded-xl shadow-md transition-all cursor-pointer text-xs"
                >
                  Play Again 🔄
                </button>
              </div>
            )}
          </div>

          <div className="text-center text-[11px] text-gray-400 mt-3">
            Eggs opened: {openedEggs.length} / 12
          </div>
        </div>
      </div>
    </div>
  );
}