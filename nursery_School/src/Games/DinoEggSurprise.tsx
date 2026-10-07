import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface DinoEggSurpriseProps {
  onBackToGames: () => void;
}

// محطات المسار الدائري الـ 12 المطابقة للوحة اللعبة
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

// محتويات الـ 12 بيضة
const eggSurprises = [
  { id: 1, type: 'move', value: 2, text: '🎉 مفاجأة! تقدم خطوتين للأمام!' },
  { id: 2, type: 'action', value: 0, text: '🦖 صرخة الديناصور! اقفز مكانك من الفرحة!' },
  { id: 3, type: 'move', value: 1, text: '🌟 بيضة محظوظة! تقدم خطوة إضافية.' },
  { id: 4, type: 'back', value: -1, text: '⚠️ عاصفة خفيفة! ارجع خطوة للوراء.' },
  { id: 5, type: 'move', value: 3, text: '🚀 واو! قفزة عملاقة، تقدم 3 خطوات!' },
  { id: 6, type: 'action', value: 0, text: '🎨 اقلد صوت ديناصور صغير!' },
  { id: 7, type: 'move', value: 2, text: '🥚 بيضة ذهبية! تقدم خطوتين.' },
  { id: 8, type: 'back', value: -2, text: '🍃 احتكاك بالأشجار، ارجع خطوتين.' },
  { id: 9, type: 'move', value: 1, text: '✨ خطوة موفقة للأمام!' },
  { id: 10, type: 'action', value: 0, text: '🦕 رقصة الديناصور السعيدة!' },
  { id: 11, type: 'move', value: 2, text: '🔥 سرعة البرق، تقدم خطوتين!' },
  { id: 12, type: 'move', value: 1, text: '🏆 خطوة قريبة من خط النهاية!' },
];

export default function DinoEggSurprise({ onBackToGames }: DinoEggSurpriseProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [openedEggs, setOpenedEggs] = useState<number[]>([]);
  const [currentMessage, setCurrentMessage] = useState('اختر بيضة من الـ 12 بيضة لاكتشاف المفاجأة وتحريك الديناصور!');
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

    // التحقق هل وصل الديناصور للنهاية
    if (newIndex === boardSteps.length - 1) {
      setIsGameOver(true);
      setCurrentMessage('🏆 مبروك يا بطل! وصل الديناصور إلى خط النهاية بنجاح تام!');
      try {
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
      } catch (e) {}
    } 
    // التحقق مما إذا نفدت جميع البيضات ولم يصل للنهاية بعد
    else if (newOpenedEggs.length === eggSurprises.length) {
      setIsGameOver(true);
      setCurrentMessage('⚠️ نفدت جميع البيضات ولم تبلغ خط النهاية بعد! حاول مرة أخرى لتصل للنهاية.');
    } else {
      setCurrentMessage(surprise.text);
    }
  };

  const resetGame = () => {
    setCurrentStepIndex(0);
    setOpenedEggs([]);
    setIsGameOver(false);
    setActiveSurprise(null);
    setCurrentMessage('اختر بيضة من الـ 12 بيضة لاكتشاف المفاجأة وتحريك الديناصور!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-50 p-4 md:p-8 flex flex-col items-center">
      {/* زر العودة */}
      <div className="w-full max-w-4xl flex justify-start mb-4">
        <button
          onClick={onBackToGames}
          className="px-4 py-2 rounded-2xl bg-white shadow-md text-gray-700 font-bold hover:bg-gray-100 transition-all border border-amber-200 cursor-pointer flex items-center gap-2 text-sm translate-y-18 lg:translate-x-[-12rem]"
        >
          ← Back to Dino Games
        </button>
      </div>

      {/* عنوان اللعبة */}
      <div className="text-center space-y-1 mb-4">
        <span className="text-4xl">🥚</span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-amber-950">
          Dino Egg Surprise Game
        </h1>
        <p className="text-gray-600 text-xs md:text-sm font-medium">
          Story 1 - Dino's Big Surprise: افتح البيضات وساعد الديناصور للوصول للنهاية!
        </p>
      </div>

      {/* تخطيط متجاوب يجمع اللوحة والبيض بطريقة مريحة للعين */}
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
        
        {/* لوحة المسار المرئي (تأخذ مساحة مناسبة) */}
        <div className="md:col-span-6 bg-white/95 backdrop-blur-md border border-amber-200 rounded-3xl p-4 shadow-xl flex flex-col items-center space-y-4">
          <div className="w-full flex items-center justify-between bg-amber-100/80 p-2.5 rounded-2xl border border-amber-300">
            <span className="text-sm font-extrabold text-amber-900">🗺️ لوحة المسار</span>
            <span className="text-xs font-bold bg-amber-700 text-white px-2.5 py-0.5 rounded-full">
              المحطة: {boardSteps[currentStepIndex].name}
            </span>
          </div>

          <div className="relative w-full h-56 bg-amber-50/70 border-2 border-dashed border-amber-300 rounded-2xl flex items-center justify-center p-2">
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
                      : 'bg-white text-amber-900 border border-amber-200'
                  }`}
                >
                  {isCurrent ? <span className="text-sm">🦖</span> : <span>{step.name}</span>}
                </div>
              );
            })}
          </div>

          {activeSurprise && (
            <div className="w-full bg-orange-50 border border-orange-200 text-orange-900 font-extrabold text-center p-2 rounded-xl text-xs animate-pulse">
              {activeSurprise}
            </div>
          )}

          <div className="text-amber-900 font-bold text-center px-3 py-1.5 bg-amber-50 rounded-xl w-full text-xs">
            {currentMessage}
          </div>
        </div>

        {/* لوحة البيضات التفاعلية */}
        <div className="md:col-span-6 bg-white/95 backdrop-blur-md border border-amber-200 rounded-3xl p-4 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-center font-extrabold text-amber-950 text-sm mb-3">
              اختر بيضة من الـ 12 بيضة[cite: 3]:
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
                          ? 'bg-gray-200 text-gray-400 opacity-50 cursor-not-allowed'
                          : 'bg-amber-700 hover:bg-amber-600 text-white hover:-translate-y-1 cursor-pointer'
                      }`}
                    >
                      <span className="text-2xl">🥚</span>
                      <span className="text-[10px]">بيضة #{egg.id}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* شاشة الفوز أو نفاد البيض */
              <div className="text-center space-y-3 py-6">
                <span className="text-5xl">🎉</span>
                <h2 className="text-lg font-extrabold text-amber-900">انتهت المحاولة!</h2>
                <p className="text-gray-600 text-xs font-medium px-4">
                  {currentStepIndex === boardSteps.length - 1
                    ? 'لقد وصلت إلى خط النهاية بنجاح تام!'
                    : 'نفدت البيضات قبل الوصول للنهاية. حاول مرة أخرى لتنجح!'}
                </p>
                <button
                  onClick={resetGame}
                  className="w-full py-2.5 bg-amber-700 hover:bg-amber-600 text-white font-extrabold rounded-xl shadow-md transition-all cursor-pointer text-xs"
                >
                  العب مرة أخرى 🔄
                </button>
              </div>
            )}
          </div>

          <div className="text-center text-[11px] text-gray-400 mt-3">
            البيضات المفتوحة: {openedEggs.length} / 12
          </div>
        </div>

      </div>
    </div>
  );
}