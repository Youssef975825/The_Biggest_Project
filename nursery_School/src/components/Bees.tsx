import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BeeGamesHub from './BeeGamesHub'; // Games hub (5 games)

export default function BeesWorld() {
  const navigate = useNavigate();
  // Tracks whether we are on the world home or inside the games hub
  const [currentView, setCurrentView] = useState<'main' | 'games-hub'>('main');

  const activities = [
    {
      id: 'story',
      title: 'Story 1: Bella Finds a Flower',
      category: 'Read & Learn',
      desc: 'A little adventure about curiosity, kindness and friendship featuring Bella the bee.',
      icon: '📖',
      color: 'bg-amber-100 border-amber-300 text-amber-900',
    },
    {
      id: 'flashcards',
      title: 'Flashcards & Vocabulary',
      category: '12 Words to Learn',
      desc: 'Learn essential words like Bee, Hive, Honey, Nectar, and Garden with cute flashcards.',
      icon: '📇',
      color: 'bg-yellow-100 border-yellow-300 text-yellow-900',
    },
    {
      id: 'games', // card for the games hub
      title: 'Fun Bee Games',
      category: 'Print, Cut & Play',
      desc: 'Enjoy Bee Memory Match, Bee Race, Honeycomb Sort, and I Spy games!',
      icon: '🎮',
      color: 'bg-pink-100 border-pink-300 text-pink-900',
    },
    {
      id: 'crafts',
      title: 'BEE Craft Pack',
      category: 'Hands-on Fun',
      desc: 'Build your springtime bee, paper plate crafts, and cut-and-paste activities.',
      icon: '✂️',
      color: 'bg-emerald-100 border-emerald-300 text-emerald-900',
    },
  ];

  // If the games card was clicked, show the games hub
  if (currentView === 'games-hub') {
    return <BeeGamesHub onBackToWorld={() => setCurrentView('main')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-amber-50 to-emerald-50 p-6 md:p-12">
      {/* Back to worlds */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 px-5 py-2.5 rounded-2xl bg-white shadow-md text-gray-700 font-bold hover:bg-gray-100 transition-all border border-amber-200 cursor-pointer flex items-center gap-2 translate-y-17 translate-x-18"
      >
        ← Back to Worlds
      </button>

      {/* World header */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
        <span className="text-6xl inline-block animate-bounce">🐝</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-amber-900 tracking-tight">
          Bees Kingdom & Activity Center
        </h1>
        <p className="text-gray-600 font-medium text-lg">
          Little Wonder Studio — Print, Play & Learn! Discover stories, vocabulary, and games designed for little explorers.
        </p>
      </div>

      {/* Activities and stories grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {activities.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              // The games card opens the games hub
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
                <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 bg-white/80 rounded-full shadow-sm">
                  {item.category}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold mb-2">{item.title}</h3>
              <p className="text-sm font-medium opacity-90">{item.desc}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-black/10 flex justify-between items-center text-sm font-bold">
              <span>{item.id === 'games' ? 'Explore 5 Games' : 'Explore Activity'}</span>
              <span>→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}