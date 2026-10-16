import React from 'react';
import { Compass, MapPin, Calendar, Heart, FileText, DollarSign, Bookmark, Luggage } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, savedCount, tripDays, currentCity }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'explore', label: 'Explore', icon: MapPin },
    { id: 'planner', label: 'Plan Trip', icon: Calendar },
    { id: 'itinerary', label: `Itinerary (${tripDays}d)`, icon: Luggage },
    { id: 'budget', label: 'Budget', icon: DollarSign },
    { id: 'my-trips', label: 'My Trips', icon: Bookmark },
  ];

  return (
    <header style={{
      backgroundColor: 'rgba(251, 249, 244, 0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-line)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      transition: 'all 0.3s ease'
    }}>
      <div className="app-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '74px'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setActivePage('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            backgroundColor: 'var(--forest-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FAF6ED',
            boxShadow: '0 4px 12px rgba(17,66,50,0.2)'
          }}>
            <Compass size={22} strokeWidth={2.2} />
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '22px',
              fontWeight: 800,
              color: 'var(--forest-green)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1
            }}>
              Travel<span style={{ color: 'var(--terracotta)' }}>Tales</span>
            </div>
            <div style={{
              fontSize: '11px',
              fontWeight: 500,
              color: 'var(--text-muted)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}>
              Every journey tells a story
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                style={{
                  background: isActive ? 'var(--forest-green)' : 'transparent',
                  color: isActive ? '#FFFFFF' : 'var(--text-main)',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
              >
                <Icon size={15} color={isActive ? '#FFFFFF' : 'var(--text-muted)'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Saved Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setActivePage('explore')}
            style={{
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-line)',
              borderRadius: 'var(--radius-full)',
              padding: '6px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--forest-green)',
              cursor: 'pointer'
            }}
          >
            <Heart size={14} color="var(--terracotta)" fill={savedCount > 0 ? "var(--terracotta)" : "none"} />
            <span>Saved ({savedCount})</span>
          </button>

          <button
            onClick={() => setActivePage('planner')}
            className="btn-primary"
            style={{ padding: '8px 18px', fontSize: '13px' }}
          >
            <span>Plan My Trip</span>
          </button>
        </div>
      </div>
    </header>
  );
}
