import React from 'react';
import { ArrowLeft, Clock, MapPin, IndianRupee, Sparkles, CheckCircle2, Calendar, Compass } from 'lucide-react';
import { ATTRACTIONS } from '../data/travelData';

export default function DestinationDetailView({ destination, onBack, onStartPlanning, onAddToDay }) {
  if (!destination) return null;

  // Filter attractions in this destination
  const cityAttractions = ATTRACTIONS.filter(a => a.city.toLowerCase().includes(destination.name.toLowerCase()) || destination.name.toLowerCase().includes(a.city.toLowerCase()));

  return (
    <div className="fade-in app-container" style={{ padding: '30px 20px 80px' }}>
      {/* Top back button */}
      <button
        onClick={onBack}
        className="btn-secondary"
        style={{ marginBottom: '24px', padding: '6px 14px', fontSize: '13px' }}
      >
        <ArrowLeft size={16} />
        <span>Back</span>
      </button>

      {/* Main Destination Hero Cover */}
      <div style={{
        position: 'relative',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        height: '420px',
        marginBottom: '40px',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <img
          src={destination.coverImage}
          alt={destination.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(17,66,50,0.95) 0%, rgba(17,66,50,0.4) 60%, rgba(0,0,0,0) 100%)'
        }} />

        <div style={{
          position: 'absolute',
          bottom: '36px',
          left: '36px',
          right: '36px',
          color: '#FFFFFF'
        }}>
          <span style={{
            display: 'inline-block',
            backgroundColor: 'var(--terracotta)',
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            marginBottom: '12px'
          }}>
            {destination.state}, India
          </span>

          <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(32px, 4vw, 54px)', marginBottom: '12px' }}>
            {destination.name}
          </h1>

          <p style={{
            fontSize: '18px',
            color: '#E8F1EC',
            maxWidth: '680px',
            lineHeight: 1.5,
            marginBottom: '24px'
          }}>
            {destination.tagline}
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onStartPlanning(destination.name)}
              className="btn-primary"
              style={{
                backgroundColor: 'var(--gold-accent)',
                color: '#1A1813',
                padding: '10px 24px',
                fontSize: '14px',
                fontWeight: 700
              }}
            >
              <Calendar size={16} />
              <span>Plan a Trip to {destination.name}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Two-Column Editorial Details */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '40px',
        alignItems: 'start'
      }}>
        {/* Left Column: Narrative and Key Sights */}
        <div>
          <div style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '26px', color: 'var(--forest-green)', marginBottom: '16px' }}>
              About the Destination
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--text-main)', marginBottom: '20px' }}>
              {destination.description}
            </p>

            <h3 style={{ fontSize: '18px', color: 'var(--forest-green)', marginBottom: '12px' }}>
              Signature Experiences
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              {destination.highlights.map((h, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '12px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-line)'
                  }}
                >
                  <CheckCircle2 size={16} color="var(--forest-green)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Attractions in this Destination */}
          <div>
            <h2 style={{ fontSize: '26px', color: 'var(--forest-green)', marginBottom: '18px' }}>
              Must-Visit Sights in {destination.name}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cityAttractions.map(attraction => (
                <div
                  key={attraction.id}
                  className="editorial-card"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '160px 1fr',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <h4 style={{ fontSize: '18px', margin: 0 }}>{attraction.name}</h4>
                      <span className="editorial-chip" style={{ fontSize: '11px' }}>{attraction.category}</span>
                    </div>

                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.4 }}>
                      {attraction.description}
                    </p>

                    <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                      <div><b>Fee:</b> {attraction.fee === 0 ? 'Free' : `₹${attraction.fee}`}</div>
                      <div><b>Visit time:</b> {attraction.durationHours} hrs</div>
                      <div><b>Accessibility:</b> {attraction.access}</div>
                    </div>

                    <div style={{ marginTop: 'auto' }}>
                      <button
                        onClick={() => onAddToDay(attraction.id, 0)}
                        className="btn-primary"
                        style={{ padding: '6px 14px', fontSize: '12px' }}
                      >
                        Add to Itinerary Day 1
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Trip Cost & Planning Fact Sheet */}
        <div style={{
          position: 'sticky',
          top: '90px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* Factsheet Card */}
          <div className="editorial-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Trip Summary</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-line)', paddingBottom: '10px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Suggested Stay</span>
                <span style={{ fontWeight: 600 }}>{destination.idealDays} Days / {destination.idealDays - 1} Nights</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-line)', paddingBottom: '10px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Avg Hotel (Twin room)</span>
                <span style={{ fontWeight: 600 }}>₹{destination.rates.stay.toLocaleString('en-IN')}/night</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-line)', paddingBottom: '10px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Daily Food & Chai</span>
                <span style={{ fontWeight: 600 }}>₹{destination.rates.food.toLocaleString('en-IN')}/person</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-line)', paddingBottom: '10px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Local Cab / Auto</span>
                <span style={{ fontWeight: 600 }}>₹{destination.rates.transport.toLocaleString('en-IN')}/day</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
                <span style={{ fontWeight: 700, color: 'var(--forest-green)' }}>Base Daily Rate</span>
                <span style={{ fontWeight: 800, fontSize: '18px', color: 'var(--forest-green)' }}>
                  ₹{destination.baseCostPerDay.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              onClick={() => onStartPlanning(destination.name)}
              className="btn-primary"
              style={{ width: '100%' }}
            >
              Start Planning Trip
            </button>
          </div>

          {/* Quick Notice */}
          <div style={{
            padding: '16px',
            backgroundColor: 'var(--gold-soft)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #E6D5B8',
            fontSize: '12px',
            color: '#5C4A28',
            lineHeight: 1.5
          }}>
            <b>Editorial Note:</b> Indicative prices are based on comfortable local stays and verified monument entry rates. Seasonal variations apply during peak festive months.
          </div>
        </div>
      </div>
    </div>
  );
}
