import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

export default function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // أنيميشن دخول نعم وسلس للصفحة الجديدة
    gsap.fromTo(
      wrapperRef.current,
      { 
        opacity: 0, 
        scale: 0.94, // انكماش بسيط زي الفيديو
        y: 20 
      },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power3.out',
        clearProps: 'all' // عشان يمسح أي تأثيرات بعد ما تخلص عشان الـ Layout ما يبصش
      }
    );
  }, { scope: wrapperRef });

  return (
    <div ref={wrapperRef} className="w-full min-h-screen">
      {children}
    </div>
  );
}