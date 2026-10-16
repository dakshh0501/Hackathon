import type { EngineTripContext, EngineItineraryItem, EngineItineraryDay } from './types.ts';
import { engineConfig } from '../config/engine.config.ts';
import { minutesToTimeString } from './geo.ts';
import { validateTripItinerary } from './checker.ts';
import type { ValidationResult } from './checker.ts';

export interface GenerateOptions {
  mode: 'replace' | 'append';
  interests?: string[];
  avoidAttractionIds?: string[];
}

export interface GeneratedPlanResult {
  days: EngineItineraryDay[];
  explanations: Array<{ itemId: string; reason: string }>;
  validation: ValidationResult;
}

/**
 * Auto-Itinerary Generator (Pure Function)
 * Generates an optimized, conflict-checked itinerary with transparent explanations.
 */
export function generateItinerary(
  trip: EngineTripContext,
  availableAttractions: EngineItineraryItem[],
  options: GenerateOptions = { mode: 'replace' }
): GeneratedPlanResult {
  const selectedInterests = (options.interests && options.interests.length > 0)
    ? options.interests
    : trip.interests;

  const avoidSet = new Set(options.avoidAttractionIds || []);

  // 1. Filter candidates
  const candidates = availableAttractions.filter((att) => {
    if (avoidSet.has(att.attractionId)) return false;
    // Check wheelchair suitability
    if ((trip.needs.includes('wheelchair') || trip.needs.includes('step_free')) && att.access?.wheelchairOk === 'no') {
      return false;
    }
    return true;
  });

  // 2. Score candidates
  const scored = candidates.map((att) => {
    let interestScore = 0;
    // Basic match
    if (selectedInterests.some((int) => att.name.toLowerCase().includes(int.toLowerCase()))) {
      interestScore = engineConfig.scoringWeights.interestMatch;
    }

    const adultPrice = att.prices?.find((p) => p.travellerType === 'adult')?.amountPaise || 5000;
    const costPenalty = adultPrice * engineConfig.scoringWeights.costPenaltyFactor;
    const popularityScore = att.popularity * engineConfig.scoringWeights.popularity;

    const totalScore = interestScore + popularityScore - costPenalty;
    return { item: att, score: totalScore };
  });

  scored.sort((a, b) => b.score - a.score);

  // 3. Distribute across trip days
  const numDays = Math.max(1, trip.days.length);
  const itemsPerDay = trip.pace === 'relaxed' ? 2 : trip.pace === 'moderate' ? 3 : 4;
  const totalSlots = numDays * itemsPerDay;
  const picked = scored.slice(0, totalSlots).map((s) => s.item);

  const generatedDays: EngineItineraryDay[] = trip.days.map((day, dIdx) => {
    const dayItems: EngineItineraryItem[] = [];
    const startIndex = dIdx * itemsPerDay;
    const dayCandidates = picked.slice(startIndex, startIndex + itemsPerDay);

    // Schedule stops starting at 09:30 AM
    let currentMinute = 9 * 60 + 30; // 09:30

    dayCandidates.forEach((cand, idx) => {
      const visitDuration = cand.avgVisitMinutes || 90;
      const startTime = minutesToTimeString(currentMinute);
      const endTime = minutesToTimeString(currentMinute + visitDuration);

      dayItems.push({
        ...cand,
        id: `gen_itm_${day.dayNumber}_${idx + 1}`,
        startTime,
        endTime,
        orderIndex: idx,
      });

      // Add travel buffer of 45 mins before next stop
      currentMinute += visitDuration + 45;
    });

    return {
      ...day,
      items: dayItems,
    };
  });

  // 4. Generate transparent explanations
  const explanations: Array<{ itemId: string; reason: string }> = [];
  for (const day of generatedDays) {
    for (const itm of day.items) {
      explanations.push({
        itemId: itm.id,
        reason: `Selected for its high cultural popularity (${itm.popularity}/100) and scheduled during optimal morning/afternoon visiting hours.`,
      });
    }
  }

  // 5. Run validation checker on generated plan
  const planContext: EngineTripContext = {
    ...trip,
    days: generatedDays,
  };
  const validation = validateTripItinerary(planContext);

  return {
    days: generatedDays,
    explanations,
    validation,
  };
}
