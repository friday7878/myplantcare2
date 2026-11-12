import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  Droplets,
  Sun,
  Sprout,
  Plus,
  X,
  ExternalLink,
  Thermometer,
  Sparkles,
  Check,
  Camera,
  ArrowRightLeft,
  ShieldAlert,
  Layers,
  Award
} from 'lucide-react';
import { PLANT_LIBRARY, ALL_CATEGORIES } from '../data/plantLibrary';
import { LibraryPlant, PlantCategory, Language, PetToxicity, SunlightType } from '../types';

interface PlantLibraryPageProps {
  onAddFromLibrary: (plant: LibraryPlant) => void;
  language: Language;
  onOpenIdentifier?: () => void;
  onOpenComparison?: (plantId?: string) => void;
  onOpenWaterCalculator?: () => void;
}

export const PlantLibraryPage: React.FC<PlantLibraryPageProps> = ({
  onAddFromLibrary,
  language,
  onOpenIdentifier,
  onOpenComparison,
  onOpenWaterCalculator
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedPetSafety, setSelectedPetSafety] = useState<string>('All');
  const [activeModalPlant, setActiveModalPlant] = useState<LibraryPlant | null>(null);
  const [addedPlantId, setAddedPlantId] = useState<string | null>(null);

  const categories: (PlantCategory | 'All')[] = ['All', ...ALL_CATEGORIES];

  const filteredPlants = PLANT_LIBRARY.filter((plant) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      plant.name.toLowerCase().includes(query) ||
      (plant.nameTa && plant.nameTa.toLowerCase().includes(query)) ||
      (plant.scientificName && plant.scientificName.toLowerCase().includes(query)) ||
      (plant.commonName && plant.commonName.toLowerCase().includes(query)) ||
      plant.category.toLowerCase().includes(query) ||
      (plant.description && plant.description.toLowerCase().includes(query));

    const matchesCategory = selectedCategory === 'All' || plant.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || plant.difficulty === selectedDifficulty;
    const matchesPetSafety = selectedPetSafety === 'All' || plant.petToxicity === selectedPetSafety;

    return matchesSearch && matchesCategory && matchesDifficulty && matchesPetSafety;
  });

  const handleAddClick = (plant: LibraryPlant, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onAddFromLibrary(plant);
    setAddedPlantId(plant.id);
    setTimeout(() => setAddedPlantId(null), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in text-[#183B2A] pb-12">
      {/* Header and Quick Action Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8ED] text-[#2E8B57] text-xs font-bold uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Botanical Encyclopedia 2.0</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#174D35] font-serif">
            {language === 'ta' ? 'தாவர நூலகம் (150+ இனங்கள்)' : 'Plant Library & Encyclopedia (150+ Species)'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mt-0.5">
            {language === 'ta'
              ? 'உட்புறம், மூலிகை, காய்கறி, பழங்கள், மரங்கள், கற்றாழை மற்றும் நீர்வாழ் தாவரங்களின் விரிவான அறிவியல் பராமரிப்பு ஆவணம்.'
              : 'Complete botanical guide across 10 categories with soil pH, pet toxicity, propagation, watering intervals & organic remedies.'}
          </p>
        </div>

        {/* Quick Launchers for AI tools */}
        <div className="flex flex-wrap items-center gap-2">
          {onOpenIdentifier && (
            <button
              onClick={onOpenIdentifier}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-700/20 transition-all hover:scale-105"
            >
              <Camera className="w-3.5 h-3.5 text-emerald-200" />
              <span>{language === 'ta' ? 'AI தாவர அடையாளங்காணி' : 'AI Plant Identifier'}</span>
            </button>
          )}

          {onOpenComparison && (
            <button
              onClick={() => onOpenComparison()}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[#A8DDB5] hover:border-[#2E8B57] text-[#174D35] rounded-xl text-xs font-bold shadow-2xs transition-all hover:bg-[#E8F8ED]"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-[#2E8B57]" />
              <span>{language === 'ta' ? 'ஒப்பீட்டுக் கருவி' : 'Compare Plants'}</span>
            </button>
          )}

          {onOpenWaterCalculator && (
            <button
              onClick={onOpenWaterCalculator}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-800 rounded-xl text-xs font-bold shadow-2xs transition-all"
            >
              <Droplets className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === 'ta' ? 'நீர் கணக்கீடு' : 'Water Calculator'}</span>
            </button>
          )}

          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white border border-[#A8DDB5] text-[#174D35] shrink-0 shadow-2xs">
            {filteredPlants.length} / {PLANT_LIBRARY.length} {language === 'ta' ? 'செடிகள்' : 'Species'}
          </span>
        </div>
      </div>

      {/* Search and Secondary Filters Bar */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'ta'
                  ? 'பெயர், தமிழ் பெயர், அறிவியல் பெயர் அல்லது பயன் கொண்டு தேடுக...'
                  : 'Search by plant name, Tamil name, scientific name or benefits...'
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#A8DDB5] bg-white text-xs sm:text-sm focus:border-[#2E8B57] focus:ring-2 focus:ring-[#A8DDB5]/40 outline-none shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Pet Safety Filter */}
            <select
              value={selectedPetSafety}
              onChange={(e) => setSelectedPetSafety(e.target.value)}
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-[#A8DDB5] bg-white text-stone-700 outline-none"
            >
              <option value="All">{language === 'ta' ? 'அனைத்து பாதுகாப்பு' : 'All Pet Safety'}</option>
              <option value="Safe for Pets">{language === 'ta' ? 'செல்லப்பிராணிகளுக்கு பாதுகாப்பானது' : 'Safe for Pets'}</option>
              <option value="Toxic to Cats/Dogs">{language === 'ta' ? 'நச்சுத்தன்மை கொண்டது' : 'Toxic to Cats/Dogs'}</option>
            </select>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-[#A8DDB5] bg-white text-stone-700 outline-none"
            >
              <option value="All">{language === 'ta' ? 'அனைத்து நிலை' : 'All Difficulties'}</option>
              <option value="Easy">{language === 'ta' ? 'எளிதானது (Easy)' : 'Easy'}</option>
              <option value="Moderate">{language === 'ta' ? 'மிதமானது (Moderate)' : 'Moderate'}</option>
              <option value="Challenging">{language === 'ta' ? 'கடினமானது (Challenging)' : 'Challenging'}</option>
            </select>
          </div>
        </div>

        {/* Category Horizontal Scrolling Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#174D35] text-white border-[#174D35] shadow-xs font-bold'
                  : 'bg-white text-gray-700 border-[#A8DDB5]/60 hover:border-[#2E8B57]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 150+ Plant Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPlants.map((plant) => (
          <div
            key={plant.id}
            onClick={() => setActiveModalPlant(plant)}
            className="group rounded-3xl bg-white border border-[#A8DDB5]/60 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <img
                src={plant.photoUrl}
                alt={plant.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[10px] font-bold text-[#174D35] shadow-xs">
                {language === 'ta' && plant.categoryTa ? plant.categoryTa : plant.category}
              </span>
              <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-md text-white text-[10px] font-bold ${
                plant.difficulty === 'Easy' ? 'bg-emerald-700' : 'bg-amber-600'
              }`}>
                {plant.difficulty}
              </span>
              {plant.petToxicity === 'Safe for Pets' && (
                <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-emerald-950/80 backdrop-blur-xs text-emerald-300 text-[10px] font-bold">
                  🐾 Safe
                </span>
              )}
            </div>

            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-[#174D35] group-hover:text-[#2E8B57] transition-colors truncate">
                  {language === 'ta' && plant.nameTa ? plant.nameTa : plant.name}
                </h3>
                <p className="text-xs text-gray-500 italic truncate">{plant.scientificName}</p>
                <p className="text-[11px] text-gray-600 line-clamp-2 mt-1.5 leading-snug">
                  {language === 'ta' && plant.descriptionTa ? plant.descriptionTa : plant.description}
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[#2E8B57]">
                    <Droplets className="w-3.5 h-3.5" />
                    {language === 'ta' ? `${plant.wateringDays} நாட்களுக்கு ஒருமுறை` : `Every ${plant.wateringDays} days`}
                  </span>
                  <span className="flex items-center gap-1 text-amber-600 truncate max-w-[120px]">
                    <Sun className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{plant.sunlight}</span>
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => handleAddClick(plant, e)}
                  disabled={addedPlantId === plant.id}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs ${
                    addedPlantId === plant.id
                      ? 'bg-[#2E8B57] text-white'
                      : 'bg-[#E8F8ED] text-[#174D35] hover:bg-[#174D35] hover:text-white'
                  }`}
                >
                  {addedPlantId === plant.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>{language === 'ta' ? 'சேர்க்கப்பட்டது!' : 'Added!'}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>{language === 'ta' ? 'தோட்டத்தில் சேர்' : 'Add to Garden'}</span>
                    </>
                  )}
                </button>
                {onOpenComparison && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenComparison(plant.id);
                    }}
                    title={language === 'ta' ? 'ஒப்பிடுக' : 'Compare'}
                    className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPlants.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-[#A8DDB5]/40 p-8">
          <BookOpen className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-stone-700">
            {language === 'ta' ? 'பொருந்தும் தாவரங்கள் எதுவும் கிடைக்கவில்லை' : 'No plants match your search'}
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            {language === 'ta' ? 'வடிப்பான்களை மாற்றவும் அல்லது வேறு பெயரைத் தேடவும்.' : 'Try adjusting your search keywords or resetting filters.'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedDifficulty('All');
              setSelectedPetSafety('All');
            }}
            className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold"
          >
            {language === 'ta' ? 'அனைத்தையும் மீட்டமை' : 'Reset All Filters'}
          </button>
        </div>
      )}

      {/* Expanded Plant Detail Modal */}
      {activeModalPlant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#A8DDB5] my-8 max-h-[90vh] flex flex-col">
            {/* Modal Image Header */}
            <div className="relative h-64 shrink-0 bg-stone-900">
              <img
                src={activeModalPlant.photoUrl}
                alt={activeModalPlant.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setActiveModalPlant(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="px-3 py-1 rounded-full bg-emerald-600/90 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
                  {language === 'ta' && activeModalPlant.categoryTa ? activeModalPlant.categoryTa : activeModalPlant.category}
                </span>
                <h3 className="text-2xl font-black mt-2 drop-shadow-md font-serif">
                  {language === 'ta' && activeModalPlant.nameTa ? activeModalPlant.nameTa : activeModalPlant.name}
                </h3>
                <p className="text-xs text-emerald-200 italic drop-shadow-xs">
                  {activeModalPlant.scientificName} • {activeModalPlant.commonName}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-stone-700">
              <p className="text-sm leading-relaxed text-stone-800">
                {language === 'ta' && activeModalPlant.descriptionTa ? activeModalPlant.descriptionTa : activeModalPlant.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100">
                  <div className="flex items-center gap-1.5 text-blue-700 font-bold mb-1">
                    <Droplets className="w-4 h-4" />
                    <span>{language === 'ta' ? 'நீர்ப்பாசனம்' : 'Watering'}</span>
                  </div>
                  <p className="font-bold text-stone-900">
                    {language === 'ta' ? `${activeModalPlant.wateringDays} நாட்களுக்கு ஒருமுறை` : `Every ${activeModalPlant.wateringDays} days`}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100">
                  <div className="flex items-center gap-1.5 text-amber-700 font-bold mb-1">
                    <Sun className="w-4 h-4" />
                    <span>{language === 'ta' ? 'சூரிய ஒளி' : 'Sunlight'}</span>
                  </div>
                  <p className="font-bold text-stone-900 truncate">{activeModalPlant.sunlight}</p>
                </div>

                <div className="p-3 rounded-2xl bg-purple-50 border border-purple-100">
                  <div className="flex items-center gap-1.5 text-purple-700 font-bold mb-1">
                    <ShieldAlert className="w-4 h-4" />
                    <span>{language === 'ta' ? 'பாதுகாப்பு' : 'Pet Safety'}</span>
                  </div>
                  <p className="font-bold text-stone-900 truncate">{activeModalPlant.petToxicity}</p>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold mb-1">
                    <Layers className="w-4 h-4" />
                    <span>{language === 'ta' ? 'மண் pH' : 'Soil pH'}</span>
                  </div>
                  <p className="font-bold text-stone-900">{activeModalPlant.soilPh || '6.0 - 7.0'}</p>
                </div>
              </div>

              {/* Botanical Details */}
              <div className="space-y-2 border-t border-stone-100 pt-3">
                <p><strong>{language === 'ta' ? 'நீர்ப்பாசன ஆலோசனை:' : 'Watering Advice:'}</strong> {language === 'ta' && activeModalPlant.wateringAdviceTa ? activeModalPlant.wateringAdviceTa : activeModalPlant.wateringAdvice}</p>
                <p><strong>{language === 'ta' ? 'உகந்த மண் வகை:' : 'Soil Blend:'}</strong> {language === 'ta' && activeModalPlant.soilTypeTa ? activeModalPlant.soilTypeTa : activeModalPlant.soilType}</p>
                <p><strong>{language === 'ta' ? 'இயற்கை உரம்:' : 'Fertilizer:'}</strong> {language === 'ta' && activeModalPlant.fertilizerTa ? activeModalPlant.fertilizerTa : activeModalPlant.fertilizer}</p>
                {activeModalPlant.matureSize && (
                  <p><strong>{language === 'ta' ? 'வளர்ச்சி அளவு:' : 'Mature Size:'}</strong> {activeModalPlant.matureSize}</p>
                )}
                {activeModalPlant.propagationMethod && (
                  <p><strong>{language === 'ta' ? 'இனப்பெருக்க முறை:' : 'Propagation Method:'}</strong> {activeModalPlant.propagationMethod}</p>
                )}
              </div>

              {/* Modal Action Buttons */}
              <div className="flex items-center gap-3 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => {
                    handleAddClick(activeModalPlant);
                    setActiveModalPlant(null);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>{language === 'ta' ? 'என் தோட்டத்தில் சேர்' : 'Add to My Garden'}</span>
                </button>
                {onOpenComparison && (
                  <button
                    type="button"
                    onClick={() => {
                      const id = activeModalPlant.id;
                      setActiveModalPlant(null);
                      onOpenComparison(id);
                    }}
                    className="py-3 px-4 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                    <span>{language === 'ta' ? 'ஒப்பிடுக' : 'Compare'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
