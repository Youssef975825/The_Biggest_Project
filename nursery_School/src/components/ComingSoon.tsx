import { Link } from 'react-router-dom';
import { useLang } from '../i18n/useLang';
import type { Key } from '../i18n/dictionary';

/** Reused for locked themes AND unreleased stories so we do not invent a second empty-state page. */
export default function ComingSoon({
  titleKey = 'locked.title',
  textKey = 'locked.text',
  backTo = '/themes',
  backKey = 'theme.back',
}: {
  titleKey?: Key;
  textKey?: Key;
  backTo?: string;
  backKey?: Key;
}) {
  const { t } = useLang();
  return (
    <div className="min-h-screen pt-40 px-6 text-center">
      <div className="text-6xl">🔒</div>
      <h1 className="text-3xl font-extrabold mt-4 text-gray-900 dark:text-white">{t(titleKey)}</h1>
      <p className="mt-2 text-gray-700 dark:text-gray-300">{t(textKey)}</p>
      <Link to={backTo} className="inline-block mt-6 font-bold text-pink-700 dark:text-pink-300">← {t(backKey)}</Link>
    </div>
  );
}
