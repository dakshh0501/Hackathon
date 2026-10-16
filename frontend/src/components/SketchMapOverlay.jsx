import React, { useEffect, useState } from 'react';
import { Navigation, Plane, Car, Ship, Train, Maximize2, Minimize2, MapPin, Radio } from 'lucide-react';

/**
 * Bottom-Left "Map Overlay"
 * Placed in the bottom-left covering Column 1 & 2 (Desert & Beach), exactly as sketched.
 * Features:
 * - Live radar sweep line
 * - Animated route and moving vehicle
 * - Destination telemetry
 */
export default function SketchMapOverlay({ activeBiome, isExpanded, onToggleExpand }) {
  const [vehicleProgress, setVehicleProgress] = useState(0.2);

  // Smooth vehicle loop along bezier route
  useEffect(() => {
    let animId;
    let t = 0.15;
    const animate = () => {
      t += 0.004;
      if (t > 0.95) t = 0.15;
      setVehicleProgress(t);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [activeBiome]);

  // Bezier curve calculations
  const p0 = { x: 30, y: 140 };
  const p1 = { x: 140, y: 30 };
  const p2 = { x: 260, y: 70 };

  const t = vehicleProgress;
  const currentX = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
  const currentY = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '24px',
        left: '20px',
        width: isExpanded ? '460px' : '300px',
        height: isExpanded ? '320px' : '240px',
        zIndex: 50,
        borderRadius: 'var(--radius-xl)',
        background: 'rgba(8, 14, 24, 0.88)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: '0 20px 48px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        pointerEvents: 'auto',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Top Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 16px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(255, 255, 255, 0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#34D399', boxShadow: '0 0 8px #34D399' }} />
          <span style={{
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--accent-primary)',
            fontFamily: 'var(--font-mono)'
          }}>
            MAP OVERLAY
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
            {activeBiome ? activeBiome.name : 'GRID'}
          </span>
          <button
            onClick={onToggleExpand}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', padding: '2px' }}
          >
            {isExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
        </div>
      </div>

      {/* SVG Canvas Map Simulation */}
      <div style={{ position: 'relative', flexGrow: 1, overflow: 'hidden' }}>
        <svg
          viewBox="0 0 300 180"
          style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg, #071018 0%, #03080F 100%)' }}
        >
          {/* Subtle Grid Pattern */}
          <pattern id="sketchGrid" width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
          </pattern>
          <rect width="300" height="180" fill="url(#sketchGrid)" />

          {/* Contour Lines */}
          <path d="M 0 110 Q 70 80 130 100 T 240 70 T 300 100 L 300 180 L 0 180 Z" fill="rgba(255,255,255,0.03)" />

          {/* Radar Sweep Arc */}
          <circle cx="150" cy="90" r="70" fill="none" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" />
          <circle cx="150" cy="90" r="40" fill="none" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" />

          {/* Route path dashed */}
          <path d="M 30 140 Q 140 30 260 70" fill="none" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="2.5" strokeDasharray="5 4" />

          {/* Traveled portion glowing */}
          <path
            d={`M 30 140 Q ${30 + (p1.x - 30) * t} ${140 + (p1.y - 140) * t} ${currentX} ${currentY}`}
            fill="none"
            stroke={activeBiome?.accentColor || '#38BDF8'}
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Origin Marker */}
          <circle cx="30" cy="140" r="4" fill="#38BDF8" />

          {/* Target Marker with pulse */}
          <g transform="translate(260, 70)">
            <circle cx="0" cy="0" r="5" fill="#F43F5E" />
            <circle cx="0" cy="0" r="12" fill="none" stroke="#F43F5E" strokeWidth="1" opacity="0.6">
              <animate attributeName="r" values="5;14;5" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0.1;0.8" dur="1.8s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Animated Vehicle Dot */}
          <g transform={`translate(${currentX}, ${currentY})`}>
            <circle cx="0" cy="0" r="10" fill={activeBiome?.accentColor || '#38BDF8'} opacity="0.4" filter="blur(3px)" />
            <circle cx="0" cy="0" r="6" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
          </g>
        </svg>

        {/* Telemetry bottom chip */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '8px',
          right: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '6px 12px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(8, 14, 24, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          fontSize: '10px',
          fontFamily: 'var(--font-mono)'
        }}>
          <span style={{ color: activeBiome?.accentColor || '#38BDF8' }}>LIVE EXPEDITION</span>
          <span style={{ color: '#FFFFFF' }}>DIST: 840 KM</span>
          <span style={{ color: '#34D399' }}>PROGRESS: {Math.round(vehicleProgress * 100)}%</span>
        </div>
      </div>
    </div>
  );
}
