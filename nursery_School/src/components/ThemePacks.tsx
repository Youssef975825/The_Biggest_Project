import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function ThemePacks() {
  const themes = [
    {
      id: 'bees',
      title: 'Bee World',
      description: 'Explore the busy hive, match cute bees, and learn fun facts about nature, honey, and teamwork!',
      icon: '🐝',
      path: '/bees',
      gradient: 'from-amber-400 to-yellow-500',
      bgLight: 'bg-amber-50/80 border-amber-200',
      bgDark: 'dark:bg-gray-900/90 dark:border-amber-900/50',
      badgeText: 'Popular 🌟',
    },
    {
      id: 'dino',
      title: 'Dino World',
      description: 'Travel back in time to the prehistoric era, play memory match with friendly dinosaurs and unearth fossils!',
      icon: '🦖',
      path: '/dinosaur',
      gradient: 'from-emerald-400 to-teal-600',
      bgLight: 'bg-emerald-50/80 border-emerald-200',
      bgDark: 'dark:bg-gray-900/90 dark:border-emerald-900/50',
      badgeText: 'Adventure 🌲',
    },
    {
      id: 'space',
      title: 'Space World',
      description: 'Blast off into the galaxy! Discover planets, stars, rockets, and cosmic interactive adventures.',
      icon: '🚀',
      path: '/space',
      gradient: 'from-indigo-500 to-purple-600',
      bgLight: 'bg-indigo-50/80 border-indigo-200',
      bgDark: 'dark:bg-gray-900/90 dark:border-indigo-900/50',
      badgeText: 'Cosmic 🌌',
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-7xl mx-auto transition-colors duration-300">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 font-bold text-sm mb-4 shadow-sm">
          <Sparkles className="w-4 h-4" />
          <span>Interactive Worlds Collection</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
          Choose Your <span className="bg-gradient-to-r from-[#FF70A6] to-purple-600 bg-clip-text text-transparent">Theme Pack</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Immerse your child in magical learning worlds designed with stunning 3D-like visuals, smooth animations, and engaging games.
        </p>
      </div>

      {/* Theme Cards Grid - Fully Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className={`relative rounded-3xl p-8 border transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-between ${theme.bgLight} ${theme.bgDark} shadow-lg backdrop-blur-md`}
          >
            {/* Top Badge */}
            <div className="absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-extrabold bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-sm text-gray-800 dark:text-gray-200">
              {theme.badgeText}
            </div>

            <div>
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${theme.gradient} flex items-center justify-center text-3xl shadow-md mb-6 transform transition-transform hover:rotate-6`}>
                {theme.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {theme.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                {theme.description}
              </p>
            </div>

            {/* Action Button */}
            <Link
              to={theme.path}
              className={`w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r ${theme.gradient} text-white font-bold shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 group cursor-pointer`}
            >
              <span>Explore World</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}