import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Droplets,
  Sun,
  Sprout,
  Heart,
  ShieldAlert,
  ArrowRight,
  RefreshCw,
  Plus,
  Globe2,
  MapPin,
  Leaf,
  Layers,
  History,
  Trash2,
  Download,
  Info,
  ChevronRight,
  ExternalLink,
  Search,
  BookOpen,
  Volume2,
  FileQuestion,
  HelpCircle,
  Eye,
  X,
  Compass,
  Thermometer,
  Wrench,
  Trees,
  Languages
} from 'lucide-react';
import { Language, Plant, PlantCategory } from '../types';
import PlantyMascot from '../components/PlantyMascot';
import { PLANT_LIBRARY } from '../data/plantLibrary';


interface GlobalPlantIdentifierPageProps {
  language: Language;
  onAddPlantToGarden?: (plantData: any) => void;
  onNavigate?: (page: string) => void;
}

export interface PhotoItem {
  id: string;
  data: string; // Base64 Data URL
  organ: 'leaf' | 'flower' | 'fruit' | 'bark' | 'auto';
  file?: File;
}

export interface CandidateSpecies {
  rank: number;
  scientificName: string;
  acceptedBotanicalName?: string;
  commonNames: string[];
  nameTa?: string;
  otherRegionalNames?: string;
  family: string;
  genus: string;
  species: string;
  confidenceScore: number;
  confidenceLabel: string;
  plantType?: string;
  nativeDistribution?: string;
  growingRegions?: string[];
  habitat?: string;
  indoorOutdoor?: string;
  sunlight?: string;
  watering?: string;
  soil?: string;
  temperatureRange?: string;
  humidity?: string;
  propagation?: string;
  floweringSeason?: string;
  fruitingSeason?: string;
  growthRate?: string;
  matureSize?: string;
  commonDiseases?: string[];
  commonPests?: string[];
  toxicity?: string;
  gardeningGuide?: string;
  visualSimilarityExplanation?: string;
  similarityPercentage?: number;
}

export interface IdentificationResult {
  isIdentified: boolean;
  confidenceScore: number;
  confidenceLabel: string;
  identificationDate: string;
  provider: string;
  plantNetStatus?: string;
  projectUsed?: string;
  regionQueried?: string;
  imagesCount: number;
  unidentifiedReason?: string;
  suggestedActions?: string[];
  candidates: CandidateSpecies[];
  verificationNotes?: string;
}

export interface HistoryItem {
  id: string;
  date: string;
  thumbnail: string;
  scientificName: string;
  commonName: string;
  nameTa?: string;
  confidence: number;
  provider: string;
  userConfirmed: boolean;
  notes?: string;
}

const REGION_PRESETS = [
  { id: 'global', label: 'Global Mode (All Continents)', labelTa: 'உலகளாவிய பயிர்கள் (அனைத்து நாடுகள்)' },
  { id: 'Tamil Nadu, India', label: 'Tamil Nadu, India (Native & Siddha Flora)', labelTa: 'தமிழ்நாடு & சித்த மூலிகைகள்' },
  { id: 'India & South Asia', label: 'India & South Asia', labelTa: 'இந்தியா & தெற்காசியா' },
  { id: 'Southeast Asia & Tropics', label: 'Southeast Asia & Tropics', labelTa: 'தென்கிழக்கு ஆசியா' },
  { id: 'Europe & Mediterranean', label: 'Europe & Mediterranean', labelTa: 'ஐரோப்பா & மத்திய தரைக்கடல்' },
  { id: 'North America', label: 'North America', labelTa: 'வட அமெரிக்கா' },
  { id: 'South America & Amazon', label: 'South America & Amazon', labelTa: 'தென் அமெரிக்கா' },
  { id: 'Africa & Madagascar', label: 'Africa & Madagascar', labelTa: 'ஆப்பிரிக்கா & மடகாஸ்கர்' },
  { id: 'Australia & Oceania', label: 'Australia & Oceania', labelTa: 'ஆஸ்திரேலியா & ஓசியானியா' }
];

const SPECIALIZED_TOOLS = [
  { id: 'leaf', title: 'AI Leaf Identifier', titleTa: 'இலை அடையாளங்காட்டி', desc: 'Identify by venation, margin, phyllotaxy', icon: Leaf },
  { id: 'flower', title: 'AI Flower Identifier', titleTa: 'மலர் அடையாளங்காட்டி', desc: 'Identify by petals, inflorescence, stamen', icon: Sprout },
  { id: 'fruit', title: 'AI Fruit Identifier', titleTa: 'பழம் & காய் காட்டி', desc: 'Identify by rind, pod, seed arrangement', icon: Sun },
  { id: 'tree', title: 'AI Tree Identifier', titleTa: 'மரங்கள் அடையாளங்காட்டி', desc: 'Identify by canopy silhouette and bark', icon: Trees },
  { id: 'medicinal', title: 'AI Medicinal Herb Finder', titleTa: 'சித்த & ஆயுர்வேத மூலிகைகள்', desc: 'Detect active therapeutic compounds', icon: Heart },
  { id: 'crop', title: 'AI Crop Identifier', titleTa: 'வேளாண் பயிர்கள்', desc: 'Identify agricultural crops & stages', icon: Compass },
  { id: 'weed', title: 'AI Weed Identifier', titleTa: 'களைச்செடி கண்டுபிடிப்பான்', desc: 'Identify invasive weeds & eradication', icon: ShieldAlert },
  { id: 'indoor', title: 'AI Indoor Plant Specialist', titleTa: 'வீட்டு அலங்காரச் செடிகள்', desc: 'Identify indoor varieties & light levels', icon: Droplets },
  { id: 'succulent', title: 'AI Succulent Identifier', titleTa: 'சதைப்பற்றுச் செடிகள்', desc: 'Identify Crassulaceae, Aloes, Echeverias', icon: Sparkles },
  { id: 'cactus', title: 'AI Cactus Identifier', titleTa: 'கள்ளிச்செடி காட்டி', desc: 'Identify Cactaceae & desert biomes', icon: Sun },
  { id: 'family', title: 'AI Plant Family Classifier', titleTa: 'தாவர குடும்பம் வகைப்படுத்தி', desc: 'Detect botanical families (Fabaceae, etc.)', icon: Layers },
  { id: 'similar', title: 'AI Similar Plant Finder', titleTa: 'ஒத்த தாவர ஒப்பீட்டாளர்', desc: 'Find confusing look-alike species', icon: Search },
  { id: 'comparison', title: 'AI 2-Plant Comparison', titleTa: 'இரு தாவர நேரடி ஒப்பீடு', desc: 'Compare 2 plant photos side-by-side', icon: Wrench },
  { id: 'translator', title: 'AI Plant Name Translator', titleTa: 'தாவரப் பெயர் மொழிபெயர்ப்பாளர்', desc: 'Latin, English, Tamil, Hindi, Spanish', icon: Languages },
  { id: 'botanical-assistant', title: 'AI Botanical Scientist', titleTa: 'தாவரவியல் விஞ்ஞானி', desc: 'Ask complex taxonomic questions', icon: BookOpen }
];

export const GlobalPlantIdentifierPage: React.FC<GlobalPlantIdentifierPageProps> = ({
  language,
  onAddPlantToGarden,
  onNavigate
}) => {
  // Navigation / Tabs
  const [activeMainTab, setActiveMainTab] = useState<'identifier' | 'tools' | 'history'>('identifier');

  // Upload Photos state (up to 5)
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('global');
  const [userHint, setUserHint] = useState<string>('');
  const [isIdentifying, setIsIdentifying] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Result state
  const [result, setResult] = useState<IdentificationResult | null>(null);
  const [selectedCandidateIndex, setSelectedCandidateIndex] = useState<number>(0);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // Camera modal state
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraFacing, setCameraFacing] = useState<'environment' | 'user'>('environment');
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // History state
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('plant_identification_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Specialized Tool state
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [toolImage, setToolImage] = useState<string | null>(null);
  const [toolSecondImage, setToolSecondImage] = useState<string | null>(null);
  const [toolQuery, setToolQuery] = useState<string>('');
  const [toolAnalyzing, setToolAnalyzing] = useState<boolean>(false);
  const [toolResult, setToolResult] = useState<any | null>(null);

  // Sync history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('plant_identification_history', JSON.stringify(history));
    } catch (e) {
      console.warn('Failed to save identification history:', e);
    }
  }, [history]);

  // Audio speech pronunciation
  const speakTerm = (text: string, lang = 'en-US') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  };

  // Camera handling
  const startCamera = async () => {
    setIsCameraActive(true);
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: cameraFacing },
        audio: false
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (camErr) {
      console.warn('Camera access error:', camErr);
      setError(language === 'ta' ? 'கேமராவை அணுக முடியவில்லை. அனுமதி உள்ளதா என சரிபார்க்கவும்.' : 'Could not access camera. Please allow camera permissions or upload a file.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const captureCameraPhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
      addPhoto(dataUrl, 'auto');
      stopCamera();
    }
  };

  // Compress and add photo
  const addPhoto = (dataUrl: string, organ: PhotoItem['organ'] = 'auto', file?: File) => {
    if (photos.length >= 5) {
      setError(language === 'ta' ? 'அதிகபட்சம் 5 புகைப்படங்கள் மட்டுமே பதிவேற்றலாம்.' : 'Maximum 5 photos allowed per identification session.');
      return;
    }
    const newPhoto: PhotoItem = {
      id: `photo-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      data: dataUrl,
      organ,
      file
    };
    setPhotos(prev => [...prev, newPhoto]);
    setError(null);
    setResult(null);
    setAddedSuccess(false);
  };

  const removePhoto = (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  const updatePhotoOrgan = (id: string, organ: PhotoItem['organ']) => {
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, organ } : p));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = 5 - photos.length;
    if (remainingSlots <= 0) {
      setError(language === 'ta' ? 'அதிகபட்சம் 5 புகைப்படங்கள் மட்டுமே பதிவேற்றலாம்.' : 'Maximum 5 photos allowed per identification.');
      return;
    }

    const filesToProcess = Array.from(files).slice(0, remainingSlots);
    for (const file of filesToProcess) {
      // Validate file type
      if (!['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes(file.type)) {
        setError(language === 'ta' ? 'JPG, PNG, WEBP வடிவங்களை மட்டுமே பதிவேற்றவும்.' : 'Please upload JPG, JPEG, PNG, or WEBP images.');
        continue;
      }
      if (file.size > 20 * 1024 * 1024) {
        setError(language === 'ta' ? 'கோப்பு அளவு 20MB-க்கும் குறைவாக இருக்க வேண்டும்.' : 'File size must be under 20MB.');
        continue;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const rawData = reader.result as string;
        // Client-side canvas compression to keep payload crisp & fast
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let { width, height } = img;
          const maxDim = 1200;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL('image/jpeg', 0.85);
            addPhoto(compressed, 'auto', file);
          } else {
            addPhoto(rawData, 'auto', file);
          }
        };
        img.src = rawData;
      };
      reader.readAsDataURL(file);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Perform Identification
  const handleIdentify = async () => {
    if (photos.length === 0) {
      setError(language === 'ta' ? 'தயவுசெய்து குறைந்தது ஒரு தாவரப் புகைப்படத்தைப் பதிவேற்றவும்.' : 'Please upload or capture at least one plant photograph first.');
      return;
    }

    setIsIdentifying(true);
    setError(null);
    setResult(null);
    setSelectedCandidateIndex(0);
    setAddedSuccess(false);

    try {
      const response = await fetch('/api/identify-global', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          images: photos.map(p => ({ data: p.data, organ: p.organ })),
          region: selectedRegion,
          project: 'all',
          language,
          userHint
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || 'Identification failed on server');
      }

      const data: IdentificationResult = await response.json();
      setResult(data);

      // Save to History automatically
      if (data.isIdentified && data.candidates && data.candidates.length > 0) {
        const top = data.candidates[0];
        const newHist: HistoryItem = {
          id: `hist-${Date.now()}`,
          date: data.identificationDate || new Date().toISOString().split('T')[0],
          thumbnail: photos[0]?.data || '',
          scientificName: top.scientificName,
          commonName: top.commonNames?.[0] || top.scientificName,
          nameTa: top.nameTa,
          confidence: data.confidenceScore,
          provider: data.provider || 'Global Engine',
          userConfirmed: false,
          notes: top.visualSimilarityExplanation
        };
        setHistory(prev => [newHist, ...prev.slice(0, 49)]);
      }
    } catch (err: any) {
      console.error('Identification failed:', err);
      setError(language === 'ta' ? 'தாவரத்தை அடையாளம் காண்பதில் பிழை ஏற்பட்டது. இணைய இணைப்பை சரிபார்த்து மீண்டும் முயற்சிக்கவும்.' : 'Identification failed. Please verify your internet connection or try with a clearer photo.');
    } finally {
      setIsIdentifying(false);
    }
  };

  // Add confirmed plant to user garden
  const handleConfirmAndAdd = (candidate: CandidateSpecies) => {
    if (!onAddPlantToGarden) return;

    // Check if matched in local PLANT_LIBRARY for enriched defaults
    const localMatch = PLANT_LIBRARY.find(
      p => p.scientificName.toLowerCase() === candidate.scientificName.toLowerCase() ||
           p.name.toLowerCase().includes(candidate.commonNames?.[0]?.toLowerCase() || '___')
    );

    const plantPayload = {
      name: language === 'ta' && candidate.nameTa ? candidate.nameTa : (candidate.commonNames?.[0] || candidate.scientificName),
      commonName: candidate.commonNames?.[0] || candidate.scientificName,
      scientificName: candidate.scientificName,
      category: (localMatch?.category || 'Indoor') as PlantCategory,
      photoUrl: photos[0]?.data || localMatch?.photoUrl || 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80',
      sunlightRequirement: candidate.sunlight || localMatch?.sunlight || 'Bright Indirect Light',
      wateringFrequencyDays: localMatch?.wateringDays || 5,
      soilType: candidate.soil || localMatch?.soilType || 'Well-draining potting soil',
      healthStatus: 'healthy',
      indoorOutdoor: (candidate.indoorOutdoor?.toLowerCase().includes('indoor') ? 'indoor' : 'outdoor') as 'indoor' | 'outdoor',
      notes: `${candidate.visualSimilarityExplanation || ''}\n\nFamily: ${candidate.family}\nHabitat: ${candidate.habitat || 'Cultivated'}\nCare: ${candidate.gardeningGuide || ''}`
    };


    onAddPlantToGarden(plantPayload);
    setAddedSuccess(true);

    // Update history item to confirmed
    setHistory(prev => prev.map(item => {
      if (item.scientificName === candidate.scientificName) {
        return { ...item, userConfirmed: true };
      }
      return item;
    }));
  };

  // Specialized tool execution
  const handleExecuteTool = async () => {
    if (!activeTool) return;
    setToolAnalyzing(true);
    setToolResult(null);

    try {
      const response = await fetch('/api/plant-tools/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolType: activeTool,
          imageBase64: toolImage,
          secondImageBase64: toolSecondImage,
          textQuery: toolQuery,
          language
        })
      });

      if (!response.ok) throw new Error('Tool analysis failed');
      const data = await response.json();
      setToolResult(data);
    } catch (e: any) {
      console.error('Tool error:', e);
      setToolResult({
        title: 'Analysis Unavailable',
        speciesName: 'Query Processing Error',
        keyFindings: ['Could not complete specialized analysis.'],
        detailedReport: e?.message || 'Please verify image clarity and try again.'
      });
    } finally {
      setToolAnalyzing(false);
    }
  };

  const getConfidenceBadge = (score: number, label: string) => {
    if (score >= 75) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          {language === 'ta' ? `உயர் துல்லியம் (${score}%)` : `High-Confidence (${score}%)`}
        </span>
      );
    }
    if (score >= 40) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
          {language === 'ta' ? `சாத்தியமான பொருத்தம் (${score}%)` : `Possible Match (${score}%)`}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-stone-200 text-stone-700 border border-stone-300">
        <HelpCircle className="w-3.5 h-3.5 text-stone-500" />
        {language === 'ta' ? `குறைந்த துல்லியம் (${score}%)` : `Low-Confidence (${score}%)`}
      </span>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Top Banner / Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#174D35] via-[#1E5C40] to-[#2E8B57] text-white p-8 md:p-10 shadow-xl border border-emerald-800">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-400/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-24 w-80 h-80 rounded-full bg-mint/15 blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
              <Globe2 className="w-3.5 h-3.5 text-emerald-300 animate-spin-slow" />
              {language === 'ta'
                ? 'உலகளாவிய AI தாவர அடையாளங்காட்டி • பதிப்பு 4.0'
                : 'Global AI Plant Identifier • Pl@ntNet & Vision AI Engine'}
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white font-serif leading-tight">
              {language === 'ta'
                ? 'தாவரங்களை அடையாளம் காண்க. உலகை அறிக!'
                : 'Identify Plants. Discover Nature. Explore the World.'}
            </h1>

            <p className="text-emerald-100 text-sm md:text-base leading-relaxed max-w-2xl font-sans">
              {language === 'ta'
                ? 'தமிழ்நாடு, இந்தியா மற்றும் உலகின் 450,000+ தாவரங்களை இலை, பூ, காய் அல்லது மரப்பட்டை புகைப்படங்கள் மூலம் துல்லியமாக அடையாளம் காணும் சர்வதேச அமைப்பு.'
                : 'Powered by Pl@ntNet Global API and Gemini Vision AI. Identify over 450,000+ botanical species from Tamil Nadu and around the world with multi-photo organ analysis and authentic botanical dossiers.'}
            </p>

            {/* Quick Navigation Switcher */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <button
                type="button"
                onClick={() => setActiveMainTab('identifier')}
                className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeMainTab === 'identifier'
                    ? 'bg-white text-[#174D35] shadow-md'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Camera className="w-4 h-4" />
                {language === 'ta' ? 'முதன்மை அடையாளங்காட்டி' : 'Global Identifier'}
              </button>
              <button
                type="button"
                onClick={() => setActiveMainTab('tools')}
                className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeMainTab === 'tools'
                    ? 'bg-white text-[#174D35] shadow-md'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Wrench className="w-4 h-4" />
                {language === 'ta' ? '15 சிறப்பு AI கருவிகள்' : '15 Botanical AI Tools'}
              </button>
              <button
                type="button"
                onClick={() => setActiveMainTab('history')}
                className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeMainTab === 'history'
                    ? 'bg-white text-[#174D35] shadow-md'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <History className="w-4 h-4" />
                {language === 'ta' ? `வரலாறு (${history.length})` : `History (${history.length})`}
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-center max-w-xs shadow-lg">
              <PlantyMascot mood="exploring" size="md" className="mx-auto mb-2" />
              <p className="text-xs text-white/95 font-medium leading-relaxed italic">
                {language === 'ta'
                  ? '"இலை, பூ மற்றும் முழு செடியின் 2 அல்லது அதற்கு மேற்பட்ட படங்களை சேர்த்தால் 98% துல்லியமான விடை கிடைக்கும்!"'
                  : '"Tip: Uploading both a leaf close-up and a flower or bark photo boosts botanical accuracy up to 98%!"'}
              </p>
              <div className="mt-3 text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
                — PLANTY Botanist
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN TAB 1: IDENTIFIER WORKSPACE */}
      {activeMainTab === 'identifier' && (
        <div className="space-y-8">
          {/* Upload & Configuration Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-5">
              <div>
                <h2 className="text-xl font-bold text-[#183B2A] flex items-center gap-2">
                  <Camera className="w-5 h-5 text-[#2E8B57]" />
                  {language === 'ta' ? 'தாவர புகைப்படங்களை பதிவேற்றுக' : 'Multi-Photo Botanical Scanner'}
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  {language === 'ta'
                    ? 'ஒரே செடியின் 1 முதல் 5 புகைப்படங்கள் (இலை, மலர், காய், தண்டு) சேர்க்கவும்.'
                    : 'Upload up to 5 photos of the same plant (leaf, bloom, fruit, bark) for multi-organ recognition.'}
                </p>
              </div>

              {/* Mode Selector */}
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-stone-400" />
                <select
                  value={selectedRegion}
                  onChange={e => setSelectedRegion(e.target.value)}
                  className="px-3.5 py-2 rounded-xl border border-stone-300 text-xs md:text-sm font-semibold bg-stone-50 focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
                >
                  {REGION_PRESETS.map(r => (
                    <option key={r.id} value={r.id}>
                      {language === 'ta' ? r.labelTa : r.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Photos Preview Strip */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {photos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/80 bg-stone-100 group shadow-xs flex flex-col"
                  >
                    <div className="relative h-32 w-full">
                      <img
                        src={photo.data}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(photo.id)}
                        className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors"
                        title="Remove photo"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/70 text-white backdrop-blur-xs">
                        #{index + 1}
                      </span>
                    </div>

                    {/* Organ Selector Dropdown */}
                    <div className="p-2 bg-stone-50 border-t border-stone-200">
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                        {language === 'ta' ? 'உறுப்பு:' : 'Organ:'}
                      </label>
                      <select
                        value={photo.organ}
                        onChange={e => updatePhotoOrgan(photo.id, e.target.value as any)}
                        className="w-full px-2 py-1 rounded-lg text-xs border border-stone-300 bg-white font-medium focus:outline-none focus:ring-1 focus:ring-[#2E8B57]"
                      >
                        <option value="auto">{language === 'ta' ? 'தானியங்கி (Auto)' : 'Auto-detect'}</option>
                        <option value="leaf">{language === 'ta' ? 'இலை (Leaf)' : 'Leaf'}</option>
                        <option value="flower">{language === 'ta' ? 'மலர் (Flower)' : 'Flower'}</option>
                        <option value="fruit">{language === 'ta' ? 'காய் / பழம் (Fruit)' : 'Fruit'}</option>
                        <option value="bark">{language === 'ta' ? 'மரப்பட்டை (Bark)' : 'Bark'}</option>
                      </select>
                    </div>
                  </div>
                ))}

                {/* Upload / Camera Action Tiles */}
                {photos.length < 5 && (
                  <div className="h-44 rounded-2xl border-2 border-dashed border-stone-300 hover:border-[#2E8B57] bg-stone-50/60 p-4 flex flex-col items-center justify-center text-center space-y-2 transition-colors">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="p-3 rounded-2xl bg-white border border-stone-200 hover:bg-emerald-50 text-[#174D35] hover:text-[#2E8B57] shadow-xs transition-all cursor-pointer"
                        title="Upload from computer"
                      >
                        <Upload className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={startCamera}
                        className="p-3 rounded-2xl bg-[#174D35] text-white hover:bg-[#2E8B57] shadow-xs transition-all cursor-pointer"
                        title="Take photo with camera"
                      >
                        <Camera className="w-5 h-5" />
                      </button>
                    </div>
                    <span className="text-xs font-semibold text-stone-600">
                      {language === 'ta' ? 'படம் சேர்க்க' : 'Add Photo'} ({photos.length}/5)
                    </span>
                    <span className="text-[10px] text-stone-400">
                      JPG, PNG, WEBP (Max 20MB)
                    </span>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* User Observation Hint */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700">
                {language === 'ta'
                  ? 'விருப்ப குறிப்பு அல்லது கண்டறிந்த இடம் (விரும்பினால்):'
                  : 'Optional Observation or Habitat Clue:'}
              </label>
              <input
                type="text"
                value={userHint}
                onChange={e => setUserHint(e.target.value)}
                placeholder={
                  language === 'ta'
                    ? 'எ.கா: நீலகிரி தோட்டத்தில் பார்த்தது, கொடி வடிவம், மணம் வீசும் வெள்ளை பூ...'
                    : 'e.g. Found in Western Ghats forest, climbing vine, fragrant purple flowers...'
                }
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B57] bg-stone-50/50"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="text-xs text-stone-500 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-emerald-600" />
                <span>
                  {language === 'ta'
                    ? 'சர்வதேச Pl@ntNet தரவுத்தளம் & ஜெமினி விஷன் AI மூலம் பகுப்பாய்வு செய்யப்படும்.'
                    : 'Validated across international botanical databases and vision-capable AI.'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {photos.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setPhotos([]);
                      setResult(null);
                      setError(null);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-100 text-xs font-semibold cursor-pointer"
                  >
                    {language === 'ta' ? 'அனைத்தையும் நீக்கு' : 'Clear Photos'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleIdentify}
                  disabled={isIdentifying || photos.length === 0}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#174D35] to-[#2E8B57] text-white text-xs md:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer active:scale-95"
                >
                  {isIdentifying ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-emerald-300" />
                      <span>{language === 'ta' ? 'அடையாளம் காணப்படுகிறது...' : 'Identifying Globally...'}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-300" />
                      <span>{language === 'ta' ? 'தாவரத்தை அடையாளம் காண்க' : 'Run Global Identification'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Camera Modal */}
          {isCameraActive && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl space-y-4 p-5">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <h3 className="text-sm font-bold text-stone-800 flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#2E8B57]" />
                    {language === 'ta' ? 'தாவர புகைப்படத்தை எடுக்கவும்' : 'Take Plant Photograph'}
                  </h3>
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative rounded-2xl overflow-hidden bg-black aspect-4/3 flex items-center justify-center">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-8 border-2 border-white/50 rounded-2xl pointer-events-none border-dashed" />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      stopCamera();
                      setCameraFacing(prev => prev === 'environment' ? 'user' : 'environment');
                      setTimeout(startCamera, 300);
                    }}
                    className="px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50"
                  >
                    {language === 'ta' ? 'கேமராவை மாற்று' : 'Flip Camera'}
                  </button>
                  <button
                    type="button"
                    onClick={captureCameraPhoto}
                    className="px-6 py-2.5 rounded-xl bg-[#174D35] hover:bg-[#2E8B57] text-white text-xs md:text-sm font-bold flex items-center gap-2 shadow-md"
                  >
                    <Camera className="w-4 h-4 text-emerald-300" />
                    {language === 'ta' ? 'படம் பிடி' : 'Capture Photo'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* RESULTS PRESENTATION */}
          {result && (
            <div className="space-y-6 animate-scale-up">
              {/* If NOT Confidently Identified (Section 9) */}
              {!result.isIdentified || result.candidates.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 border border-amber-300 shadow-lg space-y-6 text-center max-w-3xl mx-auto">
                  <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                    <FileQuestion className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 uppercase tracking-wider">
                      {language === 'ta' ? 'தாவரம் உறுதியாக அடையாளம் காணப்படவில்லை' : 'PLANT NOT CONFIDENTLY IDENTIFIED'}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#183B2A] font-serif">
                      {language === 'ta'
                        ? 'புகைப்படம் போதுமான தெளிவுடன் இல்லை அல்லது புதிய இனம்'
                        : 'Visual Confidence Threshold Not Met'}
                    </h3>
                    <p className="text-xs md:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
                      {result.unidentifiedReason ||
                        (language === 'ta'
                          ? 'செடியின் பூ, காய் அல்லது இலை நரம்புகள் தெளிவாக தெரியவில்லை. துல்லியமான முடிவுக்கு தெளிவான புதிய படத்தை எடுக்கவும்.'
                          : 'The uploaded image lacks sufficient diagnostic features (e.g. leaf venation, floral structure, fruit shape) or may be obscured by lighting/shadows.')}
                    </p>
                  </div>

                  {/* Actionable Advice */}
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left space-y-2 max-w-lg mx-auto text-xs text-stone-700">
                    <span className="font-bold text-[#174D35] block">
                      {language === 'ta' ? 'பரிந்துரைக்கப்பட்ட அடுத்த கட்ட நடவடிக்கைகள்:' : 'Recommended Steps for Accurate Identification:'}
                    </span>
                    <ul className="list-disc pl-5 space-y-1 text-stone-600">
                      <li>{language === 'ta' ? 'சூரிய ஒளியில் இலை அல்லது பூவின் மேக்ரோ க்ளோஸ்-அப் புகைப்படம் எடுக்கவும்.' : 'Take a close-up macro photograph of a single leaf or open flower in bright morning light.'}</li>
                      <li>{language === 'ta' ? 'ஒரே செடியின் 2-3 வெவ்வேறு கோணங்களை (இலை + பூ + தண்டு) பதிவேற்றவும்.' : 'Upload multiple angles of the same plant (leaf + bloom + bark).'}</li>
                      <li>{language === 'ta' ? 'பின்னணியில் வேறு செடிகள் படராமல் தனித்த இலை அல்லது பூவை படம் பிடிக்கவும்.' : 'Ensure the background is clean and not cluttered with other species.'}</li>
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPhotos([]);
                        setResult(null);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#174D35] text-white text-xs font-bold shadow-xs hover:bg-[#2E8B57]"
                    >
                      {language === 'ta' ? 'புதிய புகைப்படம் எடுக்கவும்' : 'Upload Clearer Photo'}
                    </button>
                    {onNavigate && (
                      <button
                        type="button"
                        onClick={() => onNavigate('library')}
                        className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50"
                      >
                        {language === 'ta' ? 'தாவர நூலகத்தில் தேடுக' : 'Search Botanical Library'}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Successful Identification Results (Sections 5 & 6) */
                <div className="space-y-8">
                  {/* Service Attribution & Date Strip */}
                  <div className="flex flex-wrap items-center justify-between text-xs text-stone-600 bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-semibold text-stone-700">
                        {language === 'ta' ? 'அடையாளம் கண்ட இயந்திரம்:' : 'Engine:'}
                      </span>
                      <span className="font-bold text-[#174D35]">{result.provider}</span>
                    </div>

                    <div className="flex items-center gap-3 text-stone-500">
                      <span>{result.identificationDate}</span>
                      <span>•</span>
                      <span>{result.imagesCount} {language === 'ta' ? 'படங்கள்' : 'Photos Analyzed'}</span>
                    </div>
                  </div>

                  {/* Best Matching Primary Plant Card */}
                  {(() => {
                    const candidate = result.candidates[selectedCandidateIndex] || result.candidates[0];
                    return (
                      <div className="bg-white rounded-3xl border-2 border-emerald-500/80 shadow-xl overflow-hidden">
                        {/* Top Banner */}
                        <div className="relative bg-gradient-to-r from-[#174D35] to-[#2E8B57] text-white p-6 md:p-8">
                          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1 rounded-full text-xs font-black bg-white text-[#174D35] shadow-xs">
                                Rank #{candidate.rank} Candidate
                              </span>
                              {getConfidenceBadge(candidate.confidenceScore, candidate.confidenceLabel)}
                            </div>

                            <button
                              type="button"
                              onClick={() => speakTerm(candidate.scientificName)}
                              className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>{language === 'ta' ? 'உச்சரிப்பு' : 'Pronounce'}</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                            <div className="md:col-span-8 space-y-1.5">
                              <h2 className="text-2xl md:text-4xl font-extrabold font-serif">
                                {candidate.commonNames?.[0] || candidate.scientificName}
                              </h2>
                              {candidate.nameTa && (
                                <p className="text-emerald-200 text-lg md:text-xl font-bold">
                                  {candidate.nameTa}
                                </p>
                              )}
                              <p className="text-xs md:text-sm text-emerald-100 font-mono italic">
                                {candidate.scientificName}
                                {candidate.acceptedBotanicalName && candidate.acceptedBotanicalName !== candidate.scientificName && (
                                  <span className="ml-2 text-white/70">[{candidate.acceptedBotanicalName}]</span>
                                )}
                              </p>
                              <p className="text-xs text-white/80">
                                {language === 'ta' ? 'தாவர குடும்பம்:' : 'Family:'}{' '}
                                <strong className="text-white">{candidate.family}</strong> • {language === 'ta' ? 'பேரினம்:' : 'Genus:'}{' '}
                                <strong className="text-white">{candidate.genus}</strong>
                              </p>
                            </div>

                            <div className="md:col-span-4 flex justify-end">
                              <button
                                type="button"
                                onClick={() => handleConfirmAndAdd(candidate)}
                                className={`px-5 py-3 rounded-2xl text-xs md:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer ${
                                  addedSuccess
                                    ? 'bg-emerald-400 text-[#174D35]'
                                    : 'bg-white text-[#174D35] hover:bg-[#F5FAF5]'
                                }`}
                              >
                                {addedSuccess ? (
                                  <>
                                    <CheckCircle2 className="w-4 h-4 text-[#174D35]" />
                                    <span>{language === 'ta' ? 'செடி சேர்க்கப்பட்டது!' : 'Saved to My Plants!'}</span>
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-4 h-4 text-[#2E8B57]" />
                                    <span>{language === 'ta' ? 'உறுதி செய்து தோட்டத்தில் சேர்' : 'Confirm & Save to My Plants'}</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Visual Morphological Verification Note (Section 8) */}
                        {candidate.visualSimilarityExplanation && (
                          <div className="p-4 bg-emerald-50/70 border-b border-emerald-100 text-xs text-emerald-950 flex items-start gap-3">
                            <Sparkles className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                            <div>
                              <span className="font-bold text-[#174D35] block mb-0.5">
                                {language === 'ta' ? 'AI காட்சி உறுப்பாய்வு விளக்கம் (Visual Morphological Verification):' : 'AI Visual Morphological Analysis:'}
                              </span>
                              <p className="leading-relaxed text-stone-700">
                                {candidate.visualSimilarityExplanation}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* 28-Point Botanical Dossier (Section 6) */}
                        <div className="p-6 md:p-8 space-y-6">
                          <h3 className="text-sm font-bold text-[#183B2A] uppercase tracking-wider flex items-center gap-2 border-b border-stone-100 pb-2">
                            <BookOpen className="w-4 h-4 text-[#2E8B57]" />
                            {language === 'ta' ? 'முழு தாவரவியல் விவரக்குறிப்பு (Comprehensive Botanical Dossier)' : 'Comprehensive Botanical Dossier & Horticultural Specs'}
                          </h3>

                          {/* Quick 6-Grid Stats */}
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                              <span className="text-[10px] font-bold text-stone-500 uppercase block">
                                {language === 'ta' ? 'தாவர வகை' : 'Plant Type'}
                              </span>
                              <span className="font-bold text-[#183B2A] mt-1 block">
                                {candidate.plantType || 'Perennial'}
                              </span>
                            </div>

                            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                              <span className="text-[10px] font-bold text-stone-500 uppercase block">
                                {language === 'ta' ? 'சூரிய ஒளி' : 'Sunlight'}
                              </span>
                              <span className="font-bold text-[#183B2A] mt-1 block truncate">
                                {candidate.sunlight || 'Bright Indirect'}
                              </span>
                            </div>

                            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                              <span className="text-[10px] font-bold text-stone-500 uppercase block">
                                {language === 'ta' ? 'நீர்ப்பாசனம்' : 'Watering'}
                              </span>
                              <span className="font-bold text-[#183B2A] mt-1 block truncate">
                                {candidate.watering || 'Moderate'}
                              </span>
                            </div>

                            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                              <span className="text-[10px] font-bold text-stone-500 uppercase block">
                                {language === 'ta' ? 'வளரும் இடம்' : 'Suitability'}
                              </span>
                              <span className="font-bold text-[#183B2A] mt-1 block truncate">
                                {candidate.indoorOutdoor || 'Indoor/Outdoor'}
                              </span>
                            </div>

                            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                              <span className="text-[10px] font-bold text-stone-500 uppercase block">
                                {language === 'ta' ? 'வளர்ச்சி வேகம்' : 'Growth Rate'}
                              </span>
                              <span className="font-bold text-[#183B2A] mt-1 block">
                                {candidate.growthRate || 'Moderate'}
                              </span>
                            </div>

                            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                              <span className="text-[10px] font-bold text-stone-500 uppercase block">
                                {language === 'ta' ? 'நச்சுத்தன்மை' : 'Toxicity'}
                              </span>
                              <span className="font-bold text-[#183B2A] mt-1 block truncate">
                                {candidate.toxicity || 'Non-toxic'}
                              </span>
                            </div>
                          </div>

                          {/* Extended Details Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div className="p-4 rounded-2xl bg-[#F5FAF5] border border-emerald-100 space-y-2">
                              <h4 className="font-bold text-[#174D35] flex items-center gap-1.5">
                                <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
                                {language === 'ta' ? 'தோற்றம் & வாழ்விடம்' : 'Origin & Native Biome'}
                              </h4>
                              <p className="text-stone-700">
                                <strong>Native Distribution:</strong> {candidate.nativeDistribution || 'Subtropical and tropical zones'}
                              </p>
                              <p className="text-stone-700">
                                <strong>Habitat:</strong> {candidate.habitat || 'Forest understory, tropical scrub, or home gardens'}
                              </p>
                              <p className="text-stone-700">
                                <strong>Mature Size:</strong> {candidate.matureSize || '30 - 150 cm depending on pruning'}
                              </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-[#F5FAF5] border border-emerald-100 space-y-2">
                              <h4 className="font-bold text-[#174D35] flex items-center gap-1.5">
                                <Thermometer className="w-3.5 h-3.5 text-emerald-600" />
                                {language === 'ta' ? 'காலநிலை & மண் தேவை' : 'Soil & Climate Requirements'}
                              </h4>
                              <p className="text-stone-700">
                                <strong>Soil:</strong> {candidate.soil || 'Rich, well-aerated potting soil with perlite'}
                              </p>
                              <p className="text-stone-700">
                                <strong>Temperature:</strong> {candidate.temperatureRange || '18°C - 32°C'}
                              </p>
                              <p className="text-stone-700">
                                <strong>Humidity:</strong> {candidate.humidity || '45% - 70%'}
                              </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-[#F5FAF5] border border-emerald-100 space-y-2">
                              <h4 className="font-bold text-[#174D35] flex items-center gap-1.5">
                                <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                                {language === 'ta' ? 'இனப்பெருக்கம் & பருவங்கள்' : 'Propagation & Seasons'}
                              </h4>
                              <p className="text-stone-700">
                                <strong>Propagation:</strong> {candidate.propagation || 'Stem cuttings, division, or seeds'}
                              </p>
                              <p className="text-stone-700">
                                <strong>Flowering Season:</strong> {candidate.floweringSeason || 'Spring to summer'}
                              </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-[#F5FAF5] border border-emerald-100 space-y-2">
                              <h4 className="font-bold text-[#174D35] flex items-center gap-1.5">
                                <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
                                {language === 'ta' ? 'பூச்சிகள் & நோய் எச்சரிக்கைகள்' : 'Pests & Disease Watch'}
                              </h4>
                              <p className="text-stone-700">
                                <strong>Common Pests:</strong> {(candidate.commonPests || ['Aphids', 'Mealybugs']).join(', ')}
                              </p>
                              <p className="text-stone-700">
                                <strong>Common Diseases:</strong> {(candidate.commonDiseases || ['Root rot', 'Powdery mildew']).join(', ')}
                              </p>
                            </div>
                          </div>

                          {/* Gardening Instructions */}
                          {candidate.gardeningGuide && (
                            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 space-y-1">
                              <span className="font-bold text-amber-900 block flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                                {language === 'ta' ? 'தோட்டக்கலை வளர்ப்பு குறிப்பு:' : 'Horticultural Care Recommendation:'}
                              </span>
                              <p className="text-amber-800 leading-relaxed">
                                {candidate.gardeningGuide}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Other Ranked Candidates (Up to 5) */}
                  {result.candidates.length > 1 && (
                    <div className="space-y-4">
                      <h3 className="text-base font-bold text-[#183B2A] flex items-center justify-between">
                        <span>{language === 'ta' ? 'பிற சாத்தியமான பொருத்தங்கள் (Ranked Candidates)' : 'Other Possible Species Candidates'}</span>
                        <span className="text-xs text-stone-500 font-normal">
                          {language === 'ta' ? 'விவரங்களை மாற்ற கிளிக் செய்யவும்' : 'Click candidate to inspect dossier'}
                        </span>
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {result.candidates.map((cand, idx) => {
                          const isSelected = idx === selectedCandidateIndex;
                          return (
                            <div
                              key={idx}
                              onClick={() => setSelectedCandidateIndex(idx)}
                              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                                isSelected
                                  ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                                  : 'bg-white border-stone-200 hover:border-emerald-300 shadow-xs'
                              }`}
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-200 text-stone-700">
                                    #{cand.rank}
                                  </span>
                                  <span className="text-xs font-bold text-[#183B2A]">
                                    {cand.commonNames?.[0] || cand.scientificName}
                                  </span>
                                  {cand.nameTa && (
                                    <span className="text-xs text-[#2E8B57] font-semibold">
                                      ({cand.nameTa})
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-stone-500 font-mono italic">
                                  {cand.scientificName} • {cand.family}
                                </p>
                                <p className="text-xs text-stone-600 line-clamp-2 mt-1">
                                  {cand.visualSimilarityExplanation || 'Candidate determined by floral and vegetative features.'}
                                </p>
                              </div>

                              <div className="text-right shrink-0">
                                <span className="text-sm font-black text-[#174D35] block">
                                  {cand.confidenceScore}%
                                </span>
                                <span className="text-[10px] text-stone-400 block">
                                  {cand.confidenceLabel}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* MAIN TAB 2: 15 SPECIALIZED AI TOOLS (Section 10) */}
      {activeMainTab === 'tools' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-sm space-y-4">
            <div>
              <h2 className="text-xl font-bold text-[#183B2A] flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#2E8B57]" />
                {language === 'ta' ? '15 சிறப்பு AI தாவரவியல் கருவிகள்' : '15 Specialized Botanical AI Diagnostics'}
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                {language === 'ta'
                  ? 'இலை, மலர், காய், தண்டு, மூலிகைகள் மற்றும் பெயர்களை துல்லியமாக பகுப்பாய்வு செய்யும் பிரத்யேக கருவிகள்.'
                  : 'Domain-specific analytical tools for leaves, flowers, fruit pods, medicinal Siddha herbs, tree canopies, weed eradication, and multilingual botanical translation.'}
              </p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SPECIALIZED_TOOLS.map(tool => {
                const Icon = tool.icon;
                const isSelected = activeTool === tool.id;
                return (
                  <div
                    key={tool.id}
                    onClick={() => {
                      setActiveTool(tool.id);
                      setToolResult(null);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-emerald-50 border-[#2E8B57] shadow-md ring-2 ring-emerald-500/20'
                        : 'bg-stone-50 hover:bg-white border-stone-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="p-2.5 rounded-xl bg-white border border-stone-200 text-[#174D35] shrink-0 shadow-2xs">
                      <Icon className="w-5 h-5 text-[#2E8B57]" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-[#183B2A]">
                        {language === 'ta' ? tool.titleTa : tool.title}
                      </h4>
                      <p className="text-[11px] text-stone-500 leading-snug">
                        {tool.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Tool Interactive Workspace */}
          {activeTool && (
            <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-[#2E8B57] shadow-xl space-y-6 animate-scale-up">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-100 text-[#174D35]">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#183B2A]">
                      {SPECIALIZED_TOOLS.find(t => t.id === activeTool)?.title}
                    </h3>
                    <p className="text-xs text-stone-500">
                      {SPECIALIZED_TOOLS.find(t => t.id === activeTool)?.desc}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTool(null)}
                  className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tool Input Configuration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Upload Area */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-stone-700">
                    {language === 'ta' ? 'ஆய்வு செய்ய வேண்டிய புகைப்படம்:' : 'Primary Photograph:'}
                  </label>
                  {toolImage ? (
                    <div className="relative h-44 rounded-2xl overflow-hidden border border-stone-200 bg-stone-100">
                      <img src={toolImage} alt="Tool input" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setToolImage(null)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="h-44 rounded-2xl border-2 border-dashed border-stone-300 hover:border-[#2E8B57] bg-stone-50 flex flex-col items-center justify-center p-4 cursor-pointer text-center space-y-2">
                      <Upload className="w-6 h-6 text-stone-400" />
                      <span className="text-xs font-semibold text-stone-600">
                        {language === 'ta' ? 'புகைப்படத்தை தேர்ந்தெடுக்கவும்' : 'Upload photo for this tool'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const r = new FileReader();
                            r.onloadend = () => setToolImage(r.result as string);
                            r.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* If comparison tool, show second image */}
                {activeTool === 'comparison' && (
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-stone-700">
                      {language === 'ta' ? 'இரண்டாவது தாவரப் புகைப்படம் (ஒப்பீட்டுக்கு):' : 'Second Plant Photograph (to Compare):'}
                    </label>
                    {toolSecondImage ? (
                      <div className="relative h-44 rounded-2xl overflow-hidden border border-stone-200 bg-stone-100">
                        <img src={toolSecondImage} alt="Tool input 2" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setToolSecondImage(null)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="h-44 rounded-2xl border-2 border-dashed border-stone-300 hover:border-[#2E8B57] bg-stone-50 flex flex-col items-center justify-center p-4 cursor-pointer text-center space-y-2">
                        <Upload className="w-6 h-6 text-stone-400" />
                        <span className="text-xs font-semibold text-stone-600">
                          {language === 'ta' ? '2-வது படத்தை பதிவேற்றுக' : 'Upload 2nd photo to compare'}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const r = new FileReader();
                              r.onloadend = () => setToolSecondImage(r.result as string);
                              r.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                )}

                {/* Text query area */}
                <div className={`space-y-2 ${activeTool === 'comparison' ? 'md:col-span-2' : ''}`}>
                  <label className="block text-xs font-bold text-stone-700">
                    {activeTool === 'translator'
                      ? (language === 'ta' ? 'மொழிபெயர்க்க வேண்டிய பெயர்:' : 'Plant Name to Translate:')
                      : activeTool === 'botanical-assistant'
                      ? (language === 'ta' ? 'தாவரவியல் கேள்வி:' : 'Botanical Question:')
                      : (language === 'ta' ? 'கூடுதல் குறிப்பு அல்லது கேள்வி:' : 'Specific Observation Question:')}
                  </label>
                  <textarea
                    rows={4}
                    value={toolQuery}
                    onChange={e => setToolQuery(e.target.value)}
                    placeholder={
                      activeTool === 'translator'
                        ? 'e.g. Ocimum tenuiflorum, Tulsi, Holy Basil'
                        : activeTool === 'botanical-assistant'
                        ? 'e.g. Why are the lower leaves of my Fiddle Leaf Fig developing brown lesions with yellow halos?'
                        : 'e.g. Are these leaf veins pinnate or palmate? Is this plant native to Tamil Nadu?'
                    }
                    className="w-full p-3 rounded-xl border border-stone-300 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B57] bg-stone-50/50"
                  />
                  <button
                    type="button"
                    onClick={handleExecuteTool}
                    disabled={toolAnalyzing || (!toolImage && !toolQuery)}
                    className="w-full py-2.5 rounded-xl bg-[#174D35] hover:bg-[#2E8B57] text-white text-xs md:text-sm font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {toolAnalyzing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>{language === 'ta' ? 'பகுப்பாய்வு நடக்கிறது...' : 'Analyzing with AI...'}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-emerald-300" />
                        <span>{language === 'ta' ? 'கருவியை இயக்குக' : 'Run Botanical Analysis'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Tool Results Presentation */}
              {toolResult && (
                <div className="p-5 rounded-2xl bg-[#F5FAF5] border border-emerald-200 space-y-4 animate-scale-up">
                  <div className="flex items-center justify-between border-b border-emerald-200/60 pb-3">
                    <h4 className="text-base font-bold text-[#174D35] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{toolResult.title || 'Botanical Analysis Report'}</span>
                    </h4>
                    {toolResult.confidence && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                        {toolResult.confidence}
                      </span>
                    )}
                  </div>

                  {toolResult.speciesName && (
                    <div className="text-xs font-bold text-stone-800">
                      Species: <span className="font-mono italic text-[#174D35]">{toolResult.speciesName}</span>
                      {toolResult.nameTa && <span className="ml-2 text-emerald-700">({toolResult.nameTa})</span>}
                    </div>
                  )}

                  {toolResult.keyFindings && Array.isArray(toolResult.keyFindings) && (
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block">
                        Key Observations:
                      </span>
                      <ul className="list-disc pl-5 space-y-1 text-xs text-stone-700">
                        {toolResult.keyFindings.map((f: string, i: number) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {toolResult.detailedReport && (
                    <div className="text-xs text-stone-700 leading-relaxed space-y-1 bg-white p-4 rounded-xl border border-stone-200">
                      <p>{toolResult.detailedReport}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* MAIN TAB 3: SAVED IDENTIFICATION HISTORY (Section 11) */}
      {activeMainTab === 'history' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-[#183B2A] flex items-center gap-2">
                <History className="w-5 h-5 text-[#2E8B57]" />
                {language === 'ta' ? 'தாவர அடையாள வரலாறு' : 'Saved Plant Identification History'}
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                {language === 'ta'
                  ? 'நீங்கள் முன்னர் கண்டறிந்த தாவரங்கள், தேதிகள் மற்றும் உறுதிப்படுத்திய பதிவுகள்.'
                  : 'Your past identification logs with confidence levels, providers, and confirmations.'}
              </p>
            </div>

            {history.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(history, null, 2));
                    const dl = document.createElement('a');
                    dl.setAttribute('href', dataStr);
                    dl.setAttribute('download', `plant_identification_history_${new Date().toISOString().split('T')[0]}.json`);
                    dl.click();
                  }}
                  className="px-3.5 py-2 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-stone-500" />
                  {language === 'ta' ? 'பதிவிறக்கு' : 'Export JSON'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(language === 'ta' ? 'வரலாற்றை நிச்சயமாக அழிக்க விரும்புகிறீர்களா?' : 'Are you sure you want to clear your identification history?')) {
                      setHistory([]);
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {language === 'ta' ? 'அழி' : 'Clear'}
                </button>
              </div>
            )}
          </div>

          {history.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <History className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-stone-700">
                {language === 'ta' ? 'வரலாற்றில் பதிவுகள் எதுவும் இல்லை' : 'No Identification History Yet'}
              </h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                {language === 'ta'
                  ? 'முதன்மை தாவரம் அடையாளங்காட்டி மூலம் செடிகளை ஸ்கேன் செய்து முடிவுகளை இங்கே காண்க.'
                  : 'Scan plant photographs using the Global Identifier above to see your history logged here.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map(item => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-stone-50/60 border border-stone-200 hover:border-emerald-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.scientificName}
                        className="w-14 h-14 rounded-xl object-cover border border-stone-200 shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-stone-200 flex items-center justify-center shrink-0">
                        <Leaf className="w-6 h-6 text-stone-400" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-[#183B2A]">{item.commonName}</h4>
                        {item.nameTa && <span className="text-xs text-[#2E8B57] font-semibold">({item.nameTa})</span>}
                        {item.userConfirmed && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Confirmed
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 font-mono italic">{item.scientificName}</p>
                      <p className="text-[11px] text-stone-400 mt-0.5">{item.date} • {item.provider}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 justify-end">
                    <span className="text-xs font-bold text-[#174D35] bg-white px-3 py-1 rounded-xl border border-stone-200">
                      {item.confidence}% Match
                    </span>
                    <button
                      type="button"
                      onClick={() => setHistory(prev => prev.filter(h => h.id !== item.id))}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-stone-100 cursor-pointer"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalPlantIdentifierPage;
