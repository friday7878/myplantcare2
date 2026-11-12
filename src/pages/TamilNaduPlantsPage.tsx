import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Search,
  Sparkles,
  Leaf,
  Flower2,
  HeartPulse,
  Apple,
  Trees,
  CheckCircle2,
  ChevronRight,
  X,
  Volume2,
  ShieldCheck,
  Calendar,
  Compass,
  ArrowRight
} from 'lucide-react';
import { Language, LibraryPlant } from '../types';
import { TAMIL_NADU_PLANTS } from '../data/plantLibrary';
import PlantyMascot from '../components/PlantyMascot';

interface TamilNaduPlantsPageProps {
  language: Language;
  onAddPlantToGarden?: (plant: LibraryPlant) => void;
  onOpenIdentifier?: () => void;
  onOpenDoctor?: () => void;
  onNavigate?: (page: string) => void;
}


export const TamilNaduPlantsPage: React.FC<TamilNaduPlantsPageProps> = ({
  language,
  onAddPlantToGarden,
  onOpenIdentifier,
  onOpenDoctor
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedPlant, setSelectedPlant] = useState<LibraryPlant | null>(null);
  const [addedPlantId, setAddedPlantId] = useState<string | null>(null);

  // Tamil Nadu Agro-Climatic Zones
  const zones = [
    { id: 'All', name: 'All Tamil Nadu', nameTa: 'அனைத்து மண்டலங்கள்' },
    { id: 'Delta', name: 'Cauvery Delta (Thanjavur, Trichy)', nameTa: 'காவிரி டெல்டா மண்டலம்' },
    { id: 'Kongu', name: 'Kongu Western Zone (Coimbatore, Erode, Salem)', nameTa: 'கொங்கு மேற்கு மண்டலம்' },
    { id: 'Southern', name: 'Pandiya Southern Zone (Madurai, Dindigul, Nellai)', nameTa: 'தென் பாண்டி மண்டலம்' },
    { id: 'Hills', name: 'Nilgiris & Eastern Ghats Hilly Zone', nameTa: 'நீலகிரி & மலைப்பகுதி' },
    { id: 'Coastal', name: 'Coromandel Coastal Zone (Chennai, Cuddalore)', nameTa: 'கடலோர மண்டலம்' }
  ];

  const categories = [
    { id: 'All', name: 'All Varieties', nameTa: 'அனைத்தும்' },
    { id: 'Trees', name: 'Native Trees', nameTa: 'பாரம்பரிய மரங்கள்', icon: Trees },
    { id: 'Medicinal', name: 'Siddha Medicinal', nameTa: 'சித்த மூலிகைகள்', icon: HeartPulse },
    { id: 'Vegetables', name: 'Greens & Crops', nameTa: 'நாட்டுக்காய்கறிகள் & கீரைகள்', icon: Leaf },
    { id: 'Flowering', name: 'GI Tag Flowers', nameTa: 'நறுமண மலர்கள்', icon: Flower2 },
    { id: 'Fruit', name: 'Heritage Fruits', nameTa: 'நாட்டுப் பழங்கள்', icon: Apple }
  ];

  const filteredPlants = useMemo(() => {
    return TAMIL_NADU_PLANTS.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.nameTa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.nativeRegion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchType = selectedType === 'All' || p.category === selectedType;

      let matchZone = true;
      if (selectedZone === 'Delta') {
        matchZone = p.nativeRegion.includes('Delta') || p.nativeRegion.includes('Cauvery') || p.nameTa.includes('வாழை');
      } else if (selectedZone === 'Kongu') {
        matchZone = p.nativeRegion.includes('Salem') || p.nativeRegion.includes('Erode') || p.nativeRegion.includes('Coimbatore') || p.nativeRegion.includes('Tiruppur');
      } else if (selectedZone === 'Southern') {
        matchZone = p.nativeRegion.includes('Madurai') || p.nativeRegion.includes('Dindigul') || p.nativeRegion.includes('Tirunelveli') || p.nativeRegion.includes('Coromandel');
      } else if (selectedZone === 'Hills') {
        matchZone = p.nativeRegion.includes('Hills') || p.nativeRegion.includes('Ghats') || p.nativeRegion.includes('Nilgiris');
      } else if (selectedZone === 'Coastal') {
        matchZone = p.nativeRegion.includes('Coastal') || p.nativeRegion.includes('Tamil Nadu Coastline') || p.nameTa.includes('பனை');
      }

      return matchSearch && matchType && matchZone;
    });
  }, [searchTerm, selectedType, selectedZone]);

  const handleAddPlant = (plant: LibraryPlant) => {
    if (onAddPlantToGarden) {
      onAddPlantToGarden(plant);
      setAddedPlantId(plant.id);
      setTimeout(() => setAddedPlantId(null), 2500);
    }
  };

  const speakTamilName = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ta-IN';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-8 pb-16 animate-fade-in text-[#183B2A]">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#174D35] via-[#1c5c3e] to-[#2E8B57] text-white p-8 md:p-12 shadow-2xl border border-[#A8DDB5]/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F4A340]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#A8DDB5]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#A8DDB5] text-xs font-bold tracking-wide">
              <Compass className="w-4 h-4 text-amber-300" />
              <span>{language === 'ta' ? 'தமிழ்நாடு பதிப்பு V3' : 'Tamil Nadu Edition v3.0'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif leading-tight">
              {language === 'ta'
                ? 'தமிழ்நாட்டின் பாரம்பரிய தாவரங்கள் & மூலிகைக் களஞ்சியம்'
                : 'Tamil Nadu Botanical Heritage & Native Flora'}
            </h1>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              {language === 'ta'
                ? 'பனைமரம், மதுரை மல்லிகை, கீழாநெல்லி, முடக்கத்தான், பன்னீர் திராட்சை உள்ளிட்ட 50+ பாரம்பரிய தமிழ்நாட்டு மரங்கள், சித்த மூலிகைகள், கீரைகள் மற்றும் நாட்டுப் பயிர்கள்.'
                : 'Authentic regional encyclopedia of Tamil Nadu native trees, Siddha Kaya Kalpa herbs, traditional greens, GI-tagged floriculture, and heritage agro-crops.'}
            </p>

            <div className="pt-2 flex flex-wrap gap-3 justify-center lg:justify-start">
              <span className="px-3.5 py-1.5 rounded-xl bg-white/15 text-white text-xs font-semibold backdrop-blur-xs flex items-center gap-1.5 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                {TAMIL_NADU_PLANTS.length} {language === 'ta' ? 'பாரம்பரிய ரகங்கள்' : 'Native Tamil Species'}
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white/15 text-white text-xs font-semibold backdrop-blur-xs flex items-center gap-1.5 border border-white/20">
                <HeartPulse className="w-3.5 h-3.5 text-rose-300" />
                {language === 'ta' ? 'சித்த மருத்துவ பயன்கள்' : 'Siddha Healing Profiles'}
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white/15 text-white text-xs font-semibold backdrop-blur-xs flex items-center gap-1.5 border border-white/20">
                <MapPin className="w-3.5 h-3.5 text-cyan-300" />
                {language === 'ta' ? '5 வேளாண் மண்டலங்கள்' : '5 Agro-Climatic Zones'}
              </span>
            </div>
          </div>

          <div className="flex-shrink-0 flex flex-col items-center">
            <PlantyMascot
              mood="welcome"
              size="lg"
              interactive
              message={
                language === 'ta'
                  ? 'வணக்கம்! தமிழ்நாட்டின் பாரம்பரிய பனைமரமும், மதுரை மல்லிகையும் நம் மண்ணின் பெருமை!'
                  : 'Vanakkam! Explore the pride of Tamil Nadu: from the sacred Palmyra Palm to the fragrant Madurai Malli!'
              }
              showSpeechBubble
            />
          </div>
        </div>
      </div>

      {/* Regional Agro-Climatic Zone Switcher */}
      <div className="p-6 rounded-3xl bg-white border border-[#A8DDB5]/40 shadow-sm space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E8B57] flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#2E8B57]" />
            {language === 'ta' ? 'தமிழ்நாடு வேளாண் காலநிலை மண்டலங்கள்' : 'Tamil Nadu Agro-Climatic Zones'}
          </span>
          <p className="text-xs text-stone-500 mt-0.5">
            {language === 'ta'
              ? 'உங்கள் பகுதிக்கேற்ற பாரம்பரிய பயிர்களையும் தாவரங்களையும் தேர்வு செய்ய மண்டலத்தை கிளிக் செய்யவும்.'
              : 'Filter native species by agro-ecological climate zone.'}
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {zones.map((zone) => (
            <button
              key={zone.id}
              type="button"
              onClick={() => setSelectedZone(zone.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedZone === zone.id
                  ? 'bg-[#174D35] text-white shadow-md'
                  : 'bg-[#F5FAF5] text-stone-700 hover:bg-stone-200 border border-[#A8DDB5]/40'
              }`}
            >
              {language === 'ta' ? zone.nameTa : zone.name}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="p-6 rounded-3xl bg-white border border-[#A8DDB5]/40 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'ta' ? 'தமிழ் பெயர், ஆங்கில பெயர் கொண்டு தேடுக...' : 'Search Tamil, English or botanical name...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#F5FAF5] border border-stone-200 focus:outline-none focus:border-[#2E8B57] text-sm text-[#183B2A]"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 w-full sm:w-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedType(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedType === cat.id
                    ? 'bg-[#2E8B57] text-white shadow-xs'
                    : 'bg-[#F5FAF5] text-stone-600 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                {language === 'ta' ? cat.nameTa : cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
          <span>
            {language === 'ta'
              ? `${filteredPlants.length} தமிழ்நாட்டு தாவரங்கள் கண்டறியப்பட்டன`
              : `Showing ${filteredPlants.length} of ${TAMIL_NADU_PLANTS.length} authentic Tamil Nadu plants`}
          </span>
          {(searchTerm || selectedZone !== 'All' || selectedType !== 'All') && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedZone('All');
                setSelectedType('All');
              }}
              className="text-[#2E8B57] font-semibold hover:underline cursor-pointer"
            >
              {language === 'ta' ? 'அனைத்தையும் மீட்டமை' : 'Reset filters'}
            </button>
          )}
        </div>
      </div>

      {/* Grid of Tamil Nadu Plants */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlants.map((plant) => (
          <div
            key={plant.id}
            onClick={() => setSelectedPlant(plant)}
            className="group rounded-3xl bg-white border border-[#A8DDB5]/50 hover:border-[#2E8B57] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
          >
            <div>
              {/* Image banner */}
              <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                <img
                  src={plant.photoUrl}
                  alt={plant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-[#174D35] shadow-xs">
                    {plant.categoryTa || plant.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/90 text-white text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-xs">
                    TN Heritage
                  </span>
                </div>

                {/* Pronounce button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakTamilName(plant.nameTa);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all cursor-pointer"
                  title="Listen to Tamil pronunciation"
                >
                  <Volume2 className="w-4 h-4 text-[#A8DDB5]" />
                </button>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-extrabold text-lg drop-shadow-sm font-serif">
                    {plant.nameTa}
                  </h3>
                  <p className="text-xs text-[#A8DDB5] font-mono">
                    {plant.commonName || plant.name} &bull; <span className="italic">{plant.scientificName}</span>
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <p className="text-xs text-[#183B2A] line-clamp-2 leading-relaxed">
                  {language === 'ta' ? plant.descriptionTa : plant.description}
                </p>

                {/* Regional badge */}
                <div className="flex items-center gap-1.5 text-[11px] text-[#2E8B57] font-semibold bg-[#F5FAF5] p-2 rounded-xl border border-[#A8DDB5]/40">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{plant.nativeRegion}</span>
                </div>

                {/* Quick specs */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 pt-1">
                  <div>
                    <span className="text-stone-400 block text-[10px]">{language === 'ta' ? 'நீர்ப்பாசனம்' : 'Watering'}:</span>
                    <strong className="text-[#174D35]">{plant.wateringDays} {language === 'ta' ? 'நாட்கள்' : 'Days'}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">{language === 'ta' ? 'சூரிய ஒளி' : 'Sunlight'}:</span>
                    <strong className="text-[#174D35] truncate block">{plant.sunlight}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-[#F5FAF5] border-t border-[#A8DDB5]/30 flex items-center justify-between">
              <span className="text-xs font-bold text-[#174D35] group-hover:text-[#2E8B57] flex items-center gap-1">
                <span>{language === 'ta' ? 'முழு விவரங்கள்' : 'Care Profile'}</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>

              {onAddPlantToGarden && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddPlant(plant);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    addedPlantId === plant.id
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white text-[#174D35] hover:bg-[#A8DDB5]/30 border border-[#A8DDB5]'
                  }`}
                >
                  {addedPlantId === plant.id ? <CheckCircle2 className="w-3.5 h-3.5 text-white" /> : <Leaf className="w-3.5 h-3.5" />}
                  <span>{addedPlantId === plant.id ? (language === 'ta' ? 'சேர்க்கப்பட்டது' : 'Added') : (language === 'ta' ? 'தோட்டத்தில் சேர்' : '+ My Garden')}</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Plant Modal */}
      {selectedPlant && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#A8DDB5] relative flex flex-col my-auto">
            {/* Header image banner */}
            <div className="relative h-56 w-full flex-shrink-0 overflow-hidden bg-[#174D35]">
              <img
                src={selectedPlant.photoUrl}
                alt={selectedPlant.name}
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />

              <button
                type="button"
                onClick={() => setSelectedPlant(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all cursor-pointer z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-stone-900 shadow-xs">
                    {selectedPlant.categoryTa || selectedPlant.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-black/50 text-[#A8DDB5] text-xs font-mono">
                    {selectedPlant.scientificName}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">
                    {selectedPlant.nameTa}
                  </h2>
                  <button
                    type="button"
                    onClick={() => speakTamilName(selectedPlant.nameTa)}
                    className="p-1.5 rounded-full bg-white/20 hover:bg-white/40 text-white cursor-pointer"
                    title="Pronounce Tamil Name"
                  >
                    <Volume2 className="w-4 h-4 text-[#A8DDB5]" />
                  </button>
                </div>
                <p className="text-xs text-white/80">{selectedPlant.commonName || selectedPlant.name}</p>
              </div>
            </div>

            {/* Content body */}
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  {language === 'ta' ? 'தாவர விவரிப்பு & கலாச்சார முக்கியத்துவம்' : 'Botanical & Cultural Significance'}
                </h4>
                <p className="text-sm md:text-base text-[#183B2A] mt-1.5 leading-relaxed">
                  {language === 'ta' ? selectedPlant.descriptionTa : selectedPlant.description}
                </p>
              </div>

              {/* Native Agro Region */}
              <div className="p-4 rounded-2xl bg-[#F5FAF5] border border-[#A8DDB5]/50 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#174D35]/10 text-[#174D35] mt-0.5">
                  <MapPin className="w-5 h-5 text-[#2E8B57]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-[#174D35]">
                    {language === 'ta' ? 'பிறப்பிடம் & வளரும் பகுதிகள்' : 'Native Tamil Nadu Region'}
                  </h4>
                  <p className="text-xs md:text-sm text-stone-700 mt-0.5">{selectedPlant.nativeRegion}</p>
                </div>
              </div>

              {/* Botanical Care Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">{language === 'ta' ? 'நீர்ப்பாசனம்' : 'Watering'}</span>
                  <strong className="text-[#174D35] text-sm">{selectedPlant.wateringDays} {language === 'ta' ? 'நாட்கள்' : 'Days'}</strong>
                  <p className="text-[10px] text-stone-500 mt-1 line-clamp-2">{selectedPlant.wateringAdviceTa || selectedPlant.wateringAdvice}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">{language === 'ta' ? 'சூரிய ஒளி' : 'Sunlight'}</span>
                  <strong className="text-[#174D35] text-sm">{selectedPlant.sunlight}</strong>
                  <p className="text-[10px] text-stone-500 mt-1 line-clamp-2">{selectedPlant.sunlightAdviceTa || selectedPlant.sunlightAdvice}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">{language === 'ta' ? 'மண் வகை' : 'Soil Mix'}</span>
                  <strong className="text-[#174D35] text-sm truncate block">{selectedPlant.soilType}</strong>
                  <p className="text-[10px] text-stone-500 mt-1 line-clamp-2">pH {selectedPlant.soilPh}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">{language === 'ta' ? 'வளர்ப்பு முறை' : 'Propagation'}</span>
                  <strong className="text-[#174D35] text-sm truncate block">{selectedPlant.propagationMethod}</strong>
                  <p className="text-[10px] text-stone-500 mt-1">{selectedPlant.difficulty} Care</p>
                </div>
              </div>

              {/* Care Instructions */}
              <div className="p-5 rounded-2xl bg-[#F5FAF5] border border-[#A8DDB5]/50 space-y-2.5">
                <h4 className="text-xs font-bold text-[#174D35] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#2E8B57]" />
                  {language === 'ta' ? 'பராமரிப்பு மற்றும் வளர்ப்பு குறிப்புகள்' : 'Cultivation & Harvesting Secrets'}
                </h4>
                <ul className="space-y-2">
                  {(language === 'ta' && selectedPlant.careInstructionsTa ? selectedPlant.careInstructionsTa : selectedPlant.careInstructions).map((inst, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-stone-700">
                      <span className="text-[#2E8B57] font-bold mt-0.5">•</span>
                      <span>{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common problems */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1">
                <span className="font-bold uppercase text-amber-900">{language === 'ta' ? 'எச்சரிக்கைகள் & பூச்சித் தாக்குதல்கள்:' : 'Vulnerabilities & Pests:'}</span>
                <p>{selectedPlant.commonProblems.join(', ')}</p>
              </div>
            </div>

            {/* Bottom Modal Actions */}
            <div className="p-5 border-t border-stone-200 bg-[#F5FAF5] rounded-b-3xl flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedPlant(null)}
                className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-semibold cursor-pointer"
              >
                {language === 'ta' ? 'மூடு' : 'Close'}
              </button>

              {onAddPlantToGarden && (
                <button
                  type="button"
                  onClick={() => {
                    handleAddPlant(selectedPlant);
                    setSelectedPlant(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#174D35] hover:bg-[#2E8B57] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Leaf className="w-4 h-4 text-[#A8DDB5]" />
                  <span>{language === 'ta' ? 'என் தோட்டத்தில் சேர்' : 'Add to My Garden'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TamilNaduPlantsPage;
