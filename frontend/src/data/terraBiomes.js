// TERRA 10 Biospheres & Destination Catalogue Specification
export const BIOMES = [
  {
    id: 'desert',
    name: 'Desert',
    displayName: 'Desert Biosphere',
    emoji: '🏜️',
    accentColor: '#D97706',
    secondaryColor: '#B45309',
    gradientCss: 'radial-gradient(ellipse at top, #92400E 0%, #1C0A00 70%)',
    atmosphericEffect: 'Heat shimmer distortion & blowing golden sand particles',
    bgImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2400&q=85',
    destinationCount: 14,
    climateTags: ['Arid', 'Dry', 'Extreme Sun', 'Cold Nights'],
    avgTemp: '34°C / 93°F',
    bestMonth: 'October – March',
    featuredDestinations: [
      {
        id: 'rajasthan',
        name: 'Thar Desert, Rajasthan',
        country: 'India',
        flag: '🇮🇳',
        coordinates: { lat: 26.9157, lng: 70.9083 },
        rating: 4.9,
        reviewsCount: 1240,
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
        description: 'Vast shifting golden sand dunes, starlit camping, camel caravans, and majestic desert forts.',
        weather: { temp: 31, condition: 'Clear Sky', humidity: '22%', uv: '8.5 High' },
        safetyIndex: 9.4,
        dailyBudget: { budget: 1800, mid: 4500, luxury: 12000, currency: 'INR' },
        story: 'The great desert of kings where sandstone battlements glow like molten gold under twilight sky.',
        experiences: ['Sunset Camel Safari', 'Fort Night Walk', 'Desert Stargazing', 'Folk Music Around Fire']
      },
      {
        id: 'sahara',
        name: 'Sahara & Merzouga',
        country: 'Morocco',
        flag: '🇲🇦',
        coordinates: { lat: 31.0802, lng: -4.0134 },
        rating: 4.8,
        reviewsCount: 2100,
        image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
        description: 'Endless red-orange sand erg dunes rippling toward the horizon beneath ancient nomadic skies.',
        weather: { temp: 33, condition: 'Sunny', humidity: '18%', uv: '9.0 Extreme' },
        safetyIndex: 8.8,
        dailyBudget: { budget: 2400, mid: 6200, luxury: 18000, currency: 'MAD' },
        story: 'Traverse the towering sea of dunes where the silence of earth feels ancient and endless.',
        experiences: ['Berber Camp Music', '4x4 Dune Bashing', 'Sunrise Sandboarding']
      },
      {
        id: 'wadirum',
        name: 'Wadi Rum Valley',
        country: 'Jordan',
        flag: '🇯🇴',
        coordinates: { lat: 29.5735, lng: 35.4334 },
        rating: 4.9,
        reviewsCount: 980,
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
        description: 'Dramatic granite and sandstone valleys known as the Valley of the Moon.',
        weather: { temp: 28, condition: 'Sun Warm', humidity: '20%', uv: '8.0' },
        safetyIndex: 9.1,
        dailyBudget: { budget: 3200, mid: 7800, luxury: 22000, currency: 'JOD' },
        story: 'Carved canyon walls etched with petroglyphs and Mars-like red landscapes.',
        experiences: ['Bedouin Jeep Tour', 'Stargazing Dome Stay', 'Rock Arch Climbing']
      }
    ]
  },
  {
    id: 'ocean',
    name: 'Ocean',
    displayName: 'Ocean Biosphere',
    emoji: '🌊',
    accentColor: '#0284C7',
    secondaryColor: '#0369A1',
    gradientCss: 'radial-gradient(ellipse at top, #0C4A6E 0%, #000B14 70%)',
    atmosphericEffect: 'Floating light caustic patterns & gentle wave ripple overlay',
    bgImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2400&q=85',
    destinationCount: 22,
    climateTags: ['Marine', 'Tropical Waters', 'Coral Reefs', 'Trade Winds'],
    avgTemp: '28°C / 82°F',
    bestMonth: 'November – April',
    featuredDestinations: [
      {
        id: 'maldives',
        name: 'Baa Atoll Lagoon',
        country: 'Maldives',
        flag: '🇲🇻',
        coordinates: { lat: 5.1432, lng: 73.0169 },
        rating: 4.95,
        reviewsCount: 3400,
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
        description: 'Crystal turquoise atoll lagoons, bioluminescent plankton, and vibrant manta ray sanctuaries.',
        weather: { temp: 29, condition: 'Tropical Breeze', humidity: '74%', uv: '10' },
        safetyIndex: 9.8,
        dailyBudget: { budget: 5500, mid: 14000, luxury: 45000, currency: 'USD' },
        story: 'UNESCO World Biosphere Reserve hosting aggregations of hundreds of graceful reef mantas.',
        experiences: ['Manta Ray Snorkeling', 'Overwater Villa Sunset', 'Night Bio-Plankton Dive']
      },
      {
        id: 'greatbarrier',
        name: 'Great Barrier Reef',
        country: 'Australia',
        flag: '🇦🇺',
        coordinates: { lat: -18.2871, lng: 147.6992 },
        rating: 4.9,
        reviewsCount: 4200,
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
        description: 'The planet’s largest living organism visible from orbit with kaleidoscopic marine life.',
        weather: { temp: 27, condition: 'Warm Coastal', humidity: '68%', uv: '9.2' },
        safetyIndex: 9.5,
        dailyBudget: { budget: 4800, mid: 11000, luxury: 32000, currency: 'AUD' },
        story: 'Over 2,900 individual coral reefs spanning 2,300 km of protected crystal ocean.',
        experiences: ['Outer Reef Scuba Dive', 'Helicopter Scenic Flyover', 'Marine Biologist Tour']
      }
    ]
  },
  {
    id: 'mountain',
    name: 'Mountain',
    displayName: 'Alpine Mountain Biosphere',
    emoji: '🏔️',
    accentColor: '#64748B',
    secondaryColor: '#475569',
    gradientCss: 'radial-gradient(ellipse at top, #1E293B 0%, #020617 70%)',
    atmosphericEffect: 'Drifting fog wisps & snow particle flurries',
    bgImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=85',
    destinationCount: 34,
    climateTags: ['Alpine', 'Sub-Zero Nights', 'Thin Air', 'Glacial Winds'],
    avgTemp: '12°C / 54°F',
    bestMonth: 'April – October',
    featuredDestinations: [
      {
        id: 'himalayas',
        name: 'Leh & Zanskar Valley',
        country: 'India',
        flag: '🇮🇳',
        coordinates: { lat: 34.1526, lng: 77.5771 },
        rating: 4.92,
        reviewsCount: 1890,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        description: 'High-altitude desert mountains, dramatic Tibetan monasteries perched on sheer cliff edges.',
        weather: { temp: 14, condition: 'Crisp & Sunny', humidity: '28%', uv: '11 Extreme' },
        safetyIndex: 9.2,
        dailyBudget: { budget: 2200, mid: 5200, luxury: 14500, currency: 'INR' },
        story: 'Cross high mountain passes into ancient Buddhist sanctuaries untouched by modern noise.',
        experiences: ['Khardung La Pass Ride', 'Pangong Tso Lakeside', 'Thiksey Monastery Sunrise']
      },
      {
        id: 'swissalps',
        name: 'Zermatt & Matterhorn',
        country: 'Switzerland',
        flag: '🇨🇭',
        coordinates: { lat: 45.9765, lng: 7.7491 },
        rating: 4.96,
        reviewsCount: 3100,
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
        description: 'The iconic jagged pyramidal peak of the Alps overlooking car-free alpine pine chalets.',
        weather: { temp: 8, condition: 'Alpine Chill', humidity: '52%', uv: '6.4' },
        safetyIndex: 9.9,
        dailyBudget: { budget: 8500, mid: 22000, luxury: 55000, currency: 'CHF' },
        story: 'Ride the Gornergrat cogwheel railway with 360-degree views of 29 four-thousand-meter summits.',
        experiences: ['Gornergrat Glacier Train', 'Alpine Fondue Dinner', 'High Valley Hiking']
      }
    ]
  },
  {
    id: 'beach',
    name: 'Beach',
    displayName: 'Coastal Beach Biosphere',
    emoji: '🏖️',
    accentColor: '#0EA5E9',
    secondaryColor: '#38BDF8',
    gradientCss: 'radial-gradient(ellipse at top, #0369A1 0%, #000A12 70%)',
    atmosphericEffect: 'Gentle foam particle rush & lens flare at horizon',
    bgImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=85',
    destinationCount: 28,
    climateTags: ['Maritime', 'Warm Sand', 'Salt Spray', 'Sun-Kissed'],
    avgTemp: '29°C / 84°F',
    bestMonth: 'December – May',
    featuredDestinations: [
      {
        id: 'palawan',
        name: 'El Nido, Palawan',
        country: 'Philippines',
        flag: '🇵🇭',
        coordinates: { lat: 11.1956, lng: 119.4175 },
        rating: 4.91,
        reviewsCount: 1650,
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        description: 'Towering karst limestone cliffs enclosing hidden turquoise lagoons and powder-white coves.',
        weather: { temp: 30, condition: 'Warm & Balmy', humidity: '72%', uv: '9.0' },
        safetyIndex: 8.9,
        dailyBudget: { budget: 2100, mid: 4800, luxury: 13500, currency: 'PHP' },
        story: 'Secret lagoons carved by waves over millions of years accessible only through natural stone tunnels.',
        experiences: ['Secret Lagoon Kayak', 'Big Lagoon Cruise', 'Nacpan Beach Sunset Walk']
      }
    ]
  },
  {
    id: 'grassland',
    name: 'Grassland',
    displayName: 'Steppe & Savanna Grassland',
    emoji: '🌾',
    accentColor: '#16A34A',
    secondaryColor: '#15803D',
    gradientCss: 'radial-gradient(ellipse at top, #14532D 0%, #030A05 70%)',
    atmosphericEffect: 'Wind-blown grass ripple animation & dust devil micro-particles',
    bgImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2400&q=85',
    destinationCount: 18,
    climateTags: ['Semi-Arid', 'Open Plains', 'Rolling Steppe', 'Endless Horizon'],
    avgTemp: '24°C / 75°F',
    bestMonth: 'June – October',
    featuredDestinations: [
      {
        id: 'serengeti',
        name: 'Serengeti Plains',
        country: 'Tanzania',
        flag: '🇹🇿',
        coordinates: { lat: -2.3333, lng: 34.8333 },
        rating: 4.98,
        reviewsCount: 3800,
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
        description: 'Witness the Great Migration where millions of wildebeest cross golden acacia plains.',
        weather: { temp: 26, condition: 'Golden Haze', humidity: '45%', uv: '8.8' },
        safetyIndex: 9.0,
        dailyBudget: { budget: 6200, mid: 16500, luxury: 42000, currency: 'TZS' },
        story: 'The infinite savanna that holds the greatest mass movement of terrestrial animals on Earth.',
        experiences: ['Dawn Hot Air Balloon Safari', 'Mara River Crossing Track', 'Big Five Game Drive']
      }
    ]
  },
  {
    id: 'rainforest',
    name: 'Rainforest',
    displayName: 'Tropical Rainforest Biosphere',
    emoji: '🌿',
    accentColor: '#065F46',
    secondaryColor: '#047857',
    gradientCss: 'radial-gradient(ellipse at top, #064E3B 0%, #020D09 70%)',
    atmosphericEffect: 'Rain particle shower, mist drift & firefly ambient glow',
    bgImage: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=2400&q=85',
    destinationCount: 26,
    climateTags: ['Hyper-Humid', 'Canopy Mist', 'Dense Flora', 'Verdant'],
    avgTemp: '27°C / 81°F',
    bestMonth: 'December – April',
    featuredDestinations: [
      {
        id: 'costarica',
        name: 'Monteverde Cloud Forest',
        country: 'Costa Rica',
        flag: '🇨🇷',
        coordinates: { lat: 10.3000, lng: -84.8000 },
        rating: 4.93,
        reviewsCount: 2450,
        image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
        description: 'Suspended walkways through high-altitude misty tree canopy teeming with radiant quetzals.',
        weather: { temp: 22, condition: 'Misty Drizzle', humidity: '94%', uv: '5.2' },
        safetyIndex: 9.6,
        dailyBudget: { budget: 3500, mid: 8200, luxury: 24000, currency: 'CRC' },
        story: 'An emerald mist biosphere where 2.5% of the entire world’s biodiversity lives within branches.',
        experiences: ['Canopy Hanging Bridges', 'Night Jungle Spider & Frog Walk', 'Zip-line Over Mist']
      }
    ]
  },
  {
    id: 'tundra',
    name: 'Tundra',
    displayName: 'Arctic Tundra Biosphere',
    emoji: '🌌',
    accentColor: '#94A3B8',
    secondaryColor: '#CBD5E1',
    gradientCss: 'radial-gradient(ellipse at top, #1E3A5F 0%, #03070F 70%)',
    atmosphericEffect: 'Northern lights wave shimmer & snow drift particles',
    bgImage: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=2400&q=85',
    destinationCount: 11,
    climateTags: ['Polar', 'Permafrost', 'Aurora Skies', 'Glacial Cold'],
    avgTemp: '-8°C / 17°F',
    bestMonth: 'September – March (Aurora)',
    featuredDestinations: [
      {
        id: 'lapland',
        name: 'Tromsø & Lapland',
        country: 'Norway',
        flag: '🇳🇴',
        coordinates: { lat: 69.6492, lng: 18.9553 },
        rating: 4.94,
        reviewsCount: 1980,
        image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
        description: 'Vibrant green dancing Aurora Borealis over snow-covered fjords and midnight polar twilight.',
        weather: { temp: -4, condition: 'Aurora Glow', humidity: '64%', uv: '0.5' },
        safetyIndex: 9.9,
        dailyBudget: { budget: 6800, mid: 18000, luxury: 48000, currency: 'NOK' },
        story: 'The Gateway to the Arctic where nights are illuminated by dancing solar ribbons in the magnetosphere.',
        experiences: ['Northern Lights Dog Sledding', 'Fjord Whale Cruise', 'Glass Igloo Night Watch']
      }
    ]
  },
  {
    id: 'glacier',
    name: 'Glacier',
    displayName: 'Glacial Ice Biosphere',
    emoji: '🧊',
    accentColor: '#BAE6FD',
    secondaryColor: '#7DD3FC',
    gradientCss: 'radial-gradient(ellipse at top, #0C3547 0%, #010B12 70%)',
    atmosphericEffect: 'Ice crystal sparkle particles & ultra-deep blue glow',
    bgImage: 'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=2400&q=85',
    destinationCount: 9,
    climateTags: ['Cryosphere', 'Deep Blue Ice', 'Crevasses', 'Pristine'],
    avgTemp: '-2°C / 28°F',
    bestMonth: 'November – March',
    featuredDestinations: [
      {
        id: 'peritomoreno',
        name: 'Perito Moreno Glacier',
        country: 'Argentina',
        flag: '🇦🇷',
        coordinates: { lat: -50.4965, lng: -73.1378 },
        rating: 4.97,
        reviewsCount: 2200,
        image: 'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1200&q=80',
        description: 'Colossal advancing ice walls towering 70 meters above Lake Argentino echoing with calving ice.',
        weather: { temp: 5, condition: 'Glacial Winds', humidity: '55%', uv: '5.8' },
        safetyIndex: 9.4,
        dailyBudget: { budget: 3800, mid: 9500, luxury: 26000, currency: 'ARS' },
        story: 'One of the few glaciers on Earth that is continually advancing, creating thunderous ice falls.',
        experiences: ['Crampon Glacier Trek', 'Iceberg Boat Navigation', 'Whiskey on 10,000-year Ice']
      }
    ]
  },
  {
    id: 'volcanic',
    name: 'Volcanic',
    displayName: 'Volcanic Desert & Caldera',
    emoji: '🌋',
    accentColor: '#7C3AED',
    secondaryColor: '#DC2626',
    gradientCss: 'radial-gradient(ellipse at top, #3B0764 0%, #1C0000 70%)',
    atmosphericEffect: 'Ember particle rise & heat distortion waves',
    bgImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2400&q=85',
    destinationCount: 15,
    climateTags: ['Basaltic', 'Geothermal Vents', 'Black Sand', 'Caldera'],
    avgTemp: '20°C / 68°F',
    bestMonth: 'May – October',
    featuredDestinations: [
      {
        id: 'icelandvolcano',
        name: 'Fagradalsfjall & Black Sand',
        country: 'Iceland',
        flag: '🇮🇸',
        coordinates: { lat: 63.8890, lng: -22.2706 },
        rating: 4.95,
        reviewsCount: 2900,
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
        description: 'Dramatic black volcanic sand deserts, steaming geothermal fissures, and raw new earth.',
        weather: { temp: 9, condition: 'Geothermal Mist', humidity: '60%', uv: '4.5' },
        safetyIndex: 9.9,
        dailyBudget: { budget: 7200, mid: 19000, luxury: 45000, currency: 'ISK' },
        story: 'Stand on fields of cooled basalt where the North American and Eurasian tectonic plates drift apart.',
        experiences: ['Volcano Crater Hike', 'Blue Lagoon Geothermal Soak', 'Black Sand Beach Walk']
      }
    ]
  },
  {
    id: 'savanna',
    name: 'Savanna',
    displayName: 'African Savanna Bushveld',
    emoji: '🦒',
    accentColor: '#CA8A04',
    secondaryColor: '#A16207',
    gradientCss: 'radial-gradient(ellipse at top, #713F12 0%, #1A0C00 70%)',
    atmosphericEffect: 'Acacia silhouette animation & warm haze bloom',
    bgImage: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=2400&q=85',
    destinationCount: 16,
    climateTags: ['Bushveld', 'Golden Dawn', 'Waterholes', 'Wildlife'],
    avgTemp: '29°C / 84°F',
    bestMonth: 'July – October',
    featuredDestinations: [
      {
        id: 'maasaimara',
        name: 'Maasai Mara Dawn',
        country: 'Kenya',
        flag: '🇰🇪',
        coordinates: { lat: -1.5000, lng: 35.2500 },
        rating: 4.97,
        reviewsCount: 3600,
        image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80',
        description: 'Iconic flat-top acacia trees silhouetted against crimson dawn over pride lands.',
        weather: { temp: 28, condition: 'Golden Savanna Sun', humidity: '48%', uv: '9.8' },
        safetyIndex: 9.1,
        dailyBudget: { budget: 5200, mid: 14000, luxury: 38000, currency: 'KES' },
        story: 'Ancient wilderness stewardship where the Maasai coexist harmoniously with wild feline dynasties.',
        experiences: ['Predator Tracking Safari', 'Maasai Cultural Village', 'Bush Breakfast under Acacias']
      }
    ]
  }
];

// Flat searchable destination lookup
export function findDestinationByQuery(query) {
  if (!query) return null;
  const q = query.trim().toLowerCase();
  
  // 1. Direct destination name or country match
  for (const biome of BIOMES) {
    for (const dest of biome.featuredDestinations) {
      if (dest.name.toLowerCase().includes(q) || 
          dest.country.toLowerCase().includes(q) ||
          dest.id.toLowerCase().includes(q) ||
          dest.description.toLowerCase().includes(q)) {
        return { destination: dest, biome };
      }
    }
  }

  // 2. Biome name search (e.g. "desert", "mountains", "ocean", "tundra")
  for (const biome of BIOMES) {
    if (biome.name.toLowerCase().includes(q) || 
        biome.displayName.toLowerCase().includes(q) ||
        biome.id.toLowerCase().includes(q)) {
      return { destination: biome.featuredDestinations[0], biome };
    }
  }

  return null;
}
