import React from 'react';

/**
 * Animated Layered Landscape Background
 * Layers: Sky & Celestial, Distant Snow Mountains, Mid-range Valleys, Forest/Beach Horizon, Foreground Mist
 * Provides smooth parallax & atmosphere shifts.
 */
export default function LandscapeBackground({ activeScene, activeDestination, parallaxOffset = { x: 0, y: 0 } }) {
  // If a destination is discovered, we blend toward its landscape
  const destinationHero = activeDestination ? activeDestination.heroLandscape : null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      zIndex: 0,
      pointerEvents: 'none',
      userSelect: 'none',
      backgroundColor: '#0C1B2A'
    }}>
      {/* Layer 1: Atmospheric Sky Gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: activeDestination 
          ? 'linear-gradient(180deg, #09131C 0%, #152636 40%, #2A3C4D 75%, #3D4841 100%)'
          : 'linear-gradient(180deg, #0B192C 0%, #1E3E62 35%, #E68369 85%, #FFDFB9 100%)',
        transition: 'background 1.5s ease'
      }} />

      {/* Layer 2: Sun / Moon Warm Ambient Glow */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '20%',
        width: '420px',
        height: '420px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(254, 215, 170, 0.35) 0%, rgba(249, 115, 22, 0.15) 45%, rgba(0,0,0,0) 70%)',
        filter: 'blur(30px)',
        transform: `translate(${parallaxOffset.x * 0.02}px, ${parallaxOffset.y * 0.02}px)`,
        transition: 'transform 0.4s ease-out'
      }} />

      {/* Layer 3: Distant Alpine Mountain Peaks SVG */}
      <div style={{
        position: 'absolute',
        bottom: '22%',
        left: '-5%',
        width: '110%',
        height: '450px',
        opacity: 0.85,
        transform: `translate(${parallaxOffset.x * 0.04}px, ${parallaxOffset.y * 0.02}px)`,
        transition: 'transform 0.3s ease-out'
      }}>
        <svg viewBox="0 0 1440 400" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          <path
            d="M0 240L90 190L190 280L340 120L480 230L620 90L760 210L900 130L1060 260L1210 140L1350 250L1440 210V400H0V240Z"
            fill="#1E2A38"
            opacity="0.75"
          />
          <path
            d="M340 120L360 155L320 160Z"
            fill="#E2E8F0"
            opacity="0.8"
          />
          <path
            d="M620 90L645 135L595 140Z"
            fill="#F8FAFC"
            opacity="0.9"
          />
          <path
            d="M900 130L925 170L875 175Z"
            fill="#E2E8F0"
            opacity="0.8"
          />
          <path
            d="M1210 140L1230 180L1190 185Z"
            fill="#E2E8F0"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Layer 4: Mid-Range Rolling Green Hills & Valleys */}
      <div style={{
        position: 'absolute',
        bottom: '12%',
        left: '-5%',
        width: '110%',
        height: '350px',
        transform: `translate(${parallaxOffset.x * 0.08}px, ${parallaxOffset.y * 0.04}px)`,
        transition: 'transform 0.25s ease-out'
      }}>
        <svg viewBox="0 0 1440 320" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          <path
            d="M0 160C180 120 320 220 540 170C760 120 920 230 1140 180C1280 145 1380 185 1440 200V320H0V160Z"
            fill="#133E32"
            opacity="0.9"
          />
          <path
            d="M0 210C160 180 340 250 560 200C780 150 960 260 1200 210C1340 185 1400 210 1440 225V320H0V210Z"
            fill="#0F2D25"
          />
        </svg>
      </div>

      {/* Layer 5: Evergreen Tree Silhouettes & Shoreline Horizon */}
      <div style={{
        position: 'absolute',
        bottom: '3%',
        left: '-5%',
        width: '110%',
        height: '220px',
        transform: `translate(${parallaxOffset.x * 0.12}px, ${parallaxOffset.y * 0.06}px)`,
        transition: 'transform 0.2s ease-out'
      }}>
        <svg viewBox="0 0 1440 200" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          <path
            d="M0 140 Q 200 120, 400 145 T 800 135 T 1200 145 T 1440 138 V 200 H 0 Z"
            fill="#081C17"
          />
          {/* Stylized tree pines */}
          {[60, 140, 240, 310, 480, 580, 720, 810, 940, 1080, 1190, 1310, 1400].map((cx, i) => (
            <polygon
              key={i}
              points={`${cx},${95 + (i % 3) * 10} ${cx - 16},${160} ${cx + 16},${160}`}
              fill="#061612"
            />
          ))}
        </svg>
      </div>

      {/* Destination Hero Blend Transition: cinematic photography overlay when discovered */}
      {destinationHero && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${destinationHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: activeScene === 'DESTINATION_DISCOVERY' ? 0.35 : 0.0,
          filter: 'blur(2px) saturate(1.2)',
          transition: 'opacity 1.8s ease-in-out',
          mixBlendMode: 'screen'
        }} />
      )}

      {/* Subtle Cinematic Vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 100%)'
      }} />
    </div>
  );
}
