import React, { useState } from 'react';

interface BeeISpyProps {
  onBackToGames: () => void;
}

const TARGET_ITEMS = [
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
  
  // تصفية العناصر التي لم يتم العثور عليها بعد
  const remainingItems = TARGET_ITEMS.filter(item => !foundItems.includes(item.id));
  
  // اختيار كرت نشط عشوائي من العناصر المتبقية باستخدام معادلتك العشوائية
  const [currentRandomIndex, setCurrentRandomIndex] = useState(() => 
    Math.floor(Math.random() * TARGET_ITEMS.length)
  );

  const [gameMessage, setGameMessage] = useState('Look at the busy beehive scene and find the target item!');
  const [isWon, setIsWon] = useState(false);

  // التأكد من أن المؤشر العشوائي في حدود القائمة المتبقية
  const activeIndex = currentRandomIndex >= remainingItems.length ? 0 : currentRandomIndex;
  const currentTarget = remainingItems.length > 0 ? remainingItems[activeIndex] : null;

  const handleItemClick = (item: typeof TARGET_ITEMS[0]) => {
    if (isWon || foundItems.includes(item.id) || !currentTarget) return;

    if (item.id === currentTarget.id) {
      const newFound = [...foundItems, item.id];
      setFoundItems(newFound);

      if (newFound.length === TARGET_ITEMS.length) {
        setIsWon(true);
        setGameMessage('🎉 Hurray! You found all the hidden items in the beehive scene! "I found it!"');
      } else {
        // توليد index عشوائي جديد للعنصر التالي من العناصر المتبقية
        const newRemainingCount = TARGET_ITEMS.length - newFound.length;
        const nextRandom = Math.floor(Math.random() * newRemainingCount);
        setCurrentRandomIndex(nextRandom);
        
        setGameMessage(`✨ Great job! Now find the next item in the scene!`);
      }
    } else {
      setGameMessage(`❌ Oops! That's not the target card. Look closer at the scene!`);
    }
  };

  const resetGame = () => {
    setFoundItems([]);
    setCurrentRandomIndex(Math.floor(Math.random() * TARGET_ITEMS.length));
    setIsWon(false);
    setGameMessage('Look at the busy beehive scene and find the target item!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-amber-50 to-emerald-50 p-6 md:p-12 flex flex-col items-center">
      {/* زر العودة */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-6">
        <button 
          onClick={onBackToGames}
          className="px-5 py-2.5 rounded-2xl bg-white shadow-md text-gray-700 font-bold hover:bg-gray-100 transition-all border border-amber-200 cursor-pointer flex items-center gap-2 translate-y-16 lg:translate-x-[-8rem]"
        >
          ← Back to Games Hub
        </button>
        <div className="font-bold text-amber-900 bg-white/80 px-4 py-2 rounded-2xl shadow-sm border border-amber-200 translate-y-16 lg:translate-x-[6rem]">
          🔍 Found: {foundItems.length} / {TARGET_ITEMS.length}
        </div>
      </div>

      {/* عنوان اللعبة */}
      <div className="text-center space-y-2 mb-6">
        <span className="text-5xl inline-block animate-bounce">🔍</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-amber-900">
          Bee I Spy!
        </h1>
        <p className="text-amber-800 font-medium max-w-lg mx-auto">
          Find the picture on your card in the busy beehive scene! Say "I found it!" and keep your card.
        </p>
      </div>

      {/* لوحة الرسائل */}
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-md border border-amber-200 text-center mb-8">
        <p className="text-amber-900 font-bold text-base md:text-lg">
          {gameMessage}
        </p>
      </div>

      {/* منطقة اللعب الرئيسية */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* لوحة المشهد */}
        <div className="lg:col-span-2 bg-emerald-100/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border-3 border-emerald-400 flex flex-col items-center relative min-h-[350px]">
          <h3 className="text-sm font-extrabold text-emerald-900 uppercase tracking-wider mb-4">
            Busy Beehive Scene (Click the hidden items!)
          </h3>

          <div className="grid grid-cols-4 gap-4 w-full h-full items-center justify-items-center py-6">
            {TARGET_ITEMS.map((item) => {
              const isFound = foundItems.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl flex flex-col items-center justify-center text-3xl md:text-4xl transition-all shadow-md relative cursor-pointer ${
                    isFound 
                      ? 'bg-emerald-300 border-4 border-emerald-600 opacity-60 scale-95' 
                      : 'bg-white hover:bg-amber-100 border-2 border-amber-300 hover:scale-110'
                  }`}
                >
                  <span>{item.icon}</span>
                  {isFound && (
                    <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                      Found ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* الكرت النشط العشوائي */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border-3 border-amber-300 flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Your Active Card
          </span>

          {!isWon && currentTarget ? (
            <div className="w-40 h-44 rounded-2xl bg-amber-50 border-3 border-dashed border-amber-400 flex flex-col items-center justify-center p-4 shadow-inner animate-pulse">
              <span className="text-6xl mb-3">{currentTarget.icon}</span>
              <span className="text-sm font-extrabold text-amber-900">{currentTarget.name}</span>
            </div>
          ) : (
            <div className="py-8 space-y-3">
              <span className="text-5xl">🏆</span>
              <p className="text-emerald-700 font-extrabold text-lg">All Cards Found!</p>
              <button
                onClick={resetGame}
                className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold shadow-lg transition-all cursor-pointer"
              >
                Play Again 🔄
              </button>
            </div>
          )}

          <div className="mt-6 text-xs text-gray-500 font-medium">
            Age 3+ • 2-4 Players
          </div>
        </div>
      </div>
    </div>
  );
}