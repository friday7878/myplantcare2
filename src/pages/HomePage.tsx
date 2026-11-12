import React from 'react';
import {
  Sprout,
  ArrowRight,
  Droplets,
  Stethoscope,
  Bot,
  Sun,
  ShieldCheck,
  Heart,
  Sparkles,
  Award,
  ChevronRight,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { PlantyMascot } from '../components/PlantyMascot';
import { SeasonalGardeningAdvice } from '../components/SeasonalGardeningAdvice';
import WeatherWidget from '../components/WeatherWidget';
import { PLANT_LIBRARY } from '../data/plantLibrary';
import { Language } from '../types';

interface HomePageProps {
  onNavigate: (page: string) => void;
  language: Language;
  onOpenVoiceModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  language,
  onOpenVoiceModal
}) => {
  const featuredPlants = PLANT_LIBRARY.slice(0, 4);

  return (
    <div className="space-y-16 pb-16 animate-fade-in text-[#183B2A]">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#174D35] via-[#1F5C40] to-[#2E8B57] text-white p-6 sm:p-10 md:p-14 shadow-2xl">
        {/* Decorative foliage background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#A8DDB5]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#48BB78]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#A8DDB5] text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'அடுத்த தலைமுறை தாவர பராமரிப்பு தளம்' : 'Next-Gen Botanical Intelligence'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              MY PLANT CARE
            </h1>

            <p className="text-xl sm:text-2xl font-medium text-[#A8DDB5] italic">
              {language === 'ta'
                ? '"உங்கள் செடிகள், எங்கள் பொறுப்பு."'
                : '"Your Plants, Our Responsibility."'}
            </p>

            <p className="text-sm sm:text-base text-gray-200 max-w-xl leading-relaxed">
              {language === 'ta'
                ? 'புத்திசாலி நீரூற்றும் நினைவூட்டல்கள், உடனடி AI நோய் மருத்துவர், மற்றும் உங்கள் தாவர தோழன் பிளாண்டியின் வழிகாட்டலுடன் உங்கள் செடிகளை ஆரோக்கியமாக வளருங்கள்.'
                : 'Grow healthier plants with intelligent care, smart reminders, disease diagnostics and your personal botanical AI companion.'}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-3.5 rounded-2xl bg-white text-[#174D35] hover:bg-[#A8DDB5] font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 group cursor-pointer"
              >
                <span>{language === 'ta' ? 'தோட்டம் தொடங்குக' : 'Start Gardening'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('library')}
                className="px-6 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold text-sm backdrop-blur-sm transition-all duration-200 cursor-pointer"
              >
                {language === 'ta' ? 'தாவரங்களை ஆராய்க' : 'Explore Plants'}
              </button>

              <button
                type="button"
                onClick={onOpenVoiceModal}
                className="px-4 py-3.5 rounded-2xl bg-[#F4A340] hover:bg-[#e0912e] text-white font-bold text-sm shadow-md transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{language === 'ta' ? 'குரல் பயன்முறை' : 'Talk with PLANTY'}</span>
              </button>
            </div>
          </div>

          {/* Hero Mascot Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
            <div className="relative p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl w-full max-w-sm">
              <PlantyMascot
                mood="welcome"
                size="xl"
                showSpeechBubble={true}
                message={
                  language === 'ta'
                    ? 'வணக்கம்! நான் பிளாண்டி! உங்கள் தாவரங்களை பசுமையாக வளர்க்க நான் தயார்!'
                    : 'Hello friend! I am PLANTY, your AI plant buddy! Ready to grow together?'
                }
              />
              <div className="mt-4 pt-3 border-t border-white/15 text-xs text-[#A8DDB5] font-semibold flex items-center justify-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#48BB78] animate-ping" />
                <span>PLANTY Active &bull; AI Plant Companion</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC SEASONAL GARDENING ADVICE (AUTOMATIC CURRENT MONTH CONTEXT) */}
      <SeasonalGardeningAdvice language={language} onNavigate={onNavigate} />

      {/* LIVE BOTANICAL WEATHER ENGINE */}
      <WeatherWidget language={language} />

      {/* 2. HOW IT WORKS */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#2E8B57]">
            {language === 'ta' ? 'எளிமையான செயல்முறை' : 'Three Simple Steps'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#174D35]">
            {language === 'ta' ? 'மை பிளாண்ட் கேர் எவ்வாறு செயல்படுகிறது?' : 'How MY PLANT CARE Works'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            {language === 'ta'
              ? 'தொழில்நுட்பமும் தாவரவியலும் இணைந்து உங்கள் வீட்டுத் தோட்டத்தை பசுமையாக வைத்திருக்கும்.'
              : 'Effortless botanical intelligence in the palm of your hand.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              title: language === 'ta' ? 'உங்கள் செடிகளைச் சேர்க்கவும்' : 'Catalog Your Garden',
              desc: language === 'ta' ? 'உங்கள் தொட்டிகளில் உள்ள செடிகளின் பெயர், படம் மற்றும் இருப்பிடத்தை சேமிக்கவும்.' : 'Add your indoor and terrace plants, set watering intervals, and track planting dates.',
              icon: Sprout,
              action: () => onNavigate('plants')
            },
            {
              step: '02',
              title: language === 'ta' ? 'அறிவார்ந்த நினைவூட்டல்கள்' : 'Smart Care Schedules',
              desc: language === 'ta' ? 'செடிகளுக்கு தண்ணீர் ஊற்ற வேண்டிய நாள்களை துல்லியமாக நினைவூட்டும்.' : 'Receive tailored watering reminders, sunlight placement tips, and organic nutrition schedules.',
              icon: Droplets,
              action: () => onNavigate('watering')
            },
            {
              step: '03',
              title: language === 'ta' ? 'AI மருத்துவர் & உதவி' : 'Diagnose & Nurse with AI',
              desc: language === 'ta' ? 'இலை நோய்களை கண்டறிந்து பிளாண்டியுடன் நேரடியாக கலந்துரையாடுங்கள்.' : 'Upload sick leaf photos, obtain organic prescriptions, and talk with PLANTY live.',
              icon: Stethoscope,
              action: () => onNavigate('doctor')
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={item.action}
                className="group p-6 rounded-3xl bg-white border border-[#A8DDB5]/50 shadow-sm hover:shadow-xl hover:border-[#2E8B57] transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#E8F8ED] text-[#174D35] flex items-center justify-center group-hover:bg-[#174D35] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-[#A8DDB5]/60 group-hover:text-[#2E8B57] transition-colors">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#174D35] mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center text-xs font-bold text-[#2E8B57] group-hover:translate-x-1 transition-transform">
                  <span>{language === 'ta' ? 'தொடங்க' : 'Get Started'}</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. PLANT DOCTOR & RESCUE PREVIEW */}
      <section className="rounded-3xl bg-gradient-to-r from-[#F5FAF5] via-white to-[#E8F8ED] border-2 border-[#A8DDB5] p-6 sm:p-10 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'AI தாவர மருத்துவமனை' : 'AI Plant Doctor & ICU Rescue'}</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#174D35]">
              {language === 'ta' ? 'செடிகள் வாடுகிறதா? கவலை வேண்டாம்!' : 'Yellowing Leaves or Spots? Diagnose Instantly.'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {language === 'ta'
                ? 'இலை படத்தை பதிவேற்றி, அறிகுறிகளை தேர்வு செய்தால், எங்கள் AI மருத்துவர் துல்லியமான காரணத்தையும் இயற்கை மருத்துவ தீர்வுகளையும் உடனடியாக வழங்கும்.'
                : 'Upload a leaf photo or pick symptoms like brown spots, powdery mildew, or wilting. Receive instant organic treatment prescriptions and full 7-day ICU recovery plans.'}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {['Yellow Leaves', 'White Powder', 'Brown Spots', 'Leaf Curl', 'Root Rot'].map((s, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-white border border-[#A8DDB5] text-xs font-semibold text-[#174D35] shadow-xs"
                >
                  &bull; {s}
                </span>
              ))}
            </div>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate('doctor')}
                className="px-6 py-3 rounded-2xl bg-[#174D35] hover:bg-[#2E8B57] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{language === 'ta' ? 'மருத்துவரை அணுகவும்' : 'Open AI Plant Doctor'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('disease-encyclopedia')}
                className="px-5 py-3 rounded-2xl bg-white hover:bg-[#F5FAF5] text-[#174D35] border border-[#A8DDB5] font-bold text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#2E8B57]" />
                <span>{language === 'ta' ? 'நோய் களஞ்சியம்' : 'Disease Encyclopedia'}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-white p-5 shadow-md border border-[#A8DDB5]/70 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-xs font-bold uppercase text-[#2E8B57]">Sample Diagnosis Report</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">Preliminary</span>
              </div>
              <div className="flex gap-4 items-center">
                <img
                  src="https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=240&q=80"
                  alt="Leaf Spot"
                  className="w-20 h-20 rounded-xl object-cover border"
                />
                <div>
                  <h4 className="font-bold text-sm text-[#174D35]">Powdery Mildew & Moisture Stress</h4>
                  <p className="text-xs text-gray-500">Confidence: 94% &bull; Severity: Moderate</p>
                  <p className="text-xs text-[#2E8B57] font-semibold mt-1">Recommended: Fermented sour buttermilk + Neem spray</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#F5FAF5] text-xs text-gray-700 leading-snug">
                <strong>ICU Tip:</strong> Prune lower infected leaves, improve air circulation, and pause misting for 5 days.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED BOTANICAL SPECIMENS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2E8B57]">
              {language === 'ta' ? 'நூலகத்திலிருந்து' : 'From the Botanical Library'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#174D35]">
              {language === 'ta' ? 'பிரபலமான தாவரங்கள்' : 'Featured Plants'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('library')}
            className="text-xs sm:text-sm font-bold text-[#2E8B57] hover:text-[#174D35] flex items-center gap-1 cursor-pointer"
          >
            <span>{language === 'ta' ? 'அனைத்து 50+ தாவரங்களையும் பார்க்க' : 'View all 50+ plants'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPlants.map((plant) => (
            <div
              key={plant.id}
              onClick={() => onNavigate('library')}
              className="group rounded-3xl bg-white border border-[#A8DDB5]/50 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={plant.photoUrl}
                  alt={plant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-bold text-[#174D35]">
                  {plant.category}
                </span>
              </div>
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#174D35] group-hover:text-[#2E8B57] transition-colors">
                    {language === 'ta' ? plant.nameTa : plant.name}
                  </h3>
                  <p className="text-[11px] text-gray-500 italic">{plant.scientificName}</p>
                </div>
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-blue-500" />
                    Every {plant.wateringDays}d
                  </span>
                  <span className="flex items-center gap-1 text-[#2E8B57] font-semibold">
                    <Sun className="w-3.5 h-3.5" />
                    {plant.sunlight.split(' ')[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHY PLANT CARE MATTERS */}
      <section className="rounded-3xl bg-[#174D35] text-white p-6 sm:p-10 shadow-xl space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A8DDB5]">
            {language === 'ta' ? 'இயற்கையின் கொடை' : 'Botanical Well-being'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {language === 'ta' ? 'தாவர பராமரிப்பு ஏன் முக்கியம்?' : 'Why Plant Care Matters'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-300">
            {language === 'ta'
              ? 'செடிகளை வளர்ப்பது வீட்டை அழகுபடுத்துவது மட்டுமல்லாமல் மன அமைதியையும் உடல் ஆரோக்கியத்தையும் தருகிறது.'
              : 'Nurturing plants enriches our mental peace, oxygenates living spaces, and builds an ecological sanctuary.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: language === 'ta' ? 'தூய பிராணவாயு' : 'Natural Air Purification',
              desc: language === 'ta' ? 'மணி பிளாண்ட் மற்றும் பாம்பு கற்றாழை வீட்டின் காற்றில் உள்ள நச்சுக்களை நீக்கி தூய்மைப்படுத்துகிறது.' : 'Indoor species filter toxins like benzene, formaldehyde, and release fresh oxygen continuously.',
              icon: Sprout
            },
            {
              title: language === 'ta' ? 'மன அமைதி மற்றும் மகிழ்ச்சி' : 'Stress Reduction & Focus',
              desc: language === 'ta' ? 'தினமும் செடிகளுக்கு நீர் ஊற்றுவது மன அழுத்தத்தை குறைத்து உற்சாகத்தை அளிக்கிறது.' : 'Caring for living greenery decreases cortisol levels, elevates mood, and bolsters concentration.',
              icon: Heart
            },
            {
              title: language === 'ta' ? 'சுற்றுச்சூழல் சமநிலை' : 'Biodiversity & Eco Living',
              desc: language === 'ta' ? 'பால்கனி மற்றும் மாடித் தோட்டங்கள் பட்டாம்பூச்சிகள் மற்றும் தேனீக்களுக்கு அடைக்கலம் தருகின்றன.' : 'Urban container gardening supports vital pollinators like honeybees, butterflies, and songbirds.',
              icon: Award
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#2E8B57] text-white flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. SAMPLE USER TESTIMONIALS */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E8B57]">
            {language === 'ta' ? 'தோழர்களின் அனுபவம்' : 'User Experiences'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#174D35]">
            {language === 'ta' ? 'தோட்டக்கலை ஆர்வலர்கள் கூறுவது' : 'Loved by Plant Parents'}
          </h2>
          <p className="text-[11px] text-gray-500 italic">
            * Clearly identified demonstration feedback from our college pilot users
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Dr. Priya Sundaram',
              role: 'Urban Terrace Gardener & Botanist',
              quote: 'PLANTY helped revive my drooping Curry Leaf plant with sour buttermilk remedy. The watering calendar is pure gold!'
            },
            {
              name: 'Karthik Raja',
              role: 'Software Engineer & Balcony Grower',
              quote: 'The voice conversation with PLANTY is mindblowing for an exhibition project. It accurately diagnosed my tomato leaf curl.'
            },
            {
              name: 'Ananya Sharma',
              role: 'Indoor Plant Enthusiast',
              quote: 'Having both English and Tamil makes it accessible to my entire family. 50+ detailed plant guides are invaluable.'
            }
          ].map((t, idx) => (
            <div key={idx} className="p-5 rounded-3xl bg-white border border-[#A8DDB5]/60 shadow-xs space-y-3">
              <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                "{t.quote}"
              </p>
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-[#174D35]">{t.name}</h4>
                  <span className="text-[11px] text-gray-500">{t.role}</span>
                </div>
                <div className="flex text-amber-400 text-xs">★★★★★</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="pt-8 border-t border-[#A8DDB5]/60 text-xs text-gray-600 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#174D35] text-white flex items-center justify-center font-bold">
              <Sprout className="w-4 h-4 text-[#A8DDB5]" />
            </div>
            <span className="font-bold text-sm text-[#174D35]">MY PLANT CARE</span>
          </div>
          <p className="text-center sm:text-right">
            Grow Green. Live Clean. Let PLANTY Care! &bull; Advanced AI Botanical Technology Project
          </p>
        </div>
        <div className="text-center text-[11px] text-gray-400">
          Built for College Technology Exhibition &bull; Integrated with Firebase, Gemini Live & Vision
        </div>
      </footer>
    </div>
  );
};
