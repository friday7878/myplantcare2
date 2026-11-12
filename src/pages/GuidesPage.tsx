import React, { useState } from 'react';
import {
  Sun,
  Sprout,
  Droplets,
  Compass,
  AlertTriangle,
  Sparkles,
  Info,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { Language } from '../types';

interface GuidesPageProps {
  language: Language;
}

export const GuidesPage: React.FC<GuidesPageProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'sunlight' | 'fertilizer' | 'soil'>('sunlight');
  const [selectedSoilState, setSelectedSoilState] = useState<'dry' | 'slightly_moist' | 'moist' | 'wet'>('slightly_moist');

  const sunlightTiers = [
    {
      title: 'Full Sun (6+ Hours Direct)',
      titleTa: 'முழுமையான நேரடி சூரிய ஒளி (6+ மணி நேரம்)',
      desc: 'Unfiltered, blazing direct sun hitting leaves directly throughout the morning and afternoon.',
      suitableFor: 'Tomatoes, Chillies, Sunflowers, Jasmine, Hibiscus, Lemongrass, Marigold',
      windowDirection: 'South or West facing balconies, open rooftop terraces',
      problems: 'Sunburn patches if plants are abruptly moved from indoor shade without acclimating.'
    },
    {
      title: 'Partial Sun (4 to 6 Hours)',
      titleTa: 'பகுதி நேர சூரிய ஒளி (4-6 மணி நேரம்)',
      desc: 'Direct sunshine for 4-6 hours, ideally during mild morning hours, followed by afternoon shade.',
      suitableFor: 'Mint (Pudina), Spinach, Brahmi, Chrysanthemums, Aloe Vera',
      windowDirection: 'East-facing windowsills catching early golden sunrise',
      problems: 'Leggy stretched stems if light drops below 4 hours.'
    },
    {
      title: 'Bright Indirect Light',
      titleTa: 'பிரகாசமான மறைமுக வெளிச்சம்',
      desc: 'Intense daylight near windows with no scorching direct sun rays striking the foliage.',
      suitableFor: 'Monstera Deliciosa, Golden Pothos, Areca Palm, Rubber Plant, Spider Plant',
      windowDirection: 'Within 3-5 feet of an unshaded East or North window, or filtered through sheer curtains',
      problems: 'Foliage bleaching if exposed to direct blazing 2 PM sun.'
    },
    {
      title: 'Partial Shade (2 to 4 Hours)',
      titleTa: 'மிதமான நிழல் (2-4 மணி நேரம்)',
      desc: 'Soft, dappled daylight filtered through tree canopies or patio trellis slats.',
      suitableFor: 'Lucky Bamboo, Peace Lily, Ferns, Philodendrons',
      windowDirection: 'Covered verandas, shaded porch alcoves',
      problems: 'Very slow growth and reduced flowering.'
    },
    {
      title: 'Low Light / Deep Shade',
      titleTa: 'குறைந்த வெளிச்சம் / முழு நிழல்',
      desc: 'Dim indoor room corners receiving ambient interior lighting or fluorescent office lamps.',
      suitableFor: 'ZZ Plant, Snake Plant (Sansevieria), Cast Iron Plant',
      windowDirection: 'North-facing interior rooms, hallways, bathrooms with skylights',
      problems: 'Soil takes 3x longer to dry out; high risk of root rot if overwatered.'
    }
  ];

  const fertilizerArticles = [
    {
      name: 'Vermicompost (Earthworm Castings)',
      macro: 'Balanced N-P-K (1.5 - 1.0 - 1.5) + Microbes',
      application: 'Add 2-3 handfuls around root rim every 15-20 days. Work into topsoil and water.',
      idealFor: 'All houseplants, kitchen vegetables, flowering roses',
      caution: 'Safe, natural, and never burns tender roots.'
    },
    {
      name: 'Neem Cake Powder (Veppam Pinnakku)',
      macro: 'Natural Nitrogen + Nematicide + Bio-pesticide',
      application: 'Mix 1 tablespoon into potting soil monthly or soak in water to make liquid drench.',
      idealFor: 'Curry Leaf, Chillies, Fruit saplings',
      caution: 'Repels microscopic soil nematodes and prevents collar rot.'
    },
    {
      name: 'Banana Peel Tea (Potassium Gold)',
      macro: 'Rich in Potassium (K) + Magnesium + Calcium',
      application: 'Ferment 3 banana skins in 1L water for 72 hours. Dilute 1:1 and pour at base.',
      idealFor: 'Flowering Hibiscus, Garden Roses, Fruiting Tomatoes',
      caution: 'Do not leave sticky fruit pieces on soil surface to prevent ants.'
    },
    {
      name: 'Fermented Sour Buttermilk (Chaas)',
      macro: 'Lactic Acid Bacteria + Calcium + Trace Minerals',
      application: 'Dilute 100ml sour curd in 1L water. Spray foliage and pour at soil base.',
      idealFor: 'Curry Leaf tree, Chillies (cures leaf curl), Roses (stops powdery mildew)',
      caution: 'Use well-fermented (3-day-old) curd for maximum bio-activity.'
    },
    {
      name: 'Wood Ash (Charcoal Ash)',
      macro: 'High Potassium (K) + Calcium Carbonate',
      application: 'Sprinkle half a teaspoon around pot edges once every 2 months.',
      idealFor: 'Tomatoes, Okra, Brinjal, Onions',
      caution: 'Raises soil pH (alkaline). Do not use on acid-loving gardenias or azaleas.'
    }
  ];

  const soilData = {
    dry: {
      label: 'Dry Soil (Bone Dry / Dusty)',
      color: 'text-amber-700 bg-amber-50 border-amber-300',
      action: 'Needs Immediate Thorough Watering',
      advice: 'Water deeply until water trickles out of the bottom drainage holes. Let drain for 15 minutes before returning to decorative saucer.'
    },
    slightly_moist: {
      label: 'Slightly Moist (Ideal Baseline)',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-300',
      action: 'Perfect Condition for Most Plants',
      advice: 'Ideal soil moisture level for Pothos, Snake Plant, Aloe Vera, and ZZ plant. Hold off watering for 1-2 more days.'
    },
    moist: {
      label: 'Moist (Spongy & Cool to Touch)',
      color: 'text-blue-700 bg-blue-50 border-blue-300',
      action: 'Do Not Water Yet',
      advice: 'Great moisture for thirsty plants like Ferns, Peace Lily, and Mint. Check again tomorrow.'
    },
    wet: {
      label: 'Wet / Soggy (Waterlogged)',
      color: 'text-red-700 bg-red-50 border-red-300',
      action: 'Danger of Root Rot!',
      advice: 'Ensure pot drainage holes are not blocked. Tilt pot slightly to drain standing water. Move to breezy spot and do not water for 4-6 days.'
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-[#183B2A] pb-12">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#174D35]">
          {language === 'ta' ? 'சூரிய ஒளி, உரம் & மண் வழிகாட்டிகள்' : 'Sunlight, Fertilizer & Soil Guides'}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600">
          {language === 'ta'
            ? 'தாவரங்களின் ஒளி தேவைகள், இயற்கை உரங்கள் மற்றும் மண் ஈரப்பதத்தை சரிபார்க்கும் வழிகாட்டல்.'
            : 'Master the three pillars of botany: optimal solar exposure, organic nutrition, and tactile soil hydration.'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('sunlight')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'sunlight' ? 'bg-[#174D35] text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Sun className="w-4 h-4 text-amber-400" />
          <span>Sunlight Guide</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('fertilizer')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'fertilizer' ? 'bg-[#174D35] text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Sprout className="w-4 h-4 text-emerald-400" />
          <span>Fertilizer & NPK Guide</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('soil')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'soil' ? 'bg-[#174D35] text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Layers className="w-4 h-4 text-blue-400" />
          <span>Soil Moisture Tracker</span>
        </button>
      </div>

      {/* TAB 1: SUNLIGHT GUIDE */}
      {activeTab === 'sunlight' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sunlightTiers.map((tier, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-white border border-[#A8DDB5]/60 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-[#F4A340] mb-1">
                    <Sun className="w-5 h-5 fill-current" />
                    <h3 className="font-bold text-sm text-[#174D35]">
                      {language === 'ta' ? tier.titleTa : tier.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{tier.desc}</p>
                </div>

                <div className="space-y-2 text-xs pt-3 border-t border-gray-100">
                  <div>
                    <strong className="text-[#2E8B57] block">Best Window Direction:</strong>
                    <span className="text-gray-600">{tier.windowDirection}</span>
                  </div>
                  <div>
                    <strong className="text-[#174D35] block">Suitable Plants:</strong>
                    <span className="text-gray-600">{tier.suitableFor}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-900 text-[11px]">
                    <strong>Watch out:</strong> {tier.problems}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: FERTILIZER & NPK GUIDE */}
      {activeTab === 'fertilizer' && (
        <div className="space-y-6">
          {/* NPK Breakdown Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#174D35] to-[#2E8B57] text-white shadow-md">
            <h3 className="text-lg font-black mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#A8DDB5]" />
              The N-P-K Botanical Trinity
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
                <span className="font-bold text-[#A8DDB5] block text-sm">N - Nitrogen</span>
                <p className="text-gray-200 mt-1">Lush foliage, chlorophyll synthesis & deep green leaf growth.</p>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
                <span className="font-bold text-[#A8DDB5] block text-sm">P - Phosphorus</span>
                <p className="text-gray-200 mt-1">Deep root establishment, flower bud burst & robust seed setting.</p>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
                <span className="font-bold text-[#A8DDB5] block text-sm">K - Potassium</span>
                <p className="text-gray-200 mt-1">Stem sturdiness, drought & pest defense, sweet fruit development.</p>
              </div>
            </div>
          </div>

          {/* Organic Recipes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fertilizerArticles.map((fert, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-white border border-[#A8DDB5]/60 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#174D35]">{fert.name}</h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Organic
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#2E8B57]">{fert.macro}</p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  <strong>How to Apply:</strong> {fert.application}
                </p>
                <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-500">
                  <span className="block"><strong>Best For:</strong> {fert.idealFor}</span>
                  <span className="text-amber-800 mt-0.5 block"><strong>Note:</strong> {fert.caution}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SOIL MOISTURE CONDITION TRACKER */}
      {activeTab === 'soil' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#A8DDB5] shadow-xs space-y-6">
          <div className="text-center max-w-lg mx-auto space-y-1">
            <h3 className="text-xl font-black text-[#174D35]">
              Manual Soil Condition Evaluation Tool
            </h3>
            <p className="text-xs text-gray-500">
              Select the tactile feel of your potting soil to get tailored watering recommendations.
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(['dry', 'slightly_moist', 'moist', 'wet'] as const).map((state) => (
              <button
                key={state}
                type="button"
                onClick={() => setSelectedSoilState(state)}
                className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                  selectedSoilState === state
                    ? 'border-[#2E8B57] ring-2 ring-[#2E8B57]/40 bg-[#E8F8ED] shadow-sm'
                    : 'border-gray-200 bg-white hover:border-[#A8DDB5]'
                }`}
              >
                <Droplets
                  className={`w-6 h-6 mx-auto mb-2 ${
                    state === 'dry'
                      ? 'text-amber-500'
                      : state === 'slightly_moist'
                      ? 'text-emerald-500'
                      : state === 'moist'
                      ? 'text-blue-500'
                      : 'text-red-500 animate-bounce-subtle'
                  }`}
                />
                <span className="text-xs font-bold text-[#174D35] capitalize block">
                  {state.replace('_', ' ')}
                </span>
              </button>
            ))}
          </div>

          {/* Result Card */}
          <div className={`p-6 rounded-3xl border ${soilData[selectedSoilState].color} space-y-3 animate-fade-in`}>
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-base">{soilData[selectedSoilState].label}</h4>
              <span className="px-3 py-1 rounded-full bg-white font-bold text-xs shadow-xs">
                {soilData[selectedSoilState].action}
              </span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed font-medium">
              {soilData[selectedSoilState].advice}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-gray-50 text-[11px] text-gray-500 text-center">
            * Note: This manual tracker relies on your finger touch observation and does not replace dedicated IoT moisture sensors.
          </div>
        </div>
      )}
    </div>
  );
};
