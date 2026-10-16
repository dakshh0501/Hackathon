import React, { useState } from 'react';
import { 
  TrendingUp, DollarSign, Car, Train, Plane, Fuel, 
  Sparkles, ShieldCheck, ArrowUpRight, BarChart2, Layers 
} from 'lucide-react';

/**
 * Biosphere Analysis: Stock-Chart Style Expense & Vehicle Financial Forecaster
 * Features:
 * - Dynamic SVG candlestick / area financial stock trend chart for trip budget
 * - Calculates total money, daily charges, breakdown (Stay, Food, Permits, Fuel)
 * - Vehicle Recommendation Engine (Car vs Train vs Flight based on distance & cost)
 * - Real-time vehicle selection updating total budget calculation
 */
export default function AnalysisChartBox({ activeBiome, onSelectBiome }) {
  const [selectedVehicle, setSelectedVehicle] = useState('car'); // 'car' | 'train' | 'flight'
  const [timeframe, setTimeframe] = useState('3D'); // '1D' | '3D' | '7D'

  // Dynamic pricing multipliers based on vehicle
  const vehicleOptions = {
    car: {
      name: 'SUV / Cab Rental',
      icon: Car,
      ratePerKm: 14,
      estDistanceKm: 620,
      travelTime: '7h 30m',
      carbonKg: '85 kg CO2',
      baseTransitCost: 8680,
      efficiencyTag: 'Best for groups & scenic freedom',
      recommended: true
    },
    train: {
      name: 'High-Speed Express Rail',
      icon: Train,
      ratePerKm: 3.5,
      estDistanceKm: 580,
      travelTime: '5h 15m',
      carbonKg: '24 kg CO2 (Eco-Friendly)',
      baseTransitCost: 2030,
      efficiencyTag: 'Lowest cost & eco-optimal',
      recommended: false
    },
    flight: {
      name: 'Regional Airway Flight',
      icon: Plane,
      ratePerKm: 9.8,
      estDistanceKm: 510,
      travelTime: '1h 20m',
      carbonKg: '145 kg CO2',
      baseTransitCost: 4998,
      efficiencyTag: 'Fastest commute',
      recommended: false
    }
  };

  const currentVehicleData = vehicleOptions[selectedVehicle];

  // Base daily costs per biome
  const daysMultiplier = timeframe === '1D' ? 1 : timeframe === '3D' ? 3 : 7;
  const stayPerDay = 3200;
  const foodPerDay = 1100;
  const permitsPerDay = 450;

  const totalStay = stayPerDay * daysMultiplier;
  const totalFood = foodPerDay * daysMultiplier;
  const totalPermits = permitsPerDay * daysMultiplier;
  const totalTransit = currentVehicleData.baseTransitCost;
  const grandTotalCost = totalStay + totalFood + totalPermits + totalTransit;

  // Candlestick / Stock Trend points for the timeframe
  const stockPoints = timeframe === '1D'
    ? [
        { label: '06:00', price: 2100 },
        { label: '09:00', price: 2800 },
        { label: '12:00', price: 3400 },
        { label: '15:00', price: 4100 },
        { label: '18:00', price: 4750 },
        { label: '21:00', price: grandTotalCost }
      ]
    : timeframe === '3D'
    ? [
        { label: 'Day 1 Base', price: 4200 },
        { label: 'Day 1 Night', price: 7800 },
        { label: 'Day 2 Peak', price: 11400 },
        { label: 'Day 2 Night', price: 14200 },
        { label: 'Day 3 Sights', price: 16800 },
        { label: 'Total Est.', price: grandTotalCost }
      ]
    : [
        { label: 'Day 1', price: 6500 },
        { label: 'Day 2', price: 12800 },
        { label: 'Day 3', price: 18900 },
        { label: 'Day 4', price: 24200 },
        { label: 'Day 5', price: 29500 },
        { label: 'Day 7 Total', price: grandTotalCost }
      ];

  // Normalize stock chart points for SVG path (viewBox: 0 0 340 70)
  const maxPrice = Math.max(...stockPoints.map(p => p.price)) * 1.1;
  const minPrice = Math.min(...stockPoints.map(p => p.price)) * 0.8;
  const svgPoints = stockPoints.map((p, i) => {
    const x = (i / (stockPoints.length - 1)) * 320 + 10;
    const y = 65 - ((p.price - minPrice) / (maxPrice - minPrice)) * 50;
    return `${x},${y}`;
  });

  const pathD = `M ${svgPoints[0]} ` + svgPoints.slice(1).map(pt => `L ${pt}`).join(' ');
  const areaD = `${pathD} L 330,68 L 10,68 Z`;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '24px',
        left: '33.33%',
        width: '33.33%',
        height: '270px',
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
          padding: '14px 18px',
          borderRadius: 'var(--radius-xl)',
          background: 'rgba(8, 14, 24, 0.35)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.16)',
          boxShadow: '0 20px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden'
        }}
      >
        {/* Header: Title + Ticker + Timeframe switch */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              backgroundColor: 'rgba(52, 211, 153, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#34D399'
            }}>
              <TrendingUp size={14} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                FINANCIAL BUDGET & COMMUTE MATRIX
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '4px' }}>
            {['1D', '3D', '7D'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '6px',
                  backgroundColor: timeframe === tf ? 'var(--accent-primary)' : 'rgba(255,255,255,0.06)',
                  color: timeframe === tf ? '#040608' : 'rgba(255,255,255,0.7)',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Live Total Figure & Candlestick/Area Sparkline */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '2px' }}>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Est. Total Outlay ({timeframe})
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#FFFFFF' }}>
                ₹{grandTotalCost.toLocaleString('en-IN')}
              </span>
              <span style={{ fontSize: '11px', color: '#34D399', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                <ArrowUpRight size={13} /> +4.2%
              </span>
            </div>
          </div>

          <div style={{ textAlign: 'right', fontSize: '10px', color: 'var(--text-secondary)' }}>
            <div>Transit: <b style={{ color: '#38BDF8' }}>₹{totalTransit.toLocaleString('en-IN')}</b></div>
            <div>Stay & Food: <b style={{ color: '#FBBF24' }}>₹{(totalStay + totalFood).toLocaleString('en-IN')}</b></div>
          </div>
        </div>

        {/* Stock Chart Area Display */}
        <div style={{ position: 'relative', width: '100%', height: '62px', margin: '2px 0' }}>
          <svg viewBox="0 0 340 70" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <defs>
              <linearGradient id="stockAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34D399" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#34D399" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid Dotted Lines */}
            <line x1="10" y1="20" x2="330" y2="20" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
            <line x1="10" y1="45" x2="330" y2="45" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

            {/* Stock Area Fill */}
            <path d={areaD} fill="url(#stockAreaGrad)" />

            {/* Glowing Stock Line */}
            <path d={pathD} fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" />

            {/* Price node dots */}
            {svgPoints.map((pt, i) => {
              const [cx, cy] = pt.split(',');
              return (
                <circle key={i} cx={cx} cy={cy} r={i === svgPoints.length - 1 ? 4 : 2.5} fill="#FFFFFF" stroke="#34D399" strokeWidth="1.5" />
              );
            })}
          </svg>
        </div>

        {/* Vehicle Decision & Recommendation Engine */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '8px'
        }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
            <span>Recommended Vehicle to Take:</span>
            <span style={{ color: '#38BDF8', fontWeight: 600 }}>{currentVehicleData.efficiencyTag}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
            {Object.entries(vehicleOptions).map(([key, opt]) => {
              const Icon = opt.icon;
              const isSelected = selectedVehicle === key;

              return (
                <button
                  key={key}
                  onClick={() => setSelectedVehicle(key)}
                  style={{
                    padding: '6px 8px',
                    borderRadius: '8px',
                    backgroundColor: isSelected ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.08)',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s'
                  }}
                >
                  <Icon size={14} color={isSelected ? 'var(--accent-primary)' : 'rgba(255,255,255,0.6)'} />
                  <div style={{ textAlign: 'left', minWidth: 0 }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {key.toUpperCase()}
                    </div>
                    <div style={{ fontSize: '9px', color: '#34D399', fontFamily: 'var(--font-mono)' }}>
                      ₹{opt.baseTransitCost}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
