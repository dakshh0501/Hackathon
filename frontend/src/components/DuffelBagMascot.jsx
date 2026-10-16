import React, { useState } from 'react';

/**
 * Animated Duffel Bag Mascot
 * Features:
 * - Expressive cute face (blinking eyes, happy smile, blush cheeks)
 * - Animated straps, metallic brass zipper pulls, swinging vintage camera & baggage tag keychains
 * - Natural idle bobbing and breathing motion
 * - Interactive hover reactions and click transition
 * - Transitions smoothly from center (Welcome) to side companion (Search & Discovery)
 */
export default function DuffelBagMascot({ isSidebar, onClick, activeScene }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWinking, setIsWinking] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsWinking(true);
    setTimeout(() => setIsWinking(false), 1200);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
        width: isSidebar ? '150px' : '300px',
        height: isSidebar ? '140px' : '280px',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: isHovered 
          ? 'drop-shadow(0 20px 30px rgba(212, 163, 115, 0.45)) drop-shadow(0 4px 10px rgba(0,0,0,0.3))' 
          : 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.35))'
      }}
      className={isSidebar ? 'bag-sidebar-float' : 'bag-center-float'}
    >
      <svg
        viewBox="0 0 320 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: '100%',
          overflow: 'visible',
          transform: isHovered && !isSidebar ? 'scale(1.05) rotate(-2deg)' : 'scale(1) rotate(0deg)',
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        <defs>
          {/* Gradients for rich canvas duffel leather & texture */}
          <linearGradient id="bagBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D97746" />
            <stop offset="50%" stopColor="#B8562B" />
            <stop offset="100%" stopColor="#8C3A16" />
          </linearGradient>

          <linearGradient id="bagHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EA9268" />
            <stop offset="100%" stopColor="#9C441E" />
          </linearGradient>

          <linearGradient id="leatherStrap" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4A2E1B" />
            <stop offset="100%" stopColor="#2E1A0C" />
          </linearGradient>

          <linearGradient id="brassZipper" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="50%" stopColor="#FFB300" />
            <stop offset="100%" stopColor="#FFA000" />
          </linearGradient>

          {/* Shadow filter */}
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. TOP CARRY HANDLES (Arching with natural sway) */}
        <g className="bag-handle-sway">
          <path
            d="M 90 95 C 90 20, 230 20, 230 95"
            stroke="url(#leatherStrap)"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 125 40 C 135 30, 185 30, 195 40"
            stroke="#6B4226"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
          />
          {/* Handle stitching */}
          <path
            d="M 95 90 C 95 28, 225 28, 225 90"
            stroke="#D4A373"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            fill="none"
          />
        </g>

        {/* 2. DUFFEL BAG MAIN BARREL BODY */}
        {/* Main curved duffel cylinder */}
        <rect
          x="35"
          y="85"
          width="250"
          height="145"
          rx="52"
          fill="url(#bagBodyGrad)"
          stroke="#5A230B"
          strokeWidth="3"
        />

        {/* Top cylinder curvature cap */}
        <ellipse
          cx="160"
          cy="92"
          rx="115"
          ry="24"
          fill="url(#bagHighlight)"
          opacity="0.5"
        />

        {/* Side barrel cap (Left) */}
        <ellipse
          cx="48"
          cy="158"
          rx="18"
          ry="65"
          fill="#7A2D0D"
          stroke="#4D1905"
          strokeWidth="2.5"
        />

        {/* Side barrel cap (Right) */}
        <ellipse
          cx="272"
          cy="158"
          rx="18"
          ry="65"
          fill="#943912"
          stroke="#4D1905"
          strokeWidth="2.5"
        />

        {/* 3. LEATHER REINFORCEMENT STRAPS & BRASS BUCKLES */}
        {/* Left Vertical Strap */}
        <rect
          x="88"
          y="85"
          width="20"
          height="145"
          fill="url(#leatherStrap)"
          rx="3"
        />
        <line x1="91" y1="88" x2="91" y2="227" stroke="#D4A373" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="105" y1="88" x2="105" y2="227" stroke="#D4A373" strokeWidth="1" strokeDasharray="3 2" />
        {/* Brass buckle left */}
        <rect x="85" y="115" width="26" height="14" rx="3" fill="url(#brassZipper)" stroke="#B78103" strokeWidth="1.5" />

        {/* Right Vertical Strap */}
        <rect
          x="212"
          y="85"
          width="20"
          height="145"
          fill="url(#leatherStrap)"
          rx="3"
        />
        <line x1="215" y1="88" x2="215" y2="227" stroke="#D4A373" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="229" y1="88" x2="229" y2="227" stroke="#D4A373" strokeWidth="1" strokeDasharray="3 2" />
        {/* Brass buckle right */}
        <rect x="209" y="115" width="26" height="14" rx="3" fill="url(#brassZipper)" stroke="#B78103" strokeWidth="1.5" />

        {/* Center Zipper Line */}
        <line x1="45" y1="92" x2="275" y2="92" stroke="#5E260F" strokeWidth="4" />
        <line x1="45" y1="92" x2="275" y2="92" stroke="url(#brassZipper)" strokeWidth="2.5" strokeDasharray="3 2" />

        {/* 4. ANIMATED KEYCHAINS (Luggage tag + mini globe tag) */}
        <g className="bag-keychain-sway">
          {/* Ring */}
          <circle cx="80" cy="118" r="6" stroke="url(#brassZipper)" strokeWidth="2" fill="none" />
          <line x1="80" y1="124" x2="72" y2="152" stroke="#4A2E1B" strokeWidth="2" />
          {/* Leather luggage Tag */}
          <g transform="translate(60, 150) rotate(-6)">
            <rect x="0" y="0" width="24" height="38" rx="4" fill="#F8FAFC" stroke="#C4A47C" strokeWidth="1.5" />
            <circle cx="12" cy="6" r="2.5" fill="#4A2E1B" />
            {/* Tag text lines */}
            <line x1="4" y1="14" x2="20" y2="14" stroke="#114232" strokeWidth="2" strokeLinecap="round" />
            <line x1="4" y1="20" x2="16" y2="20" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="4" y1="26" x2="18" y2="26" stroke="#C85A32" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </g>

        {/* Second Zipper Pull Charm */}
        <g className="bag-zipper-pull" transform="translate(180, 88)">
          <path d="M 0 0 L 0 16 L 6 22 L 12 16 L 12 0 Z" fill="url(#brassZipper)" stroke="#B78103" strokeWidth="1" />
          <circle cx="6" cy="7" r="2" fill="#5A230B" />
        </g>

        {/* 5. CUTE LIVING CHARACTER FACE */}
        <g className="bag-face">
          {/* Cheerful blush circles */}
          <circle cx="126" cy="168" r="9" fill="#FFA69E" opacity="0.75" />
          <circle cx="194" cy="168" r="9" fill="#FFA69E" opacity="0.75" />

          {/* Left Eye */}
          <g className="bag-eye">
            <ellipse cx="135" cy="152" rx="7.5" ry="9" fill="#1C140D" />
            {/* Eye sparkle highlights */}
            <circle cx="132.5" cy="148.5" r="3" fill="#FFFFFF" />
            <circle cx="137.5" cy="154.5" r="1.5" fill="#FFFFFF" />
          </g>

          {/* Right Eye (Winks on hover!) */}
          {isWinking ? (
            <path
              d="M 178 154 Q 185 146 192 154"
              stroke="#1C140D"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            <g className="bag-eye">
              <ellipse cx="185" cy="152" rx="7.5" ry="9" fill="#1C140D" />
              {/* Eye sparkle highlights */}
              <circle cx="182.5" cy="148.5" r="3" fill="#FFFFFF" />
              <circle cx="187.5" cy="154.5" r="1.5" fill="#FFFFFF" />
            </g>
          )}

          {/* Cute Smile Mouth */}
          <path
            d={isHovered ? "M 150 162 Q 160 176 170 162" : "M 152 163 Q 160 172 168 163"}
            stroke="#1C140D"
            strokeWidth="3"
            strokeLinecap="round"
            fill={isHovered ? "#B3261E" : "none"}
          />
        </g>

        {/* Vintage Travel Stamp Patch on Duffel */}
        <g transform="translate(138, 192) rotate(-3)">
          <rect x="0" y="0" width="44" height="22" rx="3" fill="#FDF8F0" stroke="#114232" strokeWidth="1.5" strokeDasharray="3 1.5" />
          <text x="5" y="14" fill="#114232" fontSize="9" fontWeight="800" fontFamily="sans-serif">EXPLORE</text>
        </g>
      </svg>
    </div>
  );
}
