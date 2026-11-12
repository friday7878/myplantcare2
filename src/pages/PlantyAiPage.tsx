import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  Trash2,
  Volume2,
  VolumeX,
  Brain,
  Zap,
  Flame,
  HelpCircle,
  Loader2
} from 'lucide-react';
import { PlantyMascot } from '../components/PlantyMascot';
import { ChatMessage, Language, PlantyMood, Plant } from '../types';

interface PlantyAiPageProps {
  chatHistory: ChatMessage[];
  onSendMessage: (content: string, role: 'user' | 'assistant', modelUsed?: string) => void;
  onClearChat: () => void;
  language: Language;
  plants: Plant[];
}

export const PlantyAiPage: React.FC<PlantyAiPageProps> = ({
  chatHistory,
  onSendMessage,
  onClearChat,
  language,
  plants
}) => {
  const [inputText, setInputText] = useState('');
  const [selectedMode, setSelectedMode] = useState<'high_thinking' | 'deep_reasoning' | 'complex' | 'general' | 'fast'>('general');
  const [isTyping, setIsTyping] = useState(false);
  const [mascotMood, setMascotMood] = useState<PlantyMood>('idle');
  const [speechEnabled, setSpeechEnabled] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window) || !speechEnabled) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.25;
    utterance.onstart = () => setMascotMood('speaking');
    utterance.onend = () => setMascotMood('idle');
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isTyping) return;

    setInputText('');
    onSendMessage(text, 'user');
    setIsTyping(true);
    setMascotMood(selectedMode === 'high_thinking' ? 'thinking' : 'speaking');

    try {
      const gardenContext = plants.map((p) => `${p.name} (${p.category}, watered every ${p.wateringFrequencyDays}d)`).join(', ');

      const formattedHistory = [
        ...chatHistory.map((m) => ({ role: m.role, content: m.content })),
        { role: 'user', content: text }
      ];

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: formattedHistory,
          mode: selectedMode,
          language,
          gardenContext
        })
      });

      const data = await res.json();
      const reply = data.reply || (language === 'ta' ? 'மன்னிக்கவும், என்னால் புரிந்து கொள்ள முடியவில்லை.' : 'I am here with you to help your garden thrive!');

      onSendMessage(reply, 'assistant', data.modelUsed);
      setMascotMood('happy');
      setTimeout(() => setMascotMood('idle'), 3000);

      if (speechEnabled) {
        speakText(reply);
      }
    } catch (err) {
      console.error(err);
      const fallbackMsg = language === 'ta'
        ? 'தாவரங்களுக்கு தேவையான நீர், வெளிச்சம் மற்றும் உரத்தை சரியாக வழங்கினால் அவை அழகாக வளரும்!'
        : 'Plants thrive when given the proper balance of sunlight, well-draining soil, and consistent moisture!';
      onSendMessage(fallbackMsg, 'assistant');
      setMascotMood('idle');
    } finally {
      setIsTyping(false);
    }
  };

  const sampleQuestions = [
    language === 'ta' ? 'என் துளசி செடியின் இலைகள் ஏன் மஞ்சளாக மாறுகின்றன?' : 'Why are my plant leaves turning yellow?',
    language === 'ta' ? 'வீட்டிற்குள் வளர்க்க உகந்த காற்றை சுத்திகரிக்கும் செடிகள் எவை?' : 'Which plants are best for indoor air purification?',
    language === 'ta' ? 'செம்பருத்தியில் அதிக பூக்கள் பூக்க என்ன இயற்கை உரம் இட வேண்டும்?' : 'How do I boost hibiscus flowering naturally?',
    language === 'ta' ? 'வேப்பெண்ணெய் பூச்சி விரட்டி தயாரிக்கும் முறை என்ன?' : 'How do I make organic neem oil spray for pests?'
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in text-[#183B2A] pb-12 h-[calc(100vh-8rem)] min-h-[600px]">
      {/* LEFT: PLANTY INTERACTIVE MASCOT SIDEBAR */}
      <div className="lg:col-span-4 rounded-3xl bg-gradient-to-b from-[#E8F8ED] via-white to-[#F5FAF5] border-2 border-[#A8DDB5] p-6 shadow-sm flex flex-col justify-between items-center text-center">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#174D35] text-white text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#A8DDB5]" />
            <span>AI Botanical Companion</span>
          </div>
          <h3 className="text-xl font-black text-[#174D35]">PLANTY</h3>
          <p className="text-xs text-gray-600 max-w-xs">
            {language === 'ta'
              ? 'உங்கள் தோட்டத்து செடிகளைப் பற்றி என்னிடம் எந்த கேள்வியும் கேட்கலாம்!'
              : 'Ask me anything about your garden plants, disease remedies, or seasonal care tips.'}
          </p>
        </div>

        {/* Big Interactive Mascot */}
        <div className="py-4">
          <PlantyMascot mood={mascotMood} size="lg" interactive={true} />
        </div>

        {/* Gemini Reasoning Engine Mode Selector */}
        <div className="w-full space-y-2 pt-4 border-t border-[#A8DDB5]/40 text-left">
          <span className="text-[11px] font-bold text-[#2E8B57] uppercase tracking-wider block">
            Intelligence Mode & Engine
          </span>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => setSelectedMode('high_thinking')}
              className={`p-2 rounded-xl border flex items-center gap-1.5 font-bold transition-all ${
                selectedMode === 'high_thinking'
                  ? 'bg-[#174D35] text-white border-[#174D35]'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[#2E8B57]'
              }`}
              title="gemini-4-carbon with ThinkingLevel.HIGH"
            >
              <Brain className="w-3.5 h-3.5 text-purple-400" />
              <span>High Thinking</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMode('deep_reasoning')}
              className={`p-2 rounded-xl border flex items-center gap-1.5 font-bold transition-all ${
                selectedMode === 'deep_reasoning'
                  ? 'bg-[#174D35] text-white border-[#174D35]'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[#2E8B57]'
              }`}
              title="gemini-4-carbon for deep reasoning"
            >
              <Flame className="w-3.5 h-3.5 text-rose-500" />
              <span>Deep Reason</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMode('general')}
              className={`p-2 rounded-xl border flex items-center gap-1.5 font-bold transition-all ${
                selectedMode === 'general'
                  ? 'bg-[#174D35] text-white border-[#174D35]'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[#2E8B57]'
              }`}
              title="gemini-3.8-flash for general tasks"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A8DDB5]" />
              <span>Standard (Flash)</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMode('fast')}
              className={`p-2 rounded-xl border flex items-center gap-1.5 font-bold transition-all ${
                selectedMode === 'fast'
                  ? 'bg-[#174D35] text-white border-[#174D35]'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[#2E8B57]'
              }`}
              title="gemini-3.1-flash-lite for fast tasks"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Fast Lite</span>
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT: CHAT THREAD & INPUT */}
      <div className="lg:col-span-8 rounded-3xl bg-white border border-[#A8DDB5] shadow-sm flex flex-col justify-between overflow-hidden">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-[#F5FAF5]">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-[#2E8B57]" />
            <h4 className="font-bold text-sm text-[#174D35]">
              PLANTY AI Gardening Chat
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSpeechEnabled(!speechEnabled)}
              className={`p-2 rounded-xl transition-colors ${
                speechEnabled ? 'bg-[#2E8B57] text-white' : 'bg-gray-100 text-gray-500'
              }`}
              title={speechEnabled ? 'Mute Speech Output' : 'Enable Voice Playback'}
            >
              {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={onClearChat}
              className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
              title="Clear Conversation"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {chatHistory.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <Bot className="w-12 h-12 text-[#2E8B57] mx-auto opacity-40" />
              <h4 className="font-bold text-base text-[#174D35]">
                {language === 'ta' ? 'வணக்கம்! நான் உங்கள் பிளாண்டி!' : 'Ask PLANTY anything about your plants!'}
              </h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                {language === 'ta'
                  ? 'கீழே உள்ள மாதிரி கேள்விகளை தொடவும் அல்லது உங்கள் சந்தேகங்களை தட்டச்சு செய்யவும்.'
                  : 'Select a suggested inquiry below or ask customized gardening questions.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-md mx-auto pt-2">
                {sampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(q)}
                    className="p-2.5 rounded-2xl bg-[#E8F8ED] hover:bg-[#A8DDB5]/40 text-[#174D35] text-xs font-semibold text-left transition-all border border-[#A8DDB5]/60"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-[#174D35] text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <Bot className="w-4 h-4 text-[#A8DDB5]" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] sm:max-w-md p-4 rounded-3xl text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#174D35] text-white rounded-br-none shadow-md'
                      : 'bg-[#F5FAF5] text-[#183B2A] border border-[#A8DDB5]/60 rounded-bl-none shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  {msg.modelUsed && (
                    <span className="text-[10px] text-gray-400 mt-1.5 block opacity-70">
                      via {msg.modelUsed}
                    </span>
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-[#2E8B57] text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))
          )}

          {isTyping && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-full bg-[#174D35] text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-[#A8DDB5]" />
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F5FAF5] border border-[#A8DDB5]/60 text-xs flex items-center gap-2 text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin text-[#2E8B57]" />
                <span>
                  {selectedMode === 'high_thinking'
                    ? 'PLANTY is reasoning deeply (High Thinking)...'
                    : 'PLANTY is composing botanical advice...'}
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                language === 'ta'
                  ? 'செடிகளைப் பற்றி பிளாண்டியிடம் கேளுங்கள்...'
                  : 'Ask PLANTY anything about plant care, watering, diseases...'
              }
              className="flex-1 px-4 py-3 rounded-2xl border border-[#A8DDB5] focus:border-[#2E8B57] focus:ring-2 focus:ring-[#A8DDB5]/40 outline-none text-xs sm:text-sm bg-[#F5FAF5]"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="p-3 rounded-2xl bg-[#174D35] hover:bg-[#2E8B57] text-white transition-all shadow-md disabled:opacity-40 cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
