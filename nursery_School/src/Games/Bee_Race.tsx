import React, { useState } from 'react';

interface BeeRaceProps {
  onBackToGames: () => void;
}

const TOTAL_STEPS = 15; // عدد خطوات مسار السباق

export default function BeeRace({ onBackToGames }: BeeRaceProps) {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [gameMessage, setGameMessage] = useState('Press the dice to start the race to the flower! 🌸');
  const [isWon, setIsWon] = useState(false);

  const rollDice = () => {
    if (isRolling || isWon) return;

    setIsRolling(true);
    setGameMessage('Rolling the magic dice... 🎲');

    setTimeout(() => {
      const rolled = Math.floor(Math.random() * 3) + 1; // نرد من 1 لـ 3
      setDiceValue(rolled);
      setIsRolling(false);

      let newPos = playerPosition + rolled;

      // 1. فحص المفاجآت أولاً
      if (newPos === 3) {
        newPos += 2; 
        setGameMessage('🍯 Sweet! Bella found a honey drop and moved forward 2 extra steps!');
      } else if (newPos === 7) {
        newPos -= 1; 
        setGameMessage('💨 Oops! A little wind blew Bella back 1 step.');
      } else if (newPos === 11) {
        newPos += 1; 
        setGameMessage('🦋 Yay! A friendly butterfly gave Bella a lift forward 1 step!');
      } else {
        setGameMessage(`Bella moved forward by ${rolled} steps! Keep going! 🐝`);
      }

      // 2. فحص خط النهاية
      if (newPos >= TOTAL_STEPS) {
        newPos = TOTAL_STEPS;
        setIsWon(true);
        setGameMessage('🎉 Hurray! Bella reached the giant sunflower and won the race!');
      }

      setPlayerPosition(newPos);
    }, 800);
  };

  const resetGame = () => {
    setPlayerPosition(0);
    setDiceValue(null);
    setIsWon(false);
    setGameMessage('New race started! Press the dice to roll. 🎲');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-amber-50 to-emerald-50 p-6 md:p-12 flex flex-col items-center">
      {/* زر العودة لقائمة الألعاب */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <button 
          onClick={onBackToGames}
          className="px-5 py-2.5 rounded-2xl bg-white shadow-md text-gray-700 font-bold hover:bg-gray-100 transition-all border border-amber-200 cursor-pointer flex items-center gap-2 translate-y-16 translate-x-[-12rem]"
        >
          ← Back to Games Hub
        </button>
        <div className="font-bold text-amber-900 bg-white/80 px-4 py-2 rounded-2xl shadow-sm border border-amber-200 translate-y-16 translate-x-[10rem]">
          🏁 Step: {playerPosition} / {TOTAL_STEPS}
        </div>
      </div>

      {/* عنوان اللعبة */}
      <div className="text-center space-y-2 mb-8">
        <span className="text-5xl inline-block animate-bounce">🐝</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-amber-900">
          Bee Race to the Flower
        </h1>
        <p className="text-gray-600 font-medium">
          Help Bella the bee race across the meadow path to reach the winning sunflower!
        </p>
      </div>

      {/* مسار السباق (دوائر متسلسلة تشبه الـ PDF) */}
      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border-2 border-amber-200 mb-8 flex flex-col items-center">
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 py-4">
          {Array.from({ length: TOTAL_STEPS + 1 }).map((_, index) => {
            const isHere = playerPosition === index;
            
            // تخصيص ألوان وشكل الدوائر
            let circleStyle = 'bg-amber-100 border-amber-300 text-amber-900';
            if (index === 0) circleStyle = 'bg-emerald-200 border-emerald-400 text-emerald-900';
            if (index === TOTAL_STEPS) circleStyle = 'bg-pink-200 border-pink-400 text-pink-900';

            return (
              <div key={index} className="flex items-center">
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-4 flex flex-col items-center justify-center relative transition-all shadow-md ${circleStyle} ${
                    isHere ? 'ring-4 ring-amber-500 scale-110 shadow-xl bg-amber-200 z-10' : 'hover:scale-105'
                  }`}
                >
                  {/* رقم الخطوة أو أيقونتها */}
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

                  {/* ظهور النحلة فوق الدائرة الحالية */}
                  {isHere && (
                    <div className="absolute -top-6 text-3xl md:text-4xl animate-bounce drop-shadow-lg">
                      🐝
                    </div>
                  )}
                </div>

                {/*آخر خط سهم بين الدوائر (ما عدا الأخيرة) */}
                {index < TOTAL_STEPS && (
                  <div className="w-3 md:w-6 h-1 bg-amber-300 mx-1 hidden sm:block rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* لوحة التحكم والرسائل */}
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl border-2 border-amber-300 text-center space-y-4">
        <p className="text-amber-900 font-bold text-lg min-h-[3rem] flex items-center justify-center">
          {gameMessage}
        </p>

        <div className="flex justify-center items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-3xl shadow-inner p-9">
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