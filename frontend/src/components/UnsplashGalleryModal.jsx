import React, { useState, useEffect } from 'react';
import { Search, Image, ExternalLink, Download, User, RefreshCw, X, Sparkles, Check } from 'lucide-react';
import { api } from '../services/api';

export default function UnsplashGalleryModal({ isOpen, onClose, onSelectImage, initialQuery = 'India travel' }) {
  const [query, setQuery] = useState(initialQuery);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      fetchPhotos(initialQuery);
    }
  }, [isOpen, initialQuery]);

  const fetchPhotos = async (searchQuery) => {
    if (!searchQuery?.trim()) return;
    setLoading(true);
    try {
      const res = await api.searchPhotos(searchQuery, 16);
      setPhotos(res || []);
      // Check if fallback or unsplash via meta if accessible, or default
    } catch (err) {
      console.error('Failed to load photos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchPhotos(query);
  };

  const handleSelect = (photo) => {
    if (onSelectImage) {
      onSelectImage(photo.regularUrl || photo.url);
    }
    setCopiedId(photo.id);
    setTimeout(() => {
      onClose();
      setCopiedId(null);
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(4, 6, 8, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      padding: '20px'
    }}>
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '960px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(8, 14, 24, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.16)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(56, 189, 248, 0.15)'
        }}
      >
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.3) 0%, rgba(14, 165, 233, 0.1) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Image size={18} color="var(--accent-primary)" />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: 0, fontFamily: 'var(--font-display)' }}>
                Unsplash Visual Explorer
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                High-resolution travel photos directly sourced from Unsplash
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="glass-interactive"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Search Controls */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '12px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search places, monuments, nature, or sights..."
                style={{
                  width: '100%',
                  padding: '11px 16px 11px 40px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--accent-primary)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.18)'; }}
              />
              <Search size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="glass-interactive"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.35) 0%, rgba(14, 165, 233, 0.2) 100%)',
                border: '1px solid rgba(56, 189, 248, 0.45)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '13px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? <RefreshCw size={15} className="spin-animation" /> : <Search size={15} />}
              <span>{loading ? 'Searching...' : 'Search'}</span>
            </button>
          </form>

          {/* Quick preset tags */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
            {['Jaipur', 'Varanasi', 'Taj Mahal', 'Goa Beach', 'Himalayas', 'Kerala Backwaters'].map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setQuery(tag);
                  fetchPhotos(tag);
                }}
                className="glass-interactive"
                style={{
                  padding: '4px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-pill)',
                  background: query.toLowerCase() === tag.toLowerCase() ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${query.toLowerCase() === tag.toLowerCase() ? 'rgba(56, 189, 248, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                  color: query.toLowerCase() === tag.toLowerCase() ? 'var(--accent-primary)' : 'var(--text-secondary)'
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Photos Grid */}
        <div style={{
          padding: '24px',
          overflowY: 'auto',
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px',
          alignContent: 'start'
        }}>
          {photos.length === 0 && !loading && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px 20px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>No photos found for "{query}". Try a different search term.</p>
            </div>
          )}

          {photos.map(photo => {
            const isSelected = copiedId === photo.id;
            return (
              <div
                key={photo.id}
                className="glass-panel"
                style={{
                  position: 'relative',
                  height: '170px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: `1px solid ${isSelected ? 'var(--accent-success)' : 'rgba(255, 255, 255, 0.12)'}`,
                  transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease'
                }}
                onClick={() => handleSelect(photo)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = isSelected ? 'var(--accent-success)' : 'rgba(255, 255, 255, 0.12)';
                }}
              >
                <img
                  src={photo.thumbUrl || photo.url}
                  alt={photo.description}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Dark gradient shadow */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(8, 14, 24, 0.9) 0%, transparent 60%)'
                }} />

                {/* Author attribution info */}
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  right: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '120px'
                  }}>
                    {photo.author?.name || 'Photographer'}
                  </span>
                  
                  {isSelected ? (
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: 'rgba(52, 211, 153, 0.9)',
                      color: '#040608',
                      fontSize: '10px',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: 'var(--radius-pill)'
                    }}>
                      <Check size={12} /> Selected
                    </span>
                  ) : (
                    <span style={{
                      fontSize: '10px',
                      color: 'var(--accent-primary)',
                      fontWeight: 700
                    }}>
                      Use Photo
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
          color: 'var(--text-muted)'
        }}>
          <span>Photos provided by <a href="https://unsplash.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Unsplash</a></span>
          <span>Click any image to select or replace</span>
        </div>
      </div>
    </div>
  );
}
