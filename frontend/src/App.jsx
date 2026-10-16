import React, { useState } from 'react';
import { SKETCH_BIOMES } from './data/sketchBiomes';
import SketchMascot from './components/SketchMascot';
import SearchOverlay from './components/SearchOverlay';
import SketchMapOverlay from './components/SketchMapOverlay';
import AnalysisChartBox from './components/AnalysisChartBox';
import DestinationDetailView from './components/DestinationDetailView';
import ItineraryBuilderScreen from './components/ItineraryBuilderScreen';
import AIAssistantPanel from './components/AIAssistantPanel';
import { Compass, Sparkles, MessageSquare, ArrowLeft } from 'lucide-react';

export default function App() {
  // Currently highlighted or active biome (default: Mountain, col 3)
  const [activeBiomeId, setActiveBiomeId] = useState('mountain');
  const [hoveredBiomeId, setHoveredBiomeId] = useState(null);

  // Detail View and Itinerary Navigation
  const [viewMode, setViewMode] = useState('MAIN_PAGE'); // 'MAIN_PAGE' | 'DESTINATION_DETAIL' | 'ITINERARY'
  const [selectedDestination, setSelectedDestination] = useState(null);

  // Overlays
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  // Active biome object
  const activeBiome = SKETCH_BIOMES.find(b => b.id === (hoveredBiomeId || activeBiomeId)) || SKETCH_BIOMES[2];

  // Search handler: match biome or open destination
  const handleSearch = (query) => {
    const q = query.trim().toLowerCase();
    const matchedBiome = SKETCH_BIOMES.find(b => 
      b.name.toLowerCase().includes(q) || 
      b.id.toLowerCase().includes(q) ||
      b.destinations.some(d => d.name.toLowerCase().includes(q))
    );

    if (matchedBiome) {
      setActiveBiomeId(matchedBiome.id);
      setSelectedDestination({
        id: matchedBiome.id,
        name: matchedBiome.destinations[0]?.name || matchedBiome.name,
        country: 'Natural Biosphere',
        flag: matchedBiome.emoji,
        image: matchedBiome.bgImage,
        coordinates: { lat: 27.5, lng: 77.2 },
        rating: 4.95,
        reviewsCount: 1840,
        description: matchedBiome.tagline,
        story: `${matchedBiome.name} sanctuary with pristine ecosystems and seasonal weather windows.`,
        weather: { temp: 28, condition: 'Clear', humidity: '45%', uv: '8.0' },
        safetyIndex: 9.5,
        dailyBudget: { budget: 2200, mid: 5400, luxury: 14000 },
        experiences: ['Eco Guided Walk', 'Panoramic Vantage View', 'Wildlife & Flora Observation']
      });
      setViewMode('DESTINATION_DETAIL');
    }
  };

  // Click on mascot action
  const handleMascotClick = () => {
    setIsAIChatOpen(true);
  };

  // Click directly on a column
  const handleColumnClick = (biome) => {
    setActiveBiomeId(biome.id);
    setSelectedDestination({
      id: biome.id,
      name: biome.destinations[0]?.name || biome.name,
      country: 'Natural Biosphere',
      flag: biome.emoji,
      image: biome.bgImage,
      coordinates: { lat: 26.9, lng: 75.8 },
      rating: 4.92,
      reviewsCount: 1420,
      description: biome.tagline,
      story: `Immerse in the beauty of ${biome.name} with curated seasonal trails and wildlife watching.`,
      weather: { temp: 26, condition: 'Balmy Air', humidity: '40%', uv: '7.5' },
      safetyIndex: 9.4,
      dailyBudget: { budget: 2000, mid: 4800, luxury: 12500 },
      experiences: ['Local Hidden Pathway', 'Dawn Horizon Watch', 'Sunset Tea in Wilderness']
    });
    setViewMode('DESTINATION_DETAIL');
  };

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: '#040608',
      color: '#FFFFFF',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      {/* ========================================================
          PAGE 1: MAIN/FRONT PAGE MATCHING SKETCH BLUEPRINT
          ======================================================== */}
      {viewMode === 'MAIN_PAGE' && (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          
          {/* Top Brand Header Bar */}
          <header style={{
            position: 'absolute',
            top: '16px',
            left: '20px',
            right: '20px',
            zIndex: 70,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pointerEvents: 'none'
          }}>
            <div style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 16px',
              borderRadius: '9999px',
              background: 'rgba(8, 14, 24, 0.75)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.14)'
            }}>
              <Compass size={18} color="var(--accent-primary)" />
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '16px', letterSpacing: '0.04em' }}>
                TERRA
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                * These are in background
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px', pointerEvents: 'auto' }}>
              <button
                onClick={() => setIsAIChatOpen(!isAIChatOpen)}
                className="glass-interactive"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 16px',
                  fontSize: '12px',
                  fontWeight: 700
                }}
              >
                <Sparkles size={14} color="#FBBF24" />
                <span>AI Companion</span>
              </button>
            </div>
          </header>

          {/* 6 BACKGROUND VERTICAL COLUMNS:
              DESERT | BEACH | MOUNTAIN | FOREST | GARDENS | RIVER
              (With thin vertical dividing lines) */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            zIndex: 10
          }}>
            {SKETCH_BIOMES.map((biome, colIdx) => {
              const isHovered = hoveredBiomeId === biome.id;
              const isSelected = activeBiomeId === biome.id;

              return (
                <div
                  key={biome.id}
                  onClick={() => handleColumnClick(biome)}
                  onMouseEnter={() => setHoveredBiomeId(biome.id)}
                  onMouseLeave={() => setHoveredBiomeId(null)}
                  style={{
                    position: 'relative',
                    height: '100%',
                    borderRight: colIdx < 5 ? '1px solid rgba(255, 255, 255, 0.22)' : 'none',
                    borderLeft: colIdx === 0 ? '1px solid rgba(255, 255, 255, 0.22)' : 'none',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  {/* High-Resolution Scenic Background Image */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${biome.bgImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: isHovered || isSelected ? 'brightness(0.7) contrast(1.1)' : 'brightness(0.38) contrast(1.0)',
                      transform: isHovered ? 'scale(1.05)' : 'scale(1.0)',
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />

                  {/* Dark gradient overlay for text readability */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(180deg, rgba(4,6,8,0.75) 0%, rgba(4,6,8,0.15) 30%, rgba(4,6,8,0.2) 70%, rgba(4,6,8,0.85) 100%)`
                  }} />

                  {/* Active column ambient bottom glow */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '160px',
                    background: `linear-gradient(to top, ${biome.glowColor} 0%, transparent 100%)`,
                    opacity: isHovered || isSelected ? 0.7 : 0.2,
                    transition: 'opacity 0.4s ease'
                  }} />

                  {/* VERTICAL LETTER-BY-LETTER HEADING (Exact sketch styling):
                      D
                      E
                      S
                      E
                      R
                      T
                  */}
                  <div style={{
                    position: 'absolute',
                    top: '70px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    zIndex: 20
                  }}>
                    {biome.name.split('').map((letter, lIdx) => (
                      <span
                        key={lIdx}
                        style={{
                          fontFamily: 'Syne, sans-serif',
                          fontSize: 'clamp(20px, 2.2vw, 32px)',
                          fontWeight: 800,
                          lineHeight: 1.05,
                          color: isHovered || isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)',
                          textShadow: isHovered || isSelected ? `0 0 20px ${biome.accentColor}, 0 2px 8px rgba(0,0,0,0.8)` : '0 2px 6px rgba(0,0,0,0.9)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {letter}
                      </span>
                    ))}

                    <span style={{
                      fontSize: '16px',
                      marginTop: '6px',
                      opacity: isHovered || isSelected ? 1 : 0.6
                    }}>
                      {biome.emoji}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ====================================================
              SKETCH ELEMENT 1: CENTER "Search over layer"
              Placed horizontally across Mountain & Forest (Cols 3 & 4)
              ==================================================== */}
          <SearchOverlay
            activeBiome={activeBiome}
            onSearch={handleSearch}
          />

          {/* ====================================================
              SKETCH ELEMENT 2: BOTTOM-LEFT "Map Over lay"
              Placed in bottom-left covering Desert & Beach (Cols 1 & 2)
              ==================================================== */}
          <SketchMapOverlay
            activeBiome={activeBiome}
            isExpanded={isMapExpanded}
            onToggleExpand={() => setIsMapExpanded(!isMapExpanded)}
          />

          {/* ====================================================
              SKETCH ELEMENT 3: BOTTOM-CENTER "Analysis Chart or box"
              Placed across Mountain & Forest (Cols 3 & 4)
              ==================================================== */}
          <AnalysisChartBox
            activeBiome={activeBiome}
            onSelectBiome={(id) => setActiveBiomeId(id)}
          />

          {/* ====================================================
              SKETCH ELEMENT 4: BOTTOM-RIGHT ANIMATED MASCOT BACKPACK
              Placed in Column 6 (River bottom-right) with smiling face
              ==================================================== */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            right: '24px',
            zIndex: 60,
            pointerEvents: 'auto'
          }}>
            <SketchMascot onClick={handleMascotClick} />
          </div>
        </div>
      )}

      {/* ========================================================
          VIEW MODE 2: DESTINATION DETAIL SCREEN
          ======================================================== */}
      {viewMode === 'DESTINATION_DETAIL' && selectedDestination && (
        <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
          <DestinationDetailView
            destination={selectedDestination}
            biome={activeBiome}
            onBack={() => setViewMode('MAIN_PAGE')}
            onPlanItinerary={() => setViewMode('ITINERARY')}
          />
        </div>
      )}

      {/* ========================================================
          VIEW MODE 3: THREE-COLUMN ITINERARY PLANNER SCREEN
          ======================================================== */}
      {viewMode === 'ITINERARY' && selectedDestination && (
        <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
          <ItineraryBuilderScreen
            destination={selectedDestination}
            biome={activeBiome}
            onBack={() => setViewMode('DESTINATION_DETAIL')}
          />
        </div>
      )}

      {/* Floating Gemini AI Travel Companion Panel */}
      <AIAssistantPanel
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        activeDestination={selectedDestination || { name: activeBiome.name }}
        biome={activeBiome}
      />
    </div>
  );
}
