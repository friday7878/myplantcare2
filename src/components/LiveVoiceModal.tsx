import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, X, Sparkles, AlertCircle } from 'lucide-react';
import { PlantyMascot } from './PlantyMascot';

interface LiveVoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'ta';
  userPlantsSummary?: string;
}

export const LiveVoiceModal: React.FC<LiveVoiceModalProps> = ({
  isOpen,
  onClose,
  language,
  userPlantsSummary = ''
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [plantySpokenText, setPlantySpokenText] = useState<string>(
    language === 'ta'
      ? 'வணக்கம்! நான் பிளாண்டி. உங்கள் செடிகளைப் பற்றி என்னிடம் கேட்கலாம்!'
      : 'Hello! I am PLANTY. Ask me anything about watering, sunlight, or plant care!'
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);

  useEffect(() => {
    if (!isOpen) {
      stopVoiceSession();
    }
  }, [isOpen]);

  const pcmToBase64 = (float32Array: Float32Array): string => {
    const int16Array = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    const uint8Array = new Uint8Array(int16Array.buffer);
    let binary = '';
    const len = uint8Array.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(uint8Array[i]);
    }
    return window.btoa(binary);
  };

  const playPcm24k = (base64Audio: string) => {
    try {
      if (!outputAudioCtxRef.current) {
        outputAudioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({
          sampleRate: 24000
        });
      }
      const ctx = outputAudioCtxRef.current;
      const binaryString = window.atob(base64Audio);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const int16 = new Int16Array(bytes.buffer);
      const float32 = new Float32Array(int16.length);
      for (let i = 0; i < int16.length; i++) {
        float32[i] = int16[i] / 32768.0;
      }
      const audioBuffer = ctx.createBuffer(1, float32.length, 24000);
      audioBuffer.getChannelData(0).set(float32);
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.start();
    } catch (err) {
      console.error("PCM playback error", err);
    }
  };

  const startVoiceSession = async () => {
    try {
      setErrorMsg(null);
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/live-voice?lang=${language}`;

      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = async () => {
        setIsConnected(true);
        // Send initial context with user's garden info
        ws.send(JSON.stringify({
          type: 'init',
          language,
          gardenContext: userPlantsSummary
        }));

        // Capture microphone
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          streamRef.current = stream;

          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          const inputCtx = new AudioContextClass({ sampleRate: 16000 });
          inputAudioCtxRef.current = inputCtx;

          const source = inputCtx.createMediaStreamSource(stream);
          const processor = inputCtx.createScriptProcessor(4096, 1, 1);
          processorRef.current = processor;

          processor.onaudioprocess = (e) => {
            if (ws.readyState === WebSocket.OPEN) {
              const channelData = e.inputBuffer.getChannelData(0);
              const base64 = pcmToBase64(channelData);
              ws.send(JSON.stringify({ audio: base64 }));
            }
          };

          source.connect(processor);
          processor.connect(inputCtx.destination);
          setIsRecording(true);
        } catch (micErr) {
          console.warn("Microphone access error, enabling speech recognition fallback", micErr);
          setupSpeechRecognitionFallback();
        }
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.audio) {
            playPcm24k(msg.audio);
          }
          if (msg.text) {
            setPlantySpokenText(msg.text);
            setTranscript((prev) => [...prev.slice(-6), `PLANTY: ${msg.text}`]);
          }
          if (msg.interrupted) {
            // interrupted playback
          }
        } catch (e) {
          console.error("WS message parse error", e);
        }
      };

      ws.onerror = (e) => {
        console.warn("Live API WebSocket error, switching to interactive voice fallback", e);
        setupSpeechRecognitionFallback();
      };

      ws.onclose = () => {
        setIsConnected(false);
        setIsRecording(false);
      };
    } catch (err: any) {
      console.warn("Live voice connect error", err);
      setupSpeechRecognitionFallback();
    }
  };

  // Fallback using Browser SpeechRecognition + PLANTY Voice Synthesis
  const setupSpeechRecognitionFallback = () => {
    setIsConnected(true);
    setIsRecording(true);
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRec) {
      const recognition = new SpeechRec();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = language === 'ta' ? 'ta-IN' : 'en-US';

      recognition.onresult = async (event: any) => {
        const lastResult = event.results[event.results.length - 1];
        if (lastResult.isFinal) {
          const userQuery = lastResult[0].transcript;
          setTranscript((prev) => [...prev.slice(-6), `You: ${userQuery}`]);

          // Fetch quick answer from chat endpoint
          try {
            const res = await fetch('/api/chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                messages: [{ role: 'user', content: userQuery }],
                mode: 'fast',
                language,
                gardenContext: userPlantsSummary
              })
            });
            const data = await res.json();
            const reply = data.reply || "I am right here with you! Let's keep your plants thriving.";
            setPlantySpokenText(reply);
            setTranscript((prev) => [...prev.slice(-6), `PLANTY: ${reply}`]);

            // Speak response aloud
            if ('speechSynthesis' in window) {
              const utter = new SpeechSynthesisUtterance(reply);
              utter.pitch = 1.25;
              utter.rate = 1.05;
              window.speechSynthesis.speak(utter);
            }
          } catch (e) {
            console.error(e);
          }
        }
      };
      recognition.start();
    } else {
      setErrorMsg("Voice input is not supported in this browser. Please use the text chat tab.");
    }
  };

  const stopVoiceSession = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (inputAudioCtxRef.current) {
      inputAudioCtxRef.current.close();
      inputAudioCtxRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsConnected(false);
    setIsRecording(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#F5FAF5] to-[#E8F5E9] border-2 border-[#A8DDB5] shadow-2xl p-6 md:p-8 text-[#183B2A] overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#A8DDB5]/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#2E8B57]/20 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-2xl bg-[#174D35] text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg md:text-xl text-[#174D35]">
                {language === 'ta' ? 'பிளாண்டி நேரடி குரல் உரையாடல்' : 'Talk with PLANTY Live'}
              </h3>
              <p className="text-xs text-[#2E8B57] font-medium flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-[#2E8B57] animate-ping' : 'bg-gray-400'}`} />
                {isConnected ? 'Gemini 3.8 Live API Active' : 'Ready to start'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-[#183B2A]/70 hover:text-[#183B2A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Mascot Centerpiece */}
        <div className="flex flex-col items-center justify-center py-4 relative z-10">
          <PlantyMascot
            mood={isRecording ? 'speaking' : isConnected ? 'excited' : 'welcome'}
            size="lg"
            showSpeechBubble={false}
          />

          {/* Audio Wave Visualizer Simulation */}
          <div className="flex items-center gap-1.5 h-10 my-3">
            {[4, 14, 28, 18, 36, 24, 12, 30, 20, 8].map((height, i) => (
              <span
                key={i}
                style={{ height: isRecording ? `${height}px` : '4px' }}
                className={`w-1.5 rounded-full bg-[#2E8B57] transition-all duration-150 ${
                  isRecording ? 'animate-pulse' : 'opacity-30'
                }`}
              />
            ))}
          </div>

          {/* Spoken Text Display */}
          <div className="w-full rounded-2xl bg-white/90 backdrop-blur-md p-4 border border-[#A8DDB5]/80 shadow-sm text-center">
            <p className="text-sm md:text-base font-semibold text-[#174D35] leading-relaxed">
              "{plantySpokenText}"
            </p>
          </div>
        </div>

        {/* Live Conversation Transcript */}
        {transcript.length > 0 && (
          <div className="my-3 max-h-28 overflow-y-auto space-y-1 p-2 rounded-xl bg-black/5 text-xs text-[#183B2A]/80">
            {transcript.map((line, idx) => (
              <div key={idx} className="font-mono">
                {line}
              </div>
            ))}
          </div>
        )}

        {/* Action Controls */}
        <div className="mt-4 flex items-center justify-center gap-4 relative z-10">
          {!isConnected ? (
            <button
              type="button"
              onClick={startVoiceSession}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#174D35] hover:bg-[#2E8B57] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Mic className="w-5 h-5 animate-pulse" />
              <span>{language === 'ta' ? 'குரல் தொடர்பை தொடங்கு' : 'Start Voice Conversation'}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={stopVoiceSession}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#E65A5A] hover:bg-red-700 text-white font-semibold shadow-lg transition-all duration-200"
            >
              <MicOff className="w-5 h-5" />
              <span>{language === 'ta' ? 'இணைப்பை நிறுத்து' : 'End Voice Session'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
