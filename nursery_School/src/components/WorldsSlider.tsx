import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const worlds = [
  {
    id: 'bees',
    title: 'Bees Kingdom',
    category: 'The Buzzing World',
    desc: 'Discover how little bees work together, make sweet honey, and keep nature blooming.',
    icon: '🐝',
    path: '/bees',
    bgGradient: 'from-[#FFD13B]/30 to-[#FF70A6]/20',
    borderColor: 'border-[#FFD13B]/40'
  },
  {
    id: 'dinosaur',
    title: 'Dino Island',
    category: 'Prehistoric Adventure',
    desc: 'Step back in time and meet friendly giant dinosaurs in a magical prehistoric jungle.',
    icon: '🦖',
    path: '/dinosaur',
    bgGradient: 'from-[#70C1B3]/30 to-[#247BA0]/20',
    borderColor: 'border-[#70C1B3]/40'
  },
  {
    id: 'space',
    title: 'Space Odyssey',
    category: 'The Cosmic Galaxy',
    desc: 'Journey through stars, planets, and friendly astronauts in the deep galaxy.',
    icon: '🚀',
    path: '/space',
    bgGradient: 'from-[#50514F]/30 to-[#F25F5C]/20',
    borderColor: 'border-[#F25F5C]/40'
  },
  {
    id: 'nature',
    title: 'Magical Forest',
    category: 'Enchanted Woods',
    desc: 'Explore glowing flowers, hidden treehouses, and secret paths of the magic forest.',
    icon: '🌿',
    path: '/nature',
    bgGradient: 'from-[#70C1B3]/30 to-[#FFE066]/20',
    borderColor: 'border-[#FFE066]/40'
  }
];

export default function WorldsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const currentWorld = worlds[currentIndex];

  // أنيميشنGSAP عند التنقل بين العوالم
  useGSAP(() => {
    gsap.fromTo(
      slideRef.current,
      { opacity: 0, scale: 0.95, y: 15 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    );
  }, { dependencies: [currentIndex] });

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % worlds.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + worlds.length) % worlds.length);
  };

  // نظام الحركة التلقائية (Auto-play) كل 3 ثواني
  useEffect(() => {
    if (isPaused) return; // لو الماوس فوق الكارت، وقف المؤقت

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <div 
      className="relative flex flex-col items-center justify-center w-full max-w-xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}   // إيقاف مؤقت عند وضع الماوس
      onMouseLeave={() => setIsPaused(false)}  // استئناف الحركة عند إبعاد الماوس
    >
      
      {/* الكارت الرئيسي المتحرك */}
      <div 
        ref={slideRef}
        data-flip-id={currentWorld.id === 'bees' ? 'bee-card' : undefined}
        onClick={() => navigate(currentWorld.path)}
        className={`w-full h-80 md:h-96 rounded-3xl bg-gradient-to-tr ${currentWorld.bgGradient} backdrop-blur-xl border ${currentWorld.borderColor} shadow-2xl flex flex-col items-center justify-center p-8 relative cursor-pointer transform transition-transform hover:scale-[1.02] group text-center space-y-4`}
      >
        <span className="text-6xl inline-block group-hover:scale-110 transition-transform">
          {currentWorld.icon}
        </span>
        
        <div className="space-y-1">
          <span className="text-xs font-extrabold uppercase tracking-widest text-gray-500">
            {currentWorld.category}
          </span>
          <h3 className="text-3xl font-extrabold text-gray-800">
            {currentWorld.title}
          </h3>
        </div>

        <p className="text-sm text-gray-600 font-medium max-w-sm">
          {currentWorld.desc}
        </p>

        <div className="absolute bottom-4 text-xs font-bold text-gray-700 bg-white/60 px-3 py-1 rounded-full shadow-sm">
          Click to explore world →
        </div>
      </div>

      {/* أزرار التنقل (Arrows & Dots) */}
      <div className="flex items-center justify-between w-full mt-6 px-4">
        <button 
          onClick={prevSlide}
          className="p-3 rounded-xl bg-white shadow-md text-gray-700 font-bold hover:bg-gray-50 transition-all border border-gray-100 cursor-pointer"
        >
          ← Prev
        </button>

        {/* مؤشرات النقاط */}
        <div className="flex gap-2">
          {worlds.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'w-8 bg-[#FF70A6]' : 'w-2.5 bg-gray-300'
              }`}
            />
          ))}
        </div>

        <button 
          onClick={nextSlide}
          className="p-3 rounded-xl bg-white shadow-md text-gray-700 font-bold hover:bg-gray-50 transition-all border border-gray-100 cursor-pointer"
        >
          Next →
        </button>
      </div>

    </div>
  );
}