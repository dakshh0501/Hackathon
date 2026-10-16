// 6 Biomes strictly according to the hand-drawn sketch reference:
// DESERT | BEACH | MOUNTAIN | FOREST | GARDENS | RIVER
export const SKETCH_BIOMES = [
  {
    id: 'desert',
    name: 'DESERT',
    emoji: '🏜️',
    accentColor: '#D97706',
    glowColor: 'rgba(217, 119, 6, 0.5)',
    tagline: 'Vast golden dunes & starlit stillness',
    bgImage: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1920&q=85',
    destinations: [
      { name: 'Thar Desert, Rajasthan', temp: '32°C', rating: '4.9', visitors: '1.2M' },
      { name: 'Sahara & Merzouga', temp: '34°C', rating: '4.8', visitors: '2.1M' }
    ],
    stats: { biodiversity: 'Arid Flora', avgTemp: '33°C', bestMonths: 'Oct – Mar', safety: '9.4/10' }
  },
  {
    id: 'beach',
    name: 'BEACH',
    emoji: '🏖️',
    accentColor: '#0EA5E9',
    glowColor: 'rgba(14, 165, 233, 0.5)',
    tagline: 'Turquoise lagoons & powder sands',
    bgImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    destinations: [
      { name: 'Palawan Hidden Beach', temp: '29°C', rating: '4.95', visitors: '850K' },
      { name: 'Goa & Gokarna Shores', temp: '28°C', rating: '4.8', visitors: '2.4M' }
    ],
    stats: { biodiversity: 'Marine Corals', avgTemp: '28°C', bestMonths: 'Nov – Apr', safety: '9.2/10' }
  },
  {
    id: 'mountain',
    name: 'MOUNTAIN',
    emoji: '🏔️',
    accentColor: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.5)',
    tagline: 'High summits & glacial whispering winds',
    bgImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
    destinations: [
      { name: 'Leh & Zanskar Valley', temp: '14°C', rating: '4.92', visitors: '620K' },
      { name: 'Swiss Alps Matterhorn', temp: '8°C', rating: '4.96', visitors: '3.1M' }
    ],
    stats: { biodiversity: 'Alpine Tundra', avgTemp: '12°C', bestMonths: 'May – Sep', safety: '9.6/10' }
  },
  {
    id: 'forest',
    name: 'FOREST',
    emoji: '🌲',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    tagline: 'Deep emerald canopies & ancient groves',
    bgImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80',
    destinations: [
      { name: 'Monteverde Cloud Canopy', temp: '22°C', rating: '4.93', visitors: '510K' },
      { name: 'Black Forest Pines', temp: '18°C', rating: '4.85', visitors: '1.4M' }
    ],
    stats: { biodiversity: 'High Canopy', avgTemp: '20°C', bestMonths: 'All Year', safety: '9.5/10' }
  },
  {
    id: 'gardens',
    name: 'GARDENS',
    emoji: '🌸',
    accentColor: '#F43F5E',
    glowColor: 'rgba(244, 63, 94, 0.5)',
    tagline: 'Scented blooms & royal historic courtyards',
    bgImage: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1600&q=80',
    destinations: [
      { name: 'Shalimar Mughal Gardens', temp: '24°C', rating: '4.9', visitors: '780K' },
      { name: 'Keukenhof Tulip Haven', temp: '17°C', rating: '4.94', visitors: '1.8M' }
    ],
    stats: { biodiversity: 'Botanical Flora', avgTemp: '22°C', bestMonths: 'Mar – Jul', safety: '9.8/10' }
  },
  {
    id: 'river',
    name: 'RIVER',
    emoji: '🌊',
    accentColor: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.5)',
    tagline: 'Sacred currents, ghats & tranquil waterways',
    bgImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
    destinations: [
      { name: 'Ganges at Rishikesh', temp: '25°C', rating: '4.91', visitors: '1.9M' },
      { name: 'Kerala Backwaters', temp: '29°C', rating: '4.88', visitors: '1.6M' }
    ],
    stats: { biodiversity: 'Riparian Ecosystem', avgTemp: '26°C', bestMonths: 'Sep – Apr', safety: '9.3/10' }
  }
];
