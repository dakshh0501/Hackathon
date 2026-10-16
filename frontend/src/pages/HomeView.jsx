import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, Compass, Sparkles, MapPin, Calendar, Clock, Star, Users } from 'lucide-react';
import { DESTINATIONS as FALLBACK_DESTINATIONS } from '../data/travelData';
import { api } from '../services/api';

export default function HomeView({ onSelectDestination, onPlanTrip, onExploreAll }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [destinations, setDestinations] = useState(FALLBACK_DESTINATIONS);

  useEffect(() => {
    async function loadBackendDestinations() {
      try {
        const liveDests = await api.getDestinations();
        if (Array.isArray(liveDests) && liveDests.length > 0) {
          // Map backend destinations to match HomeView schema
          const formatted = liveDests.map((d) => ({
            id: d.id,
            slug: d.slug,
            name: d.name,
            state: d.state,
            tagline: d.tagline,
            description: d.description,
            coverImage: d.heroImage || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80',
            baseCostPerDay: 4500,
            idealDays: 3,
            highlights: ['Heritage Landmark', 'Cultural Heritage', 'Architecture'],
          }));
          setDestinations(formatted);
        }
      } catch (err) {
        console.warn('Backend destinations fallback:', err);
      }
    }
    loadBackendDestinations();
  }, []);

  const filteredDestinations = destinations.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (d.tagline && d.tagline.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="fade-in">
      {/* Editorial Hero Section */}
      <section style={{
        position: 'relative',
        padding: '60px 0 80px',
        overflow: 'hidden'
      }}>
        {/* Background accent decor */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212, 163, 115, 0.15) 0%, rgba(251, 249, 244, 0) 70%)',
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        <div className="app-container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '50px',
            alignItems: 'center'
          }}>
            {/* Hero Left Content */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--forest-green-light)',
                color: 'var(--forest-green)',
                fontSize: '13px',
                fontWeight: 600,
                marginBottom: '20px'
              }}>
                <Sparkles size={15} color="var(--terracotta)" />
                <span>Curated Multi-Day Journeys Across India</span>
              </div>

              <h1 style={{
                fontSize: 'clamp(40px, 5.2vw, 64px)',
                lineHeight: 1.08,
                marginBottom: '24px',
                color: 'var(--forest-green)',
                fontWeight: 800
              }}>
                Discover India's heritage, <span style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>day by day.</span>
              </h1>

              <p style={{
                fontSize: '18px',
                lineHeight: 1.6,
                color: 'var(--text-muted)',
                maxWidth: '540px',
                marginBottom: '36px'
              }}>
                TravelTales is your local tourism companion for exploring vibrant palaces, sacred ghats, and hill retreats. Effortlessly craft day-wise itineraries with real-time budget forecasting.
              </p>

              {/* Integrated Destination Quick Search */}
              <div style={{
                background: '#FFFFFF',
                padding: '8px 12px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-line)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                maxWidth: '560px',
                marginBottom: '28px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '8px', color: 'var(--text-muted)' }}>
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Where would you like to travel? (e.g., Jaipur, Agra, Rishikesh)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    fontSize: '15px',
                    color: 'var(--text-main)',
                    background: 'transparent'
                  }}
                />
                <button
                  onClick={() => onPlanTrip()}
                  className="btn-primary"
                  style={{ whiteSpace: 'nowrap', padding: '10px 22px' }}
                >
                  <span>Plan My Trip</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              {/* Quick statistics / trust marks */}
              <div style={{ display: 'flex', gap: '32px', borderTop: '1px solid var(--border-line)', paddingTop: '20px' }}>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--forest-green)', fontFamily: 'var(--font-serif)' }}>6+</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Curated Regions</div>
                </div>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--forest-green)', fontFamily: 'var(--font-serif)' }}>18+</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Monuments & Sights</div>
                </div>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--forest-green)', fontFamily: 'var(--font-serif)' }}>100%</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Transparent Pricing</div>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Feature Card */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border-line)',
                height: '480px'
              }}>
                <img
                  src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80"
                  alt="Jaipur Royal Palace"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(17,66,50,0.92) 0%, rgba(17,66,50,0.2) 50%, rgba(0,0,0,0) 100%)'
                }} />

                <div style={{
                  position: 'absolute',
                  bottom: '28px',
                  left: '28px',
                  right: '28px',
                  color: '#FFFFFF'
                }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(255,255,255,0.25)',
                    backdropFilter: 'blur(8px)',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '8px'
                  }}>
                    Featured Destination
                  </div>
                  <h3 style={{ color: '#FFFFFF', fontSize: '28px', marginBottom: '6px' }}>Jaipur, Rajasthan</h3>
                  <p style={{ fontSize: '14px', color: '#E0EDE7', marginBottom: '16px', lineHeight: 1.4 }}>
                    Step through the terracotta gates into majestic courtyards, mirror palaces, and hilltop fortresses.
                  </p>
                  <button
                    onClick={() => onSelectDestination(DESTINATIONS.find(d => d.id === 'jaipur'))}
                    style={{
                      background: '#FFFFFF',
                      color: 'var(--forest-green)',
                      border: 'none',
                      borderRadius: 'var(--radius-full)',
                      padding: '8px 18px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>View Destination Guide</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations Grid */}
      <section style={{ padding: '40px 0 80px', backgroundColor: 'var(--bg-subtle)' }}>
        <div className="app-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px' }}>
            <div>
              <span className="editorial-chip" style={{ marginBottom: '10px' }}>
                Iconic Escapes
              </span>
              <h2 style={{ fontSize: '36px', color: 'var(--forest-green)' }}>
                Featured Destinations in India
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
                Handpicked regions combining heritage, architecture, spirituality, and timeless culture.
              </p>
            </div>
            <button
              onClick={onExploreAll}
              className="btn-secondary"
            >
              <span>Explore All Destinations</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '28px'
          }}>
            {filteredDestinations.slice(0, 6).map((dest) => (
              <div
                key={dest.id}
                className="editorial-card"
                style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                {/* Image */}
                <div 
                  style={{ position: 'relative', height: '230px', overflow: 'hidden' }}
                  className="group destination-image-container"
                >
                  <img
                    src={dest.coverImage}
                    alt={dest.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                  />

                  {/* Hover Place Name Overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(17,66,50,0.85) 0%, rgba(17,66,50,0.2) 60%, transparent 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '20px',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none'
                  }}
                  className="hover-place-name-overlay"
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                  >
                    <div style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      color: 'var(--forest-green)',
                      fontWeight: 700,
                      fontSize: '14px',
                      alignSelf: 'flex-start',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }}>
                      📍 {dest.name}, {dest.state}
                    </div>
                  </div>

                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: 'rgba(251, 249, 244, 0.92)',
                    backdropFilter: 'blur(6px)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--forest-green)'
                  }}>
                    {dest.state}
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    backgroundColor: 'var(--forest-green)',
                    color: '#FFFFFF',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '12px',
                    fontWeight: 600
                  }}>
                    ~₹{dest.baseCostPerDay.toLocaleString('en-IN')}/day
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '22px', margin: 0 }}>{dest.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--text-muted)' }}>
                      <Clock size={14} />
                      <span>{dest.idealDays} Days</span>
                    </div>
                  </div>

                  <p style={{
                    fontSize: '14px',
                    color: 'var(--text-muted)',
                    marginBottom: '16px',
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {dest.tagline}
                  </p>

                  {/* Highlights Pill list */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                    {dest.highlights.slice(0, 2).map((h, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '11px',
                          background: 'var(--bg-subtle)',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          color: 'var(--text-main)'
                        }}
                      >
                        • {h}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => onSelectDestination(dest)}
                      className="btn-secondary"
                      style={{ flex: 1, padding: '8px 14px', fontSize: '13px' }}
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onPlanTrip(dest.name)}
                      className="btn-primary"
                      style={{ flex: 1, padding: '8px 14px', fontSize: '13px' }}
                    >
                      Plan Itinerary
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
