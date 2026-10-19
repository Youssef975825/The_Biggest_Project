import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { ar, en, type Key } from './dictionary';
import { LanguageContext, type Lang, type LangCtx } from './LanguageContext';

const KEY = 'lw-lang'; // a language choice is not personal data, so localStorage is fine here
function initial(): Lang {
  try { const s = localStorage.getItem(KEY); if (s === 'ar' || s === 'en') return s; } catch { /* storage blocked */ }
  return 'en';
}

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initial);
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    try { localStorage.setItem(KEY, lang); } catch { /* ignore */ }
  }, [lang, dir]);
  const value = useMemo<LangCtx>(() => ({
    lang, dir, t: (k: Key) => (lang === 'ar' ? ar[k] : en[k]),
    toggle: () => setLang(l => (l === 'en' ? 'ar' : 'en')),
  }), [lang, dir]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}