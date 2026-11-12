import React, { useState, useMemo } from 'react';
import { X, Droplets, Sun, Sparkles, AlertCircle, Clock, Thermometer, Wind, RefreshCw } from 'lucide-react';
import { Language } from '../types';
import PlantyMascot from './PlantyMascot';

interface WaterCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export default function WaterCalculatorModal({
  isOpen,
  onClose,
  language
}: WaterCalculatorModalProps) {
  const [potSizeInches, setPotSizeInches] = useState<number>(8);
  const [potMaterial, setPotMaterial] = useState<'terracotta' | 'plastic' | 'ceramic' | 'growbag'>('terracotta');
  const [plantType, setPlantType] = useState<'foliage' | 'succulent' | 'vegetable' | 'flowering' | 'tree'>('foliage');
  const [temperatureTier, setTemperatureTier] = useState<'cool' | 'moderate' | 'hot'>('moderate');
  const [sunlightExposure, setSunlightExposure] = useState<'low' | 'indirect' | 'morning' | 'full'>('indirect');
  const [season, setSeason] = useState<'summer' | 'monsoon' | 'winter' | 'spring'>('summer');

  if (!isOpen) return null;

  // Calculation algorithm based on horticulture physics
  const calculation = useMemo(() => {
    // Base volume in ml based on pot volume approximation: V = pi * r^2 * h
    const radiusCm = (potSizeInches * 2.54) / 2;
    const heightCm = potSizeInches * 2.54 * 0.9;
    const potVolumeLitres = (Math.PI * radiusCm * radiusCm * heightCm) / 1000;

    // Typical saturation watering amount is ~25% of pot volume
    let baseWaterMl = Math.round(potVolumeLitres * 250);

    // Adjust by plant type
    let plantMultiplier = 1.0;
    if (plantType === 'succulent') plantMultiplier = 0.45;
    else if (plantType === 'vegetable') plantMultiplier = 1.35;
    else if (plantType === 'flowering') plantMultiplier = 1.15;
    else if (plantType === 'tree') plantMultiplier = 1.4;

    // Adjust by pot material (Terracotta breathes and dries 30% faster)
    let materialMultiplier = 1.0;
    let daysMultiplier = 1.0;
    if (potMaterial === 'terracotta') {
      materialMultiplier = 1.15;
      daysMultiplier = 0.75; // Needs water sooner
    } else if (potMaterial === 'plastic') {
      materialMultiplier = 0.9;
      daysMultiplier = 1.25; // Holds water longer
    } else if (potMaterial === 'ceramic') {
      materialMultiplier = 0.95;
      daysMultiplier = 1.15;
    } else if (potMaterial === 'growbag') {
      materialMultiplier = 1.2;
      daysMultiplier = 0.8;
    }

    // Adjust by climate / temperature
    let tempMultiplier = 1.0;
    if (temperatureTier === 'hot') {
      tempMultiplier = 1.25;
      daysMultiplier *= 0.7;
    } else if (temperatureTier === 'cool') {
      tempMultiplier = 0.8;
      daysMultiplier *= 1.4;
    }

    // Adjust by sun
    if (sunlightExposure === 'full') {
      tempMultiplier *= 1.2;
      daysMultiplier *= 0.8;
    } else if (sunlightExposure === 'low') {
      tempMultiplier *= 0.75;
      daysMultiplier *= 1.4;
    }

    // Adjust by season
    if (season === 'monsoon') {
      daysMultiplier *= 1.6;
    } else if (season === 'summer') {
      daysMultiplier *= 0.75;
    }

    const finalWaterMl = Math.round(baseWaterMl * plantMultiplier * materialMultiplier * tempMultiplier);
    // Base frequency
    let baseDays = 4;
    if (plantType === 'succulent') baseDays = 12;
    if (plantType === 'vegetable') baseDays = 2;
    if (plantType === 'tree') baseDays = 5;

    const finalDays = Math.max(1, Math.round(baseDays * daysMultiplier));
    const cups = (finalWaterMl / 240).toFixed(1);

    return {
      waterMl: Math.max(100, Math.round(finalWaterMl / 25) * 25),
      cups,
      frequencyDays: finalDays,
      bestTime: temperatureTier === 'hot' ? 'Early morning before 8:00 AM' : 'Morning 7:00 AM - 9:30 AM',
      bestTimeTa: temperatureTier === 'hot' ? 'காலை 8:00 மணிக்குள் வெயில் ஏறும் முன்' : 'காலை 7:00 முதல் 9:30 மணிக்குள்'
    };
  }, [potSizeInches, potMaterial, plantType, temperatureTier, sunlightExposure, season]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-emerald-100 dark:border-stone-800 overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-emerald-800 to-teal-800 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
              <Droplets className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif flex items-center gap-2">
                {language === 'ta' ? 'அறிவார்ந்த நீர் கணக்கீட்டுக் கருவி' : 'Smart Water Calculator'}
                <span className="px-2 py-0.5 text-xs bg-emerald-500/30 text-emerald-200 rounded-full font-sans font-medium border border-emerald-400/30">
                  Precision Hydration
                </span>
              </h2>
              <p className="text-xs text-emerald-200/90">
                {language === 'ta' ? 'தொட்டி அளவு மற்றும் வெப்பநிலைக்கு ஏற்ப துல்லியமான நீர் அளவு' : 'Calculates exact ml/day based on pot volume, material & weather'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          {/* Inputs Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Pot Size */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center justify-between">
                <span>{language === 'ta' ? 'தொட்டி விட்டம் (அங்குலம்)' : 'Pot Diameter'}</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-extrabold">{potSizeInches} inches</span>
              </label>
              <input
                type="range"
                min="4"
                max="24"
                step="2"
                value={potSizeInches}
                onChange={(e) => setPotSizeInches(Number(e.target.value))}
                className="w-full accent-emerald-700 h-2 bg-stone-200 dark:bg-stone-700 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400">
                <span>4" (Small)</span>
                <span>10" (Medium)</span>
                <span>16" (Large)</span>
                <span>24" (Tub)</span>
              </div>
            </div>

            {/* 2. Pot Material */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                {language === 'ta' ? 'தொட்டி பொருள்' : 'Pot Material'}
              </label>
              <select
                value={potMaterial}
                onChange={(e: any) => setPotMaterial(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="terracotta">{language === 'ta' ? 'சுடுமண் தொட்டி (Terracotta)' : 'Unglazed Terracotta (Porous)'}</option>
                <option value="plastic">{language === 'ta' ? 'பிளாஸ்டிக் தொட்டி (Plastic)' : 'Plastic / PVC (Retentive)'}</option>
                <option value="ceramic">{language === 'ta' ? 'பீங்கான் தொட்டி (Glazed Ceramic)' : 'Glazed Ceramic'}</option>
                <option value="growbag">{language === 'ta' ? 'துணி / பிளாஸ்டிக் குரோ பேக் (Grow Bag)' : 'Fabric / Poly Grow Bag'}</option>
              </select>
            </div>

            {/* 3. Plant Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                {language === 'ta' ? 'தாவர வகை' : 'Plant Category'}
              </label>
              <select
                value={plantType}
                onChange={(e: any) => setPlantType(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="foliage">{language === 'ta' ? 'இலை அழகுத் தாவரம் (Foliage/Aroid)' : 'Tropical Foliage / Aroid'}</option>
                <option value="succulent">{language === 'ta' ? 'கற்றாழை & சதைப்பற்று (Succulent/Cactus)' : 'Succulent / Cactus'}</option>
                <option value="vegetable">{language === 'ta' ? 'காய்கறி & கீரை (Vegetables)' : 'Vegetable & Greens'}</option>
                <option value="flowering">{language === 'ta' ? 'பூக்கும் தாவரம் (Flowering)' : 'Flowering Shrub'}</option>
                <option value="tree">{language === 'ta' ? 'பழ மரம் / வெளிப்புற மரம் (Tree/Bonsai)' : 'Fruit Tree / Bonsai'}</option>
              </select>
            </div>

            {/* 4. Temperature */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                {language === 'ta' ? 'சுற்றுப்புற வெப்பநிலை' : 'Ambient Temperature'}
              </label>
              <select
                value={temperatureTier}
                onChange={(e: any) => setTemperatureTier(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="cool">{language === 'ta' ? 'குளிர்ச்சியானது (< 20°C)' : 'Cool (< 20°C / AC Rooms)'}</option>
                <option value="moderate">{language === 'ta' ? 'மிதமானது (20°C - 30°C)' : 'Pleasant / Moderate (20°C - 30°C)'}</option>
                <option value="hot">{language === 'ta' ? 'சூடானது / அனல் (> 30°C)' : 'Hot Tropical (> 30°C / Direct Summer)'}</option>
              </select>
            </div>

            {/* 5. Sunlight */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                {language === 'ta' ? 'சூரிய ஒளி அளவு' : 'Sun Exposure'}
              </label>
              <select
                value={sunlightExposure}
                onChange={(e: any) => setSunlightExposure(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="low">{language === 'ta' ? 'குறைந்த வெளிச்சம் / நிழல்' : 'Low Light / Deep Shade'}</option>
                <option value="indirect">{language === 'ta' ? 'பிரகாசமான மறைமுக ஒளி' : 'Bright Indirect Light'}</option>
                <option value="morning">{language === 'ta' ? 'காலை இளம் வெயில்' : 'Morning Gentle Sun (2-4 hrs)'}</option>
                <option value="full">{language === 'ta' ? 'முழு நேரடி வெயில்' : 'Full Direct Hot Sun (6+ hrs)'}</option>
              </select>
            </div>

            {/* 6. Season */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                {language === 'ta' ? 'தற்போதைய பருவகாலம்' : 'Current Season'}
              </label>
              <select
                value={season}
                onChange={(e: any) => setSeason(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="summer">{language === 'ta' ? 'கோடை காலம் (Summer)' : 'Summer (Peak Evaporation)'}</option>
                <option value="monsoon">{language === 'ta' ? 'மழைக்காலம் (Monsoon)' : 'Monsoon / Rainy (High Humidity)'}</option>
                <option value="winter">{language === 'ta' ? 'குளிர்காலம் (Winter)' : 'Winter (Dormancy / Low Thirst)'}</option>
                <option value="spring">{language === 'ta' ? 'வசந்த காலம் (Spring)' : 'Spring (Active Growth Flush)'}</option>
              </select>
            </div>
          </div>

          {/* Results Display Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/20">
              <div>
                <p className="text-xs font-semibold text-emerald-200 uppercase tracking-widest">
                  {language === 'ta' ? 'பரிந்துரைக்கப்பட்ட நீர் அளவு' : 'Calculated Dose per Watering'}
                </p>
                <div className="flex items-baseline gap-3 mt-1">
                  <h3 className="text-4xl font-extrabold font-serif tracking-tight">
                    {calculation.waterMl} <span className="text-xl font-normal">ml</span>
                  </h3>
                  <span className="text-sm text-emerald-200">
                    ≈ {calculation.cups} {language === 'ta' ? 'குவளைகள் (Cups)' : 'standard cups'}
                  </span>
                </div>
              </div>

              <div className="sm:text-right">
                <p className="text-xs font-semibold text-emerald-200 uppercase tracking-widest">
                  {language === 'ta' ? 'நீர்ப்பாசன இடைவெளி' : 'Recommended Interval'}
                </p>
                <h3 className="text-3xl font-extrabold font-serif mt-1">
                  {language === 'ta' ? `${calculation.frequencyDays} நாட்களுக்கு ஒருமுறை` : `Every ${calculation.frequencyDays} days`}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 text-xs text-white/90">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">{language === 'ta' ? 'சிறந்த நேரம்:' : 'Optimal Time of Day:'}</strong>
                  {language === 'ta' ? calculation.bestTimeTa : calculation.bestTime}
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Thermometer className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">{language === 'ta' ? 'பருவக்கால விதி:' : 'Seasonal Golden Rule:'}</strong>
                  {season === 'monsoon' 
                    ? (language === 'ta' ? 'மழை நாட்களில் மண்ணை தொட்டுப் பார்த்து ஈரமாக இருந்தால் நீர் ஊற்ற வேண்டாம்.' : 'Skip watering during rainy overcast spells.')
                    : (language === 'ta' ? 'மேல் மண் 2 அங்குலம் உலர்ந்ததை உறுதி செய்து ஆழமாக நீர் பாய்ச்சவும்.' : 'Check top 2 inches of soil; soak thoroughly until water drips from drain holes.')}
                </div>
              </div>
            </div>
          </div>

          {/* Planty Mascot Note */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 dark:bg-stone-800/60 border border-emerald-100 dark:border-stone-700">
            <PlantyMascot mood="speaking" size="sm" animate />
            <p className="text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed font-medium">
              {language === 'ta' 
                ? 'பிளாண்டியின் ரகசியம்: "அதிகப்படியான நீர்ப்பாசனமே தாவரங்களின் முதல் எதிரி! தொட்டிக்கு அடியில் உள்ள துளையில் தண்ணீர் வெளியேறுவதை எப்போதும் உறுதி செய்யுங்கள்!"' 
                : 'PLANTY tip: "More houseplants die from overwatering than thirst! Always ensure drain holes are unobstructed and discard standing drainage water after 20 minutes."'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
