import { QuizQuestion, GardeningChallenge, WeatherCondition } from '../types';

// Companion Planting Matrix
export interface CompanionRule {
  plantName: string;
  goodCompanions: { name: string; benefit: string; benefitTa: string }[];
  badCompanions: { name: string; reason: string; reasonTa: string }[];
}

export const COMPANION_PLANTING_MATRIX: CompanionRule[] = [
  {
    plantName: 'Tomato',
    goodCompanions: [
      { name: 'Basil', benefit: 'Repels hornworms & thrips, enhances tomato flavor', benefitTa: 'புழுக்களை விரட்டி தக்காளி சுவையை கூட்டுகிறது' },
      { name: 'Marigold', benefit: 'Repels root-knot nematodes and whiteflies with limonene', benefitTa: 'நூற்புழுக்கள் மற்றும் வெள்ளை ஈக்களை விரட்டுகிறது' },
      { name: 'Garlic', benefit: 'Sulfur compounds deter spider mites and fungal leaf spot', benefitTa: 'சிலந்திப் பேன் மற்றும் பூஞ்சை நோய்களை தடுக்கிறது' }
    ],
    badCompanions: [
      { name: 'Cabbage / Brassicas', reason: 'Stunts brassica growth and attracts similar pests', reasonTa: 'முட்டைக்கோஸ் வளர்ச்சியை குன்றச் செய்யும்' },
      { name: 'Fennel', reason: 'Emits allelopathic chemicals that retard tomato growth', reasonTa: 'தக்காளி வளர்ச்சியை தடுக்கும் வேர் அமிலங்களை சுரக்கும்' }
    ]
  },
  {
    plantName: 'Chilli & Peppers',
    goodCompanions: [
      { name: 'Coriander / Cilantro', benefit: 'Attracts beneficial hoverflies that eat aphids', benefitTa: 'அசுவினி பூச்சிகளை உண்ணும் நன்மை செய்யும் பூச்சிகளை ஈர்க்கும்' },
      { name: 'Basil', benefit: 'Boosts plant vigor and repels thrips', benefitTa: 'செடியை திடமாக்கி இலைப்பேன் வராமல் காக்கும்' },
      { name: 'Onions', benefit: 'Pungent odor confounds sap-sucking pests', benefitTa: 'பூச்சிகளை குழப்பும் கார நெடி தரும்' }
    ],
    badCompanions: [
      { name: 'Beans', reason: 'Spreading bean vines can shade out and choke sun-loving chillies', reasonTa: 'அதிக நிழல் தந்து மிளகாய் வளர்ச்சியை குறைக்கும்' },
      { name: 'Fennel', reason: 'Inhibits root development', reasonTa: 'வேர் வளர்ச்சியை தடுக்கும்' }
    ]
  },
  {
    plantName: 'Brinjal (Eggplant)',
    goodCompanions: [
      { name: 'French Beans', benefit: 'Fixes atmospheric nitrogen into root soil', benefitTa: 'மண்ணில் இயற்கை தழைச்சத்தை நிலைநிறுத்தும்' },
      { name: 'Marigold', benefit: 'Repels nematodes and protects against wilt', benefitTa: 'வாடல் நோய் மற்றும் நூற்புழுக்களை தடுக்கும்' },
      { name: 'Mint', benefit: 'Deters flea beetles from chewing holes in leaves', benefitTa: 'வண்டுகள் இலைகளில் ஓட்டை போடுவதை தடுக்கும்' }
    ],
    badCompanions: [
      { name: 'Fennel', reason: 'Retards eggplant flowering and fruit set', reasonTa: 'காய் பிடிப்பதை தடுக்கும்' }
    ]
  },
  {
    plantName: 'Cucumber & Gourds',
    goodCompanions: [
      { name: 'Sunflower', benefit: 'Provides natural living trellis support and attracts pollinators', benefitTa: 'இயற்கை பந்தல் போல தாங்கி மகரந்த சேர்க்கை உதவும்' },
      { name: 'Radish', benefit: 'Deters cucumber beetles with pungent root oils', benefitTa: 'வெள்ளரி வண்டுகளை விரட்டும்' },
      { name: 'Dill', benefit: 'Attracts beneficial parasitic wasps', benefitTa: 'நன்மை செய்யும் ஒட்டுண்ணி குளவிகளை ஈர்க்கும்' }
    ],
    badCompanions: [
      { name: 'Potato', reason: 'Increases susceptibility to early blight', reasonTa: 'தீக்கருகல் நோயை பரப்பும்' },
      { name: 'Aromatic Sage', reason: 'Stunts cucumber vine vigor', reasonTa: 'கொடியின் வேகத்தை குறைக்கும்' }
    ]
  },
  {
    plantName: 'Rose',
    goodCompanions: [
      { name: 'Garlic / Chives', benefit: 'Natural antifungal protection and deters black spot and aphids', benefitTa: 'கருப்பு புள்ளி நோய் மற்றும் அசுவினியை தடுக்கும்' },
      { name: 'Lavender', benefit: 'Deters whiteflies and attracts bees', benefitTa: 'வெள்ளைப் பூச்சியை விரட்டி தேனீக்களை ஈர்க்கும்' },
      { name: 'Geranium', benefit: 'Attracts Japanese beetles away from rose petals (trap crop)', benefitTa: 'பூச்சிகளை தன்பால் ஈர்த்து ரோஜாவை காக்கும்' }
    ],
    badCompanions: [
      { name: 'Heavy Tree Roots', reason: 'Competes aggressively for surface moisture and sunlight', reasonTa: 'சூரிய ஒளி மற்றும் நீரை பறித்துக்கொள்ளும்' }
    ]
  }
];

// Repotting Soil Mix Recipes
export interface SoilRecipe {
  categoryName: string;
  categoryNameTa: string;
  idealPh: string;
  ingredients: { name: string; percentage: number; purpose: string }[];
  potAdvice: string;
  repotIntervalMonths: number;
}

export const SOIL_RECIPES: SoilRecipe[] = [
  {
    categoryName: 'Aroids & Tropical Houseplants (Monstera, Pothos, Philodendron)',
    categoryNameTa: 'உட்புற அழகுத் தாவரங்கள் (மணி பிளாண்ட், மான்ஸ்டெரா)',
    idealPh: '5.8 - 6.5',
    ingredients: [
      { name: 'Coco Peat / Peat Moss', percentage: 40, purpose: 'Lightweight moisture retention' },
      { name: 'Perlite / Pumice', percentage: 25, purpose: 'Aeration and preventing root compaction' },
      { name: 'Pine Bark / Coconut Husk Chips', percentage: 20, purpose: 'Chunky structure mimicking natural jungle forest floor' },
      { name: 'Vermicompost (Worm Castings)', percentage: 15, purpose: 'Gentle organic nutrients & beneficial microbes' }
    ],
    potAdvice: 'Choose a pot 2 inches larger in diameter with ample bottom drainage holes.',
    repotIntervalMonths: 18
  },
  {
    categoryName: 'Succulents & Cacti (Jade, Snake Plant, Echeveria, Aloe)',
    categoryNameTa: 'கற்றாழை & சதைப்பற்று தாவரங்கள் (ஜேட், சப்பாத்திக்கள்ளி)',
    idealPh: '6.0 - 7.5',
    ingredients: [
      { name: 'Coarse River Sand / Gritty Gravel', percentage: 40, purpose: 'Instant gravity drainage' },
      { name: 'Pumice / Perlite', percentage: 30, purpose: 'Porous aeration preventing wet rot' },
      { name: 'Garden Soil / Loam', percentage: 20, purpose: 'Mineral foundation and root grip' },
      { name: 'Aged Compost', percentage: 10, purpose: 'Minimal slow nutrient supply' }
    ],
    potAdvice: 'Always use porous unglazed terracotta pots. Never glaze the inside.',
    repotIntervalMonths: 24
  },
  {
    categoryName: 'Terrace Vegetables & Kitchen Greens (Tomato, Chilli, Brinjal, Keerai)',
    categoryNameTa: 'மாடித்தோட்ட காய்கறிகள் & கீரைகள் (தக்காளி, மிளகாய், வெண்டை)',
    idealPh: '6.2 - 6.8',
    ingredients: [
      { name: 'Red Loam Garden Soil', percentage: 35, purpose: 'Deep root anchorage and trace minerals' },
      { name: 'Vermicompost / Well-aged Cow Dung Manure', percentage: 35, purpose: 'Rich nitrogen, phosphorus, and organic matter' },
      { name: 'Coco Peat (Washed)', percentage: 20, purpose: 'Moisture conservation under intense roof sun' },
      { name: 'Neem Cake Powder + Crushed Eggshell Ash', percentage: 10, purpose: 'Nematode repellent and natural calcium source' }
    ],
    potAdvice: 'Use 12x12 to 18x18 inch UV-treated grow bags with 6 drainage punctures.',
    repotIntervalMonths: 12
  },
  {
    categoryName: 'Citrus & Fruit Trees (Lemon, Guava, Pomegranate, Fig in Pots)',
    categoryNameTa: 'தொட்டி பழ மரங்கள் (எலுமிச்சை, கொய்யா, மாதுளை)',
    idealPh: '6.0 - 6.5',
    ingredients: [
      { name: 'Rich Garden Loam', percentage: 40, purpose: 'Solid heavy base preventing tree topple' },
      { name: 'Composted Cattle Manure', percentage: 30, purpose: 'Heavy feeding nutrients for fruit formation' },
      { name: 'River Sand & Perlite', percentage: 15, purpose: 'Free-draining core preventing collar rot' },
      { name: 'Bone Meal + Wood Ash + Epsom Salt', percentage: 15, purpose: 'Phosphorus, potassium, and magnesium for sweet fruits' }
    ],
    potAdvice: 'Use 50 to 100-liter containers or half-drums with 1-inch drainage holes.',
    repotIntervalMonths: 24
  }
];

// Interactive Quiz Questions
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    topic: 'Plant Identification',
    question: 'Which plant is celebrated in Indian homes as the sacred adaptogen "Queen of Herbs"?',
    questionTa: 'இந்திய வீடுகளில் "மூலிகைகளின் அரசி" என வணங்கப்படும் புனித மருத்துவத் தாவரம் எது?',
    options: ['Money Plant', 'Tulsi (Holy Basil)', 'Aloe Vera', 'Snake Plant'],
    optionsTa: ['மணி பிளாண்ட்', 'துளசி', 'கற்றாழை', 'பாம்பு கற்றாழை'],
    correctAnswerIndex: 1,
    explanation: 'Tulsi (Ocimum tenuiflorum) is revered as the Queen of Herbs in Ayurveda for its remarkable adaptogenic, antibacterial, and respiratory healing properties.',
    explanationTa: 'துளசி ஆயுர்வேதத்தில் நோய் எதிர்ப்பு சக்தி தரும் முதன்மை புனித மூலிகையாக போற்றப்படுகிறது.'
  },
  {
    id: 'q2',
    topic: 'Photosynthesis & Biology',
    question: 'During photosynthesis, which gas do plants absorb from the air to synthesize carbohydrates?',
    questionTa: 'ஒளிச்சேர்க்கையின் போது தாவரங்கள் காற்றில் இருந்து எந்த வாயுவை உறிஞ்சி உணவைத் தயாரிக்கின்றன?',
    options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Methane'],
    optionsTa: ['ஆக்ஸிஜன் (பிராணவாயு)', 'கார்பன் டை ஆக்சைடு', 'நைட்ரஜன்', 'மீத்தேன்'],
    correctAnswerIndex: 1,
    explanation: 'Plants absorb carbon dioxide (CO2) through microscopic leaf pores called stomata and combine it with water and sunlight to create glucose and release oxygen.',
    explanationTa: 'இலைத்துளைகள் வழியாக கார்பன் டை ஆக்சைடை உறிஞ்சி, சூரிய ஒளி மற்றும் நீரைக் கொண்டு சர்க்கரையை உருவாக்கி பிராணவாயுவை வெளியிடுகின்றன.'
  },
  {
    id: 'q3',
    topic: 'Plant Diseases & Pests',
    question: 'What is the natural organic remedy for white powdery mildew coating rose and cucumber leaves?',
    questionTa: 'ரோஜா மற்றும் வெள்ளரி இலைகளில் தோன்றும் வெள்ளை சாம்பல் நோய்க்கு எளிய இயற்கை மருந்து எது?',
    options: ['Baking soda and mild soap spray', 'Bleach concentrate', 'Hot boiling water', 'Pure vinegar'],
    optionsTa: ['சமையல் சோடா மற்றும் சோப்பு நீர் கரைசல்', 'ப்ளீச்சிங் பவுடர்', 'கொதிக்கும் வெந்நீர்', 'வினிகர்'],
    correctAnswerIndex: 0,
    explanation: 'A mild solution of 1 tablespoon baking soda + 1/2 teaspoon liquid soap in 1 liter of water alters the surface pH, disrupting and killing fungal mycelium safely.',
    explanationTa: 'ஒரு லிட்டர் நீரில் 1 ஸ்பூன் பேக்கிங் சோடாவும் சிறிதளவு சோப்பும் கலந்து தெளித்தால் சாம்பல் பூஞ்சை முற்றிலும் அழியும்.'
  },
  {
    id: 'q4',
    topic: 'Soil & Nutrition',
    question: 'Which primary macronutrient in fertilizers is chiefly responsible for vibrant green leaf growth?',
    questionTa: 'தாவரங்களின் பசுமையான இலை வளர்ச்சிக்கு உதவும் முதன்மை தழைச்சத்து எது?',
    options: ['Phosphorus (P)', 'Potassium (K)', 'Nitrogen (N)', 'Calcium (Ca)'],
    optionsTa: ['பாஸ்பரஸ் (மணிச்சத்து)', 'பொட்டாசியம் (சாம்பல் சத்து)', 'நைட்ரஜன் (தழைச்சத்து)', 'கால்சியம் (சுண்ணாம்பு சத்து)'],
    correctAnswerIndex: 2,
    explanation: 'Nitrogen (N) is the essential component of amino acids and chlorophyll, driving lush green vegetative leaf and stem growth.',
    explanationTa: 'நைட்ரஜன் (தழைச்சத்து) பச்சையம் உருவாகி இலைகள் தழைத்து வளர பெரிதும் உதவுகிறது.'
  },
  {
    id: 'q5',
    topic: 'Plant Identification',
    question: 'Which popular indoor plant produces snake-like upright mottled blades and releases oxygen at night?',
    questionTa: 'இரவிலும் பிராணவாயு தந்து காற்றை தூய்மையாக்கும் நிமிர்ந்து வளரும் உட்புற கற்றாழை எது?',
    options: ['Peace Lily', 'Snake Plant (Sansevieria)', 'Rubber Plant', 'Boston Fern'],
    optionsTa: ['பீஸ் லில்லி', 'பாம்பு கற்றாழை (சான்செவேரியா)', 'ரப்பர் செடி', 'பாஸ்டன் பெர்ன்'],
    correctAnswerIndex: 1,
    explanation: 'Snake Plant (Dracaena trifasciata) uses Crassulacean Acid Metabolism (CAM) to open stomata and absorb CO2 at night, releasing fresh oxygen while you sleep.',
    explanationTa: 'பாம்பு கற்றாழை இரவிலும் இலைத்துளைகளை திறந்து கார்பன் டை ஆக்சைடை உறிஞ்சி தூய ஆக்சிஜனை வழங்குகிறது.'
  },
  {
    id: 'q6',
    topic: 'Plant Diseases & Pests',
    question: 'Why are French Marigolds planted alongside tomatoes and chillies in organic vegetable gardens?',
    questionTa: 'தக்காளி மற்றும் மிளகாய் செடிகளுக்கு அருகே சாமந்தி (மேரிகோல்ட்) நடுவது ஏன்?',
    options: ['To add purple color to the garden', 'Root exudates repel soil nematodes and flower scent deters whiteflies', 'To stop tomato plants from growing tall', 'To attract caterpillars'],
    optionsTa: ['அழகுக்காக மட்டுமே', 'இதன் வேர் நூற்புழுக்களை அழிக்கும் மற்றும் பூ வாசனை வெள்ளை ஈக்களை விரட்டும்', 'தக்காளி வளர்ச்சியை குறைக்க', 'புழுக்களை ஈர்க்க'],
    correctAnswerIndex: 1,
    explanation: 'Marigold roots produce alpha-terthienyl, an organic compound toxic to harmful root-knot nematodes, while their foliage emits limonene to repel flying pests.',
    explanationTa: 'சாமந்தியின் வேர்களில் இருந்து வெளியாகும் திரவம் கொடிய நூற்புழுக்களை அழிக்கிறது.'
  }
];

// Gamification Challenges
export const GARDENING_CHALLENGES: GardeningChallenge[] = [
  {
    id: 'challenge-1',
    title: 'Green Sprout Starter',
    titleTa: 'பசுமைத் தொடக்கம்',
    description: 'Add your first 3 companion plants into your My Plants digital garden.',
    descriptionTa: 'உங்கள் டிஜிட்டல் தோட்டத்தில் முதல் 3 தாவரங்களைச் சேர்த்து தொடங்குங்கள்.',
    points: 50,
    targetCount: 3,
    currentCount: 0,
    completed: false,
    badge: 'Sprout'
  },
  {
    id: 'challenge-2',
    title: 'Hydration Hero',
    titleTa: 'நீர்ப்பாசன சாதனையாளர்',
    description: 'Log 7 completed watering sessions on time without overdue delays.',
    descriptionTa: 'தாமதமின்றி 7 முறை சரியான நேரத்தில் செடிகளுக்கு நீர் பாய்ச்சி பதிவு செய்யுங்கள்.',
    points: 100,
    targetCount: 7,
    currentCount: 0,
    completed: false,
    badge: 'Droplets'
  },
  {
    id: 'challenge-3',
    title: 'Botanical Scholar',
    titleTa: 'தாவரவியல் அறிஞர்',
    description: 'Score 100% on any Plant Care & Biology Quiz with PLANTY.',
    descriptionTa: 'பிளாண்டியுடன் தாவர வினாடி வினாவில் 100% முழு மதிப்பெண் பெறுங்கள்.',
    points: 75,
    targetCount: 1,
    currentCount: 0,
    completed: false,
    badge: 'Award'
  },
  {
    id: 'challenge-4',
    title: 'Terrace Architect',
    titleTa: 'மாடித்தோட்ட வடிவமைப்பாளர்',
    description: 'Generate an AI layout plan for your Balcony or Terrace space.',
    descriptionTa: 'பால்கனி அல்லது மாடிக்கு AI மூலமாக தோட்ட திட்டத்தை உருவாக்குங்கள்.',
    points: 120,
    targetCount: 1,
    currentCount: 0,
    completed: false,
    badge: 'Sparkles'
  },
  {
    id: 'challenge-5',
    title: 'Plant Doctor Rescue',
    titleTa: 'தாவர மருத்துவர் மீட்பர்',
    description: 'Diagnose a leaf issue using AI Plant Doctor and view the organic cure.',
    descriptionTa: 'AI தாவர மருத்துவர் மூலம் இலை நோயை கண்டறிந்து இயற்கை சிகிச்சை பெறுங்கள்.',
    points: 90,
    targetCount: 1,
    currentCount: 0,
    completed: false,
    badge: 'ShieldCheck'
  }
];

// Default Cities for Weather-Based Care
export const WEATHER_CITIES: WeatherCondition[] = [
  {
    city: 'Chennai',
    temperatureC: 32,
    humidityPercent: 78,
    rainProbabilityPercent: 20,
    windSpeedKmh: 14,
    conditionText: 'Warm & Tropical Humidity',
    conditionIcon: 'sun',
    plantAdvice: 'High tropical humidity! Mist only indoor aroids; water terrace pots deeply before 8 AM to prevent root boiling.',
    plantAdviceTa: 'அதிக வெப்பம் மற்றும் ஈரப்பதம்! காலை 8 மணிக்குள் செடிகளுக்கு நீர் பாய்ச்சவும்.'
  },
  {
    city: 'Coimbatore',
    temperatureC: 28,
    humidityPercent: 62,
    rainProbabilityPercent: 15,
    windSpeedKmh: 18,
    conditionText: 'Pleasant & Breezy',
    conditionIcon: 'cloud',
    plantAdvice: 'Ideal gardening climate! Excellent time for propagation cuttings, repotting, and liquid seaweed fertilizer.',
    plantAdviceTa: 'இதமான தட்பவெப்பம்! புதிய செடிகளை நடவு செய்யவும், உரம் இடவும் மிகச் சிறந்த நேரம்.'
  },
  {
    city: 'Bangalore',
    temperatureC: 26,
    humidityPercent: 58,
    rainProbabilityPercent: 30,
    windSpeedKmh: 12,
    conditionText: 'Mild & Partly Cloudy',
    conditionIcon: 'cloud',
    plantAdvice: 'Moderate temperatures keep soil moist longer. Check upper soil before watering to avoid root dampness.',
    plantAdviceTa: 'மிதமான குளிர்ச்சி நிலவுவதால் மேல் மண் காய்ந்த பின்பே நீர் ஊற்றவும்.'
  },
  {
    city: 'Madurai',
    temperatureC: 35,
    humidityPercent: 48,
    rainProbabilityPercent: 5,
    windSpeedKmh: 11,
    conditionText: 'Intense Dry Heat',
    conditionIcon: 'sun',
    plantAdvice: 'Dry heat! Mulch root zones heavily with dried straw or dry leaves to reduce evaporation by 70%.',
    plantAdviceTa: 'கடும் வெப்பம்! ஈரப்பதம் காக்க செடிகளின் அடியில் காய்ந்த இலைகளால் மூடாக்கு போடுங்கள்.'
  },
  {
    city: 'Mumbai',
    temperatureC: 31,
    humidityPercent: 82,
    rainProbabilityPercent: 45,
    windSpeedKmh: 20,
    conditionText: 'Humid Coastal Breeze',
    conditionIcon: 'rain',
    plantAdvice: 'Check pot saucers: dump stagnant water to prevent mosquito breeding and fungus gnats in damp potting soil.',
    plantAdviceTa: 'தொட்டி தட்டுகளில் உள்ள தேங்கிய தண்ணீரை உடனே அகற்றி கொசுக்களை தவிருங்கள்.'
  },
  {
    city: 'Delhi',
    temperatureC: 24,
    humidityPercent: 45,
    rainProbabilityPercent: 10,
    windSpeedKmh: 9,
    conditionText: 'Mild & Clear Sky',
    conditionIcon: 'sun',
    plantAdvice: 'Wipe indoor foliage clean from ambient dust particles to optimize light photosynthesis absorption.',
    plantAdviceTa: 'இலைகளில் படிந்துள்ள தூசிகளை ஈரத்துணியால் துடைத்து ஒளிச்சேர்க்கையை கூட்டுங்கள்.'
  }
];
