import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface DinoFeedProps {
  onBackToGames: () => void;
}

// قائمة الأطعمة (بعضها يناسب الديناصور وبعضها خطأ أو غير مناسب)
const foodItemsData = [
  { id: 1, name: 'أوراق شجر طازجة', icon: '🌿', isGood: true, message: 'يامم! هذه أوراق الشجر المفضلة للديناصور!' },
  { id: 2, name: 'عظمة ديناصور', icon: '🦴', isGood: true, message: 'ممتاز! الديناصور يعشق قضم العظام المقرمشة!' },
  { id: 3, name: 'ثمرة تفاح أحمر', icon: '🍎', isGood: true, message: 'لذيذ! وجبة خفيفة ومفيدة للديناصور الصغير.' },
  { id: 4, name: 'لحم مشوي', icon: '🥩', isGood: true, message: 'رائع! الديناصورات المفترسة تحب الوجبات الشهية.' },
  { id: 5, name: 'علبة بلاستيك', icon: '🥤', isGood: false, message: 'خطأ! هذه ليست طعاماً ولا ينفع أن يأكلها الديناصور!' },
  { id: 6, name: 'حجر صلب', icon: '🪨', isGood: false, message: 'أهلاً! هذا حجر وليس طعاماً، سيؤذي أسنانه!' },
];

export default function DinoFeed({ onBackToGames }: DinoFeedProps) {
  const [score, setScore] = useState(0);
  const [currentFoodIndex, setCurrentFoodIndex] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('اختر هل يناسب هذا الطعام ديناصورنا اللطيف أم لا؟');
  const [isGameOver, setIsGameOver] = useState(false);
  const [dinoMood, setDinoMood] = useState<'happy' | 'hungry' | 'sad'>('hungry');

  const currentFood = foodItemsData[currentFoodIndex];

  // التعامل مع اختيار اللاعب (هل يريد إطعامها أم رفضها؟)
  const handleChoice = (feedTheDino: boolean) => {
    const isCorrect = feedTheDino === currentFood.isGood;

    if (isCorrect) {
      setScore((prev) => prev + 10);
      setFeedbackMessage(currentFood.message);
      setDinoMood('happy');
    } else {
      setFeedbackMessage('عذراً! اختيار غير دقيق، حاول في العنصر التالي.');
      setDinoMood('sad');
    }

    // الانتقال للعنصر التالي بعد ثغرة زمنية بسيطة
    setTimeout(() => {
      if (currentFoodIndex + 1 < foodItemsData.length) {
        setCurrentFoodIndex((prev) => prev + 1);
        setDinoMood('hungry');
        setFeedbackMessage('ما رأيك في الطعام القادم؟');
      } else {
        setIsGameOver(true);
        setFeedbackMessage('🎉 لقد أنهيت تحدي إطعام الديناصور بنجاح!');
        try {
          confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        } catch (e) {
          // تجاهل
        }
      }
    }, 1500);
  };

  const restartGame = () => {
    setScore(0);
    setCurrentFoodIndex(0);
    setIsGameOver(false);
    setDinoMood('hungry');
    setFeedbackMessage('اختر هل يناسب هذا الطعام ديناصورنا اللطيف أم لا؟');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-cyan-50 to-blue-50 p-6 md:p-12 flex flex-col items-center">
      {/* زر العودة */}
      <div className="w-full max-w-2xl flex justify-start mb-6">
        <button
          onClick={onBackToGames}
          className="px-5 py-2.5 rounded-2xl bg-white shadow-md text-gray-700 font-bold hover:bg-gray-100 transition-all border border-teal-200 cursor-pointer flex items-center gap-2 translate-y-17 lg:translate-x-[-19rem]"
        >
          ← Back to Dino Games
        </button>
      </div>

      {/* عنوان اللعبة */}
      <div className="text-center space-y-2 mb-6">
        <span className="text-5xl">🍖</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-teal-950">
          Feed The Dino
        </h1>
        <p className="text-gray-600 font-medium">
          ساعد الديناصور في اختيار الأطعمة المفيدة والصحيحة وتجنب الأشياء الضارة!
        </p>
      </div>

      {!isGameOver ? (
        <div className="bg-white/95 backdrop-blur-md border border-teal-200 rounded-3xl p-8 shadow-xl max-w-lg w-full flex flex-col items-center text-center space-y-6">
          {/* إحصائيات النقاط */}
          <div className="w-full flex justify-between items-center text-sm font-bold text-teal-900 bg-teal-50 px-4 py-2 rounded-xl">
            <span>السؤال: {currentFoodIndex + 1} / {foodItemsData.length}</span>
            <span>النقاط: {score} 🌟</span>
          </div>

          {/* شخصية الديناصور وحالته المزاجية */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-teal-500 to-cyan-500 flex items-center justify-center text-7xl shadow-lg animate-pulse">
              {dinoMood === 'happy' ? '🦖✨' : dinoMood === 'sad' ? '🦖💧' : '🦖'}
            </div>
            <span className="absolute -bottom-2 bg-white text-teal-800 border border-teal-200 px-3 py-1 rounded-full text-xs font-bold shadow-md">
              {dinoMood === 'happy' ? 'شبعان وفرحان!' : dinoMood === 'sad' ? 'أعتقد أن هذا لا يناسبني' : 'جائع جداً!'}
            </span>
          </div>

          {/* عنصر الطعام الحالي */}
          <div className="bg-teal-50/70 border-2 border-dashed border-teal-300 rounded-2xl p-6 w-full flex flex-col items-center space-y-2">
            <span className="text-7xl mb-1">{currentFood.icon}</span>
            <h3 className="text-xl font-extrabold text-teal-950">{currentFood.name}</h3>
          </div>

          {/* رسالة التوجيه */}
          <p className="text-gray-700 font-semibold min-h-[2.5rem] flex items-center justify-center">
            {feedbackMessage}
          </p>

          {/* أزرار القرار (إطعام أو رفض) */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <button
              onClick={() => handleChoice(true)}
              className="py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>أطعم الديناصور</span> 🍽️
            </button>
            <button
              onClick={() => handleChoice(false)}
              className="py-3.5 bg-rose-500 hover:bg-rose-400 text-white font-extrabold rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>ارفض الطعام</span> ❌
            </button>
          </div>
        </div>
      ) : (
        /* شاشة الفوز النهائية */
        <div className="bg-white/95 backdrop-blur-md border border-teal-300 rounded-3xl p-8 shadow-xl max-w-md w-full text-center space-y-4 animate-bounce">
          <span className="text-6xl">🏆</span>
          <h2 className="text-2xl font-extrabold text-teal-900">أنت رائع يا بطل!</h2>
          <p className="text-gray-600 font-medium">لقد أتممت إطعام الديناصور بنجاح وحصلت على مجموع نقاط: <span className="text-teal-700 font-bold">{score} نقطة</span></p>
          <button
            onClick={restartGame}
            className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-extrabold rounded-2xl shadow-md transition-all cursor-pointer"
          >
            العب مرة أخرى 🔄
          </button>
        </div>
      )}
    </div>
  );
}