import React from 'react';

/**
 * Animated Explorer Character
 * Represents a friendly travel guide in safari khaki hat, binoculars, and adventurer attire.
 * States:
 * - 'ENTERING': Steps out smoothly to reveal the search bar
 * - 'IDLE': Gentle bobbing and looking around
 * - 'SEARCHING': Looking through brass binoculars
 * - 'DISCOVERY': Cheerful gesture pointing towards the discovered destination images
 */
export default function ExplorerCharacter({ state = 'IDLE' }) {
  const isDiscovering = state === 'DISCOVERY';
  const isSearching = state === 'SEARCHING';

  return (
    <div
      style={{
        position: 'relative',
        width: '180px',
        height: '240px',
        userSelect: 'none',
        pointerEvents: 'none',
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
      className={`explorer-${state.toLowerCase()}`}
    >
      <svg
        viewBox="0 0 200 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="skinTone" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFDCB6" />
            <stop offset="100%" stopColor="#F3B988" />
          </linearGradient>

          <linearGradient id="khakiHat" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4C29A" />
            <stop offset="100%" stopColor="#A89670" />
          </linearGradient>

          <linearGradient id="explorerJacket" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2E6B56" />
            <stop offset="100%" stopColor="#1B4637" />
          </linearGradient>

          <linearGradient id="brassBinoculars" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="50%" stopColor="#FFB300" />
            <stop offset="100%" stopColor="#C67D00" />
          </linearGradient>
        </defs>

        {/* 1. SHADOW UNDER EXPLORER */}
        <ellipse cx="100" cy="245" rx="45" ry="10" fill="rgba(0, 0, 0, 0.25)" />

        {/* 2. LEGS & BOOTS */}
        <g>
          {/* Left leg */}
          <rect x="76" y="175" width="16" height="45" rx="6" fill="#6A5138" />
          {/* Right leg */}
          <rect x="108" y="175" width="16" height="45" rx="6" fill="#58422C" />

          {/* Left leather hiking boot */}
          <path d="M 68 215 L 94 215 L 94 235 L 64 235 Q 64 225 68 215 Z" fill="#362215" />
          <line x1="64" y1="235" x2="96" y2="235" stroke="#1F130B" strokeWidth="3" />

          {/* Right leather hiking boot */}
          <path d="M 106 215 L 132 215 L 136 225 Q 136 235 106 235 L 106 215 Z" fill="#362215" />
          <line x1="104" y1="235" x2="138" y2="235" stroke="#1F130B" strokeWidth="3" />
        </g>

        {/* 3. BODY & KHAKI SAFARI JACKET */}
        <g>
          {/* Jacket body */}
          <path
            d="M 68 115 C 68 105, 132 105, 132 115 L 138 180 C 138 185, 62 185, 62 180 Z"
            fill="url(#explorerJacket)"
          />
          {/* Collar */}
          <path d="M 85 110 L 100 125 L 115 110 Z" fill="#E8D5B5" />
          <path d="M 80 110 L 100 130 L 88 140 Z" fill="#205343" />
          <path d="M 120 110 L 100 130 L 112 140 Z" fill="#1B4637" />

          {/* Center jacket line & buttons */}
          <line x1="100" y1="130" x2="100" y2="180" stroke="#143A2D" strokeWidth="2" />
          <circle cx="100" cy="142" r="2.5" fill="#FFE082" />
          <circle cx="100" cy="156" r="2.5" fill="#FFE082" />
          <circle cx="100" cy="170" r="2.5" fill="#FFE082" />

          {/* Leather utility belt & pouch */}
          <rect x="64" y="166" width="72" height="10" rx="3" fill="#42291A" />
          <rect x="94" y="164" width="12" height="14" rx="2" fill="url(#brassBinoculars)" />
          {/* Small compass pouch on belt */}
          <rect x="114" y="168" width="14" height="14" rx="3" fill="#5A3A26" stroke="#2B180D" strokeWidth="1" />
        </g>

        {/* 4. HEAD & FRIENDLY FACE */}
        <g>
          {/* Neck */}
          <rect x="92" y="98" width="16" height="15" fill="url(#skinTone)" />

          {/* Head */}
          <ellipse cx="100" cy="85" rx="26" ry="26" fill="url(#skinTone)" />

          {/* Cheerful blush cheeks */}
          <circle cx="83" cy="94" r="6" fill="#FFA69E" opacity="0.65" />
          <circle cx="117" cy="94" r="6" fill="#FFA69E" opacity="0.65" />

          {/* Eyes */}
          <circle cx="88" cy="85" r="4.5" fill="#1C140D" />
          <circle cx="86.5" cy="83.5" r="1.5" fill="#FFFFFF" />

          <circle cx="112" cy="85" r="4.5" fill="#1C140D" />
          <circle cx="110.5" cy="83.5" r="1.5" fill="#FFFFFF" />

          {/* Eyebrows */}
          <path d="M 83 77 Q 88 74 93 77" stroke="#633917" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 107 77 Q 112 74 117 77" stroke="#633917" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Happy smile */}
          <path
            d={isDiscovering ? "M 92 94 Q 100 106 108 94 Z" : "M 93 94 Q 100 101 107 94"}
            stroke="#633917"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill={isDiscovering ? "#B3261E" : "none"}
          />
        </g>

        {/* 5. KHAKI SAFARI EXPEDITION HAT */}
        <g>
          {/* Wide brim */}
          <ellipse cx="100" cy="68" rx="42" ry="14" fill="url(#khakiHat)" stroke="#7A6844" strokeWidth="2" />
          {/* Hat dome crown */}
          <path d="M 72 66 C 72 40, 128 40, 128 66 Z" fill="url(#khakiHat)" />
          {/* Hat band ribbon */}
          <path d="M 72 63 Q 100 68 128 63" stroke="#9C441E" strokeWidth="5" fill="none" />
          {/* Map tucked in hat band */}
          <polygon points="116,56 126,50 124,62 116,62" fill="#FAF6EE" stroke="#C4A47C" strokeWidth="1" />
        </g>

        {/* 6. ARMS & ACCESSORIES */}
        {isDiscovering ? (
          /* Presentation / Welcome Discovery Arms */
          <g className="explorer-discovery-gesture">
            {/* Left arm welcoming upwards */}
            <path d="M 68 118 Q 45 105 35 85" stroke="#2E6B56" strokeWidth="12" strokeLinecap="round" fill="none" />
            <circle cx="33" cy="82" r="8" fill="url(#skinTone)" />

            {/* Right arm gesturing wide towards destination cards */}
            <path d="M 132 118 Q 155 105 175 90" stroke="#2E6B56" strokeWidth="12" strokeLinecap="round" fill="none" />
            <circle cx="178" cy="88" r="8" fill="url(#skinTone)" />
          </g>
        ) : isSearching ? (
          /* Holding brass binoculars up to eyes */
          <g>
            <path d="M 68 122 Q 80 100 90 85" stroke="#2E6B56" strokeWidth="11" strokeLinecap="round" fill="none" />
            <path d="M 132 122 Q 120 100 110 85" stroke="#2E6B56" strokeWidth="11" strokeLinecap="round" fill="none" />

            {/* Brass Binoculars over eyes */}
            <rect x="80" y="78" width="16" height="22" rx="4" fill="url(#brassBinoculars)" />
            <rect x="104" y="78" width="16" height="22" rx="4" fill="url(#brassBinoculars)" />
            <rect x="94" y="85" width="12" height="6" rx="2" fill="#333" />
            <circle cx="88" cy="98" r="6" fill="#60A5FA" opacity="0.8" />
            <circle cx="112" cy="98" r="6" fill="#60A5FA" opacity="0.8" />
          </g>
        ) : (
          /* Natural resting idle pose with map roll in left hand */
          <g>
            {/* Left arm holding rolled travel map */}
            <path d="M 68 120 Q 55 145 60 165" stroke="#2E6B56" strokeWidth="12" strokeLinecap="round" fill="none" />
            <circle cx="60" cy="165" r="7" fill="url(#skinTone)" />
            {/* Rolled parchment map */}
            <rect x="52" y="156" width="16" height="26" rx="3" fill="#FBF5E5" stroke="#C4A47C" strokeWidth="1.5" transform="rotate(15 52 156)" />

            {/* Right arm waving gently */}
            <path d="M 132 120 Q 148 135 142 155" stroke="#2E6B56" strokeWidth="12" strokeLinecap="round" fill="none" />
            <circle cx="142" cy="155" r="7" fill="url(#skinTone)" />
          </g>
        )}
      </svg>
    </div>
  );
}
