import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { PlantyMood } from '../types';

interface PlantyMascotProps {
  mood?: PlantyMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  showSpeechBubble?: boolean;
  canSpeak?: boolean;
  interactive?: boolean;
  animate?: boolean;
  onMascotClick?: () => void;
  className?: string;
}

export const PlantyMascot: React.FC<PlantyMascotProps> = ({
  mood = 'idle',
  size = 'md',
  message,
  showSpeechBubble = false,
  canSpeak = true,
  interactive = true,
  animate = true,
  onMascotClick,
  className = ''
}) => {
  const [currentMood, setCurrentMood] = useState<PlantyMood>(mood);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isSpeakingVoice, setIsSpeakingVoice] = useState(false);

  useEffect(() => {
    setCurrentMood(mood);
  }, [mood]);

  // Periodic natural blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 220);
    }, 4500);
    return () => clearInterval(blinkInterval);
  }, []);

  const speakMessage = (textToSpeak: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 1.05;
    utterance.pitch = 1.25; // Friendly, slightly higher mascot pitch
    utterance.onstart = () => setIsSpeakingVoice(true);
    utterance.onend = () => setIsSpeakingVoice(false);
    utterance.onerror = () => setIsSpeakingVoice(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleMascotClick = () => {
    if (onMascotClick) {
      onMascotClick();
    } else if (interactive) {
      // Toggle a cute reaction
      const moods: PlantyMood[] = ['happy', 'excited', 'welcome', 'thinking'];
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      setCurrentMood(randomMood);
      setTimeout(() => setCurrentMood(mood), 3000);
    }
  };

  const dimensions = {
    sm: { width: 64, height: 72, bubbleText: 'text-xs' },
    md: { width: 110, height: 125, bubbleText: 'text-sm' },
    lg: { width: 170, height: 195, bubbleText: 'text-base' },
    xl: { width: 240, height: 275, bubbleText: 'text-lg' }
  }[size];

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      {/* Speech Bubble */}
      {showSpeechBubble && message && (
        <div className="mb-3 max-w-xs md:max-w-sm rounded-2xl bg-white/95 backdrop-blur-md px-4 py-2.5 shadow-xl border border-[#A8DDB5]/60 text-[#183B2A] relative animate-fade-in z-20">
          <div className="flex items-start justify-between gap-2">
            <p className={`${dimensions.bubbleText} font-medium leading-relaxed`}>
              {message}
            </p>
            {canSpeak && (
              <button
                type="button"
                onClick={() => speakMessage(message)}
                title="Listen to PLANTY"
                className="p-1 rounded-full text-[#2E8B57] hover:bg-[#A8DDB5]/30 transition-colors shrink-0"
              >
                {isSpeakingVoice ? (
                  <VolumeX className="w-4 h-4 text-[#E65A5A] animate-pulse" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
          {/* Bubble tail */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white/95" />
        </div>
      )}

      {/* Interactive Mascot SVG Canvas */}
      <div
        onClick={handleMascotClick}
        className={`cursor-pointer transition-transform duration-300 select-none ${
          interactive ? 'hover:scale-105 active:scale-95' : ''
        } ${currentMood === 'floating' ? 'animate-bounce-subtle' : ''}`}
        title="PLANTY – Your Botanical Companion"
      >
        <svg
          width={dimensions.width}
          height={dimensions.height}
          viewBox="0 0 160 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg filter transition-all duration-300"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#E8F8ED" />
              <stop offset="100%" stopColor="#C9F0D6" />
            </linearGradient>

            <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#48BB78" />
              <stop offset="50%" stopColor="#2E8B57" />
              <stop offset="100%" stopColor="#174D35" />
            </linearGradient>

            <linearGradient id="screenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#183B2A" />
              <stop offset="100%" stopColor="#0B1D14" />
            </linearGradient>

            <linearGradient id="blushGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF9AA2" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFB7B2" stopOpacity="0.3" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="leafGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Shadow */}
          <ellipse
            cx="80"
            cy="170"
            rx={currentMood === 'floating' ? 32 : 42}
            ry="7"
            fill="#174D35"
            opacity={currentMood === 'floating' ? 0.15 : 0.25}
            className="transition-all duration-500"
          />

          {/* Botanical Sprout / Leaf Hair Antenna */}
          <g
            className={`transition-transform duration-500 origin-[80px_42px] ${
              currentMood === 'sad' ? 'rotate-12 translate-y-1' : ''
            } ${currentMood === 'excited' ? 'animate-pulse' : ''}`}
          >
            {/* Stem */}
            <path
              d="M80 44 Q 80 28, 72 20"
              stroke="#2E8B57"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Left Leaf */}
            <path
              d="M72 22 C 55 12, 50 2, 70 2 C 78 12, 75 18, 72 22 Z"
              fill="url(#leafGradient)"
              filter={currentMood === 'excited' ? 'url(#leafGlow)' : undefined}
            />
            {/* Leaf Vein */}
            <path d="M72 20 Q 66 12, 64 6" stroke="#A8DDB5" strokeWidth="1.5" strokeLinecap="round" />

            {/* Right Sprout Bud */}
            <path
              d="M78 28 C 92 18, 96 8, 86 6 C 78 14, 78 22, 78 28 Z"
              fill="#38A169"
            />
          </g>

          {/* Thought bubbles for Thinking mode */}
          {currentMood === 'thinking' && (
            <g className="animate-pulse">
              <circle cx="120" cy="30" r="5" fill="#A8DDB5" opacity="0.8" />
              <circle cx="132" cy="18" r="7" fill="#2E8B57" opacity="0.9" />
              <text x="128" y="22" fill="#FFFFFF" fontSize="10" fontWeight="bold">?</text>
            </g>
          )}

          {/* Zzz for Sleeping mode */}
          {currentMood === 'sleeping' && (
            <g className="animate-fade-in opacity-80">
              <text x="120" y="32" fill="#2E8B57" fontSize="12" fontWeight="bold">Z</text>
              <text x="130" y="22" fill="#2E8B57" fontSize="10" fontWeight="bold">z</text>
              <text x="138" y="14" fill="#2E8B57" fontSize="8" fontWeight="bold">z</text>
            </g>
          )}

          {/* Feet */}
          <g>
            <ellipse cx="62" cy="162" rx="14" ry="7" fill="#2E8B57" />
            <ellipse cx="98" cy="162" rx="14" ry="7" fill="#2E8B57" />
            <ellipse cx="62" cy="160" rx="11" ry="5" fill="#38A169" />
            <ellipse cx="98" cy="160" rx="11" ry="5" fill="#38A169" />
          </g>

          {/* Hands */}
          {currentMood === 'welcome' ? (
            // Waving Hand
            <g>
              {/* Left hand down */}
              <ellipse cx="32" cy="115" rx="9" ry="12" fill="#2E8B57" transform="rotate(20 32 115)" />
              {/* Right hand waving */}
              <g className="origin-[125px_100px] animate-wave">
                <path
                  d="M125 100 Q 140 85, 142 68"
                  stroke="#2E8B57"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <circle cx="142" cy="65" r="9" fill="#38A169" />
                <path d="M142 60 Q 146 54, 148 58" stroke="#174D35" strokeWidth="2" strokeLinecap="round" />
              </g>
            </g>
          ) : currentMood === 'excited' || currentMood === 'happy' ? (
            // Hands in the air celebrating
            <g>
              <ellipse cx="28" cy="85" rx="8" ry="14" fill="#2E8B57" transform="rotate(-35 28 85)" />
              <ellipse cx="132" cy="85" rx="8" ry="14" fill="#2E8B57" transform="rotate(35 132 85)" />
            </g>
          ) : (
            // Normal Resting Hands
            <g>
              <ellipse cx="32" cy="115" rx="9" ry="13" fill="#2E8B57" transform="rotate(15 32 115)" />
              <ellipse cx="128" cy="115" rx="9" ry="13" fill="#2E8B57" transform="rotate(-15 128 115)" />
            </g>
          )}

          {/* Main Futuristic Capsule Body */}
          <rect
            x="36"
            y="42"
            width="88"
            height="115"
            rx="44"
            fill="url(#bodyGradient)"
            stroke="#A8DDB5"
            strokeWidth="3.5"
          />

          {/* Botanical Eco Belt / Belly Detail */}
          <path
            d="M50 135 Q 80 142, 110 135"
            stroke="#2E8B57"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.7"
          />
          <circle cx="80" cy="138" r="5" fill="#2E8B57" />
          <circle cx="80" cy="138" r="2.5" fill="#A8DDB5" />

          {/* Digital Face Visor Screen */}
          <rect
            x="48"
            y="58"
            width="64"
            height="46"
            rx="18"
            fill="url(#screenGradient)"
            stroke="#174D35"
            strokeWidth="2.5"
          />

          {/* Eyes & Expressions */}
          {isBlinking || currentMood === 'sleeping' ? (
            // Closed / Blinking Eyes (cute arcs)
            <g stroke="#A8DDB5" strokeWidth="3.5" strokeLinecap="round">
              <path d="M60 80 Q 67 86, 74 80" />
              <path d="M86 80 Q 93 86, 100 80" />
            </g>
          ) : currentMood === 'sad' ? (
            // Sad / Drooping Eyes
            <g>
              <ellipse cx="66" cy="80" rx="7" ry="9" fill="#6EE7B7" />
              <ellipse cx="94" cy="80" rx="7" ry="9" fill="#6EE7B7" />
              <path d="M58 72 Q 66 75, 74 72" stroke="#174D35" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M86 72 Q 94 75, 102 72" stroke="#174D35" strokeWidth="2.5" strokeLinecap="round" />
              {/* Tear drop */}
              <circle cx="102" cy="88" r="2.5" fill="#60A5FA" />
            </g>
          ) : currentMood === 'excited' ? (
            // Starry / Excited Eyes
            <g fill="#A8DDB5">
              <polygon points="66,72 68,78 74,78 69,82 71,88 66,84 61,88 63,82 58,78 64,78" />
              <polygon points="94,72 96,78 102,78 97,82 99,88 94,84 89,88 91,82 86,78 92,78" />
            </g>
          ) : currentMood === 'thinking' ? (
            // Looking Up / Wondering Eyes
            <g>
              <ellipse cx="68" cy="76" rx="7" ry="9" fill="#A8DDB5" />
              <circle cx="70" cy="74" r="3.5" fill="#174D35" />
              <circle cx="72" cy="72" r="1.5" fill="#FFFFFF" />

              <ellipse cx="96" cy="76" rx="7" ry="9" fill="#A8DDB5" />
              <circle cx="98" cy="74" r="3.5" fill="#174D35" />
              <circle cx="100" cy="72" r="1.5" fill="#FFFFFF" />
            </g>
          ) : (
            // Friendly Expressive Open Eyes
            <g>
              <ellipse cx="66" cy="79" rx="7.5" ry="9.5" fill="#A8DDB5" />
              <circle cx="68" cy="78" r="4.5" fill="#174D35" />
              <circle cx="70" cy="75" r="2" fill="#FFFFFF" />

              <ellipse cx="94" cy="79" rx="7.5" ry="9.5" fill="#A8DDB5" />
              <circle cx="96" cy="78" r="4.5" fill="#174D35" />
              <circle cx="98" cy="75" r="2" fill="#FFFFFF" />
            </g>
          )}

          {/* Rosy Cheeks */}
          <ellipse cx="55" cy="89" rx="5" ry="3" fill="url(#blushGradient)" />
          <ellipse cx="105" cy="89" rx="5" ry="3" fill="url(#blushGradient)" />

          {/* Animated Mouth */}
          {currentMood === 'speaking' || isSpeakingVoice ? (
            // Speaking Mouth
            <ellipse cx="80" cy="92" rx="6" ry="4" fill="#34D399" className="animate-pulse" />
          ) : currentMood === 'sad' ? (
            // Inverted Frown
            <path d="M74 94 Q 80 90, 86 94" stroke="#6EE7B7" strokeWidth="2.5" strokeLinecap="round" />
          ) : currentMood === 'happy' || currentMood === 'excited' || currentMood === 'welcome' ? (
            // Big Joyful Grin
            <path
              d="M72 90 Q 80 98, 88 90"
              stroke="#A8DDB5"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="#2E8B57"
            />
          ) : (
            // Gentle Natural Smile
            <path
              d="M74 91 Q 80 96, 86 91"
              stroke="#A8DDB5"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          )}

          {/* Eco Heart / Leaf Chest Emblem */}
          <g transform="translate(73, 110)">
            <path
              d="M7 2 C 7 0, 4 -2, 2 0 C 0 2, 0 4, 7 11 C 14 4, 14 2, 12 0 C 10 -2, 7 0, 7 2 Z"
              fill="#2E8B57"
              opacity="0.85"
            />
          </g>
        </svg>
      </div>

      {/* Mood badge label when hovering or in specific mode */}
      {interactive && (
        <span className="mt-1 text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#174D35]/10 text-[#174D35] flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#2E8B57]" />
          PLANTY
        </span>
      )}
    </div>
  );
};

export default PlantyMascot;
