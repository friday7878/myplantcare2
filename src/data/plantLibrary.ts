import { LibraryPlant, PlantCategory, PetToxicity, SunlightType } from '../types';
import { PLANTS_PART_1 } from './plantsPart1';
import { PLANTS_PART_2 } from './plantsPart2';
import { PLANTS_PART_3 } from './plantsPart3';
import { PLANTS_PART_4 } from './plantsPart4';
import { PLANTS_PART_5_TAMIL_NADU } from './plantsPart5TamilNadu';

// Combined 205+ Curated Botanical Plants with rich Tamil Nadu native coverage
export const PLANT_LIBRARY: LibraryPlant[] = [
  ...PLANTS_PART_1,
  ...PLANTS_PART_2,
  ...PLANTS_PART_3,
  ...PLANTS_PART_4,
  ...PLANTS_PART_5_TAMIL_NADU
];

export const TAMIL_NADU_PLANTS = PLANTS_PART_5_TAMIL_NADU;

export const ALL_CATEGORIES: PlantCategory[] = [
  'Indoor',
  'Medicinal',
  'Flowering',
  'Vegetables',
  'Fruit',
  'Trees',
  'Cacti & Succulents',
  'Aquatic',
  'Climbers & Creepers',
  'Herbs & Aromatic'
];

export const CATEGORY_DESCRIPTIONS: Record<PlantCategory, { en: string; ta: string; icon: string }> = {
  'Indoor': {
    en: 'Air-purifying foliage and stylish decorative houseplants.',
    ta: 'காற்றைத் தூய்மைப்படுத்தும் மற்றும் அழகு தரும் உட்புறத் தாவரங்கள்.',
    icon: 'Home'
  },
  'Medicinal': {
    en: 'Ayurvedic, Siddha and traditional healing herbal remedies.',
    ta: 'ஆயுர்வேதம் மற்றும் சித்த மருத்துவத்தில் பயன்படும் அற்புத மூலிகைகள்.',
    icon: 'HeartPulse'
  },
  'Flowering': {
    en: 'Vibrant blossoms, ornamental colors, and perfumed petals.',
    ta: 'கண்கவர் வண்ணங்கள் மற்றும் நறுமணம் கொண்ட பூக்கும் மலர்ச் செடிகள்.',
    icon: 'Flower2'
  },
  'Vegetables': {
    en: 'Nutritious homegrown staples and kitchen garden crops.',
    ta: 'வீட்டுத் தோட்டம் மற்றும் மாடியில் எளிதாக விளையும் காய்கறிச் செடிகள்.',
    icon: 'Salad'
  },
  'Fruit': {
    en: 'Delicious tropical trees, vines, and sweet berry producers.',
    ta: 'சுவையான சத்துக்கள் நிறைந்த பழ மரங்கள் மற்றும் கொடிகள்.',
    icon: 'Apple'
  },
  'Trees': {
    en: 'Avenue giants, cooling shade trees, timber and sacred species.',
    ta: 'பரந்த நிழல் தரும் கம்பீர மரங்கள் மற்றும் வெளிப்புறத் தாவரங்கள்.',
    icon: 'Trees'
  },
  'Cacti & Succulents': {
    en: 'Drought-hardy sculptural plants storing water in thick fleshy leaves.',
    ta: 'குறைந்த நீரில் வாழும் சதைப்பற்றுள்ள கற்றாழை வகைகள்.',
    icon: 'Sun'
  },
  'Aquatic': {
    en: 'Pond beauties, floating pads, and oxygenating aquarium species.',
    ta: 'தண்ணீரில் மிதக்கும் தாமரை, அல்லி மற்றும் மீன் தொட்டி நீர்ச்செடிகள்.',
    icon: 'Droplets'
  },
  'Climbers & Creepers': {
    en: 'Pergola climbers, balcony creepers, and vertical fence vines.',
    ta: 'வேலி, மாடிப் பந்தல் மற்றும் கிரில்களில் ஏறும் அழகிய கொடிகள்.',
    icon: 'GitCommit'
  },
  'Herbs & Aromatic': {
    en: 'Gourmet cooking seasonings, fresh teas, and fragrant leaf herbs.',
    ta: 'சமையல் மணம் கூட்டும் தேநீர் மற்றும் நறுமண மூலிகைக் கீரைகள்.',
    icon: 'Sparkles'
  }
};

/**
 * Filter and query helpers
 */
export function getPlantById(id: string): LibraryPlant | undefined {
  return PLANT_LIBRARY.find((p) => p.id === id);
}

export function getPlantsByCategory(category: PlantCategory): LibraryPlant[] {
  return PLANT_LIBRARY.filter((p) => p.category === category);
}

export function searchPlants(query: string, lang: 'en' | 'ta' = 'en'): LibraryPlant[] {
  const q = query.trim().toLowerCase();
  if (!q) return PLANT_LIBRARY;

  return PLANT_LIBRARY.filter((p) => {
    return (
      p.name.toLowerCase().includes(q) ||
      (p.nameTa && p.nameTa.toLowerCase().includes(q)) ||
      (p.scientificName && p.scientificName.toLowerCase().includes(q)) ||
      (p.commonName && p.commonName.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q) ||
      (p.categoryTa && p.categoryTa.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.descriptionTa && p.descriptionTa.toLowerCase().includes(q))
    );
  });
}

export function filterPlants(options: {
  category?: PlantCategory;
  sunlight?: SunlightType;
  petToxicity?: PetToxicity;
  difficulty?: 'Easy' | 'Moderate' | 'Difficult';
  isLowWater?: boolean;
  isBeginnerFriendly?: boolean;
}): LibraryPlant[] {
  return PLANT_LIBRARY.filter((p) => {
    if (options.category && p.category !== options.category) return false;
    if (options.sunlight && p.sunlight !== options.sunlight) return false;
    if (options.petToxicity && p.petToxicity !== options.petToxicity) return false;
    if (options.difficulty && p.difficulty !== options.difficulty) return false;
    if (options.isLowWater !== undefined && p.isLowWater !== options.isLowWater) return false;
    if (options.isBeginnerFriendly !== undefined && p.isBeginnerFriendly !== options.isBeginnerFriendly) return false;
    return true;
  });
}
