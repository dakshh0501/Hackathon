import React, { useState, useEffect } from 'react';
import { SKETCH_BIOMES } from './data/sketchBiomes';
import SketchMascot from './components/SketchMascot';
import SearchOverlay from './components/SearchOverlay';
import SketchMapOverlay from './components/SketchMapOverlay';
import DestinationDetailView from './components/DestinationDetailView';
import ItineraryBuilderScreen from './components/ItineraryBuilderScreen';
import AIAssistantPanel from './components/AIAssistantPanel';
import MascotChatbotModal from './components/MascotChatbotModal';
import ExploreView from './pages/ExploreView';
import MyTripsView from './pages/MyTripsView';
import { searchStrictLocation } from './data/allIndiaDestinations';
import { Compass, Sparkles, User, LogOut, Map, Bookmark } from 'lucide-react';
import AuthModal from './components/AuthModal';
import { api } from './services/api';

export default function App() {
  // Currently highlighted or active biome (default: Mountain, col 3)
  const [activeBiomeId, setActiveBiomeId] = useState('mountain');
  const [hoveredBiomeId, setHoveredBiomeId] = useState(null);

  // Detail View and Itinerary Navigation
  const [viewMode, setViewMode] = useState('MAIN_PAGE'); // 'MAIN_PAGE' | 'DESTINATION_DETAIL' | 'ITINERARY' | 'EXPLORE' | 'MY_TRIPS'
  const [selectedDestination, setSelectedDestination] = useState(null);

  // Overlays
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);
  const [isMascotChatOpen, setIsMascotChatOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [savedTripsList, setSavedTripsList] = useState([]);
  const [savedAttractionsList, setSavedAttractionsList] = useState([]);

  // Real backend health check state: 'checking' | 'live' | 'offline'
  const [backendStatus, setBackendStatus] = useState('checking');

  useEffect(() => {
    let isMounted = true;

    async function checkHealth() {
      try {
        const res = await api.getHealth();
        if (isMounted) {
          if (res?.data?.status === 'ok' || res?.status === 'ok') {
            setBackendStatus('live');
          } else {
            setBackendStatus('offline');
          }
        }
      } catch {
        if (isMounted) setBackendStatus('offline');
      }
    }

    checkHealth();
    const interval = setInterval(checkHealth, 15000); // Check every 15s

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Restore authenticated session on page reload
  useEffect(() => {
    async function restoreSession() {
      if (!api.token) return;

      try {
        const data = await api.getCurrentUser();
        if (data?.user) {
          setCurrentUser(data.user);
        } else if (data?.id) {
          setCurrentUser(data);
        }

        // Fetch user's saved trips from backend store
        const trips = await api.getTrips();
        if (Array.isArray(trips)) {
          setSavedTripsList(trips.map(t => ({
            id: t.id,
            destination: t.destinationName || 'Heritage Tour',
            startDate: t.startDate,
            endDate: t.endDate,
            days: t.days?.length || 3,
            members: t.adults + (t.children || 0),
            totalCost: t.budgetPaise ? Math.round(t.budgetPaise / 100) : 5000,
            image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80'
          })));
        }
      } catch (err) {
        console.warn('Session expired or invalid token:', err.message);
        api.setToken(null);
        setCurrentUser(null);
      }
    }

    restoreSession();
  }, []);

  // Active biome object
  const activeBiome = SKETCH_BIOMES.find(b => b.id === (hoveredBiomeId || activeBiomeId)) || SKETCH_BIOMES[2];

  // Search error state
  const [searchError, setSearchError] = useState(null);

  // Search handler: match any city, state, or region of India with strict location validation
  const handleSearch = async (query) => {
    if (!query || !query.trim()) return;

    // Search across verified locations (Vrindavan, Mathura, Jhansi, Delhi, Assam, etc.)
    const indiaMatch = searchStrictLocation(query);

    if (indiaMatch) {
      setSearchError(null);
      // Find matching column biome
      const targetBiome = SKETCH_BIOMES.find(b => b.id === indiaMatch.biomeCategory) || SKETCH_BIOMES[2];
      setActiveBiomeId(targetBiome.id);

      const destData = {
        id: indiaMatch.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name: indiaMatch.name,
        country: indiaMatch.state,
        flag: '🇮🇳',
        image: indiaMatch.coverImage,
        coordinates: indiaMatch.coordinates || { lat: 26.2006, lng: 92.9376 },
        rating: 4.96,
        reviewsCount: 1950,
        description: indiaMatch.description,
        story: `${indiaMatch.name} is one of India's most celebrated destinations in ${indiaMatch.state}. It is famous for: ${indiaMatch.specialties?.join(' • ') || indiaMatch.highlights.join(' • ')}.`,
        weather: indiaMatch.weather,
        safetyIndex: indiaMatch.safetyIndex,
        dailyBudget: indiaMatch.budget,
        experiences: indiaMatch.highlights
      };

      setSelectedDestination(destData);
      setViewMode('DESTINATION_DETAIL');

      // Asynchronously fetch fresh high-res Unsplash image for the searched city or landmark
      try {
        const famousPlace = indiaMatch.highlights?.[0] || indiaMatch.specialties?.[0] || '';
        const searchPhotoQuery = `${indiaMatch.name} ${famousPlace}`.trim();
        const photoResult = await api.getRandomPhoto(searchPhotoQuery);
        if (photoResult?.url || photoResult?.regularUrl) {
          setSelectedDestination(prev => ({
            ...prev,
            image: photoResult.regularUrl || photoResult.url
          }));
        }
      } catch (e) {
        console.warn('Could not fetch live Unsplash photo for destination:', e);
      }
    } else {
      // Show exact requested error message without redirecting
      setSearchError('Please search valid location.');
      setTimeout(() => setSearchError(null), 3500);
    }
  };

  // Click on mascot action
  const handleMascotClick = () => {
    setIsMascotChatOpen(true);
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
                TravelTales
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Where every destination breathes
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', pointerEvents: 'auto' }}>
              {/* Navigation Menu Buttons */}
              <button
                onClick={() => setViewMode('MAIN_PAGE')}
                className="glass-interactive"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: 700,
                  background: viewMode === 'MAIN_PAGE' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                  border: viewMode === 'MAIN_PAGE' ? '1px solid var(--accent-primary)' : '1px solid rgba(255, 255, 255, 0.12)'
                }}
              >
                <Compass size={14} color={viewMode === 'MAIN_PAGE' ? 'var(--accent-primary)' : '#FFFFFF'} />
                <span>Sanctuaries</span>
              </button>

              <button
                onClick={() => setViewMode('EXPLORE')}
                className="glass-interactive"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: 700,
                  background: viewMode === 'EXPLORE' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                  border: viewMode === 'EXPLORE' ? '1px solid var(--accent-primary)' : '1px solid rgba(255, 255, 255, 0.12)'
                }}
              >
                <Map size={14} color={viewMode === 'EXPLORE' ? 'var(--accent-primary)' : '#FFFFFF'} />
                <span>Explore All</span>
              </button>

              <button
                onClick={() => setViewMode('MY_TRIPS')}
                className="glass-interactive"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: 700,
                  background: viewMode === 'MY_TRIPS' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                  border: viewMode === 'MY_TRIPS' ? '1px solid var(--accent-primary)' : '1px solid rgba(255, 255, 255, 0.12)'
                }}
              >
                <Bookmark size={14} color={viewMode === 'MY_TRIPS' ? 'var(--accent-primary)' : '#FFFFFF'} />
                <span>My Trips</span>
              </button>

              {currentUser ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    background: 'rgba(255, 255, 255, 0.12)',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#FFFFFF'
                  }}>
                    👤 {currentUser.name}
                  </div>
                  <button
                    onClick={() => { api.setToken(null); setCurrentUser(null); }}
                    title="Sign Out"
                    className="glass-interactive"
                    style={{
                      padding: '6px 10px',
                      fontSize: '12px',
                      color: 'rgba(244, 63, 94, 0.9)'
                    }}
                  >
                    <LogOut size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="glass-interactive"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 16px',
                    fontSize: '12px',
                    fontWeight: 700,
                    backgroundColor: 'rgba(56, 189, 248, 0.2)',
                    border: '1px solid rgba(56, 189, 248, 0.4)'
                  }}
                >
                  <User size={14} color="var(--accent-primary)" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </header>

          {/* User Auth Modal */}
          <AuthModal
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
            onAuthSuccess={(user) => setCurrentUser(user)}
          />

          {/* 6 BACKGROUND VERTICAL COLUMNS: PURE SCENIC PHOTOGRAPHY ONLY
              (All text names removed as requested - pure scenic pictures) */}
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
                  title={`Explore ${biome.name} Sanctuary`}
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
                  {/* High-Resolution Scenic Background Image (Pure Photography) */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${biome.bgImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: isHovered || isSelected ? 'brightness(1.0) contrast(1.12) saturate(1.1)' : 'brightness(0.82) contrast(1.08) saturate(1.05)',
                      transform: isHovered ? 'scale(1.06)' : 'scale(1.0)',
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />

                  {/* Subtle Cinematic Vignette */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(4,6,8,0.15) 0%, transparent 40%, rgba(4,6,8,0.3) 100%)'
                  }} />

                  {/* Active column ambient bottom glow line */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '140px',
                    background: `linear-gradient(to top, ${biome.glowColor} 0%, transparent 100%)`,
                    opacity: isHovered || isSelected ? 0.6 : 0.15,
                    transition: 'opacity 0.4s ease'
                  }} />

                  {/* Place Name Hover Indicator Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: '72px',
                    left: '50%',
                    transform: isHovered ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-10px)',
                    opacity: isHovered ? 1 : 0,
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    pointerEvents: 'none',
                    zIndex: 25,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    width: '90%'
                  }}>
                    <div style={{
                      background: 'rgba(8, 14, 24, 0.88)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: `1px solid ${biome.accentColor || 'rgba(255,255,255,0.2)'}`,
                      borderRadius: '12px',
                      padding: '8px 14px',
                      textAlign: 'center',
                      boxShadow: `0 8px 24px rgba(0,0,0,0.6), 0 0 16px ${biome.glowColor || 'transparent'}`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '2px'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: 800,
                        fontSize: '13px',
                        letterSpacing: '0.08em',
                        color: biome.accentColor || '#FFFFFF',
                        textTransform: 'uppercase'
                      }}>
                        <span>{biome.emoji}</span>
                        <span>{biome.name}</span>
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '160px'
                      }}>
                        {biome.destinations[0]?.name || biome.tagline}
                      </div>
                    </div>
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
            searchError={searchError}
          />

          {/* ====================================================
              SKETCH ELEMENT 2: REAL GPS GOOGLE MAP OVERLAY
              Placed in bottom-left covering Desert & Beach (Cols 1 & 2)
              ==================================================== */}
          <SketchMapOverlay
            activeBiome={activeBiome}
          />



          {/* ====================================================
              SKETCH ELEMENT 4: BOTTOM-RIGHT MASCOT BACKPACK
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

      {/* ========================================================
          VIEW MODE 4: EXPLORE ALL DESTINATIONS GRID
          ======================================================== */}
      {viewMode === 'EXPLORE' && (
        <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
          <div style={{ padding: '20px 24px 0' }}>
            <button
              onClick={() => setViewMode('MAIN_PAGE')}
              className="glass-interactive"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                fontSize: '13px',
                fontWeight: 700,
                color: '#FFFFFF'
              }}
            >
              <Compass size={16} color="var(--accent-primary)" />
              <span>Back</span>
            </button>
          </div>
          <ExploreView
            savedAttractions={savedAttractionsList}
            onToggleSave={(id) => {
              setSavedAttractionsList(prev => 
                prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
              );
            }}
            onAddToItinerary={(attraction) => {
              handleSearch(attraction.city);
            }}
            onViewDestination={(destName) => {
              handleSearch(destName);
            }}
          />
        </div>
      )}

      {/* ========================================================
          VIEW MODE 5: MY SAVED TRIPS & JOURNAL
          ======================================================== */}
      {viewMode === 'MY_TRIPS' && (
        <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
          <div style={{ padding: '20px 24px 0' }}>
            <button
              onClick={() => setViewMode('MAIN_PAGE')}
              className="glass-interactive"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                fontSize: '13px',
                fontWeight: 700,
                color: '#FFFFFF'
              }}
            >
              <Compass size={16} color="var(--accent-primary)" />
              <span>Back</span>
            </button>
          </div>
          <MyTripsView
            savedTrips={savedTripsList}
            savedAttractions={savedAttractionsList}
            onLoadTrip={(trip) => {
              handleSearch(trip.destination);
            }}
            onDeleteTrip={(tripId) => {
              setSavedTripsList(prev => prev.filter(t => t.id !== tripId));
            }}
            onPlanNewTrip={() => setViewMode('EXPLORE')}
            onSelectDestination={(dest) => {
              handleSearch(dest.name);
            }}
          />
        </div>
      )}

      {/* Floating Gemini AI Travel Companion Panel (Top Right Header Trigger) */}
      <AIAssistantPanel
        isOpen={isAIPanelOpen}
        onClose={() => setIsAIPanelOpen(false)}
        activeDestination={selectedDestination || { name: activeBiome.name }}
        biome={activeBiome}
      />

      {/* Backpack Mascot Travel Chatbot (Bottom Right Mascot Trigger) */}
      <MascotChatbotModal
        isOpen={isMascotChatOpen}
        onClose={() => setIsMascotChatOpen(false)}
        onSelectDestination={(dest) => {
          setIsMascotChatOpen(false);
          handleSearch(dest.name);
        }}
      />
    </div>
  );
}
