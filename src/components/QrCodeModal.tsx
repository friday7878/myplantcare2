import React, { useRef } from 'react';
import { X, QrCode, Printer, Download, Droplets, Sun, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language, Plant } from '../types';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  plant: Plant | null;
}

export default function QrCodeModal({
  isOpen,
  onClose,
  language,
  plant
}: QrCodeModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !plant) return null;

  // Generate SVG QR Code representation with high-density data url or QR matrix
  // Generate a reliable QR code image url using Google Charts / QR Server API or inline clean SVG
  const qrData = encodeURIComponent(`${window.location.origin}/#plant-${plant.id}`);
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrData}&color=174D35&bgcolor=FFFFFF`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in print:p-0 print:bg-white">
      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-emerald-100 dark:border-stone-800 overflow-hidden my-8 print:shadow-none print:border-none print:m-0">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-emerald-800 to-teal-800 text-white print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
              <QrCode className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif">
                {language === 'ta' ? 'தாவர QR குறியீடு அட்டை' : 'Botanical QR Plant Tag'}
              </h2>
              <p className="text-xs text-emerald-200/90">
                {language === 'ta' ? 'அச்சிட்டு தொட்டியில் பொருத்தக்கூடிய ஸ்மார்ட் லேபிள்' : 'Printable smart pot marker with care instructions'}
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

        {/* Printable Botanical Label Card */}
        <div className="p-6 flex flex-col items-center">
          <div 
            ref={cardRef}
            className="w-full max-w-sm rounded-3xl border-2 border-emerald-700 p-6 bg-emerald-50/50 dark:bg-stone-800 shadow-md text-stone-900 dark:text-stone-100 relative print:border-2 print:border-black print:bg-white print:text-black"
          >
            {/* Tag Header */}
            <div className="text-center pb-4 border-b border-emerald-200 dark:border-stone-700">
              <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-700 dark:text-emerald-400">
                MY PLANT CARE • BOTANICAL TAG
              </span>
              <h3 className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-1">
                {plant.name}
              </h3>
              <p className="text-xs italic text-stone-500 dark:text-stone-400">
                {plant.scientificName || plant.commonName}
              </p>
              <div className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-200/70 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
                {plant.category}
              </div>
            </div>

            {/* QR Code Graphic */}
            <div className="my-5 flex flex-col items-center">
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-emerald-100">
                <img 
                  src={qrImageUrl} 
                  alt={`QR for ${plant.name}`} 
                  className="w-36 h-36 object-contain"
                />
              </div>
              <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-2 text-center">
                {language === 'ta' ? 'கேமரா மூலம் ஸ்கேன் செய்து நேரலை பராமரிப்பை அறியவும்' : 'Scan with mobile camera for live care schedules'}
              </p>
            </div>

            {/* Quick Specs Icons */}
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-emerald-200 dark:border-stone-700 text-xs font-semibold">
              <div className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
                <Droplets className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{language === 'ta' ? `${plant.wateringFrequencyDays} நாட்களுக்கு ஒருமுறை` : `Every ${plant.wateringFrequencyDays} days`}</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
                <Sun className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="truncate">{plant.sunlightRequirement}</span>
              </div>
            </div>

            {/* Tagline */}
            <div className="mt-4 pt-3 border-t border-dashed border-emerald-300 dark:border-stone-700 text-center">
              <p className="text-[10px] font-medium text-emerald-800 dark:text-emerald-400 italic">
                "Grow Green. Live Clean. Let PLANTY Care!"
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 mt-6 print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md transition-all hover:scale-105"
            >
              <Printer className="w-4 h-4" />
              {language === 'ta' ? 'அச்சிடு (Print Tag)' : 'Print Pot Marker'}
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold transition-colors"
            >
              {language === 'ta' ? 'மூடு' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
