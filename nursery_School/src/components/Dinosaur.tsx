import { useParams, Link } from 'react-router-dom';
import { getTheme } from '../data/themes';
import { getCurrentPack, getReleasedStories } from '../lib/schedule';
import { RELEASE_MODE } from '../data/site';
import { useLang } from '../i18n/useLang';
import ComingSoon from '../components/ComingSoon';
import { Download, BookOpen, Sparkles, UserCheck, Lock, ArrowLeft } from 'lucide-react';

export default function Dinosaur() {
  const { themeId } = useParams<{ themeId: string }>();
  const { t } = useLang();
  
  // 1. Fetching theme data based on the URL parameter
  const theme = getTheme(themeId);

  // 2. If the theme doesn't exist or is locked (like Dino or Space right now)
  if (!theme || theme.status === 'locked') {
    return <ComingSoon />;
  }

  // 3. جلب حزمة الشهر الحالي بناءً على تاريخ اليوم (في توقيت القاهرة)
  const currentPack = getCurrentPack(theme.packs);
  if (!currentPack) {
    return <ComingSoon />;
  }

  // 4. Identifying activated stories based on the release timing (RELEASE_MODE)
  const activeStories = getReleasedStories(currentPack.stories, RELEASE_MODE);

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-6xl mx-auto transition-colors duration-300">
      
      {/* Navigation: (Back to Last Page) */}
      <Link
        to="/themes"
        className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
        <span>{t('theme.back')}</span>
      </Link>

      {/* Theme Header: */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <span className="text-6xl inline-block animate-bounce">{theme.icon}</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {theme.name} Theme Hub
        </h1>
        <p className="text-gray-600 dark:text-gray-300 font-medium text-base md:text-lg">
          Explore the 4 weekly stories, teacher resources, and classroom decorations.
        </p>
      </div>

      {/* Grid: The Main 6 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 4 cards: 4 Stories Per Week */}
        {currentPack.stories.map((story) => {
          const isReleased = activeStories.some((s) => s.id === story.id);

          return (
            <div
              key={story.id}
              className={`rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                isReleased
                  ? 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl hover:-translate-y-1'
                  : 'bg-gray-50 dark:bg-gray-900/40 border-gray-200 dark:border-gray-800 opacity-75'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-pink-100 dark:bg-pink-950/60 text-[#FF70A6] dark:text-pink-400">
                    Story {story.number}
                  </span>
                  {!isReleased && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full">
                      <Lock className="w-3 h-3" /> {story.releaseDate}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">
                  {story.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  Includes Story text, Worksheet, Flashcards, Crafts & 5 Mini-Games.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-400">Weekly Activity</span>
                {isReleased ? (
                  <Link
                    to={`/themes/${theme.id}/stories/${story.id}`}
                    className="px-4 py-2 rounded-xl bg-[#FF70A6] hover:bg-[#ff5293] text-white font-bold text-xs shadow-md transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open Story</span>
                    <span className="rtl:rotate-180">→</span>
                  </Link>
                ) : (
                  <span className="px-3 py-1.5 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-500 font-bold text-xs flex items-center gap-1">
                    <Lock className="w-3 h-3" /> {t('locked.badge')}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* { Card Number 5 : Teacher Guide } */}
        <div className="rounded-3xl p-6 border border-indigo-100 dark:border-indigo-950/60 bg-indigo-50/50 dark:bg-indigo-950/20 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                Teacher Resource
              </span>
            </div>
            
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">
              {t('theme.guide')}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {currentPack.teacherGuide.title}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-indigo-100 dark:border-indigo-900/50 flex items-center justify-between">
            <span className="text-xs font-medium text-indigo-900/60 dark:text-indigo-300/60">PDF Guide</span>
            {currentPack.teacherGuide.file ? (
              <a
                href={currentPack.teacherGuide.file}
                download
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t('res.open')}</span>
              </a>
            ) : (
              <span className="text-xs font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-xl">
                {t('res.soon')}
              </span>
            )}
          </div>
        </div>

        {/* { Card Number 6 : Decoration } */}
        <div className="rounded-3xl p-6 border border-amber-100 dark:border-amber-950/60 bg-amber-50/50 dark:bg-amber-950/20 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                Classroom Pack
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">
              {t('theme.decoration')}
            </h3>
            
            <div className="space-y-1.5 mt-3">
              {currentPack.decoration.map((dec, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-amber-100 dark:border-amber-900/40 last:border-0">
                  <span className="text-gray-700 dark:text-gray-300 font-medium truncate">• {dec.title}</span>
                  {dec.file ? (
                    <a href={dec.file} download className="text-amber-700 dark:text-amber-400 font-bold hover:underline ml-2">
                      {t('res.open')}
                    </a>
                  ) : (
                    <span className="text-[10px] text-gray-400">{t('res.soon')}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-100 dark:border-amber-900/50 flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 dark:text-amber-400">
              Printable Extras
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}