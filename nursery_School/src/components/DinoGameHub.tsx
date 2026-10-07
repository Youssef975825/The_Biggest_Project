import React, { useState } from 'react';
import Dino_Memory from "../Games/Dino_Memory"
import DinoRollAndFind from '../Games/DinoRollAndFind';

const dinoGamesList = [
  {
    id: 'dino-memory',
    title: 'Dino Memory Match',
    desc: 'Find the matching pairs of cute dinosaurs by turning the cards over!',
    icon: '🧩',
    color: 'bg-teal-100 border-teal-300 text-teal-900',
    available: true,
  },
  {
    id: 'dino-race',
    title: 'Prehistoric Race',
    desc: 'Help Rexy reach the volcano finish line in this fun board race game!',
    icon: '🏁',
    color: 'bg-cyan-100 border-cyan-300 text-cyan-900',
    available: true,
  },
  {
    id: 'fossil-sort',
    title: 'Fossil Sort',
    desc: 'Sort the items into Prehistoric and Modern categories correctly!',
    icon: '🦴',
    color: 'bg-sky-100 border-sky-300 text-sky-900',
    available: false,
  },
  {
    id: 'dino-spy',
    title: 'Dino I Spy!',
    desc: 'Find the hidden items in the magical prehistoric jungle scene!',
    icon: '🔍',
    color: 'bg-emerald-100 border-emerald-300 text-emerald-900',
    available: false,
  },
  {
    id: 'dino-path',
    title: "Dino's Path Match",
    desc: 'Match the baby dinosaurs to their correct footprints on the board!',
    icon: '🗺️',
    color: 'bg-blue-100 border-blue-300 text-blue-900',
    available: false,
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-cyan-50 to-blue-50 p-6 md:p-12">
      {/* زر العودة لعالم الديناصورات */}
      <button 
        onClick={onBackToWorld}
        className="mb-8 px-5 py-2.5 rounded-2xl bg-white shadow-md text-gray-700 font-bold hover:bg-gray-100 transition-all border border-teal-200 cursor-pointer flex items-center gap-2 translate-y-17 lg:translate-x-[9.5rem] md:translate-x-[-1.5rem]"
      >
        ← Back to Dino Island
      </button>

      {/* الهيدر */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
        <span className="text-6xl inline-block">🎮</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-teal-950 tracking-tight">
          Fun Dino Games Center
        </h1>
        <p className="text-gray-600 font-medium text-lg">
          Choose a game, print, play & learn! Test your skills with our prehistoric collection.
        </p>
      </div>

      {/* الـ 5 كروت الخاص بالألعاب */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {dinoGamesList.map((game) => (
          <div
            key={game.id}
            onClick={() => {
              if (game.available) {
                setSelectedGame(game.id);
              } else {
                alert('هذه اللعبة قريباً!');
              }
            }}
            className={`rounded-3xl p-6 border-2 shadow-xl transition-all transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer flex flex-col justify-between ${game.color}`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-5xl">{game.icon}</span>
                <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 bg-white/80 rounded-full shadow-sm">
                  {game.available? "Play Now 🚀" : "Coming Soon ⏳"}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold mb-2">{game.title}</h3>
              <p className="text-sm font-medium opacity-90">{game.desc}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-black/10 flex justify-between items-center text-sm font-bold">
              <span>{game.available ? "Start Game" : "Locked"}</span>
              <span>→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function onBackToGames(arg0: null): () => void {
    throw new Error('Function not implemented.');
}
