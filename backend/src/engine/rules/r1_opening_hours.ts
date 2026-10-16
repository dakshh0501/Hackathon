import type { EngineTripContext, Finding } from '../types.ts';
import { timeStringToMinutes } from '../geo.ts';

/**
 * Rule R1: Opening Hours Check
 * Ensures every scheduled attraction visit falls inside opening hours and not on a closed weekday.
 */
export function checkOpeningHours(trip: EngineTripContext): Finding[] {
  const findings: Finding[] = [];
  let findingCounter = 1;

  for (const day of trip.days) {
    for (const item of day.items) {
      const dayHours = item.hours.find((h) => h.weekday === day.weekday);

      if (!dayHours || dayHours.isClosed) {
        // Find another day in the trip when it IS open to suggest MOVE_ITEM
        const alternateDay = trip.days.find((d) => {
          const h = item.hours.find((hour) => hour.weekday === d.weekday);
          return h && !h.isClosed;
        });

        findings.push({
          id: `r1_closed_${item.id}_${findingCounter++}`,
          rule: 'R1_OPENING_HOURS',
          severity: 'error',
          message: `${item.name} is closed on ${getDayName(day.weekday)} (Day ${day.dayNumber}).`,
          affectedItemIds: [item.id],
          suggestedFix: alternateDay
            ? {
                type: 'MOVE_ITEM',
                itemId: item.id,
                toDayNumber: alternateDay.dayNumber,
                startTime: '10:00',
              }
            : {
                type: 'REMOVE_ITEM',
                itemId: item.id,
              },
        });
        continue;
      }

      if (dayHours.openTime && dayHours.closeTime) {
        const visitStart = timeStringToMinutes(item.startTime);
        const visitEnd = timeStringToMinutes(item.endTime);
        const openMin = timeStringToMinutes(dayHours.openTime);
        const closeMin = timeStringToMinutes(dayHours.closeTime);

        if (visitStart < openMin || visitEnd > closeMin) {
          findings.push({
            id: `r1_out_of_hours_${item.id}_${findingCounter++}`,
            rule: 'R1_OPENING_HOURS',
            severity: 'error',
            message: `${item.name} is scheduled (${item.startTime} - ${item.endTime}) outside its operating hours (${dayHours.openTime} - ${dayHours.closeTime}).`,
            affectedItemIds: [item.id],
            suggestedFix: {
              type: 'SHIFT_TIME',
              itemId: item.id,
              startTime: dayHours.openTime,
            },
          });
        }
      }
    }
  }

  return findings;
}

function getDayName(weekday: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[weekday] || 'this day';
}
