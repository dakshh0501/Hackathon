import React, { useState } from 'react';
import { Search, Filter, Heart, Plus, Clock, MapPin, Check, Info } from 'lucide-react';
import { ATTRACTIONS, DESTINATIONS } from '../data/travelData';

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

  const categories = ['All', 'Heritage', 'Culture', 'Spiritual', 'Nature'];
  const cities = ['All', 'Agra', 'Jaipur', 'Mathura & Vrindavan', 'Rishikesh', 'Udaipur', 'Varanasi'];

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
    <div className="fade-in app-container" style={{ padding: '40px 20px 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <span className="editorial-chip" style={{ marginBottom: '8px' }}>Explore India</span>
        <h1 style={{ fontSize: '38px', color: 'var(--forest-green)', marginBottom: '8px' }}>
          Attractions & Experiences
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
          Filter heritage sites, ghats, and adventures. Add them directly into your day-by-day plan.
        </p>
      </div>

      {/* Control / Filter Bar */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--border-line)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        marginBottom: '32px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Search & Select Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '20px'
        }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: 'var(--forest-green)' }}>
              Search sight or keyword
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. Fort, Temple, Sunrise..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: '38px' }}
              />
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--text-muted)' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: 'var(--forest-green)' }}>
              Destination / City
            </label>
            <select
              className="input-field"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            >
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: 'var(--forest-green)' }}>
              Ticket Price
            </label>
            <select
              className="input-field"
              value={maxFeeFilter}
              onChange={(e) => setMaxFeeFilter(e.target.value)}
            >
              <option value="all">Any Ticket Price</option>
              <option value="0">Free Entry Only</option>
              <option value="100">Up to ₹100</option>
              <option value="350">Up to ₹350</option>
              <option value="1200">Up to ₹1,200</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: 'var(--forest-green)' }}>
              Estimated Duration
            </label>
            <select
              className="input-field"
              value={maxDurationFilter}
              onChange={(e) => setMaxDurationFilter(e.target.value)}
            >
              <option value="all">Any Visit Time</option>
              <option value="1.5">Up to 1.5 Hours</option>
              <option value="2.5">Up to 2.5 Hours</option>
              <option value="4">Up to 4 Hours</option>
            </select>
          </div>
        </div>

        {/* Category Pills & Quick Add Target Day */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          borderTop: '1px solid var(--border-line)',
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
                    backgroundColor: isSelected ? 'var(--forest-green)' : 'var(--bg-subtle)',
                    color: isSelected ? '#FFFFFF' : 'var(--text-main)',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--forest-green)' : 'var(--border-line)',
                    padding: '6px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Quick Target Day Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--forest-green)' }}>
              Add to Itinerary:
            </span>
            <select
              value={selectedDayIndex}
              onChange={(e) => setSelectedDayIndex(Number(e.target.value))}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-line)',
                background: 'var(--bg-subtle)',
                fontWeight: 600,
                fontSize: '13px',
                color: 'var(--forest-green)'
              }}
            >
              {Array.from({ length: totalTripDays }).map((_, i) => (
                <option key={i} value={i}>Day {i + 1}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          Showing <b>{filteredAttractions.length}</b> places of interest
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
              color: 'var(--terracotta)',
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
        <div style={{
          padding: '60px 20px',
          textAlign: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-line)'
        }}>
          <Info size={36} color="var(--terracotta)" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '20px', marginBottom: '6px' }}>No attractions found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '400px', margin: '0 auto 16px' }}>
            We couldn't find any sights matching your specific criteria. Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '24px'
        }}>
          {filteredAttractions.map(attraction => {
            const isSaved = savedAttractions.includes(attraction.id);
            return (
              <div
                key={attraction.id}
                className="editorial-card"
                style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
              >
                {/* Photo & Badge */}
                <div style={{ position: 'relative', height: '200px' }}>
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {/* Category and city badge */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    display: 'flex',
                    gap: '6px'
                  }}>
                    <span style={{
                      backgroundColor: 'rgba(251, 249, 244, 0.95)',
                      color: 'var(--forest-green)',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)'
                    }}>
                      {attraction.city}
                    </span>
                    <span style={{
                      backgroundColor: 'var(--forest-green)',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)'
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
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      transition: 'transform 0.15s ease'
                    }}
                  >
                    <Heart
                      size={18}
                      color={isSaved ? "var(--terracotta)" : "var(--text-muted)"}
                      fill={isSaved ? "var(--terracotta)" : "none"}
                    />
                  </button>
                </div>

                {/* Details */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>{attraction.name}</h3>
                  
                  <p style={{
                    fontSize: '13px',
                    color: 'var(--text-muted)',
                    marginBottom: '14px',
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
                    padding: '8px 12px',
                    backgroundColor: 'var(--bg-subtle)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '14px',
                    fontSize: '13px'
                  }}>
                    <div style={{ fontWeight: 600, color: 'var(--forest-green)' }}>
                      {attraction.fee === 0 ? 'Free Entry' : `₹${attraction.fee.toLocaleString('en-IN')} ticket`}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
                      <Clock size={13} />
                      <span>{attraction.durationHours} hrs visit</span>
                    </div>
                  </div>

                  {/* Accessibility info snippet */}
                  <div style={{
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    marginBottom: '16px',
                    fontStyle: 'italic',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '4px'
                  }}>
                    <span>Access note:</span>
                    <span>{attraction.access}</span>
                  </div>

                  {/* Add to day button */}
                  <button
                    onClick={() => onAddToItinerary(attraction.id, selectedDayIndex)}
                    className="btn-primary"
                    style={{ marginTop: 'auto', width: '100%', fontSize: '13px' }}
                  >
                    <Plus size={16} />
                    <span>Add to Day {selectedDayIndex + 1}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
