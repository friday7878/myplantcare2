import React, { useState } from 'react';
import { Image, Sparkles, Download, Check, X, Loader2, Maximize2 } from 'lucide-react';

interface ImageGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage?: (imageUrl: string) => void;
  language: 'en' | 'ta';
}

export const ImageGenerationModal: React.FC<ImageGenerationModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
  language
}) => {
  const [prompt, setPrompt] = useState('Lush botanical indoor garden with golden pothos, peace lily and terracotta pots in warm morning sunlight');
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '4:3' | '16:9' | '3:4'>('1:1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          imageSize,
          aspectRatio,
          model: 'gemini-3-pro-image-preview'
        })
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to generate image');
      }

      setGeneratedImageUrl(data.imageUrl);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Image generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const presetPrompts = [
    'Healthy Holy Basil (Tulsi) bush in clay pot with glowing morning dew drops',
    'Lush Monstera Deliciosa with large split green leaves in modern living room',
    'Microscopic botanical view of healthy leaf stomata and vibrant chlorophyll',
    'Terrace vegetable garden filled with ripe red tomatoes and green chillies'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#F5FAF5] border border-[#A8DDB5] shadow-2xl p-6 md:p-8 text-[#183B2A] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#A8DDB5]/40 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#174D35] text-white">
              <Sparkles className="w-5 h-5 text-[#A8DDB5]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#174D35]">
                {language === 'ta' ? 'AI தாவர பட உருவாக்கம்' : 'Botanical Image Generator'}
              </h3>
              <p className="text-xs text-[#2E8B57] font-medium">
                Powered by Gemini Vision Model &bull; High Definition 1K, 2K & 4K
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-[#183B2A]/70 hover:text-[#183B2A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#174D35] mb-1.5">
              {language === 'ta' ? 'விளக்கம் (Prompt)' : 'Botanical Description / Prompt'}
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              placeholder="Describe the plant, lighting, pot type and atmosphere..."
              className="w-full rounded-2xl border border-[#A8DDB5] bg-white p-3.5 text-sm focus:border-[#2E8B57] focus:ring-2 focus:ring-[#A8DDB5]/40 outline-none transition-all"
            />
          </div>

          {/* Quick Preset Ideas */}
          <div>
            <span className="text-[11px] font-semibold text-[#2E8B57] uppercase tracking-wider block mb-1">
              {language === 'ta' ? 'மாதிரி யோசனைகள்' : 'Quick Botanical Presets'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {presetPrompts.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPrompt(p)}
                  className="text-xs px-2.5 py-1 rounded-xl bg-white border border-[#A8DDB5]/60 hover:border-[#2E8B57] text-[#174D35] text-left transition-all hover:bg-[#A8DDB5]/20"
                >
                  {p.slice(0, 42)}...
                </button>
              ))}
            </div>
          </div>

          {/* Affordances: Image Size (1K, 2K, 4K) & Aspect Ratio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#174D35] mb-1.5">
                {language === 'ta' ? 'பட தரம் (Resolution)' : 'Resolution Affordance (Size)'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['1K', '2K', '4K'] as const).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setImageSize(size)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                      imageSize === size
                        ? 'bg-[#174D35] text-white border-[#174D35] shadow-sm'
                        : 'bg-white text-[#174D35] border-[#A8DDB5]/80 hover:border-[#2E8B57]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#174D35] mb-1.5">
                {language === 'ta' ? 'அளவு விகிதம்' : 'Aspect Ratio'}
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['1:1', '4:3', '16:9', '3:4'] as const).map((ratio) => (
                  <button
                    key={ratio}
                    type="button"
                    onClick={() => setAspectRatio(ratio)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold text-center transition-all border ${
                      aspectRatio === ratio
                        ? 'bg-[#2E8B57] text-white border-[#2E8B57]'
                        : 'bg-white text-[#174D35] border-[#A8DDB5]/80 hover:border-[#2E8B57]'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
              {errorMsg}
            </div>
          )}

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#174D35] hover:bg-[#2E8B57] text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-[#A8DDB5]" />
                <span>{language === 'ta' ? 'உருவாக்குகிறது...' : `Generating ${imageSize} Botanical Image...`}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-[#A8DDB5]" />
                <span>{language === 'ta' ? 'படத்தை உருவாக்கு' : `Generate Image (${imageSize})`}</span>
              </>
            )}
          </button>
        </div>

        {/* Result Area */}
        {generatedImageUrl && (
          <div className="mt-6 pt-6 border-t border-[#A8DDB5]/40 animate-fade-in">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#174D35] mb-2 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#2E8B57]" />
              Generated {imageSize} Botanical Asset
            </h4>
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#A8DDB5] bg-black/5 shadow-inner flex items-center justify-center">
              <img
                src={generatedImageUrl}
                alt={prompt}
                className="max-h-80 w-auto object-contain rounded-2xl"
              />
            </div>
            <div className="mt-3 flex items-center justify-end gap-3">
              <a
                href={generatedImageUrl}
                download="plant-botanical-art.png"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#A8DDB5] text-[#174D35] text-xs font-semibold hover:bg-[#A8DDB5]/20 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                Download ({imageSize})
              </a>
              {onSelectImage && (
                <button
                  type="button"
                  onClick={() => {
                    onSelectImage(generatedImageUrl);
                    onClose();
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2E8B57] text-white text-xs font-semibold hover:bg-[#174D35] transition-colors shadow-sm"
                >
                  <Check className="w-4 h-4" />
                  Use for Plant Photo
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
