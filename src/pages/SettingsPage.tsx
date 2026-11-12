import React, { useState } from 'react';
import {
  Settings,
  User,
  Globe,
  Bell,
  Moon,
  Sparkles,
  Download,
  Trash2,
  ShieldCheck,
  Award,
  CheckCircle2
} from 'lucide-react';
import { UserProfile, Language } from '../types';

interface SettingsPageProps {
  user: UserProfile | null;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onExportData: () => void;
  onResetData: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  user,
  language,
  onLanguageChange,
  onExportData,
  onResetData
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [reducedAnimations, setReducedAnimations] = useState(false);
  const [themeMode, setThemeMode] = useState<'botanical_light' | 'emerald_dark'>('botanical_light');

  return (
    <div className="space-y-8 animate-fade-in text-[#183B2A] pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#174D35]">
          {language === 'ta' ? 'பயனர் அமைப்புகள்' : 'Platform Settings'}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600">
          {language === 'ta'
            ? 'சுயவிவரம், மொழி, அறிவிப்புகள் மற்றும் தரவு மேலாண்மை.'
            : 'Manage account profile, language preferences, notification alerts, and data exports.'}
        </p>
      </div>

      {/* 1. Profile Information */}
      <div className="p-6 rounded-3xl bg-white border border-[#A8DDB5]/60 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-[#174D35] flex items-center gap-2">
          <User className="w-4 h-4 text-[#2E8B57]" />
          <span>User Profile & Authentication</span>
        </h3>

        <div className="flex items-center gap-4 pt-1">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#2E8B57]"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-[#174D35] text-white font-extrabold text-xl flex items-center justify-center">
              {user?.displayName?.charAt(0) || 'U'}
            </div>
          )}

          <div className="space-y-0.5">
            <h4 className="font-extrabold text-base text-[#174D35]">
              {user?.displayName || 'Botanical Explorer'}
            </h4>
            <p className="text-xs text-gray-500">{user?.email || 'Guest Session'}</p>
            <div className="flex items-center gap-2 pt-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                {user?.role || 'User'} Role
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                Eco Score: {user?.ecoScore || 100} pts
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Language Preference */}
      <div className="p-6 rounded-3xl bg-white border border-[#A8DDB5]/60 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-[#174D35] flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#2E8B57]" />
          <span>Language / மொழி தேர்வு</span>
        </h3>
        <p className="text-xs text-gray-600">
          Choose your primary language for navigation, care tips, guides, and PLANTY responses.
        </p>

        <div className="grid grid-cols-2 gap-3 max-w-sm">
          <button
            type="button"
            onClick={() => onLanguageChange('en')}
            className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer font-bold text-xs ${
              language === 'en'
                ? 'bg-[#174D35] text-white border-[#174D35] shadow-sm'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-[#2E8B57]'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange('ta')}
            className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer font-bold text-xs ${
              language === 'ta'
                ? 'bg-[#174D35] text-white border-[#174D35] shadow-sm'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-[#2E8B57]'
            }`}
          >
            தமிழ் (Tamil)
          </button>
        </div>
      </div>

      {/* 3. Appearance & Accessibility */}
      <div className="p-6 rounded-3xl bg-white border border-[#A8DDB5]/60 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-[#174D35] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#2E8B57]" />
          <span>Appearance & Accessibility</span>
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div>
              <strong className="text-gray-800 block">Reduced Motion Mode</strong>
              <span className="text-gray-500">Minimize character bobbing and floating leaf animations for accessibility.</span>
            </div>
            <input
              type="checkbox"
              checked={reducedAnimations}
              onChange={(e) => setReducedAnimations(e.target.checked)}
              className="w-5 h-5 rounded accent-[#2E8B57] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <strong className="text-gray-800 block">Desktop & Browser Alerts</strong>
              <span className="text-gray-500">Enable in-app audio chimes and browser alerts for overdue watering tasks.</span>
            </div>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="w-5 h-5 rounded accent-[#2E8B57] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 4. Data Backup & Reset */}
      <div className="p-6 rounded-3xl bg-white border border-[#A8DDB5]/60 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-[#174D35] flex items-center gap-2">
          <Download className="w-4 h-4 text-[#2E8B57]" />
          <span>Data Management & Backup</span>
        </h3>

        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <button
            type="button"
            onClick={onExportData}
            className="px-5 py-2.5 rounded-2xl bg-[#E8F8ED] hover:bg-[#A8DDB5]/40 text-[#174D35] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-[#A8DDB5]"
          >
            <Download className="w-4 h-4" />
            <span>Export Garden JSON Data</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset all demo garden data and clear history?')) {
                onResetData();
              }
            }}
            className="px-5 py-2.5 rounded-2xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-red-200"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Garden Cache</span>
          </button>
        </div>
      </div>
    </div>
  );
};
