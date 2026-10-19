import { Link } from 'react-router-dom';
import { useLang } from '../i18n/useLang';
import { Sun, Moon, Globe } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export default function Header({ darkMode, setDarkMode }: HeaderProps) {
  const { t, toggle } = useLang();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-3xl group-hover:scale-110 transition-transform">✨</span>
          <span className="text-xl font-extrabold bg-gradient-to-r from-[#FFD13B] via-[#FF70A6] to-[#70C1B3] bg-clip-text text-transparent">
            Little Wonder
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-bold text-sm text-gray-700 dark:text-gray-300">
          <Link to="/" className="hover:text-[#FF70A6] transition-colors">{t('nav.explore')}</Link>
          <Link to="/about" className="hover:text-[#FF70A6] transition-colors">{t('nav.about')}</Link>
          <Link to="/themes" className="hover:text-[#FF70A6] transition-colors">{t('nav.themes')}</Link>
          <Link to="/contact" className="hover:text-[#FF70A6] transition-colors">{t('nav.contact')}</Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-bold text-xs flex items-center gap-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-pointer"
            title="Switch Language"
          >
            <Globe className="w-4 h-4 text-[#FF70A6]" />
            <span>{t('lang.switch')}</span>
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-pointer"
            title="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-gray-700" />}
          </button>
        </div>

      </div>
    </header>
  );
}