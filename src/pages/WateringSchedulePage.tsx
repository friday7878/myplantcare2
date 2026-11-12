import React, { useState } from 'react';
import {
  Droplets,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Plus,
  Trash2,
  Sparkles,
  History,
  X,
  Bell
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WateringSchedule, WateringLog, Plant, Language } from '../types';

interface WateringSchedulePageProps {
  schedules: WateringSchedule[];
  wateringLogs: WateringLog[];
  plants: Plant[];
  onCompleteWatering: (scheduleId: string, plantId: string, plantName: string) => void;
  onAddSchedule: (schedule: Omit<WateringSchedule, 'id' | 'createdAt'>) => void;
  onDeleteSchedule: (scheduleId: string) => void;
  language: Language;
}

export const WateringSchedulePage: React.FC<WateringSchedulePageProps> = ({
  schedules,
  wateringLogs,
  plants,
  onCompleteWatering,
  onAddSchedule,
  onDeleteSchedule,
  language
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPlantId, setSelectedPlantId] = useState(plants[0]?.id || '');
  const [intervalDays, setIntervalDays] = useState(3);
  const [nextDate, setNextDate] = useState(new Date().toISOString().split('T')[0]);
  const [activeTab, setActiveTab] = useState<'schedule' | 'history'>('schedule');

  const todayStr = new Date().toISOString().split('T')[0];

  const overdueTasks = schedules.filter(
    (s) => s.nextWateringDate < todayStr && s.status !== 'completed'
  );
  const todayTasks = schedules.filter(
    (s) => s.nextWateringDate === todayStr && s.status !== 'completed'
  );
  const upcomingTasks = schedules.filter(
    (s) => s.nextWateringDate > todayStr || s.status === 'completed'
  );

  const handleWaterClick = (s: WateringSchedule) => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#2E8B57', '#60A5FA', '#A8DDB5']
    });
    onCompleteWatering(s.id, s.plantId, s.plantName);
  };

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const plant = plants.find((p) => p.id === selectedPlantId);
    if (!plant) return;

    onAddSchedule({
      userId: '',
      plantId: plant.id,
      plantName: plant.name,
      intervalDays: Number(intervalDays),
      nextWateringDate: nextDate,
      status: 'upcoming'
    });
    setIsAddModalOpen(false);
  };

  const requestBrowserNotifications = async () => {
    if ('Notification' in window) {
      const perm = await Notification.requestPermission();
      if (perm === 'granted') {
        new Notification('MY PLANT CARE', {
          body: 'Watering reminders enabled! PLANTY will notify you when plants are thirsty.',
          icon: '/favicon.ico'
        });
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-[#183B2A] pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Droplets className="w-3.5 h-3.5" />
            <span>Hydration Intelligence</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#174D35]">
            {language === 'ta' ? 'நீரூற்றும் அட்டவணை & நினைவூட்டல்கள்' : 'Smart Watering Schedule'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            {language === 'ta'
              ? 'செடிகளுக்கு தண்ணீர் ஊற்றியதை பதிவு செய்து, தாமதமான பணிகளை கவனியுங்கள்.'
              : 'Automated hydration intervals, upcoming tasks, and historical watering logs.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={requestBrowserNotifications}
            className="px-3.5 py-2.5 rounded-2xl bg-white border border-[#A8DDB5] text-[#174D35] hover:bg-[#A8DDB5]/20 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Enable browser notifications"
          >
            <Bell className="w-4 h-4 text-[#2E8B57]" />
            <span className="hidden sm:inline">Enable Alerts</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 rounded-2xl bg-[#174D35] hover:bg-[#2E8B57] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'ta' ? 'புதிய அட்டவணை' : 'Add Schedule'}</span>
          </button>
        </div>
      </div>

      {/* OVERDUE ALERT BANNER */}
      {overdueTasks.length > 0 && (
        <div className="p-4 sm:p-5 rounded-3xl bg-amber-50 border-2 border-amber-300 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-amber-900">
                {overdueTasks.length} {language === 'ta' ? 'செடிகள் தாமதமாகியுள்ளன!' : 'Watering Tasks Overdue!'}
              </h4>
              <p className="text-xs text-amber-800">
                {overdueTasks.map((t) => t.plantName).join(', ')} urgently need hydration.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => overdueTasks.forEach(handleWaterClick)}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
          >
            {language === 'ta' ? 'அனைத்திற்கும் ஊற்றுக' : 'Water All Overdue'}
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('schedule')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'schedule'
              ? 'bg-[#174D35] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Active Schedules ({schedules.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'history'
              ? 'bg-[#174D35] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Watering History Log ({wateringLogs.length})</span>
        </button>
      </div>

      {activeTab === 'schedule' ? (
        <div className="space-y-6">
          {/* TODAY TASKS */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-base text-[#174D35] flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>Due Today</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                {todayTasks.length}
              </span>
            </h3>

            {todayTasks.length === 0 ? (
              <div className="p-6 rounded-2xl bg-white border border-gray-100 text-center text-xs text-gray-500">
                No tasks scheduled for today. Plants are well hydrated!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {todayTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 rounded-3xl bg-white border-2 border-[#A8DDB5] shadow-xs flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                        <Droplets className="w-6 h-6 animate-bounce-subtle" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#174D35]">{task.plantName}</h4>
                        <p className="text-xs text-gray-500">Every {task.intervalDays} days</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleWaterClick(task)}
                      className="px-4 py-2 rounded-xl bg-[#2E8B57] hover:bg-[#174D35] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Water Now (+10 Pts)</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* UPCOMING / ALL SCHEDULES */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-base text-[#174D35] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#2E8B57]" />
              <span>Upcoming & Scheduled Routines</span>
            </h3>

            {schedules.length === 0 ? (
              <div className="p-8 rounded-3xl bg-white border border-[#A8DDB5]/60 text-center space-y-2">
                <Droplets className="w-10 h-10 text-[#2E8B57] mx-auto opacity-40" />
                <h4 className="font-bold text-sm text-[#174D35]">No active schedules yet</h4>
                <p className="text-xs text-gray-500">
                  Add a watering interval for your plants to receive smart reminders.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {schedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="p-4 rounded-3xl bg-white border border-[#A8DDB5]/60 shadow-xs space-y-3 flex flex-col justify-between"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-[#174D35]">{schedule.plantName}</h4>
                        <span className="text-[11px] text-gray-500 block">
                          Next: <strong>{schedule.nextWateringDate}</strong>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onDeleteSchedule(schedule.id)}
                        className="p-1 rounded-full text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete Schedule"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-100">
                      <span className="text-gray-500">Interval: {schedule.intervalDays} days</span>
                      <button
                        type="button"
                        onClick={() => handleWaterClick(schedule)}
                        className="px-3 py-1 rounded-xl bg-[#E8F8ED] hover:bg-[#2E8B57] text-[#174D35] hover:text-white font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Droplets className="w-3 h-3 text-blue-500" />
                        <span>Water</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* WATERING HISTORY LOG */
        <div className="rounded-3xl bg-white border border-[#A8DDB5]/60 p-4 sm:p-6 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-[#174D35]">Completed Watering Log</h3>
          {wateringLogs.length === 0 ? (
            <p className="text-xs text-gray-500 py-6 text-center">
              No watering records logged yet. Click "Water Now" on any plant to start recording!
            </p>
          ) : (
            <div className="divide-y divide-gray-100 text-xs">
              {wateringLogs.map((log) => (
                <div key={log.id} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2E8B57]" />
                    <span className="font-bold text-[#174D35]">{log.plantName}</span>
                  </div>
                  <span className="text-gray-400">{log.wateredAt}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ADD SCHEDULE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-white border border-[#A8DDB5] shadow-2xl p-6 text-[#183B2A]">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="font-bold text-base text-[#174D35]">Create Watering Schedule</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full hover:bg-black/5 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSchedule} className="space-y-4 text-xs sm:text-sm">
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

              <div>
                <label className="block font-bold text-gray-700 mb-1">Interval (Days)</label>
                <input
                  type="number"
                  min="1"
                  max="45"
                  value={intervalDays}
                  onChange={(e) => setIntervalDays(parseInt(e.target.value) || 3)}
                  className="w-full px-3 py-2 rounded-xl border border-[#A8DDB5] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Next Watering Date</label>
                <input
                  type="date"
                  value={nextDate}
                  onChange={(e) => setNextDate(e.target.value)}
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
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
