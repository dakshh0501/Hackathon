import React, { useState } from 'react';
import { Plus, X, Sparkles, MapPin, Upload, Compass, CheckCircle2 } from 'lucide-react';
import { BIOMES } from '../data/terraBiomes';

/**
 * Section 5: Place Addition & Netflix Biosphere Expand Effect
 * Step 1: Input modal with live satellite backdrop preview
 * Step 2: Biome Matching Engine
 * Step 3: Netflix Expand Animation: Detaching card scales to full viewport,
 *         bursts celebration particles, and enters the newly added place.
 */
export default function AddPlaceModal({ isOpen, onClose, onPlaceAdded }) {
  const [placeName, setPlaceName] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');
  const [selectedBiome, setSelectedBiome] = useState('mountain');
  const [isExpanding, setIsExpanding] = useState(false);

  if (!isOpen) return null;

  // Auto-biome heuristic based on typed place name keywords
  const handlePlaceNameChange = (name) => {
    setPlaceName(name);
    const low = name.toLowerCase();
    if (low.includes('desert') || low.includes('sand') || low.includes('dune') || low.includes('wadi') || low.includes('sahara')) {
      setSelectedBiome('desert');
    } else if (low.includes('reef') || low.includes('sea') || low.includes('ocean') || low.includes('atoll')) {
      setSelectedBiome('ocean');
    } else if (low.includes('peak') || low.includes('mount') || low.includes('alps') || low.includes('himalaya') || low.includes('cliff')) {
      setSelectedBiome('mountain');
    } else if (low.includes('beach') || low.includes('cove') || low.includes('coast') || low.includes('island')) {
      setSelectedBiome('beach');
    } else if (low.includes('jungle') || low.includes('forest') || low.includes('amazon') || low.includes('canopy')) {
      setSelectedBiome('rainforest');
    } else if (low.includes('ice') || low.includes('glacier') || low.includes('fjord')) {
      setSelectedBiome('glacier');
    } else if (low.includes('volcano') || low.includes('crater') || low.includes('caldera')) {
      setSelectedBiome('volcanic');
    }
  };

  const handleConfirmAndAdd = (e) => {
    e.preventDefault();
    if (!placeName.trim()) return;

    // Trigger Netflix Expand Effect sequence
    setIsExpanding(true);

    setTimeout(() => {
      const newPlace = {
        id: 'user-' + Date.now(),
        name: placeName,
        country: country || 'Discovered Expedition',
        flag: '📍',
        coordinates: { lat: 28.6139, lng: 77.2090 },
        rating: 5.0,
        reviewsCount: 1,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        description: description || 'New pristine travel discovery contributed by explorer.',
        weather: { temp: 24, condition: 'Clear Atmosphere', humidity: '45%', uv: '6.0' },
        safetyIndex: 9.6,
        dailyBudget: { budget: 2500, mid: 6000, luxury: 15000, currency: 'USD' },
        story: description || 'A newly mapped biosphere sanctuary open to mindful voyagers.',
        experiences: ['Local Hidden Trail Walk', 'Panoramic Photography', 'Cultural Sunset Gazing']
      };

      onPlaceAdded(newPlace, selectedBiome);
      setIsExpanding(false);
      onClose();
    }, 1200);
  };

  const currentBiomeData = BIOMES.find(b => b.id === selectedBiome) || BIOMES[2];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(4, 6, 8, 0.75)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
    >
      {/* Expanding Card Container */}
      <div
        className={isExpanding ? 'netflix-expand-enter' : ''}
        style={{
          width: '100%',
          maxWidth: '640px',
          background: 'rgba(15, 23, 42, 0.85)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          overflow: 'hidden',
          position: 'relative',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Dynamic Satellite Ambient Background Preview */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '140px',
          backgroundImage: `url(${currentBiomeData.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.35,
          filter: 'blur(1px)'
        }} />

        {/* Modal Top Bar */}
        <div style={{
          position: 'relative',
          padding: '24px 28px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: 'var(--accent-primary)',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '8px'
            }}>
              <Compass size={13} />
              <span>Contribute to Earth Biospheres</span>
            </div>
            <h2 style={{
              fontSize: '26px',
              color: '#FFFFFF',
              fontFamily: 'var(--font-display)',
              margin: 0,
              fontWeight: 800
            }}>
              Add New Place
            </h2>
          </div>

          <button
            onClick={onClose}
            className="glass-interactive"
            style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleConfirmAndAdd} style={{ position: 'relative', padding: '0 28px 28px' }}>
          {/* Matched Biome Alert Pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 16px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Matched Ecological Biome:
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 700,
              fontSize: '13px',
              color: currentBiomeData.accentColor
            }}>
              <span>{currentBiomeData.emoji}</span>
              <span>{currentBiomeData.displayName}</span>
            </div>
          </div>

          {/* Place Name Input */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Place / Destination Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Spiti Valley, Nubra Dunes, Bora Bora..."
              value={placeName}
              onChange={(e) => handlePlaceNameChange(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                color: '#FFFFFF',
                fontSize: '15px',
                outline: 'none'
              }}
            />
          </div>

          {/* Region / Country & Biome Override */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Country / Region
              </label>
              <input
                type="text"
                placeholder="e.g., India, Iceland..."
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Select Biome Override
              </label>
              <select
                value={selectedBiome}
                onChange={(e) => setSelectedBiome(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  outline: 'none'
                }}
              >
                {BIOMES.map(b => (
                  <option key={b.id} value={b.id}>{b.emoji} {b.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Short Narrative Description */}
          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Atmosphere & Soul of this Place
            </label>
            <textarea
              rows="3"
              placeholder="Describe the climate, sounds of wind or water, local culture, or why it breathes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                color: '#FFFFFF',
                fontSize: '13px',
                outline: 'none',
                resize: 'none'
              }}
            />
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="glass-interactive"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '15px',
              fontWeight: 800,
              backgroundColor: currentBiomeData.accentColor,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '9999px',
              boxShadow: `0 8px 24px ${currentBiomeData.accentColor}66`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {isExpanding ? (
              <span>Expanding Biosphere Viewport...</span>
            ) : (
              <>
                <Sparkles size={17} />
                <span>Confirm & Add to {currentBiomeData.name} Biome</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
