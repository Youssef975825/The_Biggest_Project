import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const introRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // ستايل سينمائي فخم
    tl.from('.cinematic-element', {
      scale: 0.2,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'back.out(1.7)',
    })
    .to('.cinematic-element', {
      scale: 1.1,
      opacity: 1,
      duration: 0.8,
    })
    .to('.intro-content', {
      scale: 1.5,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.in',
    })
    .to(introRef.current, {
      yPercent: -100,
      duration: 2,
      ease: 'power4.inOut',
    });

  }, { scope: introRef });

  return (
    <div 
      ref={introRef} 
      className="fixed inset-0 z-[99999] bg-[#1a1a2e] flex flex-col items-center justify-center overflow-hidden text-white"
    >
      {/* خلفية فضاء خفيفة مع نجوم */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2d2b55] via-[#1a1a2e] to-[#0f0e17] opacity-90"></div>

      <div className="intro-content relative z-10 flex flex-col items-center space-y-8">
        
        {/* الأربع عناصر بتظهر بتتابع سينمائي */}
        <div className="flex items-center gap-6 text-5xl md:text-7xl">
          <span className="cinematic-element drop-shadow-[0_0_15px_rgba(112,193,179,0.8)]">🌿</span>
          <span className="cinematic-element drop-shadow-[0_0_15px_rgba(255,209,59,0.8)]">🐝</span>
          <span className="cinematic-element drop-shadow-[0_0_15px_rgba(255,112,166,0.8)]">🦖</span>
          <span className="cinematic-element drop-shadow-[0_0_15px_rgba(93,173,226,0.8)]">🚀</span>
        </div>

        {/* اسم الاستوديو بستايل فخم */}
        <div className="cinematic-element text-center space-y-2">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-wider bg-gradient-to-r from-[#FFD13B] via-[#FF70A6] to-[#70C1B3] bg-clip-text text-transparent">
            Little Wonder Studio
          </h1>
          <p className="text-sm md:text-base text-gray-400 font-medium tracking-widest uppercase">
            Where Little Minds Wonder
          </p>
        </div>

      </div>
    </div>
  );
}