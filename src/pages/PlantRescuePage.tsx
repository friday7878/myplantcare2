import React, { useState } from 'react';
import {
  ShieldAlert,
  HeartPulse,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Sparkles,
  Droplets,
  Sun,
  Sprout,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Plant, Language } from '../types';
import { PlantyMascot } from '../components/PlantyMascot';

interface PlantRescuePageProps {
  plants: Plant[];
  currentDiagnosis?: any;
  language: Language;
  onUpdatePlantStatus: (plantId: string, status: any) => void;
}

export const PlantRescuePage: React.FC<PlantRescuePageProps> = ({
  plants,
  currentDiagnosis,
  language,
  onUpdatePlantStatus
}) => {
  const [selectedPlantId, setSelectedPlantId] = useState<string>(plants[0]?.id || '');
  const [checklist, setChecklist] = useState<{ [day: number]: boolean }>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false
  });

  const selectedPlant = plants.find((p) => p.id === selectedPlantId) || plants[0];

  const rescueDays = [
    {
      day: 1,
      title: 'Emergency Triage & Drainage Check',
      desc: 'Inspect bottom drain holes. If soil is swimming in stagnant water, gently tilt pot and let drain completely. Remove from direct harsh sun.'
    },
    {
      day: 2,
      title: 'Quarantine & Pest Inspection',
      desc: 'Move plant 3 feet away from healthy neighbor pots. Inspect stem crotches and leaf undersides with a flashlight for tiny mites or scale.'
    },
    {
      day: 3,
      title: 'Antifungal / Organic Tonic Application',
      desc: 'Mist lightly with diluted sour buttermilk or neem oil solution (1 tsp in 1L lukewarm water). Avoid drenching the soil.'
    },
    {
      day: 4,
      title: 'Pruning Necrotic Dead Tissue',
      desc: 'Using clean scissors wiped with alcohol, clip away completely blackened or decayed leaves so the plant conserves precious energy.'
    },
    {
      day: 5,
      title: 'Filtered Morning Sunshine Exposure',
      desc: 'Allow 2 hours of gentle early morning sunlight (before 9 AM), then return to bright, indirect breeze location.'
    },
    {
      day: 6,
      title: 'Root Zone Moisture Evaluation',
      desc: 'Poke finger 2 inches into soil. Only water if the topsoil has completely dried out. Add 2 tablespoons of rich vermicompost.'
    },
    {
      day: 7,
      title: 'Recovery Check & Cellular Rebound',
      desc: 'Inspect crown for tiny green budding shoots or firmer leaf stems. Celebrate plant survival!'
    }
  ];

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / 7) * 100);

  const toggleCheck = (day: number) => {
    const updated = { ...checklist, [day]: !checklist[day] };
    setChecklist(updated);

    if (day === 7 && !checklist[7]) {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });
      if (selectedPlant) {
        onUpdatePlantStatus(selectedPlant.id, 'healthy');
      }
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-[#183B2A] pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-red-600 via-rose-700 to-amber-700 text-white p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <HeartPulse className="w-4 h-4 text-rose-200 animate-pulse" />
            <span>Botanical Emergency ICU</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-black leading-tight">
            PLANT RESCUE MODE
          </h2>
          <p className="text-xs sm:text-sm text-rose-100 max-w-lg leading-relaxed">
            {language === 'ta'
              ? 'வாடும் அல்லது சேதமடைந்த செடிகளை மீண்டும் உயிர்ப்பிக்கும் சிறப்பு தீவிர சிகிச்சை திட்டம்.'
              : 'Dedicated 7-day resuscitation program to reverse root rot, dehydration shock, severe pest damage and nutrient lock.'}
          </p>
        </div>

        <PlantyMascot
          mood={progressPercent > 70 ? 'happy' : 'sad'}
          size="md"
          interactive={true}
          showSpeechBubble={true}
          message={
            progressPercent > 70
              ? 'We did it! The plant is recovering wonderfully!'
              : 'Do not lose hope! Follow the 7-day recovery plan step by step.'
          }
        />
      </div>

      {/* Select Plant in ICU */}
      <div className="p-5 rounded-3xl bg-white border border-[#A8DDB5] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
            Currently in ICU Care
          </label>
          <div className="flex items-center gap-3">
            <select
              value={selectedPlantId}
              onChange={(e) => setSelectedPlantId(e.target.value)}
              className="font-bold text-base text-[#174D35] bg-transparent outline-none cursor-pointer"
            >
              {plants.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.healthStatus})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Recovery Progress Metric */}
        <div className="w-full sm:w-64 space-y-1">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-gray-500">Recovery Progress</span>
            <span className="text-[#2E8B57]">{progressPercent}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
            <div
              style={{ width: `${progressPercent}%` }}
              className="h-full bg-gradient-to-r from-amber-500 to-[#2E8B57] transition-all duration-500 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* 7-DAY RECOVERY ROADMAP */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-[#174D35] flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#2E8B57]" />
            <span>7-Day ICU Rehabilitation Roadmap</span>
          </h3>
          <span className="text-xs text-gray-500 font-semibold">
            {completedCount} of 7 tasks checked
          </span>
        </div>

        <div className="space-y-3">
          {rescueDays.map((step) => {
            const isDone = checklist[step.day];
            return (
              <div
                key={step.day}
                onClick={() => toggleCheck(step.day)}
                className={`p-4 sm:p-5 rounded-3xl border transition-all cursor-pointer flex items-start gap-4 ${
                  isDone
                    ? 'bg-[#E8F8ED] border-[#A8DDB5] shadow-xs'
                    : 'bg-white border-gray-200 hover:border-[#A8DDB5]'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-2xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                    isDone ? 'bg-[#2E8B57] text-white' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : `D${step.day}`}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`text-sm font-bold ${
                        isDone ? 'line-through text-gray-500' : 'text-[#174D35]'
                      }`}
                    >
                      Day {step.day}: {step.title}
                    </h4>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        isDone ? 'bg-emerald-200 text-emerald-900' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {isDone ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
