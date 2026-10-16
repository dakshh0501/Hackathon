export interface DiscoveryCategoryItem {
  id: string;
  title: string;
  category: 'places_to_explore' | 'local_culture' | 'traditional_products' | 'food_and_cuisine' | 'scenic_highlights';
  description: string;
  imageUrl: string;
  tags?: string[];
  meta?: {
    avgVisitMinutes?: number;
    priceINR?: number;
    bestTime?: string;
  };
  dataStatus: 'sample' | 'verified';
  source?: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  category: string;
  aspectRatio: 'landscape' | 'portrait' | 'wide';
}

export interface DestinationDiscovery {
  id: string;
  slug: string;
  name: string;
  state: string;
  type: 'state' | 'ut' | 'city';
  tagline: string;
  description: string;
  heroImage: string;
  bestMonths: string[];
  dataDepth: 'basic' | 'standard' | 'deep';
  dataStatus: 'sample' | 'verified';
  lastVerifiedAt: string;
  parallaxLayers: {
    sky: string;
    mountains: string;
    scenery: string;
  };
  gallery: GalleryPhoto[];
  categories: {
    places_to_explore: DiscoveryCategoryItem[];
    local_culture: DiscoveryCategoryItem[];
    traditional_products: DiscoveryCategoryItem[];
    food_and_cuisine: DiscoveryCategoryItem[];
    scenic_highlights: DiscoveryCategoryItem[];
  };
}

export const DESTINATIONS_DATA: DestinationDiscovery[] = [
  {
    id: 'dst_jk',
    slug: 'jammu-and-kashmir',
    name: 'Jammu and Kashmir',
    state: 'Jammu & Kashmir',
    type: 'state',
    tagline: 'Paradise on Earth — alpine meadows, tranquil lakes, and timeless crafts',
    description: 'Surrounded by the Pir Panjal and Himalayan ranges, Jammu & Kashmir is world-renowned for its serene Dal Lake, snow-clad slopes of Gulmarg, exquisite handicraft traditions, and aromatic saffron-infused cuisine.',
    heroImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=80',
    bestMonths: ['April', 'May', 'June', 'September', 'October', 'December', 'January'],
    dataDepth: 'deep',
    dataStatus: 'verified',
    lastVerifiedAt: '2026-10-16',
    parallaxLayers: {
      sky: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
      mountains: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
      scenery: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=80',
    },
    gallery: [
      {
        id: 'jk_g1',
        url: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Shikara floating silently on serene Dal Lake at sunrise',
        category: 'Scenic',
        aspectRatio: 'wide',
      },
      {
        id: 'jk_g2',
        url: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80',
        caption: 'Master artisans weaving intricate Kashmiri Pashmina shawls',
        category: 'Handicrafts',
        aspectRatio: 'portrait',
      },
      {
        id: 'jk_g3',
        url: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1000&q=80',
        caption: 'Aromatic Kashmiri Rogan Josh served with saffron rice',
        category: 'Cuisine',
        aspectRatio: 'landscape',
      },
      {
        id: 'jk_g4',
        url: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1000&q=80',
        caption: 'Meadows of Gulmarg blanketed in fresh winter snow',
        category: 'Nature',
        aspectRatio: 'landscape',
      },
      {
        id: 'jk_g5',
        url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
        caption: 'Finely lacquered Kashmiri Papier-mâché artisanal crafts',
        category: 'Culture',
        aspectRatio: 'portrait',
      },
    ],
    categories: {
      places_to_explore: [
        {
          id: 'jk_pe_1',
          title: 'Dal Lake & Floating Gardens',
          category: 'places_to_explore',
          description: 'Glide on traditional cedar-wood Shikaras through the water maze of vibrant lotus gardens and houseboats.',
          imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
          meta: { avgVisitMinutes: 120, priceINR: 700 },
          dataStatus: 'verified',
        },
        {
          id: 'jk_pe_2',
          title: 'Gulmarg Gondola & Apharwat Peak',
          category: 'places_to_explore',
          description: 'One of the worlds highest operating cable cars, reaching an elevation of 3,979 meters into pristine snow fields.',
          imageUrl: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
          meta: { avgVisitMinutes: 240, priceINR: 1850 },
          dataStatus: 'verified',
        },
        {
          id: 'jk_pe_3',
          title: 'Mughal Gardens (Shalimar & Nishat Bagh)',
          category: 'places_to_explore',
          description: 'Terraced Persian-style pleasure gardens built by Emperor Jahangir with cascading fountains and chinar trees.',
          imageUrl: 'https://images.unsplash.com/photo-1579618218290-24a26f63a778?auto=format&fit=crop&w=800&q=80',
          meta: { avgVisitMinutes: 90, priceINR: 50 },
          dataStatus: 'verified',
        },
      ],
      local_culture: [
        {
          id: 'jk_lc_1',
          title: 'Shikara Life & Floating Vegetable Market',
          category: 'local_culture',
          description: 'Centuries-old dawn trading ritual on Dal Lake where vendors barter fresh greens from canoe to canoe.',
          imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
          dataStatus: 'verified',
        },
        {
          id: 'jk_lc_2',
          title: 'Sufiyana Kalam & Santoor Music',
          category: 'local_culture',
          description: 'Classical Sufi meditative music played on 100-stringed walnut-wood Santoors.',
          imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
          dataStatus: 'sample',
        },
      ],
      traditional_products: [
        {
          id: 'jk_tp_1',
          title: 'Authentic Kashmiri Pashmina Shawls',
          category: 'traditional_products',
          description: 'Hand-spun cashmere fleece from Changthangi mountain goats, woven on wooden handlooms with delicate Sozni needlework.',
          imageUrl: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80',
          tags: ['GI Tagged', 'Handcrafted', 'Luxury Textile'],
          dataStatus: 'verified',
        },
        {
          id: 'jk_tp_2',
          title: 'Papier-Mâché Decorative Art',
          category: 'traditional_products',
          description: 'Recycled paper pulp moulded and painted with gold leaf and miniature floral motifs dating back to the 14th century.',
          imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
          tags: ['Handcrafted', 'Souvenir'],
          dataStatus: 'verified',
        },
        {
          id: 'jk_tp_3',
          title: 'Carved Walnut Wood Furniture & Boxes',
          category: 'traditional_products',
          description: 'Intricately deep-carved indigenous walnut wood depicting dragon, vine, and lotus patterns.',
          imageUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
          dataStatus: 'verified',
        },
      ],
      food_and_cuisine: [
        {
          id: 'jk_fc_1',
          title: 'Traditional Kashmiri Wazwan Feast',
          category: 'food_and_cuisine',
          description: 'A grand multi-course royal feast prepared overnight by master chefs (Vastas), featuring Rogan Josh, Gushtaba, and Rista.',
          imageUrl: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80',
          dataStatus: 'verified',
        },
        {
          id: 'jk_fc_2',
          title: 'Kashmiri Kahwa Tea',
          category: 'food_and_cuisine',
          description: 'Golden green tea brewed with whole saffron strands, cardamom, cinnamon, and slivered almonds served in a brass samovar.',
          imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
          dataStatus: 'verified',
        },
      ],
      scenic_highlights: [
        {
          id: 'jk_sh_1',
          title: 'Betaab Valley & Lidder River, Pahalgam',
          category: 'scenic_highlights',
          description: 'Lush alpine valleys flanked by snow-covered deodar conifers and rushing turquoise glacial waters.',
          imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
          dataStatus: 'verified',
        },
      ],
    },
  },
  {
    id: 'dst_agra',
    slug: 'agra',
    name: 'Agra',
    state: 'Uttar Pradesh',
    type: 'city',
    tagline: 'Timeless Mughal Splendor & Epic Architecture on the Yamuna',
    description: 'Home to the immortal Taj Mahal, Agra captures the zenith of Mughal architectural grandeur, world-renowned Pietra Dura marble inlay work, and mouth-watering street sweets.',
    heroImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=80',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    dataDepth: 'deep',
    dataStatus: 'verified',
    lastVerifiedAt: '2026-10-16',
    parallaxLayers: {
      sky: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
      mountains: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80',
      scenery: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=80',
    },
    gallery: [
      {
        id: 'ag_g1',
        url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
        caption: 'The ivory marble Taj Mahal bathed in soft sunrise glow',
        category: 'Monument',
        aspectRatio: 'wide',
      },
      {
        id: 'ag_g2',
        url: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80',
        caption: 'Red sandstone ramparts of the grand Agra Fort',
        category: 'Heritage',
        aspectRatio: 'landscape',
      },
      {
        id: 'ag_g3',
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        caption: 'Parchin Kari: Delicate semi-precious stone inlay in Makrana marble',
        category: 'Crafts',
        aspectRatio: 'portrait',
      },
    ],
    categories: {
      places_to_explore: [
        {
          id: 'ag_pe_1',
          title: 'Taj Mahal (UNESCO World Heritage)',
          category: 'places_to_explore',
          description: 'The monumental symbol of love built by Emperor Shah Jahan in pure white Makrana marble with poetic symmetry.',
          imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
          meta: { avgVisitMinutes: 150, priceINR: 50 },
          dataStatus: 'verified',
        },
        {
          id: 'ag_pe_2',
          title: 'Agra Fort',
          category: 'places_to_explore',
          description: 'Sprawling 16th-century Mughal imperial palace citadel built of red sandstone overlooking the Yamuna River.',
          imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
          meta: { avgVisitMinutes: 120, priceINR: 50 },
          dataStatus: 'verified',
        },
      ],
      local_culture: [
        {
          id: 'ag_lc_1',
          title: 'Mughal Architectural Heritage & Pietra Dura',
          category: 'local_culture',
          description: 'Generations of master craftsmen preserving the Persian-influenced Parchin Kari lapidary tradition.',
          imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
          dataStatus: 'verified',
        },
      ],
      traditional_products: [
        {
          id: 'ag_tp_1',
          title: 'Parchin Kari (Marble Inlay Artifacts)',
          category: 'traditional_products',
          description: 'Tabletops, decorative boxes, and coasters inlaid with lapis lazuli, malachite, and mother-of-pearl.',
          imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
          dataStatus: 'verified',
        },
        {
          id: 'ag_tp_2',
          title: 'Famous Agra Petha Confectionery',
          category: 'traditional_products',
          description: 'Candied ash gourd sweet prepared in flavors of saffron (Kesar), Paan, Angoori, and chocolate.',
          imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
          dataStatus: 'verified',
        },
      ],
      food_and_cuisine: [
        {
          id: 'ag_fc_1',
          title: 'Agra Bedmi Poori & Nagori Halwa',
          category: 'food_and_cuisine',
          description: 'Crispy urad-dal-stuffed puris served with spicy fenugreek potato curry and sweet semolina halwa.',
          imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
          dataStatus: 'verified',
        },
      ],
      scenic_highlights: [
        {
          id: 'ag_sh_1',
          title: 'Mehtab Bagh (Moonlight Garden)',
          category: 'scenic_highlights',
          description: 'Charbagh garden complex on the opposite bank of Yamuna, providing the ultimate sunset panorama of Taj Mahal.',
          imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
          dataStatus: 'verified',
        },
      ],
    },
  },
  {
    id: 'dst_mathura',
    slug: 'mathura-vrindavan',
    name: 'Mathura & Vrindavan',
    state: 'Uttar Pradesh',
    type: 'city',
    tagline: 'Sacred Heart of Braj Bhoomi — Devotion, Yamuna Ghats & Festive Colors',
    description: 'The revered birthplace of Lord Krishna, Mathura-Vrindavan is celebrated for ancient temple clusters, serene Yamuna river ghats, joyous Braj Holi celebrations, and authentic dairy sweets.',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    dataDepth: 'deep',
    dataStatus: 'verified',
    lastVerifiedAt: '2026-10-16',
    parallaxLayers: {
      sky: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
      mountains: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80',
      scenery: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80',
    },
    gallery: [
      {
        id: 'mv_g1',
        url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
        caption: 'Illuminated evening grandeur of Prem Mandir in Vrindavan',
        category: 'Temple',
        aspectRatio: 'wide',
      },
      {
        id: 'mv_g2',
        url: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80',
        caption: 'Braj Holi color celebrations and spiritual fervor',
        category: 'Festival',
        aspectRatio: 'portrait',
      },
    ],
    categories: {
      places_to_explore: [
        {
          id: 'mv_pe_1',
          title: 'Banke Bihari Temple, Vrindavan',
          category: 'places_to_explore',
          description: 'One of the most sacred shrines of Radha Vallabh tradition with curtained darshan rituals.',
          imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
          meta: { avgVisitMinutes: 90, priceINR: 0 },
          dataStatus: 'verified',
        },
        {
          id: 'mv_pe_2',
          title: 'Prem Mandir',
          category: 'places_to_explore',
          description: 'Monumental Italian Carrara marble temple with intricate sculpted tableaux of Divine Leelas and musical fountain shows.',
          imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
          meta: { avgVisitMinutes: 120, priceINR: 0 },
          dataStatus: 'verified',
        },
      ],
      local_culture: [
        {
          id: 'mv_lc_1',
          title: 'Raas Leela Performance Art',
          category: 'local_culture',
          description: 'Classical devotional folk theatre portraying stories of Radha and Krishna through dance and Braj Bhasha poetry.',
          imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80',
          dataStatus: 'verified',
        },
      ],
      traditional_products: [
        {
          id: 'mv_tp_1',
          title: 'Mathura Ke Peda',
          category: 'traditional_products',
          description: 'Caramelized reduced-milk fudge flavoured with cardamom, ghee, and powdered sugar with GI status.',
          imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
          dataStatus: 'verified',
        },
        {
          id: 'mv_tp_2',
          title: 'Sanjhi Paper Stencil Art',
          category: 'traditional_products',
          description: 'Ancient ceremonial craft of cutting exquisite paper stencils used to create colored dry-powder rangolis on water or floor.',
          imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
          dataStatus: 'verified',
        },
      ],
      food_and_cuisine: [
        {
          id: 'mv_fc_1',
          title: 'Braj Kachori & Kulhad Malai Lassi',
          category: 'food_and_cuisine',
          description: 'Flaky hing-spiced kachoris paired with thick churned curd served in rustic clay earthen cups.',
          imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
          dataStatus: 'verified',
        },
      ],
      scenic_highlights: [
        {
          id: 'mv_sh_1',
          title: 'Vishram Ghat Evening Yamuna Aarti',
          category: 'scenic_highlights',
          description: 'Central sacred riverside steps where thousands of floating earthen oil lamps drift down the holy Yamuna at dusk.',
          imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
          dataStatus: 'verified',
        },
      ],
    },
  },
  {
    id: 'dst_jaipur',
    slug: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    type: 'city',
    tagline: 'The Pink City — Royal Forts, Vibrant Bazaars, and Regal Elegance',
    description: 'Capital of Rajasthan, known for terracotta-pink stone architecture, hilltop fortresses of Amer and Nahargarh, royal palaces, and traditional Blue Pottery handicrafts.',
    heroImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=80',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    dataDepth: 'deep',
    dataStatus: 'verified',
    lastVerifiedAt: '2026-10-16',
    parallaxLayers: {
      sky: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
      mountains: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=80',
      scenery: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=80',
    },
    gallery: [
      {
        id: 'jp_g1',
        url: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
        caption: 'The iconic 953-casement honeycomb facade of Hawa Mahal',
        category: 'Architecture',
        aspectRatio: 'portrait',
      },
      {
        id: 'jp_g2',
        url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80',
        caption: 'Amer Fort reflecting in the calm waters of Maota Lake',
        category: 'Fort',
        aspectRatio: 'landscape',
      },
    ],
    categories: {
      places_to_explore: [
        {
          id: 'jp_pe_1',
          title: 'Hawa Mahal (Palace of Winds)',
          category: 'places_to_explore',
          description: 'Five-story pink sandstone palace designed for royal women to observe street festivals without being seen.',
          imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80',
          meta: { avgVisitMinutes: 60, priceINR: 50 },
          dataStatus: 'verified',
        },
        {
          id: 'jp_pe_2',
          title: 'Amer Fort & Sheesh Mahal',
          category: 'places_to_explore',
          description: 'Hilltop fortress with opulent Hall of Mirrors (Sheesh Mahal), courtyards, and Rajput-Mughal architecture.',
          imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
          meta: { avgVisitMinutes: 180, priceINR: 100 },
          dataStatus: 'verified',
        },
      ],
      local_culture: [
        {
          id: 'jp_lc_1',
          title: 'Rajasthani Puppet Craft & Folk Dance',
          category: 'local_culture',
          description: 'Traditional string puppet theater (Kathputli) narrating warrior legends with dholak rhythms.',
          imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80',
          dataStatus: 'sample',
        },
      ],
      traditional_products: [
        {
          id: 'jp_tp_1',
          title: 'Jaipur Blue Pottery',
          category: 'traditional_products',
          description: 'Unique Egyptian-glazed ceramic craft made with quartz stone powder, Fuller’s earth, and natural cobalt oxide pigments.',
          imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
          tags: ['GI Tagged', 'Ceramic Art'],
          dataStatus: 'verified',
        },
        {
          id: 'jp_tp_2',
          title: 'Sanganeri Hand Block-Printed Textiles',
          category: 'traditional_products',
          description: 'Pure cotton quilts and fabrics hand-stamped with teak wood blocks and vegetable dyes.',
          imageUrl: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80',
          dataStatus: 'verified',
        },
      ],
      food_and_cuisine: [
        {
          id: 'jp_fc_1',
          title: 'Dal Baati Churma & Ghewar Sweet',
          category: 'food_and_cuisine',
          description: 'Baked wheat balls drenched in pure desi ghee, served with panchmel dal, spicy garlic chutney, and disc-shaped Ghewar.',
          imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
          dataStatus: 'verified',
        },
      ],
      scenic_highlights: [
        {
          id: 'jp_sh_1',
          title: 'Jal Mahal (Water Palace)',
          category: 'scenic_highlights',
          description: 'A serene red sandstone palace situated in the center of the Man Sagar Lake.',
          imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80',
          dataStatus: 'verified',
        },
      ],
    },
  },
  {
    id: 'dst_rishikesh',
    slug: 'rishikesh',
    name: 'Rishikesh',
    state: 'Uttarakhand',
    type: 'city',
    tagline: 'Yoga Capital of the World & Gateway to the Garhwal Himalayas',
    description: 'Set on the banks of the sacred Ganges River where the plains meet Himalayan foothills, renowned for river rafting, meditation ashrams, and magical evening aartis.',
    heroImage: 'https://images.unsplash.com/photo-1600100397608-f010f443b740?auto=format&fit=crop&w=1600&q=80',
    bestMonths: ['September', 'October', 'November', 'March', 'April', 'May'],
    dataDepth: 'deep',
    dataStatus: 'verified',
    lastVerifiedAt: '2026-10-16',
    parallaxLayers: {
      sky: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
      mountains: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
      scenery: 'https://images.unsplash.com/photo-1600100397608-f010f443b740?auto=format&fit=crop&w=1600&q=80',
    },
    gallery: [
      {
        id: 'rk_g1',
        url: 'https://images.unsplash.com/photo-1600100397608-f010f443b740?auto=format&fit=crop&w=1200&q=80',
        caption: 'Suspension bridge swaying over emerald green Ganga river waters',
        category: 'River',
        aspectRatio: 'wide',
      },
      {
        id: 'rk_g2',
        url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
        caption: 'Sunrise meditation and yoga practice beside the flowing Ganges',
        category: 'Yoga',
        aspectRatio: 'portrait',
      },
    ],
    categories: {
      places_to_explore: [
        {
          id: 'rk_pe_1',
          title: 'Triveni Ghat Evening Ganga Aarti',
          category: 'places_to_explore',
          description: 'Sacred confluence where priests chant ancient mantras and rotate multi-tiered flaming brass lamps over the river.',
          imageUrl: 'https://images.unsplash.com/photo-1600100397608-f010f443b740?auto=format&fit=crop&w=800&q=80',
          meta: { avgVisitMinutes: 90, priceINR: 0 },
          dataStatus: 'verified',
        },
        {
          id: 'rk_pe_2',
          title: 'The Beatles Ashram (Chaurasi Kutia)',
          category: 'places_to_explore',
          description: 'Forest retreat where The Beatles studied transcendental meditation in 1968, now adorned with vibrant murals.',
          imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
          meta: { avgVisitMinutes: 120, priceINR: 150 },
          dataStatus: 'verified',
        },
      ],
      local_culture: [
        {
          id: 'rk_lc_1',
          title: 'Vedic Chanting & Ayurvedic Healing',
          category: 'local_culture',
          description: 'Living spiritual discipline centered around traditional yoga, pranayama, and herbal therapies.',
          imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
          dataStatus: 'verified',
        },
      ],
      traditional_products: [
        {
          id: 'rk_tp_1',
          title: 'Authentic Rudraksha Beads & Japa Malas',
          category: 'traditional_products',
          description: 'Certified Himalayan Rudraksha seeds hand-knotted with silk thread for meditation.',
          imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
          dataStatus: 'verified',
        },
      ],
      food_and_cuisine: [
        {
          id: 'rk_fc_1',
          title: 'Sattvic Ayurvedic Thali & Masala Chai',
          category: 'food_and_cuisine',
          description: 'Nourishing, vegetarian organic meals prepared with fresh mountain herbs, lentils, and hand-rolled chapatis.',
          imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
          dataStatus: 'verified',
        },
      ],
      scenic_highlights: [
        {
          id: 'rk_sh_1',
          title: 'White Water Rafting through Ganga Gorges',
          category: 'scenic_highlights',
          description: 'Navigating Class III and IV rapids past sandy river beaches and verdant cliff faces.',
          imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
          dataStatus: 'verified',
        },
      ],
    },
  },
];
