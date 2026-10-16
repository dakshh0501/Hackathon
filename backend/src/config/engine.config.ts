/**
 * Engine Configuration
 * All rule parameters (speeds, buffers, pace limits, budget bands, scoring weights)
 * live in this config file so they are transparent, explainable, and testable.
 */

export const engineConfig = {
  // Travel Speeds (in km/h)
  speeds: {
    walking: 4.5,
    cityTransit: 25.0,
    car: 40.0,
  },

  // Travel time buffer in minutes added between stops
  travelTimeBufferMinutes: 15,

  // Pace limits: maximum activity + travel hours allowed per day
  paceLimitsHours: {
    relaxed: 6,
    moderate: 8,
    packed: 10,
  },

  // Budget forecast bands (% of likely cost)
  budgetBands: {
    minPercentage: 0.85, // -15%
    maxPercentage: 1.25, // +25%
  },

  // Scoring weights for auto-itinerary generation
  scoringWeights: {
    interestMatch: 40,
    popularity: 0.6,
    costPenaltyFactor: 0.0001,
  },

  // Default national cost profiles in paise per day / per night
  defaultCostProfiles: {
    budget: {
      hotelPerNightPaise: 150000, // ₹1,500
      foodPerPersonDayPaise: 60000, // ₹600
      localTransportPerKmPaise: 1500, // ₹15/km
    },
    standard: {
      hotelPerNightPaise: 350000, // ₹3,500
      foodPerPersonDayPaise: 120000, // ₹1,200
      localTransportPerKmPaise: 2500, // ₹25/km
    },
    premium: {
      hotelPerNightPaise: 800000, // ₹8,000
      foodPerPersonDayPaise: 250000, // ₹2,500
      localTransportPerKmPaise: 4000, // ₹40/km
    },
  },
};
