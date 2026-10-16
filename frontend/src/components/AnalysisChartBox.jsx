import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, Users, Thermometer, ShieldCheck, 
  MapPin, Sparkles, ChevronRight, PieChart, Activity 
} from 'lucide-react';

/**
 * Bottom-Center "Analysis Chart or Box"
 * Directly placed across Columns 3 & 4 (Mountain & Forest) as sketched.
 * Displays interactive travel biome statistics, climate comparisons,
 * visitor trends, and safety ratings.
 */
export default function AnalysisChartBox({ activeBiome, onSelectBiome }) {
  const [activeTab, setActiveTab] = useState('metrics'); // 'metrics' | 'comparison'

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '24px',
        left: '33.33%',
        width: '33.33%',
        height: '240px',
        zIndex: 50,
        padding: '0 12px',
        pointerEvents: 'auto'
      }}
    >
      <div
        className="glass-elevated"
        style={{
          width: '100%',
          height: '100%',
          padding: '16px 20px',
          borderRadius: 'var(--radius-xl)',
          background: 'rgba(8, 14, 24, 0.88)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 20px 48px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Box Top Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '10px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={16} color="var(--accent-primary)" />
            <span style={{
              fontSize: '13px',
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#FFFFFF'
            }}>
              BIOSPHERE ANALYSIS
            </span>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setActiveTab('metrics')}
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '9999px',
                backgroundColor: activeTab === 'metrics' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.06)',
                color: activeTab === 'metrics' ? '#040608' : 'rgba(255,255,255,0.7)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Metrics
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '9999px',
                backgroundColor: activeTab === 'comparison' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.06)',
                color: activeTab === 'comparison' ? '#040608' : 'rgba(255,255,255,0.7)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Trends
            </button>
          </div>
        </div>

        {/* Tab 1: Current Biome Key Metrics */}
        {activeTab === 'metrics' && (
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>{activeBiome.emoji}</span>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: activeBiome.accentColor, fontFamily: 'var(--font-display)' }}>
                    {activeBiome.name} BIOSPHERE
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{activeBiome.tagline}</div>
                </div>
              </div>

              <div style={{
                padding: '4px 10px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(52, 211, 153, 0.15)',
                color: '#34D399',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <ShieldCheck size={12} />
                <span>{activeBiome.stats.safety} Safety</span>
              </div>
            </div>

            {/* Micro Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <div style={{ padding: '8px 10px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.04)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Avg Climate</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>
                  {activeBiome.stats.avgTemp}
                </div>
              </div>

              <div style={{ padding: '8px 10px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.04)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Optimal Months</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#38BDF8', marginTop: '2px' }}>
                  {activeBiome.stats.bestMonths}
                </div>
              </div>

              <div style={{ padding: '8px 10px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.04)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Ecosystem</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#FBBF24', marginTop: '2px' }}>
                  {activeBiome.stats.biodiversity}
                </div>
              </div>
            </div>

            {/* Featured destinations pill list */}
            <div style={{
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              paddingTop: '4px'
            }}>
              {activeBiome.destinations.map((d, i) => (
                <div
                  key={i}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    fontSize: '11px',
                    whiteSpace: 'nowrap',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <MapPin size={11} color={activeBiome.accentColor} />
                  <span>{d.name}</span>
                  <span style={{ color: '#34D399', fontWeight: 700 }}>★ {d.rating}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Comparative Visitor Trends Spark Bars */}
        {activeTab === 'comparison' && (
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              Annual Visitor Volume Distribution
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '90px', padding: '0 10px' }}>
              {[
                { label: 'Desert', height: '60%', color: '#D97706' },
                { label: 'Beach', height: '90%', color: '#0EA5E9' },
                { label: 'Mountain', height: '75%', color: '#8B5CF6' },
                { label: 'Forest', height: '55%', color: '#10B981' },
                { label: 'Gardens', height: '65%', color: '#F43F5E' },
                { label: 'River', height: '80%', color: '#06B6D4' }
              ].map((bar, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{
                    width: '26px',
                    height: bar.height,
                    backgroundColor: bar.color,
                    borderRadius: '6px 6px 0 0',
                    boxShadow: `0 0 12px ${bar.color}55`,
                    transition: 'height 0.4s ease'
                  }} />
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{bar.label.slice(0, 3)}</span>
                </div>
              ))}
            </div>

            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center' }}>
              Live telemetry aggregated from satellite footfall sensors
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
