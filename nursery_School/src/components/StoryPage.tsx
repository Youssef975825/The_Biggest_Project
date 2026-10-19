import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTheme } from '../data/themes';
import { getCurrentPack } from '../lib/schedule';
import { useLang } from '../i18n/useLang';
import { Printer, Download, BookOpen, FileText, Sparkles, Puzzle } from 'lucide-react';

export default function StoryPage() {
  const { themeId, storyId } = useParams<{ themeId: string; storyId: string }>();
  const { t } = useLang();
  const [childName, setChildName] = useState('');

  const theme = getTheme(themeId);
  const currentPack = theme ? getCurrentPack(theme.packs) : undefined;
  const story = currentPack?.stories.find(s => s.id === storyId);

  if (!theme || !story) {
    return (
      <div className="min-h-screen pt-40 text-center">
        <h1 className="text-2xl font-bold">Story not found</h1>
        <Link to="/themes" className="text-pink-600 mt-4 inline-block font-bold">← Back to Themes</Link>
      </div>
    );
  }

  const handlePrint = () => { window.print(); };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-5xl mx-auto transition-colors duration-300">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .printable-content, .printable-content * { visibility: visible; }
          .printable-content { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>

      <Link
        to={`/themes/${theme.id}`}
        className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-bold text-sm no-print"
      >
        ← {t('story.back')}
      </Link>

      <div className="text-center max-w-2xl mx-auto mb-10 no-print">
        <span className="px-4 py-1.5 rounded-full bg-pink-100 dark:bg-pink-950/60 text-[#FF70A6] dark:text-pink-400 font-bold text-sm inline-block mb-3">
          Story {story.number} • {theme.name}
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          {story.title}
        </h1>
      </div>

      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-xl mb-10 no-print">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
          {t('ws.name')}
        </label>
        <input
          type="text"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
          placeholder="e.g., Youssef 🌟"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF70A6]"
        />
      </div>

      <div className="printable-content space-y-8">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t('act.story')}</h3>
            </div>
            {story.activities.story.file && (
              <a href={story.activities.story.file} download className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-bold text-sm flex items-center gap-2 no-print">
                <Download className="w-4 h-4" /> {t('res.open')}
              </a>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Read along with the adventures of {story.title}. Enjoy the engaging narrative and colourful illustrations designed for young explorers.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-pink-950/60 text-[#FF70A6] dark:text-pink-400 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t('act.worksheet')}</h3>
                {childName && (
                  <p className="text-xs font-bold text-[#FF70A6] mt-0.5">Prepared for: {childName} 🎯</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 no-print">
              <button onClick={handlePrint} className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-bold text-sm flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                <Printer className="w-4 h-4" /> {t('ws.print')}
              </button>
              {story.activities.worksheet.file && (
                <a href={story.activities.worksheet.file} download className="px-4 py-2 rounded-xl bg-[#FF70A6] text-white font-bold text-sm flex items-center gap-2 shadow-md">
                  <Download className="w-4 h-4" /> PDF
                </a>
              )}
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Interactive printable worksheet customized with your child&apos;s name for skill-building and fun puzzles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-950/60 text-yellow-600 dark:text-yellow-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('act.flashcards')}</h3>
            </div>
            {story.activities.flashcards.file ? (
              <a href={story.activities.flashcards.file} download className="text-[#FF70A6] font-bold text-sm hover:underline no-print">
                {t('res.open')} →
              </a>
            ) : (
              <span className="text-xs text-gray-400">{t('res.soon')}</span>
            )}
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Puzzle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('act.crafts')}</h3>
            </div>
            {story.activities.crafts.file ? (
              <a href={story.activities.crafts.file} download className="text-emerald-600 dark:text-emerald-400 font-bold text-sm hover:underline no-print">
                {t('res.open')} →
              </a>
            ) : (
              <span className="text-xs text-gray-400">{t('res.soon')}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}