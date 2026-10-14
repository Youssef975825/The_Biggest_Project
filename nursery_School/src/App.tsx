import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Intro from './components/Preloader_Intro';
import Header from './components/Header';
import Home from './components/Home';
import BeesWorld from './components/Bees';
import PageTransitionWrapper from './components/PageTransitionWrapper';
import Dinosaur from './components/Dinosaur';
import ThemePacks from './components/ThemePacks';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [introFinished, setIntroFinished] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'; 
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className='min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300'>
      <Router>
        {/* Properties Of Dark Mode to Header */}
        <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
        
        <main className="relative min-h-screen pt-20">
          {showIntro && (
            <Intro 
              onComplete={() => {
                setShowIntro(false);
                setIntroFinished(true);
              }} 
            />
          )}

          {!showIntro && (
            <Routes>
              <Route 
                path="/" 
                element={
                  <PageTransitionWrapper>
                    <Home introFinished={introFinished} />
                  </PageTransitionWrapper>
                } 
              />
              <Route 
                path="/bees" 
                element={
                  <PageTransitionWrapper>
                    <BeesWorld />
                  </PageTransitionWrapper>
                } 
              />
              <Route 
                path="/dinosaur" 
                element={
                  <PageTransitionWrapper>
                    <Dinosaur />
                  </PageTransitionWrapper>
                } 
              />

              <Route 
                path="/themes" 
                element={
                  <PageTransitionWrapper>
                    <ThemePacks />
                  </PageTransitionWrapper>
                } 
              />
            </Routes>
            
          )}
        </main>
      </Router>
    </div>
  );
}