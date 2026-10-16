import React, { useEffect, useState } from 'react';
import { 
  Navigation, Plane, Train, Car, Ship, Compass, Maximize2, 
  Minimize2, MapPin, Gauge, ShieldCheck, ChevronRight 
} from 'lucide-react';

/**
 * Section 6: Live Map Corner with Animated Vehicle Tracking
 * Translucent mini-map animating up from top-left (340px x 240px).
 * Displays simulated real-time vehicle route:
 * - City -> City: Airplane smooth arc
 * - City -> Mountain: Train linear track with sway
 * - Beach: Ferry wave bob
 * - Local: Road car navigation
 */
export default function LiveMapCorner({ activeDestination, isExpanded, onToggleExpand }) {
  const [vehicleProgress, setVehicleProgress] = useState(0.15); // 0 to 1
  const [vehicleSpeed, setVehicleSpeed] = useState(1);

  // Determine transport type based on destination biome
  let vehicleType = 'Car';
  let VehicleIcon = Car;
  let distanceKm = 840;
  let estimatedTime = '2h 15m';

  if (activeDestination) {
    const lat = activeDestination.coordinates.lat;
    if (Math.abs(lat) > 40 || activeDestination.country === 'Norway' || activeDestination.country === 'Iceland') {
      vehicleType = 'Airplane';
      VehicleIcon = Plane;
      distanceKm = 4200;
      estimatedTime = '5h 40m';
    } else if (activeDestination.name.toLowerCase().includes('valley') || activeDestination.name.toLowerCase().includes('himalaya') || activeDestination.name.toLowerCase().includes('alps')) {
      vehicleType = 'Mountain Train';
      VehicleIcon = Train;
      distanceKm = 620;
      estimatedTime = '6h 30m';
    } else if (activeDestination.country === 'Maldives' || activeDestination.country === 'Philippines') {
      vehicleType = 'Ferry / Boat';
      VehicleIcon = Ship;
      distanceKm = 140;
      estimatedTime = '1h 10m';
    }
  }

  // Smooth 60fps vehicle animation loop along bezier path
  useEffect(() => {
    let animId;
    let current = 0.15;
    const animate = () => {
      current += 0.0035;
      if (current > 0.95) current = 0.15; // Loop route
      setVehicleProgress(current);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [activeDestination]);

  // Calculate coordinates on SVG Bezier curve
  // Start: (40, 160) -> Control Point: (160, 40) -> End: (280, 80)
  const p0 = { x: 40, y: 160 };
  const p1 = { x: 170, y: 35 };
  const p2 = { x: 285, y: 75 };

  const t = vehicleProgress;
  const currentX = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
  const currentY = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;

  // Tangent angle
  const dx = 2 * (1 - t) * (p1.x - p0.x) + 2 * t * (p2.x - p1.x);
  const dy = 2 * (1 - t) * (p1.y - p0.y) + 2 * t * (p2.y - p1.y);
  const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;

  return (
    <div
      style={{
        position: 'fixed',
        top: '84px',
        left: '24px',
        width: isExpanded ? '480px' : '340px',
        height: isExpanded ? '340px' : '230px',
        zIndex: 80,
        borderRadius: 'var(--radius-xl)',
        background: 'rgba(0, 8, 20, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.16)',
        boxShadow: '0 20px 48px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Top Map Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 14px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(255, 255, 255, 0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#34D399',
            boxShadow: '0 0 10px #34D399'
          }} />
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
            LIVE SPATIAL RADAR
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
            {activeDestination ? activeDestination.name.split(',')[0] : 'Global Grid'}
          </span>
          <button
            onClick={onToggleExpand}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.7)',
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

      {/* SVG Canvas Map Simulation with Dark Cartography Lines */}
      <div style={{ position: 'relative', flexGrow: 1, overflow: 'hidden' }}>
        <svg
          viewBox="0 0 340 170"
          style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg, #071018 0%, #03080F 100%)' }}
        >
          {/* Subtle Grid Lines */}
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
          </pattern>
          <rect width="340" height="170" fill="url(#grid)" />

          {/* Stylized landmass silhouette contour */}
          <path
            d="M 10 120 Q 80 90 140 110 T 260 80 T 330 110 L 340 170 L 0 170 Z"
            fill="rgba(255,255,255,0.03)"
          />

          {/* Planned Track Line (Dashed) */}
          <path
            d="M 40 160 Q 170 35 285 75"
            fill="none"
            stroke="rgba(56, 189, 248, 0.35)"
            strokeWidth="3"
            strokeDasharray="6 4"
          />

          {/* Traveled Glow Track Line */}
          <path
            d={`M 40 160 Q ${40 + (p1.x - 40) * t} ${160 + (p1.y - 160) * t} ${currentX} ${currentY}`}
            fill="none"
            stroke="#38BDF8"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Origin Radar Pulse Dot */}
          <circle cx="40" cy="160" r="5" fill="#38BDF8" />
          <circle cx="40" cy="160" r="10" fill="none" stroke="#38BDF8" opacity="0.4" strokeWidth="1" />
          <text x="14" y="152" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="var(--font-mono)">BASE</text>

          {/* Destination Target Marker Pin */}
          <g transform="translate(285, 75)">
            <circle cx="0" cy="0" r="6" fill="#F43F5E" />
            <circle cx="0" cy="0" r="14" fill="none" stroke="#F43F5E" strokeWidth="1.2" opacity="0.6">
              <animate attributeName="r" values="6;16;6" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0.1;0.8" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="-20" y="-12" fill="#FFFFFF" fontSize="9" fontWeight="700" fontFamily="var(--font-sans)">
              TARGET
            </text>
          </g>

          {/* Animated Moving Vehicle Marker */}
          <g transform={`translate(${currentX}, ${currentY}) rotate(${angleDeg})`}>
            {/* Glow under vehicle */}
            <circle cx="0" cy="0" r="12" fill="rgba(56, 189, 248, 0.4)" filter="blur(4px)" />
            {/* Vehicle body indicator */}
            <circle cx="0" cy="0" r="8" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
            {/* Forward heading pointer */}
            <polygon points="6,0 0,-4 0,4" fill="#0284C7" />
          </g>
        </svg>

        {/* Floating Mini Overlay Telemetry Pill */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '10px',
          right: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '6px 12px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(8, 14, 24, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(8px)',
          fontSize: '11px',
          fontFamily: 'var(--font-mono)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38BDF8' }}>
            <VehicleIcon size={13} />
            <span>{vehicleType}</span>
          </div>

          <div style={{ color: 'var(--text-secondary)' }}>
            ETA: <b style={{ color: '#FFFFFF' }}>{estimatedTime}</b> ({distanceKm} km)
          </div>

          <div style={{ color: '#34D399', display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Gauge size={11} />
            <span>{Math.round(vehicleProgress * 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
