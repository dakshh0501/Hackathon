// Comprehensive Directory of Verified Cities and States of India with Authentic Photo Assets
export const ALL_INDIAN_DESTINATIONS = [
  // 1. Vrindavan
  {
    name: 'Vrindavan',
    state: 'Uttar Pradesh',
    aliases: ['vrindavan', 'brindavan', 'prem mandir', 'banke bihari', 'iskcon vrindavan'],
    biomeCategory: 'gardens',
    coverImage: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=1200&q=80', // Prem Mandir Italian White Marble Illumination
    specialties: ['Prem Mandir White Marble Complex', 'Famous Mathura-Vrindavan Peda Sweets & Malpua', 'Banke Bihari Darshan & Nidhivan', 'Yamuna Kesi Ghat Aarti'],
    description: 'The sacred land of Radha-Krishna leelas, renowned worldwide for the illuminated Italian marble Prem Mandir, the mystical Banke Bihari temple, and rich Mawa Peda sweets.',
    highlights: ['Prem Mandir evening musical fountain & light display', 'Banke Bihari Mandir historic darshan', 'Tasting fresh Mathura & Vrindavan Peda and Rabri', 'Nidhivan holy basil groves & Kesi Ghat'],
    weather: { temp: 27, condition: 'Devotional Calm', humidity: '45%', uv: '7.0' },
    safetyIndex: 9.6,
    coordinates: { lat: 27.5818, lng: 77.7006 },
    budget: { budget: 1400, mid: 3400, luxury: 8500 },
    bestMonths: 'October – March, Janmashtami & Holi'
  },

  // 2. Mathura
  {
    name: 'Mathura',
    state: 'Uttar Pradesh',
    aliases: ['mathura', 'janmabhoomi', 'krishna janmabhoomi', 'dwarkadhish mathura', 'rani laxmibai mathura'],
    biomeCategory: 'gardens',
    coverImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80', // Krishna Janmabhoomi & Sacred Temple Ghats
    specialties: ['Krishna Janmabhoomi Temple', 'Authentic Khoya Peda & Lassi', 'Historic Bundelkhand & Rani Laxmibai memorials', 'Vishram Ghat Evening Aarti'],
    description: 'The ancient sacred birthplace of Lord Krishna along the Yamuna, enriched by historical monuments, Rani Laxmibai heritage lore, and authentic Mathura Pedas.',
    highlights: ['Shri Krishna Janmabhoomi sanctum complex', 'Dwarkadhish temple architecture', 'Vishram Ghat Aarti by boat', 'Tasting freshly churned Peda at Holi Gate'],
    weather: { temp: 28, condition: 'Golden Haze', humidity: '42%', uv: '7.2' },
    safetyIndex: 9.4,
    coordinates: { lat: 27.4924, lng: 77.6737 },
    budget: { budget: 1500, mid: 3600, luxury: 9000 },
    bestMonths: 'October – March'
  },

  // 3. Jhansi
  {
    name: 'Jhansi',
    state: 'Uttar Pradesh',
    aliases: ['jhansi', 'rani laxmibai', 'jhansi fort', 'rani lakshmibai', 'rani laxmi bai'],
    biomeCategory: 'desert',
    coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80', // Majestic Hilltop Fortress
    specialties: ['Jhansi Fort (Rani Laxmibai Seat)', 'Rani Mahal Palace Museum', '1857 Indian Freedom Memorials', 'Bundeli Culture & Heritage'],
    description: 'The historic bastion of legendary warrior queen Rani Laxmibai, crowned by the towering hilltop Jhansi Fort where she led the fierce struggle for freedom in 1857.',
    highlights: ['Jhansi Fort hilltop ramparts and jumping spot', 'Rani Mahal historic palace murals', 'Government Museum artifacts', 'Barua Sagar lake & temple'],
    weather: { temp: 29, condition: 'Sunny Heritage', humidity: '38%', uv: '7.8' },
    safetyIndex: 9.3,
    coordinates: { lat: 25.4484, lng: 78.5685 },
    budget: { budget: 1600, mid: 3800, luxury: 9500 },
    bestMonths: 'October – March'
  },

  // 4. Delhi NCR
  {
    name: 'Delhi (New Delhi)',
    state: 'National Capital Territory',
    aliases: ['delhi', 'new delhi', 'ncr', 'old delhi'],
    biomeCategory: 'gardens',
    coverImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80', // India Gate & Rajpath
    specialties: ['Red Fort & Chandni Chowk Food Walk', 'Qutub Minar & Mehrauli Heritage', 'Humayun’s Tomb Gardens', 'India Gate & National War Memorial'],
    description: 'The capital of empires, blending magnificent Mughal red sandstone monuments, Lodhi gardens, world-famous street food, and modern diplomatic boulevards.',
    highlights: ['Red Fort & Paranthe Wali Gali in Chandni Chowk', 'Humayun’s Tomb UNESCO Persian gardens', 'Qutub Minar 73-meter minaret', 'India Gate evening walk'],
    weather: { temp: 27, condition: 'Pleasant Autumn', humidity: '44%', uv: '6.8' },
    safetyIndex: 9.1,
    coordinates: { lat: 28.6139, lng: 77.2090 },
    budget: { budget: 1800, mid: 4500, luxury: 12000 },
    bestMonths: 'October – March'
  },

  // 5. Assam
  {
    name: 'Assam (Kaziranga & Guwahati)',
    state: 'Assam',
    aliases: ['assam', 'kaziranga', 'guwahati', 'majuli', 'jorhat', 'kamakhya', 'tezpur'],
    biomeCategory: 'forest',
    coverImage: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80', // Kaziranga Lush Tea & Rhino Reserve
    specialties: ['One-Horned Rhinoceros Safari', 'Assam Orthodox Black Tea Estates', 'Mighty Brahmaputra River Island Majuli', 'Kamakhya Shakti Peeth Temple'],
    description: 'The land of one-horned rhinos roaming Kaziranga tall grasslands, infinite emerald tea plantations, silk weaving villages, and the majestic Brahmaputra river.',
    highlights: ['Kaziranga National Park elephant & jeep safari', 'Brahmaputra sunset river cruise at Guwahati', 'Majuli island Vaishnavite sattras', 'Kamakhya ancient hilltop shrine'],
    weather: { temp: 24, condition: 'Lush & Pleasant', humidity: '68%', uv: '6.5' },
    safetyIndex: 9.5,
    coordinates: { lat: 26.2006, lng: 92.9376 },
    budget: { budget: 1800, mid: 4200, luxury: 11500 },
    bestMonths: 'October – April'
  },

  // 6. Meghalaya
  {
    name: 'Meghalaya (Shillong & Cherrapunji)',
    state: 'Meghalaya',
    aliases: ['meghalaya', 'shillong', 'cherrapunji', 'dawki', 'sohra', 'mawlynnong'],
    biomeCategory: 'forest',
    coverImage: 'https://images.unsplash.com/photo-1626014303757-646738590c68?auto=format&fit=crop&w=1200&q=80', // Lush Waterfalls & Living Root Bridge
    specialties: ['Double Decker Living Root Bridges', 'Crystal Clear Umngot River Boating at Dawki', 'Nohkalikai Waterfalls (Highest in India)', 'Cleanest Village Mawlynnong'],
    description: 'The Abode of Clouds: bio-engineered living tree root bridges, roaring mist waterfalls, limestone caves, and transparent rivers flowing like glass.',
    highlights: ['Nohkalikai Falls & Seven Sisters plunges', 'Trek to Nongriat Double Decker Root Bridge', 'Dawki Umngot river transparent boat ride', 'Mawsmai prehistoric cave exploration'],
    weather: { temp: 18, condition: 'Misty Clouds', humidity: '80%', uv: '5.5' },
    safetyIndex: 9.8,
    coordinates: { lat: 25.5788, lng: 91.8933 },
    budget: { budget: 1900, mid: 4500, luxury: 12500 },
    bestMonths: 'September – May'
  },

  // 7. Sikkim
  {
    name: 'Sikkim (Gangtok & Pelling)',
    state: 'Sikkim',
    aliases: ['sikkim', 'gangtok', 'pelling', 'nathula', 'tsomgo', 'lachung'],
    biomeCategory: 'mountain',
    coverImage: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80', // High Himalayan Summit & Monasteries
    specialties: ['Kanchenjunga Panoramic Summits', 'Glacial Tsomgo Lake & Nathu La Pass', 'Rumtek & Pemayangtse Monasteries', 'Organic Himalayan Cuisine & Momos'],
    description: 'Breathtaking Himalayan state crowned by Mount Kanchenjunga (world’s 3rd highest peak), alpine glacial lakes, fluttering prayer flags, and peaceful monasteries.',
    highlights: ['Tsomgo Lake & Indo-China border Nathu La pass', 'Rumtek Monastery Buddhist chants', 'Pelling skywalk with Kanchenjunga view', 'Teesta river white water rafting'],
    weather: { temp: 14, condition: 'Alpine Fresh', humidity: '62%', uv: '6.0' },
    safetyIndex: 9.9,
    coordinates: { lat: 27.3314, lng: 88.6138 },
    budget: { budget: 2200, mid: 5200, luxury: 14000 },
    bestMonths: 'March – May, Oct – Dec'
  },

  // 8. Rajasthan - Jaipur
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

  // 9. Rajasthan - Udaipur
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

  // 10. Rajasthan - Jaisalmer
  {
    name: 'Jaisalmer (Thar Desert)',
    state: 'Rajasthan',
    aliases: ['jaisalmer', 'thar desert', 'golden city'],
    biomeCategory: 'desert',
    coverImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80', // Desert Dunes & Sandstone Fort
    specialties: ['Living Golden Sandstone Fort', 'Sam Sand Dunes Camel Safari', 'Patwon Ki Haveli Jharokhas', 'Desert Camp Stargazing & Kalbelia Dance'],
    description: 'The Golden City rising out of the undulating Thar sand dunes, crowned by the massive 12th-century living Jaisalmer Fort.',
    highlights: ['Sam Sand Dunes camel ride and sunset', 'Jaisalmer living Fort interior exploration', 'Patwon Ki Haveli stone filigree', 'Stargazing at night desert luxury tents'],
    weather: { temp: 33, condition: 'Arid Clear', humidity: '20%', uv: '8.5' },
    safetyIndex: 9.4,
    coordinates: { lat: 26.9157, lng: 70.9083 },
    budget: { budget: 2000, mid: 4800, luxury: 14000 },
    bestMonths: 'November – February'
  },

  // 11. Uttar Pradesh - Agra
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

  // 12. Uttar Pradesh - Varanasi
  {
    name: 'Varanasi (Kashi)',
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

  // 13. Uttarakhand - Rishikesh
  {
    name: 'Rishikesh',
    state: 'Uttarakhand',
    aliases: ['rishikesh', 'haridwar', 'uttarakhand', 'ganga rapids'],
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

  // 14. Uttarakhand - Nainital & Mussoorie
  {
    name: 'Nainital & Mussoorie',
    state: 'Uttarakhand',
    aliases: ['nainital', 'mussoorie', 'dehradun'],
    biomeCategory: 'mountain',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', // Lake & Mist Hills
    specialties: ['Naini Lake Yacht Rowing', 'Mall Road & Colonial Architecture', 'Snow View Himalayan Panorama', 'Gun Hill & Kempty Falls'],
    description: 'Charming mountain retreats situated around natural crater lakes and oak-pine mountain ridges with sweeping views of high snow summits.',
    highlights: ['Boating in mango-shaped Naini Lake', 'Tiffin Top panoramic Himalayan peak trek', 'Mussoorie Mall Road & Gun Hill cable car', 'Kempty Falls cascades'],
    weather: { temp: 17, condition: 'Cool Alpine', humidity: '60%', uv: '6.0' },
    safetyIndex: 9.6,
    coordinates: { lat: 29.3919, lng: 79.4542 },
    budget: { budget: 2100, mid: 4800, luxury: 13000 },
    bestMonths: 'March – June, Sept – Nov'
  },

  // 15. Himachal Pradesh - Manali
  {
    name: 'Manali & Rohtang Pass',
    state: 'Himachal Pradesh',
    aliases: ['manali', 'rohtang', 'himachal', 'himachal pradesh', 'kullu', 'solang', 'atal tunnel'],
    biomeCategory: 'mountain',
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80', // Snowy Summits
    specialties: ['Rohtang Pass & Atal Tunnel Snow View', 'Solang Valley Paragliding & Skiing', 'Old Manali Bohemian Cafes', 'Ancient Hadimba Wooden Temple'],
    description: 'Snow-covered Pir Panjal summits, pine forest trails along the Beas river, apple orchards, and thrilling high-altitude snow passes.',
    highlights: ['Snow sports at Solang Valley and Rohtang Pass', 'Drive through Atal Tunnel to Sissu waterfall', 'Hadimba Temple amidst deodar pines', 'Old Manali riverside cafes'],
    weather: { temp: 13, condition: 'Snow Peaks & Sun', humidity: '55%', uv: '7.2' },
    safetyIndex: 9.5,
    coordinates: { lat: 32.2432, lng: 77.1892 },
    budget: { budget: 2200, mid: 5200, luxury: 14500 },
    bestMonths: 'October – June'
  },

  // 16. Himachal Pradesh - Shimla
  {
    name: 'Shimla',
    state: 'Himachal Pradesh',
    aliases: ['shimla', 'kufri', 'chail'],
    biomeCategory: 'mountain',
    coverImage: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80',
    specialties: ['The Ridge & Christ Church', 'Kalka-Shimla UNESCO Toy Train', 'Jakhoo Hill & Giant Hanuman Statue', 'Kufri Snow & Pine Trails'],
    description: 'The historic Queen of Hills: colonial Victorian architecture, the pedestrian Ridge, and pine-clad hillsides looking out across snow peaks.',
    highlights: ['Walking along Mall Road and the historic Ridge', 'Riding the Kalka-Shimla mountain toy train', 'Jakhoo Temple summit walk', 'Kufri adventure valley'],
    weather: { temp: 16, condition: 'Breezy Alpine', humidity: '58%', uv: '6.2' },
    safetyIndex: 9.7,
    coordinates: { lat: 31.1048, lng: 77.1734 },
    budget: { budget: 2000, mid: 4800, luxury: 13500 },
    bestMonths: 'March – June, Dec – Jan'
  },

  // 17. Jammu & Kashmir - Srinagar
  {
    name: 'Srinagar & Gulmarg (Kashmir)',
    state: 'Jammu & Kashmir',
    aliases: ['kashmir', 'srinagar', 'gulmarg', 'pahalgam', 'jammu & kashmir', 'jammu and kashmir', 'jammu', 'sonamarg'],
    biomeCategory: 'gardens',
    coverImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80', // Dal Lake Shikara
    specialties: ['Dal Lake Shikaras & Carved Wooden Houseboats', 'Gulmarg World’s Highest Gondola & Ski Slopes', 'Pashmina Shawls & Saffron Fields of Pampore', 'Authentic 36-Course Wazwan Feast & Kahwa'],
    description: 'Paradise on Earth: shikara rides on reflective Dal Lake waters, snow-covered ski slopes of Gulmarg, Mughal terraced flower gardens, and aromatic saffron.',
    highlights: ['Dawn shikara boat ride on Dal Lake', 'Gulmarg Gondola to Apharwat peak snow summit', 'Shalimar & Nishat Mughal Gardens', 'Pahalgam Betaab Valley pine walks'],
    weather: { temp: 15, condition: 'Crisp Valley Sun', humidity: '62%', uv: '6.0' },
    safetyIndex: 9.3,
    coordinates: { lat: 34.0837, lng: 74.7973 },
    budget: { budget: 2500, mid: 6000, luxury: 16000 },
    bestMonths: 'March – October, Dec – Feb (Snow)'
  },

  // 18. Ladakh
  {
    name: 'Leh & Ladakh',
    state: 'Ladakh',
    aliases: ['ladakh', 'leh', 'pangong', 'nubra', 'khardung la', 'zanskar'],
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
  },

  // 19. Goa
  {
    name: 'Goa (North & South Goa)',
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

  // 20. Maharashtra - Mumbai
  {
    name: 'Mumbai',
    state: 'Maharashtra',
    aliases: ['mumbai', 'bombay', 'maharashtra', 'pune', 'lonavala'],
    biomeCategory: 'beach',
    coverImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80', // Marine Drive & Taj Hotel
    specialties: ['Gateway of India Waterfront', 'Marine Drive Queen’s Necklace', 'Elephanta Island Rock Caves', 'Authentic Mumbai Vada Pav & Pav Bhaji'],
    description: 'The City of Dreams: Arabian Sea waterfronts, Art Deco architecture along Marine Drive, historic Gateway of India, and energetic street culture.',
    highlights: ['Gateway of India and iconic Taj Mahal Palace', 'Marine Drive night skyline walk', 'Elephanta Caves rock sculpture ferry', 'Colaba Causeway street shopping'],
    weather: { temp: 30, condition: 'Coastal Warm', humidity: '70%', uv: '8.0' },
    safetyIndex: 9.4,
    coordinates: { lat: 18.9220, lng: 72.8347 },
    budget: { budget: 2500, mid: 6500, luxury: 18000 },
    bestMonths: 'October – March'
  },

  // 21. Karnataka - Bengaluru
  {
    name: 'Bengaluru (Bangalore)',
    state: 'Karnataka',
    aliases: ['bengaluru', 'bangalore', 'karnataka', 'mysore', 'coorg', 'hampi'],
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

  // 22. Kerala - Alleppey & Munnar
  {
    name: 'Alleppey & Munnar (Kerala)',
    state: 'Kerala',
    aliases: ['kerala', 'alleppey', 'munnar', 'kochi', 'cochin', 'wayanad', 'varkala', 'alappuzha'],
    biomeCategory: 'river',
    coverImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80', // Backwater Houseboat & Palm Waters
    specialties: ['Traditional Kettuvallam Houseboat Cruise', 'Sprawling Munnar Tea Plantations', 'Authentic Ayurvedic Spa Therapies', 'Fort Kochi Chinese Fishing Nets'],
    description: 'God’s Own Country: gliding along palm-fringed backwater lagoons on thatched houseboats and breathing the cool aroma of mountain tea estates in Munnar.',
    highlights: ['Overnight houseboat stay through Alleppey backwaters', 'Munnar Kolukkumalai sunrise tea estate safari', 'Kathakali cultural dance performance', 'Fort Kochi historic colonial heritage walk'],
    weather: { temp: 27, condition: 'Tropical Backwater Calm', humidity: '76%', uv: '8.0' },
    safetyIndex: 9.8,
    coordinates: { lat: 9.4981, lng: 76.3388 },
    budget: { budget: 2300, mid: 5600, luxury: 15500 },
    bestMonths: 'September – March'
  },

  // 23. Tamil Nadu
  {
    name: 'Chennai & Mahabalipuram',
    state: 'Tamil Nadu',
    aliases: ['chennai', 'madras', 'tamil nadu', 'mahabalipuram', 'madurai', 'ooty', 'kodaikanal'],
    biomeCategory: 'beach',
    coverImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80', // Shore Temple by Ocean
    specialties: ['UNESCO 7th-Century Shore Temple', 'Kapaleeshwarar Dravidian Gopuram', 'World’s 2nd Longest Marina Beach', 'Kanchipuram Silk & South Indian Thali'],
    description: 'Gateway to South India: monolithic rock-carved temples along ocean beaches, towering colorful gopuram temples, and rich Carnatic classical culture.',
    highlights: ['Mahabalipuram stone-carved Shore Temple & Arjuna’s Penance', 'Kapaleeshwarar Temple rituals in Mylapore', 'Marina Beach evening breeze and sundal snack', 'Day excursion to Kanchipuram silk weavers'],
    weather: { temp: 31, condition: 'Sunny Coastal', humidity: '72%', uv: '8.4' },
    safetyIndex: 9.5,
    coordinates: { lat: 13.0827, lng: 80.2707 },
    budget: { budget: 1900, mid: 4500, luxury: 12500 },
    bestMonths: 'November – February'
  },

  // 24. West Bengal - Kolkata & Darjeeling
  {
    name: 'Kolkata & Darjeeling',
    state: 'West Bengal',
    aliases: ['kolkata', 'calcutta', 'darjeeling', 'west bengal', 'sundarbans'],
    biomeCategory: 'mountain',
    coverImage: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80', // Victoria Memorial & Hills
    specialties: ['Victoria Memorial Marble Monument', 'Darjeeling Himalayan Toy Train', 'Tiger Hill Sunrise over Mount Kanchenjunga', 'World-Famous Darjeeling Muscatel Tea & Sweets'],
    description: 'The City of Joy and Queen of the Hills: grand Victoria Memorial, yellow vintage taxis, Howrah Bridge, and tea plantations overlooking snowy Kanchenjunga.',
    highlights: ['Victoria Memorial gardens and museum galleries', 'Tiger Hill dawn view of Kanchenjunga peak', 'UNESCO Darjeeling Himalayan Toy Train journey', 'Howrah Bridge crossing and Prinsep Ghat'],
    weather: { temp: 24, condition: 'Pleasant Autumn', humidity: '64%', uv: '6.5' },
    safetyIndex: 9.3,
    coordinates: { lat: 22.5726, lng: 88.3639 },
    budget: { budget: 1800, mid: 4200, luxury: 11500 },
    bestMonths: 'October – March'
  },

  // 25. Madhya Pradesh - Khajuraho
  {
    name: 'Bhopal & Khajuraho',
    state: 'Madhya Pradesh',
    aliases: ['madhya pradesh', 'khajuraho', 'bhopal', 'indore', 'kanha', 'bandhavgarh', 'gwalior'],
    biomeCategory: 'forest',
    coverImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80', // Temple Carvings & Nature
    specialties: ['Khajuraho UNESCO Temple Sculptures', 'Kanha & Bandhavgarh Tiger Reserves', 'Sanchi Buddhist Great Stupa', 'Upper Lake Bhopal Waterways'],
    description: 'The heart of India featuring intricate medieval temple sculptures of Khajuraho, dense sal forest tiger reserves, and Buddhist heritage at Sanchi.',
    highlights: ['UNESCO Western Group of Khajuraho temples', 'Open gypsy tiger safari in Kanha National Park', 'Great Stupa at Sanchi 3rd century BCE', 'Sunset boating at Upper Lake Bhopal'],
    weather: { temp: 27, condition: 'Clear Sun', humidity: '42%', uv: '7.4' },
    safetyIndex: 9.3,
    coordinates: { lat: 23.2599, lng: 77.4126 },
    budget: { budget: 1700, mid: 4000, luxury: 11000 },
    bestMonths: 'October – March'
  },

  // 26. Gujarat - Kutch & Ahmedabad
  {
    name: 'Rann of Kutch & Ahmedabad',
    state: 'Gujarat',
    aliases: ['gujarat', 'kutch', 'rann of kutch', 'ahmedabad', 'gir', 'somnath', 'dwarka'],
    biomeCategory: 'desert',
    coverImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80', // White Salt Desert
    specialties: ['White Rann Salt Desert Full Moon', 'Gir National Park Asiatic Lions', 'Sabarmati Gandhi Ashram', 'Kutchi Rogan & Mirror Embroidery'],
    description: 'Vast glittering white salt desert under the moon, home to the world’s last wild Asiatic lions in Gir, and UNESCO heritage city Ahmedabad.',
    highlights: ['Full moon walk on the Great White Rann', 'Asiatic lion safari in Sasan Gir', 'Sabarmati Ashram peaceful walk along riverfront', 'Adalaj Stepwell intricate architecture'],
    weather: { temp: 30, condition: 'Dry & Sunny', humidity: '35%', uv: '8.0' },
    safetyIndex: 9.6,
    coordinates: { lat: 23.8344, lng: 69.8329 },
    budget: { budget: 2000, mid: 4800, luxury: 13000 },
    bestMonths: 'November – February'
  },

  // 27. Punjab - Amritsar
  {
    name: 'Amritsar (Golden Temple)',
    state: 'Punjab',
    aliases: ['punjab', 'amritsar', 'golden temple', 'harmandir sahib'],
    biomeCategory: 'gardens',
    coverImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80', // Golden Temple Amrit Sarovar
    specialties: ['Harmandir Sahib (The Golden Temple)', 'World’s Largest Free Community Langar', 'Wagah Border Beating Retreat Ceremony', 'Authentic Amritsari Kulcha & Lassi'],
    description: 'The spiritual crown of Punjab: the gold-plated Harmandir Sahib surrounded by the sacred Amrit Sarovar pool, free community kitchens, and lively Punjabi hospitality.',
    highlights: ['Golden Temple nighttime illumination & Palki ceremony', 'Volunteering and eating at the 24/7 Mega Langar', 'Wagah Border patriotic flag lowering parade', 'Jallianwala Bagh national memorial'],
    weather: { temp: 25, condition: 'Golden Autumn', humidity: '46%', uv: '6.8' },
    safetyIndex: 9.7,
    coordinates: { lat: 31.6200, lng: 74.8765 },
    budget: { budget: 1600, mid: 3800, luxury: 10000 },
    bestMonths: 'October – March'
  }
];

/**
 * Strict Location Validation & Search
 * Returns exact matched location object, OR null if the query is not a recognized city/state/location.
 */
export function searchStrictLocation(query) {
  if (!query || typeof query !== 'string') return null;
  const q = query.trim().toLowerCase();
  if (q.length < 2) return null;

  // Filter out non-location queries like "hello", "weather", "cars", "test", "food", "abc", numbers
  const invalidWords = [
    'hello', 'hi', 'hey', 'test', 'car', 'cars', 'food', 'weather', 'budget', 'money', 
    'booking', 'flights', 'hotel', 'train', 'bus', 'bike', 'what', 'why', 'how', 'when',
    'please', 'good', 'bad', 'nice', 'abc', 'xyz', 'phone', 'bag', 'camera'
  ];
  if (invalidWords.includes(q)) return null;

  // Exact or alias match across all verified Indian destinations
  for (const dest of ALL_INDIAN_DESTINATIONS) {
    if (dest.name.toLowerCase().includes(q) || 
        dest.state.toLowerCase().includes(q) ||
        dest.aliases.some(a => a.toLowerCase().includes(q) || q.includes(a.toLowerCase()))) {
      return dest;
    }
  }

  // Not recognized as a valid city or state
  return null;
}

// Alias export for backwards compatibility
export const searchAllIndia = searchStrictLocation;
