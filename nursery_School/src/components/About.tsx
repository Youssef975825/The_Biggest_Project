import React from 'react';
import { Sparkles, Heart, Shield, BookOpen } from 'lucide-react';

export default function About() {
  // Core values and features data
  const values = [
    {
      title: 'Interactive Learning',
      description: 'We combine education with fun through immersive worlds like Bees, Dinos, and Space.',
      icon: <Sparkles className="w-6 h-6 text-pink-500" />,
      gradient: 'from-pink-500/10 to-purple-500/10',
    },
    {
      title: 'Child-Safe Environment',
      description: 'A secure, friendly, and distraction-free platform designed with kids and parents in mind.',
      icon: <Shield className="w-6 h-6 text-emerald-500" />,
      gradient: 'from-emerald-500/15 to-teal-500/15',
    },
    {
      title: 'Printable Worksheets',
      description: 'Easily customizable and printable offline activities to enhance hands-on learning.',
      icon: <BookOpen className="w-6 h-6 text-amber-500" />,
      gradient: 'from-amber-500/15 to-yellow-500/15',
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-7xl mx-auto transition-colors duration-300">
      
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 font-bold text-sm mb-4 shadow-sm">
          <Heart className="w-4 h-4 text-[#FF70A6]" />
          <span>About Little Wonder</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
          Empowering Young Minds Through <span className="bg-gradient-to-r from-[#FF70A6] to-purple-600 bg-clip-text text-transparent">Magical Worlds</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Little Wonder is a next-generation SaaS educational platform designed to make learning an unforgettable adventure for children. We believe education should be interactive, creative, and extremely fun!
        </p>
      </div>

      {/* Mission & Vision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-2xl mb-6">
            🎯
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Our Mission</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            To bridge the gap between education and entertainment by creating engaging digital environments where children can develop logical thinking, basic math, and creative skills effortlessly.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-2xl mb-6">
            🚀
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Our Vision</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            To become the leading global web platform that empowers parents and educators with top-tier interactive tools and printable worksheets tailored for early childhood growth.
          </p>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-10">
          Why Parents & Kids Love Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${val.gradient} flex items-center justify-center mb-4`}>
                {val.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{val.title}</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{val.description}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}