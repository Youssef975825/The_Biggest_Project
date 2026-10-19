import { SITE } from '../data/site';
import { useLang } from '../i18n/LanguageProvider';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';

export default function SocialLinks() {
  const { t } = useLang();

  return (
    <div className="flex flex-col items-center space-y-3">
      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('social.follow')}</span>
      <div className="flex items-center gap-4">
        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
          title="WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
        <a
          href={SITE.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
          title="Facebook"
        >
          <Facebook className="w-5 h-5" />
        </a>
        <a
          href={SITE.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
          title="Instagram"
        >
          <Instagram className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}