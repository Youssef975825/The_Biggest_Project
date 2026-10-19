import { createContext } from 'react';
import type { Key } from './dictionary';
export type Lang = 'en' | 'ar';
export interface LangCtx { lang: Lang; dir: 'ltr' | 'rtl'; t: (k: Key) => string; toggle: () => void }
export const LanguageContext = createContext<LangCtx | null>(null);