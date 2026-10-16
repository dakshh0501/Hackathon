import React, { useState, useRef, useEffect } from 'react';
import { 
  Navigation, MapPin, Layers, Crosshair, Move 
} from 'lucide-react';

/**
 * Draggable Floating Real GPS India Map Overlay:
 * - Shows exclusively India / Indian territory destinations (Rajasthan, Ladakh, Kerala, Himalayas, etc.)
 * - Floatable: can be dragged anywhere across the screen from left to right / top to bottom
 * - Expand button removed per user request
 * - Satellite vs Roadmap toggle with clean telemetry
 */
export default function SketchMapOverlay({ activeBiome }) {
  const [mapType, setMapType] = useState('roadmap'); // 'roadmap' | 'satellite'

  // Draggable positioning state
  const [position, setPosition] = useState({ x: 20, y: window.innerHeight - 300 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0 });

  // Update initial Y on mount or window resize
  useEffect(() => {
    setPosition({ x: 20, y: Math.max(80, window.innerHeight - 300) });
  }, []);

  const handleMouseDown = (e) => {
    // Only drag when clicking the header bar
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: position.x,
      initialY: position.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartRef.current.startX;
      const dy = e.clientY - dragStartRef.current.startY;
      const newX = Math.min(Math.max(10, dragStartRef.current.initialX + dx), window.innerWidth - 330);
      const newY = Math.min(Math.max(60, dragStartRef.current.initialY + dy), window.innerHeight - 280);
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Coordinates strictly for India destinations
  const indianLocations = {
    desert: 'Thar Desert, Rajasthan, India',
    beach: 'Goa Beaches, India',
    mountain: 'Leh Ladakh Himalayas, India',
    forest: 'Jim Corbett National Park, India',
    gardens: 'Shalimar Bagh Mughal Gardens, Srinagar, India',
    river: 'Rishikesh Ganga River, Uttarakhand, India'
  };

  const locationName = indianLocations[activeBiome?.id] || 'India';
  const encodedLocation = encodeURIComponent(locationName);
  
  // Real GPS Google Map iframe locked to India zoom levels
  const mapIframeUrl = mapType === 'satellite'
    ? `https://maps.google.com/maps?q=${encodedLocation}&t=k&z=7&ie=UTF8&iwloc=&output=embed`
    : `https://maps.google.com/maps?q=${encodedLocation}&t=m&z=7&ie=UTF8&iwloc=&output=embed`;

  return (
    <div
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '320px',
        height: '270px',
        zIndex: 80,
        borderRadius: 'var(--radius-xl)',
        background: 'rgba(8, 14, 24, 0.45)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: isDragging ? '1px solid var(--accent-primary)' : '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: isDragging 
          ? '0 25px 60px rgba(56, 189, 248, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
          : '0 20px 48px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        pointerEvents: 'auto',
        transition: isDragging ? 'none' : 'box-shadow 0.2s, border 0.2s'
      }}
    >
      {/* Draggable Header Handle */}
      <div
        onMouseDown={handleMouseDown}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 14px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: isDragging ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.05)',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          zIndex: 10
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Move size={13} color="var(--accent-primary)" />
          <div style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: '#34D399',
            boxShadow: '0 0 8px #34D399'
          }} />
          <span style={{
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#38BDF8',
            fontFamily: 'var(--font-mono)'
          }}>
            GPS INDIA RADAR
          </span>
        </div>

        {/* Satellite vs Roadmap toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => setMapType(mapType === 'roadmap' ? 'satellite' : 'roadmap')}
            style={{
              fontSize: '10px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '9999px',
              backgroundColor: mapType === 'satellite' ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255,255,255,0.08)',
              color: mapType === 'satellite' ? '#38BDF8' : 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.12)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Layers size={11} />
            <span>{mapType === 'satellite' ? 'Satellite' : 'Roadmap'}</span>
          </button>
        </div>
      </div>

      {/* Embedded Real GPS India Map Viewport */}
      <div style={{ position: 'relative', flexGrow: 1, width: '100%', height: '100%', overflow: 'hidden' }}>
        <iframe
          title="Real GPS India Map"
          src={mapIframeUrl}
          width="100%"
          height="100%"
          style={{
            border: 0,
            filter: mapType === 'roadmap' 
              ? 'invert(92%) hue-rotate(180deg) contrast(1.1) brightness(0.95)' 
              : 'contrast(1.15) brightness(0.9)'
          }}
          loading="lazy"
          allowFullScreen
        />

        {/* Center Target Reticle */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '26px',
            height: '26px',
            border: '1px solid rgba(56, 189, 248, 0.6)',
            borderRadius: '50%',
            boxShadow: '0 0 12px rgba(56, 189, 248, 0.4)'
          }} />
          <div style={{
            position: 'absolute',
            width: '6px',
            height: '6px',
            backgroundColor: '#F43F5E',
            borderRadius: '50%',
            boxShadow: '0 0 8px #F43F5E'
          }} />
        </div>

        {/* Bottom Coordinates & Indian Region Pill */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '8px',
          right: '8px',
          padding: '6px 12px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(8, 14, 24, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '10px',
          fontFamily: 'var(--font-mono)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#38BDF8' }}>
            <MapPin size={11} />
            <span style={{ fontWeight: 700 }}>{locationName.split(',')[0]}</span>
          </div>

          <div style={{ color: '#34D399', display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Crosshair size={10} />
            <span>INDIA REGION</span>
          </div>
        </div>
      </div>
    </div>
  );
}
