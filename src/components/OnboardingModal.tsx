import React, { useState } from 'react';
import { 
  X, Sparkles, CheckCircle2, ArrowRight, ArrowLeft, 
  MapPin, Globe, Compass, Sprout, Heart, Award 
} from 'lucide-react';
import { Language } from '../types';
import { WEATHER_CITIES } from '../data/gardeningToolsData';
import PlantyMascot from './PlantyMascot';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onComplete: (preferences: { language: Language; city: string; experienceLevel: string }) => void;
}

export default function OnboardingModal({
  isOpen,
  onClose,
  language,
  onLanguageChange,
  onComplete
}: OnboardingModalProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedCity, setSelectedCity] = useState<string>('Chennai');
  const [experienceLevel, setExperienceLevel] = useState<'beginner' | 'intermediate' | 'expert'>('beginner');

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete({
        language,
        city: selectedCity,
        experienceLevel
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-emerald-100 dark:border-stone-800 overflow-hidden">
        {/* Progress header bar */}
        <div className="h-1.5 w-full bg-stone-100 dark:bg-stone-800">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300" 
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-stone-800">
          <span className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest">
            {language === 'ta' ? `படிநிலை ${step} / 4` : `Step ${step} of 4`}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Contents */}
        <div className="p-6">
          {/* STEP 1: Meet PLANTY */}
          {step === 1 && (
            <div className="text-center space-y-4 animate-fade-in">
              <div className="flex justify-center">
                <PlantyMascot mood="welcome" size="lg" animate />
              </div>
              <div>
                <span className="text-xs font-bold px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full">
                  MY PLANT CARE v2.0
                </span>
                <h3 className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-2">
                  {language === 'ta' ? 'வணக்கம்! நான் உங்கள் பிளாண்டி!' : 'Welcome to MY PLANT CARE!'}
                </h3>
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 italic mt-0.5">
                  "Grow Green. Live Clean. Let PLANTY Care!"
                </p>
                <p className="text-xs text-stone-600 dark:text-stone-300 max-w-md mx-auto mt-2 leading-relaxed">
                  {language === 'ta'
                    ? 'உங்கள் தனிப்பட்ட AI தாவர தோழனாக, செடிகளை அடையாளம் காணவும், நோய்களை குணப்படுத்தவும், 150-க்கும் மேற்பட்ட தாவரங்களை ஆரோக்கியமாக வளர்க்கவும் நான் உங்களுக்கு உதவுவேன்.'
                    : "I am your smart robotic plant companion! Together we'll identify leaves, heal diseases, schedule precision watering, and cultivate your dream garden."}
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: Language & Location */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div className="text-center">
                <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
                  {language === 'ta' ? 'மொழி மற்றும் நகரத்தை தேர்வு செய்யவும்' : 'Choose Language & City'}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  {language === 'ta' ? 'தட்பவெப்பத்திற்கேற்ப தனிப்பயனாக்கப்பட்ட பராமரிப்பு குறிப்புகளைப் பெற' : 'For personalized microclimate advice and local translations'}
                </p>
              </div>

              {/* Language toggle */}
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                  {language === 'ta' ? 'விருப்பமான மொழி' : 'Preferred Language'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => onLanguageChange('en')}
                    className={`p-3 rounded-2xl border-2 flex items-center justify-center gap-2 font-bold text-sm transition-all ${
                      language === 'en'
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
                        : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    <Globe className="w-4 h-4" /> English
                  </button>
                  <button
                    type="button"
                    onClick={() => onLanguageChange('ta')}
                    className={`p-3 rounded-2xl border-2 flex items-center justify-center gap-2 font-bold text-sm transition-all ${
                      language === 'ta'
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
                        : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    <Globe className="w-4 h-4" /> தமிழ் (Tamil)
                  </button>
                </div>
              </div>

              {/* City selector */}
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                  {language === 'ta' ? 'உங்கள் நகரம்' : 'Your Location (Weather Anchor)'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {WEATHER_CITIES.map((c) => (
                    <button
                      key={c.city}
                      type="button"
                      onClick={() => setSelectedCity(c.city)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                        selectedCity === c.city
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-bold'
                          : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      <span>{c.city}</span>
                      <span className="text-[10px] text-stone-400">{c.temperatureC}°C</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Experience Level */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center">
                <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
                  {language === 'ta' ? 'உங்கள் தோட்டக்கலை அனுபவம் என்ன?' : 'Your Gardening Experience'}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  {language === 'ta' ? 'உங்களுக்கு ஏற்ப வழிகாட்டுதலை வடிவமைப்போம்' : 'PLANTY adapts complexity and recommendations to you'}
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 'beginner',
                    title: language === 'ta' ? 'புதிய தொடக்கநிலை (Beginner)' : 'Curious Beginner',
                    desc: language === 'ta' ? 'எளிய, குறைந்த பராமரிப்பு தாவரங்கள் & நேரடி வழிகாட்டுதல் தேவை' : 'First-time plant parent seeking easy-to-grow species and clear reminders.'
                  },
                  {
                    id: 'intermediate',
                    title: language === 'ta' ? 'மிதமான அனுபவம் (Green Enthusiast)' : 'Green Enthusiast',
                    desc: language === 'ta' ? 'சில செடிகள் வளர்க்கிறேன்; காய்கறி, பூக்கள் & உரம் கற்றுக்கொள்கிறேன்' : 'Have a few thriving pots; excited to explore terrace vegetables and propagation.'
                  },
                  {
                    id: 'expert',
                    title: language === 'ta' ? 'ஆழ்ந்த அனுபவம் (Master Botanist)' : 'Master Botanist',
                    desc: language === 'ta' ? 'தோட்டம், உரம், கிராப்டிங் மற்றும் அரிய வகைகளில் ஆழ்ந்த அறிவு' : 'Experienced with grafting, rare species, pest pathology, and soil chemistry.'
                  }
                ].map((exp) => (
                  <div
                    key={exp.id}
                    onClick={() => setExperienceLevel(exp.id as any)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      experienceLevel === exp.id
                        ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 shadow-md'
                        : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <h4 className="font-bold text-sm">{exp.title}</h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Feature Tour & Readiness */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center">
                <span className="text-2xl">🎉</span>
                <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-1">
                  {language === 'ta' ? 'நீங்கள் தயாராகிவிட்டீர்கள்!' : "You're All Set!"}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {language === 'ta' ? 'உங்களுக்காக காத்திருக்கும் முக்கிய கருவிகள்:' : 'Here is what you unlocked in MY PLANT CARE:'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-stone-800/60 border border-emerald-100 dark:border-stone-700">
                  <strong className="text-emerald-800 dark:text-emerald-300 block">🌿 150+ Plant Library</strong>
                  <span className="text-stone-500 dark:text-stone-400 text-[11px]">10 categories with full specs</span>
                </div>
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-stone-800/60 border border-blue-100 dark:border-stone-700">
                  <strong className="text-blue-800 dark:text-blue-300 block">📸 AI Plant Identifier</strong>
                  <span className="text-stone-500 dark:text-stone-400 text-[11px]">Instant photo detection</span>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-stone-800/60 border border-amber-100 dark:border-stone-700">
                  <strong className="text-amber-800 dark:text-amber-300 block">🩺 AI Plant Doctor</strong>
                  <span className="text-stone-500 dark:text-stone-400 text-[11px]">Diagnose diseases with organic cure</span>
                </div>
                <div className="p-3 rounded-xl bg-teal-50 dark:bg-stone-800/60 border border-teal-100 dark:border-stone-700">
                  <strong className="text-teal-800 dark:text-teal-300 block">💧 Water Calculator</strong>
                  <span className="text-stone-500 dark:text-stone-400 text-[11px]">Exact ml doses & schedules</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-center gap-3">
                <Award className="w-8 h-8 text-amber-600 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300">
                    {language === 'ta' ? 'முதல் பதக்கம் கிடைத்தது: Green Sprout' : 'Badge Unlocked: Green Sprout Starter'}
                  </h4>
                  <p className="text-[11px] text-amber-800/80 dark:text-amber-400">
                    {language === 'ta' ? 'ஆரம்பித்தமைக்கு 50 போனஸ் புள்ளிகள் வழங்கப்பட்டது!' : 'Earned 50 botanical points for starting your journey!'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-50 dark:bg-stone-800/50 border-t border-stone-100 dark:border-stone-800">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {language === 'ta' ? 'பின் செல்' : 'Back'}
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md transition-all hover:scale-105"
          >
            <span>{step === 4 ? (language === 'ta' ? 'தோட்டத்திற்குள் செல்' : 'Start Exploring!') : (language === 'ta' ? 'அடுத்து' : 'Continue')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
