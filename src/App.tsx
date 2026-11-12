import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  onSnapshot
} from 'firebase/firestore';
import { auth, db, testConnection, handleFirestoreError, OperationType } from './firebase';
import {
  Plant,
  WateringSchedule,
  WateringLog,
  GrowthRecord,
  Diagnosis,
  ChatMessage,
  NotificationItem,
  UserProfile,
  Language,
  LibraryPlant
} from './types';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LiveVoiceModal } from './components/LiveVoiceModal';
import { ImageGenerationModal } from './components/ImageGenerationModal';
import { NotificationModal } from './components/NotificationModal';
import AiPlantIdentifierModal from './components/AiPlantIdentifierModal';
import PlantComparisonModal from './components/PlantComparisonModal';
import WaterCalculatorModal from './components/WaterCalculatorModal';
import AiGardenDesignerModal from './components/AiGardenDesignerModal';
import QrCodeModal from './components/QrCodeModal';
import OnboardingModal from './components/OnboardingModal';
import { PlantyMascot } from './components/PlantyMascot';
import { Mic, MessageCircle, Sparkles, HelpCircle } from 'lucide-react';

// Pages
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { MyPlantsPage } from './pages/MyPlantsPage';
import { PlantDoctorPage } from './pages/PlantDoctorPage';
import { PlantRescuePage } from './pages/PlantRescuePage';
import { PlantyAiPage } from './pages/PlantyAiPage';
import { PlantLibraryPage } from './pages/PlantLibraryPage';
import { WateringSchedulePage } from './pages/WateringSchedulePage';
import { GrowthTrackerPage } from './pages/GrowthTrackerPage';
import { GuidesPage } from './pages/GuidesPage';
import { GardeningTipsPage } from './pages/GardeningTipsPage';
import { SettingsPage } from './pages/SettingsPage';
import { GardenToolsPage } from './pages/GardenToolsPage';
import { DiseaseEncyclopediaPage } from './pages/DiseaseEncyclopediaPage';
import GlobalPlantIdentifierPage from './pages/GlobalPlantIdentifierPage';
import TamilNaduPlantsPage from './pages/TamilNaduPlantsPage';
import PestEncyclopediaPage from './pages/PestEncyclopediaPage';


// Initial Starter Garden Plants for Rich Interactive Demonstration
const INITIAL_PLANTS: Plant[] = [
  {
    id: 'p-1',
    userId: 'demo',
    name: 'Holy Basil (Tulsi)',
    commonName: 'Queen of Herbs',
    scientificName: 'Ocimum sanctum',
    category: 'Medicinal',
    photoUrl: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=600&q=80',
    plantingDate: '2026-03-01',
    indoorOutdoor: 'outdoor',
    location: 'Sunny Balcony',
    sunlightRequirement: 'Full Sun (6+ hrs)',
    wateringFrequencyDays: 2,
    soilType: 'Rich loamy soil with vermicompost',
    healthStatus: 'healthy',
    notes: 'Producing lovely aromatic sacred leaves. Pruned manjari flowers yesterday.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'p-2',
    userId: 'demo',
    name: 'Golden Pothos (Money Plant)',
    commonName: 'Devil\'s Ivy',
    scientificName: 'Epipremnum aureum',
    category: 'Indoor',
    photoUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80',
    plantingDate: '2026-02-15',
    indoorOutdoor: 'indoor',
    location: 'Living Room Shelf',
    sunlightRequirement: 'Bright Indirect Light',
    wateringFrequencyDays: 6,
    soilType: 'Aerated peat & perlite mix',
    healthStatus: 'healthy',
    notes: 'Trailing gracefully across shelf. Wiped leaf dust last Sunday.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'p-3',
    userId: 'demo',
    name: 'Scarlet Cherry Tomato',
    commonName: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    category: 'Vegetables',
    photoUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80',
    plantingDate: '2026-03-10',
    indoorOutdoor: 'outdoor',
    location: 'Terrace Container Bed',
    sunlightRequirement: 'Full Sun (6+ hrs)',
    wateringFrequencyDays: 2,
    soilType: 'Compost enriched garden loam',
    healthStatus: 'warning',
    notes: 'Lower leaves show slight yellowing. Treated with sour buttermilk spray.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'p-4',
    userId: 'demo',
    name: 'Arabian Jasmine (Malli)',
    commonName: 'Sambac Jasmine',
    scientificName: 'Jasminum sambac',
    category: 'Flowering',
    photoUrl: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=600&q=80',
    plantingDate: '2026-01-20',
    indoorOutdoor: 'outdoor',
    location: 'Terrace Garden Pot',
    sunlightRequirement: 'Full Sun (6+ hrs)',
    wateringFrequencyDays: 3,
    soilType: 'Well-draining red soil with cow manure',
    healthStatus: 'healthy',
    notes: 'Fragrant white buds opening each evening. Applied groundnut cake tea.',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_SCHEDULES: WateringSchedule[] = [
  {
    id: 's-1',
    userId: 'demo',
    plantId: 'p-1',
    plantName: 'Holy Basil (Tulsi)',
    intervalDays: 2,
    nextWateringDate: new Date().toISOString().split('T')[0],
    status: 'due_today',
    createdAt: new Date().toISOString()
  },
  {
    id: 's-2',
    userId: 'demo',
    plantId: 'p-2',
    plantName: 'Golden Pothos (Money Plant)',
    intervalDays: 6,
    nextWateringDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    status: 'upcoming',
    createdAt: new Date().toISOString()
  },
  {
    id: 's-3',
    userId: 'demo',
    plantId: 'p-3',
    plantName: 'Scarlet Cherry Tomato',
    intervalDays: 2,
    nextWateringDate: new Date().toISOString().split('T')[0],
    status: 'due_today',
    createdAt: new Date().toISOString()
  },
  {
    id: 's-4',
    userId: 'demo',
    plantId: 'p-4',
    plantName: 'Arabian Jasmine (Malli)',
    intervalDays: 3,
    nextWateringDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    status: 'upcoming',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_GROWTH: GrowthRecord[] = [
  {
    id: 'g-1',
    userId: 'demo',
    plantId: 'p-1',
    plantName: 'Holy Basil (Tulsi)',
    heightCm: 14,
    leafCount: 22,
    observation: 'First healthy branching after pinching manjari shoot.',
    recordedDate: '2026-03-05',
    createdAt: new Date().toISOString()
  },
  {
    id: 'g-2',
    userId: 'demo',
    plantId: 'p-1',
    plantName: 'Holy Basil (Tulsi)',
    heightCm: 22,
    leafCount: 38,
    observation: 'Dense secondary growth and strong aromatic fragrance.',
    recordedDate: '2026-03-18',
    createdAt: new Date().toISOString()
  },
  {
    id: 'g-3',
    userId: 'demo',
    plantId: 'p-3',
    plantName: 'Scarlet Cherry Tomato',
    heightCm: 32,
    leafCount: 16,
    observation: 'First cluster of yellow star blossoms appeared on central stem.',
    recordedDate: '2026-03-22',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    userId: 'demo',
    title: 'Watering Reminder: Holy Basil (Tulsi)',
    message: 'Your Tulsi plant is scheduled for a fresh drink today!',
    category: 'watering',
    read: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'n-2',
    userId: 'demo',
    title: 'Achievement Unlocked: Green Beginner!',
    message: 'Welcome to MY PLANT CARE! You have started your personal botanical journey.',
    category: 'achievement',
    read: false,
    createdAt: new Date().toISOString()
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [ecoScore, setEcoScore] = useState<number>(120);

  // Core Data States
  const [plants, setPlants] = useState<Plant[]>(INITIAL_PLANTS);
  const [wateringSchedules, setWateringSchedules] = useState<WateringSchedule[]>(INITIAL_SCHEDULES);
  const [wateringLogs, setWateringLogs] = useState<WateringLog[]>([
    {
      id: 'l-1',
      userId: 'demo',
      plantId: 'p-1',
      plantName: 'Holy Basil (Tulsi)',
      wateredAt: 'Yesterday at 8:30 AM',
      createdAt: new Date().toISOString()
    }
  ]);
  const [growthRecords, setGrowthRecords] = useState<GrowthRecord[]>(INITIAL_GROWTH);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeRescueDiag, setActiveRescueDiag] = useState<any | null>(null);

  // Modals & UI Controls
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isImageGenModalOpen, setIsImageGenModalOpen] = useState(false);
  const [imageGenCallback, setImageGenCallback] = useState<((url: string) => void) | null>(null);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // v2.0 Upgrade Modals
  const [isIdentifierModalOpen, setIsIdentifierModalOpen] = useState(false);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [comparisonPlantId, setComparisonPlantId] = useState<string | undefined>(undefined);
  const [isWaterCalculatorModalOpen, setIsWaterCalculatorModalOpen] = useState(false);
  const [isGardenDesignerModalOpen, setIsGardenDesignerModalOpen] = useState(false);
  const [qrCodePlant, setQrCodePlant] = useState<Plant | null>(null);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);

  // Test Firestore connection on boot and listen to Auth state
  useEffect(() => {
    testConnection();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const profile: UserProfile = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || 'Plant Lover',
          email: firebaseUser.email || '',
          photoURL: firebaseUser.photoURL || undefined,
          ecoScore: 150,
          language: 'en',
          role: 'user'
        };
        setUser(profile);

        // Optionally synchronize with Firestore user collection
        try {
          await setDoc(doc(db, 'users', firebaseUser.uid), {
            displayName: profile.displayName,
            email: profile.email,
            photoURL: profile.photoURL || '',
            ecoScore: profile.ecoScore,
            language: profile.language,
            role: profile.role,
            createdAt: new Date(),
            updatedAt: new Date()
          }, { merge: true });
        } catch (err) {
          console.log("User doc sync note:", err);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Handlers for Plants & Water
  const handleAddPlant = (newPlantData: Omit<Plant, 'id' | 'createdAt'>) => {
    const id = `plant-${Date.now()}`;
    const newPlant: Plant = {
      ...newPlantData,
      id,
      userId: user?.uid || 'demo',
      createdAt: new Date().toISOString()
    };
    setPlants((prev) => [newPlant, ...prev]);

    // Create corresponding watering schedule
    const newSched: WateringSchedule = {
      id: `sched-${Date.now()}`,
      userId: user?.uid || 'demo',
      plantId: id,
      plantName: newPlant.name,
      intervalDays: newPlant.wateringFrequencyDays,
      nextWateringDate: new Date(Date.now() + 86400000 * newPlant.wateringFrequencyDays).toISOString().split('T')[0],
      status: 'upcoming',
      createdAt: new Date().toISOString()
    };
    setWateringSchedules((prev) => [newSched, ...prev]);

    // Eco Score boost & notification
    setEcoScore((prev) => prev + 25);
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        userId: user?.uid || 'demo',
        title: `Plant Added: ${newPlant.name}`,
        message: `${newPlant.name} has been welcomed into your digital garden! (+25 Eco Points)`,
        category: 'growth',
        read: false,
        createdAt: new Date().toISOString()
      },
      ...prev
    ]);
  };

  const handleUpdatePlant = (plantId: string, updates: Partial<Plant>) => {
    setPlants((prev) => prev.map((p) => (p.id === plantId ? { ...p, ...updates } : p)));
  };

  const handleDeletePlant = (plantId: string) => {
    setPlants((prev) => prev.filter((p) => p.id !== plantId));
    setWateringSchedules((prev) => prev.filter((s) => s.plantId !== plantId));
  };

  const handleWaterPlant = (plantId: string) => {
    const plant = plants.find((p) => p.id === plantId);
    const plantName = plant ? plant.name : 'Plant';
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Update schedules
    const todayStr = new Date().toISOString().split('T')[0];
    setWateringSchedules((prev) =>
      prev.map((s) => {
        if (s.plantId === plantId) {
          const nextDate = new Date(Date.now() + 86400000 * s.intervalDays).toISOString().split('T')[0];
          return {
            ...s,
            lastWateredDate: todayStr,
            nextWateringDate: nextDate,
            status: 'completed'
          };
        }
        return s;
      })
    );

    // Record watering log
    setWateringLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        userId: user?.uid || 'demo',
        plantId,
        plantName,
        wateredAt: `Today at ${nowStr}`,
        createdAt: new Date().toISOString()
      },
      ...prev
    ]);

    // Reward points & add notification
    setEcoScore((prev) => prev + 10);
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        userId: user?.uid || 'demo',
        title: `Watering Completed: ${plantName}`,
        message: `Your ${plantName} was happily watered! (+10 Eco Points)`,
        category: 'watering',
        read: false,
        createdAt: new Date().toISOString()
      },
      ...prev
    ]);
  };

  const handleAddSchedule = (scheduleData: Omit<WateringSchedule, 'id' | 'createdAt'>) => {
    const newSchedule: WateringSchedule = {
      ...scheduleData,
      id: `sched-${Date.now()}`,
      userId: user?.uid || 'demo',
      createdAt: new Date().toISOString()
    };
    setWateringSchedules((prev) => [newSchedule, ...prev]);
  };

  const handleDeleteSchedule = (schedId: string) => {
    setWateringSchedules((prev) => prev.filter((s) => s.id !== schedId));
  };

  const handleAddGrowthRecord = (recordData: Omit<GrowthRecord, 'id' | 'createdAt'>) => {
    const newRecord: GrowthRecord = {
      ...recordData,
      id: `growth-${Date.now()}`,
      userId: user?.uid || 'demo',
      createdAt: new Date().toISOString()
    };
    setGrowthRecords((prev) => [newRecord, ...prev]);
    setEcoScore((prev) => prev + 15);
  };

  const handleSaveDiagnosis = (diagData: Omit<Diagnosis, 'id' | 'createdAt'>) => {
    const newDiag: Diagnosis = {
      ...diagData,
      id: `diag-${Date.now()}`,
      userId: user?.uid || 'demo',
      createdAt: new Date().toISOString()
    };
    setDiagnoses((prev) => [newDiag, ...prev]);
  };

  const handleNavigateToRescue = (diagResult: any) => {
    setActiveRescueDiag(diagResult);
    setCurrentPage('rescue');
  };

  const handleAddFromLibrary = (libPlant: LibraryPlant) => {
    handleAddPlant({
      userId: user?.uid || 'demo',
      name: libPlant.name,
      commonName: libPlant.commonName || libPlant.name,
      scientificName: libPlant.scientificName,

      category: libPlant.category,
      photoUrl: libPlant.photoUrl,
      plantingDate: new Date().toISOString().split('T')[0],
      indoorOutdoor: libPlant.category === 'Indoor' ? 'indoor' : 'outdoor',
      location: libPlant.category === 'Indoor' ? 'Living Room' : 'Terrace Balcony',
      sunlightRequirement: libPlant.sunlight,
      wateringFrequencyDays: libPlant.wateringDays,
      soilType: libPlant.soilType,
      healthStatus: 'healthy',
      notes: libPlant.description
    });
  };

  const handleSendChatMessage = (content: string, role: 'user' | 'assistant', modelUsed?: string) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      userId: user?.uid || 'demo',
      role,
      content,
      modelUsed,
      createdAt: new Date().toISOString()
    };
    setChatHistory((prev) => [...prev, newMsg]);
  };

  const handleClearChat = () => {
    setChatHistory([]);
  };

  const handleExportData = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      user,
      plants,
      wateringSchedules,
      wateringLogs,
      growthRecords,
      diagnoses,
      ecoScore
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `my-plant-care-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleResetData = () => {
    setPlants(INITIAL_PLANTS);
    setWateringSchedules(INITIAL_SCHEDULES);
    setGrowthRecords(INITIAL_GROWTH);
    setChatHistory([]);
    setNotifications([]);
    setEcoScore(100);
  };

  const openImageGen = (callback: (url: string) => void) => {
    setImageGenCallback(() => callback);
    setIsImageGenModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5FAF5] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navigation Bar */}
      <Navbar
        user={user}
        language={language}
        onLanguageChange={setLanguage}
        ecoScore={ecoScore}
        notifications={notifications}
        onOpenNotifications={() => setIsNotificationModalOpen(true)}
        onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Main Container Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Desktop Sidebar Navigation */}
        <Sidebar
          currentPage={currentPage}
          onNavigate={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          language={language}
          onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
        />

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="relative z-10">
              <Sidebar
                currentPage={currentPage}
                onNavigate={(page) => {
                  setCurrentPage(page);
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                language={language}
                onOpenVoiceModal={() => {
                  setIsMobileMenuOpen(false);
                  setIsVoiceModalOpen(true);
                }}
                isMobile={true}
                onCloseMobile={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {currentPage === 'home' && (
            <HomePage
              onNavigate={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              language={language}
              onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
            />
          )}

          {currentPage === 'dashboard' && (
            <DashboardPage
              plants={plants}
              wateringSchedules={wateringSchedules}
              growthRecords={growthRecords}
              user={user}
              language={language}
              onNavigate={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onWaterPlant={handleWaterPlant}
              onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
            />
          )}

          {currentPage === 'plants' && (
            <MyPlantsPage
              plants={plants}
              onAddPlant={handleAddPlant}
              onUpdatePlant={handleUpdatePlant}
              onDeletePlant={handleDeletePlant}
              onWaterPlant={handleWaterPlant}
              language={language}
              onOpenImageGenModal={openImageGen}
              onOpenQrCode={(plant) => setQrCodePlant(plant)}
              onOpenIdentifier={() => setIsIdentifierModalOpen(true)}
            />
          )}

          {currentPage === 'doctor' && (
            <PlantDoctorPage
              plants={plants}
              onSaveDiagnosis={handleSaveDiagnosis}
              onNavigateToRescue={handleNavigateToRescue}
              language={language}
            />
          )}

          {currentPage === 'global-identifier' && (
            <GlobalPlantIdentifierPage
              language={language}
              onAddPlantToGarden={handleAddPlant}
              onNavigate={setCurrentPage}
            />
          )}

          {currentPage === 'tamil-nadu-plants' && (
            <TamilNaduPlantsPage
              language={language}
              onAddPlantToGarden={handleAddFromLibrary}
              onNavigate={setCurrentPage}
            />
          )}


          {currentPage === 'disease-encyclopedia' && (
            <DiseaseEncyclopediaPage
              language={language}
              onNavigate={setCurrentPage}
              onOpenDoctor={() => setCurrentPage('doctor')}
            />
          )}

          {currentPage === 'pests' && (
            <PestEncyclopediaPage
              language={language}
              onOpenDoctor={() => setCurrentPage('doctor')}
            />
          )}


          {currentPage === 'rescue' && (
            <PlantRescuePage
              plants={plants}
              currentDiagnosis={activeRescueDiag}
              language={language}
              onUpdatePlantStatus={(plantId, status) => handleUpdatePlant(plantId, { healthStatus: status })}
            />
          )}

          {currentPage === 'tools' && (
            <GardenToolsPage
              language={language}
              onOpenIdentifier={() => setIsIdentifierModalOpen(true)}
              onOpenWaterCalculator={() => setIsWaterCalculatorModalOpen(true)}
              onOpenGardenDesigner={() => setIsGardenDesignerModalOpen(true)}
              onNavigateToDiseaseEncyclopedia={() => setCurrentPage('disease-encyclopedia')}
            />
          )}

          {currentPage === 'planty-ai' && (
            <PlantyAiPage
              chatHistory={chatHistory}
              onSendMessage={handleSendChatMessage}
              onClearChat={handleClearChat}
              language={language}
              plants={plants}
            />
          )}

          {currentPage === 'library' && (
            <PlantLibraryPage
              onAddFromLibrary={handleAddFromLibrary}
              language={language}
              onOpenIdentifier={() => setIsIdentifierModalOpen(true)}
              onOpenComparison={(plantId) => {
                setComparisonPlantId(plantId);
                setIsComparisonModalOpen(true);
              }}
              onOpenWaterCalculator={() => setIsWaterCalculatorModalOpen(true)}
            />
          )}

          {currentPage === 'watering' && (
            <WateringSchedulePage
              schedules={wateringSchedules}
              wateringLogs={wateringLogs}
              plants={plants}
              onCompleteWatering={handleWaterPlant}
              onAddSchedule={handleAddSchedule}
              onDeleteSchedule={handleDeleteSchedule}
              language={language}
            />
          )}

          {currentPage === 'growth' && (
            <GrowthTrackerPage
              growthRecords={growthRecords}
              plants={plants}
              onAddRecord={handleAddGrowthRecord}
              language={language}
            />
          )}

          {currentPage === 'guides' && (
            <GuidesPage language={language} />
          )}

          {currentPage === 'tips' && (
            <GardeningTipsPage language={language} />
          )}

          {currentPage === 'settings' && (
            <SettingsPage
              user={user}
              language={language}
              onLanguageChange={setLanguage}
              onExportData={handleExportData}
              onResetData={handleResetData}
            />
          )}
        </main>
      </div>

      {/* Floating PLANTY Assistant Quick-Action Button */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 group">
        <button
          type="button"
          onClick={() => setIsVoiceModalOpen(true)}
          className="p-3.5 rounded-full bg-gradient-to-r from-[#174D35] to-[#2E8B57] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer border-2 border-white/60"
          title="Talk with PLANTY Live Voice"
        >
          <Mic className="w-6 h-6 text-[#A8DDB5] animate-pulse" />
        </button>

        <button
          type="button"
          onClick={() => setCurrentPage('planty-ai')}
          className="p-3.5 rounded-full bg-white text-[#174D35] shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer border border-[#A8DDB5]"
          title="Chat with PLANTY"
        >
          <MessageCircle className="w-6 h-6 text-[#2E8B57]" />
        </button>

        <button
          type="button"
          onClick={() => setIsOnboardingModalOpen(true)}
          className="p-3.5 rounded-full bg-white text-[#174D35] shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer border border-[#A8DDB5]"
          title="PLANTY Onboarding & Guide"
        >
          <HelpCircle className="w-6 h-6 text-amber-600" />
        </button>
      </div>

      {/* Modals */}
      <LiveVoiceModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        language={language}
        userPlantsSummary={plants.map((p) => `${p.name} (${p.category})`).join(', ')}
      />

      <ImageGenerationModal
        isOpen={isImageGenModalOpen}
        onClose={() => setIsImageGenModalOpen(false)}
        onSelectImage={(url) => {
          if (imageGenCallback) {
            imageGenCallback(url);
          }
        }}
        language={language}
      />

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
        onClearNotifications={() => setNotifications([])}
        language={language}
      />

      {/* v2.0 Upgrade Modals */}
      <AiPlantIdentifierModal
        isOpen={isIdentifierModalOpen}
        onClose={() => setIsIdentifierModalOpen(false)}
        language={language}
        onAddPlantToGarden={(plantData) => {
          handleAddPlant(plantData);
          setIsIdentifierModalOpen(false);
        }}
        onOpenGlobalPage={() => {
          setIsIdentifierModalOpen(false);
          setCurrentPage('global-identifier');
        }}
      />


      <PlantComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
        language={language}
        initialPlantId={comparisonPlantId}
        onAddPlantToGarden={(plant) => {
          handleAddFromLibrary(plant);
          setIsComparisonModalOpen(false);
        }}
      />

      <WaterCalculatorModal
        isOpen={isWaterCalculatorModalOpen}
        onClose={() => setIsWaterCalculatorModalOpen(false)}
        language={language}
      />

      <AiGardenDesignerModal
        isOpen={isGardenDesignerModalOpen}
        onClose={() => setIsGardenDesignerModalOpen(false)}
        language={language}
      />

      <QrCodeModal
        isOpen={Boolean(qrCodePlant)}
        onClose={() => setQrCodePlant(null)}
        language={language}
        plant={qrCodePlant}
      />

      <OnboardingModal
        isOpen={isOnboardingModalOpen}
        onClose={() => setIsOnboardingModalOpen(false)}
        language={language}
        onLanguageChange={setLanguage}
        onComplete={(prefs) => {
          setLanguage(prefs.language);
          localStorage.setItem('planty_onboarding_completed', 'true');
        }}
      />
    </div>
  );
}
