import React, { useState } from 'react';

interface BeesPathMatchProps {
  onBackToGames: () => void;
}

// مسار خلايا العسل المرتبة من البداية للنهاية
const PATH_STEPS = [
  { id: 1, name: 'Bee', icon: '🐝' },
  { id: 2, name: 'Beehive', icon: '🏡' },
  { id: 3, name: 'Pink Flower', icon: '🌸' },
  { id: 4, name: 'Blue Bird', icon: '🐦' },
  { id: 5, name: 'Sunflower', icon: '🌻' },
  { id: 6, name: 'Honey Pot', icon: '🍯' },
  { id: 7, name: 'Ladybug', icon: '🐞' },
  { id: 8, name: 'Green Leaf', icon: '🍃' },
  { id: 9, name: 'White Flower', icon: '🌼' },
  { id: 10, name: 'Mushroom', icon: '🍄' },
  { id: 11, name: 'Purple Butterfly', icon: '🦋' },
  { id: 12, name: 'Tree', icon: '🌳' },
];

export default function BeesPathMatch({ onBackToGames }: BeesPathMatchProps) {
  // مؤشر الخطوة الحالية في المسار
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  // خلط الكروت بشكل عشوائي عند بدء اللعبة لتكون أوراق اللعب غير مرتبة
  const [shuffledCards, setShuffledCards] = useState(() => [...PATH_STEPS].sort(() => Math.random() - 0.5));
  
  // مؤشر الكرت الحالي المسحوب من مجموعة الكروت المخلطة
  const [cardIndex, setCardIndex] = useState(0);

  const [gameMessage, setGameMessage] = useState('Follow the bee path! Match the drawn card to the current path step[cite: 4].');
  const [isWon, setIsWon] = useState(false);

  const currentPathTarget = PATH_STEPS[currentStepIndex];
  const activeCard = shuffledCards[cardIndex % shuffledCards.length];

  // التعامل مع اختيار اللاعب (هل يتطابق الكرت مع خطوة المسار أم لا؟)
  const handlePlayerChoice = (userSaysMatch: boolean) => {
    if (isWon) return;

    const isActuallyMatching = activeCard.id === currentPathTarget.id;

    if (userSaysMatch) {
      // اللاعب يؤكد أن الكرت يطابق الخطوة الحالية
      if (isActuallyMatching) {
        // إجابة صحيحة: تقدم خطوة في المسار
        if (currentStepIndex + 1 === PATH_STEPS.length) {
          setIsWon(true);
          setGameMessage('🎉 Fantastic! The bee reached the FINISH line successfully![cite: 4]');
        } else {
          setCurrentStepIndex(prev => prev + 1);
          setCardIndex(prev => prev + 1);
          setGameMessage('✨ Correct match! The bee moves forward on the path![cite: 4]');
        }
      } else {
        // إجابة خاطئة: الكرت لا يطابق الخلية الحالية
        setGameMessage('❌ Incorrect! This card does not match the current path step. Try skipping or finding the right one!');
      }
    } else {
      // اللاعب اختار تخطي الكرت (Skip / Not Here)
      if (!isActuallyMatching) {
        // إجابة صحيحة فعلاً الكرت ليس هو المطلوب، ننتقل للكرت التالي
        setCardIndex(prev => prev + 1);
        setGameMessage('👍 Correct skip! This card is not for the current step. Look at the next card.');
      } else {
        // إجابة خاطئة: اللاعب تخطى الكرت مع أنه هو المطلوب بالأساس!
        setGameMessage('⚠️ Wait! This card actually matches the current path step. Try matching it!');
      }
    }
  };

  const resetGame = () => {
    setCurrentStepIndex(0);
    setCardIndex(0);
    setShuffledCards([...PATH_STEPS].sort(() => Math.random() - 0.5));
    setIsWon(false);
    setGameMessage('Follow the bee path! Match the drawn card to the current path step[cite: 4].');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-amber-50 to-emerald-50 p-6 md:p-12 flex flex-col items-center">
      {/* زر العودة */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-6">
        <button 
          onClick={onBackToGames}
          className="px-5 py-2.5 rounded-2xl bg-white shadow-md text-gray-700 font-bold hover:bg-gray-100 transition-all border border-amber-200 cursor-pointer flex items-center gap-2 translate-y-17 md:translate-x-[-1.5rem] lg:translate-x-[-8rem]"
        >
          ← Back to Games Hub
        </button>
        <div className="font-bold text-amber-900 bg-white/80 px-4 py-2 rounded-2xl shadow-sm border border-amber-200 translate-y-17 md:translate-x-6 lg:translate-x-[8rem]">
          🐝 Path Step: {currentStepIndex + 1} / {PATH_STEPS.length}
        </div>
      </div>

      {/* عنوان اللعبة */}
      <div className="text-center space-y-2 mb-6">
        <span className="text-5xl inline-block animate-bounce">🐝</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-amber-900">
          Bee's Path Match[cite: 4]
        </h1>
        <p className="text-amber-800 font-medium max-w-lg mx-auto">
          Place the picture cards to the correct spot on the board and guide the bee along the path[cite: 4]!
        </p>
      </div>

      {/* لوحة الرسائل */}
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-md border border-amber-200 text-center mb-8">
        <p className="text-amber-900 font-bold text-base md:text-lg">
          {gameMessage}
        </p>
      </div>

      {/* لوحة المسار الخطي (Path Board) */}
      <div className="w-full max-w-5xl bg-emerald-100/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border-3 border-emerald-400 mb-8 flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-4 px-4">
          <span className="bg-amber-600 text-white font-extrabold px-4 py-1.5 rounded-full text-xs shadow">START 🚀</span>
          <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Bee's Journey Path[cite: 4]</span>
          <span className="bg-emerald-600 text-white font-extrabold px-4 py-1.5 rounded-full text-xs shadow">FINISH 🏁</span>
        </div>

        {/* خلايا المسار مرتبة */}
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3 w-full py-4">
          {PATH_STEPS.map((step, idx) => {
            const isPassed = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={step.id}
                className={`h-24 rounded-2xl flex flex-col items-center justify-center p-2 relative transition-all shadow-md ${
                  isPassed 
                    ? 'bg-emerald-300 border-2 border-emerald-600 opacity-80' 
                    : isCurrent 
                    ? 'bg-amber-100 border-4 border-amber-500 scale-105 animate-pulse shadow-xl' 
                    : 'bg-white/60 border-2 border-dashed border-amber-300 opacity-60'
                }`}
              >
                <span className="text-2xl mb-1">{step.icon}</span>
                <span className="text-[10px] font-bold text-amber-900 text-center truncate w-full">{step.name}</span>
                
                {isCurrent && (
                  <span className="absolute -top-3 bg-amber-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow animate-bounce">
                    Bee 🐝
                  </span>
                )}
                {isPassed && (
                  <span className="absolute top-1 right-1 bg-emerald-700 text-white text-[9px] font-bold px-1 rounded">
                    ✓
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* منطقة سحب الكرت والاختيار */}
      {!isWon ? (
        <div className="w-full max-w-xl bg-white rounded-3xl p-6 shadow-xl border-3 border-amber-300 flex flex-col items-center text-center">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            Drawn Card to Match on Path[cite: 4]
          </span>

          <div className="w-36 h-36 rounded-2xl bg-amber-50 border-3 border-dashed border-amber-400 flex flex-col items-center justify-center p-4 shadow-inner mb-6">
            <span className="text-6xl mb-2">{activeCard.icon}</span>
            <span className="text-xs font-extrabold text-amber-900">{activeCard.name}</span>
          </div>

          <p className="text-sm font-bold text-gray-600 mb-4">
            Does this drawn card match the current bee path step?
          </p>

          <div className="flex gap-4 w-full justify-center">
            <button
              onClick={() => handlePlayerChoice(true)}
              className="flex-1 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold shadow-lg transition-all cursor-pointer"
            >
              Yes, Match It! ✓
            </button>
            <button
              onClick={() => handlePlayerChoice(false)}
              className="flex-1 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-extrabold shadow-lg transition-all cursor-pointer"
            >
              Skip / Not Here ✗
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 shadow-xl border-3 border-amber-300 text-center space-y-4">
          <span className="text-6xl">🏆</span>
          <h3 className="text-2xl font-extrabold text-emerald-700">You Won the Path Game!</h3>
          <p className="text-gray-600 font-medium">The bee successfully crossed the entire path from Start to Finish[cite: 4]!</p>
          <button
            onClick={resetGame}
            className="px-8 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold shadow-lg transition-all cursor-pointer"
          >
            Play Again 🔄
          </button>
        </div>
      )}
    </div>
  );
}