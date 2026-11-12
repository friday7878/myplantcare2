import React, { useState } from 'react';
import {
  Lightbulb,
  Search,
  BookOpen,
  Sprout,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles
} from 'lucide-react';
import { GARDENING_TIPS, GardeningTip } from '../data/gardeningTips';
import { Language } from '../types';

interface GardeningTipsPageProps {
  language: Language;
}

export const GardeningTipsPage: React.FC<GardeningTipsPageProps> = ({ language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(GARDENING_TIPS[0]?.id || null);

  const categories = ['All', 'Organic', 'Kitchen', 'Terrace', 'Pest Control', 'Compost', 'Indoor', 'Sustainable', 'Seasonal'];

  const filteredTips = GARDENING_TIPS.filter((tip) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      tip.title.toLowerCase().includes(query) ||
      tip.titleTa.toLowerCase().includes(query) ||
      tip.summary.toLowerCase().includes(query) ||
      tip.content.toLowerCase().includes(query);

    const matchesCategory = selectedCategory === 'All' || tip.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in text-[#183B2A] pb-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-1">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Botanical Learning Academy</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#174D35]">
          {language === 'ta' ? 'தோட்டக்கலைக் குறிப்புகள் & வழிகாட்டல்' : 'Gardening Tips & Learning Centre'}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600">
          {language === 'ta'
            ? 'இயற்கை உரங்கள், மாடித் தோட்டம் மற்றும் பூச்சி மேலாண்மை பற்றிய அறிவுப் பெட்டகம்.'
            : 'Master daily gardening hacks, organic homemade pest remedies, and rooftop terrace secrets.'}
        </p>
      </div>

      {/* Search and Category Filter */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'ta' ? 'குறிப்புகளை தேடுக...' : 'Search tips, organic remedies, compost...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#A8DDB5] bg-white text-xs sm:text-sm focus:border-[#2E8B57] focus:ring-2 focus:ring-[#A8DDB5]/40 outline-none shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#174D35] text-white border-[#174D35] shadow-xs'
                  : 'bg-white text-gray-700 border-[#A8DDB5]/60 hover:border-[#2E8B57]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {filteredTips.map((tip) => {
          const isExpanded = expandedId === tip.id;
          return (
            <div
              key={tip.id}
              className={`rounded-3xl border transition-all overflow-hidden ${
                isExpanded
                  ? 'bg-white border-[#2E8B57] shadow-md ring-1 ring-[#2E8B57]/20'
                  : 'bg-white border-[#A8DDB5]/60 shadow-xs hover:border-[#2E8B57]'
              }`}
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : tip.id)}
                className="p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#E8F8ED] text-[#2E8B57] flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#E8F8ED] text-[#174D35] text-[10px] font-bold uppercase tracking-wider">
                        {language === 'ta' ? tip.categoryTa : tip.category}
                      </span>
                      <span className="text-[11px] text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {tip.readTime}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-base text-[#174D35]">
                      {language === 'ta' ? tip.titleTa : tip.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {language === 'ta' ? tip.summaryTa : tip.summary}
                    </p>
                  </div>
                </div>

                <div className="p-1 rounded-full text-[#2E8B57] shrink-0 mt-1">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {/* Expanded Detail Body */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-gray-100 bg-[#F5FAF5]/50 animate-fade-in text-xs sm:text-sm text-gray-800 leading-relaxed space-y-3">
                  <p className="whitespace-pre-line">
                    {language === 'ta' ? tip.contentTa : tip.content}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
