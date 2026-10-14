import React, { useState } from 'react';
import { Menu, X, Sparkles, Moon, Sun, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({ isDarkMode, onToggleDarkMode }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  // The 4 Main Sections
  const navLinks = [
    { name: 'Explore Us', href: '/explore' },
    { name: 'About Us', href: '/about' },
    { name: 'Theme Packs', href: '/themes' },
    { name: 'Worksheets', href: '/worksheets' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-4">
      {/* Glassmorphism navbar container */}
      <div className="max-w-7xl mx-auto backdrop-blur-md bg-white/70 dark:bg-gray-900/80 border border-white/40 dark:border-gray-800 shadow-lg shadow-black/5 rounded-2xl px-6 py-3 flex items-center justify-between transition-all">
        
        {/* Logo & 3D Payment Card Element */}
        <div className="flex items-center gap-4">
          <Link to={'/'} className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FFD13B] to-[#FF70A6] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-xl">🐝</span>
            </div>
            <span className="font-extrabold text-xl text-gray-900 dark:text-white tracking-tight">
              Little <span className="text-[#FF70A6]">Wonder</span>
            </span>
          </Link>

          {/* 3D / Glassmorphism Payment Card Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 border border-purple-200 dark:border-purple-800 shadow-inner transform hover:scale-105 transition-all cursor-pointer">
            <CreditCard className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-pulse" />
            <span className="text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Pro Checkout
            </span>
          </div>
        </div>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className="font-medium text-gray-700 dark:text-gray-300 hover:text-[#FF70A6] dark:hover:text-[#FF70A6] transition-colors relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF70A6] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Right Actions: Dark Mode Toggle & CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Dark Mode Toggle Button */}
          <button
            onClick={onToggleDarkMode}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-pointer shadow-sm"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-gray-700" />}
          </button>

          {/* Explore Now Button */}
          <Link
            to="/explore"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF70A6] to-[#ff5293] text-white font-bold shadow-md shadow-[#FF70A6]/25 hover:opacity-95 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Explore Now</span>
          </Link>
        </div>

        {/* Mobile Hamburger & Dark Mode buttons */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-400 cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 dark:text-gray-200 focus:outline-none p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 cursor-pointer"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden max-w-7xl mx-auto mt-2 backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border border-white/50 dark:border-gray-800 shadow-xl rounded-2xl p-6 flex flex-col gap-4 animate-fadeIn">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="font-semibold text-lg text-gray-700 dark:text-gray-200 hover:text-[#FF70A6] transition-colors py-2 border-b border-gray-100 dark:border-gray-800 last:border-none"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/explore"
            onClick={() => setIsOpen(false)}
            className="w-full mt-2 py-3 text-center rounded-xl bg-[#FF70A6] text-white font-bold shadow-md cursor-pointer"
          >
            Explore Now 🚀
          </Link>
        </div>
      )}
    </header>
  );
}