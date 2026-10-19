import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';
export function useLang() {
  const c = useContext(LanguageContext);
  if (!c) throw new Error('useLang must be used inside <LanguageProvider>');
  return c;
}