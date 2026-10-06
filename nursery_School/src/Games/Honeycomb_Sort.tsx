import React, { useState, useEffect } from 'react';

interface HoneycombSortProps {
  onBackToGames: () => void;
}

// قائمة الكروت الموجودة في الكتيب بدقة وتصنيفها الصحيح
const INITIAL_CARDS = [
  { id: 1, name: 'Bee', icon: '🐝', type: 'living' },
  { id: 2, name: 'Tree', icon: '🌳', type: 'living' },
  { id: 3, name: 'Rock', icon: '🪨', type: 'non-living' },
  { id: 4, name: 'Flower', icon: '🌸', type: 'non-living' }, // مطابق للكرت الموجود في القسم الثاني
  { id: 5, name: 'Sun', icon: '☀️', type: 'non-living' },
  { id: 6, name: 'Butterfly', icon: '🦋', type: 'living' },
  { id: 7, name: 'Car', icon: '🚗', type: 'non-living' },
  { id: 8, name: 'Bird', icon: '🐦', type: 'living' },
  { id: 9, name: 'Chair', icon: '🪑', type: 'non-living' },
  { id: 10, name: 'Mushroom', icon: '🍄', type: 'non-living' },
];

export default function Honeycomb_Sort({ onBackToGames }: HoneycombSortProps) {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [livingBin, setLivingBin] = useState<any[]>([]);
  const [nonLivingBin, setNonLivingBin] = useState<any[]>([]);
  const [gameMessage, setGameMessage] = useState('Look at each picture card, decide if it is LIVING or NON-LIVING, and place it under the correct beehive!');
  const [isWon, setIsWon] = useState(false);

  // دالة فرز الكرت عند النقر واختيار الخلية المناسبة
  const handleSort = (card: any, targetType: string) => {
    if (isWon) return;

    // إزالة الكرت من القائمة الرئيسية
    setCards(prev => prev.filter(c => c.id !== card.id));

    if (targetType === 'living') {
      setLivingBin(prev => [...prev, card]);
    } else {
      setNonLivingBin(prev => [...prev, card]);
    }

    // التحقق هل الاختيار صحيح أم خاطئ
    if (card.type === targetType) {
      setGameMessage(`Great job! ${card.name} is correctly sorted! ✨`);
    } else {
      setGameMessage(`Oops! ${card.name} belongs to the other hive, but keep going! 🐝`);
    }
  };

  // التحقق من انتهاء جميع الكروت
  useEffect(() => {
    if (cards.length === 0 && (livingBin.length > 0 || nonLivingBin.length > 0)) {
      setIsWon(true);
      setGameMessage('🎉 Amazing! All cards are sorted perfectly into Living and Non-living hives!');
    }
  }, [cards, livingBin, nonLivingBin]);

  const resetGame = () => {
    setCards(INITIAL_CARDS);
    setLivingBin([]);
    setNonLivingBin([]);
    setIsWon(false);
    setGameMessage('Look at each picture card, decide if it is LIVING or NON-LIVING, and place it under the correct beehive![cite: 39]');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-amber-50 to-emerald-50 p-6 md:p-12 flex flex-col items-center">
      {/* زر العودة */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <button 
          onClick={onBackToGames}
          className="px-5 py-2.5 rounded-2xl bg-white shadow-md text-gray-700 font-bold hover:bg-gray-100 transition-all border border-amber-200 cursor-pointer flex items-center gap-2 translate-y-16 lg:translate-x-[-12rem]"
        >
          ← Back to Games Hub
        </button>
        <div className="font-bold text-amber-900 bg-white/80 px-4 py-2 rounded-2xl shadow-sm border border-amber-200 translate-y-16 lg:translate-x-[11rem]">
          🃏 Remaining Cards: {cards.length}
        </div>
      </div>

      {/* رأس اللعبة مطابق للـ PDF */}
      <div className="text-center space-y-2 mb-6">
        <span className="text-5xl inline-block animate-bounce">🍯</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-amber-900">
          Honeycomb Sort
        </h1>
        <p className="text-amber-800 font-bold text-lg">
          Sort the cards into: <span className="text-emerald-700">Living</span> / <span className="text-rose-600">Non-living</span>[cite: 39]
        </p>
      </div>

      {/* لوحة الرسائل */}
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-md border border-amber-200 text-center mb-8">
        <p className="text-amber-900 font-semibold text-sm md:text-base">
          {gameMessage}
        </p>
      </div>

      {/* خليتي النحل (الأساسيتين للتصنيف: LIVING و NON-LIVING) */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* خلية Living */}
        <div className="bg-emerald-50 border-3 border-emerald-400 rounded-3xl p-6 shadow-xl flex flex-col items-center min-h-[240px] relative">
          <div className="bg-emerald-600 text-white font-extrabold px-6 py-1.5 rounded-full shadow-md mb-3 tracking-wider text-sm">
            LIVING 🌿
          </div>
          <div className="text-5xl mb-2">🏡</div>
          
          {/* منطقة وضع الكروت الخاصة بالكائنات الحية */}
          <div className="flex flex-wrap gap-2 justify-center w-full mt-2">
            {livingBin.map(card => (
              <div key={card.id} className="bg-white px-3 py-1.5 rounded-xl border border-emerald-300 shadow-sm flex items-center gap-1.5 text-xs font-bold text-emerald-900 animate-fade-in">
                <span>{card.icon}</span>
                <span>{card.name}</span>
              </div>
            ))}
            {livingBin.length === 0 && <span className="text-emerald-700/50 text-xs italic mt-4">Place living cards here</span>}
          </div>

          {/* زر التفاعل المباشر لو فيه كروت متبقية للإرسال هنا */}
          {cards.length > 0 && (
            <div className="absolute bottom-3 w-full px-6 flex justify-center">
              <select 
                onChange={(e) => {
                  if (e.target.value) {
                    const card = cards.find(c => c.id === Number(e.target.value));
                    if (card) handleSort(card, 'living');
                    e.target.value = '';
                  }
                }}
                defaultValue=""
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-xl shadow cursor-pointer outline-none w-full max-w-[200px]"
              >
                <option value="" disabled>+ Sort card to Living</option>
                {cards.map(c => (
                  <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* خلية Non-living */}
        <div className="bg-rose-50 border-3 border-rose-400 rounded-3xl p-6 shadow-xl flex flex-col items-center min-h-[240px] relative">
          <div className="bg-rose-600 text-white font-extrabold px-6 py-1.5 rounded-full shadow-md mb-3 tracking-wider text-sm">
            NON-LIVING 🪨
          </div>
          <div className="text-5xl mb-2">🏡</div>

          {/* منطقة وضع الكروت الخاصة بالكائنات غير الحية */}
          <div className="flex flex-wrap gap-2 justify-center w-full mt-2">
            {nonLivingBin.map(card => (
              <div key={card.id} className="bg-white px-3 py-1.5 rounded-xl border border-rose-300 shadow-sm flex items-center gap-1.5 text-xs font-bold text-rose-900 animate-fade-in">
                <span>{card.icon}</span>
                <span>{card.name}</span>
              </div>
            ))}
            {nonLivingBin.length === 0 && <span className="text-rose-700/50 text-xs italic mt-4">Place non-living cards here</span>}
          </div>

          {/* زر التفاعل المباشر لإرسال الكرت هنا */}
          {cards.length > 0 && (
            <div className="absolute bottom-3 w-full px-6 flex justify-center">
              <select 
                onChange={(e) => {
                  if (e.target.value) {
                    const card = cards.find(c => c.id === Number(e.target.value));
                    if (card) handleSort(card, 'non-living');
                    e.target.value = '';
                  }
                }}
                defaultValue=""
                className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-2 rounded-xl shadow cursor-pointer outline-none w-full max-w-[200px]"
              >
                <option value="" disabled>+ Sort card to Non-living</option>
                {cards.map(c => (
                  <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* لوحة الكروت المتاحة للقص واللعب (مطابقة للـ PDF تماماً) */}
      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border-2 border-amber-200 mb-8">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 text-center">
          Cut out the cards and play! (Click any card to auto-sort)[cite: 39]
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {cards.map(card => (
            <div
              key={card.id}
              onClick={() => {
                // افتراضيًا بنحدد التصنيف الصح بناءً على نوع الكرت عند النقر المباشر عليه
                handleSort(card, card.type);
              }}
              className="bg-amber-50 hover:bg-amber-100 border-2 border-dashed border-amber-300 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all transform hover:scale-105 shadow-sm group"
            >
              <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">{card.icon}</span>
              <span className="text-xs font-bold text-amber-900">{card.name}</span>
            </div>
          ))}
          {cards.length === 0 && (
            <div className="col-span-full text-center py-4 text-emerald-700 font-extrabold text-base">
              ✨ All cards have been sorted successfully! Great job!
            </div>
          )}
        </div>
      </div>

      {/* زر إعادة اللعب */}
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