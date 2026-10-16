import type { EngineTripContext, Finding } from '../types.ts';

/**
 * Rule R7: Seasonal and Weather Notes
 * Flags weather advisory (heavy monsoons, extreme summer heat, winter fog) based on trip month.
 */
export function checkSeasonalNotes(trip: EngineTripContext): Finding[] {
  const findings: Finding[] = [];

  if (!trip.startDate) return findings;

  const month = new Date(trip.startDate).getMonth() + 1; // 1 = Jan, 12 = Dec

  // Peak summer in North/Central India (May-June)
  if (month === 5 || month === 6) {
    findings.push({
      id: `r7_summer_heat_${trip.id}`,
      rule: 'R7_SEASONAL_NOTE',
      severity: 'info',
      message: 'Peak summer travel: Afternoon temperatures can exceed 40°C. Consider scheduling outdoor monuments early morning (before 11:00 AM) or after 4:30 PM.',
      affectedItemIds: [],
    });
  }

  // Peak monsoon (July-August)
  if (month === 7 || month === 8) {
    findings.push({
      id: `r7_monsoon_${trip.id}`,
      rule: 'R7_SEASONAL_NOTE',
      severity: 'info',
      message: 'Monsoon season: Expect occasional heavy downpours that may impact outdoor exploration and road transit times.',
      affectedItemIds: [],
    });
  }

  // Winter fog (December-January)
  if (month === 12 || month === 1) {
    findings.push({
      id: `r7_winter_fog_${trip.id}`,
      rule: 'R7_SEASONAL_NOTE',
      severity: 'info',
      message: 'Winter season: Dense morning fog may cause minor highway delays and affect early morning visibility at monuments.',
      affectedItemIds: [],
    });
  }

  return findings;
}
