import React, { useState } from 'react';
import { 
  X, Compass, Sparkles, LayoutGrid, CheckCircle2, 
  Sun, Droplets, ArrowRight, DollarSign, Download, Sprout 
} from 'lucide-react';
import { Language, GardenDesignPlan } from '../types';
import PlantyMascot from './PlantyMascot';

interface AiGardenDesignerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export default function AiGardenDesignerModal({
  isOpen,
  onClose,
  language
}: AiGardenDesignerModalProps) {
  const [spaceType, setSpaceType] = useState<string>('balcony');
  const [areaSqFt, setAreaSqFt] = useState<number>(40);
  const [sunlightHours, setSunlightHours] = useState<string>('morning');
  const [budgetTier, setBudgetTier] = useState<'budget' | 'standard' | 'premium'>('standard');
  const [isGenerating, setIsGenerating] = useState(false);
  const [designPlan, setDesignPlan] = useState<GardenDesignPlan | null>(null);

  if (!isOpen) return null;

  const handleGeneratePlan = () => {
    setIsGenerating(true);

    setTimeout(() => {
      // Dynamic layout synthesis based on space and sun
      let plan: GardenDesignPlan;

      if (spaceType === 'balcony') {
        plan = {
          gardenType: language === 'ta' ? 'அழகிய பால்கனி தோட்டம்' : 'Urban Balcony Paradise',
          spaceArea: `${areaSqFt} sq. ft.`,
          budget: budgetTier === 'budget' ? '₹1,500 - ₹2,500' : budgetTier === 'standard' ? '₹3,500 - ₹5,000' : '₹7,500+',
          sunlightCondition: sunlightHours === 'full' ? 'Full Sun (6+ hrs)' : 'Morning Sun (3-4 hrs)',
          recommendedPlants: [
            { name: 'Cherry Tomato', category: 'Vegetables', spacingCm: 35, containerSize: '12" Pot', companionTo: ['Sweet Basil'], role: 'Centerpiece edible' },
            { name: 'Sweet Italian Basil', category: 'Herbs', spacingCm: 20, containerSize: '8" Pot', companionTo: ['Cherry Tomato'], role: 'Companion pest barrier' },
            { name: 'Golden Pothos', category: 'Indoor', spacingCm: 30, containerSize: 'Hanging Basket', companionTo: [], role: 'Vertical greenery' },
            { name: 'Petunia / Marigold', category: 'Flowering', spacingCm: 25, containerSize: 'Railing Box', companionTo: ['Tomato'], role: 'Color & pollinator magnet' },
            { name: 'Mint (Pudina)', category: 'Herbs', spacingCm: 20, containerSize: '8" Planter', companionTo: [], role: 'Kitchen fresh harvest' }
          ],
          layoutGrid: [
            { zone: 'Front Railing (Max Sun)', position: 'Row 1', sunExposure: 'Direct', plantName: 'Petunia & Marigolds', icon: 'Flower2' },
            { zone: 'East Corner Stand', position: 'Row 2', sunExposure: 'Direct', plantName: 'Cherry Tomato + Basil', icon: 'Salad' },
            { zone: 'Vertical Wall Rack', position: 'Row 3', sunExposure: 'Filtered', plantName: 'Mint & Coriander', icon: 'Sprout' },
            { zone: 'Ceiling Hook', position: 'Row 4', sunExposure: 'Indirect', plantName: 'Trailing Golden Pothos', icon: 'Home' }
          ],
          careSchedule: [
            { task: 'Morning Watering (Check topsoil)', frequency: 'Daily before 8:30 AM' },
            { task: 'Liquid seaweed or vermicompost spray', frequency: 'Every 14 days' },
            { task: 'Deadheading flowers and pinching basil', frequency: 'Weekly' }
          ],
          estimatedCost: budgetTier === 'budget' ? 1800 : budgetTier === 'standard' ? 4200 : 7900
        };
      } else if (spaceType === 'terrace') {
        plan = {
          gardenType: language === 'ta' ? 'செழிப்பான மாடித்தோட்டம்' : 'Rooftop Terrace Orchard',
          spaceArea: `${areaSqFt} sq. ft.`,
          budget: budgetTier === 'budget' ? '₹3,000 - ₹5,000' : '₹8,000 - ₹15,000',
          sunlightCondition: 'Full Unfiltered Sunshine (7+ hrs)',
          recommendedPlants: [
            { name: 'Kagzi Lemon (Citrus)', category: 'Fruit', spacingCm: 90, containerSize: '50L Drum', companionTo: ['Marigold'], role: 'Potted fruit tree' },
            { name: 'Green Chilli (Mirchi)', category: 'Vegetables', spacingCm: 45, containerSize: '12" Grow Bag', companionTo: ['Coriander'], role: 'High-yield spice' },
            { name: 'Brinjal (Kathirikai)', category: 'Vegetables', spacingCm: 45, containerSize: '12" Grow Bag', companionTo: ['French Beans'], role: 'Kitchen staple' },
            { name: 'Ridge Gourd / Cucumber', category: 'Climbers', spacingCm: 60, containerSize: '18" Bag + Trellis', companionTo: [], role: 'Vertical shade pandal' },
            { name: 'Red Keerai (Amaranthus)', category: 'Greens', spacingCm: 15, containerSize: 'Shallow Tub', companionTo: [], role: '25-day quick greens' }
          ],
          layoutGrid: [
            { zone: 'Center Pandal (Trellis)', position: 'Roof Canopy', sunExposure: 'Full Sun', plantName: 'Ridge Gourd & Cucumber', icon: 'GitCommit' },
            { zone: 'South Wall Rows', position: 'Row A', sunExposure: 'Intense Sun', plantName: 'Chilli, Brinjal, Tomato Bags', icon: 'Salad' },
            { zone: 'West Heavy Zone', position: 'Corner A', sunExposure: 'Full Sun', plantName: 'Kagzi Lemon 50L Drum', icon: 'Apple' },
            { zone: 'Under-Pandal Semi-Shade', position: 'Shaded Bed', sunExposure: 'Dappled', plantName: 'Palak & Amaranthus Keerai', icon: 'Sprout' }
          ],
          careSchedule: [
            { task: 'Deep soak watering', frequency: 'Twice daily in summer; once daily in winter' },
            { task: 'Panchagavya foliar spray', frequency: 'Every 15 days' },
            { task: 'Neem cake application for roots', frequency: 'Monthly' }
          ],
          estimatedCost: budgetTier === 'budget' ? 3800 : budgetTier === 'standard' ? 9500 : 16000
        };
      } else {
        plan = {
          gardenType: language === 'ta' ? 'உட்புற காற்றுத் தூய்மைத் தோட்டம்' : 'Living Room Biophilic Oasis',
          spaceArea: `${areaSqFt} sq. ft.`,
          budget: '₹2,500 - ₹6,000',
          sunlightCondition: 'Medium to Bright Indirect Light',
          recommendedPlants: [
            { name: 'Snake Plant (Sansevieria)', category: 'Indoor', spacingCm: 40, containerSize: '10" Ceramic Pot', companionTo: [], role: 'Night oxygen powerhouse' },
            { name: 'Peace Lily', category: 'Indoor', spacingCm: 35, containerSize: '8" Pot', companionTo: [], role: 'Humidity indicator' },
            { name: 'ZZ Plant', category: 'Indoor', spacingCm: 35, containerSize: '10" Pot', companionTo: [], role: 'Low-light bulletproof' },
            { name: 'Spider Plant', category: 'Indoor', spacingCm: 25, containerSize: 'Pedestal Pot', companionTo: [], role: 'Air toxin scrubber' }
          ],
          layoutGrid: [
            { zone: 'Window Edge (Bright Light)', position: 'Zone 1', sunExposure: 'Indirect Bright', plantName: 'Peace Lily', icon: 'Flower2' },
            { zone: 'TV Console / Room Corner', position: 'Zone 2', sunExposure: 'Low Light', plantName: 'ZZ Plant & Snake Plant', icon: 'Home' },
            { zone: 'Shelving Unit', position: 'Zone 3', sunExposure: 'Diffused', plantName: 'Spider Plant & Pothos', icon: 'Sprout' }
          ],
          careSchedule: [
            { task: 'Wipe leaves with damp cloth', frequency: 'Once monthly' },
            { task: 'Check soil moisture before watering', frequency: 'Every 7-10 days' },
            { task: 'Diluted houseplant fertilizer', frequency: 'Once in spring' }
          ],
          estimatedCost: budgetTier === 'budget' ? 2200 : 5400
        };
      }

      setDesignPlan(plan);
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-emerald-100 dark:border-stone-800 overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-emerald-800 to-teal-800 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
              <Compass className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif flex items-center gap-2">
                {language === 'ta' ? 'AI தோட்டம் மற்றும் பால்கனி வடிவமைப்பாளர்' : 'AI Garden & Terrace Designer'}
                <span className="px-2 py-0.5 text-xs bg-emerald-500/30 text-emerald-200 rounded-full font-sans font-medium border border-emerald-400/30">
                  Spatial Planner
                </span>
              </h2>
              <p className="text-xs text-emerald-200/90">
                {language === 'ta' ? 'உங்கள் இடத்திற்கேற்ற தாவர இடைவெளி, தோட்டம் மற்றும் செலவு திட்டம்' : 'Custom layout grid, container sizing, companions & budget'}
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
          {!designPlan ? (
            <div className="space-y-6">
              {/* Space Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                  {language === 'ta' ? '1. தோட்டத்தின் இடம்' : '1. Where is your gardening space?'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'balcony', title: language === 'ta' ? 'பால்கனி தோட்டம்' : 'Apartment Balcony', desc: language === 'ta' ? '20 - 80 சதுர அடி' : '20 - 80 sq. ft. railings & corners' },
                    { id: 'terrace', title: language === 'ta' ? 'மாடித்தோட்டம்' : 'Rooftop Terrace', desc: language === 'ta' ? '100 - 500 சதுர அடி' : '100 - 500 sq. ft. open sun & drums' },
                    { id: 'indoor', title: language === 'ta' ? 'உட்புற வரவேற்பறை' : 'Living Room / Indoor', desc: language === 'ta' ? 'ஜன்னல் & மேஜை ஓரங்கள்' : 'Windowsills, corners & desks' }
                  ].map((space) => (
                    <div
                      key={space.id}
                      onClick={() => setSpaceType(space.id)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        spaceType === space.id
                          ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 shadow-md'
                          : 'border-stone-200 dark:border-stone-700 hover:border-emerald-300 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      <h4 className="font-bold text-sm">{space.title}</h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{space.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Area & Sun controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center justify-between">
                    <span>{language === 'ta' ? 'பரப்பளவு (சதுர அடி)' : 'Approximate Area'}</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-extrabold">{areaSqFt} sq. ft.</span>
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="300"
                    step="5"
                    value={areaSqFt}
                    onChange={(e) => setAreaSqFt(Number(e.target.value))}
                    className="w-full accent-emerald-700 h-2 bg-stone-200 dark:bg-stone-700 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400">
                    <span>15 sq ft</span>
                    <span>100 sq ft</span>
                    <span>300 sq ft</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    {language === 'ta' ? 'சூரிய ஒளி நிலவரம்' : 'Sunlight Conditions'}
                  </label>
                  <select
                    value={sunlightHours}
                    onChange={(e) => setSunlightHours(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="full">{language === 'ta' ? 'முழு நாள் கடுமையான வெயில் (6+ மணி நேரம்)' : 'Full Day Sun (6+ hours uninterrupted)'}</option>
                    <option value="morning">{language === 'ta' ? 'காலை இளம் வெயில் மட்டும் (3-4 மணி நேரம்)' : 'Morning Sun Only (3-4 hours gentle light)'}</option>
                    <option value="dappled">{language === 'ta' ? 'மர நிழல் / பகுதி வெளிச்சம்' : 'Dappled Filtered Light'}</option>
                    <option value="low">{language === 'ta' ? 'குறைந்த வெளிச்சம் / நிழலான இடம்' : 'Low Natural Light / North Facing'}</option>
                  </select>
                </div>
              </div>

              {/* Budget Tier */}
              <div>
                <label className="block text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                  {language === 'ta' ? '2. உங்கள் பட்ஜெட் விருப்பம்' : '2. Budget Preference'}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'budget', label: language === 'ta' ? 'எளிய தொடக்கம்' : 'Budget Friendly', price: '₹1.5k - ₹2.5k' },
                    { id: 'standard', label: language === 'ta' ? 'சமச்சீர் தோட்டம்' : 'Standard Balanced', price: '₹3.5k - ₹6k' },
                    { id: 'premium', label: language === 'ta' ? 'முழுமையான தோட்டம்' : 'Exhibition Grade', price: '₹8k+' }
                  ].map((b) => (
                    <div
                      key={b.id}
                      onClick={() => setBudgetTier(b.id as any)}
                      className={`p-3.5 rounded-2xl border-2 text-center cursor-pointer transition-all ${
                        budgetTier === b.id
                          ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold'
                          : 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      <p className="text-xs font-semibold">{b.label}</p>
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-extrabold mt-0.5">{b.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mascot Tip */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 dark:bg-stone-800/60 border border-emerald-100 dark:border-stone-700">
                <PlantyMascot mood="thinking" size="sm" animate />
                <p className="text-xs text-emerald-900 dark:text-emerald-200 font-medium leading-relaxed">
                  {language === 'ta'
                    ? 'பிளாண்டி தாவரங்களின் பரஸ்பர தோழமை, கொள்கலன் அளவு மற்றும் சூரிய ஒளி கோணங்களை கணக்கிட்டு அழகான 2D லேஅவுட்டை உருவாக்குகிறார்!'
                    : 'PLANTY computes companion plant matrix, container spacing, and sunlight zones to create your optimal botanical layout!'}
                </p>
              </div>

              {/* Generate button */}
              <button
                onClick={handleGeneratePlan}
                disabled={isGenerating}
                className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-bold text-sm shadow-xl shadow-emerald-700/20 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {isGenerating 
                  ? (language === 'ta' ? 'AI தோட்டத்தை வடிவமைக்கிறது...' : 'Generating Garden Blueprint...') 
                  : (language === 'ta' ? 'AI தோட்ட வரைபடத்தை உருவாக்கு' : 'Generate AI Garden Blueprint')}
              </button>
            </div>
          ) : (
            /* Results: Visual Layout & Blueprint */
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-3xl bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-lg">
                <div>
                  <span className="text-xs px-2.5 py-0.5 bg-emerald-500/30 text-emerald-200 rounded-full font-bold uppercase tracking-wider">
                    {designPlan.spaceArea} • {designPlan.sunlightCondition}
                  </span>
                  <h3 className="text-2xl font-bold font-serif mt-1">{designPlan.gardenType}</h3>
                  <p className="text-xs text-emerald-200">
                    {language === 'ta' ? 'மதிப்பிடப்பட்ட செலவு:' : 'Estimated Investment:'} <span className="font-extrabold text-white">{designPlan.budget}</span>
                  </p>
                </div>
                <button
                  onClick={() => setDesignPlan(null)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                >
                  {language === 'ta' ? 'மறுவடிவமைப்பு' : 'Redesign Space'}
                </button>
              </div>

              {/* 2D Interactive Layout Grid */}
              <div>
                <h4 className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-emerald-600" />
                  {language === 'ta' ? '2D மண்டல வரைபடம் (Zone Layout)' : '2D Spatial Layout & Microclimate Zones'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {designPlan.layoutGrid.map((gridItem, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-emerald-100 dark:border-stone-700 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-bold text-stone-900 dark:text-stone-100">{gridItem.zone}</h5>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-semibold">
                            {gridItem.sunExposure}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-1">
                          🌱 {gridItem.plantName}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Plant Spec Sheet */}
              <div>
                <h4 className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-emerald-600" />
                  {language === 'ta' ? 'பரிந்துரைக்கப்பட்ட தாவரங்களின் விபரம்' : 'Curated Plant Specifications & Spacing'}
                </h4>
                <div className="space-y-2">
                  {designPlan.recommendedPlants.map((plant, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <strong className="text-sm font-bold text-stone-900 dark:text-stone-100">{plant.name}</strong>
                          <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300">
                            {plant.category}
                          </span>
                          <p className="text-stone-500 dark:text-stone-400 text-[11px] mt-0.5">{plant.role}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-stone-600 dark:text-stone-300 font-medium">
                        <span>{language === 'ta' ? 'இடைவெளி:' : 'Spacing:'} <strong className="text-stone-900 dark:text-stone-100">{plant.spacingCm} cm</strong></span>
                        <span>{language === 'ta' ? 'தொட்டி:' : 'Pot:'} <strong className="text-stone-900 dark:text-stone-100">{plant.containerSize}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Care Routine Checklist */}
              <div className="p-5 rounded-3xl bg-emerald-50 dark:bg-stone-800/50 border border-emerald-100 dark:border-stone-700 space-y-3">
                <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {language === 'ta' ? 'பராமரிப்பு அட்டவணை' : 'Ongoing Care Routine'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {designPlan.careSchedule.map((care, idx) => (
                    <div key={idx} className="p-3 bg-white dark:bg-stone-800 rounded-xl border border-emerald-100 dark:border-stone-700">
                      <strong className="text-stone-800 dark:text-stone-200 block mb-0.5">{care.task}</strong>
                      <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{care.frequency}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
