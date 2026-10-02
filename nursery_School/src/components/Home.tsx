import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

interface HomeProps {
    introFinished: boolean;
}

export default function Home({ introFinished }: HomeProps): React.JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

  useGSAP(() => {
    // لو الإنترو لسه مخلصش، متبدأش أنيميشن الهوم
    if (!introFinished) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-badge', {
      opacity: 0,
      y: -20,
      duration: 0.8,
    })
    .from('.hero-title', {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
    }, '-=0.4')
    .from('.hero-desc', {
      opacity: 0,
      y: 20,
      duration: 0.8,
    }, '-=0.6')
    .from('.hero-buttons', {
      opacity: 0,
      y: 20,
      duration: 0.8,
    }, '-=0.6')
    .from('.hero-card', {
      opacity: 0,
      scale: 0.9,
      duration: 1,
    }, '-=0.8');

  }, { scope: containerRef, dependencies: [introFinished] });

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[#FFFDF9] flex items-center justify-center overflow-hidden px-6 pt-24">
      
      {/* خلفية جمالية دافئة */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FFD13B]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10 w-full">
        
        {/* الجانب الأيمن / النصوص */}
        <div className="space-y-6 text-center md:text-left">
          <span className="hero-badge inline-block px-4 py-1.5 rounded-full bg-[#FF70A6]/10 text-[#FF70A6] font-semibold text-sm">
            ✨ Play • Learn • Create • Grow
          </span>

          <h1 className="hero-title text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            What if learning could feel <span className="text-[#FFD13B] drop-shadow-sm">different?</span>
            <span className="hero-title block text-[#FF70A6] mt-2">Let the magic begin!</span>
          </h1>

          <p className="hero-desc text-lg text-gray-600 max-w-lg">
            Welcome to Little Wonder Studio — where little minds wonder. Explore interactive worlds, fun games, and magical educational resources.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
            onClick={() => navigate('/bees')}
            className="px-8 py-3.5 rounded-xl bg-[#FF70A6] text-white font-bold shadow-lg shadow-[#FF70A6]/30 hover:bg-[#ff5293] transition-all transform hover:-translate-y-0.5">
              Explore Worlds 🚀
            </button>
            <button className="px-8 py-3.5 rounded-xl bg-white/80 backdrop-blur-md border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-all">
              Watch Intro
            </button>
          </div>
        </div>

        {/* الجانب الأيسر / مكان الـ Mascot */}
        <div className="hero-card relative flex justify-center">
          <div className="w-72 h-72 md:w-96 md:h-96 rounded-3xl bg-gradient-to-tr from-[#FFD13B]/30 to-[#70C1B3]/30 backdrop-blur-xl border border-white/50 shadow-2xl flex items-center justify-center p-6 relative">
            
            <div className="text-center">
              <span className="text-6xl animate-bounce inline-block">🐝</span>
              <p className="text-sm text-gray-500 mt-4 font-medium">[ Mascot / SVG Animation Area ]</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}