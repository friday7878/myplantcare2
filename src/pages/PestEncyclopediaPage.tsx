import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Bug,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Leaf,
  Droplets,
  BookOpen,
  ChevronRight,
  X,
  Printer,
  Info,
  Stethoscope,
  Activity,
  HeartPulse,
  Flame,
  Volume2
} from 'lucide-react';
import { Language } from '../types';
import PlantyMascot from '../components/PlantyMascot';
import { PESTS_DATABASE, GardenPest } from '../data/pestsDatabase';

interface PestEncyclopediaPageProps {
  language: Language;
  onOpenDoctor?: () => void;
}

const CATEGORIES = [
  'All',
  'Sucking Pest',
  'Chewing Pest',
  'Boring Pest',
  'Soil Pest',
  'Mollusk / Other'
] as const;

export const PestEncyclopediaPage: React.FC<PestEncyclopediaPageProps> = ({
  language,
  onOpenDoctor
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [selectedPest, setSelectedPest] = useState<GardenPest | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'bio' | 'mechanical' | 'hazards'>('overview');

  const filteredPests = useMemo(() => {
    return PESTS_DATABASE.filter(pest => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        pest.name.toLowerCase().includes(q) ||
        pest.nameTa.toLowerCase().includes(q) ||
        pest.scientificName.toLowerCase().includes(q) ||
        pest.affectedPlants.some(p => p.toLowerCase().includes(q)) ||
        pest.identificationMarks.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === 'All' || pest.category === selectedCategory;

      const matchesSeverity =
        selectedSeverity === 'All' || pest.severity === selectedSeverity;

      return matchesSearch && matchesCategory && matchesSeverity;
    });
  }, [searchQuery, selectedCategory, selectedSeverity]);

  // Audio pronunciation
  const speakName = (text: string, langCode: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const getSeverityBadge = (sev: GardenPest['severity']) => {
    switch (sev) {
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">
            <Flame className="w-3 h-3 text-red-600" />
            {language === 'ta' ? 'அதி தீவிர ஆபத்து' : 'Critical Hazard'}
          </span>
        );
      case 'High':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            {language === 'ta' ? 'அதிக பாதிப்பு' : 'High Threat'}
          </span>
        );
      case 'Moderate':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
            <Activity className="w-3 h-3 text-emerald-600" />
            {language === 'ta' ? 'மிதமான பாதிப்பு' : 'Moderate'}
          </span>
        );
    }
  };

  const getCategoryBadge = (cat: GardenPest['category']) => {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-700 border border-stone-200">
        <Bug className="w-3 h-3 text-[#2E8B57]" />
        {cat}
      </span>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Top Banner / Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#174D35] via-[#1F5F42] to-[#2E8B57] text-white p-8 md:p-10 shadow-xl border border-emerald-800">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-64 h-64 rounded-full bg-mint/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
              <Bug className="w-3.5 h-3.5 text-emerald-300" />
              {language === 'ta'
                ? 'பூச்சிகள் கலைக்களஞ்சியம் • 40 வகைகள்'
                : 'Pest & Insect Pathology Encyclopedia • 40 Species'}
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white font-serif leading-tight">
              {language === 'ta'
                ? 'தோட்டப் பூச்சிகள் & உயிரியல் கட்டுப்பாடு'
                : 'Garden Pest Directory & Bio-Controls'}
            </h1>

            <p className="text-emerald-100 text-sm md:text-base leading-relaxed max-w-2xl font-sans">
              {language === 'ta'
                ? 'அசுவினி, மாவுப்பூச்சி முதல் தென்னை காண்டாமிருக வண்டு வரை 40 வகை பூச்சிகளின் வாழ்க்கை சுழற்சி, அறிகுறிகள், இயற்கை எதிரிகள் (Bio-controls) மற்றும் ரசாயன எச்சரிக்கைகள்.'
                : 'Comprehensive clinical guide to 40 major destructive garden and crop pests. Learn natural predators (parasitic wasps, ladybirds), botanical sprays (Neem, Beauveria), and chemical safety precautions.'}
            </p>

            {/* Quick Metrics */}
            <div className="pt-2 flex flex-wrap gap-4 text-xs">
              <div className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
                <span className="block text-emerald-200 font-medium">
                  {language === 'ta' ? 'பதிவான பூச்சிகள்' : 'Total Cataloged'}
                </span>
                <span className="text-lg font-bold text-white">40 Species</span>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
                <span className="block text-emerald-200 font-medium">
                  {language === 'ta' ? 'இயற்கை மருந்துகள்' : 'Safer Bio-Controls'}
                </span>
                <span className="text-lg font-bold text-white">100% Organic Focus</span>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
                <span className="block text-emerald-200 font-medium">
                  {language === 'ta' ? 'தமிழ்நாடு பயிர்கள்' : 'Regional Pests'}
                </span>
                <span className="text-lg font-bold text-white">TN Special Edition</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-center max-w-xs shadow-lg">
              <PlantyMascot mood="encouraging" size="md" className="mx-auto mb-2" />
              <p className="text-xs text-white/95 font-medium leading-relaxed italic">
                {language === 'ta'
                  ? '"நன்மை செய்யும் பொறிவண்டுகள் (Ladybird) ஒரு நாளைக்கு 50 அசுவினிகளை உண்ணும்! உடனே ரசாயனம் தெளிக்காதீர்கள்."'
                  : '"A single adult ladybird beetle can devour 50 aphids a day! Always choose biological allies before toxic chemical sprays."'}
              </p>
              <div className="mt-3 text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
                — PLANTY Pest Scout
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-7 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={
                language === 'ta'
                  ? 'பூச்சியின் பெயர், பயிர் (எ.கா. அசுவினி, தக்காளி, தென்னை) தேடுக...'
                  : 'Search by pest name, plant affected, or symptoms (e.g., Mealybug, Tomato, Thrips)...'
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent bg-stone-50/50"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Severity Dropdown */}
          <div className="md:col-span-5 flex gap-2">
            <div className="relative flex-1">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <select
                value={selectedSeverity}
                onChange={e => setSelectedSeverity(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-stone-300 text-xs md:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
              >
                <option value="All">{language === 'ta' ? 'அனைத்து தீவிர நிலைகள்' : 'All Severities'}</option>
                <option value="Critical">{language === 'ta' ? 'அதி தீவிர ஆபத்து (Critical)' : 'Critical'}</option>
                <option value="High">{language === 'ta' ? 'அதிக ஆபத்து (High)' : 'High'}</option>
                <option value="Moderate">{language === 'ta' ? 'மிதமான பாதிப்பு (Moderate)' : 'Moderate'}</option>
              </select>
            </div>

            {onOpenDoctor && (
              <button
                type="button"
                onClick={onOpenDoctor}
                className="px-4 py-2.5 rounded-xl bg-[#174D35] hover:bg-[#2E8B57] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs shrink-0 cursor-pointer"
              >
                <Stethoscope className="w-4 h-4" />
                <span className="hidden sm:inline">{language === 'ta' ? 'AI டாக்டர்' : 'AI Doctor'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
          <span className="text-xs font-semibold text-stone-500 mr-1 flex items-center gap-1">
            <Leaf className="w-3.5 h-3.5 text-[#2E8B57]" />
            {language === 'ta' ? 'பிரிவுகள்:' : 'Pest Category:'}
          </span>
          {CATEGORIES.map(category => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === category
                  ? 'bg-[#174D35] text-white shadow-xs font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {category === 'All'
                ? language === 'ta'
                  ? 'அனைத்தும் (40)'
                  : 'All (40)'
                : category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-1">
        <span>
          {language === 'ta'
            ? `${filteredPests.length} பூச்சிகள் கண்டறியப்பட்டன`
            : `Showing ${filteredPests.length} cataloged pests`}
        </span>
        {(searchQuery || selectedCategory !== 'All' || selectedSeverity !== 'All') && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedSeverity('All');
            }}
            className="text-[#2E8B57] font-semibold hover:underline cursor-pointer"
          >
            {language === 'ta' ? 'வடிகட்டிகளை மீட்டமை' : 'Reset Filters'}
          </button>
        )}
      </div>

      {/* Pest Cards Grid */}
      {filteredPests.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-stone-300 space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
            <Bug className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-stone-700">
            {language === 'ta' ? 'பூச்சிகள் எதுவும் கிடைக்கவில்லை' : 'No Pests Found'}
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            {language === 'ta'
              ? 'உங்கள் தேடல் சொல்லை மாற்றி மீண்டும் முயற்சிக்கவும்.'
              : 'Try searching with a different pest name, botanical plant, or clearing active filters.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPests.map(pest => (
            <div
              key={pest.id}
              onClick={() => {
                setSelectedPest(pest);
                setActiveTab('overview');
              }}
              className="bg-white rounded-2xl border border-stone-200 hover:border-[#2E8B57] hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col group cursor-pointer"
            >
              {/* Image & Badges */}
              <div className="relative h-44 bg-stone-100 overflow-hidden">
                <img
                  src={pest.imageUrl}
                  alt={pest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {getSeverityBadge(pest.severity)}
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-white/90 text-stone-800 backdrop-blur-xs shadow-xs">
                    {pest.category}
                  </span>
                </div>

                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white">
                  <span className="text-xs font-mono italic opacity-90 truncate">
                    {pest.scientificName}
                  </span>
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      speakName(pest.name, 'en-US');
                    }}
                    className="p-1 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-xs transition-colors"
                    title="Pronounce"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-[#183B2A] group-hover:text-[#2E8B57] transition-colors flex items-center justify-between">
                    <span>{pest.name}</span>
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                  </h3>
                  <p className="text-xs font-semibold text-emerald-800">
                    {pest.nameTa}
                  </p>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {language === 'ta' && pest.shortDescriptionTa
                      ? pest.shortDescriptionTa
                      : pest.shortDescription}
                  </p>
                </div>

                {/* Affected Plants */}
                <div className="pt-2 border-t border-stone-100 space-y-1.5">
                  <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                    {language === 'ta' ? 'தாக்கப்படும் பயிர்கள்:' : 'Common Hosts:'}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {pest.affectedPlants.slice(0, 4).map((plant, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[11px] bg-stone-100 text-stone-700 font-medium"
                      >
                        {plant}
                      </span>
                    ))}
                    {pest.affectedPlants.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-stone-100 text-stone-500 font-medium">
                        +{pest.affectedPlants.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Primary Organic Weapon Teaser */}
                <div className="pt-2 text-xs bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100 text-emerald-900 flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-[11px] line-clamp-1 font-medium">
                    {language === 'ta' && pest.saferBiologicalControlsTa?.[0]
                      ? pest.saferBiologicalControlsTa[0]
                      : pest.saferBiologicalControls[0] || 'Organic Neem emulsion'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Comprehensive Modal */}
      {selectedPest && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          <div
            className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] animate-scale-up"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative bg-[#174D35] text-white p-6 md:p-8 flex-shrink-0">
              <button
                type="button"
                onClick={() => setSelectedPest(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-wrap items-center gap-2 mb-3">
                {getSeverityBadge(selectedPest.severity)}
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
                  {selectedPest.category}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-black font-serif text-white flex items-center gap-2">
                <span>{selectedPest.name}</span>
                <button
                  type="button"
                  onClick={() => speakName(selectedPest.name, 'en-US')}
                  className="p-1 rounded-full hover:bg-white/10 text-emerald-300"
                  title="Pronounce"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </h2>
              <div className="text-emerald-200 font-medium text-sm md:text-base mt-0.5">
                {selectedPest.nameTa}
              </div>
              <div className="text-xs font-mono italic text-emerald-300/80 mt-1">
                {selectedPest.scientificName}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-stone-200 bg-stone-50 px-6 gap-2 flex-shrink-0 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`py-3 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-[#174D35] text-[#174D35]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {language === 'ta' ? 'அறிமுகம் & அறிகுறிகள்' : 'Symptoms & ID'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('bio')}
                className={`py-3 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'bio'
                    ? 'border-[#174D35] text-[#174D35]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {language === 'ta' ? 'உயிரியல் கட்டுப்பாடு (Bio-Control)' : 'Bio-Controls'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('mechanical')}
                className={`py-3 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'mechanical'
                    ? 'border-[#174D35] text-[#174D35]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {language === 'ta' ? 'இயந்திர & தற்காப்பு முறைகள்' : 'Mechanical & Traps'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('hazards')}
                className={`py-3 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'hazards'
                    ? 'border-red-600 text-red-700'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {language === 'ta' ? 'ரசாயன எச்சரிக்கை' : 'Chemical Hazards'}
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
              {/* Tab 1: Overview & Symptoms */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Image and ID marks */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                    <img
                      src={selectedPest.imageUrl}
                      alt={selectedPest.name}
                      className="rounded-2xl h-48 w-full object-cover border border-stone-200 shadow-xs"
                    />
                    <div className="space-y-3">
                      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                        <span className="font-bold text-amber-900 block mb-1">
                          {language === 'ta' ? 'அடையாளக் குறிகள்:' : 'Identification Marks:'}
                        </span>
                        <p className="text-amber-800 leading-relaxed">
                          {language === 'ta' && selectedPest.identificationMarksTa
                            ? selectedPest.identificationMarksTa
                            : selectedPest.identificationMarks}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs">
                        <span className="font-bold text-blue-900 block mb-1">
                          {language === 'ta' ? 'வாழ்க்கைச் சுழற்சி:' : 'Life Cycle Speed:'}
                        </span>
                        <p className="text-blue-800 leading-relaxed">
                          {language === 'ta' && selectedPest.lifeCycleTa
                            ? selectedPest.lifeCycleTa
                            : selectedPest.lifeCycle}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Damage Symptoms */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-[#183B2A] flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      {language === 'ta' ? 'தாக்குதல் அறிகுறிகள் (Damage Symptoms)' : 'Clinical Damage Symptoms'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {selectedPest.symptoms.map((sym, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                          <span>
                            {language === 'ta' && selectedPest.symptomsTa?.[idx]
                              ? selectedPest.symptomsTa[idx]
                              : sym}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Common Hosts */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                      {language === 'ta' ? 'அதிகம் பாதிக்கப்படும் தாவரங்கள்:' : 'Vulnerable Host Plants:'}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPest.affectedPlants.map((plant, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-xs bg-emerald-50 text-emerald-800 font-medium border border-emerald-200"
                        >
                          {plant}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Bio Controls */}
              {activeTab === 'bio' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-sm mb-0.5">
                        {language === 'ta'
                          ? 'இயற்கை நட்பு பூச்சிக்கட்டுப்பாடு முறைகள்'
                          : 'Safer Eco-Friendly & Predatory Biological Controls'}
                      </span>
                      <p className="text-emerald-800">
                        {language === 'ta'
                          ? 'இம்முறைகள் நன்மை செய்யும் தேனீக்கள், மகரந்தச் சேர்க்கை பூச்சிகள் மற்றும் மனிதர்களுக்கு எந்த தீங்கும் விளைவிக்காது.'
                          : 'These biological controls target the pest specifically without killing pollinators, earthworms, or leaving toxic chemical residues on your vegetables and fruits.'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {selectedPest.saferBiologicalControls.map((bio, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-[#F5FAF5] border border-emerald-200/80 flex items-start gap-3 shadow-xs"
                      >
                        <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 mt-0.5 shrink-0">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div className="space-y-1">
                          <h5 className="text-xs font-bold text-[#183B2A]">
                            {language === 'ta' ? `இயற்கை தீர்வு ${idx + 1}` : `Bio-Remedy #${idx + 1}`}
                          </h5>
                          <p className="text-xs md:text-sm text-stone-700 leading-relaxed">
                            {language === 'ta' && selectedPest.saferBiologicalControlsTa?.[idx]
                              ? selectedPest.saferBiologicalControlsTa[idx]
                              : bio}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Mechanical & Prevention */}
              {activeTab === 'mechanical' && (
                <div className="space-y-5">
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-[#183B2A] flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-blue-600" />
                      {language === 'ta' ? 'இயந்திர / நேரடி தடுப்பு வழிகள்' : 'Mechanical Removal & Physical Traps'}
                    </h4>
                    <div className="space-y-2.5">
                      {selectedPest.physicalRemoval.map((mech, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 flex items-start gap-2.5"
                        >
                          <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <p className="leading-relaxed">
                            {language === 'ta' && selectedPest.physicalRemovalTa?.[idx]
                              ? selectedPest.physicalRemovalTa[idx]
                              : mech}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-stone-100">
                    <h4 className="text-sm font-bold text-[#183B2A] flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-[#2E8B57]" />
                      {language === 'ta' ? 'நீண்ட கால தடுப்பு நுட்பங்கள்' : 'Proactive Garden Prevention'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {selectedPest.prevention.map((prev, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs text-emerald-950 flex items-start gap-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>
                            {language === 'ta' && selectedPest.preventionTa?.[idx]
                              ? selectedPest.preventionTa[idx]
                              : prev}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Chemical Hazards */}
              {activeTab === 'hazards' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-900 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm text-red-800">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      {language === 'ta'
                        ? 'ரசாயன பூச்சிக்கொல்லி ஆபத்து எச்சரிக்கை'
                        : 'Chemical Toxicity & Ecological Warning'}
                    </div>
                    <p className="leading-relaxed text-red-800">
                      {language === 'ta' && selectedPest.chemicalWarningsTa
                        ? selectedPest.chemicalWarningsTa
                        : selectedPest.chemicalWarnings}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
                    <span className="font-bold text-amber-900 block">
                      {language === 'ta'
                        ? 'ஏன் ரசாயன தெளிப்பை தவிர்க்க வேண்டும்?'
                        : 'Why synthetic pyrethroids & organophosphates fail long-term:'}
                    </span>
                    <ul className="list-disc pl-5 space-y-1 text-amber-800">
                      <li>
                        {language === 'ta'
                          ? 'நன்மை செய்யும் பூச்சிகளான தேனீக்கள் மற்றும் பொறிவண்டுகளை கொன்றுவிடுகிறது.'
                          : 'Eliminates 95% of beneficial natural predators (spiders, ladybirds, hoverflies), triggering secondary pest flare-ups.'}
                      </li>
                      <li>
                        {language === 'ta'
                          ? 'பூச்சிகள் மிக விரைவாக மருந்துகளுக்கு எதிர்ப்புத் திறனை (Pest Resistance) உருவாக்குகின்றன.'
                          : 'Rapidly induces genetic insecticide resistance within 2-3 pest generations.'}
                      </li>
                      <li>
                        {language === 'ta'
                          ? 'காய்கறிகள் மற்றும் கீரைகளில் நச்சு எச்சங்கள் தங்கி மனித உடலுக்கு கேடு விளைவிக்கும்.'
                          : 'Leaves carcinogenic and endocrine-disrupting residues on home-grown edible greens and fruits.'}
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="p-5 border-t border-stone-200 bg-stone-50 flex items-center justify-between flex-shrink-0">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-stone-500" />
                {language === 'ta' ? 'அச்சிடு / சேமி' : 'Print Protocol'}
              </button>

              <div className="flex items-center gap-2">
                {onOpenDoctor && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPest(null);
                      onOpenDoctor();
                    }}
                    className="px-4 py-2 rounded-xl bg-[#174D35] hover:bg-[#2E8B57] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Stethoscope className="w-3.5 h-3.5" />
                    {language === 'ta' ? 'AI டாக்டரிடம் கேள்' : 'Consult AI Doctor'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedPest(null)}
                  className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-semibold transition-all cursor-pointer"
                >
                  {language === 'ta' ? 'மூடு' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PestEncyclopediaPage;
