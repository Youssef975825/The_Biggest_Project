import { useState } from 'react';
import confetti from 'canvas-confetti';

interface DinoFootprintHuntProps {
  onBackToGames: () => void;
}

const colorOptions = [
  { id: 'brown', colorName: 'Brown Footprint', bg: 'bg-amber-700', cssColor: 'amber', icon: '🐾' },
  { id: 'green', colorName: 'Green Footprint', bg: 'bg-emerald-600', cssColor: 'emerald', icon: '🐾' },
  { id: 'purple', colorName: 'Purple Footprint', bg: 'bg-purple-600', cssColor: 'purple', icon: '🐾' },
  { id: 'red', colorName: 'Red Footprint', bg: 'bg-rose-600', cssColor: 'rose', icon: '🐾' },
];

interface PathNode {
  id: number;
  color: string;
  cssColor: string;
  footprint: string;
  name: string;
}

const START_MESSAGE = 'Pick the footprint that matches the required color to move forward!';

function buildPath(): PathNode[] {
  const pathLength = 10;
  const generatedPath: PathNode[] = [{ id: 1, color: 'bg-amber-700 text-white', cssColor: 'amber', footprint: '🐾', name: 'Start' }];

  for (let i = 2; i <= pathLength; i++) {
    const randomColorObj = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    if (i === pathLength) {
      generatedPath.push({
        id: i,
        color: 'bg-amber-700 text-white',
        cssColor: 'amber',
        footprint: '🏁',
        name: 'Finish',
      });
    } else {
      generatedPath.push({
        id: i,
        color: `${randomColorObj.bg} text-white`,
        cssColor: randomColorObj.cssColor,
        footprint: '🐾',
        name: randomColorObj.colorName,
      });
    }
  }

  return generatedPath;
}

export default function DinoFootprintHunt({ onBackToGames }: DinoFootprintHuntProps) {
  const [boardPath, setBoardPath] = useState<PathNode[]>(buildPath);
  const [currentStep, setCurrentStep] = useState(0); 
  const [message, setMessage] = useState(START_MESSAGE);
  const [isGameOver, setIsGameOver] = useState(false);

  const initializeGame = () => {
    setBoardPath(buildPath());
    setCurrentStep(0);
    setIsGameOver(false);
    setMessage(START_MESSAGE);
  };

  const handleCardSelect = (cardCssColor: string) => {
    if (isGameOver || boardPath.length === 0) return;

    const targetNode = boardPath[currentStep + 1];
    if (!targetNode) return;

    if (targetNode.cssColor === cardCssColor) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);

      if (nextStep === boardPath.length - 1) {
        setIsGameOver(true);
        setMessage('🏆 Congratulations, champ! The dino reached the finish line!');
        try {
          confetti({ particleCount: 130, spread: 80, origin: { y: 0.6 } });
        } catch {
          /* confetti is decorative; ignore failures */
        }
      } else {
        setMessage(`🎉 Excellent! The next step needs a new footprint color.`);
      }
    } else {
      setMessage(`❌ Sorry, that footprint does not match the required color. Try again!`);
    }
  };

  if (boardPath.length === 0) return null;

  const nextTargetNode = boardPath[currentStep + 1];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-6 md:p-12 flex flex-col items-center transition-colors duration-300">
      {/* Back button */}
      <div className="w-full max-w-4xl flex justify-start mb-6">
        <button
          onClick={onBackToGames}
          className="px-5 py-2.5 rounded-2xl bg-white dark:bg-gray-900 shadow-md text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all border border-teal-200 dark:border-teal-900/50 cursor-pointer flex items-center gap-2"
        >
          ← Back to Dino Games
        </button>
      </div>

      {/* Game title */}
      <div className="text-center space-y-2 mb-6">
        <span className="text-5xl">🐾</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-teal-950 dark:text-teal-300">
          Dino Footprint Hunt
        </h1>
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          Story 1 - Dino's Big Surprise: Follow the random footprints and help the dino reach the end of the path!
        </p>
      </div>

      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-teal-200 dark:border-teal-900/50 rounded-3xl p-6 shadow-xl max-w-4xl w-full mb-8 flex flex-col items-center space-y-6">
        <div className="w-full bg-amber-50/90 dark:bg-gray-800 border-2 border-amber-200 dark:border-amber-900/50 rounded-2xl p-4 flex items-center justify-between">
          <span className="text-3xl">🦖</span>
          <div className="text-center">
            <h3 className="font-extrabold text-teal-950 dark:text-white text-base">Dino position on the path</h3>
            <p className="text-teal-700 dark:text-teal-300 font-bold text-sm">
              {nextTargetNode 
                ? (nextTargetNode.footprint === '🏁' ? 'Final goal: reach the finish line!' : `Next target: ${nextTargetNode.name}`) 
                : 'You reached the end!'}
            </p>
          </div>
          <span className="text-xs font-bold bg-amber-600 text-white px-3 py-1 rounded-full">
            Step {currentStep + 1} / {boardPath.length}
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5 w-full">
          {boardPath.map((node, index) => (
            <div
              key={node.id}
              className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-bold text-sm shadow-md transition-all ${
                index <= currentStep
                  ? `${node.color} ring-2 ring-teal-400 scale-105`
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 opacity-60'
              }`}
            >
              <span>{node.footprint}</span>
            </div>
          ))}
        </div>

        <div className="text-teal-900 dark:text-teal-300 font-bold text-center px-4 py-2 bg-teal-50 dark:bg-teal-950/60 rounded-xl w-full text-sm md:text-base">
          {message}
        </div>
      </div>

      {!isGameOver ? (
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-teal-200 dark:border-teal-900/50 rounded-3xl p-6 shadow-xl max-w-xl w-full space-y-4">
          <h3 className="text-center font-extrabold text-teal-950 dark:text-teal-300 text-lg">Footprint cards (choose the matching card):</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {colorOptions.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardSelect(card.cssColor)}
                className={`${card.bg} hover:opacity-90 text-white p-4 rounded-2xl shadow-lg font-extrabold flex flex-col items-center justify-center gap-2 transition-transform transform hover:-translate-y-1 cursor-pointer`}
              >
                <span className="text-4xl">{card.icon}</span>
                <span className="text-xs">{card.colorName}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-teal-300 dark:border-teal-800 rounded-3xl p-8 shadow-xl max-w-md w-full text-center space-y-4 animate-bounce">
          <span className="text-6xl">🌟</span>
          <h2 className="text-2xl font-extrabold text-teal-900 dark:text-teal-300">You are an amazing footprint hunter!</h2>
          <p className="text-gray-600 dark:text-gray-300 font-medium">You followed all the footprints and reached the goal.</p>
          <button
            onClick={initializeGame}
            className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-extrabold rounded-2xl shadow-md transition-all cursor-pointer"
          >
            Play Again 🔄
          </button>
        </div>
      )}
    </div>
  );
}