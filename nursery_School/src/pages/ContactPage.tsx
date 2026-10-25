import { useState } from 'react';
import { useLang } from '../i18n/useLang';
import { SITE } from '../data/site';
import { Mail, MessageCircle, MapPin, Settings } from 'lucide-react';

export default function ContactPage() {
  const { t } = useLang();
  const [tab, setTab] = useState<'visits' | 'customise'>('visits');

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-4xl mx-auto transition-colors duration-300">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          {t('contact.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {t('contact.lead')}
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => setTab('visits')}
          className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer flex items-center gap-2 ${
            tab === 'visits'
              ? 'bg-[#FF70A6] text-white shadow-lg shadow-pink-500/25'
              : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800'
          }`}
        >
          <MapPin className="w-4 h-4" /> {t('contact.visits')}
        </button>
        <button
          onClick={() => setTab('customise')}
          className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer flex items-center gap-2 ${
            tab === 'customise'
              ? 'bg-[#FF70A6] text-white shadow-lg shadow-pink-500/25'
              : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800'
          }`}
        >
          <Settings className="w-4 h-4" /> {t('contact.customise')}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-xl mb-10">
        {tab === 'visits' ? (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t('contact.visits.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('contact.visits.text')}
            </p>
            <div className="pt-4">
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-md transition-all"
              >
                <MessageCircle className="w-5 h-5" /> {t('contact.visits.cta')}
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t('contact.custom.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('contact.custom.text')}
            </p>
            <div className="pt-4">
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF70A6] hover:bg-[#ff5293] text-white font-bold shadow-md transition-all"
              >
                <Mail className="w-5 h-5" /> {t('contact.custom.cta')}
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a
          href={`mailto:${SITE.email}`}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-md flex items-center gap-4 hover:border-[#FF70A6] transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-[#FF70A6] flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{t('contact.email')}</span>
            <p className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#FF70A6] transition-colors">{SITE.email}</p>
          </div>
        </a>

        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-md flex items-center gap-4 hover:border-emerald-500 transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{t('contact.whatsapp')}</span>
            <p className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-500 transition-colors">{t('contact.chat')}</p>
          </div>
        </a>
      </div>
    </div>
  );
}