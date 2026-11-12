import React, { useState, useRef } from 'react';
import { 
  X, Camera, Upload, Sparkles, AlertCircle, CheckCircle2, 
  Droplets, Sun, Sprout, Heart, ShieldAlert, ArrowRight, RefreshCw, Plus
} from 'lucide-react';
import { Language, PlantCategory } from '../types';
import PlantyMascot from './PlantyMascot';

interface AiPlantIdentifierModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onAddPlantToGarden?: (plantData: any) => void;
  onOpenGlobalPage?: () => void;
}

export default function AiPlantIdentifierModal({
  isOpen,
  onClose,
  language,
  onAddPlantToGarden,
  onOpenGlobalPage
}: AiPlantIdentifierModalProps) {

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [userHint, setUserHint] = useState('');
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        setError(language === 'ta' ? 'படம் 15MB-க்கும் குறைவாக இருக்க வேண்டும்' : 'Image must be under 15MB');
        return;
      }
      setError(null);
      setResult(null);
      setAddedSuccess(false);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIdentify = async () => {
    if (!imagePreview) {
      setError(language === 'ta' ? 'தயவுசெய்து தாவர புகைப்படத்தை பதிவேற்றவும்' : 'Please upload or capture a plant photo first');
      return;
    }

    setIsIdentifying(true);
    setError(null);

    try {
      const response = await fetch('/api/identify-plant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imagePreview,
          language,
          userHint
        })
      });

      if (!response.ok) {
        throw new Error('Failed to identify plant');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error('Identification failed:', err);
      setError(language === 'ta' ? 'அடையாளம் காண்பதில் பிழை. மீண்டும் முயற்சிக்கவும்.' : 'Identification failed. Please try again.');
    } finally {
      setIsIdentifying(false);
    }
  };

  const handleAdd = () => {
    if (!result) return;
    if (onAddPlantToGarden) {
      onAddPlantToGarden({
        name: language === 'ta' && result.nameTa ? result.nameTa : result.identifiedName,
        commonName: result.commonName || result.identifiedName,
        scientificName: result.scientificName || '',
        category: (result.category as PlantCategory) || 'Indoor',
        photoUrl: imagePreview || 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80',
        sunlightRequirement: result.sunlightRequirement || 'Bright Indirect Light',
        wateringFrequencyDays: result.wateringFrequencyDays || 5,
        soilType: result.soilType || 'Well-draining potting soil',
        healthStatus: 'healthy',
        indoorOutdoor: result.category === 'Indoor' ? 'indoor' : 'outdoor',
        notes: `${result.description || ''}\n\nFun Fact: ${result.funFact || ''}`
      });
      setAddedSuccess(true);
    }
  };

  const resetAll = () => {
    setImagePreview(null);
    setUserHint('');
    setResult(null);
    setError(null);
    setAddedSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-emerald-100 dark:border-stone-800 overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-emerald-800 to-teal-800 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
              <Camera className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif flex items-center gap-2">
                {language === 'ta' ? 'AI தாவர அடையாளங்காணி' : 'AI Plant Identifier'}
                <span className="px-2 py-0.5 text-xs bg-emerald-500/30 text-emerald-200 rounded-full font-sans font-medium border border-emerald-400/30">
                  Vision 2.0
                </span>
              </h2>
              <p className="text-xs text-emerald-200/90">
                {language === 'ta' ? 'புகைப்படம் எடுத்து உடனடி தாவர பெயர் & பராமரிப்பு குறிப்புகளைப் பெறுங்கள்' : 'Instant AI identification from 150+ species database'}
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

        {onOpenGlobalPage && (
          <div className="bg-emerald-50 px-6 py-2.5 border-b border-emerald-200/80 flex items-center justify-between text-xs">
            <span className="text-emerald-900 font-medium">
              {language === 'ta'
                ? '5 புகைப்படங்கள் மற்றும் Pl@ntNet உலகளாவிய அடையாளங்காட்டி வேண்டுமா?'
                : 'Looking for multi-photo organ identification & 15 specialized tools?'}
            </span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenGlobalPage();
              }}
              className="px-3 py-1 rounded-lg bg-[#174D35] text-white font-bold hover:bg-[#2E8B57] transition-all cursor-pointer flex items-center gap-1"
            >
              <span>{language === 'ta' ? 'Global Identifier திற' : 'Open Global Identifier'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}

        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">

          {!result ? (
            <>
              {/* Image Upload Area */}
              <div className="space-y-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {imagePreview ? (
                  <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md max-h-72 flex items-center justify-center bg-stone-900">
                    <img 
                      src={imagePreview} 
                      alt="Plant upload" 
                      className="w-full h-72 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-between p-4">
                      <span className="text-xs text-white bg-black/50 px-3 py-1 rounded-full backdrop-blur-md border border-white/20 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {language === 'ta' ? 'புகைப்படம் தயாராக உள்ளது' : 'Photo ready'}
                      </span>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs rounded-xl font-medium transition-colors"
                      >
                        {language === 'ta' ? 'மாற்றுக' : 'Change photo'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-emerald-300 dark:border-stone-700 hover:border-emerald-500 rounded-3xl p-8 text-center cursor-pointer bg-emerald-50/40 dark:bg-stone-800/40 hover:bg-emerald-50/80 transition-all group"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Upload className="w-8 h-8" />
                    </div>
                    <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200 mb-1">
                      {language === 'ta' ? 'செடியின் புகைப்படத்தை பதிவேற்றவும்' : 'Upload or Take Plant Photo'}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto mb-4">
                      {language === 'ta' 
                        ? 'இலைகள், பூக்கள் அல்லது முழு செடி தெளிவாக தெரியுமாறு புகைப்படம் எடுக்கவும்' 
                        : 'Capture clear leaves, flowers, or whole pot for accurate botanical detection.'}
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-md group-hover:bg-emerald-800 transition-colors">
                      <Camera className="w-4 h-4" />
                      {language === 'ta' ? 'புகைப்படத்தை தேர்வு செய்' : 'Select Photo / Camera'}
                    </div>
                  </div>
                )}

                {/* Optional Hint */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                    {language === 'ta' ? 'கூடுதல் குறிப்பு (விருப்பத்தேர்வு)' : 'Optional Hint / Context (e.g., "Found on balcony" or "Flowers in winter")'}
                  </label>
                  <input
                    type="text"
                    value={userHint}
                    onChange={(e) => setUserHint(e.target.value)}
                    placeholder={language === 'ta' ? 'எ.கா. வாசனை மலர் அல்லது வீட்டில் வளரும் செடி...' : 'e.g. Fragrant white flowers, bought from terrace nursery...'}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs rounded-xl border border-red-200 dark:border-red-900">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* PLANTY Mascot guidance */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 dark:bg-stone-800/60 border border-emerald-100 dark:border-stone-700">
                  <PlantyMascot mood={isIdentifying ? 'thinking' : 'welcome'} size="sm" animate />
                  <p className="text-xs text-emerald-900 dark:text-emerald-200 font-medium leading-relaxed">
                    {isIdentifying
                      ? (language === 'ta' ? 'பிளாண்டி தாவரத்தை ஆய்வு செய்கிறார்... சில நொடிகள் காத்திருக்கவும்!' : 'PLANTY is analyzing botanical patterns, veins, and flower structures...')
                      : (language === 'ta' ? 'வணக்கம்! உங்கள் செடியின் புகைப்படத்தை காட்டுங்கள், நான் அதன் பெயர், அறிவியல் பெயர் மற்றும் முழு பராமரிப்பையும் சொல்கிறேன்!' : 'Hi! Show me any leaf, flower or vine and I will identify its botanical family, water needs, and care routine!')}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 text-sm font-medium transition-colors"
                >
                  {language === 'ta' ? 'ரத்து' : 'Cancel'}
                </button>
                <button
                  type="button"
                  onClick={handleIdentify}
                  disabled={!imagePreview || isIdentifying}
                  className="flex items-center gap-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl text-sm font-semibold shadow-lg shadow-emerald-700/20 transition-all hover:scale-[1.02]"
                >
                  {isIdentifying ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      {language === 'ta' ? 'அடையாளம் காண்கிறது...' : 'Identifying with AI...'}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      {language === 'ta' ? 'செடியை கண்டுபிடி' : 'Identify Plant'}
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            /* Result Screen */
            <div className="space-y-6 animate-fade-in">
              {/* Header result banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/5 border border-emerald-500/20">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md shrink-0">
                    <img src={imagePreview || ''} alt="Identified" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full font-bold uppercase tracking-wider">
                        {result.category || 'Botanical'}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 rounded-full font-semibold">
                        {result.confidence || '95%'} {language === 'ta' ? 'பொருத்தம்' : 'Match'}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-1">
                      {language === 'ta' && result.nameTa ? result.nameTa : result.identifiedName}
                    </h3>
                    <p className="text-xs italic text-stone-500 dark:text-stone-400">
                      {result.scientificName} • {result.commonName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={resetAll}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    {language === 'ta' ? 'வேறொரு படம்' : 'Identify Another'}
                  </button>
                  <button
                    onClick={handleAdd}
                    disabled={addedSuccess}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-900 text-white rounded-xl shadow-md transition-all hover:scale-105"
                  >
                    {addedSuccess ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                        {language === 'ta' ? 'தோட்டத்தில் சேர்க்கப்பட்டது!' : 'Added to Garden!'}
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        {language === 'ta' ? 'என் தோட்டத்தில் சேர்' : 'Add to My Garden'}
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Description & Overview */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
                <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  {result.description}
                </p>
                {result.funFact && (
                  <div className="mt-3 pt-3 border-t border-stone-200/80 dark:border-stone-700/80 flex items-start gap-2 text-xs text-emerald-800 dark:text-emerald-300">
                    <Sparkles className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
                    <span><strong>{language === 'ta' ? 'சுவாரஸ்ய தகவல்:' : 'Fun Fact:'}</strong> {result.funFact}</span>
                  </div>
                )}
              </div>

              {/* Key Care Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
                  <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400 text-xs font-semibold mb-1">
                    <Droplets className="w-4 h-4" />
                    {language === 'ta' ? 'நீர்ப்பாசனம்' : 'Watering'}
                  </div>
                  <p className="text-sm font-bold text-stone-800 dark:text-stone-200">
                    {language === 'ta' ? `${result.wateringFrequencyDays || 5} நாட்களுக்கு ஒருமுறை` : `Every ${result.wateringFrequencyDays || 5} days`}
                  </p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2 mt-0.5">
                    {result.wateringAdvice}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40">
                  <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 text-xs font-semibold mb-1">
                    <Sun className="w-4 h-4" />
                    {language === 'ta' ? 'சூரிய ஒளி' : 'Sunlight'}
                  </div>
                  <p className="text-sm font-bold text-stone-800 dark:text-stone-200 line-clamp-1">
                    {result.sunlightRequirement}
                  </p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    {language === 'ta' ? 'உகந்த வெளிச்சம்' : 'Optimal growth'}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40">
                  <div className="flex items-center gap-1.5 text-purple-700 dark:text-purple-400 text-xs font-semibold mb-1">
                    <ShieldAlert className="w-4 h-4" />
                    {language === 'ta' ? 'செல்லப்பிராணி' : 'Pet Safety'}
                  </div>
                  <p className="text-sm font-bold text-stone-800 dark:text-stone-200 line-clamp-1">
                    {result.petToxicity || 'Safe for Pets'}
                  </p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    {language === 'ta' ? 'நச்சுத்தன்மை தகவல்' : 'Toxicity status'}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                  <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-1">
                    <Sprout className="w-4 h-4" />
                    {language === 'ta' ? 'இனப்பெருக்கம்' : 'Propagation'}
                  </div>
                  <p className="text-sm font-bold text-stone-800 dark:text-stone-200 line-clamp-1">
                    {result.propagationMethod || 'Cuttings'}
                  </p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    {result.difficulty || 'Easy'}
                  </p>
                </div>
              </div>

              {/* Similar plants */}
              {result.similarPlants && result.similarPlants.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                    {language === 'ta' ? 'ஒரே இனத்தைச் சேர்ந்த பிற தாவரங்கள்:' : 'Related & Similar Species:'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.similarPlants.map((plant: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs rounded-xl border border-stone-200 dark:border-stone-700">
                        {plant}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* PLANTY Mascot advice box */}
              <div className="flex items-center gap-4 p-4 rounded-3xl bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-lg">
                <PlantyMascot mood="happy" size="sm" animate />
                <div>
                  <h4 className="text-sm font-bold text-emerald-200">
                    {language === 'ta' ? 'பிளாண்டியின் உடனடி பராமரிப்பு குறிப்பு:' : "PLANTY's Essential Care Advice:"}
                  </h4>
                  <p className="text-xs text-white/90 leading-relaxed mt-0.5">
                    {result.careSummary || result.wateringAdvice}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
