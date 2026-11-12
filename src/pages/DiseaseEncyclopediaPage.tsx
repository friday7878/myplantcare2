import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ShieldAlert,
  Bug,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Leaf,
  Droplets,
  Wind,
  FlaskConical,
  BookOpen,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  X,
  Printer,
  Copy,
  Info,
  ThermometerSnowflake,
  RefreshCw,
  Stethoscope,
  Volume2,
  Flame,
  Activity,
  Layers
} from 'lucide-react';
import { Language } from '../types';
import PlantyMascot from '../components/PlantyMascot';
import { DISEASES_DATABASE_100, ClinicalDiseaseItem } from '../data/diseasesDatabase100';


export interface PlantDisease {
  id: string;
  name: string;
  nameTa: string;
  scientificName: string;
  category: 'Fungal' | 'Bacterial' | 'Viral' | 'Oomycete / Water Mold' | 'Physiological';
  severity: 'Critical' | 'High' | 'Moderate';
  imageUrl: string;
  shortDescription: string;
  shortDescriptionTa: string;
  affectedPlants: string[];
  favorableConditions: string;
  favorableConditionsTa: string;
  symptoms: {
    early: string[];
    advanced: string[];
    affectedParts: ('Leaves' | 'Roots' | 'Stems' | 'Fruits / Blooms')[];
  };
  symptomsTa: {
    early: string[];
    advanced: string[];
  };
  causes: string[];
  causesTa: string[];
  organicTreatments: {
    title: string;
    titleTa: string;
    recipe: string;
    recipeTa: string;
    frequency: string;
    instructions: string;
    instructionsTa: string;
  }[];
  prevention: string[];
  preventionTa: string[];
  plantyDoctorTip: string;
  plantyDoctorTipTa: string;
}

export const PLANT_DISEASES_DATABASE: PlantDisease[] = [
  {
    id: 'root-rot',
    name: 'Root Rot',
    nameTa: 'வேரழுகல் நோய்',
    scientificName: 'Pythium, Phytophthora & Fusarium spp.',
    category: 'Oomycete / Water Mold',
    severity: 'Critical',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Decay of plant roots caused by lingering stagnant water and oxygen-depleted soil pathogens.',
    shortDescriptionTa: 'தேங்கி நிற்கும் நீர் மற்றும் ஆக்சிஜன் பற்றாக்குறையால் வேர்கள் அழுகி நாசமாகும் மிக ஆபத்தான நோய்.',
    affectedPlants: ['Monstera', 'Snake Plant', 'Money Plant', 'Peace Lily', 'Tomato', 'Chilli', 'Succulents'],
    favorableConditions: 'Waterlogged soggy potting mix, pots without drainage holes, cold humid soil (<20°C).',
    favorableConditionsTa: 'வடிகால் துளை இல்லாத தொட்டிகள், அதிகப்படியான நீர்ப்பாசனம் மற்றும் ஈரமான குளிர்ந்த மண்.',
    symptoms: {
      early: [
        'Leaves turn pale yellow and look limp despite wet soil',
        'Stunted growth and unexpected leaf drop',
        'Soil surface has a musty, sour marshland odor'
      ],
      advanced: [
        'Roots turn brown, mushy, and slough off like wet threads instead of firm white roots',
        'Stem base becomes soft, blackened, and collapses',
        'Complete wilting and irreversible structural failure'
      ],
      affectedParts: ['Roots', 'Stems', 'Leaves']
    },
    symptomsTa: {
      early: [
        'மண் ஈரமாக இருந்தும் இலைகள் வாடி மஞ்சள் நிறமாதல்',
        'செடியின் வளர்ச்சி திடீரென நின்றுபோதல்',
        'மண்ணிலிருந்து அழுகிய துர்நாற்றம் வீசுதல்'
      ],
      advanced: [
        'வேர்கள் கறுத்து, அழுகி தொட்டால் கூழாக உதிர்தல்',
        'தண்டின் அடிப்பகுதி கருப்பாகி மென்மையாகி உடைதல்',
        'செடி முழுமையாக சுருண்டு இறந்துபோதல்'
      ]
    },
    causes: [
      'Chronic overwatering without letting soil dry between waterings',
      'Heavy, clay-dense soil that suffocates root respiration',
      'Pots with blocked or absent bottom drainage holes',
      'Using contaminated garden soil without sterilizing'
    ],
    causesTa: [
      'மண் உலர்வதற்கு முன்பே மீண்டும் மீண்டும் தண்ணீர் ஊற்றுதல்',
      'வடிகால் வசதி இல்லாத கனமான களிமண் பயன்பாடு',
      'தொட்டியில் துளைகள் அடைபட்டு தண்ணீர் தேங்குதல்',
      'தொற்றுள்ள பழைய மண்ணை மறுபயன்பாடு செய்தல்'
    ],
    organicTreatments: [
      {
        title: '3% Hydrogen Peroxide Root Oxygenation Bath',
        titleTa: '3% ஹைட்ரஜன் பெராக்சைடு வேர் குளியல்',
        recipe: '1 tbsp (15ml) of 3% hydrogen peroxide per 1 cup (250ml) clean water.',
        recipeTa: '1 கப் தண்ணீருக்கு 1 தேக்கரண்டி (15 மிலி) 3% ஹைட்ரஜன் பெராக்சைடு.',
        frequency: 'One-time drench during repotting.',
        instructions: 'Unpot plant, gently rinse off infected soggy soil. Snip away all mushy brown roots with sterilized shears. Dunk healthy white root remnants in the peroxide bath for 2 minutes to kill anaerobic pathogens, then dust with cinnamon powder.',
        instructionsTa: 'செடியை தொட்டியிலிருந்து எடுத்து அழுகிய வேர்களை கத்தரித்துவிட்டு, இக்கரைசலில் வேர்களை 2 நிமிடம் நனைத்து புதிய வடிகால் மண்ணில் நடவும்.'
      },
      {
        title: 'Trichoderma viride Bio-Fungicide Inoculation',
        titleTa: 'டிரைக்கோடெர்மா விரிடி உயிர் பூஞ்சாண உரம்',
        recipe: '10g Trichoderma viride powder mixed into 1kg organic compost or 5g per liter water.',
        recipeTa: '10 கிராம் டிரைக்கோடெர்மா பொடியை 1 கிலோ மண்புழு உரத்துடன் கலக்கவும்.',
        frequency: 'Apply once every 30 days.',
        instructions: 'Mix into the fresh well-draining soil mix (potting soil + perlite + cocopeat 1:1:1). Trichoderma acts as a beneficial predatory fungus that colonizes roots and eliminates Pythium and Phytophthora pathogens.',
        instructionsTa: 'புதிய மண் கலவையில் கலந்து வைக்கவும். இது தீமை செய்யும் வேரழுகல் பூஞ்சைகளை இயற்கையாக அழித்து வேர்களை பாதுகாக்கும்.'
      },
      {
        title: 'Cinnamon Antifungal Root Dusting',
        titleTa: 'இலவங்கப்பட்டை பொடி கிருமிநாசினி',
        recipe: '100% pure organic ground Ceylon cinnamon powder.',
        recipeTa: 'சுத்தமான இலவங்கப்பட்டை தூள்.',
        frequency: 'Apply immediately upon pruning damaged roots.',
        instructions: 'Generously dust the freshly cut root ends with dry cinnamon powder before repotting into dry-to-moist aerated soil. Cinnamon contains natural cinnamaldehyde which seals wounds and inhibits fungal rot.',
        instructionsTa: 'கத்தரித்த வேர் முனைகளில் இலவங்கப்பட்டை தூளை தூவி நடவும். இது காயங்களை ஆற்றி பூஞ்சை தாக்குதலை தடுக்கும்.'
      }
    ],
    prevention: [
      'Always follow the "finger knuckle test": only water when top 2 inches of soil feel completely dry',
      'Ensure every container has unobstructed drainage holes and use saucers only to catch runoff (empty saucers after 15 minutes)',
      'Add 30% perlite, pumice, or coarse river sand to heavy soil mixes to maximize air pore spaces',
      'Never allow plants to sit in stagnant standing water'
    ],
    preventionTa: [
      'மண்ணின் மேல் 2 அங்குலம் உலர்ந்த பின்னரே தண்ணீர் ஊற்றவும்',
      'அனைத்து தொட்டிகளிலும் நல்ல வடிகால் துளைகள் இருப்பதை உறுதி செய்யவும்',
      'மண்ணில் 30% பெர்லைட் அல்லது ஆற்று மணல் கலந்து காற்றோட்டத்தை அதிகரிக்கவும்',
      'தட்டுகளில் தேங்கும் உபரி நீரை 15 நிமிடங்களுக்குள் அகற்றிவிடவும்'
    ],
    plantyDoctorTip: 'Roots need oxygen just as much as water! If you catch root rot early, trimming mushy roots and switching to an airy chunky soil mix with perlite can bring your plant back to life within 2 weeks.',
    plantyDoctorTipTa: 'வேர்களுக்கு நீரைப்போலவே காற்றோட்டமும் அவசியம்! வேரழுகலை ஆரம்பத்திலேயே கண்டறிந்து, அழுகிய வேர்களை நீக்கி புதிய காற்றோட்டமான மண்ணில் நட்டால் 2 வாரத்தில் செடி பிழைத்துவிடும்.'
  },
  {
    id: 'powdery-mildew',
    name: 'Powdery Mildew',
    nameTa: 'சாம்பல் நோய் (மாவுப்பூஞ்சை)',
    scientificName: 'Erysiphales (Podosphaera & Golovinomyces spp.)',
    category: 'Fungal',
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Talcum-powder-like white or ash-grey fungal patches coating leaves, stems, and flower buds.',
    shortDescriptionTa: 'இலைகள் மற்றும் பூ மொட்டுகளின் மேல் வெள்ளை மாவு அல்லது சாம்பல் பூசியது போன்ற பூஞ்சை படலம்.',
    affectedPlants: ['Rose', 'Zinnia', 'Tomato', 'Cucumber', 'Pumpkin', 'Hibiscus', 'Grapes', 'Peas'],
    favorableConditions: 'Warm dry days (20-28°C) followed by high relative humidity at night; poor air circulation in dense foliage.',
    favorableConditionsTa: 'பகலில் மிதமான வெப்பம் மற்றும் இரவில் அதிக ஈரப்பதம்; செடிகளுக்கு இடையே போதிய காற்றோட்டம் இல்லாத நிலை.',
    symptoms: {
      early: [
        'Isolated small white circular powdery patches on top surface of older leaves',
        'Subtle leaf curling and puckering near affected spots'
      ],
      advanced: [
        'Entire leaf surfaces, stems, and un-opened buds become engulfed in dense white felt',
        'Leaves turn chlorotic yellow, become brittle and crisp, then drop prematurely',
        'Flowers fail to open or emerge distorted and scarred'
      ],
      affectedParts: ['Leaves', 'Stems', 'Fruits / Blooms']
    },
    symptomsTa: {
      early: [
        'இலைகளின் மேல் சிறிய வட்ட வடிவிலான வெள்ளை மாவு புள்ளிகள் தோன்றுதல்',
        'இலை விளிம்புகள் லேசாக சுருண்டு வளைதல்'
      ],
      advanced: [
        'இலைகள், தண்டுகள் முழுவதும் வெள்ளை மாவு படர்ந்து மூடுதல்',
        'இலைகள் மஞ்சள் நிறமாகி காய்ந்து உதிர்தல்',
        'பூ மொட்டுகள் விரியாமல் கருகிப் போதல்'
      ]
    },
    causes: [
      'High humidity microclimates trapped between overcrowded plants',
      'Shaded low-light spots with stagnant, motionless air',
      'Excess synthetic nitrogen fertilization causing weak, fleshy vulnerable leaf growth'
    ],
    causesTa: [
      'செடிகள் நெருக்கமாக நடப்பட்டு காற்று சுழற்சி தடைபடுதல்',
      'போதிய சூரிய வெளிச்சம் இல்லாத நிழலான ஈரப்பதம்',
      'அதிகப்படியான ரசாயன தழைச்சத்து (Nitrogen) உரமிடுதல்'
    ],
    organicTreatments: [
      {
        title: 'Baking Soda & Horticultural Oil Neutralizer',
        titleTa: 'பேக்கிங் சோடா பூஞ்சாண நாசினி',
        recipe: '1 tbsp (15g) baking soda + 1 tsp vegetable oil + 1/2 tsp mild liquid soap in 1 liter warm water.',
        recipeTa: '1 லிட்டர் வெதுவெதுப்பான நீரில் 1 தேக்கரண்டி பேக்கிங் சோடா + 1 தேக்கரண்டி சமையல் எண்ணெய் + சில துளி சோப்.',
        frequency: 'Spray every 5-7 days in early morning or late evening.',
        instructions: 'Shake well and spray thoroughly over both upper and lower leaf surfaces. The alkaline pH of sodium bicarbonate alters leaf surface chemistry, instantly destroying fungal spores without harming leaves.',
        instructionsTa: 'நன்கு குலுக்கி இலைகளின் இருபுறமும் தெளிக்கவும். காரத்தன்மை பூஞ்சை வித்துக்களை உடனே அழிக்கும்.'
      },
      {
        title: 'Diluted Fresh Cow Milk Bio-Fungicide',
        titleTa: 'இயற்கை பசும்பால் கிருமிநாசினி',
        recipe: '1 part fresh whole milk to 9 parts water (1:9 ratio).',
        recipeTa: '1 பங்கு பசும்பால் + 9 பங்கு தண்ணீர் (1:9 விகிதம்).',
        frequency: 'Spray once a week in bright morning sunlight.',
        instructions: 'When milk is exposed to natural sunlight, its proteins (lactoferrin) produce antiseptic free radicals that break down fungal mycelium naturally with zero leaf toxicity.',
        instructionsTa: 'காலையில் சூரிய ஒளி இருக்கும்போது தெளிக்கவும். பாலில் உள்ள புரதங்கள் சூரிய ஒளியில் இயங்கி பூஞ்சையை வேரறுக்கும்.'
      },
      {
        title: 'Neem Oil (5ml/L) Botanical Emulsion',
        titleTa: 'வேப்பெண்ணெய் கரைசல்',
        recipe: '5ml cold-pressed pure neem oil + 2ml liquid soap emulsifier per 1 liter water.',
        recipeTa: '1 லிட்டர் தண்ணீருக்கு 5 மிலி வேப்பெண்ணெய் + 2 மிலி காதி சோப் கரைசல்.',
        frequency: 'Apply every 7-10 days.',
        instructions: 'Neem oil coats fungal spores and disrupts their reproductive cycle while simultaneously deterring sucking pests.',
        instructionsTa: 'இலைகளின் அடி மற்றும் மேல்புறத்தில் மாலையில் தெளிக்கவும்.'
      }
    ],
    prevention: [
      'Prune center foliage and space plants at least 30-45cm apart to guarantee cross-ventilation',
      'Place plants where they receive at least 4-6 hours of direct morning sunlight',
      'Always water directly at the root zone; never wet the foliage in the late afternoon or night',
      'Prune and safely bag heavily infected leaves (never throw infected clippings into garden compost)'
    ],
    preventionTa: [
      'செடிகளுக்கிடையே போதுமான இடைவெளி விட்டு காற்றோட்டத்தை பராமரிக்கவும்',
      'தினமும் குறைந்தது 4-6 மணி நேர சூரிய ஒளி கிடைப்பதை உறுதி செய்யவும்',
      'தண்ணீரை இலைகளின் மேல் தெளிக்காமல் வேர்ப்பகுதியில் மட்டுமே ஊற்றவும்',
      'பாதிக்கப்பட்ட இலைகளை உடனே அப்புறப்படுத்தவும் (உரக்குழியில் போடாதீர்கள்)'
    ],
    plantyDoctorTip: 'Milk spray sounds unusual, but science proves it works as well as synthetic fungicides! Spraying 10% milk solution under morning sun keeps your roses and squash completely free of powdery mildew.',
    plantyDoctorTipTa: '10% பசும்பால் கரைசல் சூரிய ஒளியில் தெளிப்பது ரசாயன மருந்துகளை விட சிறந்தது! ரோஜா மற்றும் கொடி வகைகளில் சாம்பல் நோயை இயற்கையாகவே அகற்றிவிடும்.'
  },
  {
    id: 'early-blight',
    name: 'Early Blight',
    nameTa: 'இலைக்கருகல் நோய் (முன் பருவ கருகல்)',
    scientificName: 'Alternaria solani',
    category: 'Fungal',
    severity: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Destructive fungal target-spot lesions with concentric bullseye rings primarily attacking Solanaceae family plants.',
    shortDescriptionTa: 'இலைகளில் வட்ட வடிவ இலக்கு வளையங்கள் தோன்றி இலைகள் கருகி உதிரும் தீவிர பூஞ்சை நோய்.',
    affectedPlants: ['Tomato', 'Potato', 'Brinjal (Eggplant)', 'Chilli / Bell Pepper'],
    favorableConditions: 'Warm rainy periods (24-29°C), heavy dews, rain splashing soil onto lower foliage.',
    favorableConditionsTa: 'மழைக்காலம், அதிக ஈரப்பதம் மற்றும் மழைநீர் மண்ணில் பட்டு கீழ் இலைகளில் தெறிக்கும் சூழல்.',
    symptoms: {
      early: [
        'Small dark brown to black spots on the lowest, oldest leaves near the soil line',
        'Distinct concentric rings forming a "bullseye target" pattern within spots',
        'Yellow chlorotic halos surrounding the dark spots'
      ],
      advanced: [
        'Spots enlarge to 1-2cm and merge, causing entire lower leaves to brown, shrivel, and collapse',
        'Dark sunken leathery lesions on stems at the soil line (collar rot)',
        'Dark sunken concentric spots on fruit shoulders near the stem calyx'
      ],
      affectedParts: ['Leaves', 'Stems', 'Fruits / Blooms']
    },
    symptomsTa: {
      early: [
        'கீழ் இலைகளில் சிறிய கரும்பழுப்பு வட்ட புள்ளிகள் தோன்றுதல்',
        'புள்ளிகளில் வளைய வளையமான "இலக்கு பலகை" வடிவமைப்பு',
        'புள்ளிகளைச் சுற்றி மஞ்சள் வளையம் படர்தல்'
      ],
      advanced: [
        'புள்ளிகள் பெரிதாகி ஒன்றுசேர்ந்து கீழ் இலைகள் முழுமையாக கருகி தொங்குதல்',
        'தண்டுகளில் கருப்பான பள்ளங்கள் ஏற்பட்டு தண்டு உடைதல்',
        'காய்களின் காம்புப் பகுதியில் கரும்பழுப்பு நிற அழுகல் வளையங்கள் ஏற்படுதல்'
      ]
    },
    causes: [
      'Soil-borne Alternaria fungal spores overwintering in garden debris and soil',
      'Overhead watering splashing spore-laden soil particles up onto lower leaves',
      'Stressed or nutrient-depleted plants in poor soil'
    ],
    causesTa: [
      'மண்ணில் தங்கியுள்ள பூஞ்சை வித்துக்கள் மழைநீரால் இலைகளில் தெறித்தல்',
      'மேலிருந்து தண்ணீர் ஊற்றுவதால் கீழ் இலைகள் எப்போதும் ஈரமாக இருத்தல்',
      'மண்ணில் போதிய சத்து இல்லாததால் செடிகள் பலவீனமடைதல்'
    ],
    organicTreatments: [
      {
        title: 'Sour Buttermilk & Asafoetida Bio-Spray',
        titleTa: 'புளித்த மோர் மற்றும் பெருங்காய கரைசல்',
        recipe: '500ml well-fermented sour buttermilk + 5g asafoetida powder (பெருங்காயம்) in 5 liters water.',
        recipeTa: '5 லிட்டர் தண்ணீருக்கு 500 மிலி புளித்த மோர் + 5 கிராம் பெருங்காயத்தூள்.',
        frequency: 'Spray every 5 days during cloudy or rainy weather.',
        instructions: 'Fermented lactic acid bacteria outcompete Alternaria fungi while sulfur compounds in asafoetida provide powerful natural antifungal protection.',
        instructionsTa: '3 நாட்கள் புளிக்கவைத்த மோரில் பெருங்காயம் கலந்து இலைகளில் தெளிக்கவும். நன்மை செய்யும் லாக்டிக் பாக்டீரியா பூஞ்சையை கட்டுப்படுத்தும்.'
      },
      {
        title: 'Copper Octanoate / Bordeaux Botanical Mixture',
        titleTa: 'போர்டோ கலவை / காப்பர் கரைசல்',
        recipe: 'Certified organic copper soap fungicide (follow package label, typically 10ml/L).',
        recipeTa: 'இயற்கை சான்றளிக்கப்பட்ட காப்பர் பூஞ்சாண நாசினி.',
        frequency: 'Spray every 7-10 days after rain.',
        instructions: 'Coat both sides of leaves evenly. Copper ions penetrate fungal spore walls and denature fungal enzymes before they germinate.',
        instructionsTa: 'மழை பெய்த பின் இலைகளின் மேல் மற்றும் கீழ்ப்பகுதியில் தெளித்து பூஞ்சை வித்துக்களை அழிக்கவும்.'
      },
      {
        title: 'Bottom Leaf Pruning & Heavy Organic Mulch',
        titleTa: 'கீழ் இலைகளை நீக்குதல் மற்றும் வைக்கோல் மூடாக்கு',
        recipe: 'Clean dried sugarcane trash, straw, or wood chips.',
        recipeTa: 'காய்ந்த வைக்கோல் அல்லது காய்ந்த சருகுகள்.',
        frequency: 'Apply once at planting time.',
        instructions: 'Strip all tomato leaves within 10 inches of the ground. Spread a 2-3 inch thick layer of clean straw over the soil bed to create a physical barrier preventing rain from splashing soil spores onto leaves.',
        instructionsTa: 'மண்ணிலிருந்து 10 அங்குல உயரம் வரை உள்ள கீழ் இலைகளை வெட்டிவிட்டு, வைக்கோல் கொண்டு மூடாக்கு இடவும்.'
      }
    ],
    prevention: [
      'Strip off all bottom leaves touching the soil surface as the plant grows tall',
      'Lay a 3-inch layer of straw mulch under plants to eliminate rain-splash back',
      'Practice a strict 3-year crop rotation: never plant tomatoes, chillies, or brinjals in the same bed consecutively',
      'Always stake or trellis plants to keep vines off wet ground'
    ],
    preventionTa: [
      'தரை மட்டத்தில் உள்ள கீழ் இலைகளை வெட்டி அகற்றவும்',
      'மண் தெறிக்காமல் இருக்க செடியின் அடியில் வைக்கோல் மூடாக்கு போடவும்',
      'தக்காளி, கத்தரி, மிளகாய் பயிர்களை தொடர்ந்து ஒரே இடத்தில் பயிரிடாமல் பயிர் சுழற்சி செய்யவும்',
      'செடிகளை கொம்புகள் நட்டு நிமிர்த்தி கட்டவும்'
    ],
    plantyDoctorTip: 'Early blight always starts at the very bottom of the tomato vine! Pruning away the lowest 10-12 inches of foliage creates a splash-free buffer zone that saves your harvest.',
    plantyDoctorTipTa: 'இலைக்கருகல் எப்போதும் தக்காளியின் தரைமட்ட இலைகளிலேயே தொடங்கும்! கீழே உள்ள 10 அங்குல இலைகளை வெட்டி மூடாக்கு போட்டால் நோய் வருவதை 90% தடுத்துவிடலாம்.'
  },
  {
    id: 'bacterial-leaf-spot',
    name: 'Bacterial Leaf Spot',
    nameTa: 'பாக்டீரியா இலைப்புள்ளி நோய்',
    scientificName: 'Xanthomonas campestris & Pseudomonas spp.',
    category: 'Bacterial',
    severity: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Angular water-soaked necrotic lesions restricted by leaf veins, accompanied by yellow halos.',
    shortDescriptionTa: 'இலை நரம்புகளுக்குள் அடங்கிய நீர் கசிந்த கோண வடிவ புள்ளிகள் மற்றும் மஞ்சள் வளையம்.',
    affectedPlants: ['Chilli', 'Capsicum', 'Tomato', 'Cabbage', 'Cauliflower', 'Beans', 'Philodendron'],
    favorableConditions: 'High temperatures (25-32°C) coupled with high humidity, overhead irrigation, driving monsoon rains.',
    favorableConditionsTa: 'வெப்பம் மற்றும் கனமழை காலங்கள், இலைகள் மீது நீண்ட நேரம் தண்ணீர் தேங்கி நிற்கும் சூழல்.',
    symptoms: {
      early: [
        'Small, greasy water-soaked translucent pinhead spots on underside of leaves',
        'Spots turn dark purplish-brown with distinct angular edges bounded by leaf veins'
      ],
      advanced: [
        'Centers of spots dry out, crack, and fall out, giving leaves a "shot-hole" tattered appearance',
        'Severe defoliation leaving developing fruits exposed to sunscald',
        'Raised scabby blister spots on chilli peppers and green tomatoes'
      ],
      affectedParts: ['Leaves', 'Stems', 'Fruits / Blooms']
    },
    symptomsTa: {
      early: [
        'இலைகளின் அடியில் நீர் கசிந்தது போன்ற எண்ணெய் பசையுள்ள சிறு புள்ளிகள்',
        'புள்ளிகள் பழுப்பு நிறமாகி நரம்புகளால் தடுக்கப்பட்டு கோண வடிவமாக மாறுதல்'
      ],
      advanced: [
        'புள்ளிகளின் மையம் காய்ந்து ஓட்டைகள் விழுதல் (துப்பாக்கி குண்டு பட்டது போன்ற தோற்றம்)',
        'இலைகள் உதிர்ந்து காய்கள் சூரிய வெப்பத்தால் வெந்து போதல்',
        'மிளகாய் மற்றும் காய்களின் மேல் கரடுமுரடான கொப்புளங்கள் தோன்றுதல்'
      ]
    },
    causes: [
      'Bacterial pathogen entering leaf stomata and micro-wounds from wind, hail, or rough handling',
      'Water droplets splashing bacteria from plant to plant',
      'Using uncertified non-disease-free seeds'
    ],
    causesTa: [
      'இலைகளின் சுவாசிக்கும் துளைகள் மற்றும் சிறு கீறல்கள் வழியாக பாக்டீரியா புகுதல்',
      'மழைநீர் மற்றும் தெளிப்பு நீர்ப்பாசனத்தால் ஒரு செடியிலிருந்து அடுத்த செடிக்கு பரவுதல்',
      'நோய் தாக்கிய விதைகளை விதைத்தல்'
    ],
    organicTreatments: [
      {
        title: 'Pseudomonas fluorescens Bio-Control Spray',
        titleTa: 'சூடோமோனாஸ் புளோரசன்ஸ் உயிர் பாக்டீரியா கரைசல்',
        recipe: '10g Pseudomonas fluorescens powder + 1 liter water + 2 drops organic soap.',
        recipeTa: '1 லிட்டர் தண்ணீருக்கு 10 கிராம் சூடோமோனாஸ் பொடி.',
        frequency: 'Spray every 7 days at dusk.',
        instructions: 'Pseudomonas fluorescens is an antagonistic beneficial bacterium that produces natural phenazine antibiotics and siderophores, colonizing leaf surfaces and starving out Xanthomonas pathogens.',
        instructionsTa: 'மாலையில் இலைகளில் தெளிக்கவும். நன்மை செய்யும் சூடோமோனாஸ் பாக்டீரியா நோய் உண்டாக்கும் பாக்டீரியாவை அழிக்கும்.'
      },
      {
        title: 'Garlic & Chilli Antimicrobial Extract',
        titleTa: 'பூண்டு - பச்சை மிளகாய் இயற்கை பூச்சிக்கொல்லி',
        recipe: '50g crushed garlic cloves + 25g hot chillies steeped in 1 liter warm water for 24 hours, then strained.',
        recipeTa: '50 கிராம் பூண்டு + 25 கிராம் மிளகாய் அரைத்து 1 லிட்டர் நீரில் 24 மணி நேரம் ஊறவைத்து வடிகட்டவும்.',
        frequency: 'Apply once every 7-10 days.',
        instructions: 'Allicin in garlic is one of nature’s most potent bactericides. Dilute 1:5 with water before spraying.',
        instructionsTa: 'பூண்டில் உள்ள அல்லிசின் பாக்டீரியா கிருமிகளை அழிக்கும் சிறந்த இயற்கை கிருமிநாசினி ஆகும்.'
      },
      {
        title: 'Organic Copper Sulfate Barrier',
        titleTa: 'காப்பர் சல்பேட் பாதுகாப்பு கரைசல்',
        recipe: 'Liquid copper bactericide per manufacturer guidelines.',
        recipeTa: 'அங்கீகரிக்கப்பட்ட காப்பர் கரைசல்.',
        frequency: 'Spray before upcoming rain cycles.',
        instructions: 'Provides a protective metallic surface barrier on leaves that ruptures bacterial cell membranes on contact.',
        instructionsTa: 'மழைக்கு முன் தெளித்து இலைகளைப் பாதுகாக்கவும்.'
      }
    ],
    prevention: [
      'Never work in the garden or touch foliage when leaves are wet with dew or rain',
      'Disinfect pruning shears with 70% rubbing alcohol between every plant cut',
      'Always use drip irrigation or water at the soil root zone',
      'Soak seeds in hot water (50°C for 25 minutes) before planting to kill internal bacterial seed-borne pathogens'
    ],
    preventionTa: [
      'இலைகள் ஈரமாக இருக்கும்போது செடிகளை தொடவோ, கவாத்து செய்யவோ கூடாது',
      'கவாத்து செய்யும் கத்திரிக்கோலை ஆல்கஹால் கொண்டு கிருமி நீக்கம் செய்யவும்',
      'சொட்டு நீர்ப்பாசனம் அல்லது வேர்ப்பகுதி நீர்ப்பாசனம் மட்டுமே செய்யவும்',
      'விதைகளை வெதுவெதுப்பான நீரில் (50°C) 25 நிமிடம் விதை நேர்த்தி செய்து நடவும்'
    ],
    plantyDoctorTip: 'Bacteria cannot fly or move on dry surfaces—they need water droplets to swim and spread! Keeping plant foliage 100% dry by watering only at ground level shuts down bacterial leaf spot completely.',
    plantyDoctorTipTa: 'பாக்டீரியாக்கள் உலர்ந்த காற்றில் பரவ முடியாது; நீர் துளிகள் மூலமே நீந்தி பரவும்! இலைகளில் தண்ணீர் படாமல் வேரில் மட்டும் ஊற்றினால் இந்நோயை முற்றிலும் தடுத்துவிடலாம்.'
  },
  {
    id: 'downy-mildew',
    name: 'Downy Mildew',
    nameTa: 'அடிச்சாம்பல் நோய்',
    scientificName: 'Pseudoperonospora & Peronospora spp.',
    category: 'Oomycete / Water Mold',
    severity: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1596720426673-e4e14290f0cc?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Angular yellow leaf patches with fluffy purple-grey felt mold on the underside of leaves.',
    shortDescriptionTa: 'இலை நரம்புகளுக்குள் அடங்கிய மஞ்சள் புள்ளிகள் மற்றும் இலையின் அடியில் ஊதா-சாம்பல் நிற பூஞ்சை பஞ்சு.',
    affectedPlants: ['Cucumber', 'Ridge Gourd', 'Bitter Gourd', 'Grapes', 'Spinach', 'Basil', 'Lettuce'],
    favorableConditions: 'Cool wet conditions (15-22°C), persistent fog, morning dew remaining on leaves for >6 hours.',
    favorableConditionsTa: 'குளிர்ந்த ஈரப்பதம் (15-22°C), அதிகாலை பனி மற்றும் இலைகளில் 6 மணி நேரத்திற்கு மேல் நீர் தங்குதல்.',
    symptoms: {
      early: [
        'Bright yellow angular mosaic patches on upper leaf surface strictly bounded by leaf veins',
        'Pale, chlorotic mottling resembling nutrient deficiencies'
      ],
      advanced: [
        'A lush carpet of purplish-grey fluffy mold sporulation blooming on the underside of yellow patches',
        'Affected leaf tissue turns necrotic brown and becomes crisp as paper',
        'Rapid collapse and dying back of entire climbing vines within days'
      ],
      affectedParts: ['Leaves', 'Stems']
    },
    symptomsTa: {
      early: [
        'இலை நரம்புகளால் பிரிக்கப்பட்ட மஞ்சள் நிற கட்ட புள்ளிகள் தோன்றுதல்',
        'சத்து குறைபாடு போன்ற தோற்றம் அளித்தல்'
      ],
      advanced: [
        'இலையின் அடிப்பகுதியில் ஊதா-சாம்பல் நிற பூஞ்சை பஞ்சு போல வளர்ந்து பரவுதல்',
        'இலைகள் காய்ந்து காகிதம் போல மொறுமொறுப்பாகி உதிர்தல்',
        'கொடி முழுவதும் சில நாட்களில் கருகி நாசமடைதல்'
      ]
    },
    causes: [
      'Water mold zoospores that actively swim in surface films of water on leaves',
      'Overhead sprinkling late in the day',
      'Vines sprawling on damp ground rather than climbing on trellises'
    ],
    causesTa: [
      'இலைகளில் உள்ள நீரில் நீந்தி பரவும் பூஞ்சை வித்துக்கள்',
      'மாலையில் இலைகளின் மேல் தெளிப்பான் மூலம் தண்ணீர் ஊற்றுதல்',
      'பந்தல் அமைக்காமல் தரையிலேயே கொடிகள் படர விடுதல்'
    ],
    organicTreatments: [
      {
        title: 'Potassium Bicarbonate Antifungal Drench',
        titleTa: 'பொட்டாசியம் பைகார்பனேட் பூஞ்சாண நாசினி',
        recipe: '1 tbsp potassium bicarbonate + 1 tsp castile soap per 1 liter water.',
        recipeTa: '1 லிட்டர் தண்ணீருக்கு 1 தேக்கரண்டி பொட்டாசியம் பைகார்பனேட் + 1 தேக்கரண்டி சோப்.',
        frequency: 'Spray every 5 days when conditions are wet.',
        instructions: 'Potassium bicarbonate is more effective against downy mildew than sodium bicarbonate and feeds beneficial potassium to the foliage while rupturing fungal sporophores.',
        instructionsTa: 'அடி இலைகளில் நன்கு படும்படி தெளிக்கவும். இது பூஞ்சை வித்துக்களை அழித்து செடிக்கு பொட்டாஷ் சத்தையும் தரும்.'
      },
      {
        title: 'Chili-Ginger-Garlic-Neem Quad Bio-Extract',
        titleTa: 'அக்னி அஸ்திரம் (மூலிகை பூச்சி-பூஞ்சை நாசினி)',
        recipe: 'Neem leaf decoction + ginger paste + crushed garlic boiled and diluted 1:20 in water.',
        recipeTa: 'வேப்பிலை, இஞ்சி, பூண்டு சேர்ந்த கஷாயத்தை 1:20 என்ற விகிதத்தில் நீரில் கலக்கவும்.',
        frequency: 'Spray weekly.',
        instructions: 'Potent organic botanical blend destroying both fungus spores and vector insects.',
        instructionsTa: 'வாரத்திற்கு ஒருமுறை மாலை நேரத்தில் இலைகளில் தெளிக்கவும்.'
      }
    ],
    prevention: [
      'Always erect sturdy vertical trellises or netting so vine foliage dries rapidly in the morning breeze',
      'Never water overhead; use drip lines or bottom basin soakers',
      'Increase plant spacing and orient rows toward prevailing morning winds',
      'Prune lower 18 inches of vine foliage once vines reach the trellis top'
    ],
    preventionTa: [
      'கொடிகளை தரையில் படரவிடாமல் பந்தல் அல்லது வேலி அமைத்து படரவிடவும்',
      'மேலிருந்து நீர் தெளிக்காமல் சொட்டுநீர் பாசனம் மட்டுமே பயன்படுத்தவும்',
      'காற்றோட்டம் கிடைக்க போதுமான இடைவெளி விடவும்',
      'கீழ் இலைகளை கவாத்து செய்து தூய்மையாக வைக்கவும்'
    ],
    plantyDoctorTip: 'Unlike powdery mildew which sits on top of leaves, downy mildew hides on the underside of leaves! When inspecting cucurbits and gourds, always flip the leaves over to look for that telltale purple-grey fuzz.',
    plantyDoctorTipTa: 'சாம்பல் நோய் இலை மேல் தோன்றும்; ஆனால் அடிச்சாம்பல் நோய் இலையின் அடிப்பகுதியில் மட்டுமே ஒளிந்திருக்கும்! இலைகளை திருப்பிப் பார்த்து ஆரம்பத்திலேயே கண்டறியுங்கள்.'
  },
  {
    id: 'anthracnose',
    name: 'Anthracnose',
    nameTa: 'ஆந்த்ராக்நோஸ் (பழ அழுகல் / கருகல் நோய்)',
    scientificName: 'Colletotrichum gloeosporioides & C. coccodes',
    category: 'Fungal',
    severity: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Sunken, circular water-soaked lesions developing gelatinous salmon-pink or orange spore masses on fruits, pods, and leaves.',
    shortDescriptionTa: 'பழங்கள் மற்றும் இலைகளில் வட்டமான பள்ளங்கள் தோன்றி, இளஞ்சிவப்பு நிற பூஞ்சை திரவம் வெளிப்படும் நோய்.',
    affectedPlants: ['Mango', 'Papaya', 'Tomato', 'Chilli', 'Beans', 'Avocado', 'Anthurium'],
    favorableConditions: 'Warm rainy tropical weather (25-30°C) with persistent wet periods lasting >12 hours.',
    favorableConditionsTa: 'வெப்பமான மழைக்காலம் (25-30°C), இலைகள் மற்றும் காய்கள் நீண்ட நேரம் ஈரமாக இருத்தல்.',
    symptoms: {
      early: [
        'Small dark water-soaked specks on ripening fruits or succulent leaves',
        'Tan to dark brown leaf spots that enlarge along leaf margins'
      ],
      advanced: [
        'Circular sunken craters that expand rapidly on fruits (anthracnose spots)',
        'Concentric rings of slimy salmon-pink, peach, or orange fungal spore masses oozing inside the crater during wet weather',
        'Blossom blight: flower panicles turn black and drop before setting fruit'
      ],
      affectedParts: ['Fruits / Blooms', 'Leaves', 'Stems']
    },
    symptomsTa: {
      early: [
        'பழுக்கும் பழங்கள் மற்றும் இலைகளில் சிறிய நீர் கசிந்த கரும்புள்ளிகள்',
        'இலை விளிம்புகளில் கரும்பழுப்பு நிற கருகல் படர்தல்'
      ],
      advanced: [
        'பழங்களில் வட்டமான ஆழமான பள்ளங்கள் உருவாகுதல்',
        'மழைக்காலத்தில் இப்பள்ளங்களில் இளஞ்சிவப்பு அல்லது ஆரஞ்சு நிற பூஞ்சை திரவம் வெளிவருதல்',
        'பூங்கொத்துகள் கருகி பிஞ்சு பிடிக்காமல் உதிர்ந்து போதல்'
      ]
    },
    causes: [
      'Colletotrichum spores surviving on infected plant debris, fallen twigs, and mummified fruits',
      'Raindrops splashing sticky spores onto blossoming flowers and ripening fruit skin',
      'Insect punctures or mechanical wounds allowing fungal penetration'
    ],
    causesTa: [
      'மண்ணில் கிடக்கும் காய்ந்த சருகுகள் மற்றும் அழுகிய பழங்களில் பூஞ்சை தங்குதல்',
      'மழைநீர் தெறித்து பூக்கள் மற்றும் பிஞ்சுகளில் பூஞ்சை பரவுதல்',
      'பூச்சிகள் கடித்த காயங்களின் வழியே பூஞ்சை புகுதல்'
    ],
    organicTreatments: [
      {
        title: 'Trichoderma viride + Pseudomonas Bio-Drench',
        titleTa: 'டிரைக்கோடெர்மா + சூடோமோனாஸ் கலவை',
        recipe: '5g Trichoderma + 5g Pseudomonas in 1 liter water.',
        recipeTa: '1 லிட்டர் தண்ணீருக்கு 5 கிராம் டிரைக்கோடெர்மா + 5 கிராம் சூடோமோனாஸ்.',
        frequency: 'Spray every 10 days during flowering and fruit development.',
        instructions: 'Spray flower panicles and young fruits thoroughly. These beneficial microbes colonize fruit epidermis, blocking Colletotrichum attachment.',
        instructionsTa: 'பூக்கும் தருணத்திலும் காய் பிடிக்கும் தருணத்திலும் இலைகள் மற்றும் காய்களில் தெளிக்கவும்.'
      },
      {
        title: 'Neem-Karanj Seed Oil Complex',
        titleTa: 'வேப்பெண்ணெய் - புங்கனெண்ணெய் கலவை',
        recipe: '3ml cold-pressed neem oil + 3ml pungam (karanj) oil + 2ml soap in 1L water.',
        recipeTa: '3 மிலி வேப்பெண்ணெய் + 3 மிலி புங்கனெண்ணெய் + 2 மிலி சோப் கரைசல் 1 லிட்டர் நீரில்.',
        frequency: 'Apply every 7 days.',
        instructions: 'Karanjin and Azadirachtin act synergistically to stop fungal hyphae penetration into fruit skin.',
        instructionsTa: 'வாரத்திற்கு ஒருமுறை மாலை வேளையில் தெளித்து பழங்களை பாதுகாக்கவும்.'
      }
    ],
    prevention: [
      'Rake up and burn or safely bag all fallen fruits, leaves, and twigs under fruit trees',
      'Prune mango, papaya, and citrus tree canopies annually to allow full sunlight into the center',
      'Harvest fruits as soon as they reach maturity; do not let overripe fruits rot on the vine or tree',
      'Bag developing fruits in breathable paper or mesh fruit bags for organic physical protection'
    ],
    preventionTa: [
      'மரங்களின் அடியில் விழும் அழுகிய பழங்கள், காய்ந்த கிளைகளை உடனே அகற்றி எரிக்கவும்',
      'மரத்தின் மையப்பகுதியில் சூரிய ஒளி படும்படி கிளைகளை கவாத்து செய்யவும்',
      'பழங்கள் பழுத்தவுடன் தாமதிக்காமல் பறித்துவிடவும்',
      'காய்களை இயற்கை காகித பைகள் கொண்டு மூடி பாதுகாக்கவும்'
    ],
    plantyDoctorTip: 'Bagging individual fruits with lightweight cotton or paper sacks when they are walnut-sized is an ancient organic trick that 100% prevents anthracnose without a single drop of spray!',
    plantyDoctorTipTa: 'காய்கள் சிறு உருண்டையாக இருக்கும்போதே காகித பை அல்லது துணி பை கொண்டு கட்டிவிட்டால், ஆந்த்ராக்நோஸ் பழ அழுகல் வராமல் 100% இயற்கை முறையில் பழங்களை அறுவடை செய்யலாம்!'
  },
  {
    id: 'black-spot-rose',
    name: 'Black Spot of Rose',
    nameTa: 'ரோஜா கருப்பு புள்ளி நோய்',
    scientificName: 'Diplocarpon rosae',
    category: 'Fungal',
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Circular black spots with feathery fringed margins on rose leaves followed by widespread leaf yellowing and defoliation.',
    shortDescriptionTa: 'ரோஜா இலைகளில் சிறகு போன்ற விளிம்புகளுடன் கூடிய கருப்பு புள்ளிகள் தோன்றி இலைகள் மஞ்சள் நிறமாகி உதிர்தல்.',
    affectedPlants: ['Rose (all varieties, especially Hybrid Teas)', 'Miniature Roses'],
    favorableConditions: 'Wet leaf surfaces for >7 hours, temperatures between 18-24°C, rainy overcast weeks.',
    favorableConditionsTa: 'இலைகளில் 7 மணி நேரத்திற்கு மேல் நீர் தங்குதல், 18-24°C வெப்பநிலை மற்றும் தொடர் மழைக்காலம்.',
    symptoms: {
      early: [
        'Distinct circular black spots (2-12mm) appearing on upper side of lower rose leaves',
        'Edges of the black spots have a characteristic feathery, fringed border'
      ],
      advanced: [
        'Tissue surrounding the black spots turns bright butter-yellow',
        'Affected leaves drop off completely, leaving naked thorny stems',
        'Raised purple-red blisters on immature green rose canes'
      ],
      affectedParts: ['Leaves', 'Stems']
    },
    symptomsTa: {
      early: [
        'ரோஜா இலைகளின் மேல் பகுதியில் தனித்தனி கருப்பு வட்ட புள்ளிகள் தோன்றுதல்',
        'புள்ளிகளின் விளிம்புகள் சிறகு போன்ற நுண்ணிய வரிகளுடன் இருத்தல்'
      ],
      advanced: [
        'புள்ளிகளைச் சுற்றியுள்ள பகுதி அடர் மஞ்சள் நிறமாக மாறுதல்',
        'அனைத்து இலைகளும் உதிர்ந்து வெறும் முள் குச்சிகள் மட்டுமே மிஞ்சுதல்',
        'இளம் ரோஜா தண்டுகளில் ஊதா-சிவப்பு கொப்புளங்கள் தோன்றுதல்'
      ]
    },
    causes: [
      'Diplocarpon fungal spores splashed from fallen infected rose leaves onto new spring growth',
      'Watering roses with overhead hoses late in the day',
      'Dense unpruned rose bushes that trap morning dew'
    ],
    causesTa: [
      'கீழே கிடக்கும் பாதிக்கப்பட்ட இலைகளிலிருந்து மழைநீரால் பூஞ்சை வித்துக்கள் புதிய தளிர்களில் தெறித்தல்',
      'மாலையில் ரோஜா செடிகளின் மேல் தண்ணீர் ஊற்றுதல்',
      'கவாத்து செய்யப்படாத அடர்ந்த ரோஜா புதர்கள்'
    ],
    organicTreatments: [
      {
        title: 'Horsetail / Equisetum Silica Decoction',
        titleTa: 'குதிரைவால் புல் (சிலிக்கா) கிருமிநாசினி',
        recipe: '50g dried horsetail herb boiled in 1 liter water for 30 minutes, diluted 1:5.',
        recipeTa: '50 கிராம் சிலிக்கா சத்து நிறைந்த மூலிகையை 1 லிட்டர் நீரில் காய்ச்சி 1:5 என நீர்க்கவும்.',
        frequency: 'Spray every 10 days.',
        instructions: 'Natural bio-available silica hardens rose epidermal cell walls, creating an impenetrable physical shield against Diplocarpon spore penetration.',
        instructionsTa: 'செடியின் இலைகளில் தெளிக்கவும். சிலிக்கா சத்து ரோஜா இலைகளை கடினமாக்கி பூஞ்சை புகாமல் தடுக்கும்.'
      },
      {
        title: 'Baking Soda & Neem Dual Shield',
        titleTa: 'பேக்கிங் சோடா + வேப்பெண்ணெய் இரட்டை பாதுகாப்பு',
        recipe: '1 tbsp baking soda + 5ml pure neem oil + 1/2 tsp dish soap in 1 liter water.',
        recipeTa: '1 லிட்டர் தண்ணீருக்கு 1 தேக்கரண்டி பேக்கிங் சோடா + 5 மிலி வேப்பெண்ணெய் + சில துளி சோப்.',
        frequency: 'Spray every 7 days during rainy spells.',
        instructions: 'Spray top and bottom of all leaves. Prevents existing spots from producing new reproductive spores.',
        instructionsTa: 'மழைக்காலத்தில் வாரம் ஒருமுறை தெளித்து புதிய புள்ளிகள் வராமல் தடுக்கவும்.'
      }
    ],
    prevention: [
      'Rake and safely discard all fallen rose leaves every autumn/winter (do not compost)',
      'Prune rose bushes in a vase or goblet shape with an open center to maximize air movement',
      'Always water at the base of the rose bush using a watering can or drip ring, never over the foliage',
      'Apply a 2-inch layer of hardwood bark mulch around the base of the bush'
    ],
    preventionTa: [
      'ரோஜா செடியின் கீழ் உதிர்ந்த இலைகளை தினமும் அப்புறப்படுத்தவும்',
      'செடியின் நடுப்பகுதி திறந்த கோப்பை வடிவில் இருக்கும்படி கவாத்து செய்யவும்',
      'இலைகளில் படாமல் வேரில் மட்டுமே தண்ணீர் ஊற்றவும்',
      'செடியைச் சுற்றி மரப்பட்டை அல்லது சருகு மூடாக்கு இடவும்'
    ],
    plantyDoctorTip: 'If your rose bush loses all its leaves to black spot, don’t panic! Cut off infected canes by one-third, spray neem-baking soda on the bare stems, and feed with banana peel tea and vermicompost—lush new clean leaves will sprout in 14 days.',
    plantyDoctorTipTa: 'ரோஜாவின் இலைகள் அனைத்தும் உதிர்ந்துவிட்டாலும் கவலைப்படாதீர்கள்! காய்ந்த கிளைகளை கவாத்து செய்து, வேப்பெண்ணெய் தெளித்து, மண்புழு உரம் இட்டால் 2 வாரத்தில் புதிய பளபளப்பான தளிர்கள் வந்துவிடும்.'
  },
  {
    id: 'damping-off',
    name: 'Damping-Off',
    nameTa: 'நாற்று அழுகல் / சாய்வு நோய்',
    scientificName: 'Rhizoctonia solani & Pythium ultimum',
    category: 'Oomycete / Water Mold',
    severity: 'Critical',
    imageUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Sudden water-soaked constriction and collapse of tender emergent seedlings right at the soil line.',
    shortDescriptionTa: 'முளைத்து வரும் இளம் நாற்றுகள் தரைமட்டத்தில் அழுகி திடீரென சரிந்து மடியும் கொடிய நோய்.',
    affectedPlants: ['Tomato Seedlings', 'Chilli Seedlings', 'Cabbage', 'Lettuce', 'Petunia', 'Zinnia', 'Marigold'],
    favorableConditions: 'Cold damp seed-starting trays, high humidity domes left on too long, stagnant air, unsterilized soil.',
    favorableConditionsTa: 'குளிர்ந்த ஈரமான விதை தட்டுகள், காற்று சுழற்சி இல்லாத மூடப்பட்ட சூழல், கிருமி நீக்கம் செய்யப்படாத பழைய மண்.',
    symptoms: {
      early: [
        'Seeds fail to emerge (pre-emergence damping off - rotting underground)',
        'Newly germinated seedlings show a pinched, water-soaked constriction at the stem base'
      ],
      advanced: [
        'Tender seedlings suddenly fall over flat as if chopped at the soil level, despite looking green above',
        'Delicate seedling roots turn completely black, waterlogged, and disintegrate',
        'A fine cobweb-like fungal thread spreads across the seed tray soil surface'
      ],
      affectedParts: ['Roots', 'Stems']
    },
    symptomsTa: {
      early: [
        'விதைத்த விதைகள் முளைக்காமல் மண்ணுக்குள்ளேயே அழுகிப் போதல்',
        'முளைத்த இளம் நாற்றின் தண்டு தரைமட்டத்தில் மெலிந்து நீர் கசிதல்'
      ],
      advanced: [
        'நாற்றுகள் பச்சை நிறமாக இருந்தும் தரைமட்டத்தில் உடைந்து பக்கவாட்டில் சாய்ந்து மடிதல்',
        'வேர்கள் கறுத்து முழுமையாக அழுகி காணாமல் போதல்',
        'விதை தட்டின் மேல் சிலந்தி வலை போன்ற வெள்ளை பூஞ்சை படர்தல்'
      ]
    },
    causes: [
      'Using garden soil directly in seedling trays without heat sterilization',
      'Overwatering seed trays and letting water puddle in the bottom flat',
      'Keeping clear humidity domes sealed after seeds have already sprouted',
      'Poor air movement and low light causing weak leggy seedlings'
    ],
    causesTa: [
      'விதை தட்டுகளில் கிருமி நீக்கம் செய்யாத தோட்டத்து மண்ணை நேரடியாக பயன்படுத்துதல்',
      'அளவுக்கு அதிகமாக தண்ணீர் ஊற்றி தட்டுகளில் தேங்க விடுதல்',
      'விதை முளைத்த பிறகும் மூடிகளை திறக்காமல் வைத்திருத்தல்',
      'போதிய வெளிச்சமும் காற்றோட்டமும் இல்லாத நிலை'
    ],
    organicTreatments: [
      {
        title: 'Chamomile Antifungal Tea Drench',
        titleTa: 'காமோமைல் மூலிகை தேநீர் கரைசல்',
        recipe: '2 chamomile tea bags brewed in 2 cups boiling water, cooled to room temperature.',
        recipeTa: '2 காமோமைல் டீ பைகளை 2 கப் கொதிக்கும் நீரில் ஊறவைத்து ஆறவைக்கவும்.',
        frequency: 'Use to mist seedling soil every 2 days.',
        instructions: 'Chamomile contains natural sulfur compounds and bisabolol, which acts as a gentle yet lethal fungicide against damping-off pathogens without burning tender baby seedlings.',
        instructionsTa: 'ஆறிய மூலிகை தேநீரை இளம் நாற்றுகளின் மேல் ஸ்ப்ரே செய்யவும். இது பிஞ்சு நாற்றுகளை எரிக்காமல் பூஞ்சையை அழிக்கும்.'
      },
      {
        title: 'Activated Charcoal & Cinnamon Soil Top-Dress',
        titleTa: 'கரித்தூள் மற்றும் இலவங்கப்பட்டை பாதுகாப்பு வளையம்',
        recipe: 'Finely ground horticultural activated charcoal + organic cinnamon powder 1:1.',
        recipeTa: 'மரக்கரி தூள் + இலவங்கப்பட்டை தூள் சம அளவு கலவை.',
        frequency: 'Dust surface of seedling tray immediately upon seed sowing.',
        instructions: 'Activated charcoal adsorbs pathogenic moisture and fungal spores while cinnamon inhibits mycelial expansion across the soil surface.',
        instructionsTa: 'விதை தட்டுகளின் மேல் லேசாக தூவிவிடவும். இது பூஞ்சை படர்வதை உடனடியாக தடுக்கும்.'
      }
    ],
    prevention: [
      'Always start seeds in sterile soilless seed mix (peat moss/cocopeat + fine vermiculite + perlite)',
      'Remove plastic humidity domes the very moment the first green sprout peeks through the soil',
      'Water seed trays strictly from the bottom by filling the reservoir tray for 15 minutes, then emptying excess',
      'Place a small oscillating mini-fan near seedling flats on low speed to maintain continuous air movement'
    ],
    preventionTa: [
      'விதைப்பதற்கு தூய தேங்காய்த் நார் (Cocopeat) மற்றும் பெர்லைட் கலவையை மட்டுமே பயன்படுத்தவும்',
      'முதல் விதை முளைத்த உடனே ஈரப்பத பிளாஸ்டிக் மூடிகளை அகற்றிவிடவும்',
      'மேலிருந்து தண்ணீர் ஊற்றாமல் தட்டின் அடியில் நீர் வைத்து உறிஞ்ச விடவும்',
      'நாற்றுகளுக்கு அருகில் ஒரு சிறிய மின்விசிறியை குறைந்த வேகத்தில் ஓடவிட்டு காற்றோட்டத்தை தரவும்'
    ],
    plantyDoctorTip: 'A gentle oscillating fan blowing on baby seedlings does two miraculous things: it dries the soil surface to completely prevent damping-off, and the gentle breeze stimulates the seedlings to grow 3x thicker, sturdier stems!',
    plantyDoctorTipTa: 'இளம் நாற்றுகள் மீது மெல்லிய காற்று படும்படி சிறிய மின்விசிறி வைத்தால், தரைமட்ட ஈரப்பதம் காய்ந்து நாற்று அழுகல் வராது; அத்துடன் தண்டு 3 மடங்கு தடிமனாக வலுவடையும்!'
  },
  {
    id: 'fusarium-wilt',
    name: 'Fusarium Wilt',
    nameTa: 'பூஞ்சை வாடல் நோய் (பியூசேரியம் வாடல்)',
    scientificName: 'Fusarium oxysporum',
    category: 'Fungal',
    severity: 'Critical',
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Lethal soil-borne vascular wilt clogging xylem water-conducting vessels, often causing one-sided yellowing.',
    shortDescriptionTa: 'செடியின் நீர் கடத்தும் நாளங்களை அடைத்து, ஒரு பக்க இலைகளை மட்டும் மஞ்சள் நிறமாக்கி வாடச் செய்யும் தீவிர நோய்.',
    affectedPlants: ['Tomato', 'Banana', 'Watermelon', 'Cotton', 'Ginger', 'Chilli', 'Carnation'],
    favorableConditions: 'High soil temperatures (27-32°C), acidic soils (pH 5.0-5.6), presence of root-knot nematodes.',
    favorableConditionsTa: 'வெப்பமான மண் (27-32°C), அமிலத்தன்மை உள்ள மண் மற்றும் வேர் முடிச்சு நூற்புழுக்கள் உள்ள சூழல்.',
    symptoms: {
      early: [
        'Characteristic "one-sided wilt": leaves on one side of a single branch or one side of the plant turn yellow while the other side stays green',
        'Foliage wilts during the sunny heat of midday and temporarily recovers during the night'
      ],
      advanced: [
        'Permanent wilting that fails to recover even after deep watering',
        'When the main lower stem is sliced lengthwise, internal vascular tissue shows a distinct rusty red-brown discoloration',
        'Complete death and desiccation of the entire plant'
      ],
      affectedParts: ['Stems', 'Leaves', 'Roots']
    },
    symptomsTa: {
      early: [
        'செடியின் ஒரு பக்கத்தில் உள்ள இலைகள் மட்டும் மஞ்சள் நிறமாகி வாடுதல் (ஒரு பக்க வாடல்)',
        'பகல் வெயிலில் வாடி இரவில் லேசாக புத்துயிர் பெறுவது போன்ற ஏமாற்று தோற்றம்'
      ],
      advanced: [
        'தண்ணீர் ஊற்றினாலும் மீளாத நிரந்தர வாடல்',
        'தண்டை நீளவாக்கில் வெட்டிப் பார்த்தால் உட்புற நீர் குழாய்கள் செம்பழுப்பு நிறமாக மாறியிருத்தல்',
        'முழு செடியும் காய்ந்து கருகி இறந்து போதல்'
      ]
    },
    causes: [
      'Fusarium chlamydospores that can survive dormant in garden soil for up to 10-15 years',
      'Root micro-wounds inflicted by parasitic root-knot nematodes or rough weeding tools',
      'Warm acidic soil with poor microbial diversity'
    ],
    causesTa: [
      'மண்ணில் 10-15 ஆண்டுகள் வரை அழியாமல் வாழும் பியூசேரியம் பூஞ்சை வித்துக்கள்',
      'வேர் நூற்புழுக்கள் வேர்களை கடித்து ஏற்படுத்தும் காயங்கள் வழியே பூஞ்சை உட்புகுதல்',
      'மண்ணில் பயனுள்ள நுண்ணுயிரிகள் குறைந்து போதல்'
    ],
    organicTreatments: [
      {
        title: 'Paecilomyces lilacinus & Trichoderma Soil Drench',
        titleTa: 'நூற்புழு மற்றும் பியூசேரியம் தடுப்பு உயிர் உரம்',
        recipe: '10g Paecilomyces + 10g Trichoderma harzianum per 5 liters water.',
        recipeTa: '5 லிட்டர் தண்ணீருக்கு 10 கிராம் பேசிலோமைசிஸ் + 10 கிராம் டிரைக்கோடெர்மா.',
        frequency: 'Apply to soil every 15 days.',
        instructions: 'Paecilomyces eliminates root-knot nematodes while Trichoderma acts as a parasitic hyper-parasite against Fusarium mycelium in the root zone.',
        instructionsTa: 'வேர்ப்பகுதியில் ஊற்றவும். இது நூற்புழுக்களையும் வாடல் பூஞ்சையையும் ஒரே நேரத்தில் கட்டுப்படுத்தும்.'
      },
      {
        title: 'Agricultural Lime Soil pH Correction',
        titleTa: 'விவசாய சுண்ணாம்பு (சுண்ணாம்புக்கல் தூள்)',
        recipe: '50-100g dolomite lime or slaked lime per square meter.',
        recipeTa: 'ஒரு சதுர மீட்டருக்கு 50-100 கிராம் விவசாய சுண்ணாம்பு.',
        frequency: 'Apply before planting.',
        instructions: 'Fusarium thrives in acidic soils. Raising soil pH to 6.5-7.0 significantly suppresses Fusarium spore germination.',
        instructionsTa: 'மண்ணின் அமிலத்தன்மையை குறைத்து காரத்தன்மையை சீராக்க நடுவதற்கு முன் மண்ணில் கலக்கவும்.'
      }
    ],
    prevention: [
      'Always plant certified Fusarium-resistant varieties (look for "F" or "FF" on seed packets, like Roma VF or Celebrity)',
      'Solarize garden soil in peak summer by wetting soil and covering tightly with clear plastic sheeting for 6 weeks',
      'Intercrop with African Marigolds (Tagetes erecta) whose roots exude alpha-terthienyl which kills nematode vectors',
      'Do not transplant Solanaceous crops into soil where Fusarium was previously diagnosed'
    ],
    preventionTa: [
      'நோய் எதிர்ப்பு திறன் கொண்ட "F" குறியீடு உள்ள வீரிய விதைகளை மட்டுமே தேர்வு செய்யவும்',
      'கோடை காலத்தில் மண்ணை நனைத்து பாலித்தீன் தாள் கொண்டு 6 வாரம் மூடி மண் சூரிய ஒளி நேர்த்தி செய்யவும்',
      'செடிகளுக்கு இடையே சாமந்திப் பூக்களை நடவும்; இதன் வேர்கள் நூற்புழுக்களை இயற்கையாக அழிக்கும்',
      'வாடல் நோய் தாக்கிய மண்ணில் மீண்டும் அதே பயிரை நடாதீர்கள்'
    ],
    plantyDoctorTip: 'To confirm Fusarium without a microscope, slice the bottom 2 inches of the stem open with a sharp knife! If you see chocolate-brown streaks running inside the stem, it’s Fusarium vascular wilt. Remove the plant immediately so it doesn’t spread to neighbors.',
    plantyDoctorTipTa: 'வாடல் நோயை உறுதிப்படுத்த தண்டின் அடிப்பகுதியை நீளவாக்கில் வெட்டிப் பாருங்கள்! உள்ளே சாக்லேட்-பழுப்பு நிற கோடுகள் தெரிந்தால் அது பியூசேரியம் வாடல். மற்ற செடிகளுக்கு பரவாமல் இருக்க அச்செடியை வேரோடு அகற்றிவிடுங்கள்.'
  },
  {
    id: 'blossom-end-rot',
    name: 'Blossom End Rot',
    nameTa: 'பூக்கண் அழுகல் நோய் (கால்சியம் குறைபாடு)',
    scientificName: 'Physiological Disorder (Calcium deficiency in fruit tissue)',
    category: 'Physiological',
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Dark, flattened, sunken leathery black rot developing on the blossom bottom end of ripening fruits.',
    shortDescriptionTa: 'காய்களின் அடிப்பகுதியில் (பூ இருந்த இடத்தில்) கரும்பழுப்பு நிற பள்ளம் தோன்றி தோல் போன்ற தடிமனான அழுகல் ஏற்படுதல்.',
    affectedPlants: ['Tomato', 'Bell Pepper / Capsicum', 'Chilli', 'Brinjal', 'Watermelon', 'Zucchini'],
    favorableConditions: 'Inconsistent watering (wet cycles alternating with dry baked soil), rapid vegetative growth spurts.',
    favorableConditionsTa: 'ஒழுங்கற்ற நீர்ப்பாசனம் (மண் மிக காய்ந்து பின் அளவுக்கு அதிகமாக நீர் ஊற்றுதல்) மற்றும் அதிக வெப்பம்.',
    symptoms: {
      early: [
        'Small, light tan or water-soaked circular bruise on the blossom end (the bottom of the fruit away from stem)',
        'The spot remains firm but slowly darkens and flattens'
      ],
      advanced: [
        'The bottom of the fruit collapses inward into a large, sunken, dry, leathery black crater',
        'Secondary black mold (Alternaria) colonizes the dead sunken tissue',
        'Fruit ripens prematurely on the vine while still small'
      ],
      affectedParts: ['Fruits / Blooms']
    },
    symptomsTa: {
      early: [
        'காயின் அடிப்பகுதியில் சிறிய வெளிர் பழுப்பு நிற நீர் கசிந்த புள்ளி தோன்றுதல்',
        'புள்ளி தட்டையாகி பள்ளமாக மாறத் தொடங்குதல்'
      ],
      advanced: [
        'காயின் கீழ் பகுதி உள்வாங்கி, தோல் போன்ற தடிமனான கருப்பு பள்ளமாக மாறுதல்',
        'காய்கள் சிறியதாக இருக்கும்போதே முன்கூட்டியே பழுத்து வீணாதல்'
      ]
    },
    causes: [
      'Inability of the plant to transport calcium to developing fruit tips due to erratic watering',
      'Allowing container potting soil to bake bone-dry between heavy flood waterings',
      'Excessive ammonium-based nitrogen fertilizer competing with calcium uptake',
      'Damaging shallow feeder roots during deep cultivation or hoeing'
    ],
    causesTa: [
      'முறையற்ற நீர்ப்பாசனத்தால் செடியால் கால்சியம் சத்தை காயின் முனை வரை கொண்டு செல்ல முடியாமை',
      'தொட்டி மண் மிகவும் காய்ந்து பின் ஒரேயடியாக அதிக நீர் ஊற்றுதல்',
      'அதிகப்படியான தழைச்சத்து உரமிடுவதால் கால்சியம் கிரகிப்பு தடைபடுதல்',
      'மண் கொத்தும்போது வேர்கள் அறுபட்டு போதல்'
    ],
    organicTreatments: [
      {
        title: 'Eggshell Tea & Calcium Acetate Solution',
        titleTa: 'முட்டை ஓடு மற்றும் இயற்கை கால்சியம் கரைசல்',
        recipe: 'Crush 10 clean dried eggshells into fine powder + 100ml vinegar (acetic acid) for 24 hours, dilute in 5L water.',
        recipeTa: '10 முட்டை ஓடுகளை தூளாக்கி 100 மிலி வினிகரில் 24 மணி நேரம் ஊறவைத்து 5 லிட்டர் நீரில் கலக்கவும்.',
        frequency: 'Drench root zone every 10 days.',
        instructions: 'Vinegar converts insoluble calcium carbonate from eggshells into water-soluble bio-available calcium acetate which plant roots absorb immediately.',
        instructionsTa: 'வினிகர் முட்டை ஓட்டில் உள்ள கால்சியத்தை கரையக்கூடிய சத்தாக மாற்றுகிறது; இதை வேரில் ஊற்றினால் செடி உடனே உறிஞ்சும்.'
      },
      {
        title: 'Deep Consistent Moisture Drip Schedule',
        titleTa: 'சீரான சொட்டு நீர் பாசன முறை',
        recipe: 'Deep soaking every morning to maintain soil like a wrung-out sponge.',
        recipeTa: 'மண் எப்போதும் மிதமான ஈரப்பதத்துடன் இருக்கும்படி காலையில் நீர் பாய்ச்சுதல்.',
        frequency: 'Daily in summer months.',
        instructions: 'Calcium moves through the plant exclusively via water transpiration stream. Constant gentle moisture ensures uninterrupted calcium flow to baby fruits.',
        instructionsTa: 'கால்சியம் சத்து நீர் ஓட்டம் வழியாக மட்டுமே காய்களுக்கு செல்லும்; எனவே மண்ணை எப்போதும் மிதமான ஈரப்பதத்துடன் வைக்கவும்.'
      }
    ],
    prevention: [
      'Never allow container soil to swing between bone dry and waterlogged; keep moisture consistent',
      'Spread a 3-inch layer of organic straw or mulch to prevent topsoil from drying out under midday heat',
      'Add 1 tablespoon of garden agricultural gypsum (calcium sulfate) or bone meal into planting holes',
      'Avoid high-nitrogen chemical fertilizers during fruit set; focus on organic seaweed and compost tea'
    ],
    preventionTa: [
      'மண்ணை மிக காயவிடாமல் எப்போதும் சீரான ஈரப்பதத்தில் பராமரிக்கவும்',
      'மண் காயாமல் இருக்க வைக்கோல் அல்லது காய்ந்த இலை மூடாக்கு இடவும்',
      'செடி நடும்போது குழியில் ஒரு தேக்கரண்டி ஜிப்சம் அல்லது எலும்புத்தூள் உரம் இடவும்',
      'காய் பிடிக்கும் தருணத்தில் ரசாயன உரங்களை தவிர்த்து கடல்பாசி உரம் பயன்படுத்தவும்'
    ],
    plantyDoctorTip: 'Blossom end rot is NOT a fungus or disease—it’s simply a thirst problem! When soil dries out, the plant stops sending calcium to the baby fruit tip. Keep soil evenly moist and apply eggshell tea to fix it forever.',
    plantyDoctorTipTa: 'பூக்கண் அழுகல் என்பது பூஞ்சை நோய் அல்ல—இது சீரற்ற தண்ணீர் மற்றும் கால்சியம் குறைபாடே! மண்ணை சீரான ஈரப்பதத்தில் வைத்து முட்டை ஓட்டு கரைசல் கொடுத்தால் அடுத்து வரும் காய்கள் அனைத்தும் ஆரோக்கியமாக இருக்கும்.'
  },
  {
    id: 'sooty-mold',
    name: 'Sooty Mold',
    nameTa: 'கரும்பூஞ்சை நோய் (இலைக்கரி நோய்)',
    scientificName: 'Capnodium, Scorias & Fumago spp.',
    category: 'Fungal',
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Superficial black charcoal-like soot coating leaves and stems, growing on honeydew excrement from sucking insects.',
    shortDescriptionTa: 'அசுவினி, மாவுப்பூச்சிகள் சுரக்கும் தேன் போன்ற திரவத்தின் மேல் வளரும் கரி போன்ற கருப்பு பூஞ்சை படலம்.',
    affectedPlants: ['Hibiscus', 'Mango', 'Citrus / Lemon', 'Curry Leaf', 'Guava', 'Gardenia', 'Pothos'],
    favorableConditions: 'Infestations of sap-sucking pests (aphids, mealybugs, whiteflies, scale insects) in warm weather.',
    favorableConditionsTa: 'மாவுப்பூச்சி, அசுவினி போன்ற சாறு உறிஞ்சும் பூச்சிகள் அதிகம் உள்ள வெப்பமான சூழல்.',
    symptoms: {
      early: [
        'Leaves feel sticky to the touch and appear glossy (honeydew deposition)',
        'Thin greyish-black dust settling over the sticky leaf surfaces'
      ],
      advanced: [
        'Thick, velvety black soot-like crust completely blanketing leaf surfaces, twigs, and fruit peel',
        'Photosynthesis is blocked by 70%, causing stunted growth, leaf chlorosis, and premature leaf drop',
        'Black crust can be physically peeled or wiped off with a damp cloth'
      ],
      affectedParts: ['Leaves', 'Stems', 'Fruits / Blooms']
    },
    symptomsTa: {
      early: [
        'இலைகள் தொடுவதற்கு பசை போல பிசுபிசுப்பாகவும் பளபளப்பாகவும் இருத்தல்',
        'இலைகளின் மேல் மெல்லிய சாம்பல்-கருப்பு தூசு படிதல்'
      ],
      advanced: [
        'இலைகள் மற்றும் தண்டுகள் முழுவதும் அடுப்புக்கரி பூசியது போல கருப்பாக மாறுதல்',
        'சூரிய ஒளி மறைக்கப்படுவதால் ஒளிச்சேர்க்கை தடைபட்டு செடியின் வளர்ச்சி குன்றுதல்',
        'ஈரமான துணியால் துடைத்தால் இப்பூஞ்சை தோல் போல உரிக்கப்படுதல்'
      ]
    },
    causes: [
      'Sap-sucking insects (mealybugs, aphids, whiteflies, scales) feeding on plant sap and excreting sugary honeydew',
      'Ants farming sucking insects and protecting them from beneficial predators',
      'Sooty mold does NOT infect the plant tissue itself—it lives entirely on the surface honeydew'
    ],
    causesTa: [
      'மாவுப்பூச்சி, அசுவினி போன்ற பூச்சிகள் இலைச்சாற்றை உறிஞ்சி இனிப்பான கழிவை இலைகளில் வெளிவிடுதல்',
      'எறும்புகள் இத்தேன் திரவத்திற்காக பூச்சிகளை பாதுகாத்து வளர்த்தல்',
      'இப்பூஞ்சை செடியை தாக்காது; இலை மீதுள்ள சர்க்கரை கழிவிலேயே வளர்கிறது'
    ],
    organicTreatments: [
      {
        title: 'Soap-Neem Wash to Eliminate Vector Pests',
        titleTa: 'சோப்-வேப்பெண்ணெய் பூச்சி ஒழிப்பு கரைசல்',
        recipe: '10ml pure neem oil + 5ml liquid castile soap in 1 liter warm water.',
        recipeTa: '1 லிட்டர் வெதுவெதுப்பான நீரில் 10 மிலி வேப்பெண்ணெய் + 5 மிலி சோப் கரைசல்.',
        frequency: 'Spray thoroughly every 4 days for 3 applications.',
        instructions: 'Spray with high pressure targeting under leaves, branch axils, and stem crevices to suffocate aphids and mealybugs. Once the pests stop producing honeydew, sooty mold starves and flakes away.',
        instructionsTa: 'அசுவினி மற்றும் மாவுப்பூச்சிகளை அழிக்க இலைகளின் அடியில் நன்கு பீய்ச்சி அடிக்கவும். பூச்சிகள் அழிந்தால் கரும்பூஞ்சை தானாக உதிர்ந்துவிடும்.'
      },
      {
        title: 'Lukewarm Water Sponge Wash',
        titleTa: 'வெதுவெதுப்பான நீர் துடைப்பு',
        recipe: 'Clean sponge or microfiber cloth dipped in warm soapy water.',
        recipeTa: 'வெதுவெதுப்பான சோப் நீரில் நனைத்த மென்மையான துணி.',
        frequency: 'As needed on broad-leafed plants.',
        instructions: 'Gently wipe the black crust off individual leaves to immediately restore sunlight penetration and photosynthetic energy.',
        instructionsTa: 'இலைகளின் மேல் உள்ள கருப்பு கரியை துணியால் மென்மையாக துடைத்து இலைகளுக்கு சூரிய வெளிச்சம் கிடைக்கச் செய்யவும்.'
      }
    ],
    prevention: [
      'Control ants around plants using sticky tree bands (Tanglefoot) or dusting diatomaceous earth around pot bases',
      'Inspect curry leaf, hibiscus, and citrus trees weekly for early signs of aphids and mealybugs',
      'Encourage beneficial ladybugs, lacewings, and hoverflies that devour honeydew-producing pests',
      'Prune touching branches to prevent ants from building bridges between pots'
    ],
    preventionTa: [
      'செடிகளில் எறும்புகள் ஏறாமல் தொட்டியின் அடியில் வேப்பெண்ணெய் அல்லது வசம்புத்தூள் போடவும்',
      'செம்பருத்தி, கறிவேப்பிலை, எலுமிச்சையில் மாவுப்பூச்சிகள் உள்ளதா என வாரம் ஒருமுறை கவனிக்கவும்',
      'அசுவினியை உண்ணும் நன்மை செய்யும் பொன்வண்டுகளை (Ladybugs) பாதுகாக்கவும'
    ],
    plantyDoctorTip: 'Sooty mold is a harmless visitor feeding on bug poop! Don’t waste expensive fungicides—spray neem soap to eliminate the aphids and mealybugs, and the black soot will dry up and peel off in the next rain shower.',
    plantyDoctorTipTa: 'கரும்பூஞ்சை செடியை உண்ணாது; பூச்சிகளின் சர்க்கரை கழிவிலேயே வாழ்கிறது! பூஞ்சாண மருந்து அடிக்காமல், வேப்பெண்ணெய் சோப் அடித்து அசுவினியை அழித்தாலே போதும், அடுத்த மழையில் கருப்பு படலம் உதிர்ந்துவிடும்.'
  },
  {
    id: 'mosaic-virus',
    name: 'Mosaic Virus (TMV / CMV)',
    nameTa: 'மொசைக் வைரஸ் நோய் (தேமல் நோய்)',
    scientificName: 'Tobacco Mosaic Virus & Cucumber Mosaic Virus',
    category: 'Viral',
    severity: 'Critical',
    imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Incurable viral infection creating mottled light and dark green tapestry patterns, leaf blistering, and distorted shoestring foliage.',
    shortDescriptionTa: 'இலைகளில் வெளிர் மற்றும் அடர் பச்சை நிற தேமல் புள்ளிகள் தோன்றி, இலைகள் சுருங்கி உருமாறும் கொடிய வைரஸ் நோய்.',
    affectedPlants: ['Tomato', 'Chilli', 'Cucumber', 'Pumpkin', 'Papaya', 'Hibiscus', 'Beans'],
    favorableConditions: 'High insect vector populations (aphids, thrips, whiteflies), handling infected plants with dirty hands/tools.',
    favorableConditionsTa: 'அசுவினி, இலைப்பேன், வெள்ளை ஈக்கள் அதிகம் உள்ள பருவம்; புகைப்பிடித்த பின் கைகளை கழுவாமல் செடிகளை தொடுதல்.',
    symptoms: {
      early: [
        'Mottled checkerboard mosaic pattern of alternating light green, yellow, and dark green on leaves',
        'Subtle leaf puckering and uneven leaf surface texture'
      ],
      advanced: [
        'Severe leaf curling, blistering, and "shoestring" distortion where leaf blades narrow into thin stringy ribs',
        'Severe plant stunting and bushy broom-like clustering of terminal shoots',
        'Fruits emerge small, hard, bumpy, and streaked with yellow/white rings'
      ],
      affectedParts: ['Leaves', 'Stems', 'Fruits / Blooms']
    },
    symptomsTa: {
      early: [
        'இலைகளில் வெளிர் பச்சை, மஞ்சள் மற்றும் அடர் பச்சை நிற தேமல் கட்டங்கள் தோன்றுதல்',
        'இலைகள் சமமில்லாமல் புடைத்து சுருங்குதல்'
      ],
      advanced: [
        'இலைகள் நூல் போல மிக மெலிந்து சுருண்டு போதல் (நூல் இலை நோய்)',
        'செடியின் வளர்ச்சி முற்றிலும் நின்று குட்டையாகி புதர் போல மாறுதல்',
        'காய்கள் கரடுமுரடாக, மஞ்சள் வரிகளுடன் சிறியதாக உருமாறுதல்'
      ]
    },
    causes: [
      'Transmission by sap-sucking insect vectors, primarily winged aphids and thrips',
      'Mechanical transmission through sap on gardener’s hands, pruning clippers, or clothing',
      'Tobacco Mosaic Virus (TMV) can be transmitted directly from smokers’ fingers who touch cigarettes containing tobacco'
    ],
    causesTa: [
      'அசுவினி, வெள்ளை ஈக்கள் மற்றும் இலைப்பேன்கள் ஒரு செடியிலிருந்து அடுத்த செடிக்கு வைரஸை பரப்புதல்',
      'கவாத்து கத்திரிக்கோல் அல்லது கைகள் மூலம் ஒரு செடியின் சாறு மற்றொன்றில் படுதல்',
      'புகைபிடிப்பவர்கள் கைகளை சோப்பால் கழுவாமல் செடிகளை தொடுதல்'
    ],
    organicTreatments: [
      {
        title: 'Strict Quarantine & Rogue Removal (No Chemical Cure)',
        titleTa: 'பாதிக்கப்பட்ட செடியை வேரோடு அகற்றுதல் (மருந்து இல்லை)',
        recipe: 'Immediate careful uprooting and bagging in plastic trash.',
        recipeTa: 'பாதிக்கப்பட்ட செடியை உடனே பிடுங்கி பாலித்தீன் பையில் போட்டு அப்புறப்படுத்தவும்.',
        frequency: 'Immediately upon diagnosis.',
        instructions: 'There is NO chemical or organic cure once a plant is infected with Mosaic Virus. The entire plant must be gently uprooted, bagged, and disposed of in municipal waste to protect healthy surrounding plants.',
        instructionsTa: 'வைரஸ் நோய்க்கு மருந்து இல்லை! மற்ற ஆரோக்கியமான செடிகளை காப்பாற்ற இந்நோய் தாக்கிய செடியை வேரோடு பிடுங்கி குப்பையில் எறியுங்கள் (உரமாக்காதீர்கள்).'
      },
      {
        title: 'Yellow Sticky Traps & Vector Suppression',
        titleTa: 'மஞ்சள் நிற ஒட்டும் பொறி & பூச்சி கட்டுப்பாடு',
        recipe: 'Bright yellow sticky boards hung at canopy height + 5ml neem oil spray.',
        recipeTa: 'மஞ்சள் வண்ண ஒட்டும் பொறி மற்றும் 5 மிலி வேப்பெண்ணெய் தெளிப்பு.',
        frequency: 'Maintain traps permanently; spray neem weekly.',
        instructions: 'Controlling aphids and whiteflies stops the spread of the virus to unaffected plants in your garden.',
        instructionsTa: 'மஞ்சள் அட்டைகள் பூச்சிகளை ஈர்த்து ஒட்டிக்கொள்ளும்; வேப்பெண்ணெய் தெளிப்பு பூச்சிகள் சாறு உறிஞ்சுவதை தடுக்கும்.'
      }
    ],
    prevention: [
      'Always wash hands thoroughly with soap and water after handling tobacco products before entering the garden',
      'Sanitize pruning tools with 20% non-fat dry milk solution or 70% alcohol between cuts (milk proteins neutralize virus particles)',
      'Install yellow and blue sticky traps to detect and trap vector aphids and thrips early',
      'Plant resistant hybrids (labeled with "TMV" or "CMV" resistance)'
    ],
    preventionTa: [
      'செடிகளை தொடும் முன் கைகளை சோப் போட்டு சுத்தமாக கழுவவும்',
      'கவாத்து கத்திரிக்கோலை பால் கரைசல் அல்லது ஆல்கஹால் கொண்டு சுத்தப்படுத்தவும்',
      'மஞ்சள் ஒட்டும் அட்டைகளை தொட்டிகளுக்கு அருகில் மாட்டி பூச்சிகளை கண்காணிக்கவும்',
      'நோய் எதிர்ப்பு திறன் கொண்ட வீரிய விதைகளை நடவும்'
    ],
    plantyDoctorTip: 'Did you know that non-fat dry milk deactivates Tobacco Mosaic Virus on garden clippers? Dipping your shears into a cup of milk between cuts completely stops the virus from spreading through plant sap!',
    plantyDoctorTipTa: 'கவாத்து கத்திரிக்கோலை பாலில் நனைத்தால் புகையிலை மொசைக் வைரஸ் கிருமிகள் உடனே செயலிழந்துவிடும் என்பது உங்களுக்குத் தெரியுமா? கவாத்து செய்யும்போது கத்திரியை பாலில் நனைத்து பயன்படுத்துங்கள்!'
  }
];

interface DiseaseEncyclopediaPageProps {
  language: Language;
  onNavigate?: (page: string) => void;
  onOpenDoctor?: () => void;
}

export const DiseaseEncyclopediaPage: React.FC<DiseaseEncyclopediaPageProps> = ({
  language,
  onNavigate,
  onOpenDoctor
}) => {
  const [activeCatalogMode, setActiveCatalogMode] = useState<'clinical100' | 'recipes'>('clinical100');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [selectedPlantFilter, setSelectedPlantFilter] = useState<string>('All');
  const [selectedDisease, setSelectedDisease] = useState<PlantDisease | null>(null);
  const [selectedClinical, setSelectedClinical] = useState<ClinicalDiseaseItem | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'symptoms' | 'causes' | 'treatments' | 'prevention'>('overview');
  const [clinicalTab, setClinicalTab] = useState<'symptoms' | 'causes' | 'remedies' | 'expert'>('symptoms');
  const [copiedRecipe, setCopiedRecipe] = useState<string | null>(null);
  const [showSprayCabinet, setShowSprayCabinet] = useState(false);

  // Categories list based on active mode
  const categories = useMemo(() => {
    return activeCatalogMode === 'clinical100'
      ? ['All', 'Fungal', 'Bacterial', 'Viral', 'Nutrient Deficiency', 'Environmental & Watering']
      : ['All', 'Fungal', 'Bacterial', 'Viral', 'Oomycete / Water Mold', 'Physiological'];
  }, [activeCatalogMode]);

  const severities = ['All', 'Critical', 'High', 'Moderate'];

  // Common affected plants for quick chips
  const popularPlants = ['All', 'Tomato', 'Rose', 'Money Plant', 'Chilli', 'Cucumber', 'Hibiscus', 'Mango'];

  const speakTerm = (text: string, lang = 'en-US') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  };

  // Filtered 100 Clinical Diseases
  const filteredClinicalDiseases = useMemo(() => {
    return DISEASES_DATABASE_100.filter((item) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.nameTa.toLowerCase().includes(q) ||
        item.scientificName.toLowerCase().includes(q) ||
        item.affectedPlants.some((p) => p.toLowerCase().includes(q)) ||
        item.symptoms.some((s) => s.toLowerCase().includes(q)) ||
        item.visualIndicators.some((v) => v.toLowerCase().includes(q)) ||
        item.treatmentOptions.some((t) => t.toLowerCase().includes(q));

      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSeverity = selectedSeverity === 'All' || item.severity === selectedSeverity;
      const matchesPlant =
        selectedPlantFilter === 'All' ||
        item.affectedPlants.some((p) => p.toLowerCase().includes(selectedPlantFilter.toLowerCase()));

      return matchesSearch && matchesCategory && matchesSeverity && matchesPlant;
    });
  }, [searchTerm, selectedCategory, selectedSeverity, selectedPlantFilter]);

  // Filtered deep recipe diseases
  const filteredDiseases = useMemo(() => {
    return PLANT_DISEASES_DATABASE.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.nameTa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.affectedPlants.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase())) ||
        d.symptoms.early.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
        d.symptoms.advanced.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || d.category === selectedCategory;
      const matchesSeverity = selectedSeverity === 'All' || d.severity === selectedSeverity;
      const matchesPlant = selectedPlantFilter === 'All' || d.affectedPlants.includes(selectedPlantFilter);

      return matchesSearch && matchesCategory && matchesSeverity && matchesPlant;
    });
  }, [searchTerm, selectedCategory, selectedSeverity, selectedPlantFilter]);

  const copyTreatment = (text: string, title: string) => {
    navigator.clipboard.writeText(`${title}:\n${text}`);
    setCopiedRecipe(title);
    setTimeout(() => setCopiedRecipe(null), 3000);
  };

  const getSeverityBadgeClass = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'High':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Fungal':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Bacterial':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Viral':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'Nutrient Deficiency':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Environmental & Watering':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'Oomycete / Water Mold':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      default:
        return 'bg-orange-100 text-orange-800 border-orange-200';
    }
  };


  return (
    <div className="space-y-8 pb-16">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#174D35] via-[#1c5a3e] to-[#2E8B57] text-white p-8 md:p-10 shadow-xl border border-[#A8DDB5]/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#A8DDB5]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-[#A8DDB5]">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-300" />
              {language === 'ta' ? 'தாவர நோய் களஞ்சியம்' : 'Botanical Disease Encyclopedia'}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-serif">
              {language === 'ta'
                ? 'தாவர நோய்கள் மற்றும் இயற்கை சிகிச்சை வழிகாட்டி'
                : 'Plant Disease Database & Organic Treatment Guide'}
            </h1>
            <p className="text-[#F5FAF5]/90 text-sm md:text-base leading-relaxed">
              {language === 'ta'
                ? 'வேரழுகல், சாம்பல் நோய், இலைக்கருகல் உள்ளிட்ட 10+ முக்கிய தாவர நோய்களுக்கான அறிகுறிகள், காரணங்கள் மற்றும் 100% ரசாயனமற்ற இயற்கை சிகிச்சை முறைகள்.'
                : 'Comprehensive clinical guide to identifying, preventing, and curing common plant pathogens with non-toxic, organic home remedies.'}
            </p>

            {/* Quick action buttons */}
            <div className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start">
              {onOpenDoctor && (
                <button
                  type="button"
                  onClick={onOpenDoctor}
                  className="px-4 py-2.5 rounded-xl bg-white text-[#174D35] font-bold text-sm shadow-md hover:bg-[#F5FAF5] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Stethoscope className="w-4 h-4 text-[#2E8B57]" />
                  {language === 'ta' ? 'AI டாக்டர் மூலம் பரிசோதி' : 'Diagnose with AI Doctor'}
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowSprayCabinet(!showSprayCabinet)}
                className="px-4 py-2.5 rounded-xl bg-[#2E8B57]/80 hover:bg-[#2E8B57] text-white font-semibold text-sm border border-white/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <FlaskConical className="w-4 h-4 text-[#A8DDB5]" />
                {language === 'ta' ? 'இயற்கை மருந்துக் கூடம்' : 'Organic Spray Cabinet'}
              </button>
            </div>
          </div>

          <div className="flex-shrink-0 flex flex-col items-center">
            <PlantyMascot
              mood="thinking"
              size="lg"
              interactive
              message={
                language === 'ta'
                  ? 'செடிகளை கவனியுங்கள்! ஆரம்பத்தில் கண்டறிந்தால் இயற்கை முறையிலேயே 100% குணப்படுத்திவிடலாம்!'
                  : 'Catch diseases early! Almost any plant pathogen can be cured organically with prompt diagnosis.'
              }
              showSpeechBubble
            />
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-white/5 rounded-2xl p-3 backdrop-blur-xs">
            <span className="text-2xl font-black text-[#A8DDB5]">100</span>
            <p className="text-xs text-white/75">{language === 'ta' ? 'மருத்துவ நோய் விவரங்கள்' : 'Clinical Pathologies'}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 backdrop-blur-xs">
            <span className="text-2xl font-black text-amber-300">25+</span>
            <p className="text-xs text-white/75">{language === 'ta' ? 'இயற்கை மருந்துகள்' : 'Organic Recipes'}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 backdrop-blur-xs">
            <span className="text-2xl font-black text-cyan-300">100%</span>
            <p className="text-xs text-white/75">{language === 'ta' ? 'ரசாயனமற்றது' : 'Non-Toxic & Chemical-Free'}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 backdrop-blur-xs">
            <span className="text-2xl font-black text-emerald-300">2 மொழிகள்</span>
            <p className="text-xs text-white/75">{language === 'ta' ? 'ஆங்கிலம் & தமிழ்' : 'English & Tamil'}</p>
          </div>
        </div>
      </div>

      {/* Catalog Mode Selector Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-2 rounded-2xl bg-white border border-stone-200 shadow-xs">
        <div className="flex items-center gap-2 p-1 rounded-xl bg-stone-100 flex-1">
          <button
            type="button"
            onClick={() => {
              setActiveCatalogMode('clinical100');
              setSelectedCategory('All');
            }}
            className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeCatalogMode === 'clinical100'
                ? 'bg-[#174D35] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
            <span>{language === 'ta' ? '100 நோய் களஞ்சியம்' : '100 Clinical Pathology & Disorders'}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 text-white font-mono">100</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveCatalogMode('recipes');
              setSelectedCategory('All');
            }}
            className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeCatalogMode === 'recipes'
                ? 'bg-[#174D35] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <FlaskConical className="w-4 h-4 text-[#A8DDB5]" />
            <span>{language === 'ta' ? 'ஆழமான சிகிச்சை செய்முறைகள்' : 'In-Depth Recipe Protocols'}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 text-white font-mono">10 Deep</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setShowSprayCabinet(!showSprayCabinet)}
          className="px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <FlaskConical className="w-4 h-4 text-[#2E8B57]" />
          <span>{showSprayCabinet ? (language === 'ta' ? 'மருந்துப் பெட்டியை மூடு' : 'Hide Spray Cabinet') : (language === 'ta' ? 'இயற்கை மருந்துக் கூடம்' : 'Organic Spray Cabinet')}</span>
        </button>
      </div>

      {/* Organic Spray Cabinet Drawer */}
      {showSprayCabinet && (
        <div className="p-6 rounded-3xl bg-white border border-[#A8DDB5] shadow-lg space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#174D35]/10 text-[#174D35]">
                <FlaskConical className="w-6 h-6 text-[#2E8B57]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#183B2A]">
                  {language === 'ta' ? 'தோட்டக்கலை இயற்கை கைமருந்துப் பெட்டகம்' : 'Staple Organic Botanical Spray Recipes'}
                </h3>
                <p className="text-xs text-stone-500">
                  {language === 'ta'
                    ? 'வீட்டிலேயே எளிதாக தயாரிக்கும் 4 முக்கிய இயற்கை பூஞ்சாண மற்றும் கிருமிநாசினிகள்'
                    : 'Four core homemade botanical remedies to treat 90% of garden diseases safely'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowSprayCabinet(false)}
              className="p-2 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#F5FAF5] border border-[#A8DDB5]/50 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-[#2E8B57] tracking-wider">Fungicide 1</span>
                <h4 className="font-bold text-[#183B2A] text-sm mt-1">Baking Soda & Oil Spray</h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  1 tbsp baking soda + 1 tsp vegetable oil + 1/2 tsp soap in 1L warm water. Destroys powdery mildew and black spot spores.
                </p>
              </div>
              <button
                type="button"
                onClick={() => copyTreatment('1 tbsp baking soda + 1 tsp vegetable oil + 1/2 tsp soap in 1L warm water', 'Baking Soda Spray')}
                className="mt-3 text-xs font-semibold text-[#174D35] hover:text-[#2E8B57] flex items-center gap-1 cursor-pointer"
              >
                {copiedRecipe === 'Baking Soda Spray' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedRecipe === 'Baking Soda Spray' ? 'Copied Recipe' : 'Copy Recipe'}
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#F5FAF5] border border-[#A8DDB5]/50 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-[#2E8B57] tracking-wider">Root Rescue</span>
                <h4 className="font-bold text-[#183B2A] text-sm mt-1">3% Hydrogen Peroxide Drench</h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  1 tbsp 3% hydrogen peroxide in 1 cup water. Instantly kills anaerobic root rot water molds and aerates root tissue.
                </p>
              </div>
              <button
                type="button"
                onClick={() => copyTreatment('1 tbsp 3% hydrogen peroxide in 1 cup water for root dip during repotting', 'Peroxide Root Bath')}
                className="mt-3 text-xs font-semibold text-[#174D35] hover:text-[#2E8B57] flex items-center gap-1 cursor-pointer"
              >
                {copiedRecipe === 'Peroxide Root Bath' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedRecipe === 'Peroxide Root Bath' ? 'Copied Recipe' : 'Copy Recipe'}
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#F5FAF5] border border-[#A8DDB5]/50 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-[#2E8B57] tracking-wider">Bio-Fungicide</span>
                <h4 className="font-bold text-[#183B2A] text-sm mt-1">Sour Buttermilk & Asafoetida</h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  100ml fermented sour buttermilk + 1g asafoetida in 1L water. Lactic acid bacteria outcompete blights and molds.
                </p>
              </div>
              <button
                type="button"
                onClick={() => copyTreatment('100ml sour buttermilk + 1g asafoetida powder in 1L water', 'Sour Buttermilk Spray')}
                className="mt-3 text-xs font-semibold text-[#174D35] hover:text-[#2E8B57] flex items-center gap-1 cursor-pointer"
              >
                {copiedRecipe === 'Sour Buttermilk Spray' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedRecipe === 'Sour Buttermilk Spray' ? 'Copied Recipe' : 'Copy Recipe'}
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#F5FAF5] border border-[#A8DDB5]/50 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-[#2E8B57] tracking-wider">Antiseptic</span>
                <h4 className="font-bold text-[#183B2A] text-sm mt-1">Pure Neem Oil Emulsion</h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  5ml cold-pressed neem oil + 2ml castile soap in 1L water. Eliminates sooty mold vectors, mildews, and leaf spot fungi.
                </p>
              </div>
              <button
                type="button"
                onClick={() => copyTreatment('5ml cold-pressed neem oil + 2ml liquid soap in 1L water', 'Neem Oil Emulsion')}
                className="mt-3 text-xs font-semibold text-[#174D35] hover:text-[#2E8B57] flex items-center gap-1 cursor-pointer"
              >
                {copiedRecipe === 'Neem Oil Emulsion' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedRecipe === 'Neem Oil Emulsion' ? 'Copied Recipe' : 'Copy Recipe'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="p-6 rounded-3xl bg-white border border-[#A8DDB5]/40 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'ta' ? 'நோய், அறிகுறி அல்லது செடியின் பெயர்...' : 'Search disease, symptom, or plant name...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#F5FAF5] border border-stone-200 focus:outline-none focus:border-[#2E8B57] text-sm text-[#183B2A]"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Severity filter dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-semibold text-stone-500 whitespace-nowrap">
              {language === 'ta' ? 'தீவிரம்:' : 'Severity:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {severities.map((sev) => (
                <button
                  key={sev}
                  type="button"
                  onClick={() => setSelectedSeverity(sev)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedSeverity === sev
                      ? 'bg-[#174D35] text-white shadow-xs'
                      : 'bg-[#F5FAF5] text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-semibold text-stone-500 whitespace-nowrap">
            {language === 'ta' ? 'பிரிவு:' : 'Category:'}
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#2E8B57] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Plant chips filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-stone-100">
          <span className="text-xs font-semibold text-stone-500 whitespace-nowrap">
            {language === 'ta' ? 'செடி வகை:' : 'Plant:'}
          </span>
          {popularPlants.map((plt) => (
            <button
              key={plt}
              type="button"
              onClick={() => setSelectedPlantFilter(plt)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedPlantFilter === plt
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 font-semibold'
                  : 'bg-[#F5FAF5] text-stone-600 hover:bg-stone-200'
              }`}
            >
              {plt === 'All' ? (language === 'ta' ? 'அனைத்து செடிகள்' : 'All Plants') : plt}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Active Filters */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-2">
        <span>
          {activeCatalogMode === 'clinical100' ? (
            language === 'ta'
              ? `${filteredClinicalDiseases.length} நோய்கள் கண்டறியப்பட்டன (100 மொத்தத்தில்)`
              : `Showing ${filteredClinicalDiseases.length} of ${DISEASES_DATABASE_100.length} clinical profiles`
          ) : (
            language === 'ta'
              ? `${filteredDiseases.length} செய்முறைகள் கண்டறியப்பட்டன`
              : `Showing ${filteredDiseases.length} of ${PLANT_DISEASES_DATABASE.length} recipe protocols`
          )}
        </span>
        {(searchTerm || selectedCategory !== 'All' || selectedSeverity !== 'All' || selectedPlantFilter !== 'All') && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedSeverity('All');
              setSelectedPlantFilter('All');
            }}
            className="text-[#2E8B57] hover:underline font-semibold cursor-pointer"
          >
            {language === 'ta' ? 'வடிகட்டிகளை மீட்டமை' : 'Reset all filters'}
          </button>
        )}
      </div>

      {/* Primary Grid Rendering: Either 100 Clinical Items or Recipe Items */}
      {activeCatalogMode === 'clinical100' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClinicalDiseases.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedClinical(item);
                setClinicalTab('symptoms');
              }}
              className="group rounded-3xl bg-white border border-[#A8DDB5]/40 hover:border-[#2E8B57] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer hover:-translate-y-1"
            >
              <div>
                {/* Image banner */}
                <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

                  {/* Badges on image */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border backdrop-blur-md ${getSeverityBadgeClass(item.severity)}`}>
                      {item.severity}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border backdrop-blur-md ${getCategoryBadgeClass(item.category)}`}>
                      {item.category}
                    </span>
                  </div>

                  {item.isolatePlant && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600/90 text-white backdrop-blur-xs">
                        {language === 'ta' ? 'தனிமைப்படுத்து' : 'Isolate Plant'}
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
                    <span className="font-mono italic opacity-90 truncate max-w-[200px]">
                      {item.scientificName}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakTerm(item.name);
                      }}
                      className="p-1 rounded-full bg-white/20 hover:bg-white/40 text-white"
                      title="Pronounce"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-[#183B2A] group-hover:text-[#2E8B57] transition-colors flex items-center justify-between">
                      <span>{item.name}</span>
                      <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
                    </h3>
                    <p className="text-xs font-semibold text-[#2E8B57]">{item.nameTa}</p>
                    <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                      {language === 'ta' ? item.shortDescriptionTa : item.shortDescription}
                    </p>
                  </div>

                  {/* Visual Indicators */}
                  <div className="p-3 rounded-2xl bg-[#F5FAF5] border border-[#A8DDB5]/40 space-y-1">
                    <span className="text-[11px] font-bold text-[#174D35] uppercase tracking-wider block">
                      {language === 'ta' ? 'கண்கண்ட அறிகுறிகள்:' : 'Visual Indicators:'}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {item.visualIndicators.map((vi, idx) => (
                        <span key={idx} className="text-[11px] text-stone-700 font-medium">
                          • {vi}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Affected Plants */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.affectedPlants.slice(0, 4).map((plt, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md text-[10px] bg-stone-100 text-stone-700 font-medium">
                        {plt}
                      </span>
                    ))}
                    {item.affectedPlants.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-stone-100 text-stone-500 font-medium">
                        +{item.affectedPlants.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="px-5 py-3 border-t border-stone-100 bg-[#F5FAF5] flex items-center justify-between text-xs">
                <span className="text-stone-500 text-[11px] flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-emerald-600" />
                  {item.recoveryTime}
                </span>
                <span className="font-semibold text-[#174D35] group-hover:text-[#2E8B57] flex items-center gap-1 text-[11px]">
                  {language === 'ta' ? 'விவரங்கள்' : 'View Protocol'}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Recipe Grid (10 deep recipes) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredDiseases.map((disease) => (
          <div
            key={disease.id}
            onClick={() => {
              setSelectedDisease(disease);
              setActiveTab('overview');
            }}
            className="group rounded-3xl bg-white border border-[#A8DDB5]/40 hover:border-[#2E8B57] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer hover:-translate-y-1"
          >
            <div>
              {/* Image banner */}
              <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                <img
                  src={disease.imageUrl}
                  alt={disease.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                {/* Badges on image */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border backdrop-blur-md ${getSeverityBadgeClass(disease.severity)}`}>
                    {disease.severity}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border backdrop-blur-md ${getCategoryBadgeClass(disease.category)}`}>
                    {disease.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-extrabold text-lg drop-shadow-sm font-serif">
                    {disease.name}
                  </h3>
                  <p className="text-xs text-[#A8DDB5] italic font-mono">
                    {disease.scientificName}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <p className="text-xs text-[#183B2A] line-clamp-2 leading-relaxed">
                  {language === 'ta' ? disease.shortDescriptionTa : disease.shortDescription}
                </p>

                {/* Affected Parts icons */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-semibold text-stone-500">
                    {language === 'ta' ? 'தாக்கும் உறுப்புகள்:' : 'Attacks:'}
                  </span>
                  {disease.symptoms.affectedParts.map((part) => (
                    <span
                      key={part}
                      className="px-2 py-0.5 rounded-md bg-[#F5FAF5] text-[#174D35] text-[10px] font-medium border border-[#A8DDB5]/40"
                    >
                      {part}
                    </span>
                  ))}
                </div>

                {/* Affected Plants preview */}
                <div className="pt-2 border-t border-stone-100 flex items-center gap-1 flex-wrap">
                  <span className="text-[11px] font-semibold text-stone-500">
                    {language === 'ta' ? 'பாதிக்கப்படும் செடிகள்:' : 'Common victims:'}
                  </span>
                  {disease.affectedPlants.slice(0, 3).map((plant) => (
                    <span
                      key={plant}
                      className="text-[11px] text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md"
                    >
                      {plant}
                    </span>
                  ))}
                  {disease.affectedPlants.length > 3 && (
                    <span className="text-[10px] text-stone-400 font-medium">
                      +{disease.affectedPlants.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Footer button */}
            <div className="px-5 py-3.5 bg-[#F5FAF5] border-t border-[#A8DDB5]/30 flex items-center justify-between text-xs font-bold text-[#174D35] group-hover:text-[#2E8B57]">
              <span>{language === 'ta' ? 'அறிகுறிகள் & சிகிச்சை முறை' : 'View Causes & Treatments'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
      )}

      {((activeCatalogMode === 'clinical100' && filteredClinicalDiseases.length === 0) ||
        (activeCatalogMode === 'recipes' && filteredDiseases.length === 0)) && (
        <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 space-y-4">
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-[#183B2A]">
            {language === 'ta' ? 'பொருந்தும் நோய்கள் எதுவும் கிடைக்கவில்லை' : 'No matching diseases found'}
          </h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto">
            {language === 'ta'
              ? 'வேறு பெயர்கள், தாவர வகை அல்லது அறிகுறிகளைத் தேடிப் பாருங்கள்.'
              : 'Try clearing your search query or adjusting your category and severity filters.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedSeverity('All');
              setSelectedPlantFilter('All');
            }}
            className="px-4 py-2 rounded-xl bg-[#174D35] text-white text-xs font-bold cursor-pointer"
          >
            {language === 'ta' ? 'அனைத்து நோய்களையும் காட்டு' : 'Clear Filters & Show All'}
          </button>
        </div>
      )}


      {/* Disease Inspector Deep-Dive Modal */}
      {selectedDisease && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#A8DDB5] relative flex flex-col my-auto">
            {/* Header banner */}
            <div className="relative h-48 md:h-56 w-full flex-shrink-0 overflow-hidden bg-[#174D35]">
              <img
                src={selectedDisease.imageUrl}
                alt={selectedDisease.name}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedDisease(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all cursor-pointer z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title & Taxonomy */}
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getSeverityBadgeClass(selectedDisease.severity)}`}>
                    {selectedDisease.severity} Severity
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getCategoryBadgeClass(selectedDisease.category)}`}>
                    {selectedDisease.category}
                  </span>
                  <span className="text-xs text-[#A8DDB5] bg-black/40 px-2 py-0.5 rounded-md font-mono">
                    {selectedDisease.scientificName}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold font-serif">
                  {selectedDisease.name}
                  {language === 'ta' && <span className="text-lg font-normal text-white/80 ml-2">({selectedDisease.nameTa})</span>}
                </h2>
              </div>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-stone-200 bg-[#F5FAF5] px-6 overflow-x-auto scrollbar-none flex-shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`py-3.5 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'border-[#2E8B57] text-[#174D35]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {language === 'ta' ? 'கண்ணோட்டம்' : 'Overview'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('symptoms')}
                className={`py-3.5 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'symptoms'
                    ? 'border-[#2E8B57] text-[#174D35]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {language === 'ta' ? 'அறிகுறிகள்' : 'Symptoms Checklist'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('causes')}
                className={`py-3.5 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'causes'
                    ? 'border-[#2E8B57] text-[#174D35]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {language === 'ta' ? 'காரணங்கள் & சூழல்' : 'Causes & Conditions'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('treatments')}
                className={`py-3.5 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'treatments'
                    ? 'border-[#2E8B57] text-[#174D35]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {language === 'ta' ? 'இயற்கை சிகிச்சைகள்' : 'Organic Treatments (Cures)'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('prevention')}
                className={`py-3.5 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'prevention'
                    ? 'border-[#2E8B57] text-[#174D35]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {language === 'ta' ? 'வருமுன் காக்கும் முறை' : 'Prevention Protocol'}
              </button>
            </div>

            {/* Modal Tab Content */}
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
              {/* Tab 1: Overview */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-stone-400 uppercase tracking-wider">
                      {language === 'ta' ? 'விளக்கம்' : 'Clinical Summary'}
                    </h4>
                    <p className="text-base text-[#183B2A] mt-1 leading-relaxed">
                      {language === 'ta' ? selectedDisease.shortDescriptionTa : selectedDisease.shortDescription}
                    </p>
                  </div>

                  {/* Vulnerable Plants Grid */}
                  <div className="p-4 rounded-2xl bg-[#F5FAF5] border border-[#A8DDB5]/40 space-y-2">
                    <h4 className="text-xs font-bold text-[#174D35] uppercase tracking-wider flex items-center gap-1.5">
                      <Leaf className="w-4 h-4 text-[#2E8B57]" />
                      {language === 'ta' ? 'பாதிக்கப்படும் முக்கிய செடிகள்' : 'Vulnerable Host Plants'}
                    </h4>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {selectedDisease.affectedPlants.map((plant) => (
                        <span
                          key={plant}
                          className="px-3 py-1 rounded-xl bg-white border border-[#A8DDB5] text-xs font-semibold text-[#183B2A] shadow-2xs"
                        >
                          {plant}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Climate triggers */}
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                    <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                      <ThermometerSnowflake className="w-4 h-4 text-amber-600" />
                      {language === 'ta' ? 'நோய் பரவ சாதகமான தட்பவெப்ப சூழல்' : 'Favorable Weather & Environmental Triggers'}
                    </h4>
                    <p className="text-sm text-amber-900 leading-relaxed">
                      {language === 'ta' ? selectedDisease.favorableConditionsTa : selectedDisease.favorableConditions}
                    </p>
                  </div>

                  {/* PLANTY Mascot Tip */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-[#174D35]/10 via-[#2E8B57]/10 to-transparent border border-[#2E8B57]/20 flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <PlantyMascot mood="speaking" size="sm" animate={false} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-[#174D35] uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#2E8B57]" />
                        PLANTY Doctor Advice
                      </h4>
                      <p className="text-sm text-[#183B2A] leading-relaxed italic">
                        "{language === 'ta' ? selectedDisease.plantyDoctorTipTa : selectedDisease.plantyDoctorTip}"
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Symptoms */}
              {activeTab === 'symptoms' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Early stage */}
                    <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-amber-500" />
                        <h4 className="font-bold text-amber-900 text-sm uppercase tracking-wider">
                          {language === 'ta' ? 'ஆரம்ப கால அறிகுறிகள்' : 'Early Stage Symptoms'}
                        </h4>
                      </div>
                      <ul className="space-y-2.5">
                        {selectedDisease.symptoms.early.map((sym, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-amber-950">
                            <span className="text-amber-600 font-bold">•</span>
                            <span>{language === 'ta' && selectedDisease.symptomsTa?.early?.[idx] ? selectedDisease.symptomsTa.early[idx] : sym}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Advanced stage */}
                    <div className="p-5 rounded-2xl bg-red-50/60 border border-red-200 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500" />
                        <h4 className="font-bold text-red-900 text-sm uppercase tracking-wider">
                          {language === 'ta' ? 'முற்றிய கால அறிகுறிகள்' : 'Advanced / Critical Symptoms'}
                        </h4>
                      </div>
                      <ul className="space-y-2.5">
                        {selectedDisease.symptoms.advanced.map((sym, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-red-950">
                            <span className="text-red-600 font-bold">•</span>
                            <span>{language === 'ta' && selectedDisease.symptomsTa?.advanced?.[idx] ? selectedDisease.symptomsTa.advanced[idx] : sym}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Affected plant anatomy */}
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                    <h5 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                      {language === 'ta' ? 'தாக்கப்படும் தாவர பாகங்கள்:' : 'Anatomical Parts Targeted:'}
                    </h5>
                    <div className="flex gap-2">
                      {selectedDisease.symptoms.affectedParts.map((part) => (
                        <span key={part} className="px-3 py-1 rounded-xl bg-white border border-stone-300 text-xs font-semibold text-[#183B2A]">
                          {part}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Causes */}
              {activeTab === 'causes' && (
                <div className="space-y-5">
                  <h4 className="text-sm font-bold text-[#174D35] uppercase tracking-wider">
                    {language === 'ta' ? 'நோய்க்கான முக்கிய காரணங்கள்' : 'Primary Pathogenic & Environmental Causes'}
                  </h4>
                  <div className="space-y-3">
                    {selectedDisease.causes.map((cause, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-[#F5FAF5] border border-[#A8DDB5]/50 flex items-start gap-3">
                        <div className="p-1.5 rounded-lg bg-[#174D35]/10 text-[#174D35] mt-0.5">
                          <AlertTriangle className="w-4 h-4 text-[#2E8B57]" />
                        </div>
                        <p className="text-sm text-[#183B2A] leading-relaxed">
                          {language === 'ta' && selectedDisease.causesTa?.[idx] ? selectedDisease.causesTa[idx] : cause}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 text-xs text-stone-600">
                    <span className="font-bold text-[#174D35] uppercase">Favorable Conditions Note:</span>
                    <p>{language === 'ta' ? selectedDisease.favorableConditionsTa : selectedDisease.favorableConditions}</p>
                  </div>
                </div>
              )}

              {/* Tab 4: Organic Treatments */}
              {activeTab === 'treatments' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#174D35] uppercase tracking-wider flex items-center gap-2">
                      <FlaskConical className="w-4 h-4 text-[#2E8B57]" />
                      {language === 'ta' ? '100% இயற்கை சிகிச்சை முறைகள்' : 'Step-by-Step Organic Recipes & Treatment Plans'}
                    </h4>
                    <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold border border-emerald-200">
                      Non-Toxic & Bee-Safe
                    </span>
                  </div>

                  <div className="space-y-4">
                    {selectedDisease.organicTreatments.map((treatment, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-white border-2 border-[#A8DDB5] shadow-xs space-y-3 hover:border-[#2E8B57] transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2E8B57]">
                              {language === 'ta' ? `சிகிச்சை முறை #${idx + 1}` : `Remedy #${idx + 1}`}
                            </span>
                            <h5 className="text-base font-extrabold text-[#183B2A]">
                              {language === 'ta' ? treatment.titleTa : treatment.title}
                            </h5>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyTreatment(`${treatment.recipe}\nFrequency: ${treatment.frequency}\nInstructions: ${treatment.instructions}`, treatment.title)}
                            className="p-2 rounded-xl bg-[#F5FAF5] hover:bg-[#A8DDB5]/30 text-[#174D35] transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                            title="Copy treatment recipe"
                          >
                            {copiedRecipe === treatment.title ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                            <span>{copiedRecipe === treatment.title ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>

                        {/* Recipe Box */}
                        <div className="p-3.5 rounded-xl bg-[#F5FAF5] border border-[#A8DDB5]/40 font-mono text-xs text-[#183B2A]">
                          <span className="font-bold text-[#174D35] uppercase not-mono block text-[10px] mb-1">
                            {language === 'ta' ? 'செய்முறை அளவு:' : 'Exact Formula / Recipe:'}
                          </span>
                          {language === 'ta' ? treatment.recipeTa : treatment.recipe}
                        </div>

                        {/* Frequency & instructions */}
                        <div className="space-y-1.5 text-xs md:text-sm text-stone-700 leading-relaxed">
                          <p>
                            <strong className="text-[#174D35]">{language === 'ta' ? 'பயன்படுத்தும் இடைவெளி:' : 'Frequency:'}</strong>{' '}
                            {treatment.frequency}
                          </p>
                          <p>
                            <strong className="text-[#174D35]">{language === 'ta' ? 'விளக்கம்:' : 'Application Instructions:'}</strong>{' '}
                            {language === 'ta' ? treatment.instructionsTa : treatment.instructions}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 5: Prevention */}
              {activeTab === 'prevention' && (
                <div className="space-y-5">
                  <h4 className="text-sm font-bold text-[#174D35] uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2E8B57]" />
                    {language === 'ta' ? 'நீண்ட கால நோய் தடுப்பு நடைமுறைகள்' : 'Proactive Cultural & Preventive Habits'}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedDisease.prevention.map((prev, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-[#F5FAF5] border border-[#A8DDB5]/50 flex items-start gap-3">
                        <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-xs md:text-sm text-[#183B2A] leading-relaxed">
                          {language === 'ta' && selectedDisease.preventionTa?.[idx] ? selectedDisease.preventionTa[idx] : prev}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-between text-xs text-stone-600">
                    <span>
                      {language === 'ta'
                        ? 'சரியான இடைவெளி, சுத்தமான கத்திரிக்கோல் மற்றும் சொட்டு நீர் பாசனம் மூலம் 90% நோய்களை தடுக்கலாம்.'
                        : 'Prevention is 10x more effective than treatment. Clean pruning tools and soil-level watering prevent 90% of garden diseases.'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="p-5 border-t border-stone-200 bg-[#F5FAF5] rounded-b-3xl flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-stone-500" />
                  {language === 'ta' ? 'அச்சிடு / சேமி' : 'Print Protocol'}
                </button>
              </div>

              <div className="flex items-center gap-2">
                {onOpenDoctor && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDisease(null);
                      onOpenDoctor();
                    }}
                    className="px-4 py-2 rounded-xl bg-[#174D35] hover:bg-[#2E8B57] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Stethoscope className="w-3.5 h-3.5" />
                    {language === 'ta' ? 'AI டாக்டரிடம் கேள்' : 'Consult AI Doctor on this'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedDisease(null)}
                  className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-semibold transition-all cursor-pointer"
                >
                  {language === 'ta' ? 'மூடு' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 100 Clinical Disease Modal */}
      {selectedClinical && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#A8DDB5] relative flex flex-col my-auto">
            {/* Header banner */}
            <div className="relative h-48 md:h-56 w-full flex-shrink-0 overflow-hidden bg-[#174D35]">
              <img
                src={selectedClinical.imageUrl}
                alt={selectedClinical.name}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />

              <button
                type="button"
                onClick={() => setSelectedClinical(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all cursor-pointer z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getSeverityBadgeClass(selectedClinical.severity)}`}>
                    {selectedClinical.severity} Severity
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getCategoryBadgeClass(selectedClinical.category)}`}>
                    {selectedClinical.category}
                  </span>
                  {selectedClinical.isolatePlant && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white shadow-xs">
                      {language === 'ta' ? 'தனிமைப்படுத்தல் கட்டாயம்' : 'Quarantine Required'}
                    </span>
                  )}
                  <span className="text-xs text-[#A8DDB5] bg-black/40 px-2 py-0.5 rounded-md font-mono flex items-center gap-1.5">
                    {selectedClinical.scientificName}
                    <button
                      type="button"
                      onClick={() => speakTerm(selectedClinical.name)}
                      className="p-0.5 hover:text-white"
                      title="Pronounce"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold font-serif">
                  {selectedClinical.name}
                  <span className="text-lg font-normal text-white/80 ml-2">({selectedClinical.nameTa})</span>
                </h2>
              </div>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-stone-200 bg-[#F5FAF5] px-6 overflow-x-auto scrollbar-none flex-shrink-0">
              <button
                type="button"
                onClick={() => setClinicalTab('symptoms')}
                className={`py-3.5 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                  clinicalTab === 'symptoms'
                    ? 'border-[#2E8B57] text-[#174D35]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {language === 'ta' ? 'அறிகுறிகள் & காட்சி தடயங்கள்' : 'Symptoms & Visual Cues'}
              </button>
              <button
                type="button"
                onClick={() => setClinicalTab('causes')}
                className={`py-3.5 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                  clinicalTab === 'causes'
                    ? 'border-[#2E8B57] text-[#174D35]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {language === 'ta' ? 'காரணங்கள் & சூழல்' : 'Root Causes & Triggers'}
              </button>
              <button
                type="button"
                onClick={() => setClinicalTab('remedies')}
                className={`py-3.5 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                  clinicalTab === 'remedies'
                    ? 'border-[#2E8B57] text-[#174D35]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {language === 'ta' ? 'இயற்கை சிகிச்சைகள்' : 'Organic Remedies & Protocol'}
              </button>
              <button
                type="button"
                onClick={() => setClinicalTab('expert')}
                className={`py-3.5 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                  clinicalTab === 'expert'
                    ? 'border-[#2E8B57] text-[#174D35]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {language === 'ta' ? 'குழப்பம் & நிபுணர் ஆலோசனை' : 'Diagnostic Matrix & Expert'}
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 space-y-6 flex-1 overflow-y-auto">
              {clinicalTab === 'symptoms' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs md:text-sm text-stone-700 leading-relaxed">
                    <p className="font-medium text-[#183B2A]">{selectedClinical.shortDescription}</p>
                    {language === 'ta' && (
                      <p className="text-emerald-900 mt-1 font-tamil">{selectedClinical.shortDescriptionTa}</p>
                    )}
                  </div>

                  {/* Visual Indicators */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-[#174D35] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      {language === 'ta' ? 'கண்கண்ட முதன்மை அடையாளங்கள்' : 'Definitive Visual Indicators'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {selectedClinical.visualIndicators.map((vi, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>{vi}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Clinical Symptoms */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-[#174D35] uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      {language === 'ta' ? 'நோய்த்தொற்று அறிகுறிகள்' : 'Clinical Pathological Symptoms'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {selectedClinical.symptoms.map((sym, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                          <span>{sym}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vulnerable Hosts */}
                  <div className="pt-2">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
                      {language === 'ta' ? 'அதிகம் பாதிக்கப்படும் பயிர்கள்:' : 'Vulnerable Host Plants:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedClinical.affectedPlants.map((plt, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg text-xs bg-emerald-50 text-emerald-800 font-medium border border-emerald-200">
                          {plt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {clinicalTab === 'causes' && (
                <div className="space-y-5">
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-[#183B2A] flex items-center gap-2">
                      <Wind className="w-4 h-4 text-blue-600" />
                      {language === 'ta' ? 'நோய் உருவாவதற்கான அடிப்படைக் காரணங்கள்' : 'Underlying Pathogen Triggers & Environmental Causes'}
                    </h4>
                    <div className="space-y-2">
                      {selectedClinical.causes.map((cause, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{cause}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-stone-100">
                    <h4 className="text-sm font-bold text-[#183B2A] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2E8B57]" />
                      {language === 'ta' ? 'நீண்ட கால தடுப்பு வழிகள்' : 'Proactive Cultural Preventions'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {selectedClinical.prevention.map((prev, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-950 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{prev}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {clinicalTab === 'remedies' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-sm text-[#174D35]">
                      <FlaskConical className="w-4 h-4 text-[#2E8B57]" />
                      {language === 'ta' ? 'அங்கீகரிக்கப்பட்ட இயற்கை மருத்துவ முறைகள்' : 'Verified Organic Remediation Protocols'}
                    </div>
                    <p className="text-emerald-800">
                      {language === 'ta'
                        ? 'ரசாயன நச்சு எச்சங்கள் இன்றி வீட்டு சமையலறை மற்றும் இயற்கை அங்ககப் பொருட்களைக் கொண்டு சரிசெய்யும் முறை.'
                        : 'Safe, non-toxic bio-treatments utilizing horticultural minerals, beneficial microbes, and kitchen botanical extracts.'}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {selectedClinical.treatmentOptions.map((treatment, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-[#F5FAF5] border border-emerald-200 flex items-start justify-between gap-3 shadow-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#174D35] text-white">
                              Protocol {idx + 1}
                            </span>
                            <h5 className="text-xs font-bold text-[#183B2A]">{treatment}</h5>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyTreatment(treatment, `Treatment #${idx + 1}`)}
                          className="p-1.5 rounded-lg hover:bg-emerald-100 text-[#174D35] cursor-pointer"
                          title="Copy Recipe"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-between text-xs text-stone-700">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-emerald-600" />
                      {language === 'ta' ? 'எதிர்பார்க்கப்படும் குணமடையும் காலம்:' : 'Expected Recovery Window:'}
                    </span>
                    <span className="font-bold text-[#174D35]">{selectedClinical.recoveryTime}</span>
                  </div>
                </div>
              )}

              {clinicalTab === 'expert' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-2">
                    <span className="font-bold text-amber-900 block text-sm flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-amber-600" />
                      {language === 'ta' ? 'எளிதில் தவறாகக் கருதப்படும் பிற நோய்கள்' : 'Diagnostic Differential (Easily Confused With):'}
                    </span>
                    <p className="text-amber-900 leading-relaxed">
                      {selectedClinical.confusedWith}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-950 space-y-2">
                    <span className="font-bold text-red-900 block text-sm flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      {language === 'ta' ? 'எப்போது வேளாண் நிபுணரை அணுக வேண்டும்?' : 'When to Seek University Extension / Agronomist Expert:'}
                    </span>
                    <p className="text-red-900 leading-relaxed">
                      {selectedClinical.whenToSeekExpert}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-center justify-between">
                    <span>
                      {language === 'ta'
                        ? 'செடிகளை தனிமைப்படுத்துவது மற்றும் பாதிக்கப்பட்ட இலைகளை உடனே வெட்டி அகற்றுவது பரவலை 80% குறைக்கும்.'
                        : 'Immediate pruning of blighted tissue and quarantining the container stops 80% of greenhouse pathogen spreads.'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="p-5 border-t border-stone-200 bg-[#F5FAF5] rounded-b-3xl flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-stone-500" />
                  {language === 'ta' ? 'அச்சிடு / சேமி' : 'Print Protocol'}
                </button>
              </div>

              <div className="flex items-center gap-2">
                {onOpenDoctor && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedClinical(null);
                      onOpenDoctor();
                    }}
                    className="px-4 py-2 rounded-xl bg-[#174D35] hover:bg-[#2E8B57] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Stethoscope className="w-3.5 h-3.5" />
                    {language === 'ta' ? 'AI டாக்டரிடம் கேள்' : 'Consult AI Doctor on this'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedClinical(null)}
                  className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-semibold transition-all cursor-pointer"
                >
                  {language === 'ta' ? 'மூடு' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseaseEncyclopediaPage;

