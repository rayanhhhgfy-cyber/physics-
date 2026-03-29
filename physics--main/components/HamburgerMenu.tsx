'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-40 p-3 bg-electric-blue/20 hover:bg-electric-blue/30 rounded-lg transition-all duration-300 md:hidden"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className={`h-0.5 w-full bg-white transform transition-all ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
          <span className={`h-0.5 w-full bg-white transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`h-0.5 w-full bg-white transform transition-all ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
        </div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Menu */}
      <nav
        className={`fixed top-0 right-0 h-screen w-64 bg-gradient-to-b from-dark-bg/95 to-dark-bg/90 backdrop-blur-md z-30 transform transition-transform duration-300 border-l border-electric-blue/20 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:static md:w-auto md:h-auto md:bg-transparent md:border-none md:flex md:items-center md:gap-8`}
      >
        <div className="p-6 md:p-0 md:flex md:items-center md:gap-6">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden absolute top-4 left-4 text-white hover:text-electric-blue"
          >
            ✕
          </button>

          {/* Menu Items */}
          <div className="mt-12 md:mt-0 flex flex-col md:flex-row gap-4 md:gap-6">
            <a href="#home" className="text-white hover:text-electric-blue transition-colors">
              {t('home')}
            </a>
            <a href="#simulations" className="text-white hover:text-electric-blue transition-colors">
              {t('simulations')}
            </a>
            <a href="#about" className="text-white hover:text-electric-blue transition-colors">
              {t('about')}
            </a>
          </div>

          {/* Divider */}
          <div className="md:hidden my-6 h-px bg-electric-blue/20"></div>

          {/* Language Toggle */}
          <div className="flex items-center gap-2 md:gap-1">
            <button
              onClick={() => setLanguage('ar')}
              className={`px-3 py-2 rounded transition-all ${
                language === 'ar'
                  ? 'bg-electric-blue text-white'
                  : 'bg-electric-blue/10 text-gray-400 hover:text-white'
              }`}
            >
              عربي
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-2 rounded transition-all ${
                language === 'en'
                  ? 'bg-electric-blue text-white'
                  : 'bg-electric-blue/10 text-gray-400 hover:text-white'
              }`}
            >
              English
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-full md:w-auto px-4 py-2 bg-purple/20 hover:bg-purple/30 text-white rounded transition-all flex items-center justify-center gap-2"
          >
            {isDark ? '☀️' : '🌙'} {isDark ? t('lightMode') : t('darkMode')}
          </button>

          {/* User Info */}
          {user && (
            <div className="md:hidden my-6 text-sm">
              <div className="text-gray-400">{user.username}</div>
              <div className="text-electric-blue text-xs">{user.role.toUpperCase()}</div>
            </div>
          )}

          {/* Logout Button */}
          {user && (
            <button
              onClick={logout}
              className="w-full md:w-auto px-4 py-2 bg-orange/20 hover:bg-orange/30 text-orange rounded transition-all"
            >
              {t('logout')}
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
