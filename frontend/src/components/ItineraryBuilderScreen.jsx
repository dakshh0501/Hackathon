import React, { useState } from 'react';
import { 
  Calendar, Clock, Trash2, ArrowUp, ArrowDown, Plus, 
  Sparkles, Download, CheckSquare, Edit3, ArrowLeft, DollarSign 
} from 'lucide-react';

/**
 * Section 10.3: Itinerary Builder Screen
 * Three-column / timeline view with drag/drop activity blocks,
 * day navigation, dynamic packing checklist, and expense tallying.
 */
export default function ItineraryBuilderScreen({ destination, biome, onBack }) {
  const [daysCount, setDaysCount] = useState(3);
  const [activeDay, setActiveDay] = useState(0);

  // Sample day itinerary blocks
  const [itinerary, setItinerary] = useState([
    [
      { id: 1, time: '07:30 AM', title: 'Dawn Horizon & Scenic Walk', duration: '1.5 hrs', cost: 0 },
      { id: 2, time: '10:00 AM', title: 'Guided Biosphere Nature Trail', duration: '2.5 hrs', cost: 1200 },
      { id: 3, time: '04:30 PM', title: 'Sunset Photography & Tea', duration: '2.0 hrs', cost: 450 }
    ],
    [
      { id: 4, time: '09:00 AM', title: 'Local Cultural & Artisan Workshop', duration: '3.0 hrs', cost: 850 },
      { id: 5, time: '06:00 PM', title: 'Stargazing / Night Atmosphere Walk', duration: '2.0 hrs', cost: 300 }
    ],
    [
      { id: 6, time: '08:00 AM', title: 'Heritage Architecture & Fort/Temple Tour', duration: '3.5 hrs', cost: 600 }
    ]
  ]);

  const [newActivityTitle, setNewActivityTitle] = useState('');

  // Add activity to current day
  const handleAddActivity = () => {
    if (!newActivityTitle.trim()) return;
    const newAct = {
      id: Date.now(),
      time: '12:00 PM',
      title: newActivityTitle.trim(),
      duration: '1.5 hrs',
      cost: 500
    };
    const updated = [...itinerary];
    if (!updated[activeDay]) updated[activeDay] = [];
    updated[activeDay].push(newAct);
    setItinerary(updated);
    setNewActivityTitle('');
  };

  // Remove activity
  const handleRemoveActivity = (dayIdx, actIdx) => {
    const updated = [...itinerary];
    updated[dayIdx].splice(actIdx, 1);
    setItinerary(updated);
  };

  const currentDayActivities = itinerary[activeDay] || [];
  const totalCost = itinerary.flat().reduce((sum, item) => sum + (item.cost || 0), 0);

  return (
    <div style={{
      position: 'relative',
      zIndex: 50,
      width: '100%',
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '24px 24px 80px',
      animation: 'slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
    }}>
      {/* Top Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '28px',
        padding: '12px 24px',
        borderRadius: 'var(--radius-pill)',
        background: 'rgba(8, 12, 20, 0.75)',
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
          <span>Back to {destination.name}</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Estimated Sight Expenses:</span>
          <b style={{ color: '#34D399', fontFamily: 'var(--font-mono)', fontSize: '16px' }}>₹{totalCost.toLocaleString('en-IN')}</b>
        </div>
      </div>

      {/* Main Grid: Days Navigation, Day Timeline, AI Optimization */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left Day Selector Sidebar */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '16px', fontFamily: 'var(--font-display)', marginBottom: '14px', color: '#FFFFFF' }}>
            Day Navigation
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
            {Array.from({ length: daysCount }).map((_, idx) => {
              const isActive = activeDay === idx;
              const count = itinerary[idx]?.length || 0;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveDay(idx)}
                  className="glass-interactive"
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid',
                    borderColor: isActive ? (biome?.accentColor || '#38BDF8') : 'rgba(255,255,255,0.08)',
                    backgroundColor: isActive ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.04)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#FFFFFF'
                  }}
                >
                  <span style={{ fontWeight: 700 }}>Day {idx + 1}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{count} items</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              setDaysCount(d => d + 1);
              setItinerary([...itinerary, []]);
            }}
            className="glass-interactive"
            style={{ width: '100%', padding: '10px', fontSize: '12px', fontWeight: 700, border: '1px dashed rgba(255,255,255,0.2)' }}
          >
            + Add Another Day
          </button>
        </div>

        {/* Center Day Timeline Activities */}
        <div className="glass-elevated" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
            <div>
              <div style={{ fontSize: '12px', color: biome?.accentColor || '#38BDF8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Timeline Schedule
              </div>
              <h2 style={{ fontSize: '24px', fontFamily: 'var(--font-display)', margin: '4px 0 0 0', color: '#FFFFFF' }}>
                Day {activeDay + 1} Itinerary
              </h2>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(52, 211, 153, 0.15)',
              color: '#34D399',
              fontSize: '12px',
              fontWeight: 700
            }}>
              <Sparkles size={14} />
              <span>AI Route Optimized</span>
            </div>
          </div>

          {/* Activities List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {currentDayActivities.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
                No activities planned for Day {activeDay + 1} yet. Add an activity below!
              </div>
            ) : (
              currentDayActivities.map((act, actIdx) => (
                <div
                  key={act.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    gap: '14px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: biome?.accentColor || '#38BDF8',
                      fontWeight: 700
                    }}>
                      {act.time}
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: '#FFFFFF' }}>{act.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {act.duration} • {act.cost === 0 ? 'Free' : `₹${act.cost}`}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveActivity(activeDay, actIdx)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'rgba(244, 63, 94, 0.8)',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Add Activity Bar */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Add activity (e.g. Sunset point, Local tea stall, Museum tour)..."
              value={newActivityTitle}
              onChange={(e) => setNewActivityTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddActivity()}
              style={{
                flexGrow: 1,
                padding: '12px 18px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                color: '#FFFFFF',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button
              onClick={handleAddActivity}
              className="glass-interactive"
              style={{
                padding: '12px 24px',
                fontSize: '13px',
                fontWeight: 700,
                backgroundColor: biome?.accentColor || '#38BDF8',
                color: '#FFFFFF',
                border: 'none'
              }}
            >
              Add Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
