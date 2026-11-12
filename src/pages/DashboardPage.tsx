import React from 'react';
import {
  Sprout,
  Droplets,
  Heart,
  AlertTriangle,
  Calendar,
  TrendingUp,
  Award,
  Plus,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Stethoscope
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Plant, WateringSchedule, GrowthRecord, Language, UserProfile } from '../types';
import { PlantyMascot } from '../components/PlantyMascot';
import WeatherWidget from '../components/WeatherWidget';

interface DashboardPageProps {
  plants: Plant[];
  wateringSchedules: WateringSchedule[];
  growthRecords: GrowthRecord[];
  user: UserProfile | null;
  language: Language;
  onNavigate: (page: string) => void;
  onWaterPlant: (plantId: string) => void;
  onOpenVoiceModal: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  plants,
  wateringSchedules,
  growthRecords,
  user,
  language,
  onNavigate,
  onWaterPlant,
  onOpenVoiceModal
}) => {
  const healthyPlants = plants.filter((p) => p.healthStatus === 'healthy');
  const warningPlants = plants.filter((p) => p.healthStatus === 'warning');
  const criticalPlants = plants.filter((p) => p.healthStatus === 'critical');
  const attentionPlants = warningPlants.length + criticalPlants.length;

  const todayStr = new Date().toISOString().split('T')[0];
  const dueTodayTasks = wateringSchedules.filter(
    (s) => s.nextWateringDate <= todayStr && s.status !== 'completed'
  );

  const handleWaterClick = (plantId: string) => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#2E8B57', '#A8DDB5', '#60A5FA']
    });
    onWaterPlant(plantId);
  };

  return (
    <div className="space-y-8 animate-fade-in text-[#183B2A] pb-12">
      {/* 1. PLANTY PERSONAL GREETING CARD */}
      <div className="rounded-3xl bg-gradient-to-r from-[#E8F8ED] via-[#F5FAF5] to-[#E8F8ED] border-2 border-[#A8DDB5] p-5 sm:p-7 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <PlantyMascot
            mood={dueTodayTasks.length > 0 ? 'thinking' : 'happy'}
            size="md"
            interactive={true}
          />
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E8B57] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              PLANTY Botanical Assistant
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#174D35]">
              {language === 'ta'
                ? `வணக்கம் ${user?.displayName || 'இயற்கை தோழரே'}!`
                : `Welcome back, ${user?.displayName || 'Plant Lover'}!`}
            </h2>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed max-w-lg">
              {dueTodayTasks.length > 0
                ? language === 'ta'
                  ? `இன்று ${dueTodayTasks.length} செடிகள் தாகத்தில் உள்ளன! உடனடியாக தண்ணீர் ஊற்றி ஆரோக்கியத்தை காத்திடுங்கள்.`
                  : `You have ${dueTodayTasks.length} plants due for watering today. Give them a fresh drink!`
                : language === 'ta'
                  ? 'உங்கள் தோட்டம் மிக ஆரோக்கியமாக உள்ளது. அனைத்து செடிகளும் மகிழ்ச்சியுடன் உள்ளன!'
                  : 'Your garden looks wonderfully hydrated and green! Keep up the great gardening care.'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenVoiceModal}
            className="px-4 py-2.5 rounded-2xl bg-[#174D35] hover:bg-[#2E8B57] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#A8DDB5]" />
            <span>{language === 'ta' ? 'பிளாண்டியுடன் பேசு' : 'Talk with PLANTY'}</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('plants')}
            className="px-4 py-2.5 rounded-2xl bg-white border border-[#A8DDB5] text-[#174D35] hover:bg-[#A8DDB5]/20 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'ta' ? 'புதிய செடி சேர்' : 'Add New Plant'}</span>
          </button>
        </div>
      </div>

      {/* 2. STATISTIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {[
          {
            label: language === 'ta' ? 'மொத்த செடிகள்' : 'Total Plants',
            value: plants.length,
            icon: Sprout,
            color: 'text-[#174D35]',
            bg: 'bg-emerald-50 border-emerald-200'
          },
          {
            label: language === 'ta' ? 'ஆரோக்கியமானவை' : 'Healthy Plants',
            value: healthyPlants.length,
            icon: Heart,
            color: 'text-[#2E8B57]',
            bg: 'bg-green-50 border-green-200'
          },
          {
            label: language === 'ta' ? 'கவனம் தேவை' : 'Attention Needed',
            value: attentionPlants,
            icon: AlertTriangle,
            color: 'text-[#F4A340]',
            bg: 'bg-amber-50 border-amber-200'
          },
          {
            label: language === 'ta' ? 'இன்று நீரூற்ற' : 'Due Today',
            value: dueTodayTasks.length,
            icon: Droplets,
            color: 'text-blue-600',
            bg: 'bg-blue-50 border-blue-200'
          },
          {
            label: language === 'ta' ? 'வளர்ச்சி பதிவுகள்' : 'Growth Logs',
            value: growthRecords.length,
            icon: TrendingUp,
            color: 'text-purple-600',
            bg: 'bg-purple-50 border-purple-200'
          },
          {
            label: language === 'ta' ? 'சுற்றுச்சூழல் புள்ளி' : 'Eco Score',
            value: user?.ecoScore || 100,
            icon: Award,
            color: 'text-amber-600',
            bg: 'bg-yellow-50 border-yellow-200'
          }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded-3xl border ${stat.bg} shadow-xs flex flex-col justify-between transition-transform hover:scale-102`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-gray-600 leading-tight">
                  {stat.label}
                </span>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className={`text-2xl sm:text-3xl font-black ${stat.color}`}>
                {stat.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* LIVE WEATHER WIDGET & PLANTY ACTION ENGINE */}
      <WeatherWidget language={language} />

      {/* 3. TWO-COLUMN WORKFLOW: My Garden Overview + Upcoming Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* A. My Garden Overview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-lg text-[#174D35]">
                {language === 'ta' ? 'என் தோட்டம் கண்ணோட்டம்' : 'My Garden Overview'}
              </h3>
              <p className="text-xs text-gray-500">
                {plants.length} {language === 'ta' ? 'செடிகள் கண்காணிக்கப்படுகின்றன' : 'plants tracked'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('plants')}
              className="text-xs font-bold text-[#2E8B57] hover:text-[#174D35] flex items-center gap-1 cursor-pointer"
            >
              <span>{language === 'ta' ? 'அனைத்தும் காண்க' : 'View All'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {plants.length === 0 ? (
            <div className="p-8 rounded-3xl bg-white border border-[#A8DDB5]/60 text-center space-y-3">
              <Sprout className="w-12 h-12 text-[#2E8B57] mx-auto opacity-50" />
              <h4 className="font-bold text-sm text-[#174D35]">
                {language === 'ta' ? 'இன்னும் செடிகள் சேர்க்கப்படவில்லை' : 'No plants added yet!'}
              </h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                {language === 'ta'
                  ? 'உங்கள் முதல் செடியை சேர்த்து டிஜிட்டல் தோட்டத்தை தொடங்குங்கள்.'
                  : 'Start your personal digital garden by adding your favorite houseplants or vegetables.'}
              </p>
              <button
                type="button"
                onClick={() => onNavigate('plants')}
                className="px-5 py-2.5 rounded-2xl bg-[#174D35] text-white text-xs font-bold shadow-md hover:bg-[#2E8B57] transition-all cursor-pointer"
              >
                {language === 'ta' ? 'செடி சேர்க்க' : 'Add First Plant'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {plants.slice(0, 4).map((plant) => (
                <div
                  key={plant.id}
                  className="p-4 rounded-3xl bg-white border border-[#A8DDB5]/60 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={plant.photoUrl || 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=120&q=80'}
                      alt={plant.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-[#A8DDB5]"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-sm text-[#174D35] truncate">{plant.name}</h4>
                      <p className="text-[11px] text-gray-500 truncate">{plant.category}</p>
                      <span
                        className={`inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                          plant.healthStatus === 'healthy'
                            ? 'bg-emerald-100 text-emerald-800'
                            : plant.healthStatus === 'warning'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {plant.healthStatus}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-gray-500 flex items-center gap-1">
                      <Droplets className="w-3.5 h-3.5 text-blue-500" />
                      Every {plant.wateringFrequencyDays}d
                    </span>
                    <button
                      type="button"
                      onClick={() => handleWaterClick(plant.id)}
                      className="px-3 py-1 rounded-xl bg-[#E8F8ED] hover:bg-[#2E8B57] text-[#174D35] hover:text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Droplets className="w-3 h-3 text-blue-500" />
                      <span>{language === 'ta' ? 'நீர் ஊற்று' : 'Water'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* B. Watering Calendar & Tasks */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-lg text-[#174D35]">
                {language === 'ta' ? 'நீரூற்றும் அட்டவணை' : 'Watering Schedule'}
              </h3>
              <p className="text-xs text-gray-500">
                {dueTodayTasks.length} {language === 'ta' ? 'இன்று தேவை' : 'tasks due today'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('watering')}
              className="text-xs font-bold text-[#2E8B57] hover:text-[#174D35] flex items-center gap-1 cursor-pointer"
            >
              <span>{language === 'ta' ? 'அட்டவணை' : 'Full Calendar'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="rounded-3xl bg-white border border-[#A8DDB5]/60 p-4 shadow-xs space-y-3">
            {dueTodayTasks.length === 0 ? (
              <div className="py-8 text-center text-xs text-gray-500 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#2E8B57] mx-auto opacity-70" />
                <p className="font-semibold text-[#174D35]">
                  {language === 'ta' ? 'இன்றைய பணிகள் அனைத்தும் முடிந்துவிட்டன!' : 'All watered for today!'}
                </p>
                <p className="text-gray-400">Next watering tasks will appear here as schedules approach.</p>
              </div>
            ) : (
              dueTodayTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3.5 rounded-2xl bg-[#E8F8ED]/60 border border-[#A8DDB5] flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                      <Droplets className="w-5 h-5 animate-bounce-subtle" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#174D35]">{task.plantName}</h4>
                      <p className="text-[10px] text-gray-500">Due Today &bull; Interval: {task.intervalDays} days</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleWaterClick(task.plantId)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#2E8B57] hover:bg-[#174D35] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    {language === 'ta' ? 'முடிந்தது' : 'Mark Done'}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 4. HEALTH CHECK & RESCUE BANNER */}
      {criticalPlants.length > 0 && (
        <div className="rounded-3xl bg-red-50 border-2 border-red-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-red-900">
                {language === 'ta' ? 'செடிகள் ஆபத்தான நிலையில் உள்ளன!' : 'Critical Health Alert!'}
              </h4>
              <p className="text-xs text-red-700">
                {criticalPlants.map((p) => p.name).join(', ')} require immediate intervention.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('rescue')}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition-colors cursor-pointer shrink-0"
          >
            {language === 'ta' ? 'தீவிர சிகிச்சையை தொடங்குக' : 'Open Plant Rescue ICU'}
          </button>
        </div>
      )}
    </div>
  );
};
