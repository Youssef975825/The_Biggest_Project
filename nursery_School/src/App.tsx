import { BrowserRouter } from 'react-router-dom';
import LanguageProvider from './i18n/LanguageProvider';
import AppRoutes from './AppRouter';
import Header from './components/Header';
import { useState } from 'react';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className={darkMode ? 'dark' : ''}>
          <div className="min-h-screen bg-[#FFFDF9] dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <main>
              <AppRoutes />
            </main>
          </div>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}