import React, { useState } from 'react';
import { 
  Sun, Cloud, CloudRain, Wind, Droplets, Thermometer, 
  MapPin, Sparkles, AlertTriangle, ChevronDown 
} from 'lucide-react';
import { Language, WeatherCondition } from '../types';
import { WEATHER_CITIES } from '../data/gardeningToolsData';
import PlantyMascot from './PlantyMascot';

interface WeatherWidgetProps {
  language: Language;
  onCityChange?: (city: string) => void;
}

export default function WeatherWidget({
  language,
  onCityChange
}: WeatherWidgetProps) {
  const [selectedCityName, setSelectedCityName] = useState<string>('Chennai');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentWeather = WEATHER_CITIES.find((c) => c.city === selectedCityName) || WEATHER_CITIES[0];

  const handleSelectCity = (city: string) => {
    setSelectedCityName(city);
    setIsDropdownOpen(false);
    if (onCityChange) onCityChange(city);
  };

  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'rain':
        return <CloudRain className="w-8 h-8 text-blue-400" />;
      case 'cloud':
        return <Cloud className="w-8 h-8 text-sky-400" />;
      case 'wind':
        return <Wind className="w-8 h-8 text-teal-400" />;
      default:
        return <Sun className="w-8 h-8 text-amber-400 animate-spin-slow" />;
    }
  };

  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-stone-900 text-white p-6 shadow-xl border border-emerald-500/20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header & City Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <MapPin className="w-5 h-5 text-emerald-400" />
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 text-base font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl border border-white/15 transition-colors"
            >
              <span>{currentWeather.city}</span>
              <ChevronDown className="w-4 h-4 text-emerald-300" />
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-44 rounded-2xl bg-stone-900 border border-stone-700 shadow-2xl py-2 z-20 animate-fade-in">
                {WEATHER_CITIES.map((c) => (
                  <button
                    key={c.city}
                    onClick={() => handleSelectCity(c.city)}
                    className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-emerald-900/50 flex items-center justify-between transition-colors ${
                      c.city === currentWeather.city ? 'text-emerald-400 font-bold' : 'text-stone-300'
                    }`}
                  >
                    <span>{c.city}</span>
                    <span className="text-[10px] text-stone-500">{c.temperatureC}°C</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <span className="text-xs text-emerald-300/80 font-medium hidden sm:inline">
            {language === 'ta' ? 'நேரலை தட்பவெப்ப பராமரிப்பு' : 'Live Botanical Weather Engine'}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-200">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{currentWeather.conditionText}</span>
        </div>
      </div>

      {/* Main Weather Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-b border-white/10">
        {/* Temp */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-white/10 shrink-0">
            {renderIcon(currentWeather.conditionIcon)}
          </div>
          <div>
            <p className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">
              {language === 'ta' ? 'வெப்பநிலை' : 'Temperature'}
            </p>
            <p className="text-2xl font-extrabold font-serif">
              {currentWeather.temperatureC}°C
            </p>
          </div>
        </div>

        {/* Humidity */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-white/10 shrink-0">
            <Droplets className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <p className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">
              {language === 'ta' ? 'ஈரப்பதம்' : 'Air Humidity'}
            </p>
            <p className="text-2xl font-extrabold font-serif">
              {currentWeather.humidityPercent}%
            </p>
          </div>
        </div>

        {/* Rain Probability */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-white/10 shrink-0">
            <CloudRain className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">
              {language === 'ta' ? 'மழை வாய்ப்பு' : 'Rain Chance'}
            </p>
            <p className="text-2xl font-extrabold font-serif">
              {currentWeather.rainProbabilityPercent}%
            </p>
          </div>
        </div>

        {/* Wind Speed */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-white/10 shrink-0">
            <Wind className="w-6 h-6 text-teal-300" />
          </div>
          <div>
            <p className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">
              {language === 'ta' ? 'காற்று வேகம்' : 'Wind Speed'}
            </p>
            <p className="text-2xl font-extrabold font-serif">
              {currentWeather.windSpeedKmh} <span className="text-xs font-normal">km/h</span>
            </p>
          </div>
        </div>
      </div>

      {/* PLANTY Mascot Weather Recommendation Banner */}
      <div className="flex items-start gap-4 pt-5">
        <PlantyMascot mood="speaking" size="sm" animate />
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            {language === 'ta' ? `பிளாண்டியின் ${currentWeather.city} தாவர பராமரிப்பு ஆலோசனை:` : `PLANTY's Microclimate Action for ${currentWeather.city}:`}
          </h4>
          <p className="text-sm text-stone-200 mt-1 leading-relaxed">
            {language === 'ta' && currentWeather.plantAdviceTa ? currentWeather.plantAdviceTa : currentWeather.plantAdvice}
          </p>
        </div>
      </div>
    </div>
  );
}
