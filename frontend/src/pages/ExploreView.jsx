import React, { useState, useEffect } from 'react';
import { Search, Filter, Heart, Plus, Clock, MapPin, Check, Info } from 'lucide-react';
import { ATTRACTIONS, DESTINATIONS } from '../data/travelData';
import { api } from '../services/api';

export default function ExploreView({ 
  onAddToItinerary, 
  savedAttractions, 
  onToggleSave,
  selectedDayIndex,
  setSelectedDayIndex,
  totalTripDays,
  onViewDestination
}) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [cityFilter, setCityFilter] = useState('All');
  const [maxFeeFilter, setMaxFeeFilter] = useState('all');
  const [maxDurationFilter, setMaxDurationFilter] = useState('all');
  const [livePhotos, setLivePhotos] = useState({});

  const categories = ['All', 'Heritage', 'Culture', 'Spiritual', 'Nature'];
  const cities = ['All', 'Agra', 'Jaipur', 'Mathura & Vrindavan', 'Rishikesh', 'Udaipur', 'Varanasi'];

  // Dynamically fetch Unsplash photos for each attraction matching the city or famous landmark
  useEffect(() => {
    let isMounted = true;
    async function loadLivePhotos() {
      const neededAttractions = ATTRACTIONS.slice(0, 15);
      for (const item of neededAttractions) {
        if (!livePhotos[item.id]) {
          try {
            const query = `${item.city} ${item.name}`.trim();
            const photo = await api.getRandomPhoto(query);
            if (isMounted && photo?.url) {
              setLivePhotos(prev => ({
                ...prev,
                [item.id]: photo.regularUrl || photo.url
              }));
            }
          } catch (err) {
            // keep fallback
          }
        }
      }
    }
    loadLivePhotos();
    return () => { isMounted = false; };
  }, [cityFilter]);

  const filteredAttractions = ATTRACTIONS.filter(item => {
    const matchesSearch = (item.name + ' ' + item.city + ' ' + item.category + ' ' + item.description)
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesCity = cityFilter === 'All' || item.city === cityFilter;
    const matchesFee = maxFeeFilter === 'all' 
      ? true 
      : maxFeeFilter === '0' 
        ? item.fee === 0 
        : item.fee <= Number(maxFeeFilter);
    const matchesDuration = maxDurationFilter === 'all'
      ? true
      : item.durationHours <= Number(maxDurationFilter);

    return matchesSearch && matchesCategory && matchesCity && matchesFee && matchesDuration;
  });

  return (
    <div className="fade-in" style={{ maxWidth: '1400px', margin: '0 auto', padding: '30px 24px 80px', color: '#FFFFFF' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: 'var(--radius-pill)',
          background: 'rgba(56, 189, 248, 0.12)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          color: 'var(--accent-primary)',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: '12px'
        }}>
          <MapPin size={14} />
          <span>Explore India Sights</span>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 800,
          color: '#FFFFFF',
          marginBottom: '8px',
          letterSpacing: '-0.02em',
          textShadow: '0 2px 20px rgba(0,0,0,0.5)'
        }}>
          Attractions & Experiences
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '680px', lineHeight: 1.6 }}>
          Filter heritage forts, holy ghats, architectural wonders, and natural sanctuaries across India. Add them directly into your journey.
        </p>
      </div>

      {/* Control / Filter Bar */}
      <div className="glass-panel" style={{
        padding: '24px',
        marginBottom: '32px',
        background: 'rgba(8, 14, 24, 0.85)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: 'var(--radius-lg)'
      }}>
        {/* Search & Select Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '20px'
        }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '8px', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Search sight or keyword
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="e.g. Fort, Temple, Sunrise..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 16px 11px 40px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s, background 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--accent-primary)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.06)';
                }}
              />
              <Search size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '8px', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Destination / City
            </label>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '12px',
                background: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {cities.map(c => <option key={c} value={c} style={{ background: '#0B111E', color: '#FFF' }}>{c}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '8px', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Ticket Price
            </label>
            <select
              value={maxFeeFilter}
              onChange={(e) => setMaxFeeFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '12px',
                background: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="all" style={{ background: '#0B111E', color: '#FFF' }}>Any Ticket Price</option>
              <option value="0" style={{ background: '#0B111E', color: '#FFF' }}>Free Entry Only</option>
              <option value="100" style={{ background: '#0B111E', color: '#FFF' }}>Up to ₹100</option>
              <option value="350" style={{ background: '#0B111E', color: '#FFF' }}>Up to ₹350</option>
              <option value="1200" style={{ background: '#0B111E', color: '#FFF' }}>Up to ₹1,200</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '8px', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Estimated Duration
            </label>
            <select
              value={maxDurationFilter}
              onChange={(e) => setMaxDurationFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '12px',
                background: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="all" style={{ background: '#0B111E', color: '#FFF' }}>Any Visit Time</option>
              <option value="1.5" style={{ background: '#0B111E', color: '#FFF' }}>Up to 1.5 Hours</option>
              <option value="2.5" style={{ background: '#0B111E', color: '#FFF' }}>Up to 2.5 Hours</option>
              <option value="4" style={{ background: '#0B111E', color: '#FFF' }}>Up to 4 Hours</option>
            </select>
          </div>
        </div>

        {/* Category Pills & Target Day */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '18px'
        }}>
          {/* Categories */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(cat => {
              const isSelected = categoryFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  style={{
                    backgroundColor: isSelected ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.08)',
                    color: isSelected ? '#040608' : 'var(--text-primary)',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.15)',
                    padding: '7px 16px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: isSelected ? '0 0 16px rgba(56, 189, 248, 0.4)' : 'none'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Quick Target Day Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Add to Day:
            </span>
            <select
              value={selectedDayIndex || 0}
              onChange={(e) => setSelectedDayIndex && setSelectedDayIndex(Number(e.target.value))}
              style={{
                padding: '7px 14px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                background: 'rgba(15, 23, 42, 0.95)',
                fontWeight: 600,
                fontSize: '13px',
                color: 'var(--accent-primary)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {Array.from({ length: totalTripDays || 3 }).map((_, i) => (
                <option key={i} value={i} style={{ background: '#0B111E', color: '#FFF' }}>Day {i + 1}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count & Reset */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Showing <b style={{ color: '#FFFFFF' }}>{filteredAttractions.length}</b> places of interest
        </p>
        {(search || categoryFilter !== 'All' || cityFilter !== 'All' || maxFeeFilter !== 'all' || maxDurationFilter !== 'all') && (
          <button
            onClick={() => {
              setSearch('');
              setCategoryFilter('All');
              setCityFilter('All');
              setMaxFeeFilter('all');
              setMaxDurationFilter('all');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-primary)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Attractions Grid */}
      {filteredAttractions.length === 0 ? (
        <div className="glass-panel" style={{
          padding: '60px 20px',
          textAlign: 'center',
          background: 'rgba(8, 14, 24, 0.7)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <Info size={36} color="var(--accent-primary)" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '20px', marginBottom: '6px', color: '#FFFFFF' }}>No attractions found</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '400px', margin: '0 auto 16px' }}>
            We couldn't find any sights matching your specific criteria. Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
          gap: '24px'
        }}>
          {filteredAttractions.map(attraction => {
            const isSaved = savedAttractions.includes(attraction.id);
            return (
              <div
                key={attraction.id}
                className="glass-panel"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  background: 'rgba(8, 14, 24, 0.8)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: 'var(--radius-lg)',
                  transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.6), 0 0 20px rgba(56, 189, 248, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Photo & Badge */}
                <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                  <img
                    src={livePhotos[attraction.id] || attraction.image}
                    alt={attraction.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(8, 14, 24, 0.9) 0%, transparent 50%)'
                  }} />

                  {/* Category and city badge */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    display: 'flex',
                    gap: '6px'
                  }}>
                    <span style={{
                      backgroundColor: 'rgba(8, 14, 24, 0.85)',
                      backdropFilter: 'blur(8px)',
                      color: 'var(--accent-primary)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-pill)'
                    }}>
                      {attraction.city}
                    </span>
                    <span style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      backdropFilter: 'blur(8px)',
                      color: '#FFFFFF',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-pill)'
                    }}>
                      {attraction.category}
                    </span>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => onToggleSave(attraction.id)}
                    aria-label={`Save ${attraction.name}`}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(8, 14, 24, 0.75)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                      transition: 'transform 0.15s ease, background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    <Heart
                      size={18}
                      color={isSaved ? "var(--accent-danger)" : "rgba(255, 255, 255, 0.7)"}
                      fill={isSaved ? "var(--accent-danger)" : "none"}
                    />
                  </button>
                </div>

                {/* Details */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{
                    fontSize: '19px',
                    fontWeight: 700,
                    marginBottom: '8px',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-display)'
                  }}>
                    {attraction.name}
                  </h3>
                  
                  <p style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    marginBottom: '16px',
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {attraction.description}
                  </p>

                  {/* Price & Duration Stats */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    marginBottom: '14px',
                    fontSize: '13px'
                  }}>
                    <div style={{ fontWeight: 700, color: 'var(--accent-success)' }}>
                      {attraction.fee === 0 ? 'Free Entry' : `₹${attraction.fee.toLocaleString('en-IN')} ticket`}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-secondary)' }}>
                      <Clock size={13} color="var(--accent-primary)" />
                      <span>{attraction.durationHours} hrs visit</span>
                    </div>
                  </div>

                  {/* Accessibility info snippet */}
                  <div style={{
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    marginBottom: '18px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '4px'
                  }}>
                    <span style={{ color: 'var(--accent-warning)', fontWeight: 600 }}>Access:</span>
                    <span>{attraction.access}</span>
                  </div>

                  {/* Action buttons */}
                  <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => onAddToItinerary(attraction, selectedDayIndex || 0)}
                      className="glass-interactive"
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-pill)',
                        background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.3) 0%, rgba(14, 165, 233, 0.15) 100%)',
                        border: '1px solid rgba(56, 189, 248, 0.4)',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '13px'
                      }}
                    >
                      <Plus size={15} color="var(--accent-primary)" />
                      <span>Add to Itinerary</span>
                    </button>
                    {onViewDestination && (
                      <button
                        onClick={() => onViewDestination(attraction.city)}
                        className="glass-interactive"
                        style={{
                          padding: '10px 14px',
                          borderRadius: 'var(--radius-pill)',
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: 'var(--text-primary)',
                          fontSize: '12px',
                          fontWeight: 600
                        }}
                        title={`View ${attraction.city}`}
                      >
                        <MapPin size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
