// Comprehensive Indian States, Union Territories & Major Tourism Cities Directory
export const ALL_INDIAN_DESTINATIONS = [
  // Northeast: Assam, Meghalaya, Sikkim, Arunachal
  {
    name: 'Assam (Kaziranga & Guwahati)',
    state: 'Assam',
    aliases: ['assam', 'kaziranga', 'guwahati', 'majuli', 'jorhat', 'kamakhya'],
    biomeCategory: 'forest',
    coverImage: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80',
    description: 'The land of one-horned rhinoceroses, vast emerald tea estates, the mighty Brahmaputra river, and sacred Kamakhya temple.',
    highlights: ['Kaziranga National Park rhino safari', 'Brahmaputra sunset cruise', 'Majuli largest river island', 'Kamakhya ancient hilltop shrine'],
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
    description: 'The Abode of Clouds: living root bridges, plunging waterfalls, crystal-clear Dawki river, and limestone caves.',
    highlights: ['Nohkalikai Falls & Seven Sisters', 'Living Root Bridges of Nongriat', 'Umngot River crystal boating at Dawki', 'Mawsmai Cave exploration'],
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
    description: 'Breathtaking Himalayan kingdom under Kanchenjunga summits, alpine Tsomgo Lake, and serene Buddhist monasteries.',
    highlights: ['Tsomgo Lake & Nathu La Pass', 'Rumtek & Enchey Monasteries', 'Kanchenjunga vantage points', 'Teesta river white water rafting'],
    weather: { temp: 14, condition: 'Alpine Fresh', humidity: '62%', uv: '6.0' },
    safetyIndex: 9.9,
    coordinates: { lat: 27.3314, lng: 88.6138 },
    budget: { budget: 2200, mid: 5200, luxury: 14000 },
    bestMonths: 'March – May, Oct – Dec'
  },

  // Delhi NCR
  {
    name: 'Delhi (New Delhi)',
    state: 'National Capital Territory',
    aliases: ['delhi', 'new delhi', 'ncr', 'old delhi'],
    biomeCategory: 'gardens',
    coverImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
    description: 'The historic capital of empires, celebrated for Mughal monuments, Lodhi Gardens, street culinary trails, and vibrant bazaars.',
    highlights: ['Red Fort & Chandni Chowk', 'Humayun’s Tomb Gardens', 'Qutub Minar', 'India Gate & Kartavya Path'],
    weather: { temp: 28, condition: 'Pleasant Autumn', humidity: '42%', uv: '7.0' },
    safetyIndex: 9.1,
    coordinates: { lat: 28.6139, lng: 77.2090 },
    budget: { budget: 1800, mid: 4500, luxury: 12000 },
    bestMonths: 'October – March'
  },

  // Rajasthan
  {
    name: 'Jaipur',
    state: 'Rajasthan',
    aliases: ['jaipur', 'pink city', 'rajasthan'],
    biomeCategory: 'desert',
    coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    description: 'The royal Pink City of palatial havelis, hill forts, astronomical wonders, and jewel markets.',
    highlights: ['Amber Fort & Sheesh Mahal', 'Hawa Mahal honeycomb facade', 'City Palace & Jantar Mantar', 'Nahargarh sunset vantage'],
    weather: { temp: 31, condition: 'Golden Sun', humidity: '30%', uv: '8.2' },
    safetyIndex: 9.4,
    coordinates: { lat: 26.9124, lng: 75.7873 },
    budget: { budget: 1900, mid: 4600, luxury: 13000 },
    bestMonths: 'October – March'
  },
  {
    name: 'Udaipur',
    state: 'Rajasthan',
    aliases: ['udaipur', 'lake city', 'city of lakes'],
    biomeCategory: 'river',
    coverImage: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1200&q=80',
    description: 'The Venice of the East with shimmering turquoise Lake Pichola, white marble palaces, and Aravalli mountain sunsets.',
    highlights: ['City Palace Lake Complex', 'Jag Mandir boat cruise', 'Saheliyon Ki Bari fountains', 'Bagore Ki Haveli folk dance'],
    weather: { temp: 29, condition: 'Breezy Lakes', humidity: '38%', uv: '7.8' },
    safetyIndex: 9.6,
    coordinates: { lat: 24.5854, lng: 73.7125 },
    budget: { budget: 2200, mid: 5200, luxury: 15000 },
    bestMonths: 'September – March'
  },
  {
    name: 'Jaisalmer (Thar Desert)',
    state: 'Rajasthan',
    aliases: ['jaisalmer', 'thar desert', 'golden city'],
    biomeCategory: 'desert',
    coverImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    description: 'The Golden City rising from the heart of the Thar Desert, crowned by the living golden sandstone Jaisalmer Fort.',
    highlights: ['Sam Sand Dunes camel safari', 'Jaisalmer living Fort', 'Patwon Ki Haveli stone filigree', 'Desert night stargazing'],
    weather: { temp: 33, condition: 'Arid Clear', humidity: '20%', uv: '8.5' },
    safetyIndex: 9.4,
    coordinates: { lat: 26.9157, lng: 70.9083 },
    budget: { budget: 2000, mid: 4800, luxury: 14000 },
    bestMonths: 'November – February'
  },

  // Uttar Pradesh
  {
    name: 'Agra',
    state: 'Uttar Pradesh',
    aliases: ['agra', 'taj mahal', 'uttar pradesh'],
    biomeCategory: 'gardens',
    coverImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    description: 'Home of the timeless white marble Taj Mahal and the red sandstone fortress along the tranquil Yamuna riverbank.',
    highlights: ['Taj Mahal at sunrise', 'Agra Fort battlements', 'Mehtab Bagh sunset reflection', 'Mughlai gastronomy'],
    weather: { temp: 29, condition: 'Sunny', humidity: '40%', uv: '7.5' },
    safetyIndex: 9.2,
    coordinates: { lat: 27.1767, lng: 78.0081 },
    budget: { budget: 1700, mid: 4200, luxury: 11000 },
    bestMonths: 'October – March'
  },
  {
    name: 'Varanasi (Kashi)',
    state: 'Uttar Pradesh',
    aliases: ['varanasi', 'banaras', 'kashi'],
    biomeCategory: 'river',
    coverImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    description: 'The spiritual heart of India, where ancient stone ghats meet the holy Ganges in flame-lit prayer rituals.',
    highlights: ['Dashashwamedh Ghat Ganga Aarti', 'Sunrise rowing boat pilgrimage', 'Kashi Vishwanath golden corridor', 'Sarnath Buddhist stupa'],
    weather: { temp: 27, condition: 'Sacred Haze', humidity: '52%', uv: '6.8' },
    safetyIndex: 9.3,
    coordinates: { lat: 25.3176, lng: 82.9739 },
    budget: { budget: 1500, mid: 3800, luxury: 10500 },
    bestMonths: 'October – March'
  },

  // Uttarakhand
  {
    name: 'Rishikesh',
    state: 'Uttarakhand',
    aliases: ['rishikesh', 'haridwar', 'uttarakhand'],
    biomeCategory: 'river',
    coverImage: 'https://images.unsplash.com/photo-1600100397608-f010f447a4a2?auto=format&fit=crop&w=1200&q=80',
    description: 'Yoga capital of the world in the Himalayan foothills where turquoise rapids meet ashrams, cafes, and hanging bridges.',
    highlights: ['Triveni Ghat Maha Aarti', 'White water rafting rapids', 'The Beatles Ashram murals', 'Laxman & Ram Jhula'],
    weather: { temp: 24, condition: 'Crisp Mountain Breeze', humidity: '48%', uv: '6.5' },
    safetyIndex: 9.7,
    coordinates: { lat: 30.0869, lng: 78.2676 },
    budget: { budget: 1600, mid: 3900, luxury: 11500 },
    bestMonths: 'September – April'
  },
  {
    name: 'Nainital & Mussoorie',
    state: 'Uttarakhand',
    aliases: ['nainital', 'mussoorie', 'dehradun'],
    biomeCategory: 'mountain',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description: 'Charming colonial hill stations set around emerald crater lakes and oak-pine mountain ridgelines.',
    highlights: ['Naini Lake yacht rowing', 'Kempty Falls & Mall Road', 'Snow View Himalayan peak vista', 'Tiffin Top pine trek'],
    weather: { temp: 17, condition: 'Cool Alpine', humidity: '60%', uv: '6.0' },
    safetyIndex: 9.6,
    coordinates: { lat: 29.3919, lng: 79.4542 },
    budget: { budget: 2100, mid: 4800, luxury: 13000 },
    bestMonths: 'March – June, Sept – Nov'
  },

  // Himachal Pradesh
  {
    name: 'Manali & Rohtang Pass',
    state: 'Himachal Pradesh',
    aliases: ['manali', 'rohtang', 'himachal', 'himachal pradesh', 'kullu'],
    biomeCategory: 'mountain',
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    description: 'Snow-clad Pir Panjal summits, pine forest valleys, apple orchards, and adventurous high-altitude passes.',
    highlights: ['Solang Valley paragliding', 'Atal Tunnel to Sissu waterfalls', 'Old Manali cafes & cedar trails', 'Hadimba wooden temple'],
    weather: { temp: 13, condition: 'Snow Peaks & Sun', humidity: '55%', uv: '7.2' },
    safetyIndex: 9.5,
    coordinates: { lat: 32.2432, lng: 77.1892 },
    budget: { budget: 2200, mid: 5200, luxury: 14500 },
    bestMonths: 'October – June'
  },
  {
    name: 'Shimla',
    state: 'Himachal Pradesh',
    aliases: ['shimla', 'kufri'],
    biomeCategory: 'mountain',
    coverImage: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80',
    description: 'The Queen of Hills with heritage British architecture, the iconic pedestrian Ridge, and pine-clad hillsides.',
    highlights: ['The Ridge & Christ Church', 'Kalka-Shimla UNESCO toy train', 'Jakhoo temple hilltop trail', 'Kufri pine valley'],
    weather: { temp: 16, condition: 'Breezy Alpine', humidity: '58%', uv: '6.2' },
    safetyIndex: 9.7,
    coordinates: { lat: 31.1048, lng: 77.1734 },
    budget: { budget: 2000, mid: 4800, luxury: 13500 },
    bestMonths: 'March – June, Dec – Jan'
  },

  // Jammu & Kashmir & Ladakh
  {
    name: 'Srinagar & Gulmarg (Kashmir)',
    state: 'Jammu & Kashmir',
    aliases: ['kashmir', 'srinagar', 'gulmarg', 'pahalgam', 'jammu & kashmir', 'jammu and kashmir', 'jammu'],
    biomeCategory: 'gardens',
    coverImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
    description: 'Paradise on Earth: shikaras on Dal Lake, Mughal terraced flower gardens, snow-covered ski slopes of Gulmarg, and saffron fields.',
    highlights: ['Dal Lake shikara & wooden houseboat', 'Gulmarg Gondola to Apharwat peak', 'Shalimar & Nishat Mughal Gardens', 'Pahalgam Betaab Valley'],
    weather: { temp: 15, condition: 'Crisp Valley Sun', humidity: '62%', uv: '6.0' },
    safetyIndex: 9.3,
    coordinates: { lat: 34.0837, lng: 74.7973 },
    budget: { budget: 2500, mid: 6000, luxury: 16000 },
    bestMonths: 'March – October, Dec – Feb (Snow)'
  },
  {
    name: 'Leh & Ladakh',
    state: 'Ladakh',
    aliases: ['ladakh', 'leh', 'pangong', 'nubra'],
    biomeCategory: 'mountain',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description: 'The Land of High Passes: dramatic trans-Himalayan landscapes, sapphire-blue Pangong Tso lake, and cliffside monasteries.',
    highlights: ['Pangong Tso border lake', 'Nubra Valley sand dunes & Bactrian camels', 'Khardung La high motor pass', 'Thiksey & Hemis Gompas'],
    weather: { temp: 11, condition: 'High Altitude Sun', humidity: '22%', uv: '11 Extreme' },
    safetyIndex: 9.5,
    coordinates: { lat: 34.1526, lng: 77.5771 },
    budget: { budget: 2400, mid: 5800, luxury: 15500 },
    bestMonths: 'May – September'
  },

  // Goa & Maharashtra
  {
    name: 'Goa (North & South Goa)',
    state: 'Goa',
    aliases: ['goa', 'north goa', 'south goa', 'panaji'],
    biomeCategory: 'beach',
    coverImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    description: 'Tropical coastline of sun-drenched beaches, Portuguese colonial cathedrals, seaside shacks, and spice plantations.',
    highlights: ['Palolem & Vagator beaches', 'Dudhsagar waterfall trek', 'Basilica of Bom Jesus', 'Sunset catamaran cruise'],
    weather: { temp: 29, condition: 'Tropical Coastal Breeze', humidity: '72%', uv: '8.8' },
    safetyIndex: 9.4,
    coordinates: { lat: 15.2993, lng: 74.1240 },
    budget: { budget: 2200, mid: 5200, luxury: 15000 },
    bestMonths: 'October – April'
  },
  {
    name: 'Mumbai',
    state: 'Maharashtra',
    aliases: ['mumbai', 'bombay', 'maharashtra', 'pune', 'lonavala'],
    biomeCategory: 'beach',
    coverImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
    description: 'The City of Dreams: Arabian Sea waterfronts, Art Deco architecture, iconic Marine Drive, and buzzing street life.',
    highlights: ['Gateway of India & Taj Palace', 'Marine Drive Queen’s Necklace', 'Elephanta Island cave temples', 'Colaba Causeway street walk'],
    weather: { temp: 30, condition: 'Coastal Warm', humidity: '70%', uv: '8.0' },
    safetyIndex: 9.4,
    coordinates: { lat: 18.9220, lng: 72.8347 },
    budget: { budget: 2500, mid: 6500, luxury: 18000 },
    bestMonths: 'October – March'
  },

  // Karnataka & Kerala
  {
    name: 'Bengaluru (Bangalore)',
    state: 'Karnataka',
    aliases: ['bengaluru', 'bangalore', 'karnataka', 'mysore', 'coorg', 'hampi'],
    biomeCategory: 'gardens',
    coverImage: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
    description: 'The Garden City and Silicon Valley of India, celebrated for year-round pleasant weather, Cubbon Park, and craft breweries.',
    highlights: ['Lalbagh Botanical Garden glass house', 'Bangalore Palace royal tour', 'Cubbon Park walking trails', 'Indiranagar culinary scene'],
    weather: { temp: 25, condition: 'Pleasant & Mild', humidity: '56%', uv: '7.0' },
    safetyIndex: 9.6,
    coordinates: { lat: 12.9716, lng: 77.5946 },
    budget: { budget: 2100, mid: 5000, luxury: 14000 },
    bestMonths: 'All Year Round'
  },
  {
    name: 'Alleppey & Munnar (Kerala)',
    state: 'Kerala',
    aliases: ['kerala', 'alleppey', 'munnar', 'kochi', 'cochin', 'wayanad', 'varkala'],
    biomeCategory: 'river',
    coverImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    description: 'God’s Own Country: tranquil palm-fringed backwater canals on houseboats and mist-shrouded Munnar tea plantations.',
    highlights: ['Alleppey backwater houseboat cruise', 'Munnar sprawling tea estate walks', 'Eravikulam mountain reserve', 'Fort Kochi Chinese fishing nets'],
    weather: { temp: 27, condition: 'Tropical Backwater Calm', humidity: '76%', uv: '8.0' },
    safetyIndex: 9.8,
    coordinates: { lat: 9.4981, lng: 76.3388 },
    budget: { budget: 2300, mid: 5600, luxury: 15500 },
    bestMonths: 'September – March'
  },

  // Tamil Nadu & West Bengal
  {
    name: 'Chennai & Mahabalipuram',
    state: 'Tamil Nadu',
    aliases: ['chennai', 'madras', 'tamil nadu', 'mahabalipuram', 'madurai', 'ooty', 'kodaikanal'],
    biomeCategory: 'beach',
    coverImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    description: 'Gateway to South India: ancient Shore Temples carved from coastal rock, Carnatic culture, and Marina beach.',
    highlights: ['Mahabalipuram UNESCO Shore Temple', 'Kapaleeshwarar Dravidian temple', 'Marina Beach sunset', 'Kanchipuram silk weavers'],
    weather: { temp: 31, condition: 'Sunny Coastal', humidity: '72%', uv: '8.4' },
    safetyIndex: 9.5,
    coordinates: { lat: 13.0827, lng: 80.2707 },
    budget: { budget: 1900, mid: 4500, luxury: 12500 },
    bestMonths: 'November – February'
  },
  {
    name: 'Kolkata & Darjeeling',
    state: 'West Bengal',
    aliases: ['kolkata', 'calcutta', 'darjeeling', 'west bengal', 'sundarbans'],
    biomeCategory: 'mountain',
    coverImage: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80',
    description: 'Cultural capital of art, Victoria Memorial marble hall, and northern Darjeeling vistas of Mount Kanchenjunga.',
    highlights: ['Victoria Memorial gardens', 'Howrah Bridge over Hooghly river', 'Darjeeling Himalayan Toy Train', 'Tiger Hill Kanchenjunga sunrise'],
    weather: { temp: 24, condition: 'Pleasant Autumn', humidity: '64%', uv: '6.5' },
    safetyIndex: 9.3,
    coordinates: { lat: 22.5726, lng: 88.3639 },
    budget: { budget: 1800, mid: 4200, luxury: 11500 },
    bestMonths: 'October – March'
  },

  // Madhya Pradesh, Gujarat, Punjab
  {
    name: 'Bhopal & Khajuraho',
    state: 'Madhya Pradesh',
    aliases: ['madhya pradesh', 'khajuraho', 'bhopal', 'indore', 'kanha', 'bandhavgarh'],
    biomeCategory: 'forest',
    coverImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    description: 'The heart of India featuring UNESCO ancient temples, tiger reserves of Kanha and Bandhavgarh, and royal lakes.',
    highlights: ['Khajuraho temple complex carvings', 'Kanha Tiger Reserve safari', 'Sanchi Stupa Buddhist heritage', 'Upper Lake Bhopal'],
    weather: { temp: 27, condition: 'Clear Sun', humidity: '42%', uv: '7.4' },
    safetyIndex: 9.3,
    coordinates: { lat: 23.2599, lng: 77.4126 },
    budget: { budget: 1700, mid: 4000, luxury: 11000 },
    bestMonths: 'October – March'
  },
  {
    name: 'Rann of Kutch & Ahmedabad',
    state: 'Gujarat',
    aliases: ['gujarat', 'kutch', 'rann of kutch', 'ahmedabad', 'gir', 'somnath'],
    biomeCategory: 'desert',
    coverImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    description: 'Vast shimmering white salt desert under the full moon, Asiatic lions of Gir, and UNESCO historic Ahmedabad.',
    highlights: ['White Rann moonlight salt desert', 'Rann Utsav cultural tent city', 'Gir National Park Asiatic lion safari', 'Sabarmati Ashram'],
    weather: { temp: 30, condition: 'Dry & Sunny', humidity: '35%', uv: '8.0' },
    safetyIndex: 9.6,
    coordinates: { lat: 23.8344, lng: 69.8329 },
    budget: { budget: 2000, mid: 4800, luxury: 13000 },
    bestMonths: 'November – February'
  },
  {
    name: 'Amritsar (Golden Temple)',
    state: 'Punjab',
    aliases: ['punjab', 'amritsar', 'golden temple'],
    biomeCategory: 'gardens',
    coverImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    description: 'Spiritual sanctuary of the Golden Temple (Harmandir Sahib), community langar kitchens, and vibrant Punjabi heritage.',
    highlights: ['Harmandir Sahib illuminated at night', 'World’s largest free Langar kitchen', 'Wagah Border beating retreat ceremony', 'Jallianwala Bagh memorial'],
    weather: { temp: 25, condition: 'Golden Autumn', humidity: '46%', uv: '6.8' },
    safetyIndex: 9.7,
    coordinates: { lat: 31.6200, lng: 74.8765 },
    budget: { budget: 1600, mid: 3800, luxury: 10000 },
    bestMonths: 'October – March'
  }
];

// Universal Indian Search Function matching any State, City, or Synonym
export function searchAllIndia(query) {
  if (!query) return null;
  const q = query.trim().toLowerCase();

  // 1. Direct city or state exact/partial match
  for (const dest of ALL_INDIAN_DESTINATIONS) {
    if (dest.name.toLowerCase().includes(q) || 
        dest.state.toLowerCase().includes(q) ||
        dest.aliases.some(a => a.toLowerCase().includes(q) || q.includes(a.toLowerCase()))) {
      return dest;
    }
  }

  // 2. Dynamic Fallback for any other state/city in India
  return {
    name: `${query.charAt(0).toUpperCase() + query.slice(1)}, India`,
    state: `${query.charAt(0).toUpperCase() + query.slice(1)} State`,
    aliases: [q],
    biomeCategory: 'forest',
    coverImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    description: `Discover the breathtaking heritage, regional culture, and scenic landscapes of ${query}.`,
    highlights: ['Scenic regional nature trails', 'Historical landmarks and temples', 'Authentic regional culinary delights', 'Local handicraft & artisan markets'],
    weather: { temp: 25, condition: 'Clear Atmosphere', humidity: '50%', uv: '6.8' },
    safetyIndex: 9.4,
    coordinates: { lat: 22.0, lng: 78.0 },
    budget: { budget: 1800, mid: 4500, luxury: 12000 },
    bestMonths: 'October – April'
  };
}
