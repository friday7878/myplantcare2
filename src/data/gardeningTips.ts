export interface GardeningTip {
  id: string;
  title: string;
  titleTa: string;
  category: 'Daily' | 'Seasonal' | 'Organic' | 'Kitchen' | 'Terrace' | 'Indoor' | 'Pest Control' | 'Compost' | 'Soil Improvement' | 'Sustainable';
  categoryTa: string;
  summary: string;
  summaryTa: string;
  content: string;
  contentTa: string;
  readTime: string;
  icon: string;
}

export const GARDENING_TIPS: GardeningTip[] = [
  {
    id: 'sour-buttermilk-tonic',
    title: 'The Miracle of Sour Buttermilk for Plant Health',
    titleTa: 'செடிகளுக்கு புளித்த மோரின் அற்புத பலன்கள்',
    category: 'Organic',
    categoryTa: 'இயற்கை முறை',
    summary: 'How 3-day fermented buttermilk kills fungus, prevents curl virus, and boosts leaf glossiness.',
    summaryTa: 'புளித்த மோர் எவ்வாறு பூஞ்சை நோய்களை தடுத்து இலைகளை பளபளப்பாக மாற்றுகிறது.',
    content: 'Dilute 100ml of sour, fermented buttermilk in 1 liter of fresh water. Spray generously on curry leaf, chilli, tomato, and rose foliage once every 10 days. The lactic acid bacteria act as a natural antifungal barrier against powdery mildew and black spot while nourishing leaves with calcium and nitrogen.',
    contentTa: 'நன்கு புளித்த மோரை (100 மி.லி) 1 லிட்டர் தண்ணீரில் கலந்து செடிகளின் மீது தெளித்தால் பூஞ்சை மற்றும் இலை சுருட்டல் நோய் குணமாகும்.',
    readTime: '3 min read',
    icon: 'Droplets'
  },
  {
    id: 'banana-peel-potassium-tea',
    title: 'Supercharge Flowering with Banana Peel Tea',
    titleTa: 'வாழைப்பழத் தோல் கரைசல்: அதிக பூக்கள் பூக்க ரகசியம்',
    category: 'Kitchen',
    categoryTa: 'சமையலறை கழிவு',
    summary: 'Zero-cost organic potassium fertilizer to multiply flower buds on roses, hibiscus, and tomatoes.',
    summaryTa: 'செம்பருத்தி மற்றும் ரோஜாவில் கொத்துக் கொத்தாக பூக்கள் பூக்க உதவும் பொட்டாசியம் கரைசல்.',
    content: 'Chop 3 ripe banana peels and soak them in 1 liter of water inside a closed jar for 3-4 days. Strain the amber liquid, dilute with an equal volume of plain water, and pour around the root zones of flowering and fruiting plants. Potassium strengthens stem capillaries, promotes larger blooms, and sweetens tomatoes.',
    contentTa: 'வாழைப்பழத் தோல்களை 3 நாட்கள் தண்ணீரில் ஊறவைத்து, அந்த தண்ணீரை செடிகளுக்கு ஊற்றி வந்தால் ஏராளமான புதிய மொட்டுகள் மலரும்.',
    readTime: '4 min read',
    icon: 'Sparkles'
  },
  {
    id: 'terrace-cooling-mulch',
    title: 'Terrace Garden Heat Protection & Soil Mulching',
    titleTa: 'மாடித் தோட்டத்தில் கோடை வெப்பத்தை தணிக்கும் மூடாக்கு',
    category: 'Terrace',
    categoryTa: 'மாடித் தோட்டம்',
    summary: 'Shield delicate roots from scorching 40°C heatwaves and cut watering requirements by 50%.',
    summaryTa: 'கோடையில் வேர்கள் கருகாமல் பாதுகாத்து தண்ணீர் தேவையை பாதியாக குறைப்பது எப்படி.',
    content: 'Container soil on rooftop terraces heats up rapidly during midday. Spread a 2-inch layer of dry leaves, straw, sugarcane bagasse, or coconut husks over the topsoil. Mulching stops evaporative moisture loss, keeps underground soil temperatures 8°C cooler, and promotes beneficial earthworm activity.',
    contentTa: 'காய்ந்த இலைகள் அல்லது தேங்காய் மட்டைகளை தொட்டியின் மேல் பகுதியில் மூடாக்காக பரப்பினால் மண்ணின் ஈரப்பதம் நீடிக்கும்.',
    readTime: '5 min read',
    icon: 'Sun'
  },
  {
    id: 'neem-oil-pest-shield',
    title: 'Complete Organic Pest Management with Cold-Pressed Neem Oil',
    titleTa: 'வேப்பெண்ணெய் பூச்சி விரட்டி தயாரிக்கும் சரியான முறை',
    category: 'Pest Control',
    categoryTa: 'பூச்சிக் கட்டுப்பாடு',
    summary: 'Eradicate aphids, mealybugs, whiteflies, and spider mites naturally without harsh synthetic chemicals.',
    summaryTa: 'செடிகளை தாக்கும் அசுவினி, மாவுப்பூச்சி மற்றும் வெள்ளை ஈக்களை இயற்கை முறையில் ஒழிக்கும் முறை.',
    content: 'Mix 5ml cold-pressed pure neem oil with 2ml of mild liquid dish soap or baby shampoo in 1 liter of lukewarm water. Shake vigorously until milky and homogeneous. Spray under leaf surfaces and along stem nodes during late evening. Neem contains azadirachtin, which disrupts insect feeding and breeding cycles while remaining non-toxic to honeybees.',
    contentTa: '1 லிட்டர் வெதுவெதுப்பான நீரில் 5 மி.லி வேப்பெண்ணெய் மற்றும் சில துளி சோப் கலந்து மாலையில் தெளித்தால் பூச்சிகள் முற்றிலும் அகலும்.',
    readTime: '4 min read',
    icon: 'ShieldCheck'
  },
  {
    id: 'vermicompost-gold',
    title: 'Black Gold: How to Apply Vermicompost Correctly',
    titleTa: 'கருப்பு தங்கம்: மண்புழு உரத்தை சரியாக பயன்படுத்தும் வழி',
    category: 'Compost',
    categoryTa: 'உர தயாரிப்பு',
    summary: 'The safest, most balanced plant food that never burns tender roots.',
    summaryTa: 'செடியின் வேர்களை கரிக்காமல் ஆரோக்கியமாக வளர்க்கும் முழுமையான சத்து.',
    content: 'Gently scrape the top 1 inch of soil around your pot rim (avoiding the main stem). Add 2-3 handfuls of premium vermicompost, blend it into the loosened topsoil, and water thoroughly. Worm castings deliver slow-release macro and micronutrients along with beneficial microbial enzymes that rebuild soil biology.',
    contentTa: 'தொட்டியின் மேல் மண்ணை லேசாக கிளறி 2 கைப்பிடி மண்புழு உரமிட்டு நீர் பாய்ச்சினால் செடி செழித்து வளரும்.',
    readTime: '3 min read',
    icon: 'Sprout'
  },
  {
    id: 'indoor-air-purifier-secrets',
    title: 'Maximizing Oxygen & Air Cleaning from Indoor Plants',
    titleTa: 'உட்புறத் தாவரங்கள் மூலம் வீட்டின் காற்றை சுத்திகரிப்பது எப்படி',
    category: 'Indoor',
    categoryTa: 'உட்புறத் தோட்டம்',
    summary: 'NASA clean air study principles: dust removal, placement, and species synergy.',
    summaryTa: 'நாசா ஆய்வின்படி வீட்டில் நச்சு காற்றை அகற்றும் எளிய தாவர வழிகாட்டுதல்.',
    content: 'Dust accumulates on indoor leaves and blocks up to 40% of their microscopic stomatal pores. Clean foliage once a month with a soft damp microfiber towel. Place Snake Plants and Peace Lilies in bedrooms because they release oxygen continuously during night hours through Crassulacean Acid Metabolism (CAM).',
    contentTa: 'இலைகளில் படியும் தூசியை துடைத்து வந்தால் தாவரங்கள் அதிக ஆக்சிஜனை வெளியிட்டு காற்றை தூய்மையாக்கும்.',
    readTime: '4 min read',
    icon: 'Wind'
  },
  {
    id: 'companion-planting-tomato-marigold',
    title: 'Companion Planting: The Tomato and Marigold Alliance',
    titleTa: 'கூட்டுப் பயிர் முறை: தக்காளி மற்றும் சாமந்தி தோழமை',
    category: 'Sustainable',
    categoryTa: 'நிலையான விவசாயம்',
    summary: 'How planting marigolds next to tomatoes repels root-knot nematodes and attracts bumblebee pollinators.',
    summaryTa: 'தக்காளியுடன் சாமந்தி செடியை வளர்ப்பதால் ஏற்படும் இயற்கை நன்மைகள்.',
    content: 'Marigold root exudates release alpha-terthienyl, a natural chemical compound that destroys harmful microscopic root-knot nematodes in the soil. At the same time, marigold flowers attract predatory ladybugs that devour tomato aphids and bring enthusiastic pollinators to fertilize your tomato flowers.',
    contentTa: 'தக்காளி செடியின் அருகில் சாமந்தி பூவை நட்டால் வேர்ப் புழுக்கள் அழியும் மற்றும் மகரந்தச் சேர்க்கை அதிகரிக்கும்.',
    readTime: '3 min read',
    icon: 'Flower2'
  },
  {
    id: 'monsoon-fungus-prevention',
    title: 'Monsoon Garden Care: Guarding Against Stem Rot',
    titleTa: 'மழைக்கால தோட்டப் பராமரிப்பு: அழுகல் நோயை தடுக்கும் வழிகள்',
    category: 'Seasonal',
    categoryTa: 'பருவகால பராமரிப்பு',
    summary: 'Crucial steps to drain pots, aerate roots, and apply Trichoderma viride bio-fungicide during wet spells.',
    summaryTa: 'தொடர் மழையில் வேர் அழுகல் ஏற்படாமல் தொட்டிகளை பாதுகாக்கும் அவசிய குறிப்புகள்.',
    content: 'During persistent rainy weather, elevate pots onto pot feet or brick edges so drain holes never get clogged by water pools. Sprinkle a tablespoon of Trichoderma viride or wood ash on the soil surface to suppress fungal damping-off. Avoid keeping saucers underneath pots during the monsoon.',
    contentTa: 'மழைக்காலத்தில் தொட்டிகளின் கீழ் தட்டுகளை அகற்றி, வடிகால் துளைகள் அடைக்காமல் செங்கற்கள் மீது ஏற்றி வைக்கவும்.',
    readTime: '4 min read',
    icon: 'CloudRain'
  }
];
