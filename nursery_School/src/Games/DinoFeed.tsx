import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface DinoFeedProps {
  onBackToGames: () => void;
}

const foodItemsData = [
  { id: 1, name: 'Fresh Leaves', icon: '🌿', isGood: true, message: 'Yum! Fresh leaves are a dino favorite!' },
  { id: 2, name: 'Dino Bone', icon: '🦴', isGood: true, message: 'Excellent! Dinos love crunching on bones!' },
  { id: 3, name: 'Red Apple', icon: '🍎', isGood: true, message: 'Delicious! A healthy snack for a little dino.' },
  { id: 4, name: 'Grilled Meat', icon: '🥩', isGood: true, message: 'Great! Meat-eating dinos love a tasty meal.' },
  { id: 5, name: 'Plastic Cup', icon: '🥤', isGood: false, message: 'Oops! That is not food, and a dino should never eat it!' },
  { id: 6, name: 'Hard Rock', icon: '🪨', isGood: false, message: 'Whoops! That is a rock, not food. It would hurt its teeth!' },
];

export default function DinoFeed({ onBackToGames }: DinoFeedProps) {
  const [score, setScore] = useState(0);
  const [currentFoodIndex, setCurrentFoodIndex] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('Is this food good for our friendly dino?');
  const [isGameOver, setIsGameOver] = useState(false);
  const [dinoMood, setDinoMood] = useState<'happy' | 'hungry' | 'sad'>('hungry');

  const currentFood = foodItemsData[currentFoodIndex];

  const handleChoice = (feedTheDino: boolean) => {
    const isCorrect = feedTheDino === currentFood.isGood;

    if (isCorrect) {
      setScore((prev) => prev + 10);
      setFeedbackMessage(currentFood.message);
      setDinoMood('happy');
    } else {
      setFeedbackMessage('Not quite! Try again with the next item.');
      setDinoMood('sad');
    }

    setTimeout(() => {
      if (currentFoodIndex + 1 < foodItemsData.length) {
        setCurrentFoodIndex((prev) => prev + 1);
        setDinoMood('hungry');
        setFeedbackMessage('What about the next food?');
      } else {
        setIsGameOver(true);
        setFeedbackMessage('🎉 You finished the Feed the Dino challenge!');
        try {
          confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        } catch {
          /* confetti is decorative; ignore failures */
        }
      }
    }, 1500);
  };

  const restartGame = () => {
    setScore(0);
    setCurrentFoodIndex(0);
    setIsGameOver(false);
    setDinoMood('hungry');
    setFeedbackMessage('Is this food good for our friendly dino?');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-6 md:p-12 flex flex-col items-center transition-colors duration-300">
      {/* Back button */}
      <div className="w-full max-w-2xl flex justify-start mb-6">
        <button
          onClick={onBackToGames}
          className="px-5 py-2.5 rounded-2xl bg-white dark:bg-gray-900 shadow-md text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all border border-teal-200 dark:border-teal-900/50 cursor-pointer flex items-center gap-2"
        >
          ← Back to Dino Games
        </button>
      </div>

      {/* Game title */}
      <div className="text-center space-y-2 mb-6">
        <span className="text-5xl">🍖</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-teal-950 dark:text-teal-300">
          Feed The Dino
        </h1>
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          Help the dino choose healthy foods and avoid harmful things!
        </p>
      </div>

      {!isGameOver ? (
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-teal-200 dark:border-teal-900/50 rounded-3xl p-8 shadow-xl max-w-lg w-full flex flex-col items-center text-center space-y-6">
          <div className="w-full flex justify-between items-center text-sm font-bold text-teal-900 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-4 py-2 rounded-xl">
            <span>Question: {currentFoodIndex + 1} / {foodItemsData.length}</span>
            <span>Score: {score} 🌟</span>
          </div>

          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-teal-500 to-cyan-500 flex items-center justify-center text-7xl shadow-lg animate-pulse">
              {dinoMood === 'happy' ? '🦖✨' : dinoMood === 'sad' ? '🦖💧' : '🦖'}
            </div>
            <span className="absolute -bottom-2 bg-white dark:bg-gray-800 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-700 px-3 py-1 rounded-full text-xs font-bold shadow-md">
              {dinoMood === 'happy' ? 'Full and happy!' : dinoMood === 'sad' ? 'I do not think this is for me' : 'So hungry!'}
            </span>
          </div>

          <div className="bg-teal-50/70 dark:bg-gray-800/60 border-2 border-dashed border-teal-300 dark:border-teal-700 rounded-2xl p-6 w-full flex flex-col items-center space-y-2">
            <span className="text-7xl mb-1">{currentFood.icon}</span>
            <h3 className="text-xl font-extrabold text-teal-950 dark:text-white">{currentFood.name}</h3>
          </div>

          <p className="text-gray-700 dark:text-gray-300 font-semibold min-h-[2.5rem] flex items-center justify-center">
            {feedbackMessage}
          </p>

          <div className="grid grid-cols-2 gap-4 w-full">
            <button
              onClick={() => handleChoice(true)}
              className="py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Feed the Dino</span> 🍽️
            </button>
            <button
              onClick={() => handleChoice(false)}
              className="py-3.5 bg-rose-500 hover:bg-rose-400 text-white font-extrabold rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Refuse the Food</span> ❌
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-teal-300 dark:border-teal-800 rounded-3xl p-8 shadow-xl max-w-md w-full text-center space-y-4 animate-bounce">
          <span className="text-6xl">🏆</span>
          <h2 className="text-2xl font-extrabold text-teal-900 dark:text-teal-300">You are awesome, champ!</h2>
          <p className="text-gray-600 dark:text-gray-300 font-medium">You finished feeding the dino and scored: <span className="text-teal-700 dark:text-teal-400 font-bold">{score} points</span></p>
          <button
            onClick={restartGame}
            className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-extrabold rounded-2xl shadow-md transition-all cursor-pointer"
          >
            Play Again 🔄
          </button>
        </div>
      )}
    </div>
  );
}