import React from 'react';
import {
  Home,
  LayoutDashboard,
  Flower2,
  Stethoscope,
  Bot,
  BookOpen,
  Droplets,
  TrendingUp,
  Sun,
  ShieldAlert,
  Lightbulb,
  Settings,
  Sparkles,
  Compass,
  Globe2,
  Bug,
  Trees
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  language: Language;
  onOpenVoiceModal: () => void;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  language,
  onOpenVoiceModal,
  isMobile = false,
  onCloseMobile
}) => {
  const t = translations[language].nav;

  const navItems = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    {
      id: 'global-identifier',
      label: language === 'ta' ? 'உலகளாவிய AI தாவரம் காட்டி' : 'Global AI Identifier',
      icon: Globe2,
      badge: 'v4.0',
      highlight: true
    },
    { id: 'plants', label: t.myPlants, icon: Flower2 },
    { id: 'doctor', label: t.plantDoctor, icon: Stethoscope },
    {
      id: 'tamil-nadu-plants',
      label: language === 'ta' ? 'தமிழ்நாடு தாவரங்கள்' : 'Tamil Nadu Flora',
      icon: Trees,
      badge: '50'
    },
    {
      id: 'disease-encyclopedia',
      label: language === 'ta' ? 'நோய் களஞ்சியம்' : 'Disease Encyclopedia',
      icon: ShieldAlert,
      badge: '100'
    },
    {
      id: 'pests',
      label: language === 'ta' ? 'பூச்சிகள் கலைக்களஞ்சியம்' : 'Pest Encyclopedia',
      icon: Bug,
      badge: '40'
    },
    { id: 'tools', label: language === 'ta' ? 'தோட்டக் கருவிகள்' : 'Garden Tools', icon: Compass, badge: 'v2.0' },
    { id: 'planty-ai', label: t.plantyAi, icon: Bot, badge: 'AI' },
    { id: 'library', label: t.plantLibrary, icon: BookOpen },
    { id: 'watering', label: t.watering, icon: Droplets },
    { id: 'growth', label: t.growth, icon: TrendingUp },
    { id: 'guides', label: `${t.sunlight} & ${t.fertilizer}`, icon: Sun },
    { id: 'rescue', label: t.rescue, icon: ShieldAlert, alert: true },
    { id: 'tips', label: t.tips, icon: Lightbulb },
    { id: 'settings', label: t.settings, icon: Settings },
  ];


  const handleItemClick = (id: string) => {
    onNavigate(id);
    if (isMobile && onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <aside
      className={`bg-white border-r border-[#A8DDB5]/40 flex flex-col justify-between overflow-y-auto select-none ${
        isMobile
          ? 'w-72 h-full p-4'
          : 'w-64 min-h-[calc(100vh-4.5rem)] sticky top-18 p-4 shrink-0 hidden md:flex'
      }`}
    >
      {/* Navigation List */}
      <div className="space-y-1">
        <div className="px-3 py-1.5 text-[11px] font-bold text-[#2E8B57] uppercase tracking-wider">
          {language === 'ta' ? 'முதன்மை மெனு' : 'Main Menu'}
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleItemClick(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs md:text-sm font-semibold transition-all duration-200 group text-left ${
                isActive
                  ? 'bg-gradient-to-r from-[#174D35] to-[#2E8B57] text-white shadow-md shadow-[#2E8B57]/20 font-bold'
                  : 'text-[#183B2A] hover:bg-[#E8F8ED] hover:text-[#174D35]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-[#A8DDB5]' : 'text-[#2E8B57]'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-[#A8DDB5] text-[#174D35]">
                  {item.badge}
                </span>
              )}

              {item.alert && (
                <span className="w-2 h-2 rounded-full bg-[#E65A5A] animate-ping" />
              )}
            </button>
          );
        })}
      </div>

      {/* Mini PLANTY Assistant Card */}
      <div className="mt-6 pt-4 border-t border-[#A8DDB5]/40">
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#E8F8ED] to-[#C9F0D6]/50 border border-[#A8DDB5] text-center shadow-xs">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#174D35] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#2E8B57]" />
            <span>PLANTY Companion</span>
          </div>
          <p className="text-[11px] text-[#2E8B57] font-medium leading-tight mb-2.5">
            {language === 'ta' ? 'என்னிடம் பேசி தாவரங்களை பராமரியுங்கள்' : 'Ask questions or start a live voice session anytime!'}
          </p>
          <button
            type="button"
            onClick={onOpenVoiceModal}
            className="w-full py-2 px-3 rounded-xl bg-[#174D35] hover:bg-[#2E8B57] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
          >
            <span>{language === 'ta' ? 'குரல் உரையாடல்' : 'Talk with PLANTY'}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
