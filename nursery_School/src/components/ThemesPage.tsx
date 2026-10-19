import { Link } from 'react-router-dom';
import { THEMES } from '../data/themes';
import { useLang } from '../i18n/LanguageProvider';

export default function ThemesPage() {
  const { t } = useLang();

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          {t('themes.title')}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {THEMES.map((theme) => {
          const isAvailable = theme.status === 'available';

          return (
            <div
              key={theme.id}
              className={`rounded-3xl p-8 border shadow-xl flex flex-col justify-between transition-all ${
                isAvailable
                  ? 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:shadow-2xl'
                  : 'bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 opacity-80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-6xl">{theme.icon}</span>
                  {!isAvailable && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                      🔒 {t('locked.badge')}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
                  {theme.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                  {isAvailable ? 'Explore stories, teacher guides, and decorations.' : t('locked.text')}
                </p>
              </div>

              {isAvailable ? (
                <Link
                  to={`/themes/${theme.id}`}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF70A6] to-purple-600 text-white font-bold text-center shadow-md hover:opacity-95 transition-all block"
                >
                  {t('themes.open')} →
                </Link>
              ) : (
                <Link
                  to={`/themes/${theme.id}`}
                  className="w-full py-3 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-center block"
                >
                  {t('locked.badge')} ⏳
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}