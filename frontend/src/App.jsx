import React, { useState, useEffect, useRef } from 'react';
import { BIOMES, findDestinationByQuery } from './data/terraBiomes';
import LiveMapCorner from './components/LiveMapCorner';
import AddPlaceModal from './components/AddPlaceModal';
import DestinationDetailView from './components/DestinationDetailView';
import ItineraryBuilderScreen from './components/ItineraryBuilderScreen';
import AIAssistantPanel from './components/AIAssistantPanel';
import { 
  Search, Mic, Camera, Compass, Plus, Sparkles, MessageSquare, 
  MapPin, ArrowRight, Layers, Volume2, Info, ChevronDown 
} from 'lucide-react';

export default function App() {
  // Biome slide vertical index (0 to 9)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);

  // Search Bar State
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState(null);

  // Zoom Portal State
  const [isZoomingPortal, setIsZoomingPortal] = useState(false);
  const [activeDestination, setActiveDestination] = useState(null);

  // Screen View Mode: 'HERO_SLIDES' | 'DESTINATION_DETAIL' | 'ITINERARY'
  const [viewMode, setViewMode] = useState('HERO_SLIDES');

  // Modals & Panels
  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  // Current Biome Object
  const currentBiome = BIOMES[currentSlideIndex] || BIOMES[0];

  // Auto-scroll loop engine (1.2s transition, 4.5s rest)
  useEffect(() => {
    if (isAutoScrollPaused || viewMode !== 'HERO_SLIDES' || isZoomingPortal) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % BIOMES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isAutoScrollPaused, viewMode, isZoomingPortal]);

  // Handle manual scroll wheel over slides
  const handleWheel = (e) => {
    if (viewMode !== 'HERO_SLIDES') return;
    if (e.deltaY > 50) {
      setCurrentSlideIndex((prev) => (prev + 1) % BIOMES.length);
    } else if (e.deltaY < -50) {
      setCurrentSlideIndex((prev) => (prev - 1 + BIOMES.length) % BIOMES.length);
    }
  };

  // The Signature Biosphere Zoom-to-Result Mechanic (Section 4.2)
  const executeZoomToResult = (dest, matchedBiome) => {
    const targetBiomeIndex = BIOMES.findIndex(b => b.id === matchedBiome.id);
    if (targetBiomeIndex !== -1) {
      setCurrentSlideIndex(targetBiomeIndex);
    }

    // Phase 1 to 4: Highlight, pulse, zoom portal (1.2s)
    setIsZoomingPortal(true);

    setTimeout(() => {
      setActiveDestination(dest);
      setIsZoomingPortal(false);
      setViewMode('DESTINATION_DETAIL');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  // Search submission
  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (!searchQuery.trim()) return;

    const match = findDestinationByQuery(searchQuery);
    if (match) {
      setSearchError(null);
      setIsSearchFocused(false);
      executeZoomToResult(match.destination, match.biome);
    } else {
      setSearchError(`No biosphere found for "${searchQuery}". Try "Desert", "Rajasthan", "Himalayas", "Maldives", or "Serengeti".`);
      setTimeout(() => setSearchError(null), 4000);
    }
  };

  // Add place success callback
  const handlePlaceAdded = (newPlace, biomeId) => {
    const matchedBiome = BIOMES.find(b => b.id === biomeId) || BIOMES[0];
    matchedBiome.featuredDestinations.unshift(newPlace);
    matchedBiome.destinationCount += 1;
    executeZoomToResult(newPlace, matchedBiome);
  };

  return (
    <div
      onWheel={handleWheel}
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: 'var(--color-void)',
        overflowX: 'hidden'
      }}
    >
      {/* 1. SECTION A5: Trending Destinations Live Ticker Bar (Top 36px) */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '36px',
        backgroundColor: 'rgba(4, 6, 8, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '0 16px',
          backgroundColor: 'rgba(56, 189, 248, 0.15)',
          color: 'var(--accent-primary)',
          fontSize: '11px',
          fontWeight: 800,
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.08em',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          zIndex: 2,
          borderRight: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <Sparkles size={13} />
          <span>TRENDING BIOSPHERES</span>
        </div>

        <div className="ticker-track">
          {[
            { name: 'Thar Desert (Rajasthan)', trend: '+34%', biome: 'Desert' },
            { name: 'Baa Atoll (Maldives)', trend: '+42%', biome: 'Ocean' },
            { name: 'Leh & Zanskar (Himalayas)', trend: '+28%', biome: 'Mountain' },
            { name: 'Serengeti Migration (Tanzania)', trend: '+55%', biome: 'Grassland' },
            { name: 'Monteverde Cloud Forest (Costa Rica)', trend: '+19%', biome: 'Rainforest' },
            { name: 'Tromsø Northern Lights (Norway)', trend: '+63%', biome: 'Tundra' },
            { name: 'Perito Moreno Glacier (Argentina)', trend: '+31%', biome: 'Glacier' },
            { name: 'Fagradalsfjall Volcano (Iceland)', trend: '+49%', biome: 'Volcanic' }
          ].concat([
            { name: 'Thar Desert (Rajasthan)', trend: '+34%', biome: 'Desert' },
            { name: 'Baa Atoll (Maldives)', trend: '+42%', biome: 'Ocean' },
            { name: 'Leh & Zanskar (Himalayas)', trend: '+28%', biome: 'Mountain' },
            { name: 'Serengeti Migration (Tanzania)', trend: '+55%', biome: 'Grassland' }
          ]).map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                const match = findDestinationByQuery(item.name);
                if (match) executeZoomToResult(match.destination, match.biome);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0 24px',
                fontSize: '12px',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{item.name}</span>
              <span style={{ color: '#34D399', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>{item.trend}</span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Top Header Navigation (TERRA Logo + Add Place + AI Assistant) */}
      <div style={{
        position: 'fixed',
        top: '46px',
        left: '24px',
        right: '24px',
        zIndex: 90,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        pointerEvents: 'none'
      }}>
        {/* Brand Logo */}
        <div
          onClick={() => {
            setViewMode('HERO_SLIDES');
            setActiveDestination(null);
          }}
          style={{
            pointerEvents: 'auto',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 18px',
            borderRadius: 'var(--radius-pill)',
            backgroundColor: 'rgba(8, 12, 20, 0.7)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
          }}
        >
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: currentBiome.accentColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF'
          }}>
            <Compass size={16} />
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '0.04em'
            }}>
              TERRA
            </span>
            <span style={{
              fontSize: '10px',
              color: 'var(--text-muted)',
              marginLeft: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              Where every destination breathes
            </span>
          </div>
        </div>

        {/* Right Action Controls: Add Place & AI Chat Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', pointerEvents: 'auto' }}>
          <button
            onClick={() => setIsAddPlaceOpen(true)}
            className="glass-interactive"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              fontSize: '12px',
              fontWeight: 700
            }}
          >
            <Plus size={15} color="var(--accent-primary)" />
            <span>Add Place</span>
          </button>

          <button
            onClick={() => setIsAIChatOpen(!isAIChatOpen)}
            className="glass-interactive"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              fontSize: '12px',
              fontWeight: 700,
              backgroundColor: isAIChatOpen ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.14)'
            }}
          >
            <Sparkles size={14} color="#FBBF24" />
            <span>AI Companion</span>
          </button>
        </div>
      </div>

      {/* 3. Section 4.1: Floating Center-Top Glass Search Bar */}
      <div style={{
        position: 'fixed',
        top: '46px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 95,
        width: isSearchFocused ? 'min(720px, 90vw)' : '340px',
        transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <form onSubmit={handleSearchSubmit}>
          <div
            style={{
              height: isSearchFocused ? '56px' : '48px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: isSearchFocused ? 'rgba(10, 18, 30, 0.85)' : 'rgba(0, 0, 0, 0.45)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: isSearchFocused ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(255, 255, 255, 0.16)',
              boxShadow: isSearchFocused ? '0 0 0 3px rgba(56, 189, 248, 0.15), 0 16px 40px rgba(0,0,0,0.6)' : '0 8px 32px rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 16px',
              gap: '10px',
              transition: 'all 0.3s ease'
            }}
          >
            <Search size={18} color={isSearchFocused ? '#38BDF8' : 'rgba(255,255,255,0.7)'} />
            <input
              type="text"
              placeholder={isSearchFocused ? "Search any destination (e.g. Rajasthan, Maldives, Himalayas)..." : "Search destination, biome, or experience…"}
              value={searchQuery}
              onFocus={() => {
                setIsSearchFocused(true);
                setIsAutoScrollPaused(true);
              }}
              onBlur={() => {
                setTimeout(() => setIsSearchFocused(false), 200);
                setIsAutoScrollPaused(false);
              }}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flexGrow: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#FFFFFF',
                fontSize: '14px',
                fontFamily: 'inherit'
              }}
            />
            {isSearchFocused && (
              <button
                type="submit"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: '#040608',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Go
              </button>
            )}
          </div>
        </form>

        {/* Live Search Error Toast */}
        {searchError && (
          <div style={{
            marginTop: '8px',
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(244, 63, 94, 0.85)',
            color: '#FFFFFF',
            fontSize: '12px',
            textAlign: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(12px)'
          }}>
            {searchError}
          </div>
        )}
      </div>

      {/* 4. Section 6: Live Translucent Radar Map Corner Widget */}
      <LiveMapCorner
        activeDestination={activeDestination || currentBiome.featuredDestinations[0]}
        isExpanded={isMapExpanded}
        onToggleExpand={() => setIsMapExpanded(!isMapExpanded)}
      />

      {/* ========================================================
          VIEW MODE 1: HERO BIOSPHERE VERTICAL SLIDE SYSTEM (100vh)
          ======================================================== */}
      {viewMode === 'HERO_SLIDES' && (
        <div
          onMouseEnter={() => setIsAutoScrollPaused(true)}
          onMouseLeave={() => setIsAutoScrollPaused(false)}
          style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
            overflow: 'hidden'
          }}
        >
          {/* Background Ambient High-Res Photo / Video Simulation */}
          <div
            className={isZoomingPortal ? 'portal-active' : ''}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${currentBiome.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.85) contrast(1.05)',
              transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />

          {/* Vignette & Biome Tint Atmosphere Layer */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at center, transparent 30%, rgba(4,6,8,0.7) 100%)`
          }} />

          {/* Atmospheric Particle Simulation Layer (Section 3.2) */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {[10, 25, 45, 60, 75, 90].map((left, idx) => (
              <div
                key={idx}
                className="particle-dot"
                style={{
                  left: `${left}%`,
                  top: `${30 + (idx % 4) * 15}%`,
                  width: `${idx % 2 === 0 ? 4 : 6}px`,
                  height: `${idx % 2 === 0 ? 4 : 6}px`,
                  backgroundColor: currentBiome.accentColor,
                  boxShadow: `0 0 10px ${currentBiome.accentColor}`
                }}
              />
            ))}
          </div>

          {/* Slide Content: Bottom-Left Glass Label Pill (Section 3.3) */}
          <div style={{
            position: 'absolute',
            bottom: '48px',
            left: '48px',
            zIndex: 30,
            maxWidth: '520px'
          }}>
            <div
              className="glass-panel"
              style={{
                padding: '24px 32px',
                borderLeft: `4px solid ${currentBiome.accentColor}`,
                boxShadow: `0 16px 48px rgba(0,0,0,0.6), 0 0 30px ${currentBiome.accentColor}33`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span style={{ fontSize: '24px' }}>{currentBiome.emoji}</span>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: currentBiome.accentColor,
                  fontFamily: 'var(--font-mono)'
                }}>
                  BIOSPHERE {currentSlideIndex + 1} OF 10
                </span>
              </div>

              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 3.8vw, 48px)',
                fontWeight: 800,
                color: '#FFFFFF',
                margin: '0 0 10px 0',
                lineHeight: 1.1
              }}>
                {currentBiome.name}
              </h2>

              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                {currentBiome.atmosphericEffect}
              </p>

              {/* Climate Tags */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                {currentBiome.climateTags.map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Explore Biosphere Button */}
              <button
                onClick={() => executeZoomToResult(currentBiome.featuredDestinations[0], currentBiome)}
                className="glass-interactive"
                style={{
                  padding: '12px 24px',
                  fontSize: '13px',
                  fontWeight: 800,
                  backgroundColor: currentBiome.accentColor,
                  color: '#FFFFFF',
                  border: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: `0 8px 24px ${currentBiome.accentColor}55`
                }}
              >
                <span>Enter {currentBiome.name} ({currentBiome.destinationCount} Sanctuaries)</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Right-Edge Destination Micro-Thumbnails (Peek Cards) (Section 3.3) */}
          <div style={{
            position: 'absolute',
            right: '-10px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            zIndex: 30
          }}>
            {currentBiome.featuredDestinations.map((dest, idx) => (
              <div
                key={dest.id}
                onClick={() => executeZoomToResult(dest, currentBiome)}
                className="glass-panel"
                style={{
                  width: '260px',
                  padding: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  transition: 'transform 0.25s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(-20px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover' }}
                />
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '11px', color: currentBiome.accentColor, fontWeight: 700 }}>
                    {dest.country} {dest.flag}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {dest.name}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    ★ {dest.rating} ({dest.reviewsCount})
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Far Right Vertical Progress Bar (Section 3.4) */}
          <div style={{
            position: 'absolute',
            right: '12px',
            top: '25%',
            bottom: '25%',
            width: '3px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '4px',
            zIndex: 40,
            overflow: 'hidden'
          }}>
            <div style={{
              width: '100%',
              height: `${((currentSlideIndex + 1) / BIOMES.length) * 100}%`,
              backgroundColor: currentBiome.accentColor,
              transition: 'height 0.4s ease'
            }} />
          </div>
        </div>
      )}

      {/* ========================================================
          VIEW MODE 2: DESTINATION DETAIL SCREEN
          ======================================================== */}
      {viewMode === 'DESTINATION_DETAIL' && activeDestination && (
        <div style={{ paddingTop: '100px' }}>
          <DestinationDetailView
            destination={activeDestination}
            biome={currentBiome}
            onBack={() => setViewMode('HERO_SLIDES')}
            onPlanItinerary={() => setViewMode('ITINERARY')}
          />
        </div>
      )}

      {/* ========================================================
          VIEW MODE 3: THREE-COLUMN ITINERARY PLANNER SCREEN
          ======================================================== */}
      {viewMode === 'ITINERARY' && activeDestination && (
        <div style={{ paddingTop: '100px' }}>
          <ItineraryBuilderScreen
            destination={activeDestination}
            biome={currentBiome}
            onBack={() => setViewMode('DESTINATION_DETAIL')}
          />
        </div>
      )}

      {/* Add Place Modal with Netflix Expand Trigger */}
      <AddPlaceModal
        isOpen={isAddPlaceOpen}
        onClose={() => setIsAddPlaceOpen(false)}
        onPlaceAdded={handlePlaceAdded}
      />

      {/* Floating Gemini AI Travel Companion Chat Panel */}
      <AIAssistantPanel
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        activeDestination={activeDestination || currentBiome.featuredDestinations[0]}
        biome={currentBiome}
      />
    </div>
  );
}
