import React, { useState } from 'react';

interface BeeRaceProps {
  onBackToGames: () => void;
}

const TOTAL_STEPS = 15;

export default function BeeRace({ onBackToGames }: BeeRaceProps) {
  const [playerPosition, setPlayerPosition] = useState<number>(0);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [gameMessage, setGameMessage] = useState<string>('Press the dice to start the race to the flower! 🌸');
  const [isWon, setIsWon] = useState<boolean>(false);

  const rollDice = (): void => {
    if (isRolling || isWon) return;

    setIsRolling(true);
    setGameMessage('Rolling the magic dice... 🎲');

    setTimeout(() => {
      const remainingSteps = TOTAL_STEPS - playerPosition;
      let rolled = Math.floor(Math.random() * 3) + 1;
      
      // Ensure the dice roll does not exceed remaining steps to finish precisely
      if (rolled > remainingSteps) {
        rolled = remainingSteps;
      }

      setDiceValue(rolled);
      setIsRolling(false);

      let newPos = playerPosition + rolled;

      if (newPos === 3 && newPos < TOTAL_STEPS) {
        newPos += 2;
        setGameMessage('🍯 Sweet! Bella found a honey drop and moved forward 2 extra steps!');
      } else if (newPos === 7 && newPos < TOTAL_STEPS) {
        newPos -= 1;
        setGameMessage('💨 Oops! A little wind blew Bella back 1 step.');
      } else if (newPos === 11 && newPos < TOTAL_STEPS) {
        newPos += 1;
        setGameMessage('🦋 Yay! A friendly butterfly gave Bella a lift forward 1 step!');
      } else if (newPos === TOTAL_STEPS) {
        setGameMessage('🎉 Hurray! Bella reached the giant sunflower and won the race!');
      } else {
        setGameMessage(`Bella moved forward by ${rolled} steps! Keep going! 🐝`);
      }

      if (newPos >= TOTAL_STEPS) {
        newPos = TOTAL_STEPS;
        setIsWon(true);
      }

      setPlayerPosition(newPos);
    }, 800);
  };

  const resetGame = (): void => {
    setPlayerPosition(0);
    setDiceValue(null);
    setIsWon(false);
    setGameMessage('New race started! Press the dice to roll. 🎲');
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
          🏁 Step: {playerPosition} / {TOTAL_STEPS}
        </div>
      </div>

      <div className="text-center space-y-2 mb-8">
        <span className="text-5xl inline-block animate-bounce">🐝</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-amber-900 dark:text-amber-300">
          Bee Race to the Flower
        </h1>
        <p className="text-gray-600 dark:text-gray-300 font-medium">
          Help Bella the bee race across the meadow path to reach the winning sunflower!
        </p>
      </div>

      <div className="w-full max-w-4xl bg-white/90 dark:bg-gray-900/95 backdrop-blur-md rounded-3xl p-8 shadow-xl border-2 border-amber-200 dark:border-amber-900/50 mb-8 flex flex-col items-center">
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 py-4">
          {Array.from({ length: TOTAL_STEPS + 1 }).map((_, index) => {
            const isHere = playerPosition === index;
            
            let circleStyle = 'bg-amber-100 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200';
            if (index === 0) circleStyle = 'bg-emerald-200 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200';
            if (index === TOTAL_STEPS) circleStyle = 'bg-pink-200 dark:bg-pink-950/60 border-pink-400 dark:border-pink-700 text-pink-900 dark:text-pink-200';

            return (
              <div key={index} className="flex items-center">
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-4 flex flex-col items-center justify-center relative transition-all shadow-md ${circleStyle} ${
                    isHere ? 'ring-4 ring-amber-500 scale-110 shadow-xl bg-amber-200 dark:bg-amber-900 z-10' : 'hover:scale-105'
                  }`}
                >
                  <span className="text-[10px] md:text-xs font-extrabold opacity-70">
                    {index === 0 ? 'START' : index === TOTAL_STEPS ? 'GOAL' : index}
                  </span>
                  <span className="text-xl md:text-2xl">
                    {index === 0 && '🏡'}
                    {index === 3 && '🍯'}
                    {index === 7 && '💨'}
                    {index === 11 && '🦋'}
                    {index === TOTAL_STEPS && '🌻'}
                    {index !== 0 && index !== 3 && index !== 7 && index !== 11 && index !== TOTAL_STEPS && '⚪'}
                  </span>
                  {isHere && (
                    <div className="absolute -top-6 text-3xl md:text-4xl animate-bounce drop-shadow-lg">
                      🐝
                    </div>
                  )}
                </div>
                {index < TOTAL_STEPS && (
                  <div className="w-3 md:w-6 h-1 bg-amber-300 dark:bg-amber-800 mx-1 hidden sm:block rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-xl border-2 border-amber-300 dark:border-amber-800 text-center space-y-4">
        <p className="text-amber-900 dark:text-amber-300 font-bold text-lg min-h-[3rem] flex items-center justify-center">
          {gameMessage}
        </p>

        <div className="flex justify-center items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 border-2 border-amber-400 dark:border-amber-700 flex items-center justify-center text-3xl shadow-inner p-9 text-amber-900 dark:text-amber-200">
            {diceValue !== null ? `🎲 ${diceValue}` : '🎲'}
          </div>

          {!isWon ? (
            <button
              onClick={rollDice}
              disabled={isRolling}
              className="flex-1 py-4 rounded-2xl bg-amber-400 hover:bg-amber-500 active:scale-95 text-amber-950 font-extrabold shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              {isRolling ? 'Rolling...' : 'Roll Dice 🎲'}
            </button>
          ) : (
            <button
              onClick={resetGame}
              className="flex-1 py-4 rounded-2xl bg-emerald-400 hover:bg-emerald-500 text-emerald-950 font-extrabold shadow-lg transition-all cursor-pointer"
            >
              Play Again 🔄
            </button>
          )}
        </div>
      </div>
    </div>
  );
}