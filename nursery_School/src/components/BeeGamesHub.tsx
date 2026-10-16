import React, { useState } from 'react';
import BeeMemoryMatch from '../Games/Bee_Memory_Match';
import Bee_Race from '../Games/Bee_Race';
import Honeycomb_Sort from '../Games/Honeycomb_Sort';
import Bee_I_Spy from '../Games/Bee_I_Spy';
import Bee_Path_Match from '../Games/Bee_Path_Match';

const gamesList = [
  {
    id: 'memory-match',
    title: 'Bee Memory Match',
    desc: 'Find the matching pairs by turning the cards over! Test your memory.',
    icon: '🧩',
    color: 'bg-yellow-100 border-yellow-300 text-yellow-900 dark:bg-yellow-950/40 dark:border-yellow-800/60 dark:text-yellow-200',
    available: true,
  },
  {
    id: 'bee-race',
    title: 'Bee Race',
    desc: 'Help Bella the bee reach the flower first in this fun board race game!',
    icon: '🏁',
    color: 'bg-amber-100 border-amber-300 text-amber-900 dark:bg-amber-950/40 dark:border-amber-800/60 dark:text-amber-200',
    available: true,
  },
  {
    id: 'honeycomb-sort',
    title: 'Honeycomb Sort',
    desc: 'Sort the picture cards into Living and Non-living under the correct beehive!',
    icon: '🏡',
    color: 'bg-orange-100 border-orange-300 text-orange-900 dark:bg-orange-950/40 dark:border-orange-800/60 dark:text-orange-200',
    available: true,
  },
  {
    id: 'i-spy',
    title: 'Bee I Spy!',
    desc: 'Find the hidden pictures in the busy beehive scene and say "I found it!".',
    icon: '🔍',
    color: 'bg-pink-100 border-pink-300 text-pink-900 dark:bg-pink-950/40 dark:border-pink-800/60 dark:text-pink-200',
    available: true,
  },
  {
    id: 'path-match',
    title: "Bee's Path Match",
    desc: 'Match the picture cards to the correct spot on the board and win!',
    icon: '🗺️',
    color: 'bg-emerald-100 border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800/60 dark:text-emerald-200',
    available: true,
  },
];

interface BeeGamesHubProps {
  onBackToWorld: () => void;
}

export default function BeeGamesHub({ onBackToWorld }: BeeGamesHubProps) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  if (selectedGame === 'memory-match') {
    return <BeeMemoryMatch onBackToGames={() => setSelectedGame(null)} />;
  }
  else if(selectedGame === 'bee-race'){
    return <Bee_Race onBackToGames={() => setSelectedGame(null)} />;
  }
  else if(selectedGame === 'honeycomb-sort'){
    return <Honeycomb_Sort onBackToGames={() => setSelectedGame(null)} />;
  }
  else if(selectedGame === 'i-spy'){
    return <Bee_I_Spy onBackToGames={() => setSelectedGame(null)} />;
  }
  else if(selectedGame === 'path-match'){
    return <Bee_Path_Match onBackToGames={() => setSelectedGame(null)} />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-amber-50 to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-6 md:p-12 transition-colors duration-300">
      {/* Back to the Bees world */}
      <button 
        onClick={onBackToWorld}
        className="mb-8 px-5 py-2.5 rounded-2xl bg-white dark:bg-gray-900 shadow-md text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all border border-amber-200 dark:border-amber-900/50 cursor-pointer flex items-center gap-2 translate-y-17 lg:translate-x-[9.5rem] md:translate-x-[-1.5rem]"
      >
        ← Back to Bees World
      </button>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
        <span className="text-6xl inline-block">🎮</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-amber-900 dark:text-amber-300 tracking-tight">
          Fun Bee Games Center
        </h1>
        <p className="text-gray-600 dark:text-gray-300 font-medium text-lg">
          Choose a game, print, play & learn! Click on "Bee Memory Match" to start playing right now.
        </p>
      </div>

      {/* The 5 game cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {gamesList.map((game) => (
          <div
            key={game.id}
            onClick={() => {
              if (game.available) {
                setSelectedGame(game.id);
              } else {
                alert('This game is coming soon!');
              }
            }}
            className={`rounded-3xl p-6 border-2 shadow-xl transition-all transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer flex flex-col justify-between ${game.color} ${
              !game.available ? 'opacity-75' : ''
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-5xl">{game.icon}</span>
                <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 bg-white/80 dark:bg-gray-900/80 rounded-full shadow-sm text-gray-800 dark:text-gray-200">
                  {game.available ? 'Play Now 🚀' : 'Coming Soon ⏳'}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold mb-2">{game.title}</h3>
              <p className="text-sm font-medium opacity-90">{game.desc}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 flex justify-between items-center text-sm font-bold">
              <span>{game.available ? 'Start Game' : 'Locked'}</span>
              <span>→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}