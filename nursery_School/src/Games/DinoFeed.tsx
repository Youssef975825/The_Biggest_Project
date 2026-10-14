import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface DinoFeedProps {
  onBackToGames: () => void;
}

// Food items (some suit the dino, some do not)
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

  // Handle the player's choice (feed or refuse?)
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

    // Move to the next item after a short delay
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
        } catch (e) {
          // ignore
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
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-cyan-50 to-blue-50 p-6 md:p-12 flex flex-col items-center">
      {/* Back button */}
      <div className="w-full max-w-2xl flex justify-start mb-6">
        <button
          onClick={onBackToGames}
          className="px-5 py-2.5 rounded-2xl bg-white shadow-md text-gray-700 font-bold hover:bg-gray-100 transition-all border border-teal-200 cursor-pointer flex items-center gap-2 translate-y-17 lg:translate-x-[-19rem]"
        >
          ← Back to Dino Games
        </button>
      </div>

      {/* Game title */}
      <div className="text-center space-y-2 mb-6">
        <span className="text-5xl">🍖</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-teal-950">
          Feed The Dino
        </h1>
        <p className="text-gray-600 font-medium">
          Help the dino choose healthy foods and avoid harmful things!
        </p>
      </div>

      {!isGameOver ? (
        <div className="bg-white/95 backdrop-blur-md border border-teal-200 rounded-3xl p-8 shadow-xl max-w-lg w-full flex flex-col items-center text-center space-y-6">
          {/* Score stats */}
          <div className="w-full flex justify-between items-center text-sm font-bold text-teal-900 bg-teal-50 px-4 py-2 rounded-xl">
            <span>Question: {currentFoodIndex + 1} / {foodItemsData.length}</span>
            <span>Score: {score} 🌟</span>
          </div>

          {/* Dino character and mood */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-teal-500 to-cyan-500 flex items-center justify-center text-7xl shadow-lg animate-pulse">
              {dinoMood === 'happy' ? '🦖✨' : dinoMood === 'sad' ? '🦖💧' : '🦖'}
            </div>
            <span className="absolute -bottom-2 bg-white text-teal-800 border border-teal-200 px-3 py-1 rounded-full text-xs font-bold shadow-md">
              {dinoMood === 'happy' ? 'Full and happy!' : dinoMood === 'sad' ? 'I do not think this is for me' : 'So hungry!'}
            </span>
          </div>

          {/* Current food item */}
          <div className="bg-teal-50/70 border-2 border-dashed border-teal-300 rounded-2xl p-6 w-full flex flex-col items-center space-y-2">
            <span className="text-7xl mb-1">{currentFood.icon}</span>
            <h3 className="text-xl font-extrabold text-teal-950">{currentFood.name}</h3>
          </div>

          {/* Guidance message */}
          <p className="text-gray-700 font-semibold min-h-[2.5rem] flex items-center justify-center">
            {feedbackMessage}
          </p>

          {/* Decision buttons (feed or refuse) */}
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
        /* Final win screen */
        <div className="bg-white/95 backdrop-blur-md border border-teal-300 rounded-3xl p-8 shadow-xl max-w-md w-full text-center space-y-4 animate-bounce">
          <span className="text-6xl">🏆</span>
          <h2 className="text-2xl font-extrabold text-teal-900">You are awesome, champ!</h2>
          <p className="text-gray-600 font-medium">You finished feeding the dino and scored: <span className="text-teal-700 font-bold">{score} points</span></p>
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