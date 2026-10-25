import { BrowserRouter, useLocation } from 'react-router-dom';
import LanguageProvider from './i18n/LanguageProvider';
import AppRoutes from './AppRouter';
import Header from './components/Header';
import Intro from './components/Preloader_Intro';
import PageTransitionWrapper from './components/PageTransitionWrapper';
import { useEffect, useState } from 'react';
import { ReplayIntroContext } from './context/ReplayIntro';

const DARK_KEY = 'lw-dark';
const INTRO_KEY = 'lw-intro-seen';

function initialDark(): boolean {
  try {
    return localStorage.getItem(DARK_KEY) === '1';
  } catch {
    return false;
  }
}

function initialIntroDone(): boolean {
  try {
    return sessionStorage.getItem(INTRO_KEY) === '1';
  } catch {
    return false;
  }
}

function AnimatedMain({ introFinished }: { introFinished: boolean }) {
  const location = useLocation();
  return (
    <main>
      <PageTransitionWrapper key={location.pathname}>
        <AppRoutes introFinished={introFinished} />
      </PageTransitionWrapper>
    </main>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(initialDark);
  const [introDone, setIntroDone] = useState(initialIntroDone);

  useEffect(() => {
    try {
      localStorage.setItem(DARK_KEY, darkMode ? '1' : '0');
    } catch {
      /* storage blocked */
    }
  }, [darkMode]);

  const finishIntro = () => {
    try {
      sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      /* ignore */
    }
    setIntroDone(true);
  };

  const replayIntro = () => {
    try {
      sessionStorage.removeItem(INTRO_KEY);
    } catch {
      /* ignore */
    }
    setIntroDone(false);
  };

  return (
    <LanguageProvider>
      <ReplayIntroContext.Provider value={replayIntro}>
        <BrowserRouter>
          <div className={darkMode ? 'dark' : ''}>
            <div className="min-h-screen bg-[#FFFDF9] dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
              {!introDone && <Intro onComplete={finishIntro} />}
              <Header darkMode={darkMode} setDarkMode={setDarkMode} />
              <AnimatedMain introFinished={introDone} />
            </div>
          </div>
        </BrowserRouter>
      </ReplayIntroContext.Provider>
    </LanguageProvider>
  );
}
