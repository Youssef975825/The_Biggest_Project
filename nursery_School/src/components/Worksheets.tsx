import React, { useState } from 'react';
import { Download, Printer, Sparkles } from 'lucide-react';

export default function Worksheets() {
  const [childName, setChildName] = useState('');
  const [selectedWorld, setSelectedWorld] = useState('all');

  const worksheets = [
    {
      id: 1,
      title: 'Bee Counting & Math Fun',
      world: 'bees',
      category: 'Math',
      age: '4-6 Years',
      description: 'Help the little bee count the flowers and solve simple addition puzzles.',
      icon: '🐝',
      gradient: 'from-amber-400 to-yellow-500',
    },
    {
      id: 2,
      title: 'Dino Alphabet Tracing',
      world: 'dino',
      category: 'Writing',
      age: '3-5 Years',
      description: 'Practice writing letters A to Z with friendly prehistoric dinosaur guides.',
      icon: '🦖',
      gradient: 'from-emerald-400 to-teal-600',
    },
    {
      id: 3,
      title: 'Space Rocket Maze Adventure',
      world: 'space',
      category: 'Logic',
      age: '5-8 Years',
      description: 'Guide the rocket through the galaxy maze to reach the moon safely.',
      icon: '🚀',
      gradient: 'from-indigo-500 to-purple-600',
    },
    {
      id: 4,
      title: 'Honey Hive Pattern Matching',
      world: 'bees',
      category: 'Logic',
      age: '4-6 Years',
      description: 'Identify and complete the missing patterns in the honeycomb grid.',
      icon: '🍯',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      id: 5,
      title: 'Prehistoric Fossil Counting',
      world: 'dino',
      category: 'Math',
      age: '5-7 Years',
      description: 'Count the dinosaur bones and match them with the correct numbers.',
      icon: '🦴',
      gradient: 'from-teal-500 to-emerald-600',
    },
    {
      id: 6,
      title: 'Solar System Coloring & Facts',
      world: 'space',
      category: 'Science',
      age: '6-9 Years',
      description: 'Color the planets and learn amazing fun facts about our solar system.',
      icon: '🪐',
      gradient: 'from-purple-500 to-pink-600',
    },
  ];

  const filteredWorksheets = selectedWorld === 'all' 
    ? worksheets 
    : worksheets.filter(w => w.world === selectedWorld);

  const handlePrint = (title: string) => {
    window.print();
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-7xl mx-auto transition-colors duration-300">
      
      {/* Print Specific CSS to prevent breaking and hide controls */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .printable-sheet, .printable-sheet * {
            visibility: visible;
          }
          .printable-sheet {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
          .worksheet-card {
            break-inside: avoid;
            page-break-inside: avoid;
            border: 2px solid #ddd !important;
            box-shadow: none !important;
            margin-bottom: 20px;
          }
        }
      `}</style>

      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-12 no-print">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 font-bold text-sm mb-4 shadow-sm">
          <Sparkles className="w-4 h-4" />
          <span>Printable Learning Hub</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
          Fun & Engaging <span className="bg-gradient-to-r from-[#FF70A6] to-purple-600 bg-clip-text text-transparent">Worksheets</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Download, customize with your child&apos;s name, and print educational worksheets designed for creativity and skill-building.
        </p>
      </div>

      {/* Customization Bar & Filters */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6 no-print">
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Child&apos;s Name (for worksheet header):
          </label>
          <input
            type="text"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            placeholder="Enter Your Name Here 🌟"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF70A6] transition-all"
          />
        </div>

        <div className="w-full md:w-auto flex flex-wrap items-center gap-2 justify-center">
          {[
            { id: 'all', label: 'All Worlds' },
            { id: 'bees', label: 'Bee World 🐝' },
            { id: 'dino', label: 'Dino World 🦖' },
            { id: 'space', label: 'Space World 🚀' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedWorld(tab.id)}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                selectedWorld === tab.id
                  ? 'bg-gradient-to-r from-[#FF70A6] to-purple-600 text-white shadow-md shadow-pink-500/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Worksheets Grid (Printable Area) */}
      <div className="printable-sheet grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredWorksheets.map((sheet) => (
          <div
            key={sheet.id}
            className="worksheet-card bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-50 dark:bg-pink-950/50 text-[#FF70A6] dark:text-pink-400">
                  {sheet.category}
                </span>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  {sheet.age}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${sheet.gradient} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}>
                  {sheet.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {sheet.title}
                  </h3>
                  {childName && (
                    <p className="text-xs font-bold text-[#FF70A6] mt-1">
                      Prepared for: {childName} 🎯
                    </p>
                  )}
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed">
                {sheet.description}
              </p>
            </div>

            {/* Action Buttons (Hidden on print) */}
            <div className="flex items-center gap-3 no-print">
              <button
                onClick={() => handlePrint(sheet.title)}
                className="flex-1 py-3 px-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
              <button
                onClick={() => alert(`Downloading "${sheet.title}" for ${childName || 'Child'}...`)}
                className={`flex-1 py-3 px-4 rounded-xl bg-gradient-to-r ${sheet.gradient} text-white font-bold shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm`}
              >
                <Download className="w-4 h-4" />
                <span>PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}