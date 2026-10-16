import type { EngineTripContext, Finding } from '../types.ts';
import { engineConfig } from '../../config/engine.config.ts';
import { timeStringToMinutes } from '../geo.ts';

/**
 * Rule R3: Day Overload Check
 * Warns if the planned schedule exceeds the user's selected pace capacity (relaxed: 6h, moderate: 8h, packed: 10h).
 */
export function checkDayOverload(trip: EngineTripContext): Finding[] {
  const findings: Finding[] = [];
  const maxHours = engineConfig.paceLimitsHours[trip.pace] || 8;
  const maxMinutes = maxHours * 60;
  let counter = 1;

  for (const day of trip.days) {
    if (day.items.length === 0) continue;

    let totalActivityMinutes = 0;
    for (const item of day.items) {
      const duration = timeStringToMinutes(item.endTime) - timeStringToMinutes(item.startTime);
      totalActivityMinutes += Math.max(duration, item.avgVisitMinutes);
    }

    if (totalActivityMinutes > maxMinutes) {
      const overloadedHours = Math.round((totalActivityMinutes / 60) * 10) / 10;
      const lastItem = day.items[day.items.length - 1];

      // Find another less loaded day
      const alternateDay = trip.days.find((d) => d.dayNumber !== day.dayNumber && d.items.length < 3);

      findings.push({
        id: `r3_overload_day_${day.dayNumber}_${counter++}`,
        rule: 'R3_DAY_OVERLOAD',
        severity: 'warning',
        message: `Day ${day.dayNumber} is overloaded (${overloadedHours}h scheduled vs ${maxHours}h limit for '${trip.pace}' pace).`,
        affectedItemIds: day.items.map((i) => i.id),
        suggestedFix: alternateDay
          ? {
              type: 'MOVE_ITEM',
              itemId: lastItem.id,
              toDayNumber: alternateDay.dayNumber,
              startTime: '14:00',
            }
          : {
              type: 'REMOVE_ITEM',
              itemId: lastItem.id,
            },
      });
    }
  }

  return findings;
}
