import type { Resource } from '../data/types';
import { useLang } from '../i18n/useLang';

export default function ResourceLink({ r }: { r: Resource }) {
  const { t } = useLang();
  const base = 'inline-flex items-center gap-2 rounded-xl px-4 py-2 font-bold border';
  return r.file
    ? <a href={r.file} target="_blank" rel="noopener noreferrer" className={`${base} bg-pink-600 text-white border-pink-700`}>{r.title} · {t('res.open')}</a>
    : <span aria-disabled="true" className={`${base} bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700`}>{r.title} · {t('res.soon')}</span>;
}