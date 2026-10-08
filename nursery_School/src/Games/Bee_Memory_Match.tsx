import React, { useState, useEffect } from 'react';

interface Card {
  id: number;
  icon: string;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const initialCards = [
  { icon: '🐝', name: 'bee' },
  { icon: '🌸', name: 'flower' },
  { icon: '🍯', name: 'honey' },
  { icon: '🏡', name: 'hive' },
  { icon: '☀️', name: 'sunny' },
  { icon: '🦋', name: 'butterfly' },
];

interface BeeMemoryMatchProps {
  onBackToGames: () => void;
}

export default function Bee_Memory_Match({ onBackToGames }: BeeMemoryMatchProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [firstSelection, setFirstSelection] = useState<Card | null>(null);
  const [secondSelection, setSecondSelection] = useState<Card | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isWon, setIsWon] = useState(false);

  // خوارزمية خلط حقيقية وعشوائية بالكامل (Fisher-Yates Shuffle)
  const shuffleArray = (array: any[]) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const initializeGame = () => {
    const duplicatedCards = [...initialCards, ...initialCards].map((card, index) => ({
      ...card,
      id: index,
      isFlipped: false,
      isMatched: false,
    }));

    // خلط الكروت باستخدام الخوارزمية الحقيقية لضمان تغير الأاماكن كلياً
    const randomizedCards = shuffleArray(duplicatedCards);

    setCards(randomizedCards);
    setFirstSelection(null);
    setSecondSelection(null);
    setMoves(0);
    setMatches(0);
    setIsWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (clickedCard: Card) => {
    if (isEvaluating || clickedCard.isFlipped || clickedCard.isMatched) return;

    setCards(prev =>
      prev.map(card => (card.id === clickedCard.id ? { ...card, isFlipped: true } : card))
    );

    if (!firstSelection) {
      setFirstSelection(clickedCard);
    } else {
      setSecondSelection(clickedCard);
      setIsEvaluating(true);
      setMoves(prev => prev + 1);

      if (firstSelection.name === clickedCard.name) {
        setCards(prev =>
          prev.map(card =>
            card.name === firstSelection.name ? { ...card, isMatched: true } : card
          )
        );
        setMatches(prev => {
          const newMatches = prev + 1;
          if (newMatches === initialCards.length) {
            setIsWon(true);
          }
          return newMatches;
        });
        resetTurn();
      } else {
        setTimeout(() => {
          setCards(prev =>
            prev.map(card =>
              card.id === firstSelection.id || card.id === clickedCard.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          resetTurn();
        }, 1000);
      }
    }
  };

  const resetTurn = () => {
    setFirstSelection(null);
    setSecondSelection(null);
    setIsEvaluating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-amber-50 to-emerald-50 p-6 md:p-12 flex flex-col items-center">
      {/* زر العودة لقائمة الألعاب */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-6">
        <button 
          onClick={onBackToGames}
          className="px-5 py-2.5 rounded-2xl bg-white shadow-md text-gray-700 font-bold hover:bg-gray-100 transition-all border border-amber-200 cursor-pointer flex items-center gap-2 translate-y-17 translate-x-[-19rem]"
        >
          ← Back to Games Hub
        </button>
        <div className="flex gap-4 font-bold text-amber-900 bg-white/80 px-4 py-2 rounded-2xl shadow-sm border border-amber-200 translate-y-17 translate-x-[19rem]">
          <span>🔄 Moves: {moves}</span>
          <span>✨ Pairs: {matches} / {initialCards.length}</span>
        </div>
      </div>

      {/* عنوان اللعبة */}
      <div className="text-center space-y-2 mb-8">
        <span className="text-5xl inline-block">🐝</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-amber-900">
          Bee Memory Match
        </h1>
        <p className="text-gray-600 font-medium">
          Find the matching pairs! Turn cards and test your memory.
        </p>
      </div>

      {/* شبكة الكروت */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-xl w-full mb-8">
        {cards.map(card => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            className={`h-24 md:h-28 rounded-2xl flex items-center justify-center text-4xl md:text-5xl cursor-pointer shadow-md transition-all transform duration-300 select-none ${
              card.isFlipped || card.isMatched
                ? 'bg-white border-2 border-amber-400 rotate-0 scale-105'
                : 'bg-gradient-to-tr from-amber-400 to-yellow-300 hover:scale-105 border-2 border-amber-500 shadow-amber-200'
            }`}
          >
            {card.isFlipped || card.isMatched ? card.icon : '🌼'}
          </div>
        ))}
      </div>

      {/* نافذة الفوز */}
      {isWon && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-4 shadow-2xl border-4 border-amber-300 animate-bounce">
            <span className="text-6xl">🎉</span>
            <h2 className="text-3xl font-extrabold text-amber-900">You Won!</h2>
            <p className="text-gray-600 font-medium">
              Awesome job, little bee! You found all the matching pairs in {moves} moves.
            </p>
            <button
              onClick={initializeGame}
              className="w-full py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold shadow-lg transition-all cursor-pointer"
            >
              Play Again 🎮
            </button>
          </div>
        </div>
      )}

      {/* زر إعادة اللعبة */}
      {!isWon && (
        <button
          onClick={initializeGame}
          className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold shadow-md transition-all cursor-pointer"
        >
          Restart Game 🔄
        </button>
      )}
    </div>
  );
}