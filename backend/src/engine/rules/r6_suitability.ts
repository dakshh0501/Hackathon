import type { EngineTripContext, Finding } from '../types.ts';

/**
 * Rule R6: Suitability and Accessibility Check
 * Matches traveller profiles (wheelchair, stroller, seniors, small children) against attraction access attributes.
 * Note: Unknown access fields are reported as unverified/caution, never assumed to be inaccessible.
 */
export function checkSuitability(trip: EngineTripContext): Finding[] {
  const findings: Finding[] = [];
  const needsWheelchair = trip.needs.includes('wheelchair') || trip.needs.includes('step_free');
  const needsStroller = trip.needs.includes('stroller') || trip.children > 0;
  const hasSeniors = trip.seniors > 0 || trip.needs.includes('senior_friendly');
  let counter = 1;

  for (const day of trip.days) {
    for (const item of day.items) {
      const access = item.access;

      // Wheelchair / Step-Free check
      if (needsWheelchair) {
        if (access?.wheelchairOk === 'no' || access?.stepFree === 'no') {
          findings.push({
            id: `r6_wheelchair_${item.id}_${counter++}`,
            rule: 'R6_SUITABILITY',
            severity: 'warning',
            message: `${item.name} on Day ${day.dayNumber} is not step-free / wheelchair accessible (stairs or rough terrain).`,
            affectedItemIds: [item.id],
            suggestedFix: {
              type: 'REMOVE_ITEM',
              itemId: item.id,
            },
          });
        } else if (!access || access.wheelchairOk === null || access.wheelchairOk === undefined) {
          findings.push({
            id: `r6_unverified_wheelchair_${item.id}_${counter++}`,
            rule: 'R6_SUITABILITY',
            severity: 'info',
            message: `Accessibility status for ${item.name} is unverified. Step-free access cannot be guaranteed.`,
            affectedItemIds: [item.id],
          });
        }
      }

      // Stroller check
      if (needsStroller && access?.strollerOk === 'no') {
        findings.push({
          id: `r6_stroller_${item.id}_${counter++}`,
          rule: 'R6_SUITABILITY',
          severity: 'warning',
          message: `${item.name} is not stroller friendly.`,
          affectedItemIds: [item.id],
        });
      }

      // Senior check
      if (hasSeniors) {
        if (access?.walkingLevel === 3) {
          findings.push({
            id: `r6_strenuous_${item.id}_${counter++}`,
            rule: 'R6_SUITABILITY',
            severity: 'warning',
            message: `${item.name} involves strenuous walking / elevation, which may be challenging for senior travellers.`,
            affectedItemIds: [item.id],
          });
        }
      }

      // Child age check
      if (trip.children > 0 && item.minAge && item.minAge > 5) {
        findings.push({
          id: `r6_min_age_${item.id}_${counter++}`,
          rule: 'R6_SUITABILITY',
          severity: 'warning',
          message: `${item.name} has a recommended minimum age of ${item.minAge} years.`,
          affectedItemIds: [item.id],
        });
      }
    }
  }

  return findings;
}
