import React from 'react';
import { 
  DollarSign, Users, Calendar, Hotel, Utensils, Car, Ticket, 
  TrendingUp, ShieldCheck, ArrowRight, PieChart as PieIcon 
} from 'lucide-react';
import { DESTINATIONS, ATTRACTIONS } from '../data/travelData';

export default function BudgetView({ tripConfig, onProceedToPlanner, onProceedToItinerary }) {
  // Destination base rates
  const destination = DESTINATIONS.find(d => d.name === tripConfig.city) || DESTINATIONS[1];
  
  // Accommodation rate depending on comfort tier
  let stayMultiplier = 1.0;
  if (tripConfig.budgetTier === 'budget') stayMultiplier = 0.55;
  if (tripConfig.budgetTier === 'luxury') stayMultiplier = 2.4;

  const baseStayPerNight = Math.round(destination.rates.stay * stayMultiplier);
  const nights = Math.max(tripConfig.days - 1, 1);
  const roomsNeeded = Math.ceil(tripConfig.travelers / 2);
  const totalStay = roomsNeeded * baseStayPerNight * nights;

  // Food calculation: meals per day per traveler
  const foodPerPersonPerDay = destination.rates.food;
  const totalFood = tripConfig.travelers * foodPerPersonPerDay * tripConfig.days;

  // Transport: local cabs / autos per day
  const transportPerDay = destination.rates.transport;
  const totalTransport = transportPerDay * tripConfig.days;

  // Entry fees for all planned attractions across days
  const flatAttractionIds = tripConfig.plan.flat();
  const totalEntryFees = flatAttractionIds.reduce((sum, id) => {
    const sight = ATTRACTIONS.find(a => a.id === id);
    return sum + (sight ? sight.fee * tripConfig.travelers : 0);
  }, 0);

  // Miscellaneous / buffer (5%)
  const subtotal = totalStay + totalFood + totalTransport + totalEntryFees;
  const contingencyBuffer = Math.round(subtotal * 0.06);
  const grandTotal = subtotal + contingencyBuffer;
  const costPerPerson = Math.round(grandTotal / tripConfig.travelers);

  // Cost items breakdown
  const budgetItems = [
    {
      category: 'Accommodation (Hotels / Havelis)',
      amount: totalStay,
      rateInfo: `${roomsNeeded} room(s) × ₹${baseStayPerNight.toLocaleString('en-IN')}/nt × ${nights} night(s)`,
      icon: Hotel,
      color: '#114232'
    },
    {
      category: 'Food, Dining & Street Sweets',
      amount: totalFood,
      rateInfo: `${tripConfig.travelers} traveler(s) × ₹${foodPerPersonPerDay}/day × ${tripConfig.days} days`,
      icon: Utensils,
      color: '#C85A32'
    },
    {
      category: 'Local Transport (Auto / Cabs)',
      amount: totalTransport,
      rateInfo: `₹${transportPerDay.toLocaleString('en-IN')}/day dedicated local travel × ${tripConfig.days} days`,
      icon: Car,
      color: '#D4A373'
    },
    {
      category: 'Monument & Heritage Entry Tickets',
      amount: totalEntryFees,
      rateInfo: `${flatAttractionIds.length} planned site visits across ${tripConfig.travelers} persons`,
      icon: Ticket,
      color: '#654321'
    },
    {
      category: 'Contingency & Incidentals (6%)',
      amount: contingencyBuffer,
      rateInfo: 'Shopping, tips, pooja offerings, rickshaws, and reserves',
      icon: TrendingUp,
      color: '#70776D'
    }
  ];

  return (
    <div className="fade-in app-container" style={{ padding: '40px 20px 80px' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '36px' }}>
        <span className="editorial-chip" style={{ marginBottom: '8px' }}>
          Real-Time Expense Forecasting
        </span>
        <h1 style={{ fontSize: '38px', color: 'var(--forest-green)', marginBottom: '8px' }}>
          Trip Budget Breakdown
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
          Comprehensive estimate for your <b>{tripConfig.days}-day</b> journey in <b>{tripConfig.city}</b> for <b>{tripConfig.travelers} traveler(s)</b>.
        </p>
      </div>

      {/* Top Highlight Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px',
        marginBottom: '36px'
      }}>
        {/* Total Cost */}
        <div className="editorial-card" style={{
          padding: '24px',
          background: 'var(--forest-green)',
          color: '#FFFFFF'
        }}>
          <div style={{ fontSize: '13px', color: '#BDE3D5', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
            Estimated Total Budget
          </div>
          <div style={{ fontSize: '38px', fontWeight: 800, fontFamily: 'var(--font-serif)', lineHeight: 1.1 }}>
            ₹{grandTotal.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '13px', color: '#D2EDE3', marginTop: '10px' }}>
            Includes stay, food, transport, tickets & buffer
          </div>
        </div>

        {/* Cost Per Person */}
        <div className="editorial-card" style={{
          padding: '24px',
          background: 'var(--terracotta-light)',
          borderColor: '#F3D2C4'
        }}>
          <div style={{ fontSize: '13px', color: 'var(--terracotta)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', fontWeight: 700 }}>
            Cost Per Person
          </div>
          <div style={{ fontSize: '38px', fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--terracotta)', lineHeight: 1.1 }}>
            ₹{costPerPerson.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '13px', color: '#884D35', marginTop: '10px' }}>
            Split evenly for {tripConfig.travelers} traveler(s)
          </div>
        </div>

        {/* Daily Burn Rate */}
        <div className="editorial-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', fontWeight: 600 }}>
            Average Cost Per Day
          </div>
          <div style={{ fontSize: '38px', fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--forest-green)', lineHeight: 1.1 }}>
            ₹{Math.round(grandTotal / tripConfig.days).toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '10px' }}>
            Comfort tier: <b style={{ textTransform: 'capitalize' }}>{tripConfig.budgetTier}</b>
          </div>
        </div>
      </div>

      {/* Main Breakdown Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.8fr 1.2fr',
        gap: '32px',
        alignItems: 'start'
      }}>
        {/* Left Detailed Categories */}
        <div className="editorial-card" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '22px', marginBottom: '20px' }}>Itemized Expenses</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {budgetItems.map((item, idx) => {
              const Icon = item.icon;
              const percent = grandTotal > 0 ? ((item.amount / grandTotal) * 100).toFixed(1) : 0;

              return (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--bg-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--forest-green)'
                      }}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '15px' }}>{item.category}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.rateInfo}</div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, fontSize: '16px' }}>₹{item.amount.toLocaleString('en-IN')}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{percent}% of total</div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div style={{
                    height: '7px',
                    width: '100%',
                    backgroundColor: 'var(--bg-subtle)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginTop: '4px'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${percent}%`,
                      backgroundColor: item.color,
                      borderRadius: '4px',
                      transition: 'width 0.5s ease'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Cost Saving Tips & Action */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="editorial-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} color="var(--forest-green)" />
              <span>Budget Accuracy Insights</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              <p>
                <b>Accommodation:</b> Based on comfortable heritage havelis or boutique guest stays in {tripConfig.city}.
              </p>
              <p>
                <b>Dining:</b> Covers 3 meals/day including local breakfast, heritage lunch, and tea breaks at reputed dining spots.
              </p>
              <p>
                <b>Monument Tickets:</b> Calculated from official ASI (Archaeological Survey of India) entry tariffs for domestic travelers.
              </p>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={onProceedToItinerary}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                <span>Review Itinerary Sights</span>
                <ArrowRight size={15} />
              </button>
              <button
                onClick={onProceedToPlanner}
                className="btn-secondary"
                style={{ width: '100%' }}
              >
                <span>Adjust Trip Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
