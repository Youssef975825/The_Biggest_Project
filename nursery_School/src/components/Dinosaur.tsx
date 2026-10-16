import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DinoGamesHub from './DinoGameHub'; // Dino games hub

export default function Dinosaur() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'main' | 'games-hub'>('main');

  const activities = [
    {
      id: 'story',
      title: 'Story 1: Rexy’s Big Adventure',
      category: 'Read & Learn',
      desc: 'Join Rexy the friendly T-Rex as he explores the prehistoric jungle and makes new friends.',
      icon: '📖',
      color: 'bg-teal-100 border-teal-300 text-teal-900 dark:bg-teal-950/40 dark:border-teal-800/60 dark:text-teal-200',
    },
    {
      id: 'flashcards',
      title: 'Dino Flashcards & Vocabulary',
      category: '12 Words to Learn',
      desc: 'Learn fun dinosaur names, fossils, jungle plants, and prehistoric terminology.',
      icon: '📇',
      color: 'bg-cyan-100 border-cyan-300 text-cyan-900 dark:bg-cyan-950/40 dark:border-cyan-800/60 dark:text-cyan-200',
    },
    {
      id: 'games',
      title: 'Fun Dino Games',
      category: 'Print, Cut & Play',
      desc: 'Enjoy Dino Memory Match, Roll & Find Dino, Feed the Dino, Footprint Hunt, and Egg Surprise!',
      icon: '🎮',
      color: 'bg-sky-100 border-sky-300 text-sky-900 dark:bg-sky-950/40 dark:border-sky-800/60 dark:text-sky-200',
    },
    {
      id: 'crafts',
      title: 'DINO Craft Pack',
      category: 'Hands-on Fun',
      desc: 'Build your own paper plate dinosaur, mask cutouts, and jungle activities.',
      icon: '✂️',
      color: 'bg-emerald-100 border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800/60 dark:text-emerald-200',
    },
  ];

  if (currentView === 'games-hub') {
    return <DinoGamesHub onBackToWorld={() => setCurrentView('main')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-6 md:p-12 transition-colors duration-300">
      {/* Back to worlds */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 px-5 py-2.5 rounded-2xl bg-white dark:bg-gray-900 shadow-md text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all border border-teal-200 dark:border-teal-900/50 cursor-pointer flex items-center gap-2 translate-y-17 translate-x-18"
      >
        ← Back to Worlds
      </button>

      {/* World header */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
        <span className="text-6xl inline-block animate-bounce">🦖</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-teal-950 dark:text-teal-300 tracking-tight">
          Dino Island & Activity Center
        </h1>
        <p className="text-gray-600 dark:text-gray-300 font-medium text-lg">
          Little Wonder Studio — Step back in time, play & learn! Discover prehistoric adventures and games designed for little explorers.
        </p>
      </div>

      {/* Activities and stories grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {activities.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              if (item.id === 'games') {
                setCurrentView('games-hub');
              } else {
                alert(`${item.title} is coming soon!`);
              }
            }}
            className={`rounded-3xl p-6 border-2 shadow-xl transition-all transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer flex flex-col justify-between ${item.color}`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-5xl">{item.icon}</span>
                <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 bg-white/80 dark:bg-gray-900/80 rounded-full shadow-sm text-gray-800 dark:text-gray-200">
                  {item.category}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold mb-2">{item.title}</h3>
              <p className="text-sm font-medium opacity-90">{item.desc}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 flex justify-between items-center text-sm font-bold">
              <span>{item.id === 'games' ? 'Explore 5 Games' : 'Explore Activity'}</span>
              <span>→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}