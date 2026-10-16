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
    <div className="fade-in app-container" style={{ padding: '40px 20px 80px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '36px' }}>
        <div>
          <span className="editorial-chip" style={{ marginBottom: '8px' }}>
            Personal Travel Journal
          </span>
          <h1 style={{ fontSize: '38px', color: 'var(--forest-green)', marginBottom: '8px' }}>
            My Saved Trips & Places
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
            Revisit your planned itineraries and bookmarked heritage spots whenever you travel.
          </p>
        </div>

        <button
          onClick={onPlanNewTrip}
          className="btn-primary"
        >
          <span>Plan a New Journey</span>
          <ArrowRight size={15} />
        </button>
      </div>

      {/* Section 1: Saved Itineraries */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Bookmark size={22} color="var(--forest-green)" />
          <span>Saved Trips ({savedTrips.length})</span>
        </h2>

        {savedTrips.length === 0 ? (
          <div style={{
            padding: '40px 20px',
            textAlign: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-line)'
          }}>
            <Compass size={36} color="var(--terracotta)" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '18px', marginBottom: '6px' }}>No saved trips yet</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '400px', margin: '0 auto 16px' }}>
              When you customize an itinerary, click "Save to My Trips" to store it here for offline viewing.
            </p>
            <button
              onClick={onPlanNewTrip}
              className="btn-primary"
              style={{ fontSize: '13px' }}
            >
              Plan Your First Trip
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {savedTrips.map(trip => {
              const destObj = DESTINATIONS.find(d => d.name === trip.city) || DESTINATIONS[0];
              const totalActivities = trip.plan.flat().length;

              return (
                <div
                  key={trip.id}
                  className="editorial-card"
                  style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                >
                  <div style={{ height: '140px', position: 'relative' }}>
                    <img
                      src={destObj.coverImage}
                      alt={trip.city}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(17,66,50,0.85) 0%, transparent 60%)'
                    }} />
                    <div style={{ position: 'absolute', bottom: '12px', left: '16px', color: '#fff' }}>
                      <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{destObj.state}</span>
                      <h4 style={{ color: '#fff', fontSize: '20px', margin: 0 }}>{trip.city}</h4>
                    </div>
                  </div>

                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={13} />
                        <span>{trip.days} Days ({trip.startDate})</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Users size={13} />
                        <span>{trip.travelers} Guests</span>
                      </div>
                    </div>

                    <div style={{
                      padding: '10px 14px',
                      backgroundColor: 'var(--bg-subtle)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '13px',
                      marginBottom: '18px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span>Total Sights:</span>
                        <b>{totalActivities} attractions</b>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Est. Budget:</span>
                        <b style={{ color: 'var(--forest-green)' }}>₹{trip.estimatedTotal?.toLocaleString('en-IN') || '12,500'}</b>
                      </div>
                    </div>

                    <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => onLoadTrip(trip)}
                        className="btn-primary"
                        style={{ flex: 1, padding: '8px', fontSize: '13px' }}
                      >
                        Open Itinerary
                      </button>
                      <button
                        onClick={() => onDeleteTrip(trip.id)}
                        className="btn-icon"
                        aria-label="Delete Trip"
                        style={{ color: 'var(--terracotta)' }}
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
        <h2 style={{ fontSize: '24px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Heart size={22} color="var(--terracotta)" fill="var(--terracotta)" />
          <span>Bookmarked Places of Interest ({savedPlaces.length})</span>
        </h2>

        {savedPlaces.length === 0 ? (
          <div style={{
            padding: '36px 20px',
            textAlign: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-line)'
          }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
              You haven’t bookmarked any sights yet. Browse Explore and click the heart icon to save places here!
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {savedPlaces.map(place => (
              <div
                key={place.id}
                className="editorial-card"
                style={{ padding: '16px', display: 'flex', gap: '14px', alignItems: 'center' }}
              >
                <img
                  src={place.image}
                  alt={place.name}
                  style={{ width: '70px', height: '70px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                />
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <h4 style={{ fontSize: '16px', margin: '0 0 2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {place.name}
                  </h4>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {place.city} • {place.category}
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--forest-green)', marginTop: '4px' }}>
                    {place.fee === 0 ? 'Free entry' : `₹${place.fee.toLocaleString('en-IN')}`}
                  </div>
                </div>
                <button
                  onClick={() => onToggleSaveAttraction(place.id)}
                  className="btn-icon"
                  style={{ border: 'none', background: 'transparent' }}
                  aria-label="Remove Bookmark"
                >
                  <Heart size={18} color="var(--terracotta)" fill="var(--terracotta)" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
