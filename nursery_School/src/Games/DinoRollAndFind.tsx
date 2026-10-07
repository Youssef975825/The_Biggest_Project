import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface DinoRollAndFindProps {
  onBackToGames: () => void;
}

// قائمة العناصر أو الديناصورات التي يتم البحث عنها بعد رمي النرد
const boardItems = [
  { id: 1, name: 'T-Rex', icon: '🦖', desc: 'الديناصور العملاق الودود' },
  { id: 2, name: 'Stegosaurus', icon: '🦕', desc: 'صاحب الألواح الظهرية' },
  { id: 3, name: 'Dino Egg', icon: '🥚', desc: 'بيضة الديناصور المفاجئة' },
  { id: 4, name: 'Volcano', icon: '🌋', desc: 'البركان المشتعل في الغابة' },
  { id: 5, name: 'Footprint', icon: '🐾', desc: 'أثر قدم الديناصور الكبير' },
  { id: 6, name: 'Jungle Leaves', icon: '🌿', desc: 'أوراق الشجر الكثيفة' },
];

export default function DinoRollAndFind({ onBackToGames }: DinoRollAndFindProps) {
  const [diceNumber, setDiceNumber] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [targetItem, setTargetItem] = useState<(typeof boardItems[0]) | null>(null);
  const [foundItems, setFoundItems] = useState<number[]>([]);
  const [message, setMessage] = useState<string>('اضغط على زر رمي النرد لبدء التحدي!');

  // دالة رمي النرد العشوائي (من 1 إلى 6)
  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    setDiceNumber(null);
    setMessage('جاري رمي النرد... 🎲');

    // تأثير حركة تخيُّلية لرمي النرد
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

        // اختيار عنصر بناءً على رقم النرد (من 1 إلى 6)
        const selected = boardItems[finalDice - 1];
        setTargetItem(selected);
        setMessage(`رائع! لقد ظهر الرقم ${finalDice}. ابحث في اللوحة عن: ${selected.name} (${selected.icon}) واضغط عليه!`);
      }
    }, 80);
  };

  // التحقق عند الضغط على عنصر في اللوحة
  const handleItemClick = (item: typeof boardItems[0]) => {
    if (!targetItem) {
      alert('الرجاء رمي النرد أولاً لتحديد الهدف المطلوب!');
      return;
    }

    if (item.id === targetItem.id) {
      if (!foundItems.includes(item.id)) {
        const updatedFound = [...foundItems, item.id];
        setFoundItems(updatedFound);
        setMessage(`🎉 أحسنت يا بطل! لقد وجدت "${item.name}" بنجاح.`);

        // التحقق إذا وجد كل العناصر الـ 6
        if (updatedFound.length === boardItems.length) {
          try {
            confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
          } catch (e) {
            // تجاهل
          }
          setMessage('🏆 مبروك! لقد أكملت مغامرة البحث عن جميع ديناصورات وعناصر الغابة بنجاح!');
        } else {
          setTargetItem(null); // اطلب رمية جديدة
        }
      } else {
        setMessage('لقد وجدت هذا العنصر مسبقاً! اضغط رمي النرد للبحث عن عنصر جديد.');
      }
    } else {
      setMessage(`❌ ليس هذا هو المطلوب! ابحث عن: ${targetItem.name} (${targetItem.icon})`);
    }
  };

  const resetGame = () => {
    setDiceNumber(null);
    setTargetItem(null);
    setFoundItems([]);
    setMessage('اضغط على زر رمي النرد لبدء التحدي من جديد!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-cyan-50 to-blue-50 p-6 md:p-12 flex flex-col items-center">
      {/* زر العودة */}
      <div className="w-full max-w-4xl flex justify-start mb-6">
        <button
          onClick={onBackToGames}
          className="px-5 py-2.5 rounded-2xl bg-white shadow-md text-gray-700 font-bold hover:bg-gray-100 transition-all border border-teal-200 cursor-pointer flex items-center gap-2 translate-y-17 lg:translate-x-[-12rem]"
        >
          ← Back to Dino Games
        </button>
      </div>

      {/* العنوان */}
      <div className="text-center space-y-2 mb-6">
        <span className="text-5xl">🎲</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-teal-950">
          Roll & Find Dino
        </h1>
        <p className="text-gray-600 font-medium">
          ألقِ النرد، اتبع الإرشادات، واكتشف عناصر وعوالم الديناصورات في الغابة!
        </p>
      </div>

      {/* لوحة التحكم (النرد والرسائل) */}
      <div className="bg-white/95 backdrop-blur-md border border-teal-200 rounded-3xl p-6 shadow-xl max-w-md w-full text-center mb-8 space-y-4">
        <div className="text-xl font-bold text-teal-900 min-h-[3rem] flex items-center justify-center px-2">
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
            {isRolling ? 'جاري الرمي...' : 'رمي النرد 🎲'}
          </button>
        </div>
      </div>

      {/* شبكة اللوحة (Board Grid) */}
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
                  ? 'bg-emerald-100 border-emerald-400 opacity-60 scale-95'
                  : isCurrentTarget
                  ? 'bg-amber-100 border-amber-400 ring-4 ring-amber-300 animate-bounce'
                  : 'bg-white border-teal-200 hover:border-teal-400 hover:-translate-y-1'
              }`}
            >
              {isFound && (
                <span className="absolute top-3 right-3 bg-emerald-500 text-white text-xs px-2.5 py-1 rounded-full font-bold">
                  تم العثور عليها ✓
                </span>
              )}
              <span className="text-6xl mb-3">{item.icon}</span>
              <h3 className="text-lg font-extrabold text-teal-950 mb-1">{item.name}</h3>
              <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* زر إعادة اللعب إذا اكتملت اللعبة */}
      {foundItems.length === boardItems.length && (
        <button
          onClick={resetGame}
          className="px-8 py-3 bg-teal-600 hover:bg-teal-500 text-white font-extrabold rounded-2xl shadow-xl transition-all cursor-pointer"
        >
          العب مرة أخرى 🔄
        </button>
      )}
    </div>
  );
}