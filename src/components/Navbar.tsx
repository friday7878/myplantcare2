import React, { useState } from 'react';
import { Sprout, Mic, Bell, Globe, LogIn, LogOut, Menu, X, Sparkles, Award } from 'lucide-react';
import { UserProfile, Language, NotificationItem } from '../types';
import { loginWithGoogle, logoutUser } from '../firebase';

interface NavbarProps {
  user: UserProfile | null;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  ecoScore: number;
  notifications: NotificationItem[];
  onOpenNotifications: () => void;
  onOpenVoiceModal: () => void;
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  language,
  onLanguageChange,
  ecoScore,
  notifications,
  onOpenNotifications,
  onOpenVoiceModal,
  onToggleMobileMenu,
  isMobileMenuOpen
}) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#A8DDB5]/40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-xl text-[#183B2A] hover:bg-[#A8DDB5]/20 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="flex items-center gap-2.5 cursor-pointer select-none">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#174D35] to-[#2E8B57] flex items-center justify-center text-white shadow-md shadow-[#2E8B57]/20">
              <Sprout className="w-6 h-6 text-[#A8DDB5]" />
            </div>
            <div>
              <span className="font-extrabold text-lg md:text-xl text-[#174D35] tracking-tight block leading-tight">
                MY PLANT CARE
              </span>
              <span className="hidden sm:block text-[11px] font-medium text-[#2E8B57] tracking-wider uppercase">
                {language === 'ta' ? 'பசுமையாக வளர்ப்போம். தூய்மையாக வாழ்வோம்.' : 'Grow Green. Live Clean.'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Eco Score Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E8F8ED] border border-[#A8DDB5] text-[#174D35] text-xs font-bold shadow-xs">
            <Award className="w-4 h-4 text-[#2E8B57]" />
            <span>{ecoScore}</span>
            <span className="text-[10px] text-[#2E8B57] uppercase font-semibold hidden sm:inline">Eco Pts</span>
          </div>

          {/* Talk to PLANTY Live Voice Button */}
          <button
            type="button"
            onClick={onOpenVoiceModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#174D35] to-[#2E8B57] text-white hover:opacity-95 text-xs font-semibold shadow-sm transition-all"
            title="Talk to PLANTY with Voice"
          >
            <Mic className="w-3.5 h-3.5 text-[#A8DDB5] animate-pulse" />
            <span className="hidden sm:inline">{language === 'ta' ? 'குரல் பயன்முறை' : 'Voice Mode'}</span>
          </button>

          {/* Language Switcher */}
          <div className="relative inline-flex items-center rounded-xl bg-white border border-[#A8DDB5]/70 p-0.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 rounded-lg transition-colors ${
                language === 'en' ? 'bg-[#174D35] text-white' : 'text-[#183B2A] hover:text-[#2E8B57]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('ta')}
              className={`px-2 py-1 rounded-lg transition-colors ${
                language === 'ta' ? 'bg-[#174D35] text-white' : 'text-[#183B2A] hover:text-[#2E8B57]'
              }`}
            >
              தமிழ்
            </button>
          </div>

          {/* Notifications Bell */}
          <button
            type="button"
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl text-[#183B2A] hover:bg-[#A8DDB5]/20 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#E65A5A] text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Auth Button */}
          {user ? (
            <div className="flex items-center gap-2 pl-1">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-8 h-8 rounded-full border border-[#2E8B57] object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#2E8B57] text-white font-bold text-xs flex items-center justify-center">
                  {user.displayName?.charAt(0) || 'U'}
                </div>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-gray-500 hover:text-[#E65A5A] hover:bg-red-50 transition-colors"
                title={language === 'ta' ? 'வெளியேறு' : 'Sign Out'}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#174D35] hover:bg-[#2E8B57] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{language === 'ta' ? 'உள்நுழைக' : 'Google Sign In'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
