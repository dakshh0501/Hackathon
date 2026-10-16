import React, { useState } from 'react';
import { Search, Compass, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { DESTINATIONS } from '../data/immersiveDestinations';

/**
 * Animated Destination Search Interface
 * Integrated beside the Explorer companion.
 * Features:
 * - Prominent "Where do you want to explore?" input
 * - Instant suggestions (e.g. Jammu & Kashmir, Jaipur, Agra, Rishikesh, Udaipur, Varanasi)
 * - Clear error and loading state feedback
 */
export default function DestinationSearch({ onSearch, isLoading, searchError }) {
  const [query, setQuery] = useState('');

  const suggestions = [
    'Jammu & Kashmir',
    'Jaipur',
    'Agra',
    'Rishikesh',
    'Udaipur',
    'Varanasi'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleSuggestionClick = (destName) => {
    setQuery(destName);
    onSearch(destName);
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '680px',
      margin: '0 auto',
      animation: 'slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
    }}>
      {/* Explorer dialogue prompt */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        color: '#114232',
        padding: '7px 16px',
        borderRadius: '9999px',
        fontSize: '13px',
        fontWeight: 700,
        marginBottom: '16px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(212, 163, 115, 0.4)'
      }}>
        <Sparkles size={16} color="#D97706" />
        <span>Tell our Explorer where you'd love to wander...</span>
      </div>

      {/* Main Search Input Capsule */}
      <form onSubmit={handleSubmit} style={{ position: 'relative', marginBottom: '14px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: '9999px',
          padding: '8px 10px 8px 22px',
          boxShadow: '0 16px 36px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.8)',
          border: searchError ? '2px solid #E11D48' : '2px solid #E2D9CB',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', color: '#114232', marginRight: '14px' }}>
            <Compass size={24} className="rotating-compass" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Where do you want to explore?"
            autoFocus
            style={{
              flexGrow: 1,
              border: 'none',
              outline: 'none',
              fontSize: '18px',
              fontFamily: 'inherit',
              color: '#1C1E1B',
              backgroundColor: 'transparent',
              fontWeight: 500
            }}
          />

          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            style={{
              backgroundColor: '#114232',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '9999px',
              padding: '12px 28px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: isLoading || !query.trim() ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              opacity: isLoading || !query.trim() ? 0.7 : 1,
              boxShadow: '0 4px 14px rgba(17, 66, 50, 0.35)'
            }}
          >
            {isLoading ? (
              <span>Exploring...</span>
            ) : (
              <>
                <span>Unveil Destination</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>

        {/* Error notification banner if search failed */}
        {searchError && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '20px',
            marginTop: '8px',
            backgroundColor: '#FFE4E6',
            color: '#9F1239',
            padding: '8px 16px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 600,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>{searchError}</span>
          </div>
        )}
      </form>

      {/* Suggested Destination Quick-Pills */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <span style={{ fontSize: '13px', color: '#FAF6ED', fontWeight: 600, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
          Popular expeditions:
        </span>
        {suggestions.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => handleSuggestionClick(name)}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.82)',
              color: '#114232',
              border: '1px solid rgba(255,255,255,0.9)',
              borderRadius: '9999px',
              padding: '5px 14px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(6px)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.82)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
