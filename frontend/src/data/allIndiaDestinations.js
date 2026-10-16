// Directory of India's 20 Most Famous Cities and Towns (Plus Sacred Heritage Sights)
export const ALL_INDIAN_DESTINATIONS = [
  // 1. Delhi
  {
    name: 'Delhi',
    state: 'Delhi (NCT)',
    aliases: ['delhi', 'new delhi', 'ncr', 'old delhi', 'dilli'],
    biomeCategory: 'gardens',
    coverImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80', // India Gate & Rajpath
    specialties: ['Red Fort & Chandni Chowk Food Trail', 'Qutub Minar 73m Minaret', 'Humayun’s Tomb Gardens', 'India Gate & Kartavya Path'],
    description: 'The historic capital of empires, blending magnificent Mughal monuments, Persian gardens, world-famous street food, and modern wide boulevards.',
    highlights: ['Paranthe Wali Gali in Chandni Chowk', 'Humayun’s Tomb UNESCO Persian gardens', 'Qutub Minar complex', 'India Gate evening lights'],
    weather: { temp: 28, condition: 'Pleasant Autumn', humidity: '42%', uv: '7.0' },
    safetyIndex: 9.1,
    coordinates: { lat: 28.6139, lng: 77.2090 },
    budget: { budget: 1800, mid: 4500, luxury: 12000 },
    bestMonths: 'October – March'
  },

  // 2. Mumbai
  {
    name: 'Mumbai',
    state: 'Maharashtra',
    aliases: ['mumbai', 'bombay', 'maharashtra', 'marine drive'],
    biomeCategory: 'beach',
    coverImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80', // Marine Drive & Taj Hotel
    specialties: ['Gateway of India & Taj Mahal Palace', 'Marine Drive Queen’s Necklace', 'Elephanta Island Rock Caves', 'Authentic Mumbai Vada Pav & Pav Bhaji'],
    description: 'The City of Dreams: Arabian Sea waterfronts, Art Deco architecture along Marine Drive, historic Gateway of India, and energetic street culture.',
    highlights: ['Gateway of India overlooking the harbor', 'Marine Drive sunset skyline stroll', 'Elephanta Caves rock sculpture ferry', 'Colaba Causeway shopping'],
    weather: { temp: 30, condition: 'Coastal Breeze', humidity: '70%', uv: '8.0' },
    safetyIndex: 9.4,
    coordinates: { lat: 18.9220, lng: 72.8347 },
    budget: { budget: 2500, mid: 6500, luxury: 18000 },
    bestMonths: 'October – March'
  },

  // 3. Agra
  {
    name: 'Agra',
    state: 'Uttar Pradesh',
    aliases: ['agra', 'taj mahal', 'fatehpur sikri'],
    biomeCategory: 'gardens',
    coverImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80', // Taj Mahal Ivory Marble
    specialties: ['The Taj Mahal Wonder of the World', 'Agra Fort Red Sandstone Citadel', 'Authentic Agra Petha Sweets', 'Pietra Dura Marble Inlay Craft'],
    description: 'Imperial capital of the Mughals on the Yamuna river, celebrated worldwide for the immortal white marble Taj Mahal and colossal Agra Fort.',
    highlights: ['Taj Mahal at golden sunrise', 'Agra Fort battlements & Jahangir Palace', 'Mehtab Bagh moonlight reflection across river', 'Sampling authentic Angoori and Kesar Petha'],
    weather: { temp: 29, condition: 'Sunny', humidity: '40%', uv: '7.5' },
    safetyIndex: 9.2,
    coordinates: { lat: 27.1767, lng: 78.0081 },
    budget: { budget: 1700, mid: 4200, luxury: 11000 },
    bestMonths: 'October – March'
  },

  // 4. Jaipur
  {
    name: 'Jaipur',
    state: 'Rajasthan',
    aliases: ['jaipur', 'pink city', 'rajasthan'],
    biomeCategory: 'desert',
    coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80', // Amber Fort & Hawa Mahal
    specialties: ['Hawa Mahal Palace of Winds', 'Amber Fort Sheesh Mahal (Mirror Hall)', 'Johari Bazaar Gems & Bandhani Textiles', 'Pyaaz Kachori & Ghewar Sweets'],
    description: 'The royal Pink City: hilltop fortresses, pink terracotta arches, astronomical stone sundials, and opulent royal palace museums.',
    highlights: ['Amber Fort elephant pathways and Sheesh Mahal', 'Hawa Mahal 953 honeycomb windows', 'Jantar Mantar stone astronomical instruments', 'Nahargarh sunset view overlooking the city'],
    weather: { temp: 31, condition: 'Golden Sun', humidity: '30%', uv: '8.2' },
    safetyIndex: 9.4,
    coordinates: { lat: 26.9124, lng: 75.7873 },
    budget: { budget: 1900, mid: 4600, luxury: 13000 },
    bestMonths: 'October – March'
  },

  // 5. Varanasi
  {
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    aliases: ['varanasi', 'banaras', 'kashi', 'sarnath'],
    biomeCategory: 'river',
    coverImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80', // Ganga Ghat Aarti & Boats
    specialties: ['Dashashwamedh Ghat Evening Aarti', 'Dawn Rowing Boat Pilgrimage on Ganga', 'Kashi Vishwanath Golden Temple Corridor', 'Pure Banarasi Zari Silk Sarees'],
    description: 'The spiritual heart of India and world’s oldest living city, where ancient stone ghats meet the holy Ganges in mesmerizing fire rituals.',
    highlights: ['Grand Dashashwamedh Ghat Aarti fire ceremony', 'Dawn rowing boat ride past 84 stone ghats', 'Kashi Vishwanath Jyotirlinga corridor', 'Sarnath deer park where Buddha gave his first sermon'],
    weather: { temp: 27, condition: 'Sacred Haze', humidity: '52%', uv: '6.8' },
    safetyIndex: 9.3,
    coordinates: { lat: 25.3176, lng: 82.9739 },
    budget: { budget: 1500, mid: 3800, luxury: 10500 },
    bestMonths: 'October – March'
  },

  // 6. Amritsar
  {
    name: 'Amritsar',
    state: 'Punjab',
    aliases: ['amritsar', 'golden temple', 'harmandir sahib', 'punjab'],
    biomeCategory: 'gardens',
    coverImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80', // Golden Temple
    specialties: ['Harmandir Sahib (The Golden Temple)', 'World’s Largest Free Community Langar', 'Wagah Border Beating Retreat Ceremony', 'Authentic Amritsari Kulcha & Lassi'],
    description: 'The spiritual crown of Punjab: the gold-plated Harmandir Sahib surrounded by the sacred Amrit Sarovar pool, free community kitchens, and lively Punjabi hospitality.',
    highlights: ['Golden Temple nighttime illumination & Palki ceremony', 'Volunteering and eating at the 24/7 Mega Langar', 'Wagah Border patriotic flag lowering parade', 'Jallianwala Bagh national memorial'],
    weather: { temp: 25, condition: 'Golden Autumn', humidity: '46%', uv: '6.8' },
    safetyIndex: 9.7,
    coordinates: { lat: 31.6200, lng: 74.8765 },
    budget: { budget: 1600, mid: 3800, luxury: 10000 },
    bestMonths: 'October – March'
  },

  // 7. Udaipur
  {
    name: 'Udaipur',
    state: 'Rajasthan',
    aliases: ['udaipur', 'lake city', 'city of lakes'],
    biomeCategory: 'river',
    coverImage: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1200&q=80', // City Palace Lake Pichola
    specialties: ['City Palace Lake Complex', 'Sunset Boat Cruise on Lake Pichola', 'Jag Mandir Island Palace', 'Mewar Miniature Paintings & Havelis'],
    description: 'The Venice of the East adorned with white marble palaces reflecting in shimmering turquoise Lake Pichola, nestled against ancient Aravalli peaks.',
    highlights: ['City Palace multi-tiered royal museum', 'Sunset boat cruise around Lake Pichola', 'Saheliyon Ki Bari marble fountains', 'Bagore Ki Haveli folk dance night'],
    weather: { temp: 29, condition: 'Breezy Lakes', humidity: '38%', uv: '7.8' },
    safetyIndex: 9.6,
    coordinates: { lat: 24.5854, lng: 73.7125 },
    budget: { budget: 2200, mid: 5200, luxury: 15000 },
    bestMonths: 'September – March'
  },

  // 8. Bengaluru
  {
    name: 'Bengaluru',
    state: 'Karnataka',
    aliases: ['bengaluru', 'bangalore', 'karnataka', 'garden city'],
    biomeCategory: 'gardens',
    coverImage: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80', // Lalbagh Glasshouse & Lakes
    specialties: ['Lalbagh Botanical Gardens & Glasshouse', 'Bangalore Palace Royal Architecture', 'Cubbon Park Green Canopy Trails', 'Filter Coffee & Dosa Food Trails'],
    description: 'The Garden City of India, famous for its year-round temperate spring climate, historic botanical parks, Bangalore Palace, and craft food culture.',
    highlights: ['Lalbagh Botanical Garden 240-acre walk', 'Bangalore Palace Tudor-style estate', 'Cubbon Park morning cycling', 'Vidyarthi Bhavan heritage dosa breakfast'],
    weather: { temp: 25, condition: 'Pleasant & Mild', humidity: '56%', uv: '7.0' },
    safetyIndex: 9.6,
    coordinates: { lat: 12.9716, lng: 77.5946 },
    budget: { budget: 2100, mid: 5000, luxury: 14000 },
    bestMonths: 'All Year Round'
  },

  // 9. Kolkata
  {
    name: 'Kolkata',
    state: 'West Bengal',
    aliases: ['kolkata', 'calcutta', 'west bengal', 'city of joy'],
    biomeCategory: 'river',
    coverImage: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80', // Victoria Memorial & Howrah Bridge
    specialties: ['Victoria Memorial Marble Monument', 'Iconic Howrah Bridge on Hooghly', 'Kolkata Kathi Rolls & Rosogolla Sweets', 'College Street & Kumartuli Clay Art'],
    description: 'The City of Joy and cultural capital of India: grand British colonial marble monuments, yellow vintage taxis, bustling Hooghly ghats, and rich literary heritage.',
    highlights: ['Victoria Memorial gardens and museum galleries', 'Howrah Bridge crossing and Prinsep Ghat', 'Dakshineswar Kali Temple by the river', 'Tram ride through historic Maidan'],
    weather: { temp: 26, condition: 'Pleasant Autumn', humidity: '64%', uv: '6.5' },
    safetyIndex: 9.3,
    coordinates: { lat: 22.5726, lng: 88.3639 },
    budget: { budget: 1800, mid: 4200, luxury: 11500 },
    bestMonths: 'October – March'
  },

  // 10. Chennai
  {
    name: 'Chennai',
    state: 'Tamil Nadu',
    aliases: ['chennai', 'madras', 'tamil nadu'],
    biomeCategory: 'beach',
    coverImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80', // Shore & Gopuram
    specialties: ['World’s 2nd Longest Marina Beach', 'Kapaleeshwarar Dravidian Gopuram Temple', 'Authentic Filter Coffee & Idli-Vada', 'San Thome Cathedral Basilica'],
    description: 'Gateway to South India: ancient colorful Dravidian gopuram temples, expansive sandy Marina beach, Carnatic classical music, and rich Tamil traditions.',
    highlights: ['Kapaleeshwarar Temple rituals in Mylapore', 'Marina Beach evening breeze and sundal snack', 'San Thome Basilica over Apostle Thomas tomb', 'Fort St. George historic colonial quarter'],
    weather: { temp: 31, condition: 'Sunny Coastal', humidity: '72%', uv: '8.4' },
    safetyIndex: 9.5,
    coordinates: { lat: 13.0827, lng: 80.2707 },
    budget: { budget: 1900, mid: 4500, luxury: 12500 },
    bestMonths: 'November – February'
  },

  // 11. Hyderabad
  {
    name: 'Hyderabad',
    state: 'Telangana',
    aliases: ['hyderabad', 'city of pearls', 'telangana', 'charminar'],
    biomeCategory: 'gardens',
    coverImage: 'https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?auto=format&fit=crop&w=1200&q=80', // Charminar & Historic Arches
    specialties: ['Charminar 16th-Century Mosque & Minarets', 'World-Renowned Hyderabadi Dum Biryani & Irani Chai', 'Golconda Fort Acoustic Acoustics & Light Show', 'Qutb Shahi Tombs & Chowmahalla Palace'],
    description: 'The City of Pearls: monumental 16th-century Charminar, Golconda fort acoustics, Nizam royal palaces, and world-famous fragrant Dum Biryani.',
    highlights: ['Charminar monument walk and Laad Bazaar bangles', 'Golconda Fort whisper acoustics and sunset', 'Chowmahalla Palace Nizam royal courtyards', 'Paradise Biryani and Osmania biscuits with Irani chai'],
    weather: { temp: 29, condition: 'Breezy Deccan Sun', humidity: '45%', uv: '7.6' },
    safetyIndex: 9.5,
    coordinates: { lat: 17.3850, lng: 78.4867 },
    budget: { budget: 1900, mid: 4600, luxury: 13500 },
    bestMonths: 'October – March'
  },

  // 12. Goa
  {
    name: 'Goa',
    state: 'Goa',
    aliases: ['goa', 'north goa', 'south goa', 'panaji', 'calangute', 'baga', 'palolem', 'anjuna'],
    biomeCategory: 'beach',
    coverImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80', // Palm Beach & Ocean
    specialties: ['Palolem & Vagator Golden Sand Beaches', 'Portuguese Churches & Fontainhas Latin Quarter', 'Dudhsagar Four-Tiered Waterfall', 'Fresh Seafood Shacks & Sunset Cruises'],
    description: 'Tropical coastline of sun-kissed beaches, Portuguese colonial cathedrals, seaside shacks, spice plantations, and vibrant nightlife.',
    highlights: ['Palolem & Anjuna beach days and water sports', 'Dudhsagar waterfall jungle jeep safari', 'UNESCO Basilica of Bom Jesus', 'Fontainhas heritage colorful walk'],
    weather: { temp: 29, condition: 'Tropical Coastal Breeze', humidity: '72%', uv: '8.8' },
    safetyIndex: 9.4,
    coordinates: { lat: 15.2993, lng: 74.1240 },
    budget: { budget: 2200, mid: 5200, luxury: 15000 },
    bestMonths: 'October – April'
  },

  // 13. Ooty
  {
    name: 'Ooty',
    state: 'Tamil Nadu',
    aliases: ['ooty', 'udhagamandalam', 'nilgiris', 'nilgiri hills'],
    biomeCategory: 'mountain',
    coverImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80', // Nilgiri Hills & Tea Gardens
    specialties: ['Nilgiri Mountain UNESCO Toy Train', 'Emerald Ooty Lake & Boat House', 'Rolling Tea Plantations of Doddabetta Peak', 'Government Botanical Garden & Rose Garden'],
    description: 'The Queen of Nilgiri Hill Stations: emerald rolling tea gardens, eucalyptus mist, heritage British cottages, and the historic blue toy train.',
    highlights: ['Nilgiri Mountain Railway steam toy train', 'Boating on Ooty Lake surrounded by eucalyptus', 'Doddabetta Peak Nilgiri panoramic vista', 'Tasting homemade Nilgiri chocolates & tea'],
    weather: { temp: 15, condition: 'Crisp Nilgiri Mist', humidity: '65%', uv: '6.0' },
    safetyIndex: 9.7,
    coordinates: { lat: 11.4102, lng: 76.6950 },
    budget: { budget: 1900, mid: 4400, luxury: 12000 },
    bestMonths: 'October – June'
  },

  // 14. Darjeeling
  {
    name: 'Darjeeling',
    state: 'West Bengal',
    aliases: ['darjeeling', 'queen of the hills', 'ghoom'],
    biomeCategory: 'mountain',
    coverImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80', // Kanchenjunga Sunrise & Tea
    specialties: ['Tiger Hill Sunrise over Mount Kanchenjunga', 'World-Famous Darjeeling Muscatel Orthodox Tea', 'Darjeeling Himalayan Railway UNESCO Toy Train', 'Ghoom Monastery & Peace Pagoda'],
    description: 'The Queen of the Hills: terraced misty tea gardens overlooking snow-covered Kanchenjunga summits, vibrant Tibetan monasteries, and the steam toy train.',
    highlights: ['Tiger Hill dawn view of Kanchenjunga peak glowing pink', 'Riding the UNESCO Darjeeling Toy Train through Batasia Loop', 'Happy Valley Tea Estate factory tour', 'Tibetan Refugee Self Help Centre craft workshops'],
    weather: { temp: 13, condition: 'Alpine Chilled Mist', humidity: '68%', uv: '5.8' },
    safetyIndex: 9.6,
    coordinates: { lat: 27.0410, lng: 88.2663 },
    budget: { budget: 1800, mid: 4300, luxury: 11800 },
    bestMonths: 'March – May, Oct – Dec'
  },

  // 15. Kochi
  {
    name: 'Kochi',
    state: 'Kerala',
    aliases: ['kochi', 'cochin', 'fort kochi', 'ernakulam'],
    biomeCategory: 'river',
    coverImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80', // Chinese Fishing Nets & Harbor
    specialties: ['Cantilevered Chinese Fishing Nets at Sunset', 'Fort Kochi Portuguese & Dutch Colonial Alleys', 'Mattancherry Jewish Synagogue & Palace', 'Kathakali Traditional Dance Performance'],
    description: 'The Queen of the Arabian Sea: historic spice port where ancient Chinese fishing nets dip into coastal waters, surrounded by Jewish havelis and art cafes.',
    highlights: ['Sunset walk by Fort Kochi Chinese fishing nets', 'Mattancherry Jewish Synagogue and Jew Town antique shops', 'Kathakali dance performance with live makeup ritual', 'Kerala coastal fish curry and appam dining'],
    weather: { temp: 28, condition: 'Tropical Harbor Air', humidity: '74%', uv: '8.2' },
    safetyIndex: 9.7,
    coordinates: { lat: 9.9312, lng: 76.2673 },
    budget: { budget: 2000, mid: 4800, luxury: 13500 },
    bestMonths: 'October – March'
  },

  // 16. Pune
  {
    name: 'Pune',
    state: 'Maharashtra',
    aliases: ['pune', 'poona', 'oxford of the east', 'shaniwar wada'],
    biomeCategory: 'gardens',
    coverImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80', // Historic Fort & Deccan Landscape
    specialties: ['Historic Shaniwar Wada Peshwa Fortress', 'Aga Khan Palace (Mahatma Gandhi Memorial)', 'Sinhagad Fort Hilltop Trek', 'Osho International Meditation Resort & Koregaon Park'],
    description: 'The cultural capital of Maharashtra: historic 18th-century Peshwa palaces, lush Western Ghats hill forts, vibrant university cafes, and spiritual ashrams.',
    highlights: ['Shaniwar Wada stone fortress gates and fountain show', 'Aga Khan Palace Italian arches and Gandhi memorial', 'Sunrise trek to Sinhagad Fort for pitla bhakri', 'FC Road street food and Koregaon Park cafes'],
    weather: { temp: 27, condition: 'Pleasant Deccan Breeze', humidity: '48%', uv: '7.5' },
    safetyIndex: 9.5,
    coordinates: { lat: 18.5204, lng: 73.8567 },
    budget: { budget: 1800, mid: 4200, luxury: 12000 },
    bestMonths: 'July – February'
  },

  // 17. Ahmedabad
  {
    name: 'Ahmedabad',
    state: 'Gujarat',
    aliases: ['ahmedabad', 'amdavad', 'gujarat', 'sabarmati'],
    biomeCategory: 'desert',
    coverImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80', // Pols Architecture & Stepwells
    specialties: ['Sabarmati Ashram (Mahatma Gandhi Seat)', 'UNESCO Historic Walled City & Wooden Pols', 'Adalaj Stepwell Intricate Architecture', 'Manek Chowk Midnight Street Food Bazaar'],
    description: 'India’s first UNESCO World Heritage City: intricate subterranean stepwells, Mahatma Gandhi’s peaceful riverside ashram, and bustling vegetarian street night markets.',
    highlights: ['Sabarmati Ashram peaceful riverfront walk', 'Adalaj Stepwell 5-story carved sandstone well', 'Heritage walk through old city carved wooden Pols', 'Manek Chowk night street food: Gwalior dosa & kulfi'],
    weather: { temp: 30, condition: 'Dry & Sunny', humidity: '35%', uv: '8.0' },
    safetyIndex: 9.7,
    coordinates: { lat: 23.0225, lng: 72.5714 },
    budget: { budget: 1700, mid: 4000, luxury: 11500 },
    bestMonths: 'November – February'
  },

  // 18. Manali
  {
    name: 'Manali',
    state: 'Himachal Pradesh',
    aliases: ['manali', 'rohtang', 'himachal', 'kullu', 'solang', 'atal tunnel'],
    biomeCategory: 'mountain',
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80', // Snowy Summits & Pines
    specialties: ['Rohtang Pass & Atal Tunnel Snow Vistas', 'Solang Valley Paragliding & Ski Slopes', 'Old Manali Bohemian Cafes & Cedar Forests', 'Hadimba Ancient Pagoda Wooden Temple'],
    description: 'Snow-covered Pir Panjal summits, pine forest trails along the turbulent Beas river, apple orchards, and adventurous high-altitude mountain passes.',
    highlights: ['Snow sports at Solang Valley and Rohtang Pass', 'Drive through Atal Tunnel to Sissu waterfalls in Lahaul', 'Hadimba Temple amidst ancient deodar pines', 'Old Manali riverside cafes and live music'],
    weather: { temp: 13, condition: 'Snow Peaks & Sun', humidity: '55%', uv: '7.2' },
    safetyIndex: 9.5,
    coordinates: { lat: 32.2432, lng: 77.1892 },
    budget: { budget: 2200, mid: 5200, luxury: 14500 },
    bestMonths: 'October – June'
  },

  // 19. Shimla
  {
    name: 'Shimla',
    state: 'Himachal Pradesh',
    aliases: ['shimla', 'kufri', 'chail', 'the ridge'],
    biomeCategory: 'mountain',
    coverImage: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80', // Victorian Ridge & Snow Peaks
    specialties: ['The Pedestrian Ridge & Neo-Gothic Christ Church', 'Kalka-Shimla UNESCO Heritage Toy Train', 'Jakhoo Hill & Giant 108ft Hanuman Statue', 'Kufri Snow View & Cedar Pine Trails'],
    description: 'The historic Queen of Hills: British colonial Victorian architecture, the pedestrian Ridge, and pine-clad hillsides looking out across snow peaks.',
    highlights: ['Walking along Mall Road and the historic Ridge', 'Riding the Kalka-Shimla mountain toy train through 102 tunnels', 'Jakhoo Temple summit trail with panoramic peak views', 'Kufri adventure valley & ski slopes'],
    weather: { temp: 16, condition: 'Breezy Alpine', humidity: '58%', uv: '6.2' },
    safetyIndex: 9.7,
    coordinates: { lat: 31.1048, lng: 77.1734 },
    budget: { budget: 2000, mid: 4800, luxury: 13500 },
    bestMonths: 'March – June, Dec – Jan'
  },

  // 20. Rishikesh
  {
    name: 'Rishikesh',
    state: 'Uttarakhand',
    aliases: ['rishikesh', 'haridwar', 'uttarakhand', 'ganga rapids', 'laxman jhula'],
    biomeCategory: 'river',
    coverImage: 'https://images.unsplash.com/photo-1600100397608-f010f447a4a2?auto=format&fit=crop&w=1200&q=80', // Emerald Ganges & Bridges
    specialties: ['Ganges White Water Rafting Rapids', 'Triveni Ghat Evening Maha Aarti', 'The Beatles Ashram (Chaurasi Kutia)', 'Laxman & Ram Jhula Suspension Bridges'],
    description: 'Yoga capital of the world nestled where the crystal emerald Ganges tumbles into the plains, surrounded by Himalayan ashrams and rafting rapids.',
    highlights: ['Triveni Ghat evening prayer bells and fire lamps', 'Grade III & IV white water rafting expedition', 'The Beatles Ashram meditation caves & murals', 'Cliff jumping & riverside camping at Shivpuri'],
    weather: { temp: 24, condition: 'Crisp Mountain Breeze', humidity: '48%', uv: '6.5' },
    safetyIndex: 9.7,
    coordinates: { lat: 30.0869, lng: 78.2676 },
    budget: { budget: 1600, mid: 3900, luxury: 11500 },
    bestMonths: 'September – April'
  },

  // Plus Sacred Heritage & Popular Regions:
  {
    name: 'Vrindavan',
    state: 'Uttar Pradesh',
    aliases: ['vrindavan', 'brindavan', 'prem mandir', 'banke bihari', 'iskcon vrindavan'],
    biomeCategory: 'gardens',
    coverImage: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=1200&q=80',
    specialties: ['Prem Mandir White Marble Complex', 'Famous Mathura-Vrindavan Peda Sweets & Malpua', 'Banke Bihari Darshan & Nidhivan', 'Yamuna Kesi Ghat Aarti'],
    description: 'The sacred land of Radha-Krishna leelas, renowned worldwide for the illuminated Italian marble Prem Mandir, the mystical Banke Bihari temple, and rich Mawa Peda sweets.',
    highlights: ['Prem Mandir evening musical fountain & light display', 'Banke Bihari Mandir historic darshan', 'Tasting fresh Mathura & Vrindavan Peda and Rabri', 'Nidhivan holy basil groves & Kesi Ghat'],
    weather: { temp: 27, condition: 'Devotional Calm', humidity: '45%', uv: '7.0' },
    safetyIndex: 9.6,
    coordinates: { lat: 27.5818, lng: 77.7006 },
    budget: { budget: 1400, mid: 3400, luxury: 8500 },
    bestMonths: 'October – March, Janmashtami & Holi'
  },
  {
    name: 'Mathura',
    state: 'Uttar Pradesh',
    aliases: ['mathura', 'janmabhoomi', 'krishna janmabhoomi', 'dwarkadhish mathura'],
    biomeCategory: 'gardens',
    coverImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    specialties: ['Krishna Janmabhoomi Temple', 'Authentic Khoya Peda & Lassi', 'Vishram Ghat Evening Aarti', 'Dwarkadhish Temple'],
    description: 'The ancient sacred birthplace of Lord Krishna along the Yamuna, enriched by historical monuments, sacred ghats, and authentic Mathura Pedas.',
    highlights: ['Shri Krishna Janmabhoomi sanctum complex', 'Dwarkadhish temple architecture', 'Vishram Ghat Aarti by boat', 'Tasting freshly churned Peda at Holi Gate'],
    weather: { temp: 28, condition: 'Golden Haze', humidity: '42%', uv: '7.2' },
    safetyIndex: 9.4,
    coordinates: { lat: 27.4924, lng: 77.6737 },
    budget: { budget: 1500, mid: 3600, luxury: 9000 },
    bestMonths: 'October – March'
  },
  {
    name: 'Jhansi',
    state: 'Uttar Pradesh',
    aliases: ['jhansi', 'rani laxmibai', 'jhansi fort', 'rani lakshmibai', 'rani laxmi bai'],
    biomeCategory: 'desert',
    coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    specialties: ['Jhansi Fort (Rani Laxmibai Seat)', 'Rani Mahal Palace Museum', '1857 Indian Freedom Memorials', 'Bundeli Culture & Heritage'],
    description: 'The historic bastion of legendary warrior queen Rani Laxmibai, crowned by the towering hilltop Jhansi Fort where she led the fierce struggle for freedom in 1857.',
    highlights: ['Jhansi Fort hilltop ramparts and jumping spot', 'Rani Mahal historic palace murals', 'Government Museum artifacts', 'Barua Sagar lake & temple'],
    weather: { temp: 29, condition: 'Sunny Heritage', humidity: '38%', uv: '7.8' },
    safetyIndex: 9.3,
    coordinates: { lat: 25.4484, lng: 78.5685 },
    budget: { budget: 1600, mid: 3800, luxury: 9500 },
    bestMonths: 'October – March'
  },
  {
    name: 'Assam (Kaziranga & Guwahati)',
    state: 'Assam',
    aliases: ['assam', 'kaziranga', 'guwahati', 'majuli', 'jorhat', 'kamakhya'],
    biomeCategory: 'forest',
    coverImage: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80',
    specialties: ['One-Horned Rhinoceros Safari', 'Assam Orthodox Black Tea Estates', 'Mighty Brahmaputra River Island Majuli', 'Kamakhya Shakti Peeth Temple'],
    description: 'The land of one-horned rhinos roaming Kaziranga tall grasslands, infinite emerald tea plantations, silk weaving villages, and the majestic Brahmaputra river.',
    highlights: ['Kaziranga National Park elephant & jeep safari', 'Brahmaputra sunset river cruise at Guwahati', 'Majuli island Vaishnavite sattras', 'Kamakhya ancient hilltop shrine'],
    weather: { temp: 24, condition: 'Lush & Pleasant', humidity: '68%', uv: '6.5' },
    safetyIndex: 9.5,
    coordinates: { lat: 26.2006, lng: 92.9376 },
    budget: { budget: 1800, mid: 4200, luxury: 11500 },
    bestMonths: 'October – April'
  },
  {
    name: 'Meghalaya (Shillong & Cherrapunji)',
    state: 'Meghalaya',
    aliases: ['meghalaya', 'shillong', 'cherrapunji', 'dawki', 'sohra'],
    biomeCategory: 'forest',
    coverImage: 'https://images.unsplash.com/photo-1626014303757-646738590c68?auto=format&fit=crop&w=1200&q=80',
    specialties: ['Double Decker Living Root Bridges', 'Crystal Clear Umngot River Boating at Dawki', 'Nohkalikai Waterfalls (Highest in India)', 'Cleanest Village Mawlynnong'],
    description: 'The Abode of Clouds: bio-engineered living tree root bridges, roaring mist waterfalls, limestone caves, and transparent rivers flowing like glass.',
    highlights: ['Nohkalikai Falls & Seven Sisters plunges', 'Trek to Nongriat Double Decker Root Bridge', 'Dawki Umngot river transparent boat ride', 'Mawsmai prehistoric cave exploration'],
    weather: { temp: 18, condition: 'Misty Clouds', humidity: '80%', uv: '5.5' },
    safetyIndex: 9.8,
    coordinates: { lat: 25.5788, lng: 91.8933 },
    budget: { budget: 1900, mid: 4500, luxury: 12500 },
    bestMonths: 'September – May'
  },
  {
    name: 'Sikkim (Gangtok & Pelling)',
    state: 'Sikkim',
    aliases: ['sikkim', 'gangtok', 'pelling', 'nathula', 'tsomgo'],
    biomeCategory: 'mountain',
    coverImage: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80',
    specialties: ['Kanchenjunga Panoramic Summits', 'Glacial Tsomgo Lake & Nathu La Pass', 'Rumtek & Pemayangtse Monasteries', 'Organic Himalayan Cuisine & Momos'],
    description: 'Breathtaking Himalayan state crowned by Mount Kanchenjunga (world’s 3rd highest peak), alpine glacial lakes, fluttering prayer flags, and peaceful monasteries.',
    highlights: ['Tsomgo Lake & Indo-China border Nathu La pass', 'Rumtek Monastery Buddhist chants', 'Pelling skywalk with Kanchenjunga view', 'Teesta river white water rafting'],
    weather: { temp: 14, condition: 'Alpine Fresh', humidity: '62%', uv: '6.0' },
    safetyIndex: 9.9,
    coordinates: { lat: 27.3314, lng: 88.6138 },
    budget: { budget: 2200, mid: 5200, luxury: 14000 },
    bestMonths: 'March – May, Oct – Dec'
  },
  {
    name: 'Leh & Ladakh',
    state: 'Ladakh',
    aliases: ['ladakh', 'leh', 'pangong', 'nubra', 'khardung la'],
    biomeCategory: 'mountain',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    specialties: ['Sapphire Blue Pangong Tso Lake', 'Nubra Valley White Sand Dunes & Double-Hump Camels', 'Khardung La High Motor Pass', 'Ancient Thiksey & Hemis Monasteries'],
    description: 'The Land of High Passes: dramatic trans-Himalayan moonscapes, crystal-blue high-altitude border lakes, and cliffside monasteries.',
    highlights: ['Pangong Tso border lake camping', 'Nubra Valley sand dunes ride', 'Crossing Khardung La pass at 17,582 ft', 'Thiksey Monastery morning chants'],
    weather: { temp: 11, condition: 'High Altitude Sun', humidity: '22%', uv: '11 Extreme' },
    safetyIndex: 9.5,
    coordinates: { lat: 34.1526, lng: 77.5771 },
    budget: { budget: 2400, mid: 5800, luxury: 15500 },
    bestMonths: 'May – September'
  }
];

/**
 * Strict Location Search
 * Only returns a destination if the query matches a valid city, state, or known tourism landmark.
 * Otherwise returns null.
 */
export function searchStrictLocation(query) {
  if (!query || typeof query !== 'string') return null;
  const q = query.trim().toLowerCase();
  if (q.length < 2) return null;

  // Non-location filter
  const invalidWords = [
    'hello', 'hi', 'hey', 'test', 'car', 'cars', 'food', 'weather', 'budget', 'money', 
    'booking', 'flights', 'hotel', 'train', 'bus', 'bike', 'what', 'why', 'how', 'when',
    'please', 'good', 'bad', 'nice', 'abc', 'xyz', 'phone', 'bag', 'camera'
  ];
  if (invalidWords.includes(q)) return null;

  // Exact or alias match across destinations
  for (const dest of ALL_INDIAN_DESTINATIONS) {
    if (dest.name.toLowerCase().includes(q) || 
        dest.state.toLowerCase().includes(q) ||
        dest.aliases.some(a => a.toLowerCase().includes(q) || q.includes(a.toLowerCase()))) {
      return dest;
    }
  }

  return null;
}

export const searchAllIndia = searchStrictLocation;
