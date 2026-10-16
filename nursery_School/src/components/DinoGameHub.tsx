import React, { useState } from 'react';
import Dino_Memory from "../Games/Dino_Memory"
import DinoRollAndFind from '../Games/DinoRollAndFind';
import DinoFeed from '../Games/DinoFeed';
import DinoFootprint from '../Games/DinoFootprintHunt';
import DinoEggSurprise from '../Games/DinoEggSurprise';

const dinoGamesList = [
  {
    id: 'dino-memory',
    title: 'Dino Memory Match',
    desc: 'Find the matching pairs of cute dinosaurs by turning the cards over!',
    icon: '🧩',
    color: 'bg-teal-100 border-teal-300 text-teal-900 dark:bg-teal-950/40 dark:border-teal-800/60 dark:text-teal-200',
    available: true,
  },
  {
    id: 'dino-race',
    title: 'Roll & Find Dino',
    desc: 'Roll the dice and find the matching prehistoric item on the board!',
    icon: '🏁',
    color: 'bg-cyan-100 border-cyan-300 text-cyan-900 dark:bg-cyan-950/40 dark:border-cyan-800/60 dark:text-cyan-200',
    available: true,
  },
  {
    id: 'dino-feed',
    title: 'Dino Feed',
    desc: 'Help the dino choose the right foods and avoid things it should not eat!',
    icon: '🦴',
    color: 'bg-sky-100 border-sky-300 text-sky-900 dark:bg-sky-950/40 dark:border-sky-800/60 dark:text-sky-200',
    available: true,
  },
  {
    id: 'dino-footprint',
    title: 'Dino Footprint Hunt!',
    desc: 'Follow the colored footprints to guide the dino to the finish line!',
    icon: '🔍',
    color: 'bg-emerald-100 border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800/60 dark:text-emerald-200',
    available: true,
  },
  {
    id: 'dino-egg-surprise',
    title: "Dino Egg Surprise",
    desc: 'Open the surprise eggs to move the dino along the board!',
    icon: '🗺️',
    color: 'bg-blue-100 border-blue-300 text-blue-900 dark:bg-blue-950/40 dark:border-blue-800/60 dark:text-blue-200',
    available: true,
  },
];

interface DinoGamesHubProps {
  onBackToWorld: () => void;
}

export default function DinoGamesHub({ onBackToWorld }: DinoGamesHubProps) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  if (selectedGame === 'dino-memory') {
    return <Dino_Memory onBackToGames={() => setSelectedGame(null)} />;
  }
  else if (selectedGame === 'dino-race') {
    return <DinoRollAndFind onBackToGames={() => setSelectedGame(null)} />;
  }
  else if (selectedGame === 'dino-feed') {
    return <DinoFeed onBackToGames={() => setSelectedGame(null)} />;
  }
  else if (selectedGame === 'dino-footprint') {
    return <DinoFootprint onBackToGames={() => setSelectedGame(null)} />;
  }
  else if (selectedGame === 'dino-egg-surprise') {
    return <DinoEggSurprise onBackToGames={() => setSelectedGame(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-6 md:p-12 transition-colors duration-300">
      {/* Back to the Dino world */}
      <button 
        onClick={onBackToWorld}
        className="mb-8 px-5 py-2.5 rounded-2xl bg-white dark:bg-gray-900 shadow-md text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all border border-teal-200 dark:border-teal-900/50 cursor-pointer flex items-center gap-2 translate-y-17 lg:translate-x-[5rem] md:translate-x-[-1.5rem]"
      >
        ← Back to Dino Island
      </button>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
        <span className="text-6xl inline-block">🎮</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-teal-950 dark:text-teal-300 tracking-tight">
          Fun Dino Games Center
        </h1>
        <p className="text-gray-600 dark:text-gray-300 font-medium text-lg">
          Choose a game, print, play & learn! Test your skills with our prehistoric collection.
        </p>
      </div>

      {/* The 5 game cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {dinoGamesList.map((game) => (
          <div
            key={game.id}
            onClick={() => {
              if (game.available) {
                setSelectedGame(game.id);
              } else {
                alert('This game is coming soon!');
              }
            }}
            className={`rounded-3xl p-6 border-2 shadow-xl transition-all transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer flex flex-col justify-between ${game.color}`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-5xl">{game.icon}</span>
                <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 bg-white/80 dark:bg-gray-900/80 rounded-full shadow-sm text-gray-800 dark:text-gray-200">
                  {game.available? "Play Now 🚀" : "Coming Soon ⏳"}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold mb-2">{game.title}</h3>
              <p className="text-sm font-medium opacity-90">{game.desc}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 flex justify-between items-center text-sm font-bold">
              <span>{game.available ? "Start Game" : "Locked"}</span>
              <span>→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}