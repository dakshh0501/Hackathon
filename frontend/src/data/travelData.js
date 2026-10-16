// Travel destinations and sample attraction data
export const DESTINATIONS = [
  {
    id: 'agra',
    name: 'Agra',
    state: 'Uttar Pradesh',
    tagline: 'The timeless emblem of eternal romance and Mughal architectural grandeur.',
    coverImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    description: 'Home to the immortal Taj Mahal on the peaceful banks of the Yamuna River, Agra is a treasure trove of Mughal history, red sandstone fortresses, aromatic bazaars, and fragrant Petha delicacies.',
    idealDays: 2,
    baseCostPerDay: 4250,
    rates: { stay: 2500, food: 650, transport: 1100 },
    highlights: ['Taj Mahal at sunrise', 'Agra Fort battlements', 'Sunset view from Mehtab Bagh', 'Mughlai gastronomy walk']
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    tagline: 'The Pink City of opulent royal palaces, hill forts, and artisan textiles.',
    coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    description: 'Founded by Maharaja Sawai Jai Singh II, Jaipur dazzles travelers with terracotta-pink facades, towering hilltop forts, centuries-old astronomical observatories, and vibrant jewel-toned bazaars.',
    idealDays: 3,
    baseCostPerDay: 4700,
    rates: { stay: 2800, food: 700, transport: 1200 },
    highlights: ['Amber Fort elephant paths & Sheesh Mahal', 'Hawa Mahal honeycomb windows', 'Jantar Mantar sundials', 'Nahargarh panoramic sunset']
  },
  {
    id: 'mathura',
    name: 'Mathura & Vrindavan',
    state: 'Uttar Pradesh',
    tagline: 'Sacred twin pilgrimage towns on the Yamuna brimming with devotional fervor.',
    coverImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    description: 'The revered birthplace of Lord Krishna, Mathura along with neighboring Vrindavan offers sacred ghats, evening chime ceremonies, historic temples with intricate white marble, and divine peaceful vibes.',
    idealDays: 2,
    baseCostPerDay: 3200,
    rates: { stay: 1800, food: 500, transport: 900 },
    highlights: ['Banke Bihari temple darshan', 'Krishna Janmabhoomi complex', 'Evening Prem Mandir illumination', 'Vishram Ghat Yamuna Aarti']
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    state: 'Uttarakhand',
    tagline: 'Yoga capital of the world nestled beside emerald Himalayan waters.',
    coverImage: 'https://images.unsplash.com/photo-1600100397608-f010f447a4a2?auto=format&fit=crop&w=1200&q=80',
    description: 'Perched in the foothills of the Garhwal Himalayas where the sacred Ganges tumbles crystal-clear into the plains, Rishikesh brings together soul-soothing yoga ashrams, river rafting rapids, and atmospheric cliffside cafes.',
    idealDays: 3,
    baseCostPerDay: 3500,
    rates: { stay: 2100, food: 600, transport: 800 },
    highlights: ['Triveni Ghat Maha Aarti', 'Laxman & Ram Jhula suspension bridges', 'White water river rafting', 'The Beatles Ashram murals']
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    state: 'Rajasthan',
    tagline: 'The Venice of the East adorned with shimmering lakes and lakeside palaces.',
    coverImage: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1200&q=80',
    description: 'Surrounded by the ancient Aravalli range and shimmering waters of Lake Pichola, Udaipur is Rajasthan’s most romantic city, boasting whitewashed royal mansions, rooftop candlelight dining, and serene boat cruises.',
    idealDays: 3,
    baseCostPerDay: 5100,
    rates: { stay: 3200, food: 750, transport: 1150 },
    highlights: ['City Palace royal museum', 'Sunset boat cruise on Lake Pichola', 'Saheliyon Ki Bari fountains', 'Bagore Ki Haveli folk dance']
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    tagline: 'The oldest living city in the world, radiating spiritual mystery on the holy Ganga.',
    coverImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    description: 'Kashi, or Varanasi, is India’s cultural soul. For millennia, pilgrims have descended its legendary stone ghats to bathe in holy waters, witness mesmerizing fire rituals, and explore serpentine alleys echoing with ancient temple bells.',
    idealDays: 3,
    baseCostPerDay: 3450,
    rates: { stay: 2000, food: 550, transport: 900 },
    highlights: ['Grand Dashashwamedh Ghat Aarti', 'Dawn rowing boat ride on the Ganga', 'Kashi Vishwanath golden corridor', 'Sarnath deer park & Buddhist stupa']
  }
];

export const ATTRACTIONS = [
  // Agra
  {
    id: 'taj',
    name: 'Taj Mahal',
    city: 'Agra',
    category: 'Heritage',
    fee: 1100,
    durationHours: 3,
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80',
    access: 'Paved, step-free path to main plaza; golf carts at east/west gates.',
    description: 'Ivory-white marble mausoleum on the south bank of the Yamuna River, commissioned in 1632.'
  },
  {
    id: 'afort',
    name: 'Agra Fort',
    city: 'Agra',
    category: 'Heritage',
    fee: 650,
    durationHours: 2.5,
    image: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=600&q=80',
    access: 'Sloped cobblestone ramps; some stairs to upper courtyards.',
    description: 'Historical red sandstone fortress that served as the main residence of Mughal emperors until 1638.'
  },
  {
    id: 'mehtab',
    name: 'Mehtab Bagh',
    city: 'Agra',
    category: 'Nature',
    fee: 300,
    durationHours: 1,
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80',
    access: 'Flat landscaped garden walk directly opposite the Taj Mahal across the river.',
    description: 'Charbagh complex aligned perfectly with the Taj Mahal, ideal for sunset photography.'
  },

  // Jaipur
  {
    id: 'amber',
    name: 'Amber Fort',
    city: 'Jaipur',
    category: 'Heritage',
    fee: 200,
    durationHours: 3,
    image: 'https://images.unsplash.com/photo-1602643163983-ed0b structure?auto=format&fit=crop&w=600&q=80',
    access: 'Steep cobblestone ramps; 4WD jeep shuttle available up to Suraj Pol.',
    description: 'Hilltop fort known for artistic Hindu style elements, massive ramparts, and the gleaming Sheesh Mahal.'
  },
  {
    id: 'palace',
    name: 'City Palace',
    city: 'Jaipur',
    category: 'Culture',
    fee: 300,
    durationHours: 2,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
    access: 'Mostly step-free open courtyards with wide regal entryways.',
    description: 'A striking blend of Rajput, Mughal, and European architecture with royal museum galleries.'
  },
  {
    id: 'hawa',
    name: 'Hawa Mahal',
    city: 'Jaipur',
    category: 'Heritage',
    fee: 50,
    durationHours: 1,
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=600&q=80',
    access: 'Best viewed and photographed from street cafes; ramp pathways inside.',
    description: 'The iconic Palace of Winds constructed with 953 honeycomb jharokhas of red and pink sandstone.'
  },
  {
    id: 'jantar',
    name: 'Jantar Mantar',
    city: 'Jaipur',
    category: 'Culture',
    fee: 50,
    durationHours: 1.5,
    image: 'https://images.unsplash.com/photo-1592635196078-9fdc757f27f4?auto=format&fit=crop&w=600&q=80',
    access: 'Flat, open astronomical park with paved walking paths.',
    description: 'UNESCO World Heritage monument featuring the world’s largest stone sundial.'
  },
  {
    id: 'nahar',
    name: 'Nahargarh Fort',
    city: 'Jaipur',
    category: 'Nature',
    fee: 50,
    durationHours: 2,
    image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=600&q=80',
    access: 'Winding uphill road; lively terrace views during sunset.',
    description: 'Stands on the edge of the Aravalli Hills, providing magnificent panoramic vistas of the entire Pink City.'
  },

  // Mathura - Vrindavan
  {
    id: 'banke',
    name: 'Banke Bihari Temple',
    city: 'Mathura & Vrindavan',
    category: 'Spiritual',
    fee: 0,
    durationHours: 1.5,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
    access: 'Narrow bustling market lanes; assistance recommended during peak hours.',
    description: 'One of Vrindavan’s most revered shrines dedicated to Lord Krishna in the Tribhanga posture.'
  },
  {
    id: 'janma',
    name: 'Krishna Janmabhoomi',
    city: 'Mathura & Vrindavan',
    category: 'Spiritual',
    fee: 0,
    durationHours: 1.5,
    image: 'https://images.unsplash.com/photo-1600100397608-f010f447a4a2?auto=format&fit=crop&w=600&q=80',
    access: 'Strict security checkpoints; clean and mostly flat floor areas.',
    description: 'Sacred temple complex built around the prison cell believed to be the exact birthplace of Lord Krishna.'
  },
  {
    id: 'prem',
    name: 'Prem Mandir',
    city: 'Mathura & Vrindavan',
    category: 'Spiritual',
    fee: 0,
    durationHours: 2,
    image: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=600&q=80',
    access: 'Expansive Italian white marble grounds, ramps, and wheelchair friendly.',
    description: 'Monumental complex celebrated for its intricate marble carvings and evening musical fountain illuminations.'
  },
  {
    id: 'vish',
    name: 'Vishram Ghat Aarti',
    city: 'Mathura & Vrindavan',
    category: 'Spiritual',
    fee: 0,
    durationHours: 1,
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80',
    access: 'Traditional stone steps leading down to riverbank; boat seating available.',
    description: 'The central ghat of Mathura where evening oil lamps float serenely across the holy Yamuna waters.'
  },

  // Rishikesh
  {
    id: 'triveni',
    name: 'Triveni Ghat Evening Aarti',
    city: 'Rishikesh',
    category: 'Spiritual',
    fee: 0,
    durationHours: 1.5,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80',
    access: 'Paved amphitheatre steps; designated seating areas along the waterfront.',
    description: 'Mesmerizing evening prayer ritual accompanied by rhythmic chantings, ringing bells, and flaming brass lamps.'
  },
  {
    id: 'beatles',
    name: 'The Beatles Ashram',
    city: 'Rishikesh',
    category: 'Culture',
    fee: 150,
    durationHours: 2,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    access: 'Forest path inside Rajaji Tiger Reserve boundary; rustic stone paths.',
    description: 'Chaurasi Kutia ashram where the Beatles stayed in 1968, now covered with vivid contemporary murals.'
  },
  {
    id: 'rafting',
    name: 'Ganges White Water Rafting',
    city: 'Rishikesh',
    category: 'Nature',
    fee: 900,
    durationHours: 3.5,
    image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=600&q=80',
    access: 'Active adventure with certified river guides; life jackets provided.',
    description: 'Exhilarating river expedition through iconic Grade III and IV rapids like Roller Coaster and Golf Course.'
  },

  // Udaipur
  {
    id: 'ucity',
    name: 'Udaipur City Palace',
    city: 'Udaipur',
    category: 'Heritage',
    fee: 350,
    durationHours: 3,
    image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=600&q=80',
    access: 'Sprawling multistory complex overlooking Lake Pichola with elevators in select wings.',
    description: 'Rajasthan’s largest palace complex exhibiting mirror-work rooms, royal armory, and lakeside balconies.'
  },
  {
    id: 'pichola',
    name: 'Lake Pichola Boat Cruise',
    city: 'Udaipur',
    category: 'Nature',
    fee: 550,
    durationHours: 1.5,
    image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=600&q=80',
    access: 'Ramped jetty boarding onto cushioned motorized cruisers.',
    description: 'Scenic cruise past Jag Mandir Island palace and the gleaming white facades of old havelis.'
  },
  {
    id: 'saheli',
    name: 'Saheliyon Ki Bari',
    city: 'Udaipur',
    category: 'Nature',
    fee: 50,
    durationHours: 1,
    image: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=600&q=80',
    access: 'Level stone pathways with marble elephant fountains and serene lotus pools.',
    description: 'Historic royal courtyard garden built by Rana Sangram Singh for the queen and her maidens.'
  },

  // Varanasi
  {
    id: 'ganga',
    name: 'Ganga Aarti, Dashashwamedh',
    city: 'Varanasi',
    category: 'Spiritual',
    fee: 0,
    durationHours: 1.5,
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80',
    access: 'Steep stone steps; accessible viewing boats can be chartered in advance.',
    description: 'Spellbinding ritual performed every dusk by saffron-clad priests invoking the divine river.'
  },
  {
    id: 'kashi',
    name: 'Kashi Vishwanath Corridor',
    city: 'Varanasi',
    category: 'Spiritual',
    fee: 0,
    durationHours: 2,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
    access: 'Spacious new corridor connects the sacred ghat directly to the golden sanctum; ramps & battery cars.',
    description: 'One of the twelve sacred Jyotirlingas, revered as the spiritual center of the universe.'
  },
  {
    id: 'sarnath',
    name: 'Sarnath Deer Park & Stupa',
    city: 'Varanasi',
    category: 'Heritage',
    fee: 25,
    durationHours: 2.5,
    image: 'https://images.unsplash.com/photo-1592635196078-9fdc757f27f4?auto=format&fit=crop&w=600&q=80',
    access: 'Manicured level lawn gardens with accessible walkways throughout the ruins.',
    description: 'Where Gautama Buddha gave his first sermon on the Four Noble Truths after enlightenment.'
  }
];

export const DEFAULT_TRIP = {
  city: 'Jaipur',
  startDate: new Date(Date.now() + 14 * 864e5).toISOString().slice(0, 10),
  days: 3,
  travelers: 2,
  budgetTier: 'comfort', // budget, comfort, luxury
  plan: [
    ['amber', 'hawa'],
    ['palace', 'jantar'],
    ['nahar']
  ],
  savedAttractions: ['taj', 'prem', 'pichola'],
  savedTrips: [
    {
      id: 'trip-1',
      city: 'Agra',
      title: 'Romantic Agra & Heritage Walk',
      startDate: '2026-11-10',
      days: 2,
      travelers: 2,
      plan: [['taj', 'mehtab'], ['afort']],
      estimatedTotal: 13900,
      createdAt: '2026-10-14'
    }
  ],
  checklist: [
    { id: 1, text: 'Government ID proofs & Aadhaar cards', done: true },
    { id: 2, text: 'Monument entry e-tickets downloaded offline', done: false },
    { id: 3, text: 'Comfortable walking shoes & sunscreen', done: true },
    { id: 4, text: 'Fast-charging power bank & cables', done: false },
    { id: 5, text: 'Light cotton scarves for temple visits', done: false }
  ],
  notes: 'Check sunrise timings for photography. Remember to remove shoes at temple entrances.'
};
