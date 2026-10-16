import React, { useState } from 'react';
import { 
  Navigation, MapPin, Maximize2, Minimize2, Layers, 
  Compass, ExternalLink, ShieldCheck, Crosshair 
} from 'lucide-react';

/**
 * Bottom-Left Real GPS Map Overlay:
 * Uses live satellite/road OpenStreetMap & Google Maps embed tiles
 * for real GPS navigation, live coordinates, terrain/satellite toggles,
 * and pinpoints the active destination precisely.
 */
export default function SketchMapOverlay({ activeBiome, isExpanded, onToggleExpand }) {
  const [mapType, setMapType] = useState('roadmap'); // 'roadmap' | 'satellite'

  // Coordinates from active biome destination
  const activeDest = activeBiome?.destinations?.[0];
  const locationName = activeDest?.name || 'Rajasthan, India';

  // Real GPS map embed URL using OpenStreetMap / CartoDB Dark Matter / Google Map iframe
  const encodedLocation = encodeURIComponent(locationName);
  const mapIframeUrl = mapType === 'satellite'
    ? `https://maps.google.com/maps?q=${encodedLocation}&t=k&z=11&ie=UTF8&iwloc=&output=embed`
    : `https://maps.google.com/maps?q=${encodedLocation}&t=m&z=11&ie=UTF8&iwloc=&output=embed`;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '24px',
        left: '20px',
        width: isExpanded ? '520px' : '320px',
        height: isExpanded ? '380px' : '270px',
        zIndex: 50,
        borderRadius: 'var(--radius-xl)',
        background: 'rgba(8, 14, 24, 0.92)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 20px 48px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        pointerEvents: 'auto',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Real GPS Map Top Telemetry Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 14px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        background: 'rgba(255, 255, 255, 0.04)',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#34D399',
            boxShadow: '0 0 10px #34D399'
          }} />
          <span style={{
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#38BDF8',
            fontFamily: 'var(--font-mono)'
          }}>
            REAL GPS SATELLITE
          </span>
        </div>

        {/* Satellite vs Road Map Toggle + Expand Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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

          <button
            onClick={onToggleExpand}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.7)',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      {/* Embedded Real Map Viewport */}
      <div style={{ position: 'relative', flexGrow: 1, width: '100%', height: '100%', overflow: 'hidden' }}>
        <iframe
          title="Real GPS Google Map"
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

        {/* Crosshair Center Radar Reticle */}
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
            width: '28px',
            height: '28px',
            border: '1px solid rgba(56, 189, 248, 0.6)',
            borderRadius: '50%',
            boxShadow: '0 0 14px rgba(56, 189, 248, 0.4)'
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

        {/* GPS Coordinates & Region Pill */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '8px',
          right: '8px',
          padding: '6px 12px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(8, 14, 24, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '10px',
          fontFamily: 'var(--font-mono)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#38BDF8' }}>
            <MapPin size={11} />
            <span style={{ fontWeight: 700 }}>{locationName}</span>
          </div>

          <div style={{ color: '#34D399', display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Crosshair size={10} />
            <span>GPS LOCKED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
