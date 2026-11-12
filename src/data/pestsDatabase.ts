export interface GardenPest {
  id: string;
  name: string;
  nameTa: string;
  scientificName: string;
  category: 'Sucking Pest' | 'Chewing Pest' | 'Boring Pest' | 'Soil Pest' | 'Mollusk / Other';
  severity: 'Critical' | 'High' | 'Moderate';
  imageUrl: string;
  shortDescription: string;
  shortDescriptionTa: string;
  affectedPlants: string[];
  symptoms: string[];
  symptomsTa: string[];
  identificationMarks: string;
  identificationMarksTa: string;
  lifeCycle: string;
  lifeCycleTa: string;
  physicalRemoval: string[];
  physicalRemovalTa: string[];
  saferBiologicalControls: string[];
  saferBiologicalControlsTa: string[];
  prevention: string[];
  preventionTa: string[];
  chemicalWarnings: string;
  chemicalWarningsTa: string;
}

export const PESTS_DATABASE: GardenPest[] = [
  {
    id: 'aphids',
    name: 'Aphids (Plant Lice)',
    nameTa: 'அசுவினி பூச்சி (இலைப்பேன் உறவு)',
    scientificName: 'Aphis gossypii & Myzus persicae',
    category: 'Sucking Pest',
    severity: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Tiny soft-bodied pear-shaped insects clustering in dense colonies under leaves and tender buds, sucking sap and secreting sticky honeydew.',
    shortDescriptionTa: 'இலைகளின் அடியிலும் நுனிக் குருத்துகளிலும் கொத்துக் கொத்தாக மொய்த்து சாறை உறிஞ்சும் மெல்லிய பூச்சிகள். தேன் போன்ற பிசுபிசுப்பான கழிவை வெளியேற்றும்.',
    affectedPlants: ['Hibiscus', 'Chilli', 'Rose', 'Tomato', 'Cowpea', 'Avarakkai', 'Citrus'],
    symptoms: [
      'Curled, puckered, or twisted young shoot tips',
      'Sticky glossy honeydew on foliage attracting ants and black sooty mold',
      'Stunted growth and yellowing leaf drop'
    ],
    symptomsTa: [
      'இளங்குருத்துகள் சுருண்டு வளர்ச்சி குன்றுதல்',
      'இலைகளில் பிசுபிசுப்பான தேன் பசை படிந்து கரும்பூஞ்சை படர்தல்',
      'இலைகள் மஞ்சள் நிறமாகி உதிர்தல்'
    ],
    identificationMarks: 'Tiny (1-2mm) green, black, or yellow pear-shaped bugs with twin tailpipe cornicles on rear.',
    identificationMarksTa: '1-2 மிமீ அளவுடைய பச்சை, கருப்பு அல்லது மஞ்சள் நிற பேன்கள்.',
    lifeCycle: '7-10 days from nymph to reproducing adult; reproduces without mating (parthenogenesis).',
    lifeCycleTa: '7-10 நாட்களில் அடுத்த தலைமுறையை உருவாக்கும் அதிவேக இனப்பெருக்கம்.',
    physicalRemoval: [
      'Blast undersides of leaves with a sharp jet of cold garden hose water to dislodge colonies',
      'Prune off heavily encrusted shoot tips and dispose in soapy bucket'
    ],
    physicalRemovalTa: [
      'குளிர்ந்த தண்ணீரை வேகமாக பீய்ச்சியடித்து பூச்சிகளை கீழே தள்ளவும்',
      'அதிகம் மொய்த்துள்ள நுனிக் கிளைகளை கவாத்து செய்து சோப் தண்ணீரில் போடவும்'
    ],
    saferBiologicalControls: [
      'Release or protect natural Ladybird beetles (பொன் வண்டு) which devour 50 aphids per day',
      'Spray cold-pressed Neem Oil (5ml/L) + castile soap (2ml/L) thoroughly',
      'Sour buttermilk (100ml/L) + asafoetida (1g/L) bio-wash'
    ],
    saferBiologicalControlsTa: [
      'நன்மை செய்யும் பொன்வண்டுகளை பாதுகாக்கவும',
      '5 மிலி வேப்பெண்ணெய் + 2 மிலி சோப் கரைசல் தெளிக்கவும்',
      'புளித்த மோர் மற்றும் பெருங்காயக் கரைசல் தெளிக்கவும்'
    ],
    prevention: [
      'Hang yellow sticky cards at canopy height to catch flying winged aphids',
      'Avoid excess chemical nitrogen fertilizers which create weak, succulent sugary flush leaves',
      'Plant French Marigolds and Coriander as companion barrier plants'
    ],
    preventionTa: [
      'மஞ்சள் ஒட்டும் அட்டைகளை செடிகளுக்கு அருகில் கட்டவும்',
      'அதிக தழைச்சத்து ரசாயன உரங்களை தவிர்க்கவும்',
      'சாமந்தி மற்றும் கொத்தமல்லியை ஊடுபயிராக நடவும்'
    ],
    chemicalWarnings: 'Never use synthetic pyrethroids or organophosphates; they kill pollinating honeybees and exterminate natural predatory ladybugs, triggering massive aphid rebound outbreaks.',
    chemicalWarningsTa: 'ரசாயன விஷ மருந்துகளை அடிக்காதீர்கள்; அவை நன்மை செய்யும் தேனீக்களையும் பொன்வண்டுகளையும் அழித்து பூச்சிகளை மேலும் அதிகரிக்கச் செய்யும்.'
  },
  {
    id: 'mealybugs',
    name: 'Mealybugs',
    nameTa: 'மாவுப்பூச்சி (வெள்ளை மாவுப்பூச்சி)',
    scientificName: 'Planococcus citri & Phenacoccus solenopsis',
    category: 'Sucking Pest',
    severity: 'Critical',
    imageUrl: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Cottony white wax-covered scale insects lodging in leaf axils, flower buds, and roots, causing severe bunchy distortion.',
    shortDescriptionTa: 'பஞ்சு போன்ற வெள்ளை மெழுகு படலத்துடன் தண்டு மற்றும் இலை இடுக்குகளில் ஒட்டிக்கொண்டு சாறு உறிஞ்சும் கொடிய பூச்சி.',
    affectedPlants: ['Hibiscus', 'Papaya', 'Guava', 'Tomato', 'Croton', 'Rose', 'Curry Leaf', 'Monstera'],
    symptoms: [
      'Fluffy white cotton deposits visible in branch forks and bud clusters',
      'Flower buds turn yellow and abort before opening',
      'Black sooty mold carpet coating leaves under mealybug infestations'
    ],
    symptomsTa: [
      'கிளைகளின் இடுக்குகளில் வெள்ளை பஞ்சு போன்ற திட்டுக்கள்',
      'பூ மொட்டுகள் விரியாமல் மஞ்சள் நிறமாகி உதிர்ந்து போதல்',
      'செடி முழுவதும் கருமை படர்தல்'
    ],
    identificationMarks: 'Oval segmented pinkish bodies protected under a waterproof powdery white wax coating.',
    identificationMarksTa: 'நீள்வட்ட வடிவில் வெள்ளை மெழுகு பூசிய உடல்.',
    lifeCycle: 'Females lay 300-600 eggs inside waxy sacs; nymphs crawl actively to find hiding niches.',
    lifeCycleTa: 'வெள்ளை பஞ்சு பைகளில் 300-600 முட்டைகளை இடும்.',
    physicalRemoval: [
      'Dip a cotton swab in 70% rubbing alcohol and touch each mealybug directly to dissolve its wax barrier',
      'Wipe stems with warm soapy water sponge'
    ],
    physicalRemovalTa: [
      'ஆல்கஹாலில் நனைத்த பஞ்சு கொண்டு பூச்சிகளை துடைத்து அகற்றவும்',
      'சோப் நீரில் நனைத்த துணியால் தண்டுகளை துடைக்கவும்'
    ],
    saferBiologicalControls: [
      'Spray Beauveria bassiana (10g/L) bio-pesticide which parasitize mealybug cuticle',
      'High-pressure spray of 10ml Neem oil + 5ml soap per liter of warm water'
    ],
    saferBiologicalControlsTa: [
      'பியூவேரியா பேசியானா இயற்கை பூஞ்சாண பூச்சிக்கொல்லி தெளிக்கவும்',
      'வெதுவெதுப்பான நீரில் 10 மிலி வேப்பெண்ணெய் சோப் கரைசல்'
    ],
    prevention: [
      'Stop ants from farming mealybugs: apply grease or tree banding tape around trunk base',
      'Isolate newly purchased nursery plants for 14 days before adding to garden',
      'Prune and safely burn heavily infested individual branches'
    ],
    preventionTa: [
      'எறும்புகள் தொட்டிகளில் ஏறாமல் வேப்பெண்ணெய் பட்டை கட்டவும்',
      'நர்சரியிலிருந்து வாங்கும் புதிய செடிகளை 14 நாட்கள் தனியாக வைத்து கண்காணிக்கவும்'
    ],
    chemicalWarnings: 'Systemic synthetic insecticides fail against mealybugs due to their hydrophobic waxy shield, but poison the soil microbiome. Use physical and oil-soap controls instead.',
    chemicalWarningsTa: 'மெழுகு பூச்சு உள்ளதால் ரசாயன மருந்துகள் வேலை செய்யாது; மண்ணை பாழாக்கும். வேப்பெண்ணெய் சோப் கரைசலே சிறந்தது.'
  },
  {
    id: 'whiteflies',
    name: 'Whiteflies',
    nameTa: 'வெள்ளை ஈக்கள்',
    scientificName: 'Bemisia tabaci & Trialeurodes vaporariorum',
    category: 'Sucking Pest',
    severity: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1596720426673-e4e14290f0cc?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Tiny moth-like white insects fluttering in clouds when plant leaves are shaken. Primary vector for lethal plant mosaic viruses.',
    shortDescriptionTa: 'இலைகளை அசைக்கும் போது கூட்டமாக பறக்கும் குட்டி வெள்ளை ஈக்கள். கொடிய வைரஸ் நோய்களை ஒரு செடியிலிருந்து அடுத்த செடிக்கு பரப்பும் பிரதான காரணி.',
    affectedPlants: ['Tomato', 'Chilli', 'Okra', 'Brinjal', 'Papaya', 'Cucumber', 'Poinsettia'],
    symptoms: [
      'Swarm of tiny white motes fluttering upwards when foliage is gently brushed',
      'Leaves develop chlorotic mottled yellow spotting and silvering',
      'Viral leaf curl and yellow mosaic symptoms spreading across garden'
    ],
    symptomsTa: [
      'செடியைத் தொட்டதும் வெண் பூச்சிகள் கூட்டமாக பறத்தல்',
      'இலைகள் வெளுத்து மஞ்சள் தேமல் போன்று மாறுதல்',
      'இலைச்சுருட்டல் மற்றும் நரம்பு வெளிர்தல் வைரஸ் பரவுதல்'
    ],
    identificationMarks: 'Tiny (1mm) pure white triangular wings held roof-like over pale yellow bodies.',
    identificationMarksTa: '1 மிமீ அளவுள்ள வெண் சிறகுகள் கொண்ட சிறு ஈக்கள்.',
    lifeCycle: 'Complete metamorphosis in 21 days; nymphs feed stationary on leaf undersides.',
    lifeCycleTa: '21 நாட்களில் முழு வளர்ச்சி அடையும்.',
    physicalRemoval: [
      'Vacuum foliage gently with handheld car vacuum cleaner in early cool morning',
      'Install yellow sticky traps right at canopy height'
    ],
    physicalRemovalTa: [
      'அதிகாலையில் மஞ்சள் ஒட்டும் பொறிகளை செடிகளின் மேல் மட்டத்தில் கட்டவும்'
    ],
    saferBiologicalControls: [
      'Verticillium lecanii bio-fungicide spray targeting underside nymphs',
      'Neem seed kernel extract (NSKE 5%) spray early morning'
    ],
    saferBiologicalControlsTa: [
      'வேப்பங்கொட்டை கரைசல் (5%) அல்லது வெர்ட்டிசீலியம் லெக்கானி தெளிக்கவும்'
    ],
    prevention: [
      'Erect fine nylon insect netting (40 mesh) over nursery beds',
      'Intercrop with marigolds and basil to mask host plant odors',
      'Eliminate nearby weed hosts (Parthenium, Abutilon)'
    ],
    preventionTa: [
      '40 மெஷ் கொசுவலை அமைத்து நாற்றுகளை பாதுகாக்கவும்',
      'பார்த்தீனியம் போன்ற களைகளை தோட்டத்தில் வளர விடாமல் பிடுங்கவும்'
    ],
    chemicalWarnings: 'Whiteflies develop chemical resistance to synthetic pesticides faster than almost any other insect. Rely strictly on yellow sticky traps and neem kernel extracts.',
    chemicalWarningsTa: 'வெள்ளை ஈக்கள் ரசாயன மருந்துகளுக்கு எதிர்ப்பு திறனை எளிதில் பெற்றுவிடும். மஞ்சள் அட்டையே சிறந்த நிரந்தர தீர்வு.'
  },
  {
    id: 'spider-mites',
    name: 'Red Spider Mites',
    nameTa: 'சிவப்பு சிலந்திப் பேன்',
    scientificName: 'Tetranychus urticae',
    category: 'Sucking Pest',
    severity: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1596720426673-e4e14290f0cc?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Microscopic eight-legged arachnids spinning fine silk webbing between leaves, causing stippled bronzed leaves in hot dry weather.',
    shortDescriptionTa: 'வெயில் காலத்தில் இலைகளுக்கு இடையே மெல்லிய சிலந்தி வலை பின்னி, சாறு உறிஞ்சி இலைகளை வெண்கல நிறமாக மாற்றும் நுண்ணிய சிலந்திப் பூச்சிகள்.',
    affectedPlants: ['Rose', 'Marigold', 'Jasmine', 'Brinjal', 'Tomato', 'Money Plant', 'Beans'],
    symptoms: [
      'Tiny yellow or white specks (stippling) peppered over upper leaf surfaces',
      'Delicate silky webs strung between leaf axils, stems, and flower petals',
      'Leaves turn dry, bronzed, brittle, and drop off in hot weather'
    ],
    symptomsTa: [
      'இலைகளில் மணல் தூவியது போன்ற வெள்ளை/மஞ்சள் சிறு புள்ளிகள்',
      'இலைகளுக்கு இடையில் மெல்லிய சிலந்தி வலைகள்',
      'இலைகள் வெண்கல நிறமாகி காய்ந்து உதிர்தல்'
    ],
    identificationMarks: 'Pinhead microscopic red or amber dots crawling along silk webbing (shake leaf over white paper to confirm).',
    identificationMarksTa: 'வெள்ளை காகிதத்தில் இலைகளை தட்டிப் பார்த்தால் நகரும் சிறு சிவப்பு புள்ளிகள்.',
    lifeCycle: 'Explodes from egg to adult in just 5 days during hot dry weather (>30°C).',
    lifeCycleTa: 'வெப்பமான வறண்ட காற்றில் 5 நாட்களிலேயே பல மடங்கு பெருகும்.',
    physicalRemoval: [
      'Misting plants with cold water daily creates humidity that suppresses mite breeding',
      'Wipe both sides of leaves with damp microfiber cloth'
    ],
    physicalRemovalTa: [
      'இலைகளின் அடியில் குளிர்ந்த நீர் ஸ்ப்ரே செய்து ஈரப்பதத்தை அதிகரிக்கவும்'
    ],
    saferBiologicalControls: [
      'Wettable sulfur (2g/L) spray in early morning (do not apply sulfur within 30 days of oil sprays)',
      'Horticultural soap spray (5ml/L) dissolving mite cellular membranes',
      'Predatory Phytoseiidae mites that hunt spider mites'
    ],
    saferBiologicalControlsTa: [
      'நனைக்கும் கந்தகம் (Sulfur 2 கிராம்/லிட்டர்) காலையில் தெளிக்கவும்',
      'இயற்கை சோப் கரைசல்'
    ],
    prevention: [
      'Keep humidity around indoor and terrace plants above 50%',
      'Never allow container plants to dry out completely in hot summer breezes'
    ],
    preventionTa: [
      'மாடித்தோட்டத்தில் காற்றில் ஈரப்பதம் குறையாமல் செடிகளை நெருக்கமாக வைக்கவும்'
    ],
    chemicalWarnings: 'Do NOT spray broad-spectrum insecticides like Malathion or Carbaryl; they kill predatory mites and cause devastating secondary spider mite population explosions.',
    chemicalWarningsTa: 'ரசாயன பூச்சிக்கொல்லிகளை அடிக்காதீர்கள்; அவை சிலந்தியை உண்ணும் நன்மை தரும் பூச்சிகளை கொன்று சிலந்தி பெருக்கத்தை 10 மடங்கு அதிகரிக்கும்.'
  },
  {
    id: 'thrips',
    name: 'Chilli & Flower Thrips',
    nameTa: 'இலைப்பேன் (சுருட்டுப் பேன்)',
    scientificName: 'Scirtothrips dorsalis & Frankliniella occidentalis',
    category: 'Sucking Pest',
    severity: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Slender fringe-winged micro-insects that rasp plant cells and sip sap, making leaf margins curl boat-like upwards.',
    shortDescriptionTa: 'இலைகளின் நரம்புகளை சுரண்டி சாறு உறிஞ்சும் மெல்லிய பூச்சிகள். இலை விளிம்புகளை மேல்நோக்கி படகு போல சுருளச் செய்யும்.',
    affectedPlants: ['Chilli', 'Capsicum', 'Rose', 'Grapes', 'Groundnut', 'Onion', 'Carnation'],
    symptoms: [
      'Leaves curl upward like a boat with thickened, brittle crinkled texture',
      'Silvery or bronzed scars on fruit skin and underside of leaves',
      'Flower buds brown at edges and fail to unfold'
    ],
    symptomsTa: [
      'மிளகாய் இலைகள் மேல்நோக்கி படகு போல சுருண்டு தடிமனாதல்',
      'இலை அடியில் வெள்ளி போன்ற கீறல் கோடுகள்',
      'பூ மொட்டுகள் விரியாமல் கருகிப் போதல்'
    ],
    identificationMarks: 'Tiny (0.5 - 1.5mm) yellowish-brown torpedo-shaped bugs with hair-fringed wings.',
    identificationMarksTa: '0.5-1.5 மிமீ அளவுள்ள மஞ்சள்-பழுப்பு நிற கூர்மையான பூச்சிகள்.',
    lifeCycle: '15-20 days; pupation occurs in the topsoil layer under the plant.',
    lifeCycleTa: '15-20 நாட்கள்; கூட்டுப்புழுக்கள் தொட்டி மண்ணிலேயே வாழும்.',
    physicalRemoval: [
      'Hang bright blue sticky cards (thrips are strongly attracted to royal blue)',
      'Mulch soil with reflective silver foil sheets to disorient incoming thrips'
    ],
    physicalRemovalTa: [
      'நீல நிற ஒட்டும் அட்டைகளை தொங்கவிடவும் (இலைப்பேன் நீல நிறத்திற்கு ஈர்க்கப்படும்)',
      'மண்ணின் மேல் சில்வர் காகித மூடாக்கு போடவும்'
    ],
    saferBiologicalControls: [
      'Spray Agni Asthram (chilli-garlic-ginger-neem fermented decoction) diluted 1:20 in water',
      'Spinosad bio-ferment spray (follow organic OMRI guidelines)',
      'Sour buttermilk (100ml/L) + asafoetida (2g/L)'
    ],
    saferBiologicalControlsTa: [
      'அக்னி அஸ்திரம் மூலிகை பூச்சிக்கொல்லி கரைசல் தெளிக்கவும்',
      'புளித்த மோர் மற்றும் பெருங்காய கரைசல்'
    ],
    prevention: [
      'Rake and loosen topsoil around plants to expose subterranean thrip pupae to hot sun',
      'Keep companion plants like French Marigolds and Onion borders'
    ],
    preventionTa: [
      'தொட்டி மேல் மண்ணை கிளறிவிட்டு வெயில் படும்படி வைக்கவும்'
    ],
    chemicalWarnings: 'Excessive chemical spraying breeds super-resistant thrips and contaminates edible chilli peppers. Stick to blue sticky sheets and neem-buttermilk washes.',
    chemicalWarningsTa: 'மிளகாயில் ரசாயனம் தெளித்தால் நச்சுத்தன்மை உணவில் சேரும்; நீல அட்டை மற்றும் மோர் கரைசலே பாதுகாப்பானது.'
  },
  {
    id: 'scale-insects',
    name: 'Armored & Soft Scale Insects',
    nameTa: 'செதில் பூச்சி (கவசப் பூச்சி)',
    scientificName: 'Coccus viridis & Aspidiotus nerii',
    category: 'Sucking Pest',
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Immobile shell-like brown or green bumps cemented permanently onto woody stems, twigs, and leaf veins, draining sap.',
    shortDescriptionTa: 'கிளைகள் மற்றும் நரம்புகளில் ஆமை ஓடு போல கெட்டியாக ஒட்டிக்கொண்டு அசையாமல் வாழும் பழுப்பு/பச்சை செதில் பூச்சிகள்.',
    affectedPlants: ['Citrus / Lemon', 'Curry Leaf', 'Guava', 'Oleander', 'Ficus', 'Mango', 'Orchids'],
    symptoms: [
      'Raised waxy brown or green dome-shaped bumps clustered along woody stems and leaf midribs',
      'Yellow chlorotic patches on leaf surfaces opposite where scales sit',
      'Sticky honeydew attracting columns of black ants'
    ],
    symptomsTa: [
      'தண்டுகளில் வரிசையாக ஒட்டியுள்ள ஆமை ஓடு போன்ற செதில்கள்',
      'இலைகள் மஞ்சள் நிறமாகி உதிர்தல்',
      'எறும்புகளின் நடமாட்டம் அதிகரித்தல்'
    ],
    identificationMarks: 'Looks like plant blisters or bark scale rather than living bugs (scrape with fingernail to reveal soft body under wax dome).',
    identificationMarksTa: 'மரப்பட்டையின் கொப்புளம் போல தோற்றமளிக்கும்.',
    lifeCycle: 'Only tiny "crawler" nymphs move; once they settle, they secrete hard protective shell and never move again.',
    lifeCycleTa: 'இளம் குஞ்சுகள் மட்டுமே நகரும்; கவசம் உருவான பின் ஓரிடத்திலேயே இருக்கும்.',
    physicalRemoval: [
      'Gently scrape off scales using an old soft toothbrush dipped in soapy water',
      'Prune severely encrusted dead twigs'
    ],
    physicalRemovalTa: [
      'பழைய பல் துலக்கும் பிரஷ்ஷை சோப் தண்ணீரில் நனைத்து செதில்களை தேய்த்து அகற்றவும்'
    ],
    saferBiologicalControls: [
      'Horticultural mineral oil or Neem oil (10ml/L) spray which suffocates the breathing pores under shells',
      'Encourage parasitic Encarsia micro-wasps'
    ],
    saferBiologicalControlsTa: [
      'வேப்பெண்ணெய் (10 மிலி/லிட்டர்) தெளித்து செதில்களின் சுவாசத்தை அடைத்து அழிக்கவும்'
    ],
    prevention: [
      'Band tree trunks with sticky tree barrier to prevent worker ants from defending scales from predators',
      'Keep citrus canopies well-ventilated through annual center pruning'
    ],
    preventionTa: [
      'மரத்தின் அடிப்பகுதியில் பசைப் பட்டை கட்டி எறும்புகள் ஏறுவதை தடுக்கவும்'
    ],
    chemicalWarnings: 'Pesticides bounce off the hard armored scale shell like rain off a turtle shell. Only horticultural oils that suffocate the shell provide genuine control.',
    chemicalWarningsTa: 'கடினமான கவசம் உள்ளதால் ரசாயன தெளிப்புகள் பயனளிக்காது. வேப்பெண்ணெய் கரைசலே சிறந்தது.'
  },
  {
    id: 'caterpillars-leaf-eating',
    name: 'Leaf-Eating Caterpillars & Loopers',
    nameTa: 'இலை தின்னும் புழுக்கள் (கம்பளிப்பூச்சி / பச்சைப்புழு)',
    scientificName: 'Spodoptera litura & Helicoverpa armigera',
    category: 'Chewing Pest',
    severity: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Voracious larvae of nocturnal moths chewing ragged irregular holes in leaves, defoliating whole branches in a single night.',
    shortDescriptionTa: 'இரவில் இலைகளை மென்று தின்று எலும்புக்கூடு போல ஆக்கும் பச்சை மற்றும் கரும்பழுப்பு நிறப் புழுக்கள்.',
    affectedPlants: ['Castor', 'Cabbage', 'Cauliflower', 'Tomato', 'Rose', 'Curry Leaf', 'Amaranthus'],
    symptoms: [
      'Large irregular scalloped bites eaten out of leaf edges and flower petals',
      'Leaves reduced to bare skeletal vein skeletons',
      'Black pellet-like frass (droppings) littering leaf surfaces beneath feeding sites'
    ],
    symptomsTa: [
      'இலைகள் கடித்து தின்னப்பட்டு ஓட்டைகளாக மாறுதல்',
      'நரம்புகள் மட்டுமே மிஞ்சும் எலும்புக்கூடு இலைகள்',
      'இலைகளின் மேல் கருப்பு உருண்டை புழுக்களின் எச்சங்கள்'
    ],
    identificationMarks: 'Fat smooth green or brown striped caterpillars; hairy caterpillars with irritating stinging setae.',
    identificationMarksTa: 'பச்சை அல்லது பழுப்பு நிற தடித்த புழுக்கள்; முடிகள் நிறைந்த கம்பளிப்பூச்சிகள்.',
    lifeCycle: 'Moth lays egg masses under leaves; larvae feed aggressively for 18 days before soil pupation.',
    lifeCycleTa: '18 நாட்கள் தீவிரமாக இலைகளை தின்று மண்ணில் கூட்டுப்புழுவாகும்.',
    physicalRemoval: [
      'Handpick caterpillars in early morning or at night using a torchlight and drop into bucket of soapy water',
      'Crush white woolly egg masses found under leaves before they hatch'
    ],
    physicalRemovalTa: [
      'அதிகாலையில் அல்லது டார்ச் அடித்து புழுக்களை கையால் பிடித்து சோப் தண்ணீரில் போடவும்',
      'இலைகளுக்கு அடியில் உள்ள முட்டை குவியல்களை நசுக்கி அழிக்கவும்'
    ],
    saferBiologicalControls: [
      'Bacillus thuringiensis (Bt - 2g/L) biological spray (safe for humans, bees, and pets; paralyzes caterpillar gut)',
      'Neem oil spray (5ml/L) acting as feeding deterrent and insect growth regulator'
    ],
    saferBiologicalControlsTa: [
      'பேசில்லஸ் துரிஞ்சியென்சிஸ் (Bt இயற்கை பாக்டீரியா 2 கிராம்/லிட்டர்) தெளிக்கவும்',
      'வேப்பெண்ணெய் தெளிப்பு'
    ],
    prevention: [
      'Install solar or kerosene light traps at night to catch adult egg-laying moths',
      'Cover vegetable rows with lightweight floating row covers'
    ],
    preventionTa: [
      'இரவில் விளக்குப் பொறி வைத்து தாய் அந்துப்பூச்சிகளை கவர்ந்து அழிக்கவும்'
    ],
    chemicalWarnings: 'Do NOT use Monocrotophos or Chlorpyrifos on leafy greens and vegetables; highly neurotoxic to humans and domestic animals.',
    chemicalWarningsTa: 'கீரை மற்றும் காய்கறிகளில் மோனோகுரோட்டோபாஸ் போன்ற கொடிய நஞ்சுகளை தெளிக்காதீர்கள்.'
  },
  {
    id: 'leaf-miners',
    name: 'Leaf Miners',
    nameTa: 'இலைச்சுரங்கப் புழு (சுரங்கப் பூச்சி)',
    scientificName: 'Liriomyza trifolii',
    category: 'Chewing Pest',
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1596720426673-e4e14290f0cc?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Tiny fly larvae tunneling inside the cellular layer between leaf surfaces, leaving winding white serpentine scribble trails.',
    shortDescriptionTa: 'இலையின் மேல் மற்றும் கீழ் தோலுக்கு நடுவே சுரங்கம் தோண்டி தின்னும் புழுக்கள். இலை மேல் வெள்ளை நிற கோல வடிவ கோடுகள் தோன்றும்.',
    affectedPlants: ['Tomato', 'Cucumber', 'Watermelon', 'Ridge Gourd', 'Citrus', 'Keerai', 'Beans'],
    symptoms: [
      'Irregular serpentine white scribbles and winding trails etched through leaf blades',
      'End of the trail shows a slightly swollen blister containing the tiny yellow maggot',
      'Extensive tunneling causes leaves to dry up like paper and scorch under direct sun'
    ],
    symptomsTa: [
      'இலைகளின் மேல் வெள்ளை நிற பாம்பு போன்ற வளைந்து நெளிந்த கோடுகள்',
      'கோட்டின் முடிவில் சிறு புழு தென்படுதல்',
      'இலைகள் காய்ந்து வெயிலில் கருகிப் போதல்'
    ],
    identificationMarks: 'Tiny (1-2mm) translucent yellow maggots hidden inside the leaf sandwich; adult is a minute black and yellow fly.',
    identificationMarksTa: 'இலைக்குள்ளே ஒளிந்திருக்கும் 1 மிமீ மஞ்சள் புழு.',
    lifeCycle: '14-21 days; larva cuts a slit in the leaf and drops into soil to pupate.',
    lifeCycleTa: '14-21 நாட்களில் இலை பிளந்து மண்ணில் விழுந்து கூட்டுப்புழுவாகும்.',
    physicalRemoval: [
      'Pinch and crush the tiny maggot directly inside the leaf trail with finger and thumb without tearing the leaf',
      'Snip off heavily tunneled individual leaves and discard in garbage (do not compost)'
    ],
    physicalRemovalTa: [
      'கோட்டின் முடிவில் இருக்கும் புழுவை விரலால் நசுக்கி அழிக்கவும்',
      'அதிகம் பாதிக்கப்பட்ட இலைகளை வெட்டி அப்புறப்படுத்தவும்'
    ],
    saferBiologicalControls: [
      'Neem oil spray (5ml/L) absorbed translaminarly into leaf tissue, disrupting larval development',
      'Castor oil-based yellow sticky sheets catching adult flies'
    ],
    saferBiologicalControlsTa: [
      'வேப்பெண்ணெய் கரைசல் தெளித்தால் இலைக்குள் ஊடுருவி புழுவை அழிக்கும்',
      'மஞ்சள் ஒட்டும் பொறி'
    ],
    prevention: [
      'Hang yellow sticky traps 6 inches above canopy to intercept adult egg-laying flies',
      'Deeply fork and sun-bake container potting soil between crop cycles to destroy pupae'
    ],
    preventionTa: [
      'மஞ்சள் ஒட்டும் அட்டைகள் கட்டி தாய் ஈக்களை பிடிக்கவும்'
    ],
    chemicalWarnings: 'Chemical contact sprays cannot penetrate inside the leaf cuticle where the larva feeds. Translaminar neem oil and physical crushing are far more effective and 100% non-toxic.',
    chemicalWarningsTa: 'இலைக்குள் புழு இருப்பதால் சாதாரண ரசாயன மருந்து வேலை செய்யாது. வேப்பெண்ணெய் மட்டுமே ஊடுருவும்.'
  },
  {
    id: 'fruit-flies',
    name: 'Bactrocera Fruit Flies',
    nameTa: 'பழ ஈக்கள் (காய் ஈ / புழு நெளியும் நோய்)',
    scientificName: 'Bactrocera cucurbitae & B. dorsalis',
    category: 'Chewing Pest',
    severity: 'Critical',
    imageUrl: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Female flies pierce developing fruits with sharp needle ovipositor to inject eggs, causing maggots to hatch inside and rot the fruit.',
    shortDescriptionTa: 'பிஞ்சு காய்கள் மற்றும் பழங்களின் தோலை துளையிட்டு முட்டையிடும் ஈக்கள். உள்ளே புழுக்கள் நெளிந்து பழம் அழுகி நாசமாகும்.',
    affectedPlants: ['Mango', 'Guava', 'Gourds (Snake, Bitter, Ridge, Bottle)', 'Papaya', 'Tomato'],
    symptoms: [
      'Tiny pinprick puncture with a droplet of resin or brown sap oozing from fruit skin',
      'Fruit curves, deforms, and ripens prematurely with a soft watery rotten patch',
      'Cutting open fruit reveals dozens of wriggling white headless maggots'
    ],
    symptomsTa: [
      'காயில் ஊசி குத்தியது போன்ற சிறு துளையிலிருந்து பிசின் வடிதல்',
      'காய் கோணலாகி முன்கூட்டியே பழுத்து அழுகுதல்',
      'பழத்தை வெட்டினால் உள்ளே வெள்ளை புழுக்கள் நெளிதல்'
    ],
    identificationMarks: 'Adult fly resembles a tiny wasp with patterned clear wings, yellow chest stripes, and swollen abdomen.',
    identificationMarksTa: 'குளவி போன்ற தோற்றம் கொண்ட மஞ்சள் வரிகள் உடைய ஈ.',
    lifeCycle: 'Eggs hatch in 24 hours; maggots feed for 8 days, then hop out into soil to pupate.',
    lifeCycleTa: '24 மணி நேரத்தில் முட்டை பொரித்து புழுக்கள் பழத்தை தின்னும்.',
    physicalRemoval: [
      'Bag individual tender fruits in paper, cloth, or micro-mesh fruit bags when marble-sized',
      'Collect all fallen stung fruits daily and boil or bury deeply (never leave rotting on ground)'
    ],
    physicalRemovalTa: [
      'பிஞ்சாக இருக்கும் போதே காய்களை காகித பை அல்லது வலைப் பைகளில் கட்டி பாதுகாக்கவும்',
      'கீழே விழும் அழுகிய பழங்களை சேகரித்து குப்பையில் போடவும்'
    ],
    saferBiologicalControls: [
      'Install Methyl Eugenol or Cue-Lure pheromone traps to lure and drown 100% of male flies',
      'Basil leaf extract lure trap with jaggery water'
    ],
    saferBiologicalControlsTa: [
      'இனிய வாசனை கொண்ட மோகப் பொறி (Pheromone trap) வைத்து ஆண் ஈக்களை பிடிக்கவும்',
      'துளசி இலை மற்றும் வெல்லக் கரைசல் பொறி'
    ],
    prevention: [
      'Hang 2 pheromone traps per 1000 sq ft garden space beginning at flowering stage',
      'Hoe and rake soil under fruit trees to expose pupae to predatory birds and baking sun'
    ],
    preventionTa: [
      'பூக்கும் பருவத்திலேயே மோகப் பொறிகளை தோட்டத்தில் கட்டி வைக்கவும்'
    ],
    chemicalWarnings: 'Spraying chemicals on fruit skin does NOT kill maggots safely eating inside the fruit pulp, but leaves toxic chemical residues on your food. Pheromone traps and physical bagging are the gold standard.',
    chemicalWarningsTa: 'பழத்தின் உள்ளே புழு இருப்பதால் மருந்து தெளிப்பது நச்சு எச்சத்தையே தரும்; காகித பை கட்டுவதே 100% வெற்றி தரும்.'
  },
  {
    id: 'stem-borers',
    name: 'Stem & Shoot Borers',
    nameTa: 'தண்டு துளைப்பான் புழு',
    scientificName: 'Leucinodes orbonalis & Chilo partellus',
    category: 'Boring Pest',
    severity: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Caterpillars tunnel straight inside main stems and stalks, choking vascular sap flow and causing branch tips to wilt and drop.',
    shortDescriptionTa: 'செடியின் முக்கிய தண்டுகளுக்குள் துளையிட்டு உட்புறத்தை தின்னும் புழுக்கள். நுனிக் கிளைகள் வாடி தொங்கும்.',
    affectedPlants: ['Brinjal / Eggplant', 'Maize', 'Paddy', 'Drumstick', 'Chilli', 'Okra'],
    symptoms: [
      'Terminal tender shoots suddenly droop, wilt, and dry up like an umbrella handle',
      'Small entrance hole plugged with brown frass sawdust on the stem',
      'Stems snap easily in wind at the bored hollow point'
    ],
    symptomsTa: [
      'செடியின் நுனிக் குருத்துகள் திடீரென வாடி தொங்குதல்',
      'தண்டில் மரத்தூள் போன்ற கழிவுகளுடன் கூடிய சிறு துளை',
      'காற்றுக்கு தண்டு எளிதில் உடைந்து விழுதல்'
    ],
    identificationMarks: 'Pinkish-white fat caterpillar eating hidden inside the hollowed stem tunnel.',
    identificationMarksTa: 'தண்டின் உள்ளே ஒளிந்திருக்கும் இளஞ்சிவப்பு-வெள்ளை நிற புழு.',
    lifeCycle: 'Larva spends entire development feeding safely inside the stem.',
    lifeCycleTa: 'முழு புழுப் பருவத்தையும் தண்டின் உட்பகுதியிலேயே கழிக்கும்.',
    physicalRemoval: [
      'Promptly clip off wilting shoot tips with shears 2 inches below the bored hole and destroy with borer inside',
      'Insert a thin flexible wire into the borehole to crush the borer internally'
    ],
    physicalRemovalTa: [
      'வாடும் நுனிக் குருத்துகளை புழுவோடு சேர்த்து கிள்ளி எறிந்து அழிக்கவும்',
      'மெல்லிய கம்பி மூலம் துளைக்குள் குத்தி புழுவை அழிக்கலாம்'
    ],
    saferBiologicalControls: [
      'Trichogramma chilonis egg parasitoid cards tied to plants (parasitizes borer eggs before hatching)',
      'Bt (Bacillus thuringiensis) spray on tender shoots'
    ],
    saferBiologicalControlsTa: [
      'டிரைக்கோடெர்மா முட்டை ஒட்டுண்ணி அட்டைகளை செடிகளில் கட்டவும்',
      'Bt பாக்டீரியா தெளிப்பு'
    ],
    prevention: [
      'Intercrop with Coriander or Marigolds whose scents confuse borer moths',
      'Apply neem cake (வேப்பம்பிண்ணாக்கு) into soil at root zone to boost plant resistance'
    ],
    preventionTa: [
      'வேப்பம்பிண்ணாக்கை அடியில் இட்டு மண் அணைக்கவும்'
    ],
    chemicalWarnings: 'Pesticides sprayed on outside of stems cannot touch caterpillars feeding inside the center marrow. Pruning wilted shoots with scissors is 100% effective and chemical-free.',
    chemicalWarningsTa: 'தண்டின் உள்ளே புழு இருப்பதால் வெளிப்புற தெளிப்பு பலனளிக்காது. வாடும் நுனியை வெட்டி அப்புறப்படுத்துவதே தீர்வு.'
  },
  {
    id: 'termites',
    name: 'Subterranean Termites',
    nameTa: 'கரையான் (மண் கரையான்)',
    scientificName: 'Odontotermes obesus & Coptotermes formosanus',
    category: 'Soil Pest',
    severity: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Social wood-eating insects building mud shelter tubes over tree trunks and eating dry roots, stakes, and uncomposted wood.',
    shortDescriptionTa: 'செடிகள் மற்றும் மரங்களின் அடிப்பகுதியில் மண் குழாய் போன்ற புற்று கட்டி, வேர்களையும் மரப்பட்டைகளையும் அரித்து தின்னும் பூச்சிகள்.',
    affectedPlants: ['Fruit trees', 'Woody garden stakes', 'Rose bushes', 'Sugarcane', 'Potted plants with raw wood'],
    symptoms: [
      'Earthy mud galleries or earthen tunnels running up stems and tree trunks',
      'Bark peeled back exposes hollowed out wood filled with packed earth',
      'Plants suddenly wilt and snap off at the soil line due to hollowed root crowns'
    ],
    symptomsTa: [
      'தண்டு மற்றும் தொட்டிகளின் மேல் மண் குழாய் பாதைகள் ஓடுதல்',
      'மரப்பட்டை அரிக்கப்பட்டு உள்ளே மண் நிரம்பியிருத்தல்',
      'வேர்கள் அரிக்கப்பட்டு செடி தரைமட்டத்தில் சாய்ந்து விழுதல்'
    ],
    identificationMarks: 'Pale cream-colored soft-bodied insects with reddish-brown soldier heads and sickle pincers.',
    identificationMarksTa: 'வெளிறிய வெள்ளை-மஞ்சள் நிற சிறு பூச்சிகள்.',
    lifeCycle: 'Massive underground colonies with long-lived queen, king, workers, and soldiers.',
    lifeCycleTa: 'பூமிக்கடியில் ராணி, ராஜா, வேலைக்கார பூச்சிகளுடன் வாழும்.',
    physicalRemoval: [
      'Scrape mud tubes off trunks with stiff wire brush and flood base with water',
      'Remove unrotted dry branches and dead tree stumps near garden'
    ],
    physicalRemovalTa: [
      'தண்டில் உள்ள மண் பாதைகளை பிரஷ் கொண்டு சுரண்டி அழிக்கவும்',
      'காய்ந்த மரக்கட்டைகள் மற்றும் காய்ந்த கிளைகளை அப்புறப்படுத்தவும்'
    ],
    saferBiologicalControls: [
      'Apply Metarhizium anisopliae (green muscardine bio-fungus, 10g/L) drench around root zone',
      'Calotropis (எருக்கஞ்செடி) leaf extract or crushed tobacco dust drench',
      'Heavy soil drenching with cold-pressed Neem cake water'
    ],
    saferBiologicalControlsTa: [
      'மெட்டாரைசியம் அனிசோபிலியே உயிர் பூஞ்சாணம் மண்ணில் ஊற்றவும்',
      'எருக்கம் இலை கரைசல் அல்லது வேப்பம்பிண்ணாக்கு கரைசல்'
    ],
    prevention: [
      'Never mix raw, uncomposted wood shavings or dry cardboard into potting soil mixes',
      'Paint tree trunk bases with hydrated lime (சுண்ணாம்பு) + copper sulfate wash'
    ],
    preventionTa: [
      'மட்காத மரத்தூளை மண் கலவையில் சேர்க்காதீர்கள்',
      'மரத்தின் அடிப்பகுதியில் வெள்ளை சுண்ணாம்பு மற்றும் காப்பர் பூசவும்'
    ],
    chemicalWarnings: 'Banned chlorpyrifos and termiticides contaminate deep groundwater tables and bioaccumulate in garden fruits. Use Metarhizium and Calotropis botanical drenches safely.',
    chemicalWarningsTa: 'குளோர்பைரிபாஸ் போன்ற நச்சு மருந்துகள் நிலத்தடி நீரை மாசுபடுத்தும்; எருக்கஞ்செடி மற்றும் வேப்பங்கரையே சிறந்தது.'
  },
  {
    id: 'snails-slugs',
    name: 'Garden Snails & Slugs',
    nameTa: 'நத்தை மற்றும் நத்தையின புழுக்கள்',
    scientificName: 'Achatina fulica & Deroceras reticulatum',
    category: 'Mollusk / Other',
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Nocturnal slimy mollusks hiding in cool dark damp mulch by day and devouring tender seedlings, leaves, and strawberries by night.',
    shortDescriptionTa: 'பகலில் ஈரமான தொட்டிகளின் அடியில் ஒளிந்து, இரவில் வந்து இளம் தளிர்களையும் இலைகளையும் தின்று சேதப்படுத்தும் நத்தைகள்.',
    affectedPlants: ['Keerai / Greens', 'Lettuce', 'Seedlings', 'Strawberry', 'Anthurium', 'Orchids', 'Hostas'],
    symptoms: [
      'Large smooth-edged irregular holes rasped through leaves and fruit skin',
      'Shimmering iridescent silvery dried slime trails glistening across leaves and paving stones',
      'Young emergent seedlings completely devoured overnight'
    ],
    symptomsTa: [
      'இலைகளில் வழவழப்பான பெரிய ஓட்டைகள்',
      'இலைகள் மற்றும் தரையில் காய்ந்த வெள்ளி போன்ற வழவழப்பு பாதைகள்',
      'நாற்றுகள் இரவோடு இரவாக காணாமல் போதல்'
    ],
    identificationMarks: 'Hard coiled spiral shell (snails) or naked soft slimy muscular body with sensory eye tentacles (slugs).',
    identificationMarksTa: 'ஓடுள்ள நத்தை அல்லது வழவழப்பான தசை உடலுள்ள நத்தை.',
    lifeCycle: 'Hermaphrodites laying translucent pearl-like egg clusters in moist soil cracks.',
    lifeCycleTa: 'ஈரமான மண்ணில் முத்து போன்ற வெள்ளை முட்டைகளை இடும்.',
    physicalRemoval: [
      'Handpick at dusk or after rain showers using gloves and drop into salted water bucket',
      'Sink small shallow containers filled with stale beer or fermented yeast water flush with soil (snails drown in beer traps)'
    ],
    physicalRemovalTa: [
      'மழைக்காலத்தில் இரவில் டார்ச் அடித்து கையால் பிடித்து உப்பு நீரில் போடவும்',
      'பீர் அல்லது புளித்த ஈஸ்ட் கலந்த கிண்ணங்களை மண்ணில் புதைத்து நத்தைகளை கவரவும்'
    ],
    saferBiologicalControls: [
      'Spread coarse barrier bands of Wood Ash (சாம்பல்), crushed eggshells, or Diatomaceous Earth around pot bases',
      'Diatomaceous earth cuts their soft slimy bellies preventing crossing'
    ],
    saferBiologicalControlsTa: [
      'தொட்டியைச் சுற்றி மரச்சாம்பல் அல்லது முட்டை ஓட்டுத் தூள் வளையம் போடவும்'
    ],
    prevention: [
      'Avoid watering garden beds in late evening; water in early morning so topsoil is dry by nightfall',
      'Clear damp wooden boards, bricks, and pots where snails hide during hot sunny days'
    ],
    preventionTa: [
      'மாலையில் தண்ணீர் ஊற்றாமல் காலையில் ஊற்றினால் இரவில் மண் உலர்வாக இருக்கும்',
      'தொட்டிகளுக்கு கீழே பதுங்கும் இடங்களை தூய்மைப்படுத்தவும்'
    ],
    chemicalWarnings: 'Metaldehyde blue snail pellets are deadly poison to pet dogs, cats, and birds who mistake them for food. Never use metaldehyde in home gardens—stick to crushed eggshells and beer traps.',
    chemicalWarningsTa: 'மெட்டால்டிஹைட் ரசாயன நத்தையுரைகள் செல்லப் பிராணிகளுக்கும் நாய்களுக்கும் கொடிய விஷம்! முட்டை ஓடு மற்றும் சாம்பலே 100% பாதுகாப்பானது.'
  },
  {
    id: 'fungus-gnats',
    name: 'Fungus Gnats',
    nameTa: 'ஈர மண் பூச்சிகள் (பூஞ்சை கொசுக்கள்)',
    scientificName: 'Bradysia spp.',
    category: 'Soil Pest',
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Tiny dark mosquito-like gnats hovering around constantly wet indoor pot soil; translucent soil larvae chew root hairs.',
    shortDescriptionTa: 'அதிகப்படியான நீரால் தொட்டி மண்ணில் பறக்கும் சிறு கொசு போன்ற பூச்சிகள். இதன் புழுக்கள் வேர் முடிகளை தின்று செடியை பலவீனப்படுத்தும்.',
    affectedPlants: ['Indoor Houseplants', 'Monstera', 'Snake Plant', 'Peace Lily', 'Seedling flats', 'Succulents'],
    symptoms: [
      'Clouds of annoying tiny black gnats flying up into your face whenever you water a pot',
      'Seedlings and cuttings wilt despite soggy soil because delicate root hairs have been chewed',
      'Leaves turn pale yellow and drop slowly'
    ],
    symptomsTa: [
      'தண்ணீர் ஊற்றும்போது தொட்டியிலிருந்து பறக்கும் சிறு கருப்பு கொசுக்கள்',
      'மண் ஈரமாக இருந்தும் வேர்கள் அரிக்கப்பட்டு செடி வாடுதல்'
    ],
    identificationMarks: 'Weak-flying tiny (2-3mm) slender black flies hovering right above soil surface.',
    identificationMarksTa: '2-3 மிமீ அளவுள்ள மெதுவாக பறக்கும் கருப்பு கொசுக்கள்.',
    lifeCycle: '17 days from egg laid in wet organic matter to adult fly.',
    lifeCycleTa: '17 நாட்களில் ஈர மண்ணில் முட்டையிட்டு பெருகும்.',
    physicalRemoval: [
      'Insert yellow sticky card stakes directly into pot soil to capture hundreds of adult gnats',
      'Spread a 1/2-inch layer of clean coarse river sand or fine gravel over pot soil to block egg-laying'
    ],
    physicalRemovalTa: [
      'மண்ணின் மேல் சிறிய மஞ்சள் ஒட்டும் அட்டைகளை நட்டு வைக்கவும்',
      'தொட்டி மண்ணின் மேல் 1/2 அங்குல ஆற்று மணல் பரப்பி முட்டையிடுவதை தடுக்கவும்'
    ],
    saferBiologicalControls: [
      'Water soil with BTI (Bacillus thuringiensis israelensis) mosquito drench',
      'Drench soil once with 1 part 3% hydrogen peroxide to 4 parts water (kills larvae and aerates soil)'
    ],
    saferBiologicalControlsTa: [
      '1 பங்கு 3% ஹைட்ரஜன் பெராக்சைடு + 4 பங்கு தண்ணீர் கலந்து மண்ணில் ஊற்றவும்'
    ],
    prevention: [
      'Allow top 2 inches of potting soil to dry out completely between waterings (gnat larvae starve in dry soil)',
      'Ensure pots have bottom drainage and never leave water sitting in saucers'
    ],
    preventionTa: [
      'மேல் 2 அங்குல மண் நன்கு உலர்ந்த பிறகே மீண்டும் தண்ணீர் ஊற்றவும்'
    ],
    chemicalWarnings: 'No toxic aerosol bug sprays needed! Simply letting the soil surface dry out for 4 days naturally eliminates 100% of fungus gnat larvae.',
    chemicalWarningsTa: 'வீட்டுக்குள் விஷ ஸ்ப்ரே அடிக்க வேண்டாம்; மண்ணை உலரவிட்டாலே கொசுக்கள் தானாக மடிந்துவிடும்.'
  },
  {
    id: 'root-knot-nematodes',
    name: 'Root-Knot Nematodes',
    nameTa: 'வேர் முடிச்சு நூற்புழுக்கள்',
    scientificName: 'Meloidogyne incognita',
    category: 'Soil Pest',
    severity: 'Critical',
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Microscopic parasitic roundworms invading plant roots, causing swellings, galls, stunting, and midday wilt.',
    shortDescriptionTa: 'கண்ணுக்குத் தெரியாத நுண்ணிய புழுக்கள் வேர்களுக்குள் புகுந்து உருண்டை உருண்டையான முடிச்சுகளை ஏற்படுத்தி, செடியின் சத்தை உறிஞ்சும்.',
    affectedPlants: ['Tomato', 'Brinjal', 'Chilli', 'Okra', 'Banana', 'Papaya', 'Jasmine', 'Crossandra'],
    symptoms: [
      'Roots dug up show distorted lumpy galls, bead-like nodules, and swollen tumors',
      'Plants wilt severely during hot sunny midday and fail to respond to heavy watering',
      'Stunted pale yellow foliage and dramatically reduced fruit yield'
    ],
    symptomsTa: [
      'வேர்களை தோண்டிப் பார்த்தால் உருண்டையான முடிச்சுகளும் கட்டிகளும் இருத்தல்',
      'நண்பகல் வெயிலில் செடிகள் சோர்ந்து வாடிப் போதல்',
      'செடியின் வளர்ச்சி குன்றி இலைகள் வெளிறிப் போதல்'
    ],
    identificationMarks: 'Microscopic worms inside root swellings (distinct from nitrogen nodules which rub off easily; nematode galls are swollen root tissue).',
    identificationMarksTa: 'வேரின் தசைப் பகுதியே உருண்டையாக வீங்கியிருக்கும்.',
    lifeCycle: '25-30 days; survives in warm sandy soils for multiple years.',
    lifeCycleTa: '25-30 நாட்களில் மணல் நிலங்களில் பெருகும்.',
    physicalRemoval: [
      'Uproot and destroy heavily galled infected plants along with surrounding root soil',
      'Solarize garden beds under clear plastic sheeting for 6 weeks during peak summer'
    ],
    physicalRemovalTa: [
      'பாதிக்கப்பட்ட செடியை வேரோடு பிடுங்கி எரிக்கவும்',
      'கோடையில் பாலித்தீன் தாள் மூடி மண் சூரிய ஒளி நேர்த்தி செய்யவும்'
    ],
    saferBiologicalControls: [
      'Apply Paecilomyces lilacinus (10g/plant) bio-nematicide which parasitize nematode egg masses',
      'Heavy incorporation of Neem cake (வேப்பம்பிண்ணாக்கு - 100g/pot) which releases nematocidal azadirachtin',
      'Intercrop with French Marigolds (Tagetes) whose root exudates kill nematodes'
    ],
    saferBiologicalControlsTa: [
      'பேசிலோமைசிஸ் உயிர் உரம் மற்றும் வேப்பம்பிண்ணாக்கு இடவும்',
      'சாமந்தி பூக்களை செடிகளுக்கு இடையே நடவும்; இதன் வேர்கள் நூற்புழுவை கொல்லும்'
    ],
    prevention: [
      'Always plant marigolds (சாமந்தி) alongside tomatoes, brinjals, and chillies',
      'Rotate crops: follow solanaceous vegetables with corn, mustard, or marigolds'
    ],
    preventionTa: [
      'தக்காளி, கத்தரிக்கு அருகில் எப்போதும் சாமந்திப் பூக்களை நடவும்'
    ],
    chemicalWarnings: 'Chemical nematicides like Carbofuran (Furadan) are extraordinarily dangerous neurotoxins banned in home gardens. Organic neem cake and marigolds provide unmatched safe control.',
    chemicalWarningsTa: 'பியூரிடான் போன்ற ஆபத்தான ரசாயனங்களை பயன்படுத்தாதீர்கள். வேப்பம்பிண்ணாக்கும் சாமந்தியும் மிகச்சிறந்த இயற்கை மருந்து.'
  },
  {
    id: 'red-palm-weevil',
    name: 'Red Palm Weevil',
    nameTa: 'சிவப்பு கூன்வண்டு',
    scientificName: 'Rhynchophorus ferrugineus',
    category: 'Boring Pest',
    severity: 'Critical',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Devastating palm beetle whose grubs chew into the central heart crown of coconut and palmyra palms, killing adult trees from within.',
    shortDescriptionTa: 'தென்னை மற்றும் பனை மரங்களின் குருத்துப் பகுதியை உள்ளே இருந்து துளைத்து தின்று மரத்தையே சாய்க்கும் கொடிய வண்டு.',
    affectedPlants: ['Coconut Palm (தென்னை)', 'Palmyra Palm (பனை)', 'Areca Nut (பாக்கு)', 'Date Palm'],
    symptoms: [
      'Tiny holes on the palm trunk with fermented brown viscous liquid and chewed fiber oozing out',
      'Gnathic chewing or crunching sounds audible when putting your ear against the palm trunk',
      'Central spear leaf wilts and turns brown; crown tilts sideways and collapses'
    ],
    symptomsTa: [
      'தென்னை மரத் தண்டில் சிறு துளைகளும், துர்நாற்றத்துடன் பழுப்பு நிற திரவம் வடிதலும்',
      'மரத்தின் தண்டுப் பகுதியில் காது வைத்து கேட்டால் புழுக்கள் மெல்லும் சத்தம் கேட்டல்',
      'நடுக்குருத்து காய்ந்து பக்கவாட்டில் சாய்ந்து விழுதல்'
    ],
    identificationMarks: 'Large (35mm) striking reddish-brown weevil with a long curved snout and black spots on thorax.',
    identificationMarksTa: 'நீண்ட மூக்குடன் கூடிய 3.5 செமீ சிவப்பு-பழுப்பு நிற கூன்வண்டு.',
    lifeCycle: 'Grubs feed hidden inside the trunk heartwood for 2-3 months.',
    lifeCycleTa: 'தண்டின் உள்ளே 2-3 மாதங்கள் தின்று வாழும் புழுக்கள்.',
    physicalRemoval: [
      'Fill leaf axils with equal parts fine river sand and neem cake (மணல் + வேப்பம்பிண்ணாக்கு சம அளவு) to prevent egg laying',
      'Seal all trunk wounds with Bordeaux paste'
    ],
    physicalRemovalTa: [
      'தென்னை மர மட்டைகளின் இடுக்குகளில் மணல் மற்றும் வேப்பம்பிண்ணாக்கு கலந்து வைக்கவும்'
    ],
    saferBiologicalControls: [
      'Install Ferrolure pheromone bucket traps with fermented pineapple or sugarcane bait to mass-trap adult weevils',
      'Beauveria bassiana spore drench into bored crown'
    ],
    saferBiologicalControlsTa: [
      'பெரோலூர் மோகப் பொறி (Pheromone trap) வைத்து வண்டுகளை கவர்ந்து அழிக்கவும்'
    ],
    prevention: [
      'Never chop green leaves close to the palm trunk; leave a 1-foot stalk stub to prevent weeping wounds that attract egg-laying weevils',
      'Clean palm crowns annually before monsoon onset'
    ],
    preventionTa: [
      'தென்னை மட்டைகளை மரத்தோடு ஒட்டி வெட்டக் கூடாது; 1 அடி காம்பு விட்டு வெட்டவும்'
    ],
    chemicalWarnings: 'Do NOT inject monocrotophos or aluminium phosphide into living coconut trees without certified expert agricultural supervision; poison enters tender coconut water.',
    chemicalWarningsTa: 'இளநீரில் நஞ்சு பாயும் என்பதால் ரசாயன ஊசி போடாதீர்கள்; மணல் + வேப்பம்பிண்ணாக்கு கலவையே முன்னோர்கள் முறை.'
  },
  {
    id: 'rhinoceros-beetle',
    name: 'Rhinoceros Beetle',
    nameTa: 'காண்டாமிருக வண்டு (கொம்பன் வண்டு)',
    scientificName: 'Oryctes rhinoceros',
    category: 'Chewing Pest',
    severity: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Large horned black beetle boring into unopened central palm fronds, producing characteristic geometric "V-shaped" leaf cuts.',
    shortDescriptionTa: 'தென்னை மற்றும் பனை மரங்களின் உச்சிக்குருத்தை கடித்து தின்னும் கருப்பு கொம்பன் வண்டு. மட்டைகள் விரியும் போது "V" வடிவில் வெட்டப்பட்டிருக்கும்.',
    affectedPlants: ['Coconut Palm', 'Palmyra Palm', 'Date Palm', 'Oil Palm'],
    symptoms: [
      'Unfolded mature palm leaves display sharp geometric triangular or V-shaped notched cuts',
      'Boreholes plugged with chewed fibrous frass in the crown axils',
      'Stunted inflorescence leading to poor nut yield'
    ],
    symptomsTa: [
      'மட்டைகள் விரியும் போது கத்திரிக்கோலால் வெட்டியது போன்ற "V" வடிவ வெட்டுக்கள்',
      'குருத்துப் பகுதியில் மரத்தூள் தள்ளப்பட்ட துளைகள்',
      'பூம்பாளை சேதமடைந்து தேங்காய் காய்ப்பு குறைதல்'
    ],
    identificationMarks: 'Jet-black stout beetle with a prominent curved horn on top of its head (resembling a rhinoceros).',
    identificationMarksTa: 'தலையில் கொம்பு போன்ற நீண்ட வளைந்த அமைப்பு கொண்ட கருப்பு வண்டு.',
    lifeCycle: 'Beetle breeds in decomposing farmyard manure pits; grubs feed on rotting organic matter.',
    lifeCycleTa: 'மட்காத சாண எருக் குழிகளில் இதன் குட்டிகள் வளரும்.',
    physicalRemoval: [
      'Hook adult beetles out of crown boreholes using a sharp iron rod hooked at the end (கொம்பன் வண்டு எடுக்கும் கம்பி)',
      'Fill innermost 3 leaf axils with naphthalene balls (அந்து உருண்டை) or sand-neem cake mix'
    ],
    physicalRemovalTa: [
      'வளைந்த இரும்புக் கம்பி கொண்டு குருத்து துளையிலிருந்து வண்டை குத்தி வெளியே எடுக்கவும்',
      'குருத்து இடுக்குகளில் அந்து உருண்டை அல்லது மணல் + வேப்பம்பிண்ணாக்கு வைக்கவும்'
    ],
    saferBiologicalControls: [
      'Inoculate manure pits with Metarhizium anisopliae (green muscardine fungus) to destroy beetle grubs at the source',
      'Install Oryctes pheromone traps'
    ],
    saferBiologicalControlsTa: [
      'எருக் குழிகளில் மெட்டாரைசியம் பூஞ்சாணம் தெளித்து புழுக்களை அழிக்கவும்'
    ],
    prevention: [
      'Treat all farmyard manure heaps with neem seed powder so beetles cannot breed in your compost',
      'Place Rhinolure pheromone traps along farm borders'
    ],
    preventionTa: [
      'சாண எருக் குவியல்களை முறையாக பராமரித்து வண்டுகள் பெருகாமல் பார்த்துக் கொள்ளவும்'
    ],
    chemicalWarnings: 'Pesticides placed in the palm crown wash down with monsoon rain and kill beneficial pollinators visiting coconut blossoms. Use physical iron hooks and sand barriers.',
    chemicalWarningsTa: 'குருத்தில் ரசாயனம் வைத்தால் பூக்களில் உள்ள தேனீக்கள் மடியும்; இரும்பு கொக்கி முறையே பாதுகாப்பானது.'
  },
  {
    id: 'diamondback-moth',
    name: 'Diamondback Moth (DBM)',
    nameTa: 'வைர முதுகு அந்துப்பூச்சி புழு',
    scientificName: 'Plutella xylostella',
    category: 'Chewing Pest',
    severity: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Wriggling pale green caterpillars chewing "windowpane" holes in cole crops, wriggling backward and dangling on silk thread when disturbed.',
    shortDescriptionTa: 'முட்டைக்கோஸ், காலிஃபிளவர் இலைகளில் கண்ணாடி போன்ற மெல்லிய துளைகளை போடும் பச்சை புழுக்கள். தொட்டால் பின்னோக்கி நெளிந்து நூலில் தொங்கும்.',
    affectedPlants: ['Cabbage', 'Cauliflower', 'Broccoli', 'Radish', 'Mustard', 'Turnip'],
    symptoms: [
      'Numerous small transparent "windowpanes" where larvae eat green tissue leaving clear upper cuticle',
      'Holes coalesce into large ragged tears ruining market heads',
      'Foliage contaminated with silk cocoons and frass'
    ],
    symptomsTa: [
      'இலைகளில் கண்ணாடி போன்ற மெல்லிய சன்னல் துளைகள்',
      'இலைகள் சல்லடை போல ஆகுதல்',
      'முட்டைக்கோஸ் தலைக்குள் புழுக்கள் புகுந்து அழுகுதல்'
    ],
    identificationMarks: 'Caterpillar wriggles violently backward and drops on a silk thread when poked; adult moth has 3 diamond shapes along folded wings.',
    identificationMarksTa: 'தொட்டால் பின்னோக்கி நெளிந்து நூலில் தொங்கும் பச்சை புழு; இறக்கையில் வைர குறிகள் கொண்ட அந்துப்பூச்சி.',
    lifeCycle: 'Short 14-day cycle in warm tropical climates, producing up to 15 generations per year.',
    lifeCycleTa: '14 நாட்களில் அடுத்த தலைமுறை; ஆண்டில் 15 தலைமுறைகள் உருவாகும்.',
    physicalRemoval: [
      'Intercrop with Mustard (கடுகு) as a trap crop (plant 2 rows of mustard every 25 rows of cabbage; DBM prefers mustard 10x more)',
      'Install yellow sticky traps'
    ],
    physicalRemovalTa: [
      'கடுகை கவர்ச்சிப் பயிராக நடவும் (கடுகில் புழுக்கள் குவிந்து கோஸை காப்பாற்றும்)'
    ],
    saferBiologicalControls: [
      'Bt (Bacillus thuringiensis kurstaki, 2g/L) biological spray applied at dusk',
      'Neem Seed Kernel Extract (NSKE 5%) spray every 10 days'
    ],
    saferBiologicalControlsTa: [
      'Bt இயற்கை பாக்டீரியா கரைசல் மற்றும் 5% வேப்பங்கொட்டை கரைசல்'
    ],
    prevention: [
      'Harvest trap crops of mustard and burn to eliminate concentrated DBM larvae',
      'Cover seedbeds with nylon insect netting'
    ],
    preventionTa: [
      'நாற்றுப் பாத்திகளை கொசுவலை கொண்டு மூடி வளர்க்கவும்'
    ],
    chemicalWarnings: 'DBM is world-famous for becoming resistant to nearly every synthetic chemical pesticide ever invented. Bt bio-sprays and mustard trap cropping are vastly superior.',
    chemicalWarningsTa: 'இப்பூச்சி அனைத்து ரசாயன மருந்துகளையும் தாங்கும் எதிர்ப்பு திறன் கொண்டது! Bt பாக்டீரியாவும் கடுகு கவர்ச்சிப் பயிருமே வெற்றி தரும்.'
  },
  {
    id: 'fruit-borers',
    name: 'Tomato & Gram Pod Borer',
    nameTa: 'காய்ப்புழு (தக்காளி காய்த்துளைப்பான்)',
    scientificName: 'Helicoverpa armigera',
    category: 'Boring Pest',
    severity: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Caterpillar that bores neat circular holes into developing tomatoes and pods, feeding with its head buried inside and rear end protruding.',
    shortDescriptionTa: 'தக்காளி மற்றும் அவரை காய்களில் வட்டமான துளையிட்டு, தலையை உள்ளேயும் உடலை வெளியேயும் வைத்துக்கொண்டு தின்னும் புழு.',
    affectedPlants: ['Tomato', 'Chilli', 'Okra', 'Avarakkai', 'Pigeon Pea (துவரை)', 'Chickpea', 'Carnation'],
    symptoms: [
      'Clean circular holes bored into green and ripening fruit shoulders',
      'Fleshy interior of tomato hollowed out and filled with wet brown frass',
      'Premature fruit drop and secondary bacterial rot'
    ],
    symptomsTa: [
      'காய்களில் வட்ட வடிவிலான துளைகள் தோன்றுதல்',
      'காயின் உட்பகுதி புழுவால் தின்னப்பட்டு அழுகுதல்',
      'காய்கள் முன்கூட்டியே பழுத்து உதிர்தல்'
    ],
    identificationMarks: 'Striped green, yellow, or brown stout caterpillar with characteristic wavy side bands and sparse bristly hairs.',
    identificationMarksTa: 'பக்கவாட்டில் வரிகள் கொண்ட தடித்த பச்சை அல்லது பழுப்பு புழு.',
    lifeCycle: 'Moths fly at dusk laying single spherical yellowish eggs on buds and leaflets.',
    lifeCycleTa: 'பூ மொட்டுகளின் மேல் தனித்தனியாக முட்டையிடும் அந்துப்பூச்சி.',
    physicalRemoval: [
      'Handpick bored green fruits and destroy before caterpillar leaves to attack next fruit',
      'Plant African Tall Marigold (சாமந்தி) around tomato plots as trap crop'
    ],
    physicalRemovalTa: [
      'துளையிட்ட காய்களை பறித்து அப்புறப்படுத்தவும்',
      'தக்காளிக்கு இடையே சாமந்தி பூக்களை கவர்ச்சி பயிராக நடவும்'
    ],
    saferBiologicalControls: [
      'HaNPV (Helicoverpa Nuclear Polyhedrosis Virus) bio-spray at 250 LE/ha',
      'Pheromone lure traps (Helilure) hung 1 foot above canopy (5 traps/acre)'
    ],
    saferBiologicalControlsTa: [
      'ஹெலிலூர் மோகப் பொறி (Pheromone trap) கட்டி தாய் அந்துப்பூச்சிகளை பிடிக்கவும்'
    ],
    prevention: [
      'Plant 1 row of marigolds for every 16 rows of tomatoes; moths lay eggs preferentially on marigold blossoms',
      'Spray NSKE (Neem Seed Kernel Extract 5%) during flower opening'
    ],
    preventionTa: [
      '16 வரிசை தக்காளிக்கு 1 வரிசை சாமந்தி நட்டால் பூச்சிகள் சாமந்தியில் முட்டையிடும்'
    ],
    chemicalWarnings: 'Do NOT spray synthetic pesticides right before picking; residues persist inside the fruit flesh. Handpicking and marigold border rows ensure 100% clean tomatoes.',
    chemicalWarningsTa: 'அறுவடை காலத்தில் ரசாயனம் அடிக்காதீர்கள்; சாமந்தி ஊடுபயிரே நஞ்சற்ற காய்கறிகளை தரும்.'
  },
  {
    id: 'cutworms',
    name: 'Black Cutworms',
    nameTa: 'வெட்டுப்புழு (தரைமட்ட வெட்டுப்புழு)',
    scientificName: 'Agrotis ipsilon',
    category: 'Soil Pest',
    severity: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Greasy grey-black soil-dwelling caterpillars hiding under dirt by day and severing young tender transplants clean at the soil line by night.',
    shortDescriptionTa: 'பகலில் மண்ணுக்குள் ஒளிந்து, இரவில் வந்து புதிதாக நட்ட இளங்கன்றுகளை தரைமட்டத்தில் கத்தரித்து சாய்க்கும் கொடிய புழுக்கள்.',
    affectedPlants: ['Tomato Transplants', 'Chilli Seedlings', 'Cabbage', 'Lettuce', 'Marigold', 'Beans'],
    symptoms: [
      'Healthy green seedlings severed clean off right at ground level as if clipped with scissors',
      'Severed plant tops left lying on soil surface next to the cut stump',
      'Scratching the top 1 inch of soil next to the severed plant reveals a curled caterpillar'
    ],
    symptomsTa: [
      'நட்ட இளம் நாற்றுகள் தரைமட்டத்தில் கத்திரிக்கோலால் வெட்டியது போல சாய்ந்து கிடத்தல்',
      'மண்ணை லேசாக கிளறிப் பார்த்தால் சுருண்டு கிடக்கும் சாம்பல் நிற புழு'
    ],
    identificationMarks: 'Smooth, greasy, dark greyish-black fat caterpillar that curls tightly into a "C-shape" when touched.',
    identificationMarksTa: 'தொட்டவுடன் "C" வடிவில் சுருண்டு கொள்ளும் பளபளப்பான சாம்பல் நிற தடித்த புழு.',
    lifeCycle: 'Spends daytime buried 1-2 inches deep in soil; feeds strictly at night.',
    lifeCycleTa: 'பகலில் 2 அங்குல மண்ணுக்குள் புதைந்து வாழும்; இரவில் மட்டுமே வெளிவரும்.',
    physicalRemoval: [
      'Place a cardboard or plastic protective collar (cut toilet paper roll or plastic cup bottom) 2 inches into soil around each seedling stem',
      'Scratch soil around newly severed plants in morning to find and remove the hiding cutworm'
    ],
    physicalRemovalTa: [
      'நாற்றின் தண்டைச் சுற்றி தடிமனான காகித அட்டை வளையம் (Collar) போட்டு மண்ணில் 2 அங்குலம் புதைக்கவும்',
      'வெட்டப்பட்ட செடியின் அருகே மண்ணை கிளறி புழுவை பிடித்து அழிக்கவும்'
    ],
    saferBiologicalControls: [
      'Drench soil with Steinernema beneficial entomopathogenic nematodes',
      'Neem cake incorporated into soil at transplanting'
    ],
    saferBiologicalControlsTa: [
      'நடவு செய்யும் போது மண்ணில் வேப்பம்பிண்ணாக்கு கலந்து வைக்கவும்'
    ],
    prevention: [
      'Plow and expose container soil to hot sun and birds for 10 days before transplanting',
      'Protective collars around seedling stems are 100% physically effective'
    ],
    preventionTa: [
      'நாற்றுகளுக்கு அட்டை வளையம் போடுவதே 100% எளிய இயற்கை பாதுகாப்பு முறை'
    ],
    chemicalWarnings: 'Chemical soil dusts (like Lindane or Phorate) are persistent poisons that destroy earthworms and beneficial soil bacteria. Cardboard collars cost zero money and work 100%.',
    chemicalWarningsTa: 'மண்ணில் விஷ பவுடர்களை தூவ வேண்டாம்; அட்டை வளையமே செலவில்லாத சிறந்த தீர்வு.'
  },
  {
    id: 'grasshoppers',
    name: 'Short-Horned Grasshoppers & Locusts',
    nameTa: 'வெட்டுக்கிளி (பச்சை வெட்டுக்கிளி)',
    scientificName: 'Hieroglyphus banian & Schistocerca gregaria',
    category: 'Chewing Pest',
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Jumping winged insects chewing large sections from leaf borders on sugarcane, paddy, and kitchen garden foliage.',
    shortDescriptionTa: 'இலை விளிம்புகளை கடித்து தின்று தாவியோடும் பெரிய வெட்டுக்கிளிகள்.',
    affectedPlants: ['Sugarcane', 'Maize', 'Paddy', 'Banana', 'Rose', 'Hibiscus'],
    symptoms: [
      'Large irregular chew marks along leaf margins',
      'Entire foliage stripped down to central midribs during heavy locust invasions'
    ],
    symptomsTa: [
      'இலை விளிம்புகள் கடித்து குதறப்படுதல்',
      'நடு நரம்பு மட்டுமே மிஞ்சும் அளவுக்கு இலைகள் தின்னப்படுதல்'
    ],
    identificationMarks: 'Green or brown jumping insect with strong hind jumping legs and short antennae.',
    identificationMarksTa: 'நீண்ட பின் கால்களைக் கொண்ட பச்சை/பழுப்பு நிற தாவும் பூச்சி.',
    lifeCycle: 'Eggs laid in pods inside soil banks; nymphs hopper without wings before growing flight wings.',
    lifeCycleTa: 'மண் வரப்புகளில் முட்டையிட்டு பெருகும்.',
    physicalRemoval: [
      'Hand catch in cool early mornings when cool temperatures make them sluggish',
      'Encourage backyard poultry (hens love devouring grasshoppers)'
    ],
    physicalRemovalTa: [
      'நாட்டுக்கோழிகளை தோட்டத்தில் உலவவிட்டால் வெட்டுக்கிளிகளை விரும்பி தின்னும்'
    ],
    saferBiologicalControls: [
      'Spray Neem oil (5ml/L) or garlic-chilli extract which makes leaves unpalatable',
      'Beauveria bassiana bio-fungus spray'
    ],
    saferBiologicalControlsTa: [
      'வேப்பெண்ணெய் மற்றும் பூண்டு-மிளகாய் சாறு தெளிக்க கசப்பு சுவையால் இலைகளை தின்னாது'
    ],
    prevention: [
      'Trim tall wild grass and weeds bordering garden fences where hoppers roost',
      'Deep summer plowing to expose egg pods'
    ],
    preventionTa: [
      'தோட்ட எல்லைகளில் உள்ள தேவையற்ற புல் பூண்டுகளை வெட்டி தூய்மைப்படுத்தவும்'
    ],
    chemicalWarnings: 'Never spray heavy organophosphates in residential home gardens to kill grasshoppers. Domestic chickens and neem extracts provide safe, zero-cost biological equilibrium.',
    chemicalWarningsTa: 'ரசாயன பூச்சிக்கொல்லிகளை விட வீட்டு நாட்டுக்கோழிகளே சிறந்த உயிரியல் கட்டுப்பாடு.'
  },
  {
    id: 'leafhoppers',
    name: 'Green Leafhoppers (Jassids)',
    nameTa: 'பச்சை தத்துப்பூச்சி (ஜாசிட்)',
    scientificName: 'Amrasca biguttula biguttula',
    category: 'Sucking Pest',
    severity: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Wedge-shaped pale green bugs hopping sideways rapidly across leaf undersides, injecting phytotoxic saliva causing "hopper burn".',
    shortDescriptionTa: 'இலைகளின் அடியில் பக்கவாட்டில் நண்டு போல நகரும் சிறு பச்சை தத்துப்பூச்சிகள். இலை விளிம்புகள் கருகி "ஹாப்பர் பர்ன்" தோன்றும்.',
    affectedPlants: ['Cotton', 'Brinjal', 'Okra', 'Potato', 'Sunflower', 'Cowpea'],
    symptoms: [
      'Leaf edges turn yellow, then bronze and dry crisp inward (hopper burn)',
      'Leaves cup downward and become crinkled like umbrella ribs',
      'Tiny translucent bugs scuttling sideways when leaf is disturbed'
    ],
    symptomsTa: [
      'இலை விளிம்புகள் மஞ்சள் நிறமாகி பின் கருகிப் போதல் (ஹாப்பர் பர்ன்)',
      'இலைகள் கீழ்நோக்கி சுருங்குதல்',
      'இலையைத் தொட்டால் பக்கவாட்டில் வேகமாக ஓடும் பச்சை பூச்சிகள்'
    ],
    identificationMarks: 'Tiny (2-3mm) lime-green wedge-shaped insect with dark specks on vertex and wings.',
    identificationMarksTa: '2-3 மிமீ அளவுள்ள ஆப்பு போன்ற பச்சை நிற பூச்சி.',
    lifeCycle: '15-20 days; nymphs and adults hop sideways.',
    lifeCycleTa: '15-20 நாட்கள்.',
    physicalRemoval: ['Yellow sticky traps placed at canopy height catch flying leafhoppers'],
    physicalRemovalTa: ['மஞ்சள் ஒட்டும் அட்டைகள் கட்டி பிடிக்கவும்'],
    saferBiologicalControls: ['Spray 5ml/L Neem oil + garlic-ginger extract', 'Release predatory lacewings'],
    saferBiologicalControlsTa: ['வேப்பெண்ணெய் மற்றும் பூண்டு-இஞ்சி சாறு தெளிக்கவும்'],
    prevention: ['Intercrop with cowpea or maize', 'Avoid excessive chemical urea'],
    preventionTa: ['அதிக ரசாயன தழைச்சத்து உரங்களை தவிர்க்கவும்'],
    chemicalWarnings: 'Excessive pesticide use kills predatory spiders that hunt jassids; use yellow sheets.',
    chemicalWarningsTa: 'சிலந்திகளை கொல்லும் ரசாயனங்களை தவிர்க்கவும்.'
  },
  {
    id: 'flea-beetles',
    name: 'Flea Beetles',
    nameTa: 'பல்வகை வண்டு (பிளே வண்டு)',
    scientificName: 'Phyllotreta cruciferae',
    category: 'Chewing Pest',
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Tiny metallic black jumping beetles chewing dozens of round shotgun-like pinholes through tender leaves and seedlings.',
    shortDescriptionTa: 'இலைகளின் மேல் துப்பாக்கி குண்டு பட்டது போன்ற சிறு சிறு வட்ட வடிவ ஓட்டைகளை போடும் குதிக்கும் கருப்பு வண்டுகள்.',
    affectedPlants: ['Radish', 'Cabbage', 'Eggplant', 'Tomato', 'Mustard', 'Spinach'],
    symptoms: [
      'Leaves riddled with dozens of tiny 1-2mm round "shot holes"',
      'Young emergent seedlings completely skeletonized and killed',
      'Tiny shiny beetles leaping away like fleas when approached'
    ],
    symptomsTa: [
      'இலைகளில் சல்லடை போன்ற சிறு துளைகள்',
      'இளம் நாற்றுகள் காய்ந்து போதல்',
      'தொட்டால் தெறித்து குதிக்கும் சிறு கருப்பு வண்டுகள்'
    ],
    identificationMarks: 'Minute (1.5-3mm) glossy black or metallic blue beetles with enlarged hind legs for jumping.',
    identificationMarksTa: '1.5-3 மிமீ பளபளப்பான கருப்பு நிற குதிக்கும் வண்டு.',
    lifeCycle: 'Larvae live underground eating fine root hairs before adult beetles emerge.',
    lifeCycleTa: 'வேர்ப்பகுதியில் முட்டையிட்டு வாழும்.',
    physicalRemoval: ['Dust leaves with wood ash (சாம்பல்) or diatomaceous earth which irritates beetles'],
    physicalRemovalTa: ['இலைகளின் மேல் மரச்சாம்பல் தூவி விடவும்'],
    saferBiologicalControls: ['Spray pure neem seed extract or spinosad', 'Nematodes in soil against larvae'],
    saferBiologicalControlsTa: ['வேப்பங்கொட்டை கரைசல் தெளிக்கவும்'],
    prevention: ['Floating row covers over newly sown radish and mustard beds'],
    preventionTa: ['கொசுவலை போட்டு நாற்றுகளை மூடி வைக்கவும்'],
    chemicalWarnings: 'Wood ash dusting costs nothing and repels 100% of flea beetles without harmful chemical residue.',
    chemicalWarningsTa: 'அடுப்பு சாம்பல் தூவுவதே மிகச்சிறந்த நஞ்சற்ற தீர்வு.'
  },
  {
    id: 'white-grubs',
    name: 'White Grubs (Chafers)',
    nameTa: 'வெள்ளை வேர்ப்புழு (சாண வண்டு புழு)',
    scientificName: 'Holotrichia consanguinea & H. serrata',
    category: 'Soil Pest',
    severity: 'Critical',
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Fat creamy-white C-shaped underground grubs devouring main taproots and feeder roots of sugarcane, groundnut, and potted plants.',
    shortDescriptionTa: 'மண்ணுக்குள் இருந்து கொண்டு செடிகளின் வேர்களை கடித்து தின்று மரங்களையும் செடிகளையும் வாட வைக்கும் தடித்த வெள்ளை புழுக்கள்.',
    affectedPlants: ['Sugarcane', 'Groundnut', 'Rose', 'Turmeric', 'Banana', 'Lawns', 'Arecanut'],
    symptoms: [
      'Plants suddenly wilt and can be pulled up out of soil effortlessly with zero intact roots',
      'Patchy yellowing and death of entire garden rows or container plants',
      'Digging 3 inches into soil uncovers fat curled white grubs'
    ],
    symptomsTa: [
      'வேர்கள் அரிக்கப்பட்டு செடிகளை தொட்டால் பஞ்சு போல பெயர்ந்து வருதல்',
      'மண்ணை தோண்டினால் தடித்த வெள்ளை புழுக்கள் தென்படுதல்'
    ],
    identificationMarks: 'Stout (20-40mm) creamy-white grub with brown head and 6 distinct front legs, curled like a horseshoe.',
    identificationMarksTa: 'பழுப்பு தலையுடன் கூடிய 3 செமீ தடித்த வளைந்த வெள்ளை புழு.',
    lifeCycle: 'Adult beetles emerge from soil on first monsoon rains in May/June to mate on neem trees.',
    lifeCycleTa: 'மே/ஜூன் முதல் மழையில் வண்டுகள் வெளிவரும்.',
    physicalRemoval: ['Hand-collect grubs when potting soil is tilled or repotted and feed to garden birds'],
    physicalRemovalTa: ['மண்ணை கிளறி புழுக்களை எடுத்து கோழிகளுக்கு உணவாக்கவும்'],
    saferBiologicalControls: [
      'Drench soil with Metarhizium anisopliae or Beauveria brongniartii bio-fungus (10g/L)',
      'Apply Heterorhabditis bacteriophora entomopathogenic nematodes'
    ],
    saferBiologicalControlsTa: ['மெட்டாரைசியம் உயிர் பூஞ்சாணத்தை மண்ணில் கரைத்து ஊற்றவும்'],
    prevention: ['Set up light traps during first pre-monsoon showers to trap adult May/June beetles before they lay eggs'],
    preventionTa: ['முதல் மழையின் போது விளக்குப் பொறி வைத்து வண்டுகளை அழிக்கவும்'],
    chemicalWarnings: 'Phorate chemical granules poison the soil and kill all earthworms. Metarhizium biological drench is eco-friendly.',
    chemicalWarningsTa: 'மண்ணில் போரேட் போன்ற ரசாயன குருணைகளை இடாதீர்கள்; மண்புழுக்கள் அழியும்.'
  },
  {
    id: 'fall-armyworm',
    name: 'Fall Armyworm',
    nameTa: 'படைப்புழு (மக்காச்சோள படைப்புழு)',
    scientificName: 'Spodoptera frugiperda',
    category: 'Chewing Pest',
    severity: 'Critical',
    imageUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Invasive caterpillar marching in armies, hiding inside central whorls of maize, sugarcane, and sorghum, grinding leaves to pulp.',
    shortDescriptionTa: 'மக்காச்சோள குருத்துக்குள் ஒளிந்து கொண்டு இலைகளை சல்லடையாக்கும் ஆக்ரோஷமான வெளிநாட்டு படைப்புழு.',
    affectedPlants: ['Maize / Corn', 'Sugarcane', 'Sorghum (சோளம்)', 'Paddy', 'Millets', 'Ginger'],
    symptoms: [
      'Central whorl leaves chewed into ragged torn ribbons with large heaps of wet sawdust frass',
      'Shot holes lined up in neat rows as new leaves unfold from the whorl',
      'Tassels and ears bored into and rotten'
    ],
    symptomsTa: [
      'குருத்து இலைகள் கிழிக்கப்பட்டு மரத்தூள் போன்ற கழிவுகள் தேங்குதல்',
      'இலைகள் விரியும் போது வரிசையாக துளைகள் காணப்படுதல்'
    ],
    identificationMarks: 'Caterpillar has an inverted white "Y" shape on head and 4 dark spots arranged in a square on the 8th abdominal segment.',
    identificationMarksTa: 'தலையில் தலைகீழ் "Y" குறியும், பின்பகுதியில் 4 புள்ளிகளும் கொண்ட புழு.',
    lifeCycle: '30 days lifecycle; adult moth can fly 100km in a single night.',
    lifeCycleTa: '30 நாட்கள்; ஒரே இரவில் 100 கிமீ பறக்கும் அந்துப்பூச்சி.',
    physicalRemoval: ['Drop a pinch of dry sand mixed with wood ash (சாம்பல் + மணல்) straight into the central plant whorl to suffocate the worm'],
    physicalRemovalTa: ['சாம்பலும் மணலும் கலந்து குருத்துக்குள் போட்டால் புழு மூச்சுத்திணறி அழியும்'],
    saferBiologicalControls: [
      'Bt (Bacillus thuringiensis, 2g/L) sprayed directly into central leaf whorl at dusk',
      'Release egg parasitoid Trichogramma pretiosum'
    ],
    saferBiologicalControlsTa: ['குருத்துக்குள் Bt பாக்டீரியா அல்லது வேப்பெண்ணெய் ஊற்றவும்'],
    prevention: ['Intercrop with pulses (Cowpea / தட்டைப்பயறு) which prevents armyworm spread', 'Install FAW pheromone lure traps'],
    preventionTa: ['தட்டைப்பயறை ஊடுபயிராக நடவும்; மோகப் பொறி வைக்கவும்'],
    chemicalWarnings: 'Indiscriminate chemical insecticide sprays wipe out natural earwigs and predatory wasps, making armyworm outbreaks 3x worse. Sand-ash whorl application is time-tested.',
    chemicalWarningsTa: 'மணல் + சாம்பல் போடுவதே 100% செலவில்லாத வெற்றி முறை.'
  },
  {
    id: 'citrus-butterfly',
    name: 'Citrus Butterfly Caterpillar',
    nameTa: 'எலுமிச்சை வண்ணத்துப் பூச்சி புழு',
    scientificName: 'Papilio demoleus',
    category: 'Chewing Pest',
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Caterpillar that mimics fresh bird droppings when young, turning into a bright green horned caterpillar that strips citrus leaves.',
    shortDescriptionTa: 'இளம் பருவத்தில் பறவை எச்சம் போலவும், பின் பிரகாசமான பச்சை புழுவாகவும் மாறி எலுமிச்சை, நாரத்தை இலைகளை தின்னும் புழு.',
    affectedPlants: ['Lemon / Citrus', 'Curry Leaf (கறிவேப்பிலை)', 'Orange', 'Bael (வில்வம்)'],
    symptoms: [
      'Young tender leaves eaten from margins inwards, leaving only bare midribs',
      'Small seedlings completely defoliated within 48 hours',
      'When touched, caterpillar projects two smelly orange horn-like scent glands (Osmeterium) to deter predators'
    ],
    symptomsTa: [
      'இலைகள் விளிம்பிலிருந்து தின்னப்பட்டு நரம்புகள் மட்டும் மிஞ்சுதல்',
      'தொட்டால் தலையிலிருந்து துர்நாற்றம் வீசும் ஆரஞ்சு நிற கொம்புகளை காட்டும்'
    ],
    identificationMarks: 'Young instar looks exactly like wet bird poop (black/white camouflage); mature larva is cylindrical leaf-green with brown diagonal bands.',
    identificationMarksTa: 'பறவை எச்சம் போன்ற கருப்பு-வெள்ளை புழு; பின் பச்சையாக மாறும்.',
    lifeCycle: 'Beautiful large yellow and black swallowtail butterfly lays round yellow pearl eggs on citrus shoots.',
    lifeCycleTa: 'அழகிய எலுமிச்சை வண்ணத்துப் பூச்சியின் முட்டைகளிலிருந்து தோன்றும்.',
    physicalRemoval: ['Handpicking is easy and 100% effective due to large visible size; drop into soapy water or relocate'],
    physicalRemovalTa: ['கண்ணுக்கு தெளிவாக தெரிவதால் கையாலேயே பிடித்து அப்புறப்படுத்தலாம்'],
    saferBiologicalControls: ['Bt (Bacillus thuringiensis) spray (2g/L)', 'Neem oil spray (5ml/L)'],
    saferBiologicalControlsTa: ['Bt பாக்டீரியா அல்லது வேப்பெண்ணெய் தெளிக்கவும்'],
    prevention: ['Inspect citrus and curry leaf flushes twice weekly and crush tiny pearl eggs on tender leaves'],
    preventionTa: ['இளம் இலைகளில் உள்ள உருண்டை முட்டைகளை நசுக்கி அழிக்கவும்'],
    chemicalWarnings: 'Never spray insecticides on curry leaf or kitchen lemon trees; you will ingest pesticide residues in rasam and curries. Handpicking takes 2 minutes.',
    chemicalWarningsTa: 'கறிவேப்பிலையில் ரசாயனம் அடிக்காதீர்கள்; கையால் பொறுக்கி எடுப்பதே நஞ்சற்ற சமையலுக்கு வழி.'
  },
  {
    id: 'tea-mosquito-bug',
    name: 'Tea Mosquito Bug',
    nameTa: 'தேயிலை கொசு (முந்திரி / கொய்யா நாவாய்ப்பூச்சி)',
    scientificName: 'Helopeltis antonii',
    category: 'Sucking Pest',
    severity: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1596720426673-e4e14290f0cc?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Mirid bug piercing succulent shoots and fruits with toxic saliva, producing necrotic scab crusts on guavas and cashew apples.',
    shortDescriptionTa: 'கொய்யா, மாதுளை, முந்திரி பிஞ்சுகளில் ஊசி குத்தி சாறு உறிஞ்சும் கொசு போன்ற பூச்சி. காய்களில் கரடுமுரடான சொறி படரும்.',
    affectedPlants: ['Guava', 'Cashew', 'Tea', 'Neem', 'Pomegranate', 'Cacao', 'Henna (மருதாணி)'],
    symptoms: [
      'Black sunken necrotic pinhead spots on young shoots, causing "dieback" blighting',
      'Guava fruit skin develops hard brown corky scabs (சொறி கொய்யா)',
      'Flowers dry up and drop off without fruit set'
    ],
    symptomsTa: [
      'இளங்குருத்துகள் கருகி நுனி வாடல் ஏற்படுதல்',
      'கொய்யா காயின் மேல் கரடுமுரடான பழுப்பு சொறி கொப்புளங்கள்',
      'பூக்கள் கருகி உதிர்தல்'
    ],
    identificationMarks: 'Slender reddish-brown bug with a long pin-like erect spine sticking straight out of its thorax.',
    identificationMarksTa: 'முதுகில் ஒரு ஊசி போன்ற குச்சி அமைப்பு கொண்ட சிவப்பு-பழுப்பு பூச்சி.',
    lifeCycle: '20-25 days; active in early morning and overcast humid weather.',
    lifeCycleTa: '20-25 நாட்கள்; அதிகாலையில் சுறுசுறுப்பாக இயங்கும்.',
    physicalRemoval: ['Bag guava fruits when marble-sized in brown paper bags to prevent bug piercing'],
    physicalRemovalTa: ['கொய்யா பிஞ்சுகளை காகித பைகளில் கட்டி பாதுகாக்கவும்'],
    saferBiologicalControls: ['Neem oil spray (5ml/L) + soap', 'Fish amino acid spray (5ml/L) to repel bugs'],
    saferBiologicalControlsTa: ['வேப்பெண்ணெய் கரைசல் அல்லது மீன் அமிலம் தெளிக்கவும்'],
    prevention: ['Prune center of guava canopy annually to allow bright sun penetration which the bug despises'],
    preventionTa: ['மரத்தின் நடுப்பகுதியில் சூரிய ஒளி படும்படி கிளைகளை கவாத்து செய்யவும்'],
    chemicalWarnings: 'Endosulfan was historically abused against this bug, causing widespread tragedy. Use paper fruit bags for 100% organic spot-free guavas.',
    chemicalWarningsTa: 'காகித பை கட்டுவதே நஞ்சற்ற சொறி இல்லாத கொய்யா காய்களை அறுவடை செய்ய சிறந்த வழி.'
  },
  {
    id: 'stink-bug',
    name: 'Southern Green Stink Bug / Gundhi Bug',
    nameTa: 'நாவாய்ப்பூச்சி (துர்நாற்ற வண்டு)',
    scientificName: 'Nezara viridula',
    category: 'Sucking Pest',
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Shield-shaped bright green bug emitting a foul stench when alarmed, sucking sap from developing seed pods and grain ears.',
    shortDescriptionTa: 'தொட்டால் கெட்ட துர்நாற்றத்தை வெளிப்படுத்தும் கேடயம் போன்ற பச்சை வண்டு. அவரை, தக்காளி மற்றும் நெல் மணிகளில் சாறு உறிஞ்சும்.',
    affectedPlants: ['Beans / Avarakkai', 'Tomato', 'Paddy / Rice', 'Okra', 'Brinjal', 'Maize'],
    symptoms: [
      'Cloudy discolored white spongy blemishes on tomato skins under feeding punctures',
      'Developing pods shrivel and produce withered abortive seeds',
      'Pungent foul odor lingering on plants where bugs have fed'
    ],
    symptomsTa: [
      'தக்காளி பழத்தின் மேல் வெளுத்த பஞ்சு போன்ற புள்ளிகள்',
      'அவரை காய்கள் சுருங்கி விதைகள் பதராகுதல்',
      'செடியில் துர்நாற்றம் வீசுதல்'
    ],
    identificationMarks: 'Shield-shaped bright leaf-green body with 3-5 white dots along upper thorax crest.',
    identificationMarksTa: 'கேடயம் போன்ற வடிவம் கொண்ட அடர் பச்சை நிற வண்டு.',
    lifeCycle: '35-40 days; overwinter as brown adults in dry leaf litter.',
    lifeCycleTa: '35-40 நாட்கள்.',
    physicalRemoval: ['Shake bugs into a bucket of soapy water early morning when cool weather makes them sluggish'],
    physicalRemovalTa: ['காலையில் செடியை அசைத்து வாளி சோப் தண்ணீரில் விழ வைக்கவும்'],
    saferBiologicalControls: ['Neem oil + castile soap spray', 'Kaolin clay spray providing physical particulate barrier'],
    saferBiologicalControlsTa: ['வேப்பெண்ணெய் சோப் கரைசல் தெளிக்கவும்'],
    prevention: ['Clear dry brush and leaf piles along garden fences where adult bugs hibernate'],
    preventionTa: ['தோட்ட எல்லைகளில் காய்ந்த சருகுகளை அகற்றி தூய்மையாக வைக்கவும்'],
    chemicalWarnings: 'Chemical sprays kill beneficial egg parasitoid wasps that keep stink bug populations in natural balance.',
    chemicalWarningsTa: 'இயற்கை ஒட்டுண்ணிகளை பாதுகாப்பதே நீண்ட கால கட்டுப்பாடு.'
  },
  {
    id: 'hadda-beetle',
    name: 'Spotted Epilachna Beetle (Hadda Beetle)',
    nameTa: 'கத்தரி புள்ளி வண்டு (எபிலாச்னா வண்டு)',
    scientificName: 'Henosepilachna vigintioctopunctata (28-spotted beetle)',
    category: 'Chewing Pest',
    severity: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Vegetarian ladybird beetle covered in 28 black spots, whose spiny yellow larvae scrape leaves into lace-like skeletons.',
    shortDescriptionTa: 'இறைச்சி உண்ணாத தாவர உண்ணி பொன்வண்டு (28 புள்ளிகள் இருக்கும்). இதன் மஞ்சள் முள் புழுக்கள் இலைகளை சல்லடை போல அரித்து தின்னும்.',
    affectedPlants: ['Brinjal / Eggplant', 'Tomato', 'Potato', 'Bitter Gourd', 'Ash Gourd'],
    symptoms: [
      'Leaves scraped into parallel semi-circular skeletonized windowpanes resembling woven lace',
      'Leaves dry up, turn brown, and crumble under hand pressure',
      'Spiny yellow oval larvae clinging to underside of leaves'
    ],
    symptomsTa: [
      'இலைகள் சல்லடை போன்று நரம்புகள் மட்டும் மிஞ்சும்படி அரிக்கப்படுதல்',
      'இலைகள் காய்ந்து சருகு போல ஆகுதல்',
      'இலையின் அடியில் மஞ்சள் நிற முள் போன்ற புழுக்கள்'
    ],
    identificationMarks: 'Bronze-orange dome beetle with exactly 14 to 28 black spots; larvae are bright yellow with branched black spines.',
    identificationMarksTa: 'ஆரஞ்சு நிற வண்டின் முதுகில் 28 கருப்பு புள்ளிகள்; புழுக்கள் மஞ்சள் நிற முட்களுடன் இருக்கும்.',
    lifeCycle: '20-25 days; yellow cigar-shaped eggs laid in tight vertical clusters under leaves.',
    lifeCycleTa: '20-25 நாட்கள்; இலை அடியில் மஞ்சள் நிற முட்டை குவியல்கள்.',
    physicalRemoval: [
      'Crush upright yellow egg clusters found under brinjal leaves before they hatch',
      'Handpick slow-moving spiny yellow grubs and drop in soapy water'
    ],
    physicalRemovalTa: [
      'இலை அடியில் உள்ள மஞ்சள் முட்டை குவியல்களை நசுக்கி அழிக்கவும்',
      'மஞ்சள் புழுக்களை கையால் பிடித்து அப்புறப்படுத்தவும்'
    ],
    saferBiologicalControls: ['Spray NSKE (Neem Seed Kernel Extract 5%) or Neem Oil (5ml/L)', 'Wood ash dusting'],
    saferBiologicalControlsTa: ['5% வேப்பங்கொட்டை கரைசல் அல்லது மரச்சாம்பல் தூவவும்'],
    prevention: ['Pick beetles regularly at first sign; early destruction of egg clusters prevents outbreaks'],
    preventionTa: ['ஆரம்பத்திலேயே முட்டை குவியல்களை அழித்துவிட்டால் பரவாது'],
    chemicalWarnings: 'Do not confuse with beneficial predator ladybugs (which have 7 spots and eat aphids). This pest beetle has 28 spots and eats leaves.',
    chemicalWarningsTa: '7 புள்ளி உள்ள வண்டு நன்மை செய்யும்; 28 புள்ளி உள்ள இந்த வண்டே இலைகளை தின்னும் தீமை செய்யும் பூச்சி.'
  },
  {
    id: 'onion-thrips',
    name: 'Onion Thrips',
    nameTa: 'வெங்காய இலைப்பேன்',
    scientificName: 'Thrips tabaci',
    category: 'Sucking Pest',
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1596720426673-e4e14290f0cc?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Tiny insects hiding inside tight leaf sheaths of onions, creating silvery streaks and causing leaf tip blight.',
    shortDescriptionTa: 'சின்ன வெங்காயம் மற்றும் பெரிய வெங்காய தாளின் இடுக்குகளில் ஒளிந்து கொண்டு சாறு உறிஞ்சி, இலைகளை வெள்ளி நிற புள்ளிகளாக மாற்றும் பேன்கள்.',
    affectedPlants: ['Shallots (சின்ன வெங்காயம்)', 'Onion', 'Garlic', 'Leeks', 'Cabbage'],
    symptoms: [
      'Silvery-white patches and bleached streaks along tubular onion leaves',
      'Leaf tips turn brown, wither, and bend downwards (tip burn)',
      'Bulbs remain small, stunted, and fail to store well'
    ],
    symptomsTa: [
      'வெங்காயத் தாளில் வெள்ளி போன்ற வெளிறிய கோடுகள்',
      'இலை நுனிகள் கருகி கீழ்நோக்கி வளைதல்',
      'வெங்காயம் திரளாமல் சிறுத்து போதல்'
    ],
    identificationMarks: 'Minute pale yellow to dark brown needle-like bugs hiding deep at leaf bases.',
    identificationMarksTa: 'இலை இடுக்குகளில் ஒளிந்திருக்கும் மிகச் சிறிய மஞ்சள்-பழுப்பு பேன்.',
    lifeCycle: '14-18 days; thrives in dry breezy weather.',
    lifeCycleTa: '14-18 நாட்கள்.',
    physicalRemoval: ['Overhead sprinkler misting knocks thrips out of leaf crevices'],
    physicalRemovalTa: ['மேலிருந்து தண்ணீர் தெளித்து பேன்களை கீழே தள்ளவும்'],
    saferBiologicalControls: ['Spray Agni Asthram or Neem oil (5ml/L) with liquid soap emulsifier', 'Blue sticky traps'],
    saferBiologicalControlsTa: ['அக்னி அஸ்திரம் அல்லது வேப்பெண்ணெய் கரைசல்; நீல ஒட்டும் அட்டை'],
    prevention: ['Keep onion beds weed-free; avoid planting near mature garlic plots'],
    preventionTa: ['களைகளை அகற்றி தூய்மையாக வைக்கவும்'],
    chemicalWarnings: 'Synthetic chemical sprays cause toxic residue on edible green spring onion shoots. Use neem oil and blue sticky cards.',
    chemicalWarningsTa: 'வெங்காயத்தாளை நாம் சமையலில் பயன்படுத்துவதால் ரசாயனம் அடிக்கக் கூடாது.'
  },
  {
    id: 'mango-hopper',
    name: 'Mango Leaf & Inflorescence Hopper',
    nameTa: 'மா தத்துப்பூச்சி (பூங்கொத்து பூச்சி)',
    scientificName: 'Idioscopus niveosparsus & Amritodus atkinsoni',
    category: 'Sucking Pest',
    severity: 'Critical',
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Millions of tiny wedge-shaped hoppers sucking sap from flowering mango panicles, causing blossoms to drop and coating trees in sticky sooty mold.',
    shortDescriptionTa: 'மாமரம் பூக்கும் பருவத்தில் லட்சக்கணக்கில் தோன்றி பூங்கொத்துகளில் சாறு உறிஞ்சி, பூக்களை கருக வைத்து மாம்பழ உற்பத்தியை அழிக்கும் பூச்சி.',
    affectedPlants: ['Mango (மாமரம்)'],
    symptoms: [
      'Blossoming flower panicles turn brown, dry out, and drop without setting fruit',
      'Clicking or pattering sound under mango trees resembling rain, caused by millions of hopper excretion droplets',
      'Leaves and ground covered in black sooty mold'
    ],
    symptomsTa: [
      'மாம்பூக்கள் கருகி பிஞ்சு பிடிக்காமல் உதிர்ந்து போதல்',
      'மரத்தின் கீழ் மழை பெய்வது போல பூச்சிகளின் கழிவு நீர் சொட்டும் சத்தம்',
      'இலைகள் முழுவதும் கருப்பு பூஞ்சை படர்தல்'
    ],
    identificationMarks: 'Wedge-shaped greyish-brown hoppers that hop with a clicking sound when you shake flower panicles.',
    identificationMarksTa: 'பூங்கொத்தை அசைத்தால் வேகமாக பறக்கும் சாம்பல்-பழுப்பு தத்துப்பூச்சி.',
    lifeCycle: 'Hoppers multiply explosively during the 4-week mango flowering window in December-February.',
    lifeCycleTa: 'மாமரம் பூக்கும் காலத்தில் அதிவேகமாக பெருகும்.',
    physicalRemoval: ['Prune dense shaded center branches in October to allow sunlight to bake the trunk and lower canopy'],
    physicalRemovalTa: ['அக்டோபரில் மரத்தின் நடுப்பகுதியை கவாத்து செய்து வெயில் படும்படி செய்யவும்'],
    saferBiologicalControls: [
      'Spray Beauveria bassiana or Metarhizium anisopliae (5g/L) bio-fungus at flower bud emergence',
      'Neem oil (5ml/L) + soap applied twice before flowers open'
    ],
    saferBiologicalControlsTa: ['பூ மொட்டு விடும் பருவத்தில் பியூவேரியா பேசியானா அல்லது வேப்பெண்ணெய் தெளிக்கவும்'],
    prevention: ['Never let dense unpruned canopies trap humid stagnant air in winter'],
    preventionTa: ['மரத்தை கவாத்து செய்து காற்றோட்டமாக பராமரிக்கவும்'],
    chemicalWarnings: 'Spraying synthetic insecticides during open bloom kills honeybees and native pollinators, resulting in 0% fruit set. Only spray before flowers open.',
    chemicalWarningsTa: 'பூ பூத்திருக்கும் போது ரசாயனம் தெளித்தால் தேனீக்கள் மடிந்து மாங்காய் காய்க்காமல் போய்விடும்!'
  },
  {
    id: 'banana-weevil',
    name: 'Banana Pseudostem Weevil',
    nameTa: 'வாழை தண்டு கூன்வண்டு',
    scientificName: 'Odoiporus longicollis',
    category: 'Boring Pest',
    severity: 'Critical',
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Nocturnal black weevil whose grubs bore extensive tunnels inside the false trunk of banana trees, causing trees to snap in wind.',
    shortDescriptionTa: 'வாழை மரத்தின் தண்டைத் துளைத்து உள்ளே வாழும் கூன்வண்டு. தண்டு அழுகி பலத்த காற்றில் வாழை மரம் முறிந்து விழும்.',
    affectedPlants: ['Banana / Plantain (வாழை வகைகள், குறிப்பாக நேந்திரன் / செவ்வாழை)'],
    symptoms: [
      'Small pinholes on pseudostem oozing sticky reddish-brown jelly gum',
      'Yellowing and premature withering of outer banana leaves',
      'Trunk snaps easily and reveals honeycombed rotten internal tunnels filled with grubs'
    ],
    symptomsTa: [
      'வாழைத் தண்டில் சிறு துளைகளும் பிசின் போன்ற சிவந்த திரவம் வடிதலும்',
      'வெளி இலைகள் மஞ்சள் நிறமாகி தொங்குதல்',
      'காற்றுக்கு வாழை மரம் தண்டு முறிந்து கீழே விழுதல்'
    ],
    identificationMarks: 'Stout (25mm) black or dark reddish-brown weevil with a long downward curved snout.',
    identificationMarksTa: 'நீண்ட வளைந்த மூக்குடைய 2.5 செமீ கருப்பு கூன்வண்டு.',
    lifeCycle: 'Eggs inserted into air cavities of outer leaf sheaths; grubs bore deep inward.',
    lifeCycleTa: 'மட்டைகளின் காற்று இடைவெளியில் முட்டையிடும்.',
    physicalRemoval: [
      'Strip off dried outer leaf sheaths to eliminate weevil hiding crevices',
      'Make longitudinal split pseudostem traps (வாழை மரத்துண்டு பொறி) placed on ground with longitudinal cut facing down; collect hiding weevils in morning'
    ],
    physicalRemovalTa: [
      'வாழைத் தண்டை நீளவாக்கில் பிளந்து தரையில் வைத்தால் வண்டுகள் அடியில் வந்து பதுங்கும்; காலையில் பிடித்து அழிக்கலாம்'
    ],
    saferBiologicalControls: [
      'Swab chopped stem traps with Beauveria bassiana bio-fungus to infect visiting weevils',
      'Inject 20ml Pseudomonas fluorescens bacterial suspension into stem'
    ],
    saferBiologicalControlsTa: ['வாழை பொறியில் பியூவேரியா பூஞ்சாணம் தடவி வண்டுகளுக்கு தொற்று ஏற்படுத்தவும்'],
    prevention: ['Clean sucker corms (பாரிங் - Parring) by paring away old roots and dipping in cow dung slurry + neem cake before planting'],
    preventionTa: ['வாழைக் கன்றுகளை நடும் முன் வேர்களை செதுக்கி சாணம் + வேப்பங்கரையில் நனைத்து நடவும்'],
    chemicalWarnings: 'Stem injection with organophosphates leaves pesticide residues inside edible banana bunches. Pseudostem split traps catch 90% of weevils cleanly.',
    chemicalWarningsTa: 'தண்டில் விஷ ஊசி போடாதீர்கள்; பிளந்த வாழை மர பொறி முறையே பாரம்பரிய சிறந்த வழி.'
  },
  {
    id: 'jasmine-budworm',
    name: 'Jasmine Budworm',
    nameTa: 'மல்லிகை மொட்டுப்புழு',
    scientificName: 'Hendecasis duplifascialis',
    category: 'Chewing Pest',
    severity: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Tiny greenish caterpillar boring inside unopened jasmine buds, turning them pinkish-brown and webbing flowers together.',
    shortDescriptionTa: 'மல்லிகை மொட்டுக்குள் துளையிட்டு உட்புறத்தை தின்னும் குட்டி பச்சை புழு. மொட்டுகள் இளஞ்சிவப்பு-பழுப்பு நிறமாக மாறி உதிரும்.',
    affectedPlants: ['Madurai Malli', 'Mullai', 'Jathi Malli', 'Arabian Jasmine'],
    symptoms: [
      'Closed jasmine buds show a tiny circular borehole and turn premature reddish-pink or dirty brown',
      'Multiple buds tied together with fine white silk webbing containing frass pellets',
      'Flower buds rot and fall off without ever opening'
    ],
    symptomsTa: [
      'மல்லிகை மொட்டுகள் இளஞ்சிவப்பு-பழுப்பு நிறமாக மாறுதல்',
      'மொட்டுகள் சிலந்தி வலை போன்ற நூலால் ஒன்றுடன் ஒன்று பிணைக்கப்பட்டிருத்தல்',
      'பூக்கள் விரியாமல் உதிர்ந்து போதல்'
    ],
    identificationMarks: 'Tiny (8-10mm) active green caterpillar with black head living inside webbed flower buds.',
    identificationMarksTa: 'கருப்பு தலையுடன் கூடிய 1 செமீ சிறு பச்சை புழு.',
    lifeCycle: '15-20 days; adult is a small white moth with wavy brown wing markings.',
    lifeCycleTa: '15-20 நாட்கள்.',
    physicalRemoval: ['Handpick webbed pinkish buds in early morning and drop in salt water', 'Rake soil under bushes to expose pupae'],
    physicalRemovalTa: ['பிணைக்கப்பட்ட மொட்டுகளை கையால் கிள்ளி உப்பு தண்ணீரில் போடவும்'],
    saferBiologicalControls: [
      'Spray Bacillus thuringiensis (Bt - 2g/L) during peak evening bud formation',
      'Neem Seed Kernel Extract (NSKE 5%) spray weekly'
    ],
    saferBiologicalControlsTa: ['Bt இயற்கை பாக்டீரியா அல்லது 5% வேப்பங்கொட்டை கரைசல் மாலையில் தெளிக்கவும்'],
    prevention: ['Prune jasmine bushes properly in winter and safely burn clipped infested twigs', 'Set up solar light traps'],
    preventionTa: ['குளிர்காலத்தில் முறையாக கவாத்து செய்து கழிவுகளை எரிக்கவும்'],
    chemicalWarnings: 'Synthetic chemical sprays destroy the delicate essential floral perfume of Madurai Malli. Use Bt and neem kernel extract to preserve pure jasmine fragrance.',
    chemicalWarningsTa: 'மல்லிகையில் ரசாயனம் அடித்தால் அதன் தெய்வீக நறுமணம் கெட்டுவிடும்; வேப்பங்கொட்டை கரைசலே சிறந்தது.'
  },
  {
    id: 'papaya-mealybug',
    name: 'Papaya Mealybug',
    nameTa: 'பப்பாளி மாவுப்பூச்சி',
    scientificName: 'Paracoccus marginatus',
    category: 'Sucking Pest',
    severity: 'Critical',
    imageUrl: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Invasive yellow-bodied mealybug coated in white wax, forming crusts on papaya, plumeria, and mulberry, causing crinkled leaf bunching.',
    shortDescriptionTa: 'பப்பாளி, செம்பருத்தி, மல்பெரி மரங்களை தாக்கி இலைகளை கொத்தாக சுருட்டி அழிக்கும் ஆக்ரோஷமான மாவுப்பூச்சி.',
    affectedPlants: ['Papaya', 'Mulberry', 'Hibiscus', 'Tapioca', 'Plumeria (செண்பகம்)', 'Tomato'],
    symptoms: [
      'Thick crusts of white cottony mealybugs suffocating the growing tip and flower clusters',
      'Leaves curl, wrinkle, and become bunched together tightly into a "bunchy top"',
      'Developing fruits covered in waxy white layers and black sooty mold'
    ],
    symptomsTa: [
      'குருத்து மற்றும் பூக்களில் தடித்த வெள்ளை மெழுகு படலம்',
      'இலைகள் சுருங்கி குடை போல கொத்தாக மாறுதல்',
      'பப்பாளி பழங்கள் மீது வெள்ளை மாவு மற்றும் கருப்பு பூஞ்சை படர்தல்'
    ],
    identificationMarks: 'Body turns distinct greenish-black in alcohol; waxy filaments are short with no long tail.',
    identificationMarksTa: 'ஆல்கஹாலில் போட்டால் பச்சை-கருப்பாக மாறும் மஞ்சள் நிற பூச்சி.',
    lifeCycle: 'Complete generation in 30 days; highly invasive across South India.',
    lifeCycleTa: '30 நாட்கள்.',
    physicalRemoval: ['Blast with high-pressure water jet to knock off waxy colonies', 'Wipe with 5% soap water'],
    physicalRemovalTa: ['அதிவேக தண்ணீர் பீய்ச்சி அடித்து மாவை அகற்றவும்'],
    saferBiologicalControls: [
      'Classic Biological Control: Acerophagus papayae parasitic micro-wasp (the legendary parasitoid that eradicated the epidemic in Tamil Nadu)',
      '10ml Neem oil + 5ml soap spray'
    ],
    saferBiologicalControlsTa: ['அசிரோபாகஸ் பப்பாயே என்ற நன்மை செய்யும் ஒட்டுண்ணி குளவிகளை விடவும்'],
    prevention: ['Never transport uninspected papaya or plumeria cuttings from infested regions', 'Control ground ants'],
    preventionTa: ['எறும்புகள் செடியில் ஏறாமல் தடுக்கவும்'],
    chemicalWarnings: 'Chemical pesticides failed completely against papaya mealybug and killed the Acerophagus wasps. Only biological parasitic wasps and neem soap work.',
    chemicalWarningsTa: 'ஒட்டுண்ணி குளவிகளை காப்பாற்றுங்கள்; ரசாயனம் அடித்தால் குளவிகள் மடிந்து பூச்சிகள் மீண்டும் பெருகும்.'
  },
  {
    id: 'coconut-eriophyid-mite',
    name: 'Coconut Eriophyid Mite',
    nameTa: 'தென்னை குரும்பை சிலந்தி (மண்டை சிலந்தி)',
    scientificName: 'Aceria guerreronis',
    category: 'Sucking Pest',
    severity: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Microscopic worm-like mites living under the perianth tepal caps of baby coconut button nuts, causing triangular yellow scars and stunted nuts.',
    shortDescriptionTa: 'தென்னங்குரும்பைகளின் தொப்பிக்கு அடியில் வாழ்ந்து சாறு உறிஞ்சும் கண்ணுக்குத் தெரியாத சிலந்தி. தேங்காய் சொறியாகி சிறுத்துப் போகும்.',
    affectedPlants: ['Coconut Palm (தென்னை மரம்)'],
    symptoms: [
      'Triangular pale yellow or cream-colored patches radiating from beneath the perianth cap of young button nuts',
      'Patches turn into dark brown corky cracked wart-like fissures as nut grows',
      'Nuts remain small, malformed, drop prematurely, and produce 40% less copra'
    ],
    symptomsTa: [
      'குரும்பையின் தொப்பியின் கீழ் முக்கோண வடிவ மஞ்சள் வடுக்கள்',
      'தேங்காய் வளரும் போது கரடுமுரடான பழுப்பு வெடிப்புகளாக மாறுதல்',
      'தேங்காய் சிறுத்து பருப்பு எடை குறைதல்'
    ],
    identificationMarks: 'Microscopic (0.2mm) creamy-white elongated carrot-shaped mite with only 2 pairs of legs (invisible without 20x hand lens).',
    identificationMarksTa: '0.2 மிமீ அளவுடைய நுண்ணோக்கியில் மட்டுமே தெரியும் மிகச்சிறிய சிலந்தி.',
    lifeCycle: '10-12 days; thousands of mites packed safely beneath a single perianth tepal button.',
    lifeCycleTa: '10-12 நாட்கள்.',
    physicalRemoval: ['Gather and safely compost fallen infected small button nuts'],
    physicalRemovalTa: ['கீழே உதிரும் சொறி குரும்பைகளை சேகரித்து எரிக்கவும்'],
    saferBiologicalControls: [
      'Root feeding with Azadirachtin 1% (10ml + 10ml water fed through living root)',
      'Spray crown with Wettable Sulfur (5g/L) or Neem-garlic emulsion around young nut bunches'
    ],
    saferBiologicalControlsTa: ['வேர் மூலம் வேப்பெண்ணெய் கரைசல் ஏற்றுதல் (Root Feeding) அல்லது கந்தகம் தெளித்தல்'],
    prevention: ['Balanced nutrition with potassium, magnesium, and organic farmyard manure to strengthen nut perianth tissues'],
    preventionTa: ['சாம்பல் சத்து மற்றும் நுண்ணூட்ட சத்து உரமிட்டு மரத்தை வலுப்படுத்தவும்'],
    chemicalWarnings: 'Do NOT use Monocrotophos for root feeding without mandatory 45-day withholding period; toxic residues contaminate tender coconut water.',
    chemicalWarningsTa: 'ரசாயன நஞ்சுகளை வேரில் ஏற்றாதீர்கள்; இயற்கை வேப்பெண்ணெய் வேர் ஏற்றமே பாதுகாப்பானது.'
  },
  {
    id: 'moringa-hairy-caterpillar',
    name: 'Moringa Hairy Caterpillar',
    nameTa: 'முருங்கை கம்பளிப்பூச்சி',
    scientificName: 'Eupterote mollifera',
    category: 'Chewing Pest',
    severity: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Giant fuzzy hairy caterpillars congregating in massive writhing masses on drumstick tree trunks by day and stripping leaves by night.',
    shortDescriptionTa: 'பகலில் முருங்கை மரத்தின் தண்டுப் பகுதியில் ஆயிரக்கணக்கில் கொத்தாக திரண்டு பதுங்கி, இரவில் ஏறி மரத்தின் இலைகள் அனைத்தையும் மொட்டையடிக்கும் கம்பளிப்பூச்சி.',
    affectedPlants: ['Drumstick / Moringa (முருங்கை மரம்)'],
    symptoms: [
      'Huge writhing clusters of hundreds of hairy caterpillars packed together like a fur coat on tree trunk',
      'Complete defoliation of whole drumstick trees within 2-3 nights',
      'Severe stinging itch and skin rashes if hairs touch human skin'
    ],
    symptomsTa: [
      'மரத்தின் தண்டு மீது கம்பளிப் போர்வை போர்த்தியது போல ஆயிரக்கணக்கான புழுக்கள் குவிந்திருத்தல்',
      'இரவோடு இரவாக முருங்கை மரம் முழுவதும் மொட்டையடிக்கப்படுதல்',
      'மனித உடலில் பட்டால் கடுமையான நமைச்சல் மற்றும் தடிப்பு ஏற்படுதல்'
    ],
    identificationMarks: 'Large (50-60mm) dark grey-brown caterpillar densely covered in tufts of grey stinging hairs.',
    identificationMarksTa: '5-6 செமீ நீளமுள்ள முடிகள் நிறைந்த பெரிய கம்பளிப்பூச்சி.',
    lifeCycle: 'Moth lays eggs in clusters; larvae stay together in huge family groups during day.',
    lifeCycleTa: 'பகலில் கூட்டமாகவே வாழும்.',
    physicalRemoval: [
      'Use a kerosene burning torch on a long bamboo pole to singe the congregating clusters directly on the trunk (பாரம்பரிய தீப்பந்தம் முறை)',
      'Tie a gunny sack or cloth band around the tree trunk smeared with wet mud and castor oil to block upward night climbing'
    ],
    physicalRemovalTa: [
      'பகலில் தண்டு மீது திரண்டிருக்கும் போது தீப்பந்தம் காட்டி பொசுக்குவது பாரம்பரிய முறை',
      'தண்டில் கோணிப்பை அல்லது வேப்பம்பிண்ணாக்கு பட்டை கட்டி மேலே ஏறுவதை தடுக்கவும்'
    ],
    saferBiologicalControls: [
      'Spray trunk clusters directly with 10% Fish oil rosin soap or Neem oil (10ml/L)',
      'Bt (Bacillus thuringiensis) spray on foliage'
    ],
    saferBiologicalControlsTa: ['தண்டில் உள்ள கூட்டத்தின் மீது வேப்பெண்ணெய் சோப் கரைசல் பீய்ச்சி அடிக்கவும்'],
    prevention: ['Inspect tree trunks daily in monsoon season to catch early clusters before they reach canopy'],
    preventionTa: ['மழைக்காலத்தில் தினமும் முருங்கை மரத்தின் தண்டை கண்காணிக்கவும்'],
    chemicalWarnings: 'Never spray poisonous chemicals on drumstick trees when harvesting leaves and pods for cooking. Torch-singing the trunk clusters eliminates 100% in 5 minutes with zero chemicals.',
    chemicalWarningsTa: 'முருங்கைக்கீரையை உண்பதால் ரசாயனம் அடிக்கக் கூடாது; தண்டு மீது தீப்பந்தம் காட்டுவதே முன்னோர்கள் கையாண்ட மிகச்சிறந்த முறை.'
  },
  {
    id: 'root-aphid',
    name: 'Root Aphids',
    nameTa: 'வேர் அசுவினி',
    scientificName: 'Rhopalosiphum rufiabdominale',
    category: 'Soil Pest',
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'White waxy aphids living entirely underground on plant roots, draining sap and attracting underground ant nests.',
    shortDescriptionTa: 'பூமிக்கடியில் வேர்களில் மட்டுமே ஒட்டிக்கொண்டு வாழும் வெள்ளை அசுவினிப் பூச்சிகள். வேர் சத்தை உறிஞ்சி செடியை வாடச் செய்யும்.',
    affectedPlants: ['Potted Houseplants', 'Paddy / Rice', 'Grass', 'Monstera', 'Chrysanthemum'],
    symptoms: [
      'Plant foliage turns pale, wilts, and shows nutrient deficiency despite fertilizer application',
      'White powdery wax deposits visible on the root ball and inside pot wall when unpotted',
      'Columns of ants marching in and out of pot drainage holes'
    ],
    symptomsTa: [
      'உரமிட்டும் செடி வெளிறி வாடுதல்',
      'தொட்டியை கவிழ்த்துப் பார்த்தால் வேர்களில் வெள்ளை மாவு படிந்திருத்தல்',
      'தொட்டியின் அடியில் எறும்புகள் புற்று கட்டுதல்'
    ],
    identificationMarks: 'Tiny teardrop bugs crawling on roots, often covered in chalky white powder (often mistaken for root mealybugs).',
    identificationMarksTa: 'வேர்ப்பகுதியில் ஊர்ந்து செல்லும் சிறு வெண் பூச்சிகள்.',
    lifeCycle: 'Perpetual underground generations tended and carried by subterranean ants.',
    lifeCycleTa: 'எறும்புகளால் வேருக்கு வேர் எடுத்துச் செல்லப்பட்டு வளர்க்கப்படும்.',
    physicalRemoval: ['Unpot plant, gently wash all soil off roots under running water, dip roots in 1% soap water, and repot in fresh sterile mix'],
    physicalRemovalTa: ['செடியை எடுத்து வேர்களை நீரில் கழுவி புதிய சுத்தமான மண்ணில் நடவும்'],
    saferBiologicalControls: [
      'Drench pot soil with Beauveria bassiana (10g/L) bio-insecticide',
      'Drench with cold-pressed Neem cake water'
    ],
    saferBiologicalControlsTa: ['வேப்பம்பிண்ணாக்கு ஊறவைத்த தண்ணீரை மண்ணில் ஊற்றவும்'],
    prevention: ['Keep ants out of container saucers using diatomaceous earth rings or water moats'],
    preventionTa: ['தொட்டி தட்டுகளில் தண்ணீர் வைத்து எறும்புகள் புகாமல் தடுக்கவும்'],
    chemicalWarnings: 'Chemical drenches kill root mycorrhizal fungi. Root washing and fresh potting mix repotting is 100% cure.',
    chemicalWarningsTa: 'வேர்களை சோப் தண்ணீரில் கழுவி புதிய மண்ணில் நடுவதே நிரந்தர தீர்வு.'
  },
  {
    id: 'coffee-white-stem-borer',
    name: 'Coffee White Stem Borer',
    nameTa: 'காப்பி வெள்ளை தண்டு துளைப்பான்',
    scientificName: 'Xylotrechus quadripes',
    category: 'Boring Pest',
    severity: 'Critical',
    imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Longhorn beetle whose white grubs tunnel deep through the main woody trunk of Arabica coffee trees in Nilgiris and Yercaud.',
    shortDescriptionTa: 'நீலகிரி, ஏற்காடு, கொல்லிமலை காபி தோட்டங்களின் பிரதான எதிரி. காபி மரத்தின் நடுத் தண்டை துளைத்து மரத்தை காய வைக்கும் வண்டு.',
    affectedPlants: ['Arabica Coffee (காபி மரம்)', 'Robusta Coffee'],
    symptoms: [
      'Swollen ridges and ring-like cracks on the bark of main coffee stems',
      'Leaves turn yellow, droop, and whole mature coffee trees dry up',
      'Trunk snaps easily at ground level revealing packed sawdust galleries'
    ],
    symptomsTa: [
      'காபி மரப்பட்டையில் மோதிரம் போன்ற வீக்கங்களும் வெடிப்புகளும் ஏற்படுதல்',
      'இலைகள் மஞ்சள் நிறமாகி மரம் முழுவதும் காய்ந்து போதல்'
    ],
    identificationMarks: 'Slender (15-20mm) black longhorned beetle with distinct white geometric chevron bands on wing covers.',
    identificationMarksTa: 'இறக்கையில் வெள்ளை வரிகள் கொண்ட 2 செமீ கருப்பு வண்டு.',
    lifeCycle: '10 months spent as grub tunneling inside the hardwood trunk.',
    lifeCycleTa: '10 மாதங்கள் மரத்தின் உள்ளே புழுவாக வாழும்.',
    physicalRemoval: [
      'Bark scrubbing: gently scrape bark of coffee trees using coconut husk in Oct-Nov to destroy beetle eggs',
      'Uproot and burn infested dried coffee trees immediately'
    ],
    physicalRemovalTa: [
      'அக்டோபரில் தென்னை நார் கொண்டு மரப்பட்டையை தேய்த்து முட்டைகளை அழிக்கவும்'
    ],
    saferBiologicalControls: [
      'Swab trunk with 10% lime-clay wash (சுண்ணாம்பு பூச்சு) before beetle flight season',
      'Beauveria bassiana drench'
    ],
    saferBiologicalControlsTa: ['மரத்தின் தண்டு மீது வெள்ளை சுண்ணாம்பு பூச்சு பூசவும்'],
    prevention: ['Maintain ideal two-tier shade tree canopy (Silver Oak / Fig) to keep coffee plots cool (beetles lay eggs only in sunny bark)'],
    preventionTa: ['நிழல் தரும் மரங்களை வளர்த்து காபி செடிகளுக்கு சீரான நிழல் தரவும்'],
    chemicalWarnings: 'Banned Lindane swabs leave carcinogens in coffee beans. Coconut husk bark-scrubbing and lime whitewash provide clean organic mastery.',
    chemicalWarningsTa: 'லிண்டேன் நஞ்சை பயன்படுத்தாதீர்கள்; மரப்பட்டையை தேய்த்து சுண்ணாம்பு பூசுவதே பாதுகாப்பானது.'
  }
];
