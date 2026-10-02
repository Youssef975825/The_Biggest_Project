import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link } from 'react-router-dom'; // للتنقل بين الصفحات

export default function Bees() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.bee-title', {
      opacity: 0,
      y: -30,
      duration: 0.8,
    })
    .from('.bee-desc', {
      opacity: 0,
      y: 20,
      duration: 0.8,
    }, '-=0.4')
    .from('.bee-card', {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      stagger: 0.2,
    }, '-=0.4');

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FFFDF9] px-6 pt-32 pb-16 flex flex-col items-center">
      
      {/* زر العودة للصفحة الرئيسية */}
      <div className="w-full max-w-5xl mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-md text-gray-700 font-bold hover:bg-gray-50 transition-all border border-gray-100"
        >
          ← Back to Home
        </Link>
      </div>

      {/* محتوى عالم النحل */}
      <div className="max-w-5xl w-full text-center space-y-6">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFD13B]/20 text-[#D4AC0D] font-bold text-sm">
          🐝 The Buzzing World
        </span>

        <h1 className="bee-title text-4xl md:text-6xl font-extrabold text-gray-800">
          Welcome to the <span className="text-[#FFD13B]">Bees Kingdom!</span>
        </h1>

        <p className="bee-desc text-lg text-gray-600 max-w-2xl mx-auto">
          Discover how little bees work together, make sweet honey, and keep nature blooming with magic and wonder.
        </p>

        {/* كروت تفاعلية داخل العالم */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bee-card p-6 rounded-3xl bg-gradient-to-tr from-[#FFD13B]/20 to-white border border-[#FFD13B]/30 shadow-xl text-center space-y-3">
            <span className="text-5xl inline-block">🍯</span>
            <h3 className="text-xl font-bold text-gray-800">Honey Factory</h3>
            <p className="text-sm text-gray-500">Learn how nectar transforms into delicious golden honey.</p>
          </div>

          <div className="bee-card p-6 rounded-3xl bg-gradient-to-tr from-[#FFD13B]/20 to-white border border-[#FFD13B]/30 shadow-xl text-center space-y-3">
            <span className="text-5xl inline-block">🌸</span>
            <h3 className="text-xl font-bold text-gray-800">Flower Garden</h3>
            <p className="text-sm text-gray-500">Help the cute bees pollinate flowers and grow the garden.</p>
          </div>

          <div className="bee-card p-6 rounded-3xl bg-gradient-to-tr from-[#FFD13B]/20 to-white border border-[#FFD13B]/30 shadow-xl text-center space-y-3">
            <span className="text-5xl inline-block">🎮</span>
            <h3 className="text-xl font-bold text-gray-800">Mini Game</h3>
            <p className="text-sm text-gray-500">Play and fly with Buzzy through the magical maze.</p>
          </div>
        </div>

      </div>

    </div>
  );
}