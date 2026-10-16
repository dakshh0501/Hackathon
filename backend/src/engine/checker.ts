import type { EngineTripContext, Finding } from './types.ts';
import { checkOpeningHours } from './rules/r1_opening_hours.ts';
import { checkTravelFeasibility } from './rules/r2_travel_feasibility.ts';
import { checkDayOverload } from './rules/r3_day_overload.ts';
import { checkOverlapAndDuplicates } from './rules/r4_overlap_duplicates.ts';
import { checkBudgetOverrun } from './rules/r5_budget_overrun.ts';
import { checkSuitability } from './rules/r6_suitability.ts';
import { checkSeasonalNotes } from './rules/r7_seasonal.ts';

export interface ValidationResult {
  summary: {
    errors: number;
    warnings: number;
    infos: number;
    score: number; // 0 to 100 Health Score
  };
  findings: Finding[];
}

/**
 * Trip Intelligence Engine - Master Conflict Checker
 * Pure function that evaluates rules R1 to R7 against a trip context.
 */
export function validateTripItinerary(
  trip: EngineTripContext,
  estimatedTotalPaise = 0
): ValidationResult {
  const findings: Finding[] = [
    ...checkOpeningHours(trip),
    ...checkOverlapAndDuplicates(trip),
    ...checkTravelFeasibility(trip),
    ...checkDayOverload(trip),
    ...checkSuitability(trip),
    ...checkBudgetOverrun(trip, estimatedTotalPaise),
    ...checkSeasonalNotes(trip),
  ];

  let errors = 0;
  let warnings = 0;
  let infos = 0;

  for (const f of findings) {
    if (f.severity === 'error') errors++;
    else if (f.severity === 'warning') warnings++;
    else if (f.severity === 'info') infos++;
  }

  // Health Score calculation (0 to 100)
  // Deduct 25 per error, 8 per warning, down to minimum 0
  const penalty = errors * 25 + warnings * 8;
  const score = Math.max(0, 100 - penalty);

  return {
    summary: {
      errors,
      warnings,
      infos,
      score,
    },
    findings,
  };
}
