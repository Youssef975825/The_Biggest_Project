import { Link } from 'react-router-dom';
import { useLang } from '../i18n/useLang';

export default function ComingSoon() {
  const { t } = useLang();
  return (
    <div className="min-h-screen pt-40 px-6 text-center">
      <div className="text-6xl">🔒</div>
      <h1 className="text-3xl font-extrabold mt-4 text-gray-900 dark:text-white">{t('locked.title')}</h1>
      <p className="mt-2 text-gray-700 dark:text-gray-300">{t('locked.text')}</p>
      <Link to="/themes" className="inline-block mt-6 font-bold text-pink-700 dark:text-pink-300">← {t('theme.back')}</Link>
    </div>
  );
}