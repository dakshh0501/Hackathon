import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Star, CloudSun, Calendar, Shield, DollarSign, 
  MapPin, CheckCircle, Navigation, Compass, Sparkles, Heart, Share2, Layers, Image as ImageIcon, Camera, RefreshCw
} from 'lucide-react';
import { api } from '../services/api';

/**
 * Section 10.2: Destination Detail View
 * Split view layout:
 * - Left Panel (Scrollable content): Hero photo, weather widget, 12-month calendar,
 *   story cards, experiences, and live Unsplash photographic gallery.
 * - Right Panel (Sticky map + Quick Book CTA + Wishlist).
 */
export default function DestinationDetailView({ destination, biome, onBack, onPlanItinerary }) {
  const [activeTab, setActiveTab] = useState('overview'); // overview, stories, experiences, budget
  const [isSaved, setIsSaved] = useState(false);
  const [heroImage, setHeroImage] = useState(destination?.image);
  const [destinationPhotos, setDestinationPhotos] = useState([]);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false);

  // Sync hero image whenever destination changes or when live Unsplash image loads
  useEffect(() => {
    if (destination?.image) {
      setHeroImage(destination.image);
    }
  }, [destination?.image]);

  // Automatically fetch live Unsplash photos of the city and its sights
  useEffect(() => {
    let isMounted = true;
    async function loadCityPhotos() {
      if (!destination?.name) return;
      setIsLoadingPhotos(true);
      try {
        const query = `${destination.name} ${destination.country || ''}`.trim();
        const photos = await api.searchPhotos(query, 8);
        if (isMounted && photos && photos.length > 0) {
          setDestinationPhotos(photos);
        }
      } catch (err) {
        console.warn('Could not load destination photos:', err);
      } finally {
        if (isMounted) setIsLoadingPhotos(false);
      }
    }

    loadCityPhotos();
    return () => { isMounted = false; };
  }, [destination?.name]);

  if (!destination) return null;

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 50,
        width: '100%',
        maxWidth: '1380px',
        margin: '0 auto',
        padding: '20px 24px 80px',
        animation: 'slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}
    >
      {/* Top Glass Navigation Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        padding: '12px 20px',
        borderRadius: 'var(--radius-pill)',
        background: 'rgba(8, 12, 20, 0.7)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        <button
          onClick={onBack}
          className="glass-interactive"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 18px',
            fontSize: '13px',
            fontWeight: 700
          }}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="glass-interactive"
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: isSaved ? '#F43F5E' : '#FFFFFF'
            }}
          >
            <Heart size={15} fill={isSaved ? '#F43F5E' : 'none'} />
            <span>{isSaved ? 'In Wishlist' : 'Add to Wishlist'}</span>
          </button>

          <button
            onClick={onPlanItinerary}
            className="glass-interactive"
            style={{
              padding: '8px 20px',
              fontSize: '13px',
              fontWeight: 800,
              backgroundColor: biome?.accentColor || '#38BDF8',
              color: '#FFFFFF',
              border: 'none',
              boxShadow: `0 4px 16px ${biome?.accentColor || '#38BDF8'}66`
            }}
          >
            <Sparkles size={15} />
            <span>Generate AI Itinerary</span>
          </button>
        </div>
      </div>

      {/* Hero Header Glass Canvas */}
      <div style={{
        position: 'relative',
        height: '420px',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        marginBottom: '28px',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)'
      }}>
        <img
          src={heroImage || destination.image}
          alt={destination.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.5s ease' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(4, 6, 8, 0.95) 0%, rgba(4, 6, 8, 0.4) 60%, transparent 100%)'
        }} />

        {/* Hero Overlay Details */}
        <div style={{
          position: 'absolute',
          bottom: '32px',
          left: '36px',
          right: '36px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '18px' }}>{destination.flag}</span>
              <span style={{
                fontSize: '12px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: biome?.accentColor || '#38BDF8',
                backgroundColor: 'rgba(255,255,255,0.1)',
                padding: '3px 10px',
                borderRadius: '9999px',
                backdropFilter: 'blur(8px)'
              }}>
                {biome?.name || 'Alpine'} Biosphere
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(36px, 4vw, 54px)',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              color: '#FFFFFF',
              margin: '0 0 10px 0',
              lineHeight: 1.1
            }}>
              {destination.name}
            </h1>

            <p style={{
              fontSize: '16px',
              color: 'var(--text-secondary)',
              maxWidth: '680px',
              margin: 0,
              lineHeight: 1.5
            }}>
              {destination.description}
            </p>
          </div>

          {/* Quick Stats Glass Pill */}
          <div style={{
            display: 'flex',
            gap: '16px',
            padding: '12px 20px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.14)'
          }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Rating</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 800, fontSize: '16px' }}>
                <Star size={14} color="#FBBF24" fill="#FBBF24" />
                <span>{destination.rating}</span>
              </div>
            </div>
            <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Safety Index</div>
              <div style={{ fontWeight: 800, fontSize: '16px', color: '#34D399' }}>
                {destination.safetyIndex} / 10
              </div>
            </div>
            <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Coordinates</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', marginTop: '3px' }}>
                {destination.coordinates.lat.toFixed(2)}°N, {destination.coordinates.lng.toFixed(2)}°E
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Split View: Left Content & Right Sticky Sidebar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.9fr 1.1fr',
        gap: '28px',
        alignItems: 'start'
      }}>
        {/* Left Scrollable Information */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Real Unsplash City Photographic Gallery */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-display)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Camera size={20} color="var(--accent-primary)" />
                <span>Real City Gallery & Sights ({destination.name})</span>
              </h3>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Powered by Unsplash
              </span>
            </div>

            {isLoadingPhotos ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '40px', color: 'var(--text-secondary)' }}>
                <RefreshCw size={18} className="spin-animation" />
                <span>Fetching live photographs of {destination.name}...</span>
              </div>
            ) : destinationPhotos.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
                Live photos are loading for this destination...
              </p>
            ) : (
              <div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                  Click any photo below to set it as the main destination banner view:
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                  gap: '12px'
                }}>
                  {destinationPhotos.map(photo => {
                    const isCurrent = (heroImage === photo.regularUrl || heroImage === photo.url);
                    return (
                      <div
                        key={photo.id}
                        className="glass-panel"
                        onClick={() => setHeroImage(photo.regularUrl || photo.url)}
                        style={{
                          position: 'relative',
                          height: '110px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          border: isCurrent ? '2px solid var(--accent-primary)' : '1px solid rgba(255, 255, 255, 0.12)',
                          boxShadow: isCurrent ? '0 0 16px rgba(56, 189, 248, 0.4)' : 'none',
                          transition: 'transform 0.2s ease, border-color 0.2s ease'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                        title={photo.description || photo.author?.name}
                      >
                        <img
                          src={photo.thumbUrl || photo.url}
                          alt={photo.description || destination.name}
                          loading="lazy"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{
                          position: 'absolute',
                          bottom: '4px',
                          left: '6px',
                          right: '6px',
                          fontSize: '10px',
                          color: '#FFFFFF',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          textShadow: '0 1px 4px rgba(0,0,0,0.8)'
                        }}>
                          {photo.author?.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Weather & Best Season Glass Widget */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-display)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CloudSun size={19} color="var(--accent-primary)" />
              <span>Climate & Ambient Weather</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '14px' }}>
              <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(255, 255, 255, 0.04)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Current Temp</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
                  {destination.weather.temp}°C
                </div>
                <div style={{ fontSize: '12px', color: 'var(--accent-primary)' }}>{destination.weather.condition}</div>
              </div>

              <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(255, 255, 255, 0.04)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Humidity</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
                  {destination.weather.humidity}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Clean Air</div>
              </div>

              <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(255, 255, 255, 0.04)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>UV Index</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
                  {destination.weather.uv}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Sunscreen Advised</div>
              </div>

              <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(255, 255, 255, 0.04)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Optimal Months</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#34D399', marginTop: '6px' }}>
                  {biome?.bestMonth || 'Oct – Mar'}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Low crowd window</div>
              </div>
            </div>
          </div>

          {/* Signature Curated Experiences */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-display)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass size={19} color={biome?.accentColor || '#38BDF8'} />
              <span>Curated Biosphere Expeditions</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              {destination.experiences.map((exp, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <CheckCircle size={16} color="#34D399" />
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>{exp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Destination Story & Cultural Soul */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-display)', marginBottom: '12px' }}>
              The Soul of {destination.name}
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
              {destination.story}
            </p>
          </div>
        </div>

        {/* Right Sticky Sidebar: Budget & Planning Action Card */}
        <div style={{
          position: 'sticky',
          top: '90px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* Daily Budget Card */}
          <div className="glass-elevated" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <DollarSign size={18} color="#34D399" />
              <h3 style={{ fontSize: '18px', margin: 0, fontFamily: 'var(--font-display)' }}>
                Indicative Daily Cost
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Backpacker / Hostel</span>
                <b style={{ color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>₹{destination.dailyBudget.budget} / day</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Comfort Boutique</span>
                <b style={{ color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>₹{destination.dailyBudget.mid} / day</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Luxury Palace / Villa</span>
                <b style={{ color: '#FBBF24', fontFamily: 'var(--font-mono)' }}>₹{destination.dailyBudget.luxury} / day</b>
              </div>
            </div>

            <button
              onClick={onPlanItinerary}
              className="glass-interactive"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '14px',
                fontWeight: 800,
                backgroundColor: biome?.accentColor || '#38BDF8',
                color: '#FFFFFF',
                border: 'none',
                boxShadow: `0 8px 24px ${biome?.accentColor || '#38BDF8'}55`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Sparkles size={16} />
              <span>Build Day-by-Day Itinerary</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
