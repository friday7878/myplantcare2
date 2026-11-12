import React, { useState } from 'react';
import {
  TrendingUp,
  Plus,
  Award,
  Calendar,
  Ruler,
  Leaf,
  Sparkles,
  Camera,
  CheckCircle2,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GrowthRecord, Plant, Language } from '../types';

interface GrowthTrackerPageProps {
  growthRecords: GrowthRecord[];
  plants: Plant[];
  onAddRecord: (record: Omit<GrowthRecord, 'id' | 'createdAt'>) => void;
  language: Language;
}

export const GrowthTrackerPage: React.FC<GrowthTrackerPageProps> = ({
  growthRecords,
  plants,
  onAddRecord,
  language
}) => {
  const [selectedPlantId, setSelectedPlantId] = useState<string>(plants[0]?.id || '');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [heightCm, setHeightCm] = useState<number>(18);
  const [leafCount, setLeafCount] = useState<number>(8);
  const [observation, setObservation] = useState('New bright green leaf tip unfurling cleanly.');
  const [recordedDate, setRecordedDate] = useState(new Date().toISOString().split('T')[0]);

  const plantRecords = growthRecords.filter((r) => !selectedPlantId || r.plantId === selectedPlantId);

  const handleCreateRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const plant = plants.find((p) => p.id === selectedPlantId) || plants[0];
    if (!plant) return;

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#2E8B57', '#A8DDB5', '#F5FAF5']
    });

    onAddRecord({
      userId: '',
      plantId: plant.id,
      plantName: plant.name,
      heightCm: Number(heightCm),
      leafCount: Number(leafCount),
      observation,
      recordedDate
    });
    setIsAddModalOpen(false);
  };

  const milestones = [
    { title: 'First New Leaf', desc: 'Recorded emergence of fresh sprout foliage', unlocked: growthRecords.length >= 1 },
    { title: '10cm Height Milestone', desc: 'Plant reached double-digit stature', unlocked: growthRecords.some((r) => r.heightCm >= 10) },
    { title: 'Growth Guardian (3+ Logs)', desc: 'Consistent 3-week monitoring habit', unlocked: growthRecords.length >= 3 },
    { title: 'Foliage Master (15+ Leaves)', desc: 'Lush dense canopy achievement', unlocked: growthRecords.some((r) => r.leafCount >= 15) }
  ];

  return (
    <div className="space-y-8 animate-fade-in text-[#183B2A] pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Botanical Progression</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#174D35]">
            {language === 'ta' ? 'தாவர வளர்ச்சி கண்காணிப்பு' : 'Plant Growth Tracker'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            {language === 'ta'
              ? 'செடியின் உயரம், இலைகளின் எண்ணிக்கை மற்றும் வளர்ச்சி மாற்றங்களை வரைபடமாக பாருங்கள்.'
              : 'Record height in cm, leaf count expansion, progress photos, and milestone celebrations.'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 rounded-2xl bg-[#174D35] hover:bg-[#2E8B57] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'ta' ? 'புதிய பதிவு சேர்க்க' : 'Add Growth Log'}</span>
        </button>
      </div>

      {/* Filter by Plant */}
      <div className="flex items-center gap-3">
        <label className="text-xs font-bold text-gray-600 uppercase">Filter Plant:</label>
        <select
          value={selectedPlantId}
          onChange={(e) => setSelectedPlantId(e.target.value)}
          className="px-4 py-2 rounded-xl border border-[#A8DDB5] bg-white text-xs font-bold text-[#174D35] outline-none cursor-pointer"
        >
          <option value="">All Garden Plants</option>
          {plants.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* ANALYTICS VISUALIZATION BARS / CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Height Progression Card */}
        <div className="p-6 rounded-3xl bg-white border border-[#A8DDB5]/60 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-[#2E8B57]" />
              <h3 className="font-bold text-sm text-[#174D35]">Height Progression (cm)</h3>
            </div>
            <span className="text-xs font-bold text-gray-500">
              Latest: {plantRecords[plantRecords.length - 1]?.heightCm || 0} cm
            </span>
          </div>

          {plantRecords.length === 0 ? (
            <p className="text-xs text-gray-400 py-10 text-center">No height entries logged yet.</p>
          ) : (
            <div className="flex items-end gap-3 h-40 pt-6 px-2 border-b border-gray-200">
              {plantRecords.map((r, idx) => {
                const heightPercentage = Math.min(100, Math.max(15, (r.heightCm / 50) * 100));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-bold text-[#174D35]">{r.heightCm}cm</span>
                    <div
                      style={{ height: `${heightPercentage}%` }}
                      className="w-full max-w-[36px] rounded-t-xl bg-gradient-to-t from-[#174D35] to-[#2E8B57] transition-all duration-500"
                    />
                    <span className="text-[9px] text-gray-400 truncate max-w-full">
                      {r.recordedDate.slice(5)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Leaf Count Card */}
        <div className="p-6 rounded-3xl bg-white border border-[#A8DDB5]/60 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-sm text-[#174D35]">Leaf Count Growth</h3>
            </div>
            <span className="text-xs font-bold text-gray-500">
              Latest: {plantRecords[plantRecords.length - 1]?.leafCount || 0} leaves
            </span>
          </div>

          {plantRecords.length === 0 ? (
            <p className="text-xs text-gray-400 py-10 text-center">No leaf counts recorded yet.</p>
          ) : (
            <div className="flex items-end gap-3 h-40 pt-6 px-2 border-b border-gray-200">
              {plantRecords.map((r, idx) => {
                const leafPercentage = Math.min(100, Math.max(15, (r.leafCount / 30) * 100));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-bold text-emerald-700">{r.leafCount}</span>
                    <div
                      style={{ height: `${leafPercentage}%` }}
                      className="w-full max-w-[36px] rounded-t-xl bg-gradient-to-t from-emerald-700 to-emerald-400 transition-all duration-500"
                    />
                    <span className="text-[9px] text-gray-400 truncate max-w-full">
                      {r.recordedDate.slice(5)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* MILESTONES & ACHIEVEMENTS */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-[#174D35] flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>Growth Milestones & Badges</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-3xl border transition-all ${
                m.unlocked
                  ? 'bg-amber-50/70 border-amber-300 shadow-xs'
                  : 'bg-gray-50/60 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{m.unlocked ? '🏆' : '🔒'}</span>
                {m.unlocked && (
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                    Unlocked
                  </span>
                )}
              </div>
              <h4 className="font-bold text-xs text-[#174D35]">{m.title}</h4>
              <p className="text-[11px] text-gray-500 mt-1 leading-snug">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* HISTORICAL OBSERVATION TIMELINE */}
      <div className="p-6 rounded-3xl bg-white border border-[#A8DDB5]/60 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-[#174D35]">Observation Log History</h3>
        {plantRecords.length === 0 ? (
          <p className="text-xs text-gray-400 py-4 text-center">No observation entries logged yet.</p>
        ) : (
          <div className="divide-y divide-gray-100 space-y-3">
            {plantRecords.map((r) => (
              <div key={r.id} className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#174D35]">{r.plantName}</span>
                    <span className="text-gray-400">&bull; {r.recordedDate}</span>
                  </div>
                  <p className="text-gray-600 mt-0.5">{r.observation}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0 text-gray-500">
                  <span><strong>{r.heightCm}</strong> cm height</span>
                  <span><strong>{r.leafCount}</strong> leaves</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ADD LOG MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-white border border-[#A8DDB5] shadow-2xl p-6 text-[#183B2A]">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="font-bold text-base text-[#174D35]">Record Growth Observation</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full hover:bg-black/5 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRecord} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Select Plant</label>
                <select
                  value={selectedPlantId}
                  onChange={(e) => setSelectedPlantId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#A8DDB5] outline-none bg-white"
                >
                  {plants.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Height (cm)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    value={heightCm}
                    onChange={(e) => setHeightCm(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-[#A8DDB5] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Total Leaf Count</label>
                  <input
                    type="number"
                    min="1"
                    value={leafCount}
                    onChange={(e) => setLeafCount(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-[#A8DDB5] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Observation Date</label>
                <input
                  type="date"
                  value={recordedDate}
                  onChange={(e) => setRecordedDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#A8DDB5] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Growth Notes</label>
                <textarea
                  rows={3}
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                  placeholder="Noticed new leaf sprout, vigorous stem thickening..."
                  className="w-full px-3 py-2 rounded-xl border border-[#A8DDB5] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-gray-600 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#174D35] hover:bg-[#2E8B57] text-white font-bold text-xs shadow-md"
                >
                  Save Growth Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
