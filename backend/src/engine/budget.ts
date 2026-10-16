import type { EngineTripContext } from './types.ts';
import { engineConfig } from '../config/engine.config.ts';

export interface CategoryBudget {
  minPaise: number;
  likelyPaise: number;
  maxPaise: number;
}

export interface BudgetEstimateResult {
  currency: 'INR';
  categories: {
    accommodation: CategoryBudget;
    food: CategoryBudget;
    entry: CategoryBudget;
    transport: CategoryBudget;
  };
  total: CategoryBudget;
  budgetPaise: number;
  withinBudget: boolean;
  confidence: 'low' | 'medium' | 'high';
  confidenceReason: string;
}

/**
 * Smart Budget Estimator (Pure Function)
 * Calculates min, likely, and max budget estimates with confidence scoring.
 */
export function estimateTripBudget(
  trip: EngineTripContext,
  customCostProfile?: {
    hotelPerNightPaise: number;
    foodPerPersonDayPaise: number;
    localTransportPerKmPaise: number;
  }
): BudgetEstimateResult {
  const profile = customCostProfile || engineConfig.defaultCostProfiles[trip.tier] || engineConfig.defaultCostProfiles.standard;

  const totalTravellers = Math.max(1, trip.adults + trip.children + trip.seniors);
  const totalDays = Math.max(1, trip.days.length);
  const nights = Math.max(1, totalDays - 1);

  // 1. Accommodation
  const roomOccupancy = 2;
  const rooms = Math.ceil(totalTravellers / roomOccupancy);
  const likelyAccommodation = nights * rooms * profile.hotelPerNightPaise;
  const accommodation: CategoryBudget = {
    minPaise: Math.round(likelyAccommodation * engineConfig.budgetBands.minPercentage),
    likelyPaise: likelyAccommodation,
    maxPaise: Math.round(likelyAccommodation * engineConfig.budgetBands.maxPercentage),
  };

  // 2. Food
  const likelyFood = profile.foodPerPersonDayPaise * totalTravellers * totalDays;
  const food: CategoryBudget = {
    minPaise: Math.round(likelyFood * engineConfig.budgetBands.minPercentage),
    likelyPaise: likelyFood,
    maxPaise: Math.round(likelyFood * engineConfig.budgetBands.maxPercentage),
  };

  // 3. Entry Fees & Tickets
  let likelyEntry = 0;
  let verifiedCount = 0;
  let totalFactCount = 0;

  for (const day of trip.days) {
    for (const item of day.items) {
      totalFactCount++;
      if (item.dataStatus === 'verified') {
        verifiedCount++;
      }

      if (item.prices && item.prices.length > 0) {
        for (const price of item.prices) {
          if (price.travellerType === 'adult') {
            likelyEntry += price.amountPaise * trip.adults;
          } else if (price.travellerType === 'child') {
            likelyEntry += price.amountPaise * trip.children;
          } else if (price.travellerType === 'senior') {
            likelyEntry += price.amountPaise * trip.seniors;
          }
        }
      } else {
        // Default nominal entry fee ₹50 (5000 paise) per adult if not specified
        likelyEntry += 5000 * trip.adults;
      }
    }
  }

  const entry: CategoryBudget = {
    minPaise: Math.round(likelyEntry * 0.9),
    likelyPaise: likelyEntry,
    maxPaise: Math.round(likelyEntry * 1.15),
  };

  // 4. Local Transport
  // Estimated ~25 km per day travel within tourist city
  const estimatedDailyKm = 25;
  const likelyTransport = totalDays * estimatedDailyKm * profile.localTransportPerKmPaise;
  const transport: CategoryBudget = {
    minPaise: Math.round(likelyTransport * engineConfig.budgetBands.minPercentage),
    likelyPaise: likelyTransport,
    maxPaise: Math.round(likelyTransport * engineConfig.budgetBands.maxPercentage),
  };

  // Total
  const totalMin = accommodation.minPaise + food.minPaise + entry.minPaise + transport.minPaise;
  const totalLikely = accommodation.likelyPaise + food.likelyPaise + entry.likelyPaise + transport.likelyPaise;
  const totalMax = accommodation.maxPaise + food.maxPaise + entry.maxPaise + transport.maxPaise;

  // Confidence Calculation
  let confidence: 'low' | 'medium' | 'high' = 'medium';
  let confidenceReason = 'Based on regional benchmark standards';

  if (totalFactCount > 0) {
    const verifiedRatio = verifiedCount / totalFactCount;
    if (verifiedRatio >= 0.8) {
      confidence = 'high';
      confidenceReason = `${Math.round(verifiedRatio * 100)}% of attraction data verified with official sources`;
    } else if (verifiedRatio < 0.4) {
      confidence = 'low';
      confidenceReason = 'Most attraction cost inputs are indicative sample estimates';
    } else {
      confidence = 'medium';
      confidenceReason = 'Mix of verified and sample estimates';
    }
  }

  return {
    currency: 'INR',
    categories: {
      accommodation,
      food,
      entry,
      transport,
    },
    total: {
      minPaise: totalMin,
      likelyPaise: totalLikely,
      maxPaise: totalMax,
    },
    budgetPaise: trip.budgetPaise,
    withinBudget: trip.budgetPaise > 0 ? totalLikely <= trip.budgetPaise : true,
    confidence,
    confidenceReason,
  };
}
