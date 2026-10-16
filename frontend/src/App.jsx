import React, { useState, useEffect } from 'react';
import LandscapeBackground from './components/LandscapeBackground';
import DuffelBagMascot from './components/DuffelBagMascot';
import ExplorerCharacter from './components/ExplorerCharacter';
import DestinationSearch from './components/DestinationSearch';
import DestinationDiscoveryScene from './components/DestinationDiscoveryScene';
import { searchDestinationData } from './data/immersiveDestinations';
import { Compass, Sparkles, MapPin, RefreshCw } from 'lucide-react';

/**
 * Immersive Animated Travel Discovery Website
 * Orchestrates explicit animation states:
 * WELCOME -> SEARCH -> DESTINATION_INTRO -> DESTINATION_DISCOVERY
 */
export default function App() {
  // Current animation scene
  const [activeScene, setActiveScene] = useState('WELCOME');
  // Discovered destination data
  const [activeDestination, setActiveDestination] = useState(null);
  // Search loading & error
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  // Mouse parallax coordinates
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Subtle mouse parallax tracker for desktop screens
  useEffect(() => {
    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setMouseOffset({
        x: (e.clientX - centerX) * 0.4,
        y: (e.clientY - centerY) * 0.4
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handler: Click Duffel Bag on Welcome Screen
  const handleBagClick = () => {
    if (activeScene === 'WELCOME') {
      // Scene transition: Bag moves to sidebar and explorer enters
      setActiveScene('SEARCH');
    }
  };

  // Handler: Destination search trigger
  const handleSearchDestination = (query) => {
    setIsSearching(true);
    setSearchError(null);

    // Explorer looks through binoculars
    setActiveScene('DESTINATION_INTRO');

    setTimeout(() => {
      const result = searchDestinationData(query);
      if (result) {
        setActiveDestination(result);
        setActiveScene('DESTINATION_DISCOVERY');
      } else {
        setSearchError(`No expedition records found for "${query}". Try "Jammu & Kashmir", "Jaipur", "Agra", or "Rishikesh".`);
        setActiveScene('SEARCH');
      }
      setIsSearching(false);
    }, 750);
  };

  // Handler: Search another destination
  const handleResetToSearch = () => {
    setActiveDestination(null);
    setSearchError(null);
    setActiveScene('SEARCH');
  };

  // Handler: Full reset to welcome screen
  const handleRestartJourney = () => {
    setActiveDestination(null);
    setSearchError(null);
    setActiveScene('WELCOME');
  };

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      minHeight: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* 1. Animated Landscape Background with Layered Parallax */}
      <LandscapeBackground
        activeScene={activeScene}
        activeDestination={activeDestination}
        parallaxOffset={mouseOffset}
      />

      {/* 2. Top Header & Branding (Always desktop-cinematic) */}
      <header style={{
        position: 'relative',
        zIndex: 50,
        padding: '24px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Brand Logo */}
        <div
          onClick={handleRestartJourney}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.88)',
            padding: '8px 20px',
            borderRadius: '9999px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.9)'
          }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: '#114232',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF'
          }}>
            <Compass size={20} />
          </div>
          <div>
            <div style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '20px',
              fontWeight: 800,
              color: '#114232',
              lineHeight: 1
            }}>
              Travel<span style={{ color: '#C85A32' }}>Tales</span>
            </div>
            <div style={{ fontSize: '10px', fontWeight: 700, color: '#6B7068', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Immersive Animated Expedition
            </div>
          </div>
        </div>

        {/* Top Right State Badges / Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {activeScene !== 'WELCOME' && (
            <button
              onClick={handleRestartJourney}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                color: '#114232',
                border: '1px solid #E7DFD3',
                borderRadius: '9999px',
                padding: '8px 16px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backdropFilter: 'blur(8px)'
              }}
            >
              <RefreshCw size={13} />
              <span>Reset to Beginning</span>
            </button>
          )}

          <div style={{
            backgroundColor: 'rgba(17, 66, 50, 0.85)',
            color: '#FFFFFF',
            padding: '8px 18px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backdropFilter: 'blur(8px)'
          }}>
            <Sparkles size={14} color="#FBBF24" />
            <span>
              {activeScene === 'WELCOME' && 'Scene 1: Living Mascot'}
              {activeScene === 'SEARCH' && 'Scene 2: Explorer Encounter'}
              {activeScene === 'DESTINATION_INTRO' && 'Scene 3: Surveying Region'}
              {activeScene === 'DESTINATION_DISCOVERY' && `Scene 4: ${activeDestination?.name}`}
            </span>
          </div>
        </div>
      </header>

      {/* 3. Main Stage Content Area */}
      <main style={{
        position: 'relative',
        zIndex: 20,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 40px 40px'
      }}>
        {/* ========================================================
            SCENE 1: WELCOME SCREEN (Center Living Duffel Bag Mascot)
            ======================================================== */}
        {activeScene === 'WELCOME' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            animation: 'fadeInScale 0.6s ease'
          }}>
            {/* Editorial Title */}
            <h1 style={{
              fontSize: 'clamp(44px, 5.5vw, 68px)',
              fontFamily: 'Playfair Display, serif',
              color: '#FFFFFF',
              fontWeight: 800,
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
              margin: '0 0 12px 0',
              lineHeight: 1.1
            }}>
              Every journey begins with a packed bag.
            </h1>

            <p style={{
              fontSize: '18px',
              color: '#F4EDE4',
              maxWidth: '600px',
              margin: '0 0 32px 0',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
              fontWeight: 400
            }}>
              Meet your animated travel companion. Tap the duffel bag to awaken the journey across magnificent horizons.
            </p>

            {/* Central Animated Living Duffel Bag */}
            <div style={{ position: 'relative', marginBottom: '24px' }}>
              <DuffelBagMascot
                isSidebar={false}
                onClick={handleBagClick}
                activeScene={activeScene}
              />
            </div>

            {/* Subtle Interactive Instruction Pill */}
            <div
              onClick={handleBagClick}
              className="pulse-instruction"
              style={{
                cursor: 'pointer',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: '#114232',
                padding: '12px 28px',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: 800,
                letterSpacing: '0.02em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
            >
              <Sparkles size={16} color="#D97706" />
              <span>Click the bag to begin your journey</span>
            </div>
          </div>
        )}

        {/* ========================================================
            SCENE 2 & 3: SEARCH INTERACTION & EXPLORER CHARACTER
            ======================================================== */}
        {(activeScene === 'SEARCH' || activeScene === 'DESTINATION_INTRO') && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '960px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            {/* Friendly Explorer Character in the center */}
            <div style={{ marginBottom: '16px' }}>
              <ExplorerCharacter
                state={activeScene === 'DESTINATION_INTRO' ? 'SEARCHING' : 'IDLE'}
              />
            </div>

            {/* Main Destination Search Interface */}
            <DestinationSearch
              onSearch={handleSearchDestination}
              isLoading={isSearching}
              searchError={searchError}
            />
          </div>
        )}

        {/* ========================================================
            SCENE 4: DESTINATION DISCOVERY GALLERY
            ======================================================== */}
        {activeScene === 'DESTINATION_DISCOVERY' && activeDestination && (
          <DestinationDiscoveryScene
            destination={activeDestination}
            onSearchAgain={handleResetToSearch}
          />
        )}
      </main>

      {/* Persistent Animated Mascot & Explorer Companion in Lower Left when past Welcome */}
      {activeScene !== 'WELCOME' && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '28px',
          zIndex: 40,
          display: 'flex',
          alignItems: 'flex-end',
          gap: '12px',
          animation: 'slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}>
          {/* Scaled-down animated duffel bag companion */}
          <div
            onClick={() => {
              if (activeScene === 'DESTINATION_DISCOVERY') handleResetToSearch();
            }}
            title="Your trusty duffel companion"
            style={{ cursor: 'pointer' }}
          >
            <DuffelBagMascot
              isSidebar={true}
              onClick={() => {}}
              activeScene={activeScene}
            />
          </div>

          {/* Explorer in discovery presentation pose when viewing details */}
          {activeScene === 'DESTINATION_DISCOVERY' && (
            <div style={{ transform: 'scale(0.85)', transformOrigin: 'bottom left' }}>
              <ExplorerCharacter state="DISCOVERY" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
