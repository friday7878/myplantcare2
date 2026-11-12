import React, { useState } from 'react';
import { X, ArrowRightLeft, Droplets, Sun, ShieldAlert, Sprout, Check, Layers, Sparkles, Plus } from 'lucide-react';
import { Language, LibraryPlant } from '../types';
import { PLANT_LIBRARY } from '../data/plantLibrary';

interface PlantComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  initialPlantId?: string;
  onAddPlantToGarden?: (plant: LibraryPlant) => void;
}

export default function PlantComparisonModal({
  isOpen,
  onClose,
  language,
  initialPlantId,
  onAddPlantToGarden
}: PlantComparisonModalProps) {
  const [selectedPlantId1, setSelectedPlantId1] = useState<string>(initialPlantId || 'money-plant');
  const [selectedPlantId2, setSelectedPlantId2] = useState<string>('snake-plant');
  const [selectedPlantId3, setSelectedPlantId3] = useState<string>('peace-lily');
  const [showThirdPlant, setShowThirdPlant] = useState(false);

  if (!isOpen) return null;

  const plant1 = PLANT_LIBRARY.find((p) => p.id === selectedPlantId1) || PLANT_LIBRARY[0];
  const plant2 = PLANT_LIBRARY.find((p) => p.id === selectedPlantId2) || PLANT_LIBRARY[1];
  const plant3 = PLANT_LIBRARY.find((p) => p.id === selectedPlantId3) || PLANT_LIBRARY[2];

  const activePlants = showThirdPlant ? [plant1, plant2, plant3] : [plant1, plant2];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-emerald-100 dark:border-stone-800 overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-emerald-800 to-teal-800 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
              <ArrowRightLeft className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif flex items-center gap-2">
                {language === 'ta' ? 'தாவர ஒப்பீட்டுக் கருவி' : 'Plant Comparison Matrix'}
                <span className="px-2 py-0.5 text-xs bg-emerald-500/30 text-emerald-200 rounded-full font-sans font-medium border border-emerald-400/30">
                  Side-by-Side
                </span>
              </h2>
              <p className="text-xs text-emerald-200/90">
                {language === 'ta' ? 'தண்ணீர், வெளிச்சம், செல்லப்பிராணி பாதுகாப்பு ஆகியவற்றை ஒப்பிடுங்கள்' : 'Compare botanical specs, sunlight, pet safety, and difficulty'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowThirdPlant(!showThirdPlant)}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-semibold rounded-xl text-emerald-100 transition-colors"
            >
              {showThirdPlant ? (language === 'ta' ? '2 தாவரங்கள் மட்டும்' : '2 Plants') : (language === 'ta' ? '+ 3வது தாவரம் சேர்' : '+ Add 3rd Plant')}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {/* Selectors Bar */}
          <div className={`grid ${showThirdPlant ? 'grid-cols-3' : 'grid-cols-2'} gap-4 mb-6`}>
            {/* Plant 1 selector */}
            <div>
              <label className="block text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1.5">
                {language === 'ta' ? 'தாவரம் 1' : 'Plant 1'}
              </label>
              <select
                value={selectedPlantId1}
                onChange={(e) => setSelectedPlantId1(e.target.value)}
                className="w-full px-3 py-2 text-sm font-semibold rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:ring-2 focus:ring-emerald-500"
              >
                {PLANT_LIBRARY.map((p) => (
                  <option key={p.id} value={p.id}>
                    {language === 'ta' && p.nameTa ? p.nameTa : p.name} ({p.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Plant 2 selector */}
            <div>
              <label className="block text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1.5">
                {language === 'ta' ? 'தாவரம் 2' : 'Plant 2'}
              </label>
              <select
                value={selectedPlantId2}
                onChange={(e) => setSelectedPlantId2(e.target.value)}
                className="w-full px-3 py-2 text-sm font-semibold rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:ring-2 focus:ring-emerald-500"
              >
                {PLANT_LIBRARY.map((p) => (
                  <option key={p.id} value={p.id}>
                    {language === 'ta' && p.nameTa ? p.nameTa : p.name} ({p.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Plant 3 selector */}
            {showThirdPlant && (
              <div>
                <label className="block text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1.5">
                  {language === 'ta' ? 'தாவரம் 3' : 'Plant 3'}
                </label>
                <select
                  value={selectedPlantId3}
                  onChange={(e) => setSelectedPlantId3(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-semibold rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:ring-2 focus:ring-emerald-500"
                >
                  {PLANT_LIBRARY.map((p) => (
                    <option key={p.id} value={p.id}>
                      {language === 'ta' && p.nameTa ? p.nameTa : p.name} ({p.category})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Plant Card Previews */}
          <div className={`grid ${showThirdPlant ? 'grid-cols-3' : 'grid-cols-2'} gap-4 mb-8`}>
            {activePlants.map((plant) => (
              <div key={plant.id} className="relative rounded-2xl overflow-hidden border border-emerald-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60 p-4 flex flex-col justify-between">
                <div>
                  <div className="w-full h-40 rounded-xl overflow-hidden mb-3">
                    <img src={plant.photoUrl} alt={plant.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                    {language === 'ta' && plant.categoryTa ? plant.categoryTa : plant.category}
                  </span>
                  <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100 mt-1">
                    {language === 'ta' && plant.nameTa ? plant.nameTa : plant.name}
                  </h3>
                  <p className="text-xs italic text-stone-500 dark:text-stone-400 mb-2">
                    {plant.scientificName}
                  </p>
                  <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2">
                    {language === 'ta' && plant.descriptionTa ? plant.descriptionTa : plant.description}
                  </p>
                </div>
                {onAddPlantToGarden && (
                  <button
                    onClick={() => onAddPlantToGarden(plant)}
                    className="mt-4 flex items-center justify-center gap-1.5 w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    {language === 'ta' ? 'தோட்டத்தில் சேர்' : 'Add to Garden'}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Detailed Metric Comparison Grid */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider">
              {language === 'ta' ? 'முக்கிய ஒப்பீட்டு காரணிகள்' : 'Key Botanical Metrics'}
            </h4>

            {/* Row 1: Watering */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-400 mb-2">
                <Droplets className="w-4 h-4" />
                {language === 'ta' ? 'நீர்ப்பாசன இடைவெளி & குறிப்பு' : 'Watering Frequency & Tips'}
              </div>
              <div className={`grid ${showThirdPlant ? 'grid-cols-3' : 'grid-cols-2'} gap-4`}>
                {activePlants.map((plant) => (
                  <div key={plant.id}>
                    <p className="text-sm font-bold text-stone-900 dark:text-stone-100">
                      {language === 'ta' ? `${plant.wateringDays} நாட்களுக்கு ஒருமுறை` : `Every ${plant.wateringDays} days`}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      {language === 'ta' && plant.wateringAdviceTa ? plant.wateringAdviceTa : plant.wateringAdvice}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Sunlight */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 mb-2">
                <Sun className="w-4 h-4" />
                {language === 'ta' ? 'சூரிய ஒளி தேவை' : 'Sunlight Requirement'}
              </div>
              <div className={`grid ${showThirdPlant ? 'grid-cols-3' : 'grid-cols-2'} gap-4`}>
                {activePlants.map((plant) => (
                  <div key={plant.id}>
                    <p className="text-sm font-bold text-stone-900 dark:text-stone-100">
                      {plant.sunlight}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      {language === 'ta' && plant.sunlightAdviceTa ? plant.sunlightAdviceTa : plant.sunlightAdvice}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 3: Pet Toxicity */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-700 dark:text-purple-400 mb-2">
                <ShieldAlert className="w-4 h-4" />
                {language === 'ta' ? 'செல்லப்பிராணி நச்சுத்தன்மை' : 'Pet Toxicity Status'}
              </div>
              <div className={`grid ${showThirdPlant ? 'grid-cols-3' : 'grid-cols-2'} gap-4`}>
                {activePlants.map((plant) => (
                  <div key={plant.id}>
                    <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-lg ${
                      plant.petToxicity === 'Safe for Pets'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                    }`}>
                      {plant.petToxicity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 4: Soil & pH */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                {language === 'ta' ? 'மண் வகை & pH அளவு' : 'Soil Composition & Ideal pH'}
              </div>
              <div className={`grid ${showThirdPlant ? 'grid-cols-3' : 'grid-cols-2'} gap-4`}>
                {activePlants.map((plant) => (
                  <div key={plant.id}>
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      pH: {plant.soilPh || '6.0 - 7.0'}
                    </p>
                    <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                      {language === 'ta' && plant.soilTypeTa ? plant.soilTypeTa : plant.soilType}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 5: Size & Difficulty */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
                <Sprout className="w-4 h-4 text-emerald-600" />
                {language === 'ta' ? 'வளர்ச்சி அளவு & பராமரிப்பு நிலை' : 'Mature Size & Care Difficulty'}
              </div>
              <div className={`grid ${showThirdPlant ? 'grid-cols-3' : 'grid-cols-2'} gap-4`}>
                {activePlants.map((plant) => (
                  <div key={plant.id}>
                    <p className="text-xs font-bold text-stone-800 dark:text-stone-200">
                      {language === 'ta' ? 'வளர்ச்சி:' : 'Size:'} {plant.matureSize || 'Medium'}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      {language === 'ta' ? 'நிலை:' : 'Difficulty:'} <span className="font-semibold text-emerald-700 dark:text-emerald-400">{plant.difficulty}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
