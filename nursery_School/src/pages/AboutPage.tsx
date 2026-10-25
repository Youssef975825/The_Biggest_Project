import React from 'react';
import { Sparkles, Heart, Shield, BookOpen } from 'lucide-react';
import { useLang } from '../i18n/useLang';

export default function AboutPage() {
  const { t } = useLang();
  // Core values and features data
  const values = [
    {
      title: t('about.v1.title'),
      description: t('about.v1.text'),
      icon: <Sparkles className="w-6 h-6 text-pink-500" />,
      gradient: 'from-pink-500/10 to-purple-500/10',
    },
    {
      title: t('about.v2.title'),
      description: t('about.v2.text'),
      icon: <Shield className="w-6 h-6 text-emerald-500" />,
      gradient: 'from-emerald-500/15 to-teal-500/15',
    },
    {
      title: t('about.v3.title'),
      description: t('about.v3.text'),
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
          <span>{t('about.badge')}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
          {t('about.title.1')} <span className="bg-gradient-to-r from-[#FF70A6] to-purple-600 bg-clip-text text-transparent">{t('about.title.2')}</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          {t('about.lead')}
        </p>
      </div>

      {/* Mission & Vision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-2xl mb-6">
            🎯
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{t('about.mission')}</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {t('about.mission.text')}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-2xl mb-6">
            🚀
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{t('about.vision')}</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {t('about.vision.text')}
          </p>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-10">
          {t('about.why')}
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