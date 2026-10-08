import React, { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // الـ 4 عوالم أو الأقسام الرئيسية
  const navLinks = [
    { name: 'Play World', href: '#play' },
    { name: 'Learn Hub', href: '#learn' },
    { name: 'Create Zone', href: '#create' },
    { name: 'Grow Studio', href: '#grow' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-4">
      {/* كونتينر الـ Glassmorphism للـ Navbar مع تقليل الـ Opacity لتبين الألوان والخلفية خلفها بوضوح */}
      <div className="max-w-7xl mx-auto backdrop-blur-md bg-white/40 border border-white/30 shadow-lg shadow-black/5 rounded-2xl px-6 py-3 flex items-center justify-between transition-all">
        
        {/* الشعار (Logo) - تم تصحيح التداخل وإصلاح استخدام Link الصحيح */}
        <Link to={'/'} className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FFD13B] to-[#FF70A6] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <span className="text-xl">🐝</span>
          </div>
          <span className="font-extrabold text-xl text-gray-800 tracking-tight">
            Little <span className="text-[#FF70A6]">Wonder</span>
          </span>
        </Link>

        {/* 2. الـ 4 عوالم (Desktop Nav Links) */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="font-medium text-gray-700 hover:text-[#FF70A6] transition-colors relative group py-1"
            >
              {link.name}
              {/* خط تحتي متحرك بالـ Hover */}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF70A6] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* 3. زرار تفاعلي (CTA Button) */}
        <div className="hidden md:flex items-center gap-4">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF70A6] to-[#ff5293] text-white font-bold shadow-md shadow-[#FF70A6]/25 hover:opacity-95 transition-all transform hover:-translate-y-0.5 cursor-pointer">
            <Sparkles className="w-4 h-4" />
            <span>Explore Now</span>
          </button>
        </div>

        {/* زرار القائمة للموبايل (Mobile Hamburger) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none p-2 rounded-lg bg-white/50 cursor-pointer"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* القائمة المندلعة للموبايل (Mobile Menu) */}
      {isOpen && (
        <div className="md:hidden max-w-7xl mx-auto mt-2 backdrop-blur-xl bg-white/90 border border-white/50 shadow-xl rounded-2xl p-6 flex flex-col gap-4 animate-fadeIn">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-semibold text-lg text-gray-700 hover:text-[#FF70A6] transition-colors py-2 border-b border-gray-100 last:border-none"
            >
              {link.name}
            </a>
          ))}
          <button className="w-full mt-2 py-3 rounded-xl bg-[#FF70A6] text-white font-bold shadow-md cursor-pointer">
            Explore Now 🚀
          </button>
        </div>
      )}
    </header>
  );
}