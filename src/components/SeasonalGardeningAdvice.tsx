import React, { useState } from 'react';
import {
  Calendar,
  Sun,
  CloudRain,
  Snowflake,
  Flower2,
  Leaf,
  Droplets,
  AlertCircle,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Sprout
} from 'lucide-react';
import { Language } from '../types';

interface SeasonalGardeningAdviceProps {
  language: Language;
  onNavigate?: (page: string) => void;
}

interface MonthAdvice {
  monthIndex: number; // 0 = Jan, 11 = Dec
  monthNameEn: string;
  monthNameTa: string;
  seasonEn: 'Winter' | 'Spring' | 'Summer' | 'Monsoon' | 'Autumn';
  seasonTa: string;
  themeColor: string;
  accentBg: string;
  borderClass: string;
  icon: React.ComponentType<{ className?: string }>;
  climateEn: string;
  climateTa: string;
  keyPriorityEn: string;
  keyPriorityTa: string;
  wateringTipEn: string;
  wateringTipTa: string;
  sowPlantsEn: string[];
  sowPlantsTa: string[];
  careTasksEn: string[];
  careTasksTa: string[];
  plantyProTipEn: string;
  plantyProTipTa: string;
}

const MONTHS_DATA: MonthAdvice[] = [
  {
    monthIndex: 0,
    monthNameEn: 'January',
    monthNameTa: 'ஜனவரி',
    seasonEn: 'Winter',
    seasonTa: 'குளிர்காலம்',
    themeColor: 'text-sky-600',
    accentBg: 'bg-sky-50',
    borderClass: 'border-sky-200',
    icon: Snowflake,
    climateEn: 'Cool mornings, mild afternoon sunshine, dry air',
    climateTa: 'குளிர்ந்த காலை வேளை, மிதமான பிற்பகல் வெயில், வறண்ட காற்று',
    keyPriorityEn: 'Winter rose bloom flush, cold draft protection for indoor foliage',
    keyPriorityTa: 'ரோஜா பூக்கள் கொத்தாக பூக்கும் காலம், உட்புறச் செடிகளை பனிக் குளிரில் இருந்து பாதுகாத்தல்',
    wateringTipEn: 'Water only every 4-6 days during mid-morning so roots do not stay cold at night.',
    wateringTipTa: 'காலை 10 மணிக்கு மேல் 4-6 நாட்களுக்கு ஒருமுறை மிதமாக நீர் ஊற்றவும்; இரவு வேளையில் நீர் தேங்கக் கூடாது.',
    sowPlantsEn: ['Spinach (Palak)', 'Coriander', 'Carrot', 'Chrysanthemum', 'Marigold'],
    sowPlantsTa: ['பாலக் கீரை', 'கொத்தமல்லி', 'கேரட்', 'செவ்வந்தி', 'சாமந்தி'],
    careTasksEn: [
      'Deadhead spent winter rose flowers to trigger 2nd flush of blooms',
      'Move indoor peace lilies & pothos away from cold nighttime windowpanes',
      'Apply wood ash and potassium to encourage tomato flowering'
    ],
    careTasksTa: [
      'வாடிய ரோஜா மலர்களை கிள்ளி புதிய மொட்டுகளை வரவழைக்கவும்',
      'உட்புற அலங்கார செடிகளை இரவு பனி படாதவாறு உள்ளே வைக்கவும்',
      'தக்காளிக்கு சாம்பல் சத்து உரம் இடவும்'
    ],
    plantyProTipEn: 'Wipe dust off indoor leaves monthly in winter; sunlight is precious and clean leaves absorb 35% more light!',
    plantyProTipTa: 'குளிர்காலத்தில் இலைகளில் படியும் தூசியை துடைத்து வைத்தால் சூரிய ஒளியை 35% அதிகமாக கிரகிக்கும்!'
  },
  {
    monthIndex: 1,
    monthNameEn: 'February',
    monthNameTa: 'பிப்ரவரி',
    seasonEn: 'Winter',
    seasonTa: 'குளிர்காலம் (பின்பனி)',
    themeColor: 'text-indigo-600',
    accentBg: 'bg-indigo-50',
    borderClass: 'border-indigo-200',
    icon: Snowflake,
    climateEn: 'Gradual warming, gentle breezes, expanding daylight',
    climateTa: 'மெதுவான வெப்ப உயர்வு, இதமான தென்றல், அதிகரிக்கும் பகல் வெளிச்சம்',
    keyPriorityEn: 'Major annual pruning for Jasmine, Hibiscus, and Bougainvillea',
    keyPriorityTa: 'மல்லிகை, செம்பருத்தி மற்றும் காகிதப்பூ செடிகளை கவாத்து செய்தல்',
    wateringTipEn: 'Gradually increase watering as plants break dormancy and push tender pink shoots.',
    wateringTipTa: 'செடிகள் தளிர்க்கத் தொடங்குவதால் நீரூற்றும் அளவை படிப்படியாக அதிகரிக்கவும்.',
    sowPlantsEn: ['Green Chilli', 'Brinjal', 'Bitter Gourd', 'Sunflower', 'Zinnia'],
    sowPlantsTa: ['பச்சை மிளகாய்', 'கத்தரி', 'பாகற்காய்', 'சூரியகாந்தி', 'ஜின்னியா'],
    careTasksEn: [
      'Hard prune Jasmine (Mogra) by 40% to stimulate profuse summer flower clusters',
      'Add 2-3 inches of fresh vermicompost to re-energize root zones',
      'Spray neem oil proactively against early spring aphids'
    ],
    careTasksTa: [
      'மல்லிகை செடியின் கிளைகளை வெட்டிவிட்டால் கோடையில் கொத்துக் கொத்தாக பூக்கும்',
      'தொட்டிகளில் பழைய மேல் மண்ணை கிளறி புதிய மண்புழு உரம் இடவும்',
      'அசுவினி பூச்சிகளை தடுக்க வேப்பெண்ணெய் கரைசல் தெளிக்கவும்'
    ],
    plantyProTipEn: 'Pruning Jasmine now creates 3x more flowering nodes by April. Do not be afraid to trim leggy stems!',
    plantyProTipTa: 'இப்போது மல்லிகையை கவாத்து செய்தால் ஏப்ரலில் மூன்று மடங்கு அதிக பூ மொட்டுகள் உருவாகும்!'
  },
  {
    monthIndex: 2,
    monthNameEn: 'March',
    monthNameTa: 'மார்ச்',
    seasonEn: 'Spring',
    seasonTa: 'வசந்த காலம்',
    themeColor: 'text-emerald-600',
    accentBg: 'bg-emerald-50',
    borderClass: 'border-emerald-200',
    icon: Flower2,
    climateEn: 'Warm sunny days, active vegetative sap flow, rising temperature',
    climateTa: 'சூடான வெயில், செடிகளின் வேகமான வளர்ச்சி, சீரான வெப்பம்',
    keyPriorityEn: 'Repotting root-bound houseplants, summer vegetable seedling transplantation',
    keyPriorityTa: 'தொட்டி மாற்றுதல் (Repotting) மற்றும் கோடை காய்கறி நாற்று நடுதல்',
    wateringTipEn: 'Water every 2-3 days in early morning. Mulch soil lightly to conserve moisture.',
    wateringTipTa: 'காலை வேளையில் 2-3 நாட்களுக்கு ஒருமுறை நீர் பாய்ச்சவும்.',
    sowPlantsEn: ['Okra (Lady Finger)', 'Snake Gourd', 'Watermelon', 'Basil (Tulsi)', 'Portulaca'],
    sowPlantsTa: ['வெண்டைக்காய்', 'புடலங்காய்', 'தர்பூசணி', 'துளசி', 'பத்துமணிப் பூ'],
    careTasksEn: [
      'Transplant overgrown indoor houseplants into 2-inch larger pots with fresh perlite mix',
      'Pinch growing tips of Basil and Mint for bushy growth',
      'Provide bamboo stakes for fast-climbing gourds and beans'
    ],
    careTasksTa: [
      'வேர் சுருண்ட செடிகளை பெரிய தொட்டிக்கு மாற்றி புதிய மண் கலவை இடவும்',
      'துளசி மற்றும் புதினாவின் நுனியை கிள்ளி அடர்த்தியாக வளர்க்கவும்',
      'கொடி காய்கறிகளுக்கு பந்தல் அல்லது குச்சி நடவும்'
    ],
    plantyProTipEn: 'Spring is the safest window of the entire year to propagate Monstera and Pothos cuttings in clean water jars!',
    plantyProTipTa: 'மணி பிளாண்ட் மற்றும் மான்ஸ்டெரா தண்டு கிளைகளை நீரில் வேர் பிடிக்க வைக்க இதுவே சிறந்த மாதம்!'
  },
  {
    monthIndex: 3,
    monthNameEn: 'April',
    monthNameTa: 'ஏப்ரல்',
    seasonEn: 'Spring',
    seasonTa: 'இளவேனில் / சித்திரை',
    themeColor: 'text-lime-600',
    accentBg: 'bg-lime-50',
    borderClass: 'border-lime-200',
    icon: Flower2,
    climateEn: 'Intense midday heat, clear skies, low air humidity',
    climateTa: 'கடுமையான உச்சி வெயில், தெளிவான வானம், குறைந்த ஈரப்பதம்',
    keyPriorityEn: 'Terrace garden shade netting installation and protective soil mulching',
    keyPriorityTa: 'மாடித் தோட்டத்திற்கு பச்சை நிழல்வலை (Shade net) அமைத்தல்',
    wateringTipEn: 'Water deeply every 1-2 days. Keep terracotta pot saucers filled with a thin water layer.',
    wateringTipTa: 'தினமும் அல்லது ஒரு நாள் விட்டு ஒரு நாள் ஆழமாக நீர் பாய்ச்சவும்.',
    sowPlantsEn: ['Amaranth Keerai', 'Cucumber', 'Bottle Gourd', 'Cosmos', 'Marigold'],
    sowPlantsTa: ['அரைக் கீரை / தண்டுக்கீரை', 'வெள்ளரி', 'சுரைக்காய்', 'காஸ்மோஸ்', 'சாமந்தி'],
    careTasksEn: [
      'Cover terrace plants with 50% green agro-shade net to prevent scorched leaf tips',
      'Apply 2 inches of dried leaf mulch over container soil surfaces',
      'Feed blooming roses and hibiscus with banana peel tea rich in potassium'
    ],
    careTasksTa: [
      'சூரிய வெப்பத்தை தணிக்க 50% பச்சை நிழல்வலை பொருத்தவும்',
      'மண் காயாமல் இருக்க காய்ந்த இலைகளை மூடாக்காக பரப்பவும்',
      'வாழைப்பழத் தோல் ஊறல் கரைசலை பூக்கும் செடிகளுக்கு ஊற்றவும்'
    ],
    plantyProTipEn: 'Mulching container soil reduces water evaporation by 50% and keeps delicate root balls 7°C cooler!',
    plantyProTipTa: 'காய்ந்த இலை மூடாக்கு இடுவதால் நீராவி ஆவது 50% குறைந்து வேர்கள் கருகாமல் பாதுகாக்கப்படுகிறது!'
  },
  {
    monthIndex: 4,
    monthNameEn: 'May',
    monthNameTa: 'மே',
    seasonEn: 'Summer',
    seasonTa: 'முதுவேனில் / அக்னி நட்சத்திரம்',
    themeColor: 'text-amber-600',
    accentBg: 'bg-amber-50',
    borderClass: 'border-amber-300',
    icon: Sun,
    climateEn: 'Peak sweltering heatwave (38°C - 42°C), scorching dry winds',
    climateTa: 'கடும் கோடை வெப்பம் (38°C - 42°C), வறண்ட அனல் காற்று',
    keyPriorityEn: 'Heat stress mitigation, twice-daily watering, humidity misting',
    keyPriorityTa: 'கோடை வெப்பத்தில் இருந்து செடிகளை காப்பாற்றுதல், இருவேளை நீர் தெளித்தல்',
    wateringTipEn: 'Water twice daily: early morning before 7:30 AM and late evening after sunset. Never water in noon sun.',
    wateringTipTa: 'காலை 7:30 மணிக்குள் ஒருமுறையும், மாலை சூரியன் மறைந்ததும் ஒருமுறையும் நீர் பாய்ச்சவும்; உச்சி வெயிலில் ஊற்றவே கூடாது.',
    sowPlantsEn: ['Sweet Corn', 'Cowpea (Karamani)', 'Cluster Beans (Kothavarangai)', 'Balsam'],
    sowPlantsTa: ['சோளம்', 'காராமணி', 'கொத்தவரங்காய்', 'பல்சம் பூ'],
    careTasksEn: [
      'Group potted plants close together to create an interconnected humid microclimate',
      'Mist indoor tropical foliage (Areca palm, Peace lily, Monstera) daily',
      'Avoid heavy chemical fertilizers which can cause salt burn under intense heat'
    ],
    careTasksTa: [
      'தொட்டிகளை ஒன்றுடன் ஒன்று நெருக்கமாக வைத்து ஈரப்பத சூழலை உருவாக்கவும்',
      'உட்புறத் தாவரங்களின் இலைகளில் தினமும் தண்ணீர் தெளிக்கவும்',
      'கடும் வெப்பத்தில் ரசாயன உரங்களை தவிர்க்கவும்'
    ],
    plantyProTipEn: 'Grouping your balcony pots together creates a collective humidity bubble that prevents crispy brown leaf edges!',
    plantyProTipTa: 'தொட்டிகளை ஒன்றாக நெருக்கி வைத்தால் ஒரு செடியின் ஈரப்பதம் அடுத்த செடிக்கு குளுமை தரும்!'
  },
  {
    monthIndex: 5,
    monthNameEn: 'June',
    monthNameTa: 'ஜூன்',
    seasonEn: 'Summer',
    seasonTa: 'கோடை இறுதி / காற்று காலம்',
    themeColor: 'text-orange-600',
    accentBg: 'bg-orange-50',
    borderClass: 'border-orange-200',
    icon: Sun,
    climateEn: 'Pre-monsoon gusty winds, sudden squalls, high humidity buildup',
    climateTa: 'பருவமழைக்கு முந்தைய காற்று, திடீர் தூறல், அதிக காற்றில் ஈரப்பதம்',
    keyPriorityEn: 'Securing tall plants against wind, terrace drain cleaning before rains',
    keyPriorityTa: 'காற்றுக்கு செடிகள் சாயாமல் குச்சி நடுதல், மாடி வடிகால் தூய்மை',
    wateringTipEn: 'Inspect soil daily. Rain may wet top foliage while root soil remains bone dry underneath.',
    wateringTipTa: 'மழை தூறல் இலைகளை நனைத்தாலும் வேரில் மண் காய்ந்திருக்கலாம்; கவனித்து நீர் ஊற்றவும்.',
    sowPlantsEn: ['Okra', 'Brinjal', 'Tomato (Monsoon nursery)', 'Curry Leaf saplings'],
    sowPlantsTa: ['வெண்டை', 'கத்தரி', 'தக்காளி நாற்றங்கால்', 'கறிவேப்பிலை'],
    careTasksEn: [
      'Tie tall tomato and chilli vines securely to sturdy bamboo stakes',
      'Clear terrace rain drain pipes to prevent rooftop waterlogging',
      'Prune dead branches before heavy monsoon winds arrive'
    ],
    careTasksTa: [
      'தக்காளி, மிளகாய் செடிகளுக்கு மூங்கில் முட்டுக் கொடுத்து கட்டவும்',
      'மாடித் தோட்டத்தில் மழை நீர் வழியும் துளைகளில் குப்பை அடைக்காமல் நீக்கவும்',
      'காய்ந்த கிளைகளை கவாத்து செய்யவும்'
    ],
    plantyProTipEn: 'Check pot bottoms now! Ensure drainage holes are not blocked by silt before the monsoon downpours arrive.',
    plantyProTipTa: 'மழைக்காலம் தொடங்கும் முன் அனைத்து தொட்டிகளின் அடியில் வடிகால் துளை அடைக்காமல் இருப்பதை உறுதி செய்யுங்கள்!'
  },
  {
    monthIndex: 6,
    monthNameEn: 'July',
    monthNameTa: 'ஜூலை',
    seasonEn: 'Monsoon',
    seasonTa: 'பருவமழை காலம்',
    themeColor: 'text-teal-600',
    accentBg: 'bg-teal-50',
    borderClass: 'border-teal-200',
    icon: CloudRain,
    climateEn: 'Frequent heavy rains, lush cloud cover, high atmospheric humidity',
    climateTa: 'அடிக்கடி பெய்யும் மழை, மேகமூட்டம், அதிக ஈரப்பதம்',
    keyPriorityEn: 'Fungal root rot prevention, elevating pots on stands, snail & slug control',
    keyPriorityTa: 'வேர் அழுகலை தடுத்தல், தொட்டிகளை தரையிலிருந்து ஏற்றி வைத்தல், நத்தை கட்டுப்பாடு',
    wateringTipEn: 'Withhold watering on rainy days! Only water when soil is noticeably drying out.',
    wateringTipTa: 'மழை பெய்யும் நாட்களில் நீர் ஊற்றவே வேண்டாம்! மண் உலர்ந்தால் மட்டுமே ஊற்றவும்.',
    sowPlantsEn: ['Turmeric (Manjal)', 'Ginger (Inji)', 'Radish', 'Ridge Gourd (Peerkangai)', 'Canna'],
    sowPlantsTa: ['மஞ்சள்', 'இஞ்சி', 'முள்ளங்கி', 'பீர்க்கங்காய்', 'கல்வாழை'],
    careTasksEn: [
      'Place pots on bricks or stands so drain holes never sit in puddles',
      'Remove saucers from under outdoor pots to eliminate standing water',
      'Drench soil with Trichoderma viride bio-fungicide once every 15 days'
    ],
    careTasksTa: [
      'தொட்டிகளின் கீழ் செங்கற்கள் வைத்து தரையிலிருந்து 2 அங்குலம் உயர்த்தி வைக்கவும்',
      'தொட்டிக்கு அடியில் உள்ள தட்டுகளை மழைக்காலத்தில் நீக்கிவிடவும்',
      'டிரைக்கோடெர்மா விரிடி உயிரி பூஞ்சாணத்தை மண்ணில் கலந்து வேர் அழுகலை தடுக்கவும்'
    ],
    plantyProTipEn: 'Rainwater is naturally packed with dissolved bio-available nitrates; collect it in clean buckets for your indoor plants!',
    plantyProTipTa: 'மழைநீரில் இயற்கை தழைச்சத்து நிறைந்திருக்கும்; அதை வாளியில் பிடித்து உட்புறச் செடிகளுக்கு ஊற்றுங்கள்!'
  },
  {
    monthIndex: 7,
    monthNameEn: 'August',
    monthNameTa: 'ஆகஸ்ட்',
    seasonEn: 'Monsoon',
    seasonTa: 'பருவமழை (ஆடி மாதம்)',
    themeColor: 'text-emerald-700',
    accentBg: 'bg-emerald-50',
    borderClass: 'border-emerald-300',
    icon: CloudRain,
    climateEn: 'Intermittent monsoons, warm humid spells, prolific vegetative vigor',
    climateTa: 'இடைவிடாத தூறல், வெதுவெதுப்பான ஈரப்பதம், அபரிமிதமான வளர்ச்சி',
    keyPriorityEn: 'Aadi Pattam sowing festival: Best month in South Asia for seed germination',
    keyPriorityTa: 'ஆடிப் பட்டம் தேடி விதை: விதைகள் முளைக்க ஆண்டின் மிகச் சிறந்த மாதம்',
    wateringTipEn: 'Monitor container moisture. High humidity means soil stays wet for 3-4 days.',
    wateringTipTa: 'ஈரப்பதம் அதிகமாக இருப்பதால் 3-4 நாட்களுக்கு மண் காயாது; தொட்டுப் பார்த்து நீர் ஊற்றவும்.',
    sowPlantsEn: ['All Vegetable Seeds', 'Curry Leaf', 'Hibiscus cuttings', 'Rose cuttings', 'Drumstick (Murungai)'],
    sowPlantsTa: ['அனைத்து காய்கறி விதைகள்', 'கறிவேப்பிலை', 'செம்பருத்தி தண்டு', 'முருங்கை'],
    careTasksEn: [
      'Sow your main winter and autumn vegetable seeds (Aadi Pattam tradition)',
      'Take stem cuttings of Hibiscus, Bougainvillea, and Roses; they root at 95% success rate now',
      'Hand-pick caterpillars and green grasshoppers feasting on tender new leaves'
    ],
    careTasksTa: [
      'ஆடிப் பட்ட காய்கறி விதைகளை விதைக்க சரியான நேரம்',
      'செம்பருத்தி மற்றும் ரோஜா தண்டு நட்டு எளிதாக புதிய செடிகளை உருவாக்கலாம்',
      'இலைகளை கடிக்கும் பச்சை கம்பளிப் பூச்சிகளை கைகளால் அகற்றி அப்புறப்படுத்தவும்'
    ],
    plantyProTipEn: 'August atmospheric humidity gives stem cuttings almost 100% rooting success. Try propagating your favorite shrubs now!',
    plantyProTipTa: 'ஆகஸ்ட் மாத காற்றில் உள்ள ஈரப்பதம் தண்டு குச்சிகளை 100% வேர் பிடிக்க வைக்கும். புதிய நாற்றுகளை உருவாக்குங்கள்!'
  },
  {
    monthIndex: 8,
    monthNameEn: 'September',
    monthNameTa: 'செப்டம்பர்',
    seasonEn: 'Monsoon',
    seasonTa: 'பருவமழை முடிவு / புரட்டாசி',
    themeColor: 'text-cyan-700',
    accentBg: 'bg-cyan-50',
    borderClass: 'border-cyan-200',
    icon: CloudRain,
    climateEn: 'Receding clouds, alternating rain and bright sunshine, high weed growth',
    climateTa: 'பிரியும் மேகங்கள், மழையும் வெயிலும் மாறி மாறி வருதல், களைச் செடிகள் வளர்ச்சி',
    keyPriorityEn: 'Weeding container beds, applying organic compost, mealybug prevention',
    keyPriorityTa: 'களை நீக்குதல், இயற்கை உரம் இடுதல், மாவுப்பூச்சி தடுப்பு',
    wateringTipEn: 'Resume regular watering schedule as sunny intervals between rains increase.',
    wateringTipTa: 'வெயில் வரும் போது சீரான நீரூற்றும் வழக்கத்திற்கு திரும்பவும்.',
    sowPlantsEn: ['Tomato seedlings', 'Chilli transplant', 'Marigold (for festive blooms)', 'Cauliflower'],
    sowPlantsTa: ['தக்காளி நாற்றுகள்', 'மிளகாய் நடுவு', 'சாமந்தி (பண்டிகை பூக்கள்)', 'காலிஃபிளவர்'],
    careTasksEn: [
      'De-weed every pot so wild grasses do not steal soil nutrients from your vegetables',
      'Spray sour buttermilk diluted in water to stop powdery mildew on damp leaves',
      'Apply neem cake powder to soil to kill soil-borne grubs'
    ],
    careTasksTa: [
      'தொட்டிகளில் முளைத்த புற்கள் மற்றும் தேவையற்ற களைகளை வேருடன் அகற்றவும்',
      'பூஞ்சை நோய்களை விரட்ட புளித்த மோர் கரைசலை இலைகளில் தெளிக்கவும்',
      'வேப்பம்பிண்ணாக்கு தூவி மண்ணில் உள்ள புழுக்களை அழிக்கவும்'
    ],
    plantyProTipEn: 'Plant marigolds alongside your newly transplanted tomatoes to naturally ward off soil nematodes and whiteflies!',
    plantyProTipTa: 'தக்காளி நாற்றுகளின் அருகில் சாமந்தி செடியை நட்டு வைத்தால் வேர்ப் புழுக்கள் தாக்காது!'
  },
  {
    monthIndex: 9,
    monthNameEn: 'October',
    monthNameTa: 'அக்டோபர்',
    seasonEn: 'Autumn',
    seasonTa: 'இலையுதிர் / வடகிழக்கு பருவமழை தொடக்கம்',
    themeColor: 'text-amber-700',
    accentBg: 'bg-amber-50',
    borderClass: 'border-amber-200',
    icon: Leaf,
    climateEn: 'Northeast monsoon showers, cooler evening breezes, changing sun angles',
    climateTa: 'வடகிழக்கு பருவமழை, குளிர்ந்த மாலைக் காற்று, சூரியன் திசை மாறுதல்',
    keyPriorityEn: 'Winter vegetable sowing, light pruning, adjusting plant positions',
    keyPriorityTa: 'குளிர்கால காய்கறி விதைப்பு, சூரிய ஒளிக்கு ஏற்ப தொட்டிகளை நகர்த்துதல்',
    wateringTipEn: 'Shortening daylight hours reduce plant transpiration; reduce watering volume by 20%.',
    wateringTipTa: 'பகல் நேரம் குறைவதால் தண்ணீர் தேவையும் குறையும்; 20% குறைவாக நீர் பாய்ச்சவும்.',
    sowPlantsEn: ['Palak (Spinach)', 'Methi (Fenugreek)', 'Coriander', 'Carrot', 'Beetroot', 'Petunia'],
    sowPlantsTa: ['பாலக் கீரை', 'வெந்தயக் கீரை', 'கொத்தமல்லி', 'கேரட்', 'பீட்ரூட்', 'பெட்டூனியா'],
    careTasksEn: [
      'Sow cool-season leafy greens (Methi and Palak germinate in just 3 days now)',
      'Shift indoor plants closer to South-facing windows as the sun dips lower in the southern sky',
      'Add bone meal and banana peel tea to roses to prepare massive November buds'
    ],
    careTasksTa: [
      'வெந்தயக் கீரை மற்றும் பாலக் விதைகளை விதைக்கவும்; 3 நாட்களில் முளைக்கும்',
      'சூரியன் தெற்கு நோக்கி சாய்வதால் உட்புற செடிகளை தெற்கு ஜன்னல் ஓரம் மாற்றவும்',
      'ரோஜா செடிக்கு வாழைப்பழத் தோல் மற்றும் உரம் இட்டு மொட்டுகளை வரவழைக்கவும்'
    ],
    plantyProTipEn: 'Methi (fenugreek) seeds from your kitchen spice box can be sown in shallow containers for fresh harvest in 18 days!',
    plantyProTipTa: 'அஞ்சறைப் பெட்டி வெந்தயத்தை பால்கனி தொட்டியில் தூவினால் 18 நாட்களில் சுவையான வெந்தயக் கீரை தயார்!'
  },
  {
    monthIndex: 10,
    monthNameEn: 'November',
    monthNameTa: 'நவம்பர்',
    seasonEn: 'Autumn',
    seasonTa: 'முன்பனிக் காலம் / கார்த்திகை',
    themeColor: 'text-emerald-800',
    accentBg: 'bg-emerald-50',
    borderClass: 'border-emerald-300',
    icon: Leaf,
    climateEn: 'Pleasantly cool nights, clear sunny days, gentle dew drops',
    climateTa: 'இதமான குளிர்ந்த இரவு, தெளிவான பகல் வெயில், காலை பனித்துளிகள்',
    keyPriorityEn: 'Lush winter leafy harvests, rose bud burst feeding, pest inspections',
    keyPriorityTa: 'குளிர்கால கீரை அறுவடை, ரோஜா மொட்டுகளுக்கு சத்துணவு, பூச்சி கண்காணிப்பு',
    wateringTipEn: 'Water in mid-morning (9 AM - 10 AM). Water only when the top 2 inches of soil feel dry.',
    wateringTipTa: 'காலை 9-10 மணிக்குள் நீர் ஊற்றவும்; மேல் மண் 2 அங்குலம் காய்ந்திருந்தால் மட்டுமே ஊற்றவும்.',
    sowPlantsEn: ['Winter Rose', 'Chrysanthemum', 'Cabbage', 'Cauliflower', 'Green Peas', 'Dahlia'],
    sowPlantsTa: ['குளிர்கால ரோஜா', 'செவ்வந்தி', 'முட்டைக்கோஸ்', 'காலிஃபிளவர்', 'பட்டாணி', 'டேலியா'],
    careTasksEn: [
      'Harvest outer leaves of spinach and coriander continuously so centers keep sprouting',
      'Feed roses every 10 days with vermicompost and fermented groundnut cake liquid',
      'Inspect underside of tender rose and chilli leaves for early aphid clusters'
    ],
    careTasksTa: [
      'பாலக் மற்றும் கொத்தமல்லி கீரையின் வெளி இலைகளை மட்டும் பறித்தால் புதிய இலைகள் தொடர்ந்து வளரும்',
      'ரோஜாக்களுக்கு 10 நாட்களுக்கு ஒருமுறை மண்புழு உரம் மற்றும் கடலைப்பிண்ணாக்கு கரைசல் இடவும்',
      'இலைகளின் அடியில் அசுவினி பூச்சிகள் உள்ளதா என பரிசோதிக்கவும்'
    ],
    plantyProTipEn: 'November offers the most favorable temperate climate for roses and container vegetables. Feed them organic liquid compost every 10 days for exhibition-quality blooms!',
    plantyProTipTa: 'நவம்பர் மாதம் ரோஜா மற்றும் காய்கறிகளுக்கு சிறந்த பருவநிலை. 10 நாட்களுக்கு ஒருமுறை இயற்கை திரவ உரமிட்டால் பிரம்மாண்டமாக பூக்கும்!'
  },
  {
    monthIndex: 11,
    monthNameEn: 'December',
    monthNameTa: 'டிசம்பர்',
    seasonEn: 'Winter',
    seasonTa: 'குளிர்காலம் / மார்கழி',
    themeColor: 'text-blue-600',
    accentBg: 'bg-blue-50',
    borderClass: 'border-blue-200',
    icon: Snowflake,
    climateEn: 'Coolest month of the year, crisp morning fog, shortened sunlight hours',
    climateTa: 'ஆண்டின் அதிக பனிப்பொழிவு, காலை பனிமூட்டம், குறைந்த பகல் நேரம்',
    keyPriorityEn: 'Enjoying peak winter blossoms (Roses, Chrysanthemums, Marigolds), harvest cool vegetables',
    keyPriorityTa: 'ரோஜா மற்றும் செவ்வந்தி மலர்கள் பூத்துக் குலுங்குவதை ரசித்தல், காய்கறி அறுவடை',
    wateringTipEn: 'Slowest evaporation rate of the year. Water only once every 3-5 days. Avoid wetting leaves late in the evening.',
    wateringTipTa: 'ஆண்டிலேயே குறைந்த நீராவி வீதம். 3-5 நாட்களுக்கு ஒருமுறை மட்டுமே மிதமாக நீர் ஊற்றவும்.',
    sowPlantsEn: ['Strawberries', 'Winter Herbs', 'Salad Greens', 'Petunias', 'Pansy'],
    sowPlantsTa: ['ஸ்ட்ராபெரி', 'மூலிகைகள்', 'சாலட் கீரைகள்', 'பெட்டூனியா'],
    careTasksEn: [
      'Deadhead spent chrysanthemum and marigold blooms to keep flower flushes coming',
      'Protect delicate succulents (Aloe vera, Jade) from prolonged damp morning fog',
      'Harvest fresh homegrown tomatoes as skins turn bright glossy scarlet'
    ],
    careTasksTa: [
      'வாடிய சாமந்தி, செவ்வந்தி பூக்களை உடனுக்குடன் கிள்ளி புதிய மொட்டுகளை வரவழைக்கவும்',
      'சப்பாத்திகள்ளி மற்றும் கற்றாழை மீது அதிக பனி நீர் தேங்காமல் பாதுகாக்கவும்',
      'சிவப்பாக பழுத்த நாட்டுத் தக்காளிகளை பறித்து சுவைக்கவும்'
    ],
    plantyProTipEn: 'Avoid evening watering in December! Cool overnight moisture on foliage is the number one cause of fungal black spot on roses.',
    plantyProTipTa: 'டிசம்பரில் மாலை வேளையில் தண்ணீர் ஊற்றாதீர்கள்! இரவில் இலைகளில் தங்கும் குளிர் நீரே ரோஜாக்களில் கரும்புள்ளி நோயை உண்டாக்குகிறது.'
  }
];

export const SeasonalGardeningAdvice: React.FC<SeasonalGardeningAdviceProps> = ({
  language,
  onNavigate
}) => {
  // Dynamically auto-detect current month (0 to 11)
  const currentActualMonth = new Date().getMonth();
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(currentActualMonth);

  const activeAdvice = MONTHS_DATA[selectedMonthIndex];
  const IconComponent = activeAdvice.icon;
  const isCurrentMonth = selectedMonthIndex === currentActualMonth;

  return (
    <section className="rounded-3xl bg-white border-2 border-[#A8DDB5] p-6 sm:p-8 md:p-10 shadow-lg space-y-6 relative overflow-hidden">
      {/* Decorative botanical background tint */}
      <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#E8F8ED] blur-3xl pointer-events-none opacity-60" />

      {/* Header with Monthly Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8ED] text-[#2E8B57] text-xs font-bold uppercase tracking-wider mb-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>
              {language === 'ta' ? 'பருவகால தோட்ட வழிகாட்டல்' : 'Dynamic Seasonal Calendar'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#174D35] flex items-center gap-2">
            <span>
              {language === 'ta'
                ? `${activeAdvice.monthNameTa} மாத தோட்டப் பராமரிப்பு குறிப்புகள்`
                : `${activeAdvice.monthNameEn} Gardening Advice & Care`}
            </span>
            {isCurrentMonth && (
              <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#174D35] text-white shadow-xs">
                {language === 'ta' ? 'இந்த மாதம்' : 'Current Month'}
              </span>
            )}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {language === 'ta'
              ? 'தற்போதைய மாதத்தின் தட்பவெப்ப நிலைக்கு ஏற்ப நீரூற்றும் முறை, விதைக்க வேண்டிய செடிகள் மற்றும் பராமரிப்பு வழிகள்.'
              : 'Actionable botanical care priorities, watering calibrations, and sowing guides synchronized with the natural calendar.'}
          </p>
        </div>

        {/* Quick Month Switcher to Jump Back to Today */}
        {!isCurrentMonth && (
          <button
            type="button"
            onClick={() => setSelectedMonthIndex(currentActualMonth)}
            className="px-4 py-2 rounded-2xl bg-[#E8F8ED] hover:bg-[#A8DDB5]/40 text-[#174D35] text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2E8B57]" />
            <span>{language === 'ta' ? 'இந்த மாதத்திற்கு திரும்பு' : 'Jump to Current Month'}</span>
          </button>
        )}
      </div>

      {/* 12-Month Interactive Horizontal Carousel / Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none pt-1 relative z-10">
        {MONTHS_DATA.map((m) => {
          const isSelected = selectedMonthIndex === m.monthIndex;
          const isToday = currentActualMonth === m.monthIndex;

          return (
            <button
              key={m.monthIndex}
              type="button"
              onClick={() => setSelectedMonthIndex(m.monthIndex)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer relative ${
                isSelected
                  ? 'bg-[#174D35] text-white shadow-md ring-2 ring-[#2E8B57]/30 scale-102'
                  : 'bg-[#F5FAF5] text-gray-700 border border-[#A8DDB5]/60 hover:border-[#2E8B57] hover:bg-white'
              }`}
            >
              <span>{language === 'ta' ? m.monthNameTa.slice(0, 5) : m.monthNameEn.slice(0, 3)}</span>
              {isToday && (
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#A8DDB5]' : 'bg-[#2E8B57]'} animate-ping`} />
              )}
            </button>
          );
        })}
      </div>

      {/* MAIN SEASONAL ADVICE SHOWCASE CARD */}
      <div className={`rounded-3xl border-2 ${activeAdvice.borderClass} ${activeAdvice.accentBg} p-5 sm:p-7 space-y-6 relative z-10 transition-all duration-300`}>
        {/* Climate & Priority Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
              <IconComponent className={`w-6 h-6 ${activeAdvice.themeColor}`} />
            </div>
            <div>
              <span className={`text-[11px] font-extrabold uppercase tracking-wider ${activeAdvice.themeColor}`}>
                {language === 'ta' ? activeAdvice.seasonTa : `${activeAdvice.seasonEn} Season`}
              </span>
              <h3 className="font-black text-lg text-[#174D35]">
                {language === 'ta' ? activeAdvice.keyPriorityTa : activeAdvice.keyPriorityEn}
              </h3>
            </div>
          </div>

          <div className="px-3.5 py-2 rounded-2xl bg-white/90 shadow-2xs text-xs font-semibold text-gray-700 max-w-xs">
            <span className="text-gray-400 block text-[10px] font-bold uppercase">Climate Atmosphere:</span>
            {language === 'ta' ? activeAdvice.climateTa : activeAdvice.climateEn}
          </div>
        </div>

        {/* 3 Interactive Grid Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Pillar 1: Watering Adjustment */}
          <div className="p-4 rounded-2xl bg-white shadow-sm border border-black/5 space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <Droplets className="w-4 h-4" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#174D35]">
                  {language === 'ta' ? 'நீரூற்றும் அளவு & முறை' : 'Watering Calibration'}
                </h4>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed font-medium">
                {language === 'ta' ? activeAdvice.wateringTipTa : activeAdvice.wateringTipEn}
              </p>
            </div>
            <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-500 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2E8B57]" />
              <span>Prevents root rot & moisture shock</span>
            </div>
          </div>

          {/* Pillar 2: What to Sow & Plant This Month */}
          <div className="p-4 rounded-2xl bg-white shadow-sm border border-black/5 space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-600 mb-1">
                <Sprout className="w-4 h-4" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#174D35]">
                  {language === 'ta' ? 'இம்மாதம் விதைக்க வேண்டியவை' : 'What to Sow & Plant'}
                </h4>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(language === 'ta' ? activeAdvice.sowPlantsTa : activeAdvice.sowPlantsEn).map((plantName, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl bg-[#E8F8ED] border border-[#A8DDB5]/70 text-[#174D35] text-[11px] font-bold"
                  >
                    🌱 {plantName}
                  </span>
                ))}
              </div>
            </div>
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('library')}
                className="pt-2 text-[11px] font-bold text-[#2E8B57] hover:underline flex items-center gap-0.5"
              >
                <span>{language === 'ta' ? 'விதைகள் & செடிகளை தேடுக' : 'Explore seeds in library'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Pillar 3: Key Care & Pruning Checklist */}
          <div className="p-4 rounded-2xl bg-white shadow-sm border border-black/5 space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-purple-600 mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#174D35]">
                  {language === 'ta' ? 'முக்கிய பராமரிப்பு பணிகள்' : 'Monthly Care Checklist'}
                </h4>
              </div>
              <ul className="space-y-1.5 text-xs text-gray-700">
                {(language === 'ta' ? activeAdvice.careTasksTa : activeAdvice.careTasksEn).map((task, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 leading-snug">
                    <span className="text-[#2E8B57] font-bold shrink-0 mt-0.5">&bull;</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-2 border-t border-gray-100 text-[10px] text-gray-400">
              Updated for botanical hardiness
            </div>
          </div>
        </div>

        {/* PLANTY Pro-Tip Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#174D35] to-[#2E8B57] text-white flex flex-col sm:flex-row items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-[#A8DDB5]" />
          </div>
          <div className="space-y-0.5 text-center sm:text-left flex-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#A8DDB5]">
              PLANTY's Monthly Botanical Secret
            </span>
            <p className="text-xs sm:text-sm font-medium leading-relaxed">
              "{language === 'ta' ? activeAdvice.plantyProTipTa : activeAdvice.plantyProTipEn}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
