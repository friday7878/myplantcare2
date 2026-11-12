import React from 'react';
import { Bell, CheckCheck, X, Droplets, AlertTriangle, TrendingUp, Sparkles, Award } from 'lucide-react';
import { NotificationItem, Language } from '../types';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onClearNotifications: () => void;
  language: Language;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onClearNotifications,
  language
}) => {
  if (!isOpen) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'watering':
        return <Droplets className="w-4 h-4 text-blue-500" />;
      case 'health':
        return <AlertTriangle className="w-4 h-4 text-[#F4A340]" />;
      case 'growth':
        return <TrendingUp className="w-4 h-4 text-[#2E8B57]" />;
      case 'achievement':
        return <Award className="w-4 h-4 text-amber-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#2E8B57]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-white border border-[#A8DDB5] shadow-2xl p-6 text-[#183B2A] max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#A8DDB5]/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#E8F8ED] text-[#174D35]">
              <Bell className="w-5 h-5 text-[#2E8B57]" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#174D35]">
                {language === 'ta' ? 'அறிவிப்பு மையம்' : 'Notification Centre'}
              </h3>
              <p className="text-xs text-[#2E8B57] font-medium">
                {notifications.length} {language === 'ta' ? 'அறிவிப்புகள்' : 'Alerts & Reminders'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/5 text-gray-500 hover:text-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between py-2.5 px-1 shrink-0 text-xs font-semibold">
          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="text-[#2E8B57] hover:text-[#174D35] flex items-center gap-1"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'அனைத்தும் படித்தவை' : 'Mark all as read'}</span>
          </button>
          <button
            type="button"
            onClick={onClearNotifications}
            className="text-gray-400 hover:text-[#E65A5A]"
          >
            {language === 'ta' ? 'அனைத்தையும் நீக்கு' : 'Clear all'}
          </button>
        </div>

        {/* Notification List */}
        <div className="overflow-y-auto space-y-2.5 pr-1 flex-1 py-1">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-30 text-[#2E8B57]" />
              <p>{language === 'ta' ? 'புதிய அறிவிப்புகள் இல்லை!' : 'No new notifications right now!'}</p>
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  item.read
                    ? 'bg-gray-50/60 border-gray-100 text-gray-600'
                    : 'bg-[#E8F8ED]/60 border-[#A8DDB5] text-[#183B2A] shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white shadow-xs shrink-0 mt-0.5">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold leading-snug">{item.title}</h4>
                    <p className="text-[11px] leading-relaxed mt-0.5 opacity-90">{item.message}</p>
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
