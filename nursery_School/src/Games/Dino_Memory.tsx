import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface Card {
  id: number;
  name: string;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const dinoCardsData = [
  { name: 'T-Rex', icon: '🦖' },
  { name: 'Stegosaurus', icon: '🦕' },
  { name: 'Dino Egg', icon: '🥚' },
  { name: 'Volcano', icon: '🌋' },
  { name: 'Footprint', icon: '🐾' },
];

interface DinoMemoryMatchProps {
  onBackToGames: () => void;
}

export default function DinoMemoryMatch({ onBackToGames }: DinoMemoryMatchProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [firstSelection, setFirstSelection] = useState<Card | null>(null);
  const [secondSelection, setSecondSelection] = useState<Card | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [moves, setMoves] = useState(0);
  const [matchesCount, setMatchesCount] = useState(0);

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
    const duplicatedCards = [...dinoCardsData, ...dinoCardsData]
    const randomizedCards = shuffleArray(duplicatedCards);

      const finalCards = randomizedCards.map((card, index) => ({
        ...card,
        id: index,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(finalCards);
    setFirstSelection(null);
    setSecondSelection(null);
    setMoves(0);
    setMatchesCount(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (clickedCard: Card) => {
    if (isChecking || clickedCard.isFlipped || clickedCard.isMatched) return;

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === clickedCard.id ? { ...card, isFlipped: true } : card
      )
    );

    if (!firstSelection) {
      setFirstSelection(clickedCard);
    } else {
      setSecondSelection(clickedCard);
      setIsChecking(true);
      setMoves((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (firstSelection && secondSelection) {
      if (firstSelection.name === secondSelection.name) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.name === firstSelection.name ? { ...card, isMatched: true } : card
          )
        );
        setMatchesCount((prev) => prev + 1);
        resetTurn();
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstSelection.id || card.id === secondSelection.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          resetTurn();
        }, 1000);
      }
    }
  }, [firstSelection, secondSelection]);

  const resetTurn = () => {
    setFirstSelection(null);
    setSecondSelection(null);
    setIsChecking(false);
  };

  useEffect(() => {
    if (matchesCount === dinoCardsData.length) {
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch (e) {
        // تجاهل لو المكتبة غير مشغلة
      }
    }
  }, [matchesCount]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-cyan-50 to-blue-50 p-6 md:p-12 flex flex-col items-center">
      {/* زر العودة */}
      <div className="w-full max-w-3xl flex justify-start mb-6">
        <button
          onClick={onBackToGames}
          className="px-5 py-2.5 rounded-2xl bg-white shadow-md text-gray-700 font-bold hover:bg-gray-100 transition-all border border-teal-200 cursor-pointer flex items-center gap-2 translate-y-17 lg:translate-x-[-16rem]"
        >
          ← Back to Dino Games
        </button>
      </div>

      {/* عنوان اللعبة والإحصائيات */}
      <div className="text-center space-y-2 mb-8">
        <span className="text-5xl">🧩</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-teal-950">
          Dino Memory Match
        </h1>
        <p className="text-gray-600 font-medium">
          Find the matching pairs by turning the cards over! Moves: <span className="text-teal-700 font-bold">{moves}</span>
        </p>
      </div>

      {/* شبكة البطاقات */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-3xl w-full mb-8">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            className={`h-32 rounded-2xl flex flex-col items-center justify-center cursor-pointer shadow-lg transition-all duration-300 transform select-none ${
              card.isFlipped || card.isMatched
                ? 'bg-white border-2 border-teal-400 text-5xl'
                : 'bg-gradient-to-tr from-teal-600 to-cyan-700 hover:from-teal-500 hover:to-cyan-600 text-white shadow-teal-900/20 border-2 border-teal-500'
            }`}
          >
            {card.isFlipped || card.isMatched ? (
              <span>{card.icon}</span>
            ) : (
              <div className="flex flex-col items-center space-y-1">
                {/* ظهر الكارت: أيقونة ديناصور مصغرة مع لمسة جمالية */}
                <span className="text-3xl animate-pulse">🦖</span>
                <span className="text-xs font-bold tracking-wider text-teal-100 uppercase opacity-80">Dino</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* شاشة الفوز وإعادة اللعب */}
      {matchesCount === dinoCardsData.length && (
        <div className="text-center bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-teal-300 animate-bounce mt-4 max-w-md w-full">
          <h2 className="text-2xl font-extrabold text-teal-900 mb-2">🎉 مبروك يا بطل!</h2>
          <p className="text-gray-600 mb-4">لقد أنهيت اللعبة في {moves} محاولة بنجاح!</p>
          <button
            onClick={initializeGame}
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer"
          >
            العب مرة أخرى 🔄
          </button>
        </div>
      )}
    </div>
  );
}