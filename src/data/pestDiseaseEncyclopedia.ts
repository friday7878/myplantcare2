import { PestDiseaseItem } from '../types';

export const PEST_DISEASE_ENCYCLOPEDIA: PestDiseaseItem[] = [
  // 10 COMMON DISEASES
  {
    id: 'powdery-mildew',
    type: 'disease',
    name: 'Powdery Mildew',
    nameTa: 'சாம்பல் நோய்',
    scientificName: 'Erysiphales spp.',
    category: 'Fungal Disease',
    symptoms: [
      'Talcum-powder-like white or ash-grey dusting on upper leaf surfaces',
      'Distorted curling leaves and stunted new bud development',
      'Premature leaf yellowing and drop'
    ],
    symptomsTa: [
      'இலைகளின் மேல் பகுதியில் வெள்ளை அல்லது சாம்பல் நிற மாவு போன்ற படலம்',
      'இலைகள் சுருங்குதல் மற்றும் மொட்டுகள் கருகிப் போதல்',
      'இலைகள் முன்கூட்டியே மஞ்சள் நிறமாகி உதிர்தல்'
    ],
    causes: ['Warm days followed by cool humid nights', 'Crowded plants with poor airflow', 'Shaded humid conditions'],
    affectedPlants: ['Rose', 'Zinnia', 'Cucumber', 'Pumpkin', 'Tomato', 'Peas', 'Hibiscus'],
    prevention: [
      'Space plants to allow abundant cross ventilation',
      'Water at soil level early in the morning so leaves dry quickly',
      'Avoid high-nitrogen fertilizers that create succulent susceptible foliage'
    ],
    organicTreatment: [
      'Baking soda spray: Mix 1 tbsp baking soda + 1/2 tsp mild liquid soap in 1 liter warm water and spray weekly',
      'Milk spray: 1 part milk to 9 parts water sprayed during direct sun creates natural antiseptic enzymes',
      'Neem oil spray (5ml/L) with emulsifier on both leaf sides'
    ],
    chemicalFreeTips: 'Prune away heavily coated leaves immediately and dispose of in garbage (do NOT compost infected leaves).',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'downy-mildew',
    type: 'disease',
    name: 'Downy Mildew',
    nameTa: 'அடிச்சாம்பல் நோய்',
    scientificName: 'Pseudoperonospora cubensis',
    category: 'Oomycete Water Mold',
    symptoms: [
      'Angular yellow spots bounded by leaf veins on the upper leaf surface',
      'Fluffy purple-grey felt-like mold growth on the underside of leaves during wet mornings',
      'Rapid browning and crisp collapse of leaves'
    ],
    symptomsTa: [
      'இலை நரம்புகளுக்கு இடையே மஞ்சள் நிற கட்ட வடிவ புள்ளிகள்',
      'இலையின் அடியில் ஊதா-சாம்பல் நிற பூஞ்சை பஞ்சு போன்ற படலம்',
      'இலைகள் கருகி உதிர்ந்து கொடிகள் நாசமடைதல்'
    ],
    causes: ['Cool temperatures (15-20°C) combined with high humidity (>85%)', 'Prolonged wet foliage from overhead sprinkler watering'],
    affectedPlants: ['Cucumber', 'Ridge Gourd', 'Bitter Gourd', 'Watermelon', 'Grapes', 'Spinach'],
    prevention: [
      'Trellis climbing gourds vertically to maximize canopy airflow and sun exposure',
      'Always drip water at the base of vines, never sprinkle overhead',
      'Remove lower leaves touching wet earth'
    ],
    organicTreatment: [
      'Sour buttermilk spray: Dilute 1 cup sour curd or buttermilk in 10 cups water; spray every 5 days',
      'Copper soap fungicide or Bordeaux mixture (1% solution) sprayed before heavy rains',
      'Trichoderma viride bio-fungicide soil drench'
    ],
    chemicalFreeTips: 'Sterilize pruners with 70% rubbing alcohol between snips to prevent spore transfer.',
    imageUrl: 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'root-rot',
    type: 'disease',
    name: 'Root Rot',
    nameTa: 'வேர் அழுகல் நோய்',
    scientificName: 'Pythium / Phytophthora / Fusarium',
    category: 'Waterborne Pathogen',
    symptoms: [
      'Plant wilts even though the soil is wet or muddy',
      'Foliage turns dull yellow, mushy, and drops easily',
      'Roots are brown, black, slimy, and emit a foul decaying smell instead of healthy white firm fibers'
    ],
    symptomsTa: [
      'மண்ணில் தண்ணீர் இருந்தும் செடி வாடி வதங்குதல்',
      'இலைகள் மஞ்சள் நிறமாகி மெத்தென்று அழுகி உதிர்தல்',
      'வேர்கள் கறுத்து துர்நாற்றத்துடன் சதைப்பற்று இழந்து அழுகுதல்'
    ],
    causes: ['Overwatering', 'Pots lacking drainage holes', 'Heavy clay soil trapping standing water', 'Oxygen starvation at root zone'],
    affectedPlants: ['Monstera', 'Snake Plant', 'Money Plant', 'Peace Lily', 'Aloe Vera', 'Chilli', 'Papaya'],
    prevention: [
      'Always ensure containers have functional drainage holes',
      'Use porous gritty potting soil with perlite, coarse sand, or pumice',
      'Follow the "soak and dry" rule: water only when upper inches feel dry'
    ],
    organicTreatment: [
      'Unpot plant, rinse roots gently under tap water, and prune away all blackened mushy rotted roots with sterile shears',
      'Dip remaining healthy white roots in 3% hydrogen peroxide solution (1 tbsp per cup water) or dust with ground cinnamon (natural antifungal)',
      'Repot in fresh dry well-aerating potting mix in a disinfected pot'
    ],
    chemicalFreeTips: 'Never let indoor plant pots sit in saucers full of runoff water for more than 20 minutes.',
    imageUrl: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'leaf-spot',
    type: 'disease',
    name: 'Fungal & Bacterial Leaf Spot',
    nameTa: 'இலைப்புள்ளி நோய்',
    scientificName: 'Cercospora / Alternaria / Septoria',
    category: 'Foliar Infection',
    symptoms: [
      'Circular or irregular brown, tan, or black spots with yellow halo rings',
      'Spots enlarge and coalesce, leaving shot-holes as dead leaf tissue falls out',
      'Severe defoliation starting from the lower oldest leaves upwards'
    ],
    symptomsTa: [
      'மஞ்சள் வளையத்துடன் கூடிய பழுப்பு அல்லது கருப்பு வட்ட வடிவ புள்ளிகள்',
      'புள்ளிகள் இணைந்து இலைகளில் ஓட்டைகள் ஏற்படுதல்',
      'கீழ் இலைகள் காய்ந்து செடி மொட்டையாகுதல்'
    ],
    causes: ['Rain or irrigation splashing fungal spores from soil onto lower leaves', 'Crowded damp plant canopies'],
    affectedPlants: ['Tomato', 'Brinjal', 'Rose', 'Marigold', 'Betel Leaf', 'Hibiscus', 'Spinach'],
    prevention: [
      'Mulch soil surface with clean straw, coco chips, or dry leaves to prevent rain splashback',
      'Prune off all lower branches within 6 inches of the ground',
      'Water base in morning'
    ],
    organicTreatment: [
      'Copper octanoate bio-spray or 1% Bordeaux mixture on leaves',
      'Garlic extract spray: blend 2 whole garlic bulbs in 1 liter water with 1 tsp soap; strain and spray',
      'Neem seed kernel extract (NSKE 5%)'
    ],
    chemicalFreeTips: 'Remove and burn or bin all infected spotted leaves; never throw into garden compost bins.',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'blight',
    type: 'disease',
    name: 'Early & Late Blight',
    nameTa: 'தீக்கருகல் நோய் (பிளைட்)',
    scientificName: 'Alternaria solani / Phytophthora infestans',
    category: 'Fungal / Oomycete Blight',
    symptoms: [
      'Concentric target-board rings on lower leaves (Early blight)',
      'Water-soaked dark lesions spreading rapidly across leaves, stems, and fruits like wildfire (Late blight)',
      'Entire foliage turns dark brown, shrivels, and smells like rotting potatoes'
    ],
    symptomsTa: [
      'இலைகளில் குறிபலகை போன்ற வளைய புள்ளிகள் தோன்றுதல்',
      'நீரில் ஊறியது போன்ற கரும்பழுப்பு புள்ளிகள் தண்டு மற்றும் காய்களுக்கும் பரவுதல்',
      'செடி தீயில் கருகியது போல காய்ந்து அழுகி நாசமடைதல்'
    ],
    causes: ['Warm humid weather (Early blight) or cool wet rainy foggy periods (Late blight)', 'Splashing spores'],
    affectedPlants: ['Tomato', 'Potato', 'Brinjal', 'Chilli', 'Capsicum'],
    prevention: [
      'Practice 3-year crop rotation (never plant tomatoes or potatoes in the same soil back-to-back)',
      'Choose blight-resistant seed cultivars',
      'Stake vines high above soil and mulch soil beneath'
    ],
    organicTreatment: [
      'Copper hydroxide or copper soap spray as preventive shield before rains',
      'Bacillus subtilis bio-agent foliar application to colonize leaf surface against blight spores',
      'Prune infected leaves immediately'
    ],
    chemicalFreeTips: 'Stake plants early and prune all leaves touching the ground to break the soil-borne infection ladder.',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'anthracnose',
    type: 'disease',
    name: 'Anthracnose',
    nameTa: 'ஆந்த்ராக்னோஸ் (கண் புள்ளி நோய்)',
    scientificName: 'Colletotrichum gloeosporioides',
    category: 'Fungal Necrosis',
    symptoms: [
      'Sunken dark circular lesions on fruits that ooze salmon-pink spore masses in wet conditions',
      'Dark necrotic tip dieback on young twigs and shoots',
      'Black spots on flowers causing complete floral drop and zero fruit set'
    ],
    symptomsTa: [
      'காய்கள் மற்றும் பழங்களில் உள்நோக்கி அமுங்கிய கரும்பழுப்பு கண் போன்ற புள்ளிகள்',
      'நுனித் தளிர்கள் கருகி வாடுதல்',
      'பூக்கள் உதிர்ந்து காய் பிடிக்காமல் போதல்'
    ],
    causes: ['Warm wet monsoons', 'Splashing rain droplets carrying fungal conidia spores onto tender flowers and fruits'],
    affectedPlants: ['Mango', 'Papaya', 'Chilli', 'Guava', 'Banana', 'Beans', 'Grapes'],
    prevention: [
      'Prune center branches of fruit trees to open canopy to full drying sunlight and wind',
      'Apply Trichoderma viride enriched compost around the root zone',
      'Harvest fruit slightly early before over-ripening on wet branches'
    ],
    organicTreatment: [
      'Panchagavya foliar spray (30ml per liter of water) every 15 days to enhance plant immune resistance',
      'Neem oil + bio-copper spray',
      'Prune and burn dead dieback twigs 2 inches below infected wood'
    ],
    chemicalFreeTips: 'Immerse harvested mangoes or papayas in warm water (52°C) for 5 minutes (hot water treatment) to destroy latent surface anthracnose spores without chemicals.',
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'rust-disease',
    type: 'disease',
    name: 'Plant Rust',
    nameTa: 'துரு நோய்',
    scientificName: 'Pucciniales spp.',
    category: 'Fungal Rust',
    symptoms: [
      'Rusty orange, reddish-brown, or yellow powdery pustules bursting through leaf undersides',
      'Yellow or pale flecks on upper leaf surfaces corresponding to rust pustules beneath',
      'Brittle dry leaves and premature defoliation'
    ],
    symptomsTa: [
      'இலையின் அடியில் துருப்பிடித்தது போன்ற செம்பழுப்பு பொடித் தடிப்புகள்',
      'இலைகள் காய்ந்து உதிர்தல்',
      'வளர்ச்சி குன்றி பூக்கள் குறைதல்'
    ],
    causes: ['High humidity combined with cool to moderate temperatures', 'Water lingering on foliage for more than 4 hours'],
    affectedPlants: ['Rose', 'French Beans', 'Chrysanthemum', 'Fig', 'Sunflower', 'Lemongrass'],
    prevention: [
      'Avoid late afternoon or evening watering so leaves never remain wet overnight',
      'Ensure wide spacing between plants for breeze',
      'Select rust-tolerant varieties'
    ],
    organicTreatment: [
      'Sulfur dusting: Apply micronized wettable elemental sulfur early in the morning when dew is fresh',
      'Neem oil spray (0.5% concentration)',
      'Horsetail or compost tea foliar spray to strengthen leaf epidermal cell walls with natural silica'
    ],
    chemicalFreeTips: 'Never apply sulfur sprays when temperatures exceed 30°C to avoid foliage burn.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mosaic-virus',
    type: 'disease',
    name: 'Mosaic Virus (TMV / CMV)',
    nameTa: 'மொசைக் வைரஸ் (தேமல் நோய்)',
    scientificName: 'Tobamovirus / Cucumovirus',
    category: 'Viral Infection',
    symptoms: [
      'Mottled mosaic patterns of dark green and yellow patches on leaves',
      'Distorted, blistered, crinkled, or shoestring-like narrow leaves',
      'Severe plant stunting, ring-spotted bumpy fruits, and aborted flowers'
    ],
    symptomsTa: [
      'இலைகளில் வெளிர் மஞ்சள் மற்றும் அடர்பச்சை நிற தேமல் போன்ற திட்டுகள்',
      'இலைகள் சுருங்கி கோணல்மாணலாக மாறுதல்',
      'செடி குட்டையாகி பழங்கள் புடைப்புகளுடன் உருமாறுதல்'
    ],
    causes: ['Vector transmission by sap-sucking pests (Aphids, Thrips, Whiteflies)', 'Transmission by handling plants with unwashed hands after smoking tobacco'],
    affectedPlants: ['Tomato', 'Chilli', 'Okra (Yellow Vein)', 'Cucumber', 'Papaya', 'Brinjal'],
    prevention: [
      'Strict control of insect vectors (aphids and whiteflies) using yellow sticky traps and neem oil',
      'Wash hands thoroughly with soap before touching plants; smokers must avoid handling seedlings',
      'Grow barrier companion crops like maize or sorghum around garden beds'
    ],
    organicTreatment: [
      'No cure once infected: immediately pull out the entire infected plant by roots, bag it, and burn or dispose',
      'Spray sour buttermilk (1:10) on surrounding healthy plants to boost resistance against viral replication',
      'Spray neem oil on surrounding plants to kill insect carriers'
    ],
    chemicalFreeTips: 'Never compost virus-infected plants; the virus particles survive inside compost heat and can re-infect the garden.',
    imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'damping-off',
    type: 'disease',
    name: 'Damping-Off',
    nameTa: 'நாற்று அழுகல் நோய்',
    scientificName: 'Rhizoctonia solani / Pythium ultimum',
    category: 'Seedling Fungal Blight',
    symptoms: [
      'Seeds rot in seed tray before sprouting',
      'Newly emerged tender seedlings develop water-soaked brown constriction at soil line and topple over overnight',
      'White cottony fungal web on nursery soil surface'
    ],
    symptomsTa: [
      'விதைத்த விதைகள் மண்ணிலேயே அழுகி முளைக்காமல் போதல்',
      'முளைத்த இளம் நாற்றுகளின் தண்டு அடியில் மெலிந்து ஒரே இரவில் சாய்ந்து மடிதல்',
      'விதைத்த தட்டில் வெள்ளை பூஞ்சை படர்தல்'
    ],
    causes: ['Overwatered soggy cold seed trays', 'Unsterilized garden soil used for nursery seedlings', 'Lack of sunlight and air circulation'],
    affectedPlants: ['Tomato seedlings', 'Chilli seedlings', 'Brinjal', 'Cabbage', 'Cauliflower', 'Marigold'],
    prevention: [
      'Always start seeds in sterile soilless seed starter mix (coco peat + vermiculite + perlite)',
      'Water seed trays from bottom using capillary mats; never flood seedlings from above',
      'Provide warm gentle airflow using a small fan and bright morning sun'
    ],
    organicTreatment: [
      'Dust seeds with Trichoderma harzianum or Pseudomonas fluorescens before sowing',
      'Dust nursery soil surface lightly with Ceylon ground cinnamon powder (natural mild antifungal)',
      'Chamomile tea drench: brew strong chamomile tea, let cool, and mist seedlings'
    ],
    chemicalFreeTips: 'Microwave damp potting soil for 90 seconds to sterilize it naturally before filling seedling trays.',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bacterial-wilt',
    type: 'disease',
    name: 'Bacterial Wilt',
    nameTa: 'பாக்டீரியா வாடல் நோய்',
    scientificName: 'Ralstonia solanacearum',
    category: 'Vascular Bacterial Disease',
    symptoms: [
      'Rapid sudden daytime wilting of entire green plant without prior yellowing',
      'Plant recovers slightly at night initially, then permanently wilts within 48 hours while remaining green',
      'Stem ooze test: cut stem dipped in a clear glass of water releases milky white bacterial streaming threads within 3 minutes'
    ],
    symptomsTa: [
      'இலைகள் பச்சையாக இருக்கும் போதே செடி திடீரென வாடி வதங்குதல்',
      'இரவில் லேசாக உயிர்ப்பித்து 2 நாட்களில் முற்றிலும் காய்ந்து போதல்',
      'தண்டை வெட்டி தண்ணீரில் வைத்தால் பால் போன்ற பாக்டீரியா திரவம் வெளியேறுதல்'
    ],
    causes: ['Soil-borne bacteria entering root wounds made by nematodes, transplanting, or digging', 'High soil temperatures and high moisture'],
    affectedPlants: ['Brinjal', 'Tomato', 'Chilli', 'Potato', 'Ginger', 'Banana'],
    prevention: [
      'Incorporate crushed neem cake and marigold root extracts into soil to suppress root-knot nematodes',
      'Solarize garden beds under clear plastic sheeting for 4 weeks during peak summer to bake out bacteria',
      'Use grafted resistant rootstocks'
    ],
    organicTreatment: [
      'Drench soil with Pseudomonas fluorescens bio-inoculant (20g per liter) before planting',
      'Uproot and destroy infected plants immediately; do not let sap touch healthy plants',
      'Apply lime to raise acidic soil pH above 6.5'
    ],
    chemicalFreeTips: 'Intercrop with Marigolds and Mustard; their root exudates naturally suppress the Ralstonia bacterial population in soil.',
    imageUrl: 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?auto=format&fit=crop&w=600&q=80'
  },

  // 10 COMMON PESTS
  {
    id: 'aphids',
    type: 'pest',
    name: 'Aphids (Greenflies / Plant Lice)',
    nameTa: 'அசுவினி பூச்சி (இலைப்பேன்)',
    scientificName: 'Aphidoidea',
    category: 'Sap-Sucking Insect',
    symptoms: [
      'Dense clusters of tiny pear-shaped soft-bodied green, black, or yellow bugs crowding tender new shoots and flower buds',
      'Curled, crinkled, and stunted leaves covered in sticky sweet droplets (honeydew)',
      'Black sooty mold growing over the sweet honeydew on leaf surfaces; ants marching on stems'
    ],
    symptomsTa: [
      'இளம் தளிர்கள் மற்றும் மொட்டுகளில் கொத்துக் கொத்தாக காணப்படும் பச்சை, கருப்பு அல்லது மஞ்சள் நிற பூச்சிகள்',
      'இலைகள் சுருண்டு போதல் மற்றும் பிசுபிசுப்பான தேன் போன்ற திரவம் படிதல்',
      'தேன் திரவத்தின் மேல் கரும்பூஞ்சை படர்தல்; எறும்புகள் ஊர்ந்து செல்லுதல்'
    ],
    causes: ['Excessive high-nitrogen fertilizer producing soft succulent shoots', 'Warm dry spring weather', 'Absence of natural predators like ladybugs'],
    affectedPlants: ['Rose', 'Hibiscus', 'Chilli', 'Beans', 'Coriander', 'Tomato', 'Mustard'],
    prevention: [
      'Attract beneficial predatory insects (ladybugs, lacewings, hoverflies) by planting companion dill, fennel, and marigolds',
      'Install yellow sticky insect traps near canopy height',
      'Inspect leaf undersides weekly'
    ],
    organicTreatment: [
      'High-pressure blast of plain water from a garden hose nozzle to physically knock aphids off stems',
      'Insecticidal soap spray: Mix 1 tbsp pure mild castile soap in 1 liter warm water and spray directly on bugs',
      'Neem oil spray (5ml neem oil + 2ml liquid soap in 1 liter water) sprayed every 4 days'
    ],
    chemicalFreeTips: 'Control garden ants! Ants farm and protect aphids from ladybugs to harvest their sweet honeydew. Put sticky barriers on tree trunks.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mealybugs',
    type: 'pest',
    name: 'Mealybugs',
    nameTa: 'மாவுப்பூச்சி',
    scientificName: 'Pseudococcidae',
    category: 'Sap-Sucking Insect',
    symptoms: [
      'White cottony, fuzzy wax clusters tucked into stem joints, leaf axils, and leaf undersides',
      'Leaves turn yellow, wither, and prematurely drop due to severe sap loss',
      'Sticky honeydew followed by black sooty mold coating foliage'
    ],
    symptomsTa: [
      'கிளை இடுக்குகள் மற்றும் இலையின் அடியில் வெள்ளை பஞ்சு போன்ற மாவு படிவம்',
      'செடியின் சாறு உறிஞ்சப்பட்டு இலைகள் மஞ்சள் நிறமாகி உதிர்தல்',
      'இலைகளில் பிசுபிசுப்பான திரவமும் கரும்பூஞ்சையும் தோன்றுதல்'
    ],
    causes: ['Warm humid climates', 'Indoor plants with stagnant air', 'Overcrowded balconies allowing bugs to crawl between touching pots'],
    affectedPlants: ['Hibiscus', 'Papaya', 'Guava', 'Money Plant', 'Jade Plant', 'Coleus', 'Croton', 'Custard Apple'],
    prevention: [
      'Quarantine any newly purchased nursery plant for 14 days before introducing to your garden',
      'Prune overlapping branches to prevent physical contact between adjacent pots',
      'Spray monthly neem oil wash'
    ],
    organicTreatment: [
      'Rubbing alcohol swab: Dip a cotton Q-tip in 70% isopropyl rubbing alcohol and dab directly on each white cottony mealybug (dissolves their protective wax instantly)',
      'Neem oil + liquid soap spray (7ml neem oil + 3ml soap in 1L water) with fine mist directed into leaf crevices',
      'Release predatory Cryptolaemus montrouzieri (Mealybug destroyer ladybirds)'
    ],
    chemicalFreeTips: 'Check the bottom drainage holes and rim underside of pots; mealybugs frequently hide and lay waxy egg sacs under pot lips.',
    imageUrl: 'https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'spider-mites',
    type: 'pest',
    name: 'Spider Mites',
    nameTa: 'செம்பேன் (சிலந்திப் பூச்சி)',
    scientificName: 'Tetranychus urticae',
    category: 'Microscopic Arachnid Pest',
    symptoms: [
      'Fine stippling of yellow, white, or bronze pinprick dots across upper leaf surfaces',
      'Delicate silky cobwebs spun between leaves and stem tips',
      'Foliage looks dusty, loses gloss, turns pale bleached yellow, and feels papery'
    ],
    symptomsTa: [
      'இலைகளின் மேல் பகுதியில் எண்ணற்ற நுண்ணிய மஞ்சள், வெள்ளை ஊசிப்புள்ளிகள்',
      'இலைகளுக்கு இடையே மெல்லிய சிலந்தி வலைகள் பின்னி இருத்தல்',
      'இலைகள் பளபளப்பை இழந்து தூசி படிந்தது போல வெளிறி காய்ந்து போதல்'
    ],
    causes: ['Hot, dry, dusty, low-humidity environments', 'Indoor plants near air conditioners or heaters'],
    affectedPlants: ['Rose', 'Marigold', 'Croton', 'Snake Plant', 'Tomato', 'Brinjal', 'Ivy'],
    prevention: [
      'Increase ambient humidity by misting plants regularly with clean water',
      'Wipe down indoor houseplant leaves with a damp microfiber cloth monthly',
      'Avoid dry dusty soil'
    ],
    organicTreatment: [
      'Shower the entire plant thoroughly in the bathroom or with a hose spray, paying special attention to washing leaf undersides',
      'Cold-pressed neem oil spray (5ml/L) with horticultural liquid soap applied every 3 days for 2 weeks to break the egg cycle',
      'Rosemary oil or peppermint oil organic spray (10 drops in 1L water)'
    ],
    chemicalFreeTips: 'Hold a blank sheet of white paper under an infected leaf and tap the stem: tiny specks moving like dust confirm spider mites.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'whiteflies',
    type: 'pest',
    name: 'Whiteflies',
    nameTa: 'வெள்ளைப் பூச்சி (வெள்ளை ஈ)',
    scientificName: 'Aleyrodidae',
    category: 'Sap-Sucking Winged Insect',
    symptoms: [
      'Cloud of tiny white moth-like insects fluttering up into the air when the plant foliage is gently shaken',
      'Sticky clear honeydew droplets on lower leaves and ground beneath',
      'Leaves yellow, curl inward, and develop black sooty mold; transmission of leaf curl virus'
    ],
    symptomsTa: [
      'செடியை லேசாக அசைத்தால் வெண்ணிற சிறிய ஈக்கள் கூட்டமாக பறத்தல்',
      'இலைகளில் பிசுபிசுப்புத் திரவம் மற்றும் கரும்பூஞ்சை படர்தல்',
      'இலைகள் மஞ்சள் நிறமாகி சுருண்டு போதல் மற்றும் வைரஸ் நோய் பரவுதல்'
    ],
    causes: ['Warm sheltered sunny conditions', 'High-nitrogen fertilizers producing excess soft leafy tissue', 'Lack of predatory beneficial insects'],
    affectedPlants: ['Tomato', 'Chilli', 'Okra', 'Brinjal', 'Poinsettia', 'Hibiscus', 'Lantana'],
    prevention: [
      'Hang yellow sticky card traps just above the foliage canopy (whiteflies are intensely drawn to yellow color)',
      'Plant French Marigolds around garden beds (marigolds emit limonene which repels whiteflies naturally)',
      'Vacuum foliage gently on cool mornings when insects are sluggish'
    ],
    organicTreatment: [
      'Insecticidal soap spray thoroughly drenching the undersides of leaves where immobile nymphs feed',
      'Neem oil spray (5ml neem + 2ml liquid soap/L) every 5 days for 3 cycles',
      'Sour buttermilk and asafoetida (perungayam) spray'
    ],
    chemicalFreeTips: 'Always spray early morning or late evening; spray strictly the undersides of leaves where 95% of whitefly eggs and nymphs hide.',
    imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'scale-insects',
    type: 'pest',
    name: 'Scale Insects',
    nameTa: 'செதில் பூச்சி (செதில் பூச்சிகள்)',
    scientificName: 'Coccoidea',
    category: 'Armored / Soft Scale',
    symptoms: [
      'Small, immobile, hard brown, tan, or white waxy bumps encrusted along woody stems and leaf veins',
      'Yellow spots on leaves directly above where scale insects are feeding beneath',
      'Stunted weak shoots, premature leaf drop, and sticky sap drips'
    ],
    symptomsTa: [
      'தண்டு மற்றும் இலை நரம்புகளில் நகர முடியாத சிறிய பிரவுன் அல்லது வெள்ளை ஓட்டு போன்ற தடிப்புகள்',
      'இலைகளில் மஞ்சள் புள்ளிகள் மற்றும் வளர்ச்சி குன்றுதல்',
      'பிசுபிசுப்பான திரவம் ஒழுகுதல்'
    ],
    causes: ['Stressed underwatered or root-bound plants', 'Dry indoor air', 'Lack of natural parasitic wasps'],
    affectedPlants: ['Citrus (Lemon/Orange)', 'Ficus / Rubber Plant', 'Curry Leaf', 'Bay Leaf', 'Ferns', 'Orchids'],
    prevention: [
      'Maintain steady plant vigor with balanced compost and proper hydration',
      'Prune out heavily encrusted branches early',
      'Inspect citrus stems frequently'
    ],
    organicTreatment: [
      'Scrape off individual scales using an old soft toothbrush dipped in soapy water or neem solution',
      'Horticultural neem dormant oil spray: coats the shells and suffocates the breathing pores of scale insects beneath their armor',
      'Dab stubborn adult scales with rubbing alcohol'
    ],
    chemicalFreeTips: 'Adult scale insects don’t move; scraping them off physically with a fingernail or toothbrush immediately terminates them.',
    imageUrl: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'thrips',
    type: 'pest',
    name: 'Thrips',
    nameTa: 'இலைப்பேன் (திரிப்ஸ்)',
    scientificName: 'Thysanoptera',
    category: 'Piercing-Rasping Insect',
    symptoms: [
      'Silvery or bronzed metallic sheen on leaves with tiny black fecal speckles',
      'Distorted, boat-shaped curled leaves with brown crinkled edges',
      'Flower petals develop brown bleached streaks and buds fail to open properly'
    ],
    symptomsTa: [
      'இலைகளில் வெள்ளி அல்லது வெண்கல நிற பளபளப்பான கோடுகளும் சிறு கரும்புள்ளிகளும் தோன்றுதல்',
      'இலைகள் படகு போல மேல்நோக்கி சுருண்டு ஓரங்கள் கருகிப் போதல்',
      'மலர்களின் இதழ்கள் நிறம் மங்கி மொட்டுகள் விரியாமல் போதல்'
    ],
    causes: ['Warm dry windy weather', 'Spring flush periods with abundant tender flower petals and new foliage'],
    affectedPlants: ['Chilli (Murukku leaf curl)', 'Rose', 'Gladiolus', 'Capsicum', 'Tomato', 'Onion'],
    prevention: [
      'Install blue sticky traps (thrips are attracted to blue wavelength light more than yellow)',
      'Mulch with reflective silver/aluminum foil mulch to disorient flying thrips',
      'Keep garden beds free of wild weeds'
    ],
    organicTreatment: [
      'Neem oil + Pongamia (Karanja) oil mixture (3ml each + 2ml soap in 1L water) sprayed fortnightly',
      'Spinosad bio-spray: natural fermentation bacterial product highly effective against rasping thrips',
      'Sour buttermilk + asafoetida spray for chilli leaf curl'
    ],
    chemicalFreeTips: 'Chilli leaf curl caused by thrips curls leaves upward like a cup; mite damage curls leaves downward like an inverted spoon.',
    imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'caterpillars-cutworms',
    type: 'pest',
    name: 'Caterpillars & Cutworms',
    nameTa: 'கம்பளிப்பூச்சி & வெட்டுப்புழு',
    scientificName: 'Lepidoptera larvae',
    category: 'Chewing Leaf Larvae',
    symptoms: [
      'Large irregular holes chewed out of leaves or entire foliage stripped down to bare leaf midribs (skeletonization)',
      'Young seedlings cleanly snipped off at the soil line overnight by cutworms',
      'Dark green or black pellet-like frass (caterpillar droppings) visible on leaves beneath'
    ],
    symptomsTa: [
      'இலைகள் பெரிய அளவில் கடித்து மெல்லப்பட்டு நரம்புகள் மட்டுமே மிஞ்சுதல்',
      'இளம் நாற்றுகள் இரவு நேரத்தில் அடியோடு வெட்டி சாய்க்கப்படுதல்',
      'இலைகளில் கருப்பு நிற உருண்டை வடிவ புழுக்களின் கழிவுகள் காணப்படுதல்'
    ],
    causes: ['Moths and butterflies laying eggs on leaf undersides during monsoon and spring seasons'],
    affectedPlants: ['Cabbage', 'Cauliflower', 'Tomato (Hornworm)', 'Drumstick', 'Curry Leaf', 'Castor', 'Brinjal'],
    prevention: [
      'Cover vegetable rows with lightweight insect barrier mesh netting to block adult moths from laying eggs',
      'Inspect undersides of leaves and wipe off visible clusters of tiny round moth egg masses',
      'Place protective cardboard collar rings around bases of young transplants'
    ],
    organicTreatment: [
      'Handpick: Inspect plants in morning or after dark with a flashlight and handpick caterpillars into a bucket of soapy water',
      'Bacillus thuringiensis (Bt / Dipel): organic bacterium safe for humans and bees; paralyzes caterpillar digestive system when eaten',
      'Neem Seed Kernel Extract (NSKE 5%) sprayed on foliage'
    ],
    chemicalFreeTips: 'Place a small cardboard toilet paper roll collar around the stem of each newly transplanted seedling, sunk 1 inch into soil to stop cutworms.',
    imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'leaf-miners',
    type: 'pest',
    name: 'Leaf Miners',
    nameTa: 'இலைத்துளைப்பான் (சுரங்கப் புழு)',
    scientificName: 'Liriomyza spp.',
    category: 'Burrowing Larvae',
    symptoms: [
      'Winding, snake-like white or translucent squiggly trails tunnels carved inside leaf layers',
      'Severely mined leaves dry up, turn brown, and drop prematurely',
      'Loss of photosynthetic area stunting growth'
    ],
    symptomsTa: [
      'இலைகளுக்குள் பாம்பு போன்ற வெள்ளை நிற வளைந்து நெளிந்த சுரங்கக் கோடுகள்',
      'தாக்கப்பட்ட இலைகள் காய்ந்து கருகி உதிர்தல்',
      'ஒளிச்சேர்க்கை பாதிக்கப்பட்டு செடியின் வளர்ச்சி குன்றுதல்'
    ],
    causes: ['Small black-and-yellow flies inserting eggs directly inside leaf tissue layers', 'Warm humid weather'],
    affectedPlants: ['Tomato', 'Spinach', 'Citrus (Lemon/Orange)', 'Watermelon', 'Beans', 'Cucumber'],
    prevention: [
      'Cover vulnerable vegetable beds with fine insect mesh to prevent adult flies from landing',
      'Yellow sticky traps placed near canopy to catch adult flies',
      'Regular scouting of early tender flushes'
    ],
    organicTreatment: [
      'Pinch off and destroy early leaves displaying visible trails before larvae pupate and multiply',
      'Crush the tiny larva at the end of the trail between your fingertips directly without tearing off the whole leaf',
      'Neem oil spray (acts as an anti-feedant and stops egg hatching inside tissue)'
    ],
    chemicalFreeTips: 'On citrus trees, leaf miners strictly target fresh glossy tender new leaves; spray neem oil as soon as tender reddish-green flush emerges.',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'fungus-gnats',
    type: 'pest',
    name: 'Fungus Gnats',
    nameTa: 'பூஞ்சை கொசுக்கள் (மண் ஈக்கள்)',
    scientificName: 'Sciaridae',
    category: 'Soil Pest',
    symptoms: [
      'Tiny black mosquito-like flies hovering around the soil surface and darting across houseplant pots',
      'Microscopic clear-headed white larvae feeding on delicate feeder root hairs in damp soil',
      'Seedlings wilt or lose vigor without visible leaf pests; poor growth in potted plants'
    ],
    symptomsTa: [
      'தொட்டி மண்ணின் மேல் கொசு போன்ற சிறிய கருப்பு ஈக்கள் வட்டமிட்டு பறத்தல்',
      'மண்ணில் உள்ள புழுக்கள் செடியின் நுண் வேர்களை கடித்து உண்பதால் வளர்ச்சி குன்றுதல்',
      'இலைகள் வாடி மஞ்சள் நிறமாதல்'
    ],
    causes: ['Consistently damp soggy potting soil with rotting organic matter', 'Overwatering indoor plants'],
    affectedPlants: ['Peace Lily', 'Money Plant', 'Ferns', 'Fiddle Leaf Fig', 'Seedling Trays', 'Indoor potted plants'],
    prevention: [
      'Allow the top 2 inches of potting soil to dry out completely between waterings (dry soil kills gnat eggs and larvae)',
      'Water indoor plants strictly from the bottom drainage hole saucer',
      'Cover soil surface with a 1/2 inch layer of clean coarse sand or aquarium gravel'
    ],
    organicTreatment: [
      'Yellow sticky stakes pushed into the soil to catch flying breeding adults',
      'Hydrogen peroxide soil drench: Mix 1 part 3% hydrogen peroxide with 4 parts water and drench soil (fizzes and kills larvae instantly on contact while releasing oxygen to roots)',
      'Mosquito Dunks (Bacillus thuringiensis israelensis - Bti) dissolved in watering can'
    ],
    chemicalFreeTips: 'A 1/2 inch top-dressing of dry coarse sand stops fungus gnats completely because adult females cannot burrow through grit to lay eggs in moist soil.',
    imageUrl: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'snails-and-slugs',
    type: 'pest',
    name: 'Snails & Slugs',
    nameTa: 'நத்தைகள் & நத்தையின புழுக்கள்',
    scientificName: 'Gastropoda',
    category: 'Mollusk Pest',
    symptoms: [
      'Large irregular smooth-edged ragged holes chewed through tender foliage and ripe low-hanging fruits',
      'Seedlings completely devoured overnight down to a bare stem stub',
      'Silvery iridescent dried slime trails glistening across leaves, pots, and soil in morning light'
    ],
    symptomsTa: [
      'இரவு நேரத்தில் இலைகளும் பழங்களும் பெரிய அளவில் கடித்து மெல்லப்படுதல்',
      'இளம் நாற்றுகள் காணாமல் போதல்',
      'இலைகள் மற்றும் தரையில் பளபளக்கும் வெள்ளி போன்ற வழுவழுப்பான சளிப் பாதைகள் படிந்திருத்தல்'
    ],
    causes: ['Cool, damp, dark hiding spots during daytime (under bricks, mulch, or dense groundcovers)', 'Nighttime rain or evening watering'],
    affectedPlants: ['Lettuce', 'Spinach', 'Hostas', 'Strawberry', 'Marigold', 'Cabbage', 'Orchids'],
    prevention: [
      'Water exclusively in early morning so topsoil and mulch dry out completely before nighttime',
      'Clear away damp piles of bricks, stones, and rotting wooden boards near garden beds where slugs hide by day',
      'Create abrasive perimeter barriers around beds using crushed eggshells, wood ash, or diatomaceous earth'
    ],
    organicTreatment: [
      'Beer trap: Bury an empty tuna can or plastic cup flush with soil level and fill half-full with beer; yeast fragrance lures slugs in to drown',
      'Copper foil tape wrapped around pot rims (emits a harmless natural electrical micro-shock to snails’ moist slimy bodies)',
      'Night patrol with a flashlight 2 hours after sunset: handpick slugs and drop into a bucket of salt water'
    ],
    chemicalFreeTips: 'Crushed eggshells scattered in a 2-inch wide ring around plant bases deter snails as the sharp calcium edges lacerate their soft undersides.',
    imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80'
  }
];

export function getPestDiseaseById(id: string): PestDiseaseItem | undefined {
  return PEST_DISEASE_ENCYCLOPEDIA.find((item) => item.id === id);
}

export function getItemsByType(type: 'disease' | 'pest'): PestDiseaseItem[] {
  return PEST_DISEASE_ENCYCLOPEDIA.filter((item) => item.type === type);
}
