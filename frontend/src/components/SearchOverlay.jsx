import React, { useState } from 'react';
import { Search, Compass, Sparkles, ArrowRight, X } from 'lucide-react';
import { SKETCH_BIOMES } from '../data/sketchBiomes';

/**
 * Center "Search Overlay"
 * Centered horizontally across Columns 3 & 4 (Mountain & Forest), exactly as drawn in the sketch.
 * Floating glass capsule allowing discovery of any biome or destination.
 */
export default function SearchOverlay({ onSearch, activeBiome, searchError }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 60,
        width: 'min(640px, 90vw)',
        pointerEvents: 'auto'
      }}
    >
      <form onSubmit={handleSubmit}>
        <div
          className="glass-elevated"
          style={{
            padding: '8px 12px 8px 22px',
            borderRadius: '9999px',
            backgroundColor: isFocused ? 'rgba(8, 14, 24, 0.95)' : 'rgba(8, 14, 24, 0.75)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: isFocused ? '2px solid var(--accent-primary)' : '1px solid rgba(255, 255, 255, 0.22)',
            boxShadow: isFocused ? '0 0 35px rgba(56, 189, 248, 0.35), 0 20px 48px rgba(0,0,0,0.6)' : '0 16px 40px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', color: 'var(--accent-primary)' }}>
            <Compass size={22} className="rotating-compass" />
          </div>

          <input
            type="text"
            placeholder="Search"
            value={query}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flexGrow: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#FFFFFF',
              fontSize: '15px',
              fontFamily: 'inherit',
              fontWeight: 500
            }}
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: '4px' }}
            >
              <X size={16} />
            </button>
          )}

          <button
            type="submit"
            className="glass-interactive"
            style={{
              padding: '10px 22px',
              borderRadius: '9999px',
              backgroundColor: 'var(--accent-primary)',
              color: '#040608',
              fontWeight: 800,
              fontSize: '13px',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Explore</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </form>

      {/* Invalid Location Warning Message */}
      {searchError && (
        <div style={{
          marginTop: '12px',
          textAlign: 'center',
          backgroundColor: 'rgba(225, 29, 72, 0.9)',
          color: '#FFFFFF',
          padding: '8px 18px',
          borderRadius: '9999px',
          fontSize: '13px',
          fontWeight: 700,
          boxShadow: '0 8px 24px rgba(225, 29, 72, 0.4)',
          backdropFilter: 'blur(10px)',
          animation: 'slideUpFade 0.3s ease',
          display: 'inline-block',
          marginLeft: '50%',
          transform: 'translateX(-50%)'
        }}>
          ⚠️ {searchError}
        </div>
      )}
    </div>
  );
}
