import React, { useState } from 'react';
import { ArrowLeft, Sparkles, MapPin, Eye, Compass, Heart, Share2 } from 'lucide-react';

/**
 * Animated Destination Gallery & Discovery Canvas
 * Renders destination-specific photographs, categories (places, crafts, food),
 * and layered expanding cards tailored to the searched place.
 * Never displays mobile/phone interfaces — pure desktop cinematic experience.
 */
export default function DestinationDiscoveryScene({ destination, onSearchAgain }) {
  const [activeCategory, setActiveCategory] = useState(destination.categories[0]?.id || 'places');
  const [previewItem, setPreviewItem] = useState(null);

  if (!destination) return null;

  const currentCategoryData = destination.categories.find(c => c.id === activeCategory) || destination.categories[0];

  return (
    <div style={{
      width: '100%',
      maxWidth: '1280px',
      margin: '0 auto',
      animation: 'fadeInScale 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      zIndex: 10,
      position: 'relative'
    }}>
      {/* Top Bar: Back to Search & Title Banner */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        padding: '16px 28px',
        borderRadius: '24px',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <button
            onClick={onSearchAgain}
            className="btn-secondary"
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 700,
              backgroundColor: '#114232',
              color: '#FFFFFF',
              border: 'none',
              boxShadow: '0 4px 12px rgba(17,66,50,0.25)'
            }}
          >
            <ArrowLeft size={16} />
            <span>Search Another Destination</span>
          </button>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                backgroundColor: 'rgba(217, 119, 6, 0.15)',
                color: '#B45309',
                padding: '3px 10px',
                borderRadius: '9999px'
              }}>
                Discovered Region
              </span>
              <h1 style={{
                fontSize: '28px',
                margin: 0,
                color: '#114232',
                fontFamily: 'Playfair Display, Georgia, serif',
                lineHeight: 1.1
              }}>
                {destination.name}
              </h1>
            </div>
            <p style={{ fontSize: '13px', color: '#6B7068', margin: '4px 0 0 0' }}>
              {destination.tagline}
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {destination.categories.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  backgroundColor: isActive ? '#114232' : 'rgba(243, 239, 230, 0.9)',
                  color: isActive ? '#FFFFFF' : '#1C1E1B',
                  border: '1px solid',
                  borderColor: isActive ? '#114232' : '#E7DFD3',
                  borderRadius: '9999px',
                  padding: '7px 16px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 12px rgba(17,66,50,0.2)' : 'none'
                }}
              >
                {cat.title.split('&')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Expansive Visual Gallery Stage */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '24px'
      }}>
        {currentCategoryData.items.map((item, idx) => (
          <div
            key={idx}
            className="destination-photo-card"
            style={{
              animationDelay: `${idx * 0.15}s`,
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.16)',
              border: '1px solid rgba(255, 255, 255, 0.9)',
              transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Cinematic Large Scenic Image */}
            <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)'
              }} />

              {/* Subtitle tag */}
              <div style={{
                position: 'absolute',
                bottom: '14px',
                left: '16px',
                color: '#FFFFFF'
              }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(6px)',
                  padding: '3px 8px',
                  borderRadius: '9999px',
                  display: 'inline-block',
                  marginBottom: '4px'
                }}>
                  {item.subtitle}
                </span>
                <h3 style={{
                  color: '#FFFFFF',
                  fontSize: '20px',
                  margin: 0,
                  fontFamily: 'Playfair Display, Georgia, serif',
                  textShadow: '0 2px 4px rgba(0,0,0,0.6)'
                }}>
                  {item.name}
                </h3>
              </div>
            </div>

            {/* Description & Narrative */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <p style={{
                fontSize: '14px',
                color: '#4A5048',
                lineHeight: 1.6,
                margin: '0 0 16px 0',
                flexGrow: 1
              }}>
                {item.desc}
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid #F0ECE1',
                paddingTop: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#114232', fontWeight: 600 }}>
                  <Sparkles size={14} color="#D97706" />
                  <span>Curated local insight</span>
                </div>

                <button
                  onClick={() => setPreviewItem(item)}
                  style={{
                    backgroundColor: '#F3EFE6',
                    border: '1px solid #E7DFD3',
                    borderRadius: '9999px',
                    padding: '5px 12px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#114232',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Eye size={13} />
                  <span>Expand Photo</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Modal Photo Preview if user clicks "Expand Photo" */}
      {previewItem && (
        <div
          onClick={() => setPreviewItem(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            animation: 'fadeIn 0.25s ease'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '880px',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              position: 'relative'
            }}
          >
            <img
              src={previewItem.image}
              alt={previewItem.name}
              style={{ width: '100%', maxHeight: '520px', objectFit: 'cover' }}
            />
            <div style={{ padding: '24px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#D97706', textTransform: 'uppercase', marginBottom: '4px' }}>
                {previewItem.subtitle}
              </div>
              <h2 style={{ fontSize: '26px', color: '#114232', margin: '0 0 10px 0', fontFamily: 'Playfair Display, Georgia, serif' }}>
                {previewItem.name}
              </h2>
              <p style={{ fontSize: '15px', color: '#4A5048', lineHeight: 1.6, margin: 0 }}>
                {previewItem.desc}
              </p>
            </div>
            <button
              onClick={() => setPreviewItem(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: '#FFF',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
