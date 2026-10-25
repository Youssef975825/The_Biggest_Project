import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n/useLang';
import { Sun, Moon, Globe, Menu, X } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export default function Header({ darkMode, setDarkMode }: HeaderProps) {
  const { t, toggle } = useLang();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* الشعار */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-3xl group-hover:scale-110 transition-transform">✨</span>
          <span className="text-xl font-extrabold bg-gradient-to-r from-[#FFD13B] via-[#FF70A6] to-[#70C1B3] bg-clip-text text-transparent">
            Little Wonder
          </span>
        </Link>

        {/* الروابط الخاصة بالشاشات الكبيرة (لابتوب) */}
        <nav className="hidden md:flex items-center gap-8 font-bold text-sm text-gray-700 dark:text-gray-300">
          <Link to="/" className="hover:text-[#FF70A6] transition-colors">{t('nav.explore')}</Link>
          <Link to="/about" className="hover:text-[#FF70A6] transition-colors">{t('nav.about')}</Link>
          <Link to="/themes" className="hover:text-[#FF70A6] transition-colors">{t('nav.themes')}</Link>
          <Link to="/contact" className="hover:text-[#FF70A6] transition-colors">{t('nav.contact')}</Link>
        </nav>

        {/* الأزرار الجانبية (اللغة، الدارك مود، وزر القائمة للموبايل) */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-bold text-xs flex items-center gap-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-pointer"
            title={t('a11y.lang')}
            aria-label={t('a11y.lang')}
          >
            <Globe className="w-4 h-4 text-[#FF70A6]" />
            <span>{t('lang.switch')}</span>
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-pointer"
            title={t('a11y.dark')}
            aria-label={t('a11y.dark')}
          >
            {darkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-gray-700" />}
          </button>

          {/* زر القائمة المنسدلة للموبايل (يظهر على الموبايل فقط) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-pointer"
            title={t('a11y.menu')}
            aria-label={t('a11y.menu')}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#FF70A6]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* قائمة الموبايل المنسدلة (تظهر عند الضغط على زر الهامبرجر) */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-2xl px-6 py-6 flex flex-col gap-4 font-bold text-gray-700 dark:text-gray-300 transition-all animate-fadeIn">
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#FF70A6] transition-colors py-2 border-b border-gray-100 dark:border-gray-900"
          >
            {t('nav.explore')}
          </Link>
          <Link 
            to="/about" 
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#FF70A6] transition-colors py-2 border-b border-gray-100 dark:border-gray-900"
          >
            {t('nav.about')}
          </Link>
          <Link 
            to="/themes" 
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#FF70A6] transition-colors py-2 border-b border-gray-100 dark:border-gray-900"
          >
            {t('nav.themes')}
          </Link>
          <Link 
            to="/contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#FF70A6] transition-colors py-2"
          >
            {t('nav.contact')}
          </Link>
        </div>
      )}
    </header>
  );
}