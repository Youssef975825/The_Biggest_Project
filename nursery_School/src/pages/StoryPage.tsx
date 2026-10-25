import { useParams, Link } from 'react-router-dom';
import { getTheme } from '../data/themes';
import { getCurrentPack } from '../lib/schedule';
import { useLang } from '../i18n/useLang';
import ComingSoon from '../components/ComingSoon';
import { ArrowLeft, BookOpen, FileText, Sparkles, Scissors, Gamepad2 } from 'lucide-react';

export default function StoryPage() {
  const { themeId, storyId } = useParams<{ themeId: string; storyId: string }>();
  const { t } = useLang();

  // 1. جلب الثيم الحالي
  const theme = getTheme(themeId);
  if (!theme) return <ComingSoon />;

  // 2. جلب الحزمة الحالية
  const currentPack = getCurrentPack(theme.packs);
  if (!currentPack) return <ComingSoon />;

  // 3. العثور على القصة المطلوبة داخل الحزمة (مثل story-1)
  const story = currentPack.stories.find((s) => s.id === storyId);
  if (!story) return <ComingSoon />;

  // قائمة الأنشطة الخمسة الخاصة بالقصة
  const storyActivities = [
    {
      id: 'story-text',
      title: story.activities.story.title,
      desc: t('act.story.desc'),
      icon: <BookOpen className="w-6 h-6 text-amber-600" />,
      color: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200',
      actionText: t('res.open'),
      file: story.activities.story.file,
    },
    {
      id: 'worksheet',
      title: story.activities.worksheet.title,
      desc: t('act.worksheet.desc'),
      icon: <FileText className="w-6 h-6 text-pink-600" />,
      color: 'bg-pink-50 dark:bg-pink-950/40 border-pink-200 dark:border-pink-800/60 text-pink-900 dark:text-pink-200',
      actionText: t('ws.print'),
      file: story.activities.worksheet.file,
    },
    {
      id: 'flashcards',
      title: story.activities.flashcards.title,
      desc: t('act.flashcards.desc'),
      icon: <Sparkles className="w-6 h-6 text-yellow-600" />,
      color: 'bg-yellow-50 dark:bg-yellow-950/40 border-yellow-200 dark:border-yellow-800/60 text-yellow-900 dark:text-yellow-200',
      actionText: t('res.open'),
      file: story.activities.flashcards.file,
    },
    {
      id: 'crafts',
      title: story.activities.crafts.title,
      desc: t('act.crafts.desc'),
      icon: <Scissors className="w-6 h-6 text-emerald-600" />,
      color: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200',
      actionText: t('res.open'),
      file: story.activities.crafts.file,
    },
    {
      id: 'games',
      title: t('act.games'),
      desc: t('act.games.desc'),
      icon: <Gamepad2 className="w-6 h-6 text-purple-600" />,
      color: 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/60 text-purple-900 dark:text-purple-200',
      actionText: t('act.play'),
      isGamesHub: true,
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-5xl mx-auto transition-colors duration-300">
      
      {/* زر العودة لصفحة الثيم */}
      <Link
        to={`/themes/${theme.id}`}
        className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
        <span>{t('story.back')}</span>
      </Link>

      {/* رأس الصفحة: اسم القصة */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <span className="text-5xl inline-block">📖</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {story.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 font-medium text-sm md:text-base">
          {t('story.release')}: {story.releaseDate} • {t('story.explore')}
        </p>
      </div>

      {/* شبكة الأنشطة الخمسة */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {storyActivities.map((act) => (
          <div
            key={act.id}
            className={`rounded-3xl p-6 border shadow-lg transition-all transform hover:-translate-y-1 flex flex-col justify-between ${act.color}`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/80 dark:bg-gray-900/80 flex items-center justify-center shadow-sm">
                  {act.icon}
                </div>
                <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 bg-white/80 dark:bg-gray-900/80 rounded-full shadow-sm">
                  {t('act.label')}
                </span>
              </div>
              <h3 className="text-xl font-extrabold mb-2">{act.title}</h3>
              <p className="text-sm font-medium opacity-90 leading-relaxed">{act.desc}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 flex justify-between items-center text-sm font-bold">
              <span>{t('res.status')}: {t('res.ready')}</span>
              {act.isGamesHub ? (
                <Link
                  to={`/themes/${theme.id}/stories/${story.id}/games`} // 👈 ربط الألعاب بالقصة الحالية
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white shadow-md hover:bg-purple-700 transition-all cursor-pointer text-xs flex items-center gap-1"
                >
                  <span>{act.actionText}</span>
                </Link>
              ) : (
                <a
                  href={act.file || '#'}
                  onClick={(e) => {
                    if (!act.file) {
                      e.preventDefault();
                      alert(`${act.title}: ${t('res.soon')}`);
                    }
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-pink-600 text-white shadow-md hover:bg-pink-700 transition-all cursor-pointer text-xs flex items-center gap-1"
                >
                  <span>{act.actionText}</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}