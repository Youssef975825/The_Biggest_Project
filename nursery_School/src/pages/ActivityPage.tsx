import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { getTheme } from '../data/themes';
import { getCurrentPack } from '../lib/schedule';
import { useLang } from '../i18n/useLang';
import ComingSoon from '../components/ComingSoon';
import PageViewer from '../components/PageViewer';
import type { ActivityKind } from '../data/types';

const VIEWABLE: ActivityKind[] = ['story', 'worksheet', 'flashcards', 'crafts'];

export default function ActivityPage() {
  const { themeId, storyId, activity } = useParams<{
    themeId: string;
    storyId: string;
    activity: string;
  }>();
  const { t } = useLang();

  const theme = getTheme(themeId);
  if (!theme) return <ComingSoon />;
  const pack = getCurrentPack(theme.packs);
  if (!pack) return <ComingSoon />;
  const story = pack.stories.find((s) => s.id === storyId);
  if (!story) return <ComingSoon />;
  if (!VIEWABLE.includes(activity as ActivityKind)) return <ComingSoon />;

  const resource = story.activities[activity as ActivityKind];
  if (!resource.pages?.length) return <ComingSoon />;

  // One PDF -> one button. Several PDFs (flashcards Part 1 / Part 2) -> one button each.
  const downloads = resource.files?.length
    ? resource.files.map((f) => ({ label: `${t('activity.download')} (${f.label})`, url: f.url }))
    : resource.file
      ? [{ label: t('activity.download'), url: resource.file }]
      : [];

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-5xl mx-auto">
      <Link
        to={`/themes/${theme.id}/stories/${story.id}`}
        className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-bold text-sm"
      >
        <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
        <span>{t('games.back.story')}</span>
      </Link>

      <h1 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
        {resource.title}
      </h1>

      <PageViewer pages={resource.pages} alt={resource.title} />

      {downloads.length > 0 && (
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {downloads.map((d) => (
            <a
              key={d.url}
              href={d.url}
              download
              className="px-5 py-2.5 rounded-xl bg-[#FF70A6] hover:bg-[#ff5293] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{d.label}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}