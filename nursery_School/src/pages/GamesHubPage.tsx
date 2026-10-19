import { useParams, useNavigate } from 'react-router-dom';
import { getTheme } from '../data/themes';
import { getCurrentPack } from '../lib/schedule';
import ComingSoon from '../components/ComingSoon';
import BeeGamesHub from '../components/BeeGamesHub';
import DinoGameHub from '../components/DinoGameHub';
import { ArrowLeft, Gamepad2 } from 'lucide-react';

export default function GamesHubPage() {
  const { themeId, storyId } = useParams<{ themeId: string; storyId: string }>();
  const navigate = useNavigate();

  const theme = getTheme(themeId);
  if (!theme) return <ComingSoon />;

  const currentPack = getCurrentPack(theme.packs);
  if (!currentPack) return <ComingSoon />;

  const story = currentPack.stories.find((s) => s.id === storyId);
  if (!story) return <ComingSoon />;

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-5xl mx-auto">
      {/* زر الرجوع للقصة */}
      <button
        onClick={() => navigate(`/themes/${themeId}/stories/${storyId}`)}
        className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
        <span>Back to Story</span>
      </button>

      {/* عنوان يوضح أن هذه ألعاب القصة الحالية */}
      <div className="text-center mb-10 space-y-2">
        <span className="text-4xl inline-block">🎮</span>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Mini-Games Hub: {story.title}
        </h1>
        <p className="text-gray-500 text-sm">
          Play 5 unique interactive games customized for this week's adventure!
        </p>
      </div>

      {/* هنا يمكنك عرض مكون الألعاب الخاص بالثيم، مع تمرير رقم القصة لتغيير محتواها */}
      {themeId === 'bees' ? (
        <BeeGamesHub storyId={storyId!}
        onBackToWorld={() => navigate(`/themes/${themeId}/stories/${storyId}`)} />
      ) : themeId === 'dino' ? (
        <DinoGameHub storyId={storyId!}
        onBackToWorld={() => navigate(`/themes/${themeId}/stories/${storyId}`)} />
      ) : (
        <ComingSoon />
      )}
    </div>
  );
}