# TravelTales 🧭✨
> **Immersive Animated Travel Discovery Website**  
> *"Where every destination breathes."*

TravelTales is an editorial, animated travel-discovery platform designed exclusively for desktop and laptop displays. It pairs high-definition photography with fluid glassmorphism, interactive map overlays, financial analytics, and an animated AI mascot companion to transform destination exploration across India and the globe.

---

## 🎨 1. Front Page Architecture (Hand-Drawn Blueprint)

The front page is structured around a 6-column panoramic biosphere layout:

| Column | Biosphere | Visual Focus & Atmosphere |
|:---:|:---:|:---|
| **Col 1** | **Desert** | Razor-sharp wind-sculpted golden sand dunes under warm sun |
| **Col 2** | **Beach** | Turquoise ocean waters, powdered sand, and coastal horizons |
| **Col 3** | **Mountain** | Snow-dusted alpine summits and misty pine ridges |
| **Col 4** | **Forest** | Lush evergreen canopies and sunlit woodland trails |
| **Col 5** | **Gardens** | Vibrant botanical blooms, terraced pavilions, and floral serenity |
| **Col 6** | **River** | Tranquil winding waters, sacred stone ghats, and riverboats |

---

## 🚀 2. Core Interactive Features

### 🔍 Floating Glass Search Overlay (Center)
* Centered horizontally across the **Mountain & Forest** columns.
* Minimalist glassmorphic search input with instant feedback.
* **Strict Location Validation**: Only verified cities, towns, states, or regions of India are accepted.
* Searching non-location queries (e.g. `food`, `test`, `cars`, `hello`) immediately presents:
  > `⚠️ Please search valid location.`
  without redirecting away or defaulting to dummy fallbacks.

### 🗺️ Floatable GPS Satellite Map (Bottom-Left)
* Embedded real **Google Satellite / Roadmap GPS iframe** focused on the Indian subcontinent.
* **Fully Draggable**: Grab the header handle to float the map anywhere across the screen.
* Mode switcher: Quick toggle between **Roadmap** and **Satellite** views.
* Fixed aspect ratio with distraction-free controls.

### 📈 Financial Budget & Commute Matrix (Bottom-Center)
* Ultra-transparent glassmorphic stock-chart interface.
* **Financial Trajectory**: Interactive SVG area and candlestick charts forecasting daily charges, mid-tier, and luxury travel budgets.
* **Commute Matrix Engine**: Automatically calculates travel duration, estimated fuel/ticket cost, and comfort score comparing:
  * 🚙 **SUV / Private Commute**
  * 🚆 **Express Train / Vande Bharat**
  * ✈️ **Direct Flight**

### 🎒 Animated Duffel Bag Mascot & AI Travel Chatbot (Bottom-Right)
* Positioned in Column 6 with gentle idle breathing, bouncy animations, and expressive eyes.
* **Interactive AI Assistant**: Clicking the mascot opens the **AI Travel Companion Modal** (`MascotChatbotModal`).
* Converse naturally to plan vacations, explore hidden gems, or instantly navigate to any destination across India.

### 🏛️ Destination Detail View & AI Itinerary Builder
* **Split-View Canvas**: Hero photography, live weather widget, safety index, coordinates, and local storyboards.
* **AI Itinerary Generator**: One-click 3-column day-by-day scheduler breaking trips down into Morning, Afternoon, and Evening activities.

---

## 📍 3. Comprehensive Indian Destination Directory (40+ Locations)

Every city, town, and state is mapped with verified high-resolution photography, cultural specialties, and GPS coordinates:

| Location | State / Region | Signature Highlights & Specialties |
|---|---|---|
| **Delhi** | Delhi (NCT) | Red Fort, Chandni Chowk Food Trail, Qutub Minar, India Gate |
| **Mumbai** | Maharashtra | Gateway of India, Marine Drive Queen’s Necklace, Vada Pav |
| **Agra** | Uttar Pradesh | The Taj Mahal sunrise, Agra Fort, authentic Agra Petha sweets |
| **Jaipur** | Rajasthan | Hawa Mahal, Amber Fort Sheesh Mahal, Johari Bazaar gems |
| **Varanasi** | Uttar Pradesh | Dashashwamedh Ghat Evening Aarti, Kashi Vishwanath, rowing boats |
| **Amritsar** | Punjab | Harmandir Sahib (Golden Temple), 24/7 Mega Langar, Wagah Border |
| **Udaipur** | Rajasthan | Venice of the East, Lake Pichola boat cruises, City Palace |
| **Bengaluru** | Karnataka | Lalbagh Botanical Gardens Glasshouse, Cubbon Park |
| **Kolkata** | West Bengal | Victoria Memorial marble citadel, Howrah Bridge, Rosogolla |
| **Chennai** | Tamil Nadu | Marina Beach, Kapaleeshwarar Temple gopurams, Filter Coffee |
| **Hyderabad** | Telangana | Charminar 16th-century minarets, Golconda Fort, Dum Biryani |
| **Goa** | Goa | Palolem & Vagator golden beaches, Old Goa Portuguese churches |
| **Ooty** | Tamil Nadu | Nilgiri Mountain UNESCO Toy Train, Tea Plantations, Doddabetta |
| **Darjeeling** | West Bengal | Tiger Hill Kanchenjunga sunrise, Himalayan Mountaineering Inst. |
| **Kochi** | Kerala | Cantilevered Chinese Fishing Nets, Fort Kochi colonial alleys |
| **Pune** | Maharashtra | Historic Shaniwar Wada Peshwa Fortress, Sinhagad Fort, Misal Pav |
| **Ahmedabad** | Gujarat | Sabarmati Ashram, Adalaj Stepwell, UNESCO Pols |
| **Manali** | Himachal Pradesh | Rohtang Pass, Solang Valley, Atal Tunnel snow vistas |
| **Shimla** | Himachal Pradesh | The Ridge, Neo-Gothic Christ Church, Kalka-Shimla Toy Train |
| **Rishikesh** | Uttarakhand | Lakshman Jhula, Ganges white water rafting, Triveni Ghat Aarti |
| **Aligarh** | Uttar Pradesh | Aligarh Muslim University (AMU), handmade brass locks, Aligarh Fort |
| **Kasganj** | Uttar Pradesh | Sacred Soron Shukarkshetra on holy Ganga, Varaha Temple, Patpariya |
| **Kanpur** | Uttar Pradesh | Historic Bithoor on Ganga, leather saddlery, Thaggu Ke Laddu |
| **Lucknow** | Uttar Pradesh | Bara Imambara & Bhool Bhulaiya, Rumi Darwaza, Tunday Kababi |
| **Mirzapur** | Uttar Pradesh | Maa Vindhyavasini Devi Shaktipeeth, Chunar Fort, handwoven carpets |
| **Lokhandwala** | Maharashtra (Mumbai) | Celebrity designer boutiques, cafes, Versova beach, Bollywood lifestyle |
| **Ajmer** | Rajasthan | Sacred Ajmer Sharif Dargah, Ana Sagar Lake marble pavilions, Pushkar |
| **Srinagar / Shrinagar** | Jammu & Kashmir | Dal Lake Shikaras, floating lotus markets, Shalimar Mughal gardens |
| **Patna** | Bihar | Historic Pataliputra, Takht Sri Patna Sahib, Golghar, Litti Chokha |
| **Pathankot / Pathankoth** | Punjab | 5500-year-old Mukteshwar cave temples on Ravi river, Shahpurkandi Fort |
| **Punjab** | Punjab | Land of Five Rivers, Virasat-e-Khalsa, blooming golden mustard fields |
| **Haryana / Haaryana** | Haryana | Sacred Kurukshetra Brahma Sarovar, Pinjore Gardens, Sultanpur Bird Sanctuary |
| **Orchha / Orccha** | Madhya Pradesh | Medieval Bundela fort, Jahangir Mahal, Ram Raja Temple, riverside Chhatris |
| **Bhopal** | Madhya Pradesh | City of Lakes, Upper Lake (Bada Talab), UNESCO Sanchi Stupa, Bhimbetka |
| **Manipur** | Manipur | Loktak Lake floating islands (*phumdis*), Keibul Lamjao, dancing Sangai deer |
| **Meghalaya** | Meghalaya | Living Root Bridges, crystal-clear Dawki Umngot river, Nohkalikai Falls |
| **Vrindavan** | Uttar Pradesh | Prem Mandir white marble illuminated complex, Banke Bihari, Mawa Peda |
| **Mathura** | Uttar Pradesh | Shri Krishna Janmabhoomi Temple, Dwarkadhish & Yamuna Ghats |
| **Jhansi** | Uttar Pradesh | Historic Jhansi Fort (Rani Laxmibai seat) & Rani Mahal |
| **Assam** | Assam | Kaziranga UNESCO One-Horned Rhino Safari, Brahmaputra river |
| **Sikkim** | Sikkim | Kanchenjunga panoramic summits, Tsomgo Lake, Nathu La pass |
| **Leh & Ladakh** | Ladakh | Sapphire Pangong Tso Lake, Nubra Valley sand dunes, Khardung La |

---

## 🛠️ 4. Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS, Backdrop Filter Glassmorphism, CSS Keyframe Animations
- **Maps**: Interactive Google Maps Satellite & Roadmap Embed
- **Charts**: Custom SVG Vector Area & Candlestick Financial Engines

---

## 💻 5. Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation & Local Run
```bash
# Clone the repository
git clone https://github.com/dakshh0501/Hackathon.git

# Navigate into the frontend directory
cd Hackathon/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to experience TravelTales.

### Production Build
```bash
npm run build
```
Build output will be bundled cleanly into `frontend/dist/`.

---

## 📜 6. License
Created for Hackathon 2026. All rights reserved.