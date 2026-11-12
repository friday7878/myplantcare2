import React, { useState } from 'react';
import { 
  Bug, Calendar, Sprout, BookOpen, Award, CheckCircle2, 
  HelpCircle, Sparkles, Plus, Trash2, Heart, Star, 
  DollarSign, TrendingUp, Layers, ArrowRight, ShieldCheck,
  Droplets, X
} from 'lucide-react';
import { 
  Language, GardenCalendarEvent, SeedRecord, 
  HarvestRecord, JournalEntry, GardenExpense 
} from '../types';
import { PEST_DISEASE_ENCYCLOPEDIA } from '../data/pestDiseaseEncyclopedia';
import { 
  COMPANION_PLANTING_MATRIX, SOIL_RECIPES, 
  QUIZ_QUESTIONS, GARDENING_CHALLENGES 
} from '../data/gardeningToolsData';
import PlantyMascot from '../components/PlantyMascot';

interface GardenToolsPageProps {
  language: Language;
  onOpenIdentifier?: () => void;
  onOpenWaterCalculator?: () => void;
  onOpenGardenDesigner?: () => void;
  onNavigateToDiseaseEncyclopedia?: () => void;
}

export const GardenToolsPage: React.FC<GardenToolsPageProps> = ({
  language,
  onOpenIdentifier,
  onOpenWaterCalculator,
  onOpenGardenDesigner,
  onNavigateToDiseaseEncyclopedia
}) => {
  const [activeTab, setActiveTab] = useState<
    'encyclopedia' | 'calendar' | 'seed-harvest' | 'journal-cost' | 'quiz-challenges' | 'companion-soil'
  >('encyclopedia');

  // Encyclopedia states
  const [encyclopediaType, setEncyclopediaType] = useState<'all' | 'disease' | 'pest'>('all');
  const [encyclopediaSearch, setEncyclopediaSearch] = useState('');
  const [selectedPestDisease, setSelectedPestDisease] = useState<any | null>(null);

  // Calendar states
  const [calendarEvents, setCalendarEvents] = useState<GardenCalendarEvent[]>([
    { id: 'ev1', userId: 'local', plantName: 'Money Plant', type: 'watering', date: new Date().toISOString().split('T')[0], completed: false, notes: 'Morning soaking' },
    { id: 'ev2', userId: 'local', plantName: 'Tomato Vines', type: 'fertilizer', date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], completed: false, notes: 'Apply vermicompost' },
    { id: 'ev3', userId: 'local', plantName: 'Lemon Tree', type: 'pruning', date: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0], completed: false, notes: 'Remove water suckers' },
    { id: 'ev4', userId: 'local', plantName: 'Green Chilli', type: 'harvesting', date: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0], completed: false, notes: 'Harvest ripe chillies' }
  ]);
  const [newPlantName, setNewPlantName] = useState('');
  const [newEventType, setNewEventType] = useState<'watering' | 'fertilizer' | 'pruning' | 'repotting' | 'planting' | 'harvesting'>('watering');
  const [newEventDate, setNewEventDate] = useState(new Date().toISOString().split('T')[0]);

  // Seed & Harvest states
  const [seedRecords, setSeedRecords] = useState<SeedRecord[]>([
    { id: 's1', userId: 'local', seedName: 'Cherry Tomato', sowDate: '2026-11-01', germinationDate: '2026-11-06', daysToGerminate: 5, seedlingHeightCm: 8, germinationRatePercent: 90, notes: 'Fast vigor', status: 'germinated' },
    { id: 's2', userId: 'local', seedName: 'Sweet Italian Basil', sowDate: '2026-11-04', germinationDate: '2026-11-09', daysToGerminate: 5, seedlingHeightCm: 4, germinationRatePercent: 85, notes: 'Fragrant leaves', status: 'germinated' }
  ]);
  const [harvestRecords, setHarvestRecords] = useState<HarvestRecord[]>([
    { id: 'h1', userId: 'local', plantName: 'Red Amaranthus (Keerai)', harvestDate: '2026-11-08', quantity: '500 grams', qualityRating: 5, tasteNotes: 'Sweet, tender and iron-rich leaves' },
    { id: 'h2', userId: 'local', plantName: 'Curry Leaves', harvestDate: '2026-11-10', quantity: '1 basket', qualityRating: 5, tasteNotes: 'Highly aromatic flush' }
  ]);
  const [newSeedName, setNewSeedName] = useState('');
  const [newHarvestPlant, setNewHarvestPlant] = useState('');
  const [newHarvestQty, setNewHarvestQty] = useState('');
  const [newHarvestRating, setNewHarvestRating] = useState<number>(5);

  // Journal & Cost states
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    { id: 'j1', userId: 'local', plantName: 'Monstera Deliciosa', date: '2026-11-10', title: 'New Split Leaf Unfurled!', notes: 'Gave banana peel tea last week and a giant fenestrated leaf popped open.', mood: 'thriving' },
    { id: 'j2', userId: 'local', plantName: 'Jasmine (Mogra)', date: '2026-11-08', title: 'Spring Bud Explosion', notes: 'Pruned tips two weeks ago and counted 18 new fragrant buds today.', mood: 'blooming' }
  ]);
  const [expenses, setExpenses] = useState<GardenExpense[]>([
    { id: 'ex1', userId: 'local', item: 'Terracotta Pots (10 inch x 4)', category: 'Pots', cost: 450, date: '2026-11-02' },
    { id: 'ex2', userId: 'local', item: 'Vermicompost (10 kg bag)', category: 'Compost', cost: 250, date: '2026-11-05' },
    { id: 'ex3', userId: 'local', item: 'Neem Oil Spray Bottle', category: 'Fertilizer', cost: 180, date: '2026-11-07' }
  ]);
  const [newExpenseItem, setNewExpenseItem] = useState('');
  const [newExpenseCategory, setNewExpenseCategory] = useState<GardenExpense['category']>('Plants');
  const [newExpenseCost, setNewExpenseCost] = useState<number>(200);

  // Quiz states
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Filter encyclopedia items
  const filteredEncyclopedia = PEST_DISEASE_ENCYCLOPEDIA.filter((item) => {
    const matchesType = encyclopediaType === 'all' || item.type === encyclopediaType;
    const q = encyclopediaSearch.toLowerCase();
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.nameTa.toLowerCase().includes(q) ||
      (item.scientificName && item.scientificName.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q);
    return matchesType && matchesSearch;
  });

  const totalExpenses = expenses.reduce((sum, item) => sum + item.cost, 0);

  const handleAnswerQuiz = (idx: number) => {
    if (selectedAnswerIndex !== null) return;
    setSelectedAnswerIndex(idx);
    if (idx === QUIZ_QUESTIONS[currentQuizIndex].correctAnswerIndex) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswerIndex(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleAddCalendarEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlantName.trim()) return;
    setCalendarEvents([
      ...calendarEvents,
      {
        id: `ev-${Date.now()}`,
        userId: 'local',
        plantName: newPlantName,
        type: newEventType,
        date: newEventDate,
        completed: false
      }
    ]);
    setNewPlantName('');
  };

  const toggleEventCompleted = (id: string) => {
    setCalendarEvents(
      calendarEvents.map((ev) => (ev.id === id ? { ...ev, completed: !ev.completed } : ev))
    );
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpenseItem.trim()) return;
    setExpenses([
      ...expenses,
      {
        id: `ex-${Date.now()}`,
        userId: 'local',
        item: newExpenseItem,
        category: newExpenseCategory,
        cost: Number(newExpenseCost),
        date: new Date().toISOString().split('T')[0]
      }
    ]);
    setNewExpenseItem('');
  };

  return (
    <div className="space-y-6 animate-fade-in text-[#183B2A] pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8ED] text-[#2E8B57] text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Botanical Tools Ecosystem v2.0</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#174D35] font-serif">
            {language === 'ta' ? 'மேம்பட்ட தோட்டக்கலைக் கருவிகள்' : 'Advanced Gardening Tools Hub'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mt-0.5">
            {language === 'ta'
              ? 'பூச்சி நோய் களஞ்சியம், காலண்டர், விதை அறுவடை கண்காணிப்பு, பராமரிப்பு நாளேடு மற்றும் வினாடி வினா.'
              : 'Pest encyclopedia, garden calendar, seed & harvest tracker, care journal, cost calculator & gamified quizzes.'}
          </p>
        </div>

        {/* Action Shortcuts */}
        <div className="flex flex-wrap items-center gap-2">
          {onOpenGardenDesigner && (
            <button
              onClick={onOpenGardenDesigner}
              className="px-3.5 py-2 bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
              <span>{language === 'ta' ? 'தோட்ட வடிவமைப்பாளர்' : 'AI Garden Designer'}</span>
            </button>
          )}
          {onOpenWaterCalculator && (
            <button
              onClick={onOpenWaterCalculator}
              className="px-3.5 py-2 bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Droplets className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === 'ta' ? 'நீர் கணக்கீடு' : 'Water Calculator'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-[#A8DDB5]/40">
        {[
          { id: 'encyclopedia', label: language === 'ta' ? 'பூச்சி & நோய் களஞ்சியம்' : 'Pest & Disease Encyclopedia', icon: Bug },
          { id: 'calendar', label: language === 'ta' ? 'தோட்ட காலண்டர்' : 'Garden Calendar', icon: Calendar },
          { id: 'seed-harvest', label: language === 'ta' ? 'விதை & அறுவடை' : 'Seed & Harvest Tracker', icon: Sprout },
          { id: 'journal-cost', label: language === 'ta' ? 'நாளேடு & செலவு கணக்கு' : 'Care Journal & Costs', icon: BookOpen },
          { id: 'quiz-challenges', label: language === 'ta' ? 'வினாடி வினா & சவால்கள்' : 'Quizzes & Challenges', icon: Award },
          { id: 'companion-soil', label: language === 'ta' ? 'தோழமை & மண் கலவை' : 'Companion Matrix & Soil', icon: Layers }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[#174D35] text-white shadow-md shadow-[#174D35]/20'
                  : 'bg-white hover:bg-emerald-50 text-stone-600 border border-stone-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#A8DDB5]' : 'text-stone-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PEST & DISEASE ENCYCLOPEDIA */}
      {activeTab === 'encyclopedia' && (
        <div className="space-y-6 animate-fade-in">
          {onNavigateToDiseaseEncyclopedia && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#174D35] to-[#2E8B57] text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/10 text-[#A8DDB5]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">
                    {language === 'ta' ? 'முழுமையான தாவர நோய் களஞ்சியத்தை திறக்க' : 'Dedicated Plant Disease Encyclopedia'}
                  </h4>
                  <p className="text-xs text-white/80">
                    {language === 'ta'
                      ? 'வேரழுகல், சாம்பல் நோய், இலைக்கருகல் உள்ளிட்ட நோய்களின் ஆழ்ந்த காரணங்கள் மற்றும் இயற்கை மருந்துகள்'
                      : 'Deep dive into Root Rot, Mildew, Blights, with recipes, clinical checklists & severity filters.'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onNavigateToDiseaseEncyclopedia}
                className="px-4 py-2 rounded-xl bg-white text-[#174D35] font-bold text-xs hover:bg-[#F5FAF5] transition-all whitespace-nowrap cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <span>{language === 'ta' ? 'நோய் களஞ்சியம் பார்க்க' : 'Open Disease Encyclopedia'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEncyclopediaType('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  encyclopediaType === 'all' ? 'bg-emerald-800 text-white' : 'bg-white text-stone-700 border border-stone-200'
                }`}
              >
                {language === 'ta' ? 'அனைத்தும் (20)' : 'All (20)'}
              </button>
              <button
                onClick={() => setEncyclopediaType('disease')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  encyclopediaType === 'disease' ? 'bg-emerald-800 text-white' : 'bg-white text-stone-700 border border-stone-200'
                }`}
              >
                {language === 'ta' ? 'நோய்கள் (10)' : 'Diseases (10)'}
              </button>
              <button
                onClick={() => setEncyclopediaType('pest')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  encyclopediaType === 'pest' ? 'bg-emerald-800 text-white' : 'bg-white text-stone-700 border border-stone-200'
                }`}
              >
                {language === 'ta' ? 'பூச்சிகள் (10)' : 'Pests (10)'}
              </button>
            </div>

            <input
              type="text"
              value={encyclopediaSearch}
              onChange={(e) => setEncyclopediaSearch(e.target.value)}
              placeholder={language === 'ta' ? 'நோய் அல்லது பூச்சி பெயர் கொண்டு தேடுக...' : 'Search disease or pest...'}
              className="px-4 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:ring-2 focus:ring-emerald-500 outline-none w-full sm:w-64"
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEncyclopedia.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPestDisease(item)}
                className="p-5 rounded-3xl bg-white border border-stone-200 hover:border-emerald-500 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                      item.type === 'disease' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.type === 'disease' ? (language === 'ta' ? 'தாவர நோய்' : 'Disease') : (language === 'ta' ? 'தாக்கும் பூச்சி' : 'Pest')}
                    </span>
                    <span className="text-[11px] text-stone-400 font-medium">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-serif text-[#174D35]">
                    {language === 'ta' && item.nameTa ? item.nameTa : item.name}
                  </h3>
                  <p className="text-xs italic text-stone-500 mb-3">{item.scientificName}</p>

                  <div className="space-y-1.5 text-xs text-stone-700">
                    <strong className="text-stone-900 block font-semibold">{language === 'ta' ? 'அறிகுறிகள்:' : 'Symptoms:'}</strong>
                    <ul className="list-disc pl-4 space-y-0.5 text-stone-600">
                      {(language === 'ta' && item.symptomsTa ? item.symptomsTa : item.symptoms).slice(0, 2).map((s: string, idx: number) => (
                        <li key={idx} className="line-clamp-2">{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>{language === 'ta' ? 'முழு விபரம் & இயற்கை சிகிச்சை' : 'View Organic Cure'}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          {/* Modal Detail for Pest & Disease */}
          {selectedPestDisease && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
              <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-200 my-8 max-h-[85vh] flex flex-col">
                <div className="p-6 bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 font-bold">
                      {selectedPestDisease.category}
                    </span>
                    <h3 className="text-2xl font-bold font-serif mt-1">
                      {language === 'ta' && selectedPestDisease.nameTa ? selectedPestDisease.nameTa : selectedPestDisease.name}
                    </h3>
                    <p className="text-xs italic text-emerald-200">{selectedPestDisease.scientificName}</p>
                  </div>
                  <button
                    onClick={() => setSelectedPestDisease(null)}
                    className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-4 text-xs text-stone-700">
                  <div>
                    <h4 className="font-bold text-stone-900 uppercase text-[11px] tracking-wider mb-1">
                      {language === 'ta' ? 'முக்கிய அறிகுறிகள்' : 'Key Symptoms'}
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-stone-600">
                      {(language === 'ta' && selectedPestDisease.symptomsTa ? selectedPestDisease.symptomsTa : selectedPestDisease.symptoms).map((s: string, idx: number) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-2">
                    <h4 className="font-bold text-emerald-900 uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      {language === 'ta' ? 'இயற்கை மற்றும் கரிம சிகிச்சைகள்' : 'Organic & Chemical-Free Treatments'}
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-emerald-950 font-medium">
                      {selectedPestDisease.organicTreatment.map((cure: string, idx: number) => (
                        <li key={idx}>{cure}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-stone-900 uppercase text-[11px] tracking-wider mb-1">
                      {language === 'ta' ? 'தடுப்பு நடவடிக்கைகள்' : 'Prevention Strategy'}
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-stone-600">
                      {selectedPestDisease.prevention.map((prev: string, idx: number) => (
                        <li key={idx}>{prev}</li>
                      ))}
                    </ul>
                  </div>

                  {selectedPestDisease.chemicalFreeTips && (
                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                      <strong>{language === 'ta' ? 'தோட்டக்கலை ரகசிய குறிப்பு:' : 'Golden Gardening Tip:'}</strong> {selectedPestDisease.chemicalFreeTips}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: GARDEN CALENDAR & SEASONAL PLANNER */}
      {activeTab === 'calendar' && (
        <div className="space-y-6 animate-fade-in">
          {/* Add Task Form */}
          <form onSubmit={handleAddCalendarEvent} className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1 space-y-1">
              <label className="text-xs font-bold text-stone-700">
                {language === 'ta' ? 'தாவரத்தின் பெயர்' : 'Plant Name'}
              </label>
              <input
                type="text"
                required
                value={newPlantName}
                onChange={(e) => setNewPlantName(e.target.value)}
                placeholder={language === 'ta' ? 'எ.கா. தக்காளி, மணி பிளாண்ட்...' : 'e.g. Cherry Tomato, Money Plant...'}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div className="w-full sm:w-44 space-y-1">
              <label className="text-xs font-bold text-stone-700">
                {language === 'ta' ? 'பணி வகை' : 'Task Type'}
              </label>
              <select
                value={newEventType}
                onChange={(e: any) => setNewEventType(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="watering">{language === 'ta' ? 'நீர் பாய்ச்சல்' : 'Watering'}</option>
                <option value="fertilizer">{language === 'ta' ? 'இயற்கை உரம்' : 'Fertilizer'}</option>
                <option value="pruning">{language === 'ta' ? 'கவாத்து (Pruning)' : 'Pruning'}</option>
                <option value="repotting">{language === 'ta' ? 'தொட்டி மாற்றம்' : 'Repotting'}</option>
                <option value="harvesting">{language === 'ta' ? 'அறுவடை' : 'Harvesting'}</option>
              </select>
            </div>

            <div className="w-full sm:w-36 space-y-1">
              <label className="text-xs font-bold text-stone-700">
                {language === 'ta' ? 'தேதி' : 'Date'}
              </label>
              <input
                type="date"
                value={newEventDate}
                onChange={(e) => setNewEventDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'ta' ? 'பணி சேர்' : 'Schedule'}</span>
            </button>
          </form>

          {/* Event List */}
          <div className="space-y-3">
            {calendarEvents.map((ev) => (
              <div
                key={ev.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                  ev.completed
                    ? 'bg-stone-50 border-stone-200 text-stone-400 line-through'
                    : 'bg-white border-emerald-100 text-stone-800 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleEventCompleted(ev.id)}
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
                      ev.completed ? 'bg-emerald-700 border-emerald-700 text-white' : 'border-stone-300 hover:border-emerald-600'
                    }`}
                  >
                    {ev.completed && <CheckCircle2 className="w-4 h-4" />}
                  </button>
                  <div>
                    <h4 className="text-sm font-bold">{ev.plantName}</h4>
                    <p className="text-xs text-stone-500 capitalize">{ev.type} • {ev.notes || 'Routine task'}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    {ev.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SEED GERMINATION & HARVEST TRACKER */}
      {activeTab === 'seed-harvest' && (
        <div className="space-y-6 animate-fade-in">
          {/* Seeds Section */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-serif text-[#174D35] flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-emerald-600" />
                  {language === 'ta' ? 'விதை முளைப்பு பதிவேடு' : 'Seed Germination Log'}
                </h3>
                <p className="text-xs text-stone-500">
                  {language === 'ta' ? 'விதைத்த நாள் முதல் முளைக்கும் வரை வளர்ச்சி சதவீதத்தை பதிவு செய்க' : 'Track germination duration, height and sprout percentages'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {seedRecords.map((seed) => (
                <div key={seed.id} className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-sm text-[#174D35]">
                    <span>{seed.seedName}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                      {seed.status}
                    </span>
                  </div>
                  <p className="text-stone-600">
                    {language === 'ta' ? 'விதைத்த நாள்:' : 'Sown:'} {seed.sowDate} • {language === 'ta' ? 'முளைத்தது:' : 'Sprouted in:'} <strong>{seed.daysToGerminate} days</strong>
                  </p>
                  <p className="text-stone-600">
                    {language === 'ta' ? 'நாற்று உயரம்:' : 'Height:'} {seed.seedlingHeightCm} cm • {language === 'ta' ? 'வெற்றி விகிதம்:' : 'Rate:'} {seed.germinationRatePercent}%
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Harvest Section */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-serif text-[#174D35] flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  {language === 'ta' ? 'அறுவடை சாதனைப் பதிவேடு' : 'Harvest Yield Tracker'}
                </h3>
                <p className="text-xs text-stone-500">
                  {language === 'ta' ? 'உங்கள் வீட்டுத் தோட்ட காய்கறி, பழங்கள் மற்றும் கீரைகளின் மகசூல் அளவு' : 'Record fresh home-grown harvests, quantities & quality ratings'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {harvestRecords.map((h) => (
                <div key={h.id} className="p-4 rounded-2xl bg-amber-50/40 border border-amber-100 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-sm text-stone-900">
                    <span>{h.plantName}</span>
                    <span className="text-xs font-bold text-amber-600 flex items-center gap-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {h.qualityRating} / 5
                    </span>
                  </div>
                  <p className="text-stone-600">
                    {language === 'ta' ? 'அறுவடை அளவு:' : 'Yield:'} <strong>{h.quantity}</strong> ({h.harvestDate})
                  </p>
                  <p className="text-stone-500 italic">"{h.tasteNotes}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CARE JOURNAL & EXPENSES */}
      {activeTab === 'journal-cost' && (
        <div className="space-y-6 animate-fade-in">
          {/* Expense Ledger */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
              <div>
                <h3 className="text-lg font-bold font-serif text-[#174D35] flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  {language === 'ta' ? 'தோட்ட செலவு கணக்கீடு' : 'Plant & Garden Cost Ledger'}
                </h3>
                <p className="text-xs text-stone-500">
                  {language === 'ta' ? 'தொட்டிகள், உரம், விதைகள் மற்றும் கருவிகளின் மொத்த செலவு' : 'Track potting, fertilizer, seeds & tool expenses'}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-500">{language === 'ta' ? 'மொத்த செலவு:' : 'Total Spent:'}</span>
                <p className="text-2xl font-extrabold text-[#174D35]">₹{totalExpenses.toLocaleString()}</p>
              </div>
            </div>

            {/* Quick Add Expense Form */}
            <form onSubmit={handleAddExpense} className="flex flex-col sm:flex-row gap-2.5 items-end text-xs">
              <input
                type="text"
                required
                value={newExpenseItem}
                onChange={(e) => setNewExpenseItem(e.target.value)}
                placeholder={language === 'ta' ? 'பொருள் (எ.கா. மண்புழு உரம்)' : 'Item (e.g. Vermicompost bag)'}
                className="flex-1 px-3 py-2 rounded-xl border border-stone-200 outline-none"
              />
              <select
                value={newExpenseCategory}
                onChange={(e: any) => setNewExpenseCategory(e.target.value)}
                className="w-full sm:w-32 px-3 py-2 rounded-xl border border-stone-200 outline-none"
              >
                <option value="Plants">Plants</option>
                <option value="Seeds">Seeds</option>
                <option value="Pots">Pots</option>
                <option value="Soil">Soil</option>
                <option value="Compost">Compost</option>
                <option value="Fertilizer">Fertilizer</option>
                <option value="Tools">Tools</option>
              </select>
              <input
                type="number"
                required
                value={newExpenseCost}
                onChange={(e) => setNewExpenseCost(Number(e.target.value))}
                className="w-full sm:w-28 px-3 py-2 rounded-xl border border-stone-200 outline-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 bg-emerald-700 text-white font-bold rounded-xl"
              >
                {language === 'ta' ? 'பதிவு செய்' : 'Add Cost'}
              </button>
            </form>

            <div className="space-y-2 pt-2">
              {expenses.map((ex) => (
                <div key={ex.id} className="p-3 rounded-xl bg-stone-50 flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-stone-800">{ex.item}</strong>
                    <span className="ml-2 text-[10px] px-2 py-0.5 bg-stone-200 rounded-full text-stone-600">
                      {ex.category}
                    </span>
                  </div>
                  <span className="font-extrabold text-[#174D35]">₹{ex.cost}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Plant Care Journal */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-lg font-bold font-serif text-[#174D35] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              {language === 'ta' ? 'தாவர பராமரிப்பு நாளேடு' : 'Plant Care Journal'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {journalEntries.map((j) => (
                <div key={j.id} className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#174D35]">{j.plantName}</span>
                    <span className="text-[10px] text-stone-400">{j.date}</span>
                  </div>
                  <h4 className="font-bold text-sm text-stone-900">{j.title}</h4>
                  <p className="text-stone-600 leading-relaxed">{j.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: QUIZZES & GAMIFIED CHALLENGES */}
      {activeTab === 'quiz-challenges' && (
        <div className="space-y-6 animate-fade-in">
          {/* Active Challenges List */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-serif text-[#174D35] flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  {language === 'ta' ? 'தோட்டக்கலை சவால்கள் & பதக்கங்கள்' : 'Active Gardening Challenges & Badges'}
                </h3>
                <p className="text-xs text-stone-500">
                  {language === 'ta' ? 'பணிகளை முடித்து புதிய நிலைகளை அடைந்து தாவர புள்ளிகளை வெல்லுங்கள்' : 'Complete botanical milestones to earn badges and points'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {GARDENING_CHALLENGES.map((ch) => (
                <div key={ch.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-stone-900">
                      {language === 'ta' && ch.titleTa ? ch.titleTa : ch.title}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold text-[10px]">
                      +{ch.points} pts
                    </span>
                  </div>
                  <p className="text-stone-600 leading-snug">
                    {language === 'ta' && ch.descriptionTa ? ch.descriptionTa : ch.description}
                  </p>
                  <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden mt-2">
                    <div className="bg-emerald-600 h-full w-2/5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Quiz Arena */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-stone-900 text-white shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  {language === 'ta' ? 'தாவரவியல் வினாடி வினா' : 'Botanical Knowledge Arena'}
                </span>
              </div>
              <span className="text-xs text-emerald-200 font-bold">
                {language === 'ta' ? `கேள்வி ${currentQuizIndex + 1} / ${QUIZ_QUESTIONS.length}` : `Question ${currentQuizIndex + 1} of ${QUIZ_QUESTIONS.length}`}
              </span>
            </div>

            {!quizCompleted ? (
              <div className="space-y-4">
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 font-bold uppercase tracking-wider">
                  {QUIZ_QUESTIONS[currentQuizIndex].topic}
                </span>

                <h3 className="text-lg sm:text-xl font-bold font-serif leading-snug">
                  {language === 'ta' && QUIZ_QUESTIONS[currentQuizIndex].questionTa
                    ? QUIZ_QUESTIONS[currentQuizIndex].questionTa
                    : QUIZ_QUESTIONS[currentQuizIndex].question}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {(language === 'ta' && QUIZ_QUESTIONS[currentQuizIndex].optionsTa
                    ? QUIZ_QUESTIONS[currentQuizIndex].optionsTa
                    : QUIZ_QUESTIONS[currentQuizIndex].options
                  ).map((option: string, idx: number) => {
                    const isSelected = selectedAnswerIndex === idx;
                    const isCorrect = idx === QUIZ_QUESTIONS[currentQuizIndex].correctAnswerIndex;
                    let btnStyle = 'bg-white/10 hover:bg-white/20 border-white/15 text-white';

                    if (selectedAnswerIndex !== null) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-600 border-emerald-400 text-white font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-red-600 border-red-400 text-white';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerQuiz(idx)}
                        disabled={selectedAnswerIndex !== null}
                        className={`p-3.5 rounded-2xl border text-left text-xs transition-all ${btnStyle}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {selectedAnswerIndex !== null && (
                  <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-2 animate-fade-in">
                    <p className="text-xs text-emerald-200 leading-relaxed">
                      💡 <strong>{language === 'ta' ? 'விளக்கம்:' : 'Explanation:'}</strong>{' '}
                      {language === 'ta' && QUIZ_QUESTIONS[currentQuizIndex].explanationTa
                        ? QUIZ_QUESTIONS[currentQuizIndex].explanationTa
                        : QUIZ_QUESTIONS[currentQuizIndex].explanation}
                    </p>
                    <button
                      onClick={handleNextQuiz}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md mt-2"
                    >
                      {language === 'ta' ? 'அடுத்த கேள்வி' : 'Next Question'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6 space-y-3">
                <span className="text-4xl">🏆</span>
                <h3 className="text-2xl font-bold font-serif text-white">
                  {language === 'ta' ? 'வினாடி வினா முடிந்தது!' : 'Quiz Completed!'}
                </h3>
                <p className="text-sm text-emerald-200">
                  {language === 'ta' ? `உங்கள் மதிப்பெண்: ${quizScore} / ${QUIZ_QUESTIONS.length}` : `Your Score: ${quizScore} out of ${QUIZ_QUESTIONS.length}`}
                </p>
                <button
                  onClick={() => {
                    setCurrentQuizIndex(0);
                    setSelectedAnswerIndex(null);
                    setQuizScore(0);
                    setQuizCompleted(false);
                  }}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
                >
                  {language === 'ta' ? 'மீண்டும் விளையாடு' : 'Play Again'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 6: COMPANION PLANTING & SOIL MIX RECIPES */}
      {activeTab === 'companion-soil' && (
        <div className="space-y-6 animate-fade-in">
          {/* Companion Matrix */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-lg font-bold font-serif text-[#174D35] flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600" />
              {language === 'ta' ? 'தோழமை தாவர வழிகாட்டி (Companion Matrix)' : 'Companion Planting Matrix'}
            </h3>
            <div className="space-y-4">
              {COMPANION_PLANTING_MATRIX.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                  <h4 className="text-base font-bold text-[#174D35]">{item.plantName}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                      <strong className="text-emerald-900 block mb-1">
                        ✅ {language === 'ta' ? 'நல்ல தோழர்கள்:' : 'Good Companions:'}
                      </strong>
                      <ul className="space-y-1 text-emerald-950">
                        {item.goodCompanions.map((c, i) => (
                          <li key={i}>
                            <strong>{c.name}:</strong> {language === 'ta' && c.benefitTa ? c.benefitTa : c.benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                      <strong className="text-red-900 block mb-1">
                        ❌ {language === 'ta' ? 'தவிர்க்க வேண்டியவை:' : 'Incompatible / Bad Companions:'}
                      </strong>
                      <ul className="space-y-1 text-red-950">
                        {item.badCompanions.map((c, i) => (
                          <li key={i}>
                            <strong>{c.name}:</strong> {language === 'ta' && c.reasonTa ? c.reasonTa : c.reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soil Recipes */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-lg font-bold font-serif text-[#174D35] flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-600" />
              {language === 'ta' ? 'தொட்டி மண் கலவை ஃபார்முலாக்கள்' : 'Custom Potting Soil Mix Formulas'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SOIL_RECIPES.map((recipe, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100 text-xs space-y-3">
                  <div>
                    <h4 className="font-bold text-sm text-[#174D35]">
                      {language === 'ta' && recipe.categoryNameTa ? recipe.categoryNameTa : recipe.categoryName}
                    </h4>
                    <span className="text-[10px] font-bold text-emerald-700">Ideal pH: {recipe.idealPh}</span>
                  </div>

                  <div className="space-y-1.5">
                    {recipe.ingredients.map((ing, i) => (
                      <div key={i} className="flex items-center justify-between text-stone-700">
                        <span>{ing.name} ({ing.purpose})</span>
                        <strong className="text-emerald-800">{ing.percentage}%</strong>
                      </div>
                    ))}
                  </div>

                  <p className="text-[11px] text-stone-500 pt-2 border-t border-emerald-100">
                    💡 {recipe.potAdvice}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
