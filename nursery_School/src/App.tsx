import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Intro from './components/Preloader_Intro';
import Header from './components/Header';
import Home from './components/Home';
import BeesWorld from './components/Bees';
import PageTransitionWrapper from './components/PageTransitionWrapper';
import Dinosaur from './components/Dinosaur';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <Router>
      <main className="relative min-h-screen bg-[#FFFDF9]">
        {showIntro && (
          <Intro 
            onComplete={() => {
              setShowIntro(false);
              setIntroFinished(true);
            }} 
          />
        )}

        {!showIntro && (
          <>
            <Header />
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
            </Routes>
          </>
        )}
      </main>
    </Router>
  );
}