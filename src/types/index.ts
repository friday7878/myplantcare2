export type Language = 'en' | 'ta';

export type PlantCategory = 
  | 'Indoor' 
  | 'Medicinal' 
  | 'Flowering' 
  | 'Vegetables' 
  | 'Fruit' 
  | 'Trees' 
  | 'Cacti & Succulents' 
  | 'Aquatic' 
  | 'Climbers & Creepers' 
  | 'Herbs & Aromatic';

export type HealthStatus = 'healthy' | 'warning' | 'critical';

export type SunlightType = 
  | 'Full Sun (6+ hrs)' 
  | 'Partial Sun (4-6 hrs)' 
  | 'Bright Indirect Light' 
  | 'Partial Shade (2-4 hrs)' 
  | 'Low Light / Full Shade';

export type PetToxicity = 'Safe for Pets' | 'Toxic to Cats/Dogs' | 'Mild Irritant' | (string & {});

export interface Plant {
  id: string;
  userId: string;
  name: string;
  commonName: string;
  scientificName: string;
  category: PlantCategory;
  photoUrl: string;
  plantingDate: string;
  indoorOutdoor: 'indoor' | 'outdoor';
  location: string;
  sunlightRequirement: string;
  wateringFrequencyDays: number;
  soilType: string;
  healthStatus: HealthStatus;
  notes: string;
  qrCodeUrl?: string;
  createdAt: any;
  updatedAt?: any;
}

export interface WateringSchedule {
  id: string;
  userId: string;
  plantId: string;
  plantName: string;
  intervalDays: number;
  nextWateringDate: string;
  lastWateredDate?: string;
  status: 'upcoming' | 'due_today' | 'overdue' | 'completed';
  createdAt: any;
  updatedAt?: any;
}

export interface WateringLog {
  id: string;
  userId: string;
  plantId: string;
  plantName: string;
  wateredAt: string;
  notes?: string;
  createdAt: any;
}

export interface GrowthRecord {
  id: string;
  userId: string;
  plantId: string;
  plantName?: string;
  heightCm: number;
  leafCount: number;
  observation: string;
  photoUrl?: string;
  recordedDate: string;
  createdAt: any;
}

export interface Diagnosis {
  id: string;
  userId: string;
  plantId?: string;
  plantName?: string;
  photoUrl?: string;
  symptoms: string;
  possibleProblem: string;
  severity: 'mild' | 'moderate' | 'severe';
  treatment: string;
  prevention: string;
  wateringAdvice?: string;
  sunlightAdvice?: string;
  fertilizerAdvice?: string;
  isRescueMode?: string;
  status: 'active' | 'recovered' | 'archived';
  createdAt: any;
}

export interface ChatMessage {
  id: string;
  userId: string;
  role: 'user' | 'assistant';
  content: string;
  language?: Language;
  modelUsed?: string;
  createdAt: any;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  category: 'watering' | 'health' | 'growth' | 'tip' | 'achievement' | 'weather' | 'calendar';
  read: boolean;
  createdAt: any;
}

export interface Achievement {
  id: string;
  userId: string;
  badgeId: string;
  badgeName: string;
  description: string;
  icon: string;
  unlockedAt: string;
  createdAt: any;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  ecoScore: number;
  language: Language;
  role: 'user' | 'admin';
  hasCompletedOnboarding?: boolean;
  city?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface LibraryPlant {
  id: string;
  name: string;
  nameTa: string;
  commonName?: string;
  scientificName: string;
  category: PlantCategory;
  categoryTa: string;
  description: string;
  descriptionTa: string;
  photoUrl: string;
  wateringDays: number;
  wateringAdvice: string;
  wateringAdviceTa: string;
  sunlight: SunlightType;
  sunlightAdvice: string;
  sunlightAdviceTa: string;
  soilType: string;
  soilTypeTa: string;
  soilPh: string;
  temperature: string;
  humidityPreference: 'Low (30-40%)' | 'Moderate (40-60%)' | 'High (60-80%)' | (string & {});
  growthPeriod: string;
  fertilizer: string;
  fertilizerTa: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  nativeRegion: string;
  matureSize: string;
  propagationMethod: string;
  floweringSeason: string;
  fruitingSeason?: string;
  petToxicity: PetToxicity;
  isBeginnerFriendly: boolean;
  isLowWater: boolean;
  isLowLight: boolean;
  commonProblems: string[];
  careInstructions: string[];
  careInstructionsTa: string[];
}

export type PlantyMood = 
  | 'idle' 
  | 'blink' 
  | 'welcome' 
  | 'thinking' 
  | 'speaking' 
  | 'happy' 
  | 'sad' 
  | 'excited' 
  | 'sleeping' 
  | 'floating'
  | 'laughing'
  | 'walking'
  | 'exploring'
  | 'encouraging'
  | 'curious';


// Calendar Events
export interface GardenCalendarEvent {
  id: string;
  userId: string;
  plantId?: string;
  plantName: string;
  type: 'watering' | 'fertilizer' | 'pruning' | 'repotting' | 'planting' | 'harvesting';
  date: string;
  time?: string;
  notes?: string;
  completed: boolean;
}

// Seed Germination Record
export interface SeedRecord {
  id: string;
  userId: string;
  seedName: string;
  sowDate: string;
  germinationDate?: string;
  daysToGerminate?: number;
  seedlingHeightCm: number;
  germinationRatePercent: number;
  notes: string;
  status: 'sown' | 'germinated' | 'transplanted' | 'failed';
}

// Harvest Record
export interface HarvestRecord {
  id: string;
  userId: string;
  plantName: string;
  harvestDate: string;
  quantity: string; // e.g. "1.5 kg" or "12 fruits"
  qualityRating: 1 | 2 | 3 | 4 | 5;
  tasteNotes: string;
}

// Plant Care Journal
export interface JournalEntry {
  id: string;
  userId: string;
  plantName: string;
  date: string;
  title: string;
  notes: string;
  mood: 'thriving' | 'recovering' | 'blooming' | 'needs_attention';
  photoUrl?: string;
}

// Garden Expense
export interface GardenExpense {
  id: string;
  userId: string;
  item: string;
  category: 'Plants' | 'Seeds' | 'Pots' | 'Soil' | 'Compost' | 'Fertilizer' | 'Tools' | 'Watering';
  cost: number;
  date: string;
}

// Gamification Challenge
export interface GardeningChallenge {
  id: string;
  title: string;
  titleTa: string;
  description: string;
  descriptionTa: string;
  points: number;
  targetCount: number;
  currentCount: number;
  completed: boolean;
  badge: string;
}

// Interactive Quiz Question
export interface QuizQuestion {
  id: string;
  topic: 'Plant Identification' | 'Photosynthesis & Biology' | 'Plant Diseases & Pests' | 'Soil & Nutrition';
  question: string;
  questionTa: string;
  options: string[];
  optionsTa: string[];
  correctAnswerIndex: number;
  explanation: string;
  explanationTa: string;
}

// AI Garden Designer Output
export interface GardenDesignPlan {
  gardenType: string;
  spaceArea: string;
  budget: string;
  sunlightCondition: string;
  recommendedPlants: {
    name: string;
    category: string;
    spacingCm: number;
    containerSize: string;
    companionTo: string[];
    role: string;
  }[];
  layoutGrid: {
    zone: string;
    position: string;
    sunExposure: string;
    plantName: string;
    icon: string;
  }[];
  careSchedule: {
    task: string;
    frequency: string;
  }[];
  estimatedCost: number;
}

// Pest & Disease Item
export interface PestDiseaseItem {
  id: string;
  type: 'disease' | 'pest';
  name: string;
  nameTa: string;
  scientificName?: string;
  category: string;
  symptoms: string[];
  symptomsTa: string[];
  causes: string[];
  affectedPlants: string[];
  prevention: string[];
  organicTreatment: string[];
  chemicalFreeTips: string;
  imageUrl: string;
}

// Weather Condition
export interface WeatherCondition {
  city: string;
  temperatureC: number;
  humidityPercent: number;
  rainProbabilityPercent: number;
  windSpeedKmh: number;
  conditionText: string;
  conditionIcon: 'sun' | 'cloud' | 'rain' | 'wind';
  plantAdvice: string;
  plantAdviceTa: string;
}
