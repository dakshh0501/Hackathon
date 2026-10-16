import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeView from './pages/HomeView';
import ExploreView from './pages/ExploreView';
import DestinationDetailView from './pages/DestinationDetailView';
import TripPlannerView from './pages/TripPlannerView';
import ItineraryView from './pages/ItineraryView';
import BudgetView from './pages/BudgetView';
import MyTripsView from './pages/MyTripsView';
import { DEFAULT_TRIP, DESTINATIONS, ATTRACTIONS } from './data/travelData';
import { Compass, CheckCircle } from 'lucide-react';

const STORAGE_KEY = 'traveltales_data_v1';

export default function App() {
  // Active Navigation Page
  const [activePage, setActivePage] = useState('home');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);

  // Load from local storage or default
  const [tripConfig, setTripConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).tripConfig;
    } catch (e) {
      console.warn('Storage read failed', e);
    }
    return DEFAULT_TRIP;
  });

  const [savedTrips, setSavedTrips] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).savedTrips || [];
    } catch (e) {
      console.warn('Storage read failed', e);
    }
    return DEFAULT_TRIP.savedTrips;
  });

  const [savedAttractions, setSavedAttractions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).savedAttractions || [];
    } catch (e) {
      console.warn('Storage read failed', e);
    }
    return DEFAULT_TRIP.savedAttractions;
  });

  const [checklist, setChecklist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).checklist || [];
    } catch (e) {
      console.warn('Storage read failed', e);
    }
    return DEFAULT_TRIP.checklist;
  });

  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).notes || '';
    } catch (e) {
      console.warn('Storage read failed', e);
    }
    return DEFAULT_TRIP.notes;
  });

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      const payload = {
        tripConfig,
        savedTrips,
        savedAttractions,
        checklist,
        notes
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn('Storage write failed', e);
    }
  }, [tripConfig, savedTrips, savedAttractions, checklist, notes]);

  // Toast Notification helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Ensure plan array matches the number of days
  const fitPlanToDays = (plan, targetDays) => {
    const newPlan = [...plan];
    while (newPlan.length < targetDays) {
      newPlan.push([]);
    }
    while (newPlan.length > targetDays) {
      const overflow = newPlan.pop();
      if (newPlan.length > 0 && overflow.length > 0) {
        newPlan[newPlan.length - 1].push(...overflow);
      }
    }
    return newPlan;
  };

  // Handler: Update Trip Config from Planner
  const handleUpdateTrip = (newSettings) => {
    const updatedPlan = fitPlanToDays(tripConfig.plan, newSettings.days);
    setTripConfig({
      ...tripConfig,
      ...newSettings,
      plan: updatedPlan
    });
    if (selectedDayIndex >= newSettings.days) {
      setSelectedDayIndex(0);
    }
    showToast(`Trip configured for ${newSettings.city}!`);
  };

  // Handler: Add attraction to a specific day
  const handleAddToItinerary = (attractionId, dayIndex) => {
    const currentPlan = [...tripConfig.plan];
    while (currentPlan.length <= dayIndex) {
      currentPlan.push([]);
    }
    // Check if sight already in that day
    if (currentPlan[dayIndex].includes(attractionId)) {
      showToast('Attraction already in Day ' + (dayIndex + 1));
      return;
    }
    currentPlan[dayIndex].push(attractionId);
    setTripConfig({ ...tripConfig, plan: currentPlan });
    const sight = ATTRACTIONS.find(a => a.id === attractionId);
    showToast(`Added ${sight?.name || 'Attraction'} to Day ${dayIndex + 1}`);
  };

  // Handler: Remove activity from day
  const handleRemoveActivity = (dayIndex, actIndex) => {
    const currentPlan = [...tripConfig.plan];
    if (currentPlan[dayIndex]) {
      currentPlan[dayIndex].splice(actIndex, 1);
      setTripConfig({ ...tripConfig, plan: currentPlan });
      showToast('Removed from itinerary');
    }
  };

  // Handler: Move activity up or down
  const handleMoveActivity = (dayIndex, actIndex, direction) => {
    const currentPlan = [...tripConfig.plan];
    const day = [...currentPlan[dayIndex]];
    const targetIndex = actIndex + direction;
    if (targetIndex >= 0 && targetIndex < day.length) {
      const temp = day[actIndex];
      day[actIndex] = day[targetIndex];
      day[targetIndex] = temp;
      currentPlan[dayIndex] = day;
      setTripConfig({ ...tripConfig, plan: currentPlan });
    }
  };

  // Handler: Clear all days
  const handleClearPlan = () => {
    const emptyPlan = Array.from({ length: tripConfig.days }).map(() => []);
    setTripConfig({ ...tripConfig, plan: emptyPlan });
    showToast('All days cleared');
  };

  // Handler: Toggle saved bookmark attraction
  const handleToggleSaveAttraction = (id) => {
    let updated;
    if (savedAttractions.includes(id)) {
      updated = savedAttractions.filter(x => x !== id);
      showToast('Removed bookmark');
    } else {
      updated = [...savedAttractions, id];
      showToast('Added to bookmarks');
    }
    setSavedAttractions(updated);
  };

  // Handler: Save current configured trip to My Trips
  const handleSaveCurrentTrip = () => {
    const newSaved = {
      id: 'trip-' + Date.now(),
      city: tripConfig.city,
      startDate: tripConfig.startDate,
      days: tripConfig.days,
      travelers: tripConfig.travelers,
      plan: tripConfig.plan,
      budgetTier: tripConfig.budgetTier,
      createdAt: new Date().toISOString().slice(0, 10)
    };
    setSavedTrips([newSaved, ...savedTrips]);
    showToast('Saved current journey to My Trips!');
  };

  // Handler: Load a saved trip
  const handleLoadTrip = (trip) => {
    setTripConfig({
      city: trip.city,
      startDate: trip.startDate,
      days: trip.days,
      travelers: trip.travelers,
      budgetTier: trip.budgetTier || 'comfort',
      plan: fitPlanToDays(trip.plan, trip.days)
    });
    setActivePage('itinerary');
    showToast(`Loaded ${trip.city} itinerary!`);
  };

  // Handler: Delete a saved trip
  const handleDeleteTrip = (id) => {
    setSavedTrips(savedTrips.filter(t => t.id !== id));
    showToast('Trip deleted from journal');
  };

  // Handler: Toggle checklist item
  const handleToggleChecklist = (id) => {
    setChecklist(checklist.map(c => c.id === id ? { ...c, done: !c.done } : c));
  };

  // Handler: Add new checklist item
  const handleAddChecklist = (text) => {
    const newItem = { id: Date.now(), text, done: false };
    setChecklist([...checklist, newItem]);
    showToast('Added to checklist');
  };

  // Handler: Select destination for detail view
  const handleSelectDestination = (dest) => {
    setSelectedDestination(dest);
    setActivePage('destination-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Start planning trip with pre-selected city
  const handlePlanForCity = (cityName) => {
    if (cityName) {
      setTripConfig({ ...tripConfig, city: cityName });
    }
    setActivePage('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Editorial Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={(p) => {
          setActivePage(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={savedAttractions.length}
        tripDays={tripConfig.days}
        currentCity={tripConfig.city}
      />

      {/* Main Page Views Router */}
      <main style={{ flexGrow: 1 }}>
        {activePage === 'home' && (
          <HomeView
            onSelectDestination={handleSelectDestination}
            onPlanTrip={handlePlanForCity}
            onExploreAll={() => {
              setActivePage('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activePage === 'explore' && (
          <ExploreView
            onAddToItinerary={handleAddToItinerary}
            savedAttractions={savedAttractions}
            onToggleSave={handleToggleSaveAttraction}
            selectedDayIndex={selectedDayIndex}
            setSelectedDayIndex={setSelectedDayIndex}
            totalTripDays={tripConfig.days}
            onViewDestination={handleSelectDestination}
          />
        )}

        {activePage === 'destination-detail' && (
          <DestinationDetailView
            destination={selectedDestination}
            onBack={() => setActivePage('home')}
            onStartPlanning={handlePlanForCity}
            onAddToDay={(attractionId, day) => handleAddToItinerary(attractionId, day)}
          />
        )}

        {activePage === 'planner' && (
          <TripPlannerView
            tripConfig={tripConfig}
            onUpdateTrip={handleUpdateTrip}
            onProceedToItinerary={() => {
              setActivePage('itinerary');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activePage === 'itinerary' && (
          <ItineraryView
            tripConfig={tripConfig}
            onRemoveActivity={handleRemoveActivity}
            onMoveActivity={handleMoveActivity}
            onClearPlan={handleClearPlan}
            onAddFromExplore={() => {
              setActivePage('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            checklist={checklist}
            onToggleChecklist={handleToggleChecklist}
            onAddChecklist={handleAddChecklist}
            notes={notes}
            onChangeNotes={setNotes}
            onSaveTrip={handleSaveCurrentTrip}
          />
        )}

        {activePage === 'budget' && (
          <BudgetView
            tripConfig={tripConfig}
            onProceedToPlanner={() => setActivePage('planner')}
            onProceedToItinerary={() => setActivePage('itinerary')}
          />
        )}

        {activePage === 'my-trips' && (
          <MyTripsView
            savedTrips={savedTrips}
            onLoadTrip={handleLoadTrip}
            onDeleteTrip={handleDeleteTrip}
            savedAttractions={savedAttractions}
            onToggleSaveAttraction={handleToggleSaveAttraction}
            onPlanNewTrip={() => setActivePage('planner')}
            onSelectDestination={handleSelectDestination}
          />
        )}
      </main>

      {/* Editorial Footer */}
      <footer style={{
        backgroundColor: '#114232',
        color: '#FAF6ED',
        padding: '50px 20px 30px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        marginTop: 'auto'
      }}>
        <div className="app-container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '36px',
          marginBottom: '40px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Compass size={22} color="var(--terracotta)" />
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 800 }}>
                Travel<span style={{ color: 'var(--terracotta)' }}>Tales</span>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: '#B4C5BD', lineHeight: 1.6, maxWidth: '300px' }}>
              Every journey tells a story. Dedicated to local cultural tourism, heritage discovery, and multi-day experiential trip planning across India.
            </p>
          </div>

          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', color: 'var(--gold-accent)' }}>
              Destinations
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#B4C5BD' }}>
              {DESTINATIONS.slice(0, 4).map(d => (
                <span
                  key={d.id}
                  onClick={() => handleSelectDestination(d)}
                  style={{ cursor: 'pointer', transition: 'color 0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#B4C5BD'}
                >
                  {d.name} ({d.state})
                </span>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', color: 'var(--gold-accent)' }}>
              Quick Navigation
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#B4C5BD' }}>
              <span onClick={() => setActivePage('home')} style={{ cursor: 'pointer' }}>Home Overview</span>
              <span onClick={() => setActivePage('explore')} style={{ cursor: 'pointer' }}>Attractions Directory</span>
              <span onClick={() => setActivePage('planner')} style={{ cursor: 'pointer' }}>Custom Trip Planner</span>
              <span onClick={() => setActivePage('budget')} style={{ cursor: 'pointer' }}>Expense Estimator</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', color: 'var(--gold-accent)' }}>
              Travelers' Note
            </div>
            <p style={{ fontSize: '12px', color: '#A0B4AB', lineHeight: 1.6 }}>
              Monument timings and entry tariffs are verified against domestic tourism guidelines. Verify seasonal temple rituals prior to your journey.
            </p>
          </div>
        </div>

        <div className="app-container" style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '12px',
          color: '#8CA197'
        }}>
          <div>© {new Date().getFullYear()} TravelTales India. Built for local tourism hackathon.</div>
          <div>Warm Ivory • Forest Green • Muted Terracotta</div>
        </div>
      </footer>

      {/* Floating Toast Notice */}
      {toastMessage && (
        <div className="toast-notice">
          <CheckCircle size={18} color="#A7F3D0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
