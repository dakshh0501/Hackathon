import React, { useState } from 'react';
import { Calendar, Users, MapPin, Sparkles, AlertCircle, ArrowRight, Check } from 'lucide-react';
import { DESTINATIONS } from '../data/travelData';

export default function TripPlannerView({ tripConfig, onUpdateTrip, onProceedToItinerary }) {
  const [formData, setFormData] = useState({
    city: tripConfig.city || 'Jaipur',
    startDate: tripConfig.startDate || new Date(Date.now() + 14 * 864e5).toISOString().slice(0, 10),
    days: tripConfig.days || 3,
    travelers: tripConfig.travelers || 2,
    budgetTier: tripConfig.budgetTier || 'comfort',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.city) errs.city = 'Please select a destination';
    if (!formData.startDate) errs.startDate = 'Please choose a starting date';
    if (!formData.days || formData.days < 1 || formData.days > 7) {
      errs.days = 'Trip duration must be between 1 and 7 days for local plans';
    }
    if (!formData.travelers || formData.travelers < 1 || formData.travelers > 20) {
      errs.travelers = 'Number of travelers must be between 1 and 20';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onUpdateTrip(formData);
      setIsSubmitting(false);
      onProceedToItinerary();
    }, 400);
  };

  const selectedDestination = DESTINATIONS.find(d => d.name === formData.city) || DESTINATIONS[1];

  return (
    <div className="fade-in app-container" style={{ padding: '40px 20px 80px', maxWidth: '1000px' }}>
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <span className="editorial-chip" style={{ marginBottom: '10px' }}>Custom Itinerary Generator</span>
        <h1 style={{ fontSize: '38px', color: 'var(--forest-green)', marginBottom: '12px' }}>
          Craft Your Journey
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
          Set your destination, dates, travel party, and stay comfort. We’ll generate a balanced day-by-day plan with transparent expense tracking.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '32px',
        alignItems: 'start'
      }}>
        {/* Form Container */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          padding: '36px',
          border: '1px solid var(--border-line)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <form onSubmit={handleSubmit}>
            {/* Destination Selection */}
            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--forest-green)', marginBottom: '8px' }}>
                Primary Destination
              </label>
              <select
                className="input-field"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              >
                {DESTINATIONS.map(d => (
                  <option key={d.id} value={d.name}>{d.name} ({d.state})</option>
                ))}
              </select>
              {errors.city && <div style={{ color: 'var(--terracotta)', fontSize: '12px', marginTop: '4px' }}>{errors.city}</div>}
            </div>

            {/* Dates and Days Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '22px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--forest-green)', marginBottom: '8px' }}>
                  Trip Start Date
                </label>
                <input
                  type="date"
                  className="input-field"
                  value={formData.startDate}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
                {errors.startDate && <div style={{ color: 'var(--terracotta)', fontSize: '12px', marginTop: '4px' }}>{errors.startDate}</div>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--forest-green)', marginBottom: '8px' }}>
                  Duration (Days)
                </label>
                <input
                  type="number"
                  min="1"
                  max="7"
                  className="input-field"
                  value={formData.days}
                  onChange={(e) => setFormData({ ...formData, days: Number(e.target.value) })}
                />
                {errors.days && <div style={{ color: 'var(--terracotta)', fontSize: '12px', marginTop: '4px' }}>{errors.days}</div>}
              </div>
            </div>

            {/* Travelers & Budget Tier */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--forest-green)', marginBottom: '8px' }}>
                  Travelers
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  className="input-field"
                  value={formData.travelers}
                  onChange={(e) => setFormData({ ...formData, travelers: Number(e.target.value) })}
                />
                {errors.travelers && <div style={{ color: 'var(--terracotta)', fontSize: '12px', marginTop: '4px' }}>{errors.travelers}</div>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--forest-green)', marginBottom: '8px' }}>
                  Stay Comfort Tier
                </label>
                <select
                  className="input-field"
                  value={formData.budgetTier}
                  onChange={(e) => setFormData({ ...formData, budgetTier: e.target.value })}
                >
                  <option value="budget">Backpacker / Budget (₹1,400/nt)</option>
                  <option value="comfort">Comfort Heritage (₹2,800/nt)</option>
                  <option value="luxury">Luxury Palace Haveli (₹6,500/nt)</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.8 : 1
              }}
            >
              {isSubmitting ? (
                <span>Generating Personalized Itinerary...</span>
              ) : (
                <>
                  <span>Build My Itinerary & Calculate Budget</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Selected Destination Preview Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="editorial-card" style={{ overflow: 'hidden' }}>
            <div style={{ height: '180px', position: 'relative' }}>
              <img
                src={selectedDestination.coverImage}
                alt={selectedDestination.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(17,66,50,0.85) 0%, transparent 60%)'
              }} />
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', color: '#FFFFFF' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, opacity: 0.9 }}>{selectedDestination.state}</div>
                <h3 style={{ color: '#FFFFFF', fontSize: '22px', margin: 0 }}>{selectedDestination.name}</h3>
              </div>
            </div>

            <div style={{ padding: '20px' }}>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '14px' }}>
                {selectedDestination.tagline}
              </p>

              <div style={{
                padding: '12px',
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-md)',
                fontSize: '13px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Estimated Duration:</span>
                  <b>{formData.days} Days</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Travel Party:</span>
                  <b>{formData.travelers} Persons ({Math.ceil(formData.travelers / 2)} Twin Rooms)</b>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Pill */}
          <div style={{
            padding: '18px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--forest-green-light)',
            border: '1px solid rgba(17,66,50,0.1)',
            color: 'var(--forest-green)',
            fontSize: '13px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, marginBottom: '6px' }}>
              <Sparkles size={16} color="var(--forest-green)" />
              <span>Smart Recommendation</span>
            </div>
            <span>
              We automatically distribute morning and afternoon monument slots to help you avoid peak heat and long entry queues.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
