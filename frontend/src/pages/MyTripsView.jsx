import React from 'react';
import { Bookmark, MapPin, Calendar, Users, Trash2, ArrowRight, Heart, Compass } from 'lucide-react';
import { ATTRACTIONS, DESTINATIONS } from '../data/travelData';

export default function MyTripsView({
  savedTrips,
  onLoadTrip,
  onDeleteTrip,
  savedAttractions,
  onToggleSaveAttraction,
  onPlanNewTrip,
  onSelectDestination
}) {
  const savedPlaces = ATTRACTIONS.filter(a => savedAttractions.includes(a.id));

  return (
    <div className="fade-in" style={{ maxWidth: '1400px', margin: '0 auto', padding: '30px 24px 80px', color: '#FFFFFF' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '36px' }}>
        <div>
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
            <Bookmark size={14} />
            <span>Personal Travel Journal</span>
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
            My Saved Trips & Places
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '640px', lineHeight: 1.6 }}>
            Revisit your planned itineraries, travel budgets, and bookmarked heritage spots whenever you explore.
          </p>
        </div>

        <button
          onClick={onPlanNewTrip}
          className="glass-interactive"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 24px',
            borderRadius: 'var(--radius-pill)',
            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.35) 0%, rgba(14, 165, 233, 0.2) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.45)',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '14px',
            boxShadow: '0 8px 24px rgba(56, 189, 248, 0.25)'
          }}
        >
          <span>Plan a New Journey</span>
          <ArrowRight size={16} color="var(--accent-primary)" />
        </button>
      </div>

      {/* Section 1: Saved Itineraries */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '22px',
          fontWeight: 700,
          fontFamily: 'var(--font-display)',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: '#FFFFFF'
        }}>
          <Bookmark size={22} color="var(--accent-primary)" />
          <span>Saved Trips ({savedTrips.length})</span>
        </h2>

        {savedTrips.length === 0 ? (
          <div className="glass-panel" style={{
            padding: '50px 24px',
            textAlign: 'center',
            background: 'rgba(8, 14, 24, 0.7)',
            backdropFilter: 'blur(20px)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Compass size={40} color="var(--accent-primary)" style={{ marginBottom: '14px', opacity: 0.9 }} />
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px', color: '#FFFFFF' }}>No saved trips yet</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '420px', margin: '0 auto 20px', lineHeight: 1.5 }}>
              When you customize an itinerary, click "Save to My Trips" to store it here for offline viewing and journey tracking.
            </p>
            <button
              onClick={onPlanNewTrip}
              className="glass-interactive"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(56, 189, 248, 0.2)',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 700
              }}
            >
              Plan Your First Trip
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
            gap: '24px'
          }}>
            {savedTrips.map(trip => {
              const destObj = DESTINATIONS.find(d => d.name === trip.city) || DESTINATIONS[0];
              const totalActivities = trip.plan ? trip.plan.flat().length : 0;

              return (
                <div
                  key={trip.id}
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
                  <div style={{ height: '150px', position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={destObj.coverImage}
                      alt={trip.city}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(8, 14, 24, 0.95) 0%, rgba(8, 14, 24, 0.4) 60%, transparent 100%)'
                    }} />
                    <div style={{ position: 'absolute', bottom: '12px', left: '16px', color: '#fff' }}>
                      <span style={{
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--accent-primary)',
                        fontWeight: 700
                      }}>
                        {destObj.state}
                      </span>
                      <h4 style={{
                        color: '#fff',
                        fontSize: '22px',
                        fontWeight: 800,
                        margin: '2px 0 0',
                        fontFamily: 'var(--font-display)'
                      }}>
                        {trip.city}
                      </h4>
                    </div>
                  </div>

                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      marginBottom: '16px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={13} color="var(--accent-primary)" />
                        <span>{trip.days} Days ({trip.startDate || 'Upcoming'})</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Users size={13} color="var(--accent-warning)" />
                        <span>{trip.travelers} Guests</span>
                      </div>
                    </div>

                    <div style={{
                      padding: '12px 14px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      fontSize: '13px',
                      marginBottom: '18px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Total Sights:</span>
                        <b style={{ color: '#FFFFFF' }}>{totalActivities} attractions</b>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Est. Budget:</span>
                        <b style={{ color: 'var(--accent-success)' }}>
                          ₹{trip.estimatedTotal ? trip.estimatedTotal.toLocaleString('en-IN') : '12,500'}
                        </b>
                      </div>
                    </div>

                    <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => onLoadTrip(trip)}
                        className="glass-interactive"
                        style={{
                          flex: 1,
                          padding: '10px 14px',
                          borderRadius: 'var(--radius-pill)',
                          background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.3) 0%, rgba(14, 165, 233, 0.15) 100%)',
                          border: '1px solid rgba(56, 189, 248, 0.4)',
                          color: '#FFFFFF',
                          fontWeight: 700,
                          fontSize: '13px'
                        }}
                      >
                        Open Itinerary
                      </button>
                      <button
                        onClick={() => onDeleteTrip(trip.id)}
                        className="glass-interactive"
                        aria-label="Delete Trip"
                        style={{
                          padding: '10px 14px',
                          borderRadius: 'var(--radius-pill)',
                          background: 'rgba(244, 63, 94, 0.15)',
                          border: '1px solid rgba(244, 63, 94, 0.3)',
                          color: 'var(--accent-danger)'
                        }}
                        title="Delete Trip"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Section 2: Saved Attractions Bookmarks */}
      <div>
        <h2 style={{
          fontSize: '22px',
          fontWeight: 700,
          fontFamily: 'var(--font-display)',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: '#FFFFFF'
        }}>
          <Heart size={22} color="var(--accent-danger)" fill="var(--accent-danger)" />
          <span>Bookmarked Places of Interest ({savedPlaces.length})</span>
        </h2>

        {savedPlaces.length === 0 ? (
          <div className="glass-panel" style={{
            padding: '36px 20px',
            textAlign: 'center',
            background: 'rgba(8, 14, 24, 0.7)',
            backdropFilter: 'blur(20px)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
              You haven't bookmarked any sights yet. Browse Explore and click the heart icon to save places here!
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '20px'
          }}>
            {savedPlaces.map(place => (
              <div
                key={place.id}
                className="glass-panel"
                style={{
                  padding: '16px',
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'center',
                  background: 'rgba(8, 14, 24, 0.8)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '16px',
                  transition: 'transform 0.2s ease, border-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                }}
              >
                <img
                  src={place.image}
                  alt={place.name}
                  style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover' }}
                />
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <h4 style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    margin: '0 0 3px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    color: '#FFFFFF'
                  }}>
                    {place.name}
                  </h4>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {place.city} • {place.category}
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-success)', marginTop: '4px' }}>
                    {place.fee === 0 ? 'Free entry' : `₹${place.fee.toLocaleString('en-IN')}`}
                  </div>
                </div>
                <button
                  onClick={() => onToggleSaveAttraction(place.id)}
                  className="glass-interactive"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid rgba(244, 63, 94, 0.3)',
                    background: 'rgba(244, 63, 94, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                  aria-label="Remove Bookmark"
                  title="Remove Bookmark"
                >
                  <Heart size={16} color="var(--accent-danger)" fill="var(--accent-danger)" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
