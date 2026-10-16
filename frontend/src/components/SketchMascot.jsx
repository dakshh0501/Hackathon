import React, { useState } from 'react';

/**
 * Animated Duffel Backpack Mascot precisely drawn from the sketch:
 * - Rounded backpack shape with woven/knitted pattern stripes across dome
 * - Cute face in center (friendly eyes, button nose, wide happy smile)
 * - Two top handles / straps arching up
 * - Bottom legs / support stand
 * - Gentle bobbing and interactive wink/jump on hover
 */
export default function SketchMascot({ onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Click me to explore!"
      style={{
        width: '180px',
        height: '240px',
        cursor: 'pointer',
        userSelect: 'none',
        position: 'relative',
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: isHovered ? 'scale(1.08) translateY(-8px)' : 'scale(1) translateY(0)',
        filter: isHovered
          ? 'drop-shadow(0 15px 25px rgba(245, 158, 11, 0.45)) drop-shadow(0 0 10px rgba(255,255,255,0.5))'
          : 'drop-shadow(0 12px 20px rgba(0, 0, 0, 0.5))'
      }}
      className="sketch-mascot-float"
    >
      <svg
        viewBox="0 0 200 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="mascotBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FAF7F2" />
            <stop offset="60%" stopColor="#EFE8DB" />
            <stop offset="100%" stopColor="#DFD4C0" />
          </linearGradient>

          <linearGradient id="mascotSkin" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFE0C2" />
            <stop offset="100%" stopColor="#F5C49B" />
          </linearGradient>

          <linearGradient id="strapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5C3A21" />
            <stop offset="100%" stopColor="#3B2211" />
          </linearGradient>
        </defs>

        {/* 1. TOP CARRY STRAPS & LOOP (Arching out of backpack top) */}
        <g>
          {/* Left top strap loop */}
          <rect x="68" y="10" width="16" height="34" rx="6" fill="#F8F6F0" stroke="#33271E" strokeWidth="2.5" />
          <line x1="76" y1="12" x2="76" y2="40" stroke="#8C6D52" strokeWidth="1.5" strokeDasharray="3 2" />

          {/* Right top strap loop */}
          <rect x="116" y="10" width="16" height="34" rx="6" fill="#F8F6F0" stroke="#33271E" strokeWidth="2.5" />
          <line x1="124" y1="12" x2="124" y2="40" stroke="#8C6D52" strokeWidth="1.5" strokeDasharray="3 2" />

          {/* Center handle bar */}
          <path d="M 84 22 L 116 22" stroke="#33271E" strokeWidth="4" strokeLinecap="round" />
        </g>

        {/* 2. MAIN BACKPACK SILHOUETTE (Curved dome top & wider rounded bottom) */}
        <path
          d="M 40 100 C 40 45, 160 45, 160 100 L 175 200 C 175 225, 25 225, 25 200 Z"
          fill="url(#mascotBody)"
          stroke="#2B2118"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* 3. WOVEN PATTERNS ACROSS DOME (Exact matching sketch lines & stitches) */}
        {/* Arch stripe 1 */}
        <path d="M 46 80 C 46 54, 154 54, 154 80" stroke="#2B2118" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Dash pattern line */}
        <path d="M 44 92 C 44 65, 156 65, 156 92" stroke="#D97706" strokeWidth="3" strokeDasharray="5 3" fill="none" />
        {/* Arch stripe 2 */}
        <path d="M 40 106 C 40 76, 160 76, 160 106" stroke="#2B2118" strokeWidth="2.5" fill="none" />

        {/* Side stitch contours */}
        <line x1="33" y1="130" x2="42" y2="195" stroke="#2B2118" strokeWidth="2" strokeDasharray="4 2" />
        <line x1="167" y1="130" x2="158" y2="195" stroke="#2B2118" strokeWidth="2" strokeDasharray="4 2" />

        {/* 4. CUTE CHARACTER FACE PANEL IN CENTER (Exact like sketch) */}
        <g transform="translate(100, 148)">
          {/* Soft circular face cut-out */}
          <ellipse cx="0" cy="0" rx="36" ry="34" fill="url(#mascotSkin)" stroke="#2B2118" strokeWidth="2" />

          {/* Rosy blush cheeks */}
          <circle cx="-22" cy="6" r="6" fill="#F87171" opacity="0.6" />
          <circle cx="22" cy="6" r="6" fill="#F87171" opacity="0.6" />

          {/* Left Eye */}
          <ellipse cx="-13" cy="-4" rx="3.5" ry="5" fill="#1C130B" />
          <circle cx="-14" cy="-6" r="1.5" fill="#FFFFFF" />

          {/* Right Eye (Winks on hover) */}
          {isHovered ? (
            <path d="M 8 -4 Q 14 -10 20 -4" stroke="#1C130B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          ) : (
            <g>
              <ellipse cx="13" cy="-4" rx="3.5" ry="5" fill="#1C130B" />
              <circle cx="12" cy="-6" r="1.5" fill="#FFFFFF" />
            </g>
          )}

          {/* Tiny button nose */}
          <circle cx="0" cy="4" r="2" fill="#C47E53" />

          {/* Wide smiling mouth */}
          <path
            d="M -12 12 Q 0 24 12 12"
            stroke="#1C130B"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill={isHovered ? "#B91C1C" : "none"}
          />
        </g>

        {/* 5. BOTTOM POUCH WITH HORIZONTAL ZIPPER BANDS */}
        <path d="M 30 196 L 170 196" stroke="#2B2118" strokeWidth="3" />
        <path d="M 28 206 L 172 206" stroke="#D97706" strokeWidth="2.5" strokeDasharray="4 3" />
        <path d="M 26 214 L 174 214" stroke="#2B2118" strokeWidth="2" />

        {/* Brass zipper pull charm */}
        <rect x="42" y="196" width="10" height="15" rx="3" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />

        {/* 6. BOTTOM LITTLE FEET / STANDS */}
        <g>
          <path d="M 48 220 L 38 238 L 48 238" stroke="#2B2118" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 152 220 L 162 238 L 152 238" stroke="#2B2118" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}
