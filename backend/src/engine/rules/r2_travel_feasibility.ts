import type { EngineTripContext, Finding } from '../types.ts';
import { estimateTravelTimeMinutes, timeStringToMinutes, minutesToTimeString } from '../geo.ts';

/**
 * Rule R2: Travel Feasibility Check
 * Verifies that the gap between consecutive stops is sufficient to cover transit time + buffer.
 */
export function checkTravelFeasibility(trip: EngineTripContext): Finding[] {
  const findings: Finding[] = [];
  let counter = 1;

  for (const day of trip.days) {
    // Sort items by orderIndex or startTime
    const sortedItems = [...day.items].sort(
      (a, b) => timeStringToMinutes(a.startTime) - timeStringToMinutes(b.startTime)
    );

    for (let i = 0; i < sortedItems.length - 1; i++) {
      const current = sortedItems[i];
      const next = sortedItems[i + 1];

      const currentEnd = timeStringToMinutes(current.endTime);
      const nextStart = timeStringToMinutes(next.startTime);
      const availableGapMinutes = nextStart - currentEnd;

      const travelEstimate = estimateTravelTimeMinutes(
        { lat: current.lat, lng: current.lng },
        { lat: next.lat, lng: next.lng }
      );

      const requiredMinutes = travelEstimate.totalWithBufferMinutes;

      if (availableGapMinutes < requiredMinutes) {
        const deficit = requiredMinutes - availableGapMinutes;
        const newNextStart = minutesToTimeString(currentEnd + requiredMinutes);

        findings.push({
          id: `r2_travel_${current.id}_${next.id}_${counter++}`,
          rule: 'R2_TRAVEL_FEASIBILITY',
          severity: availableGapMinutes < travelEstimate.travelTimeMinutes ? 'error' : 'warning',
          message: `Impossible or tight transit between ${current.name} and ${next.name} on Day ${day.dayNumber}. Gap is ${availableGapMinutes} min, but travel requires ~${travelEstimate.travelTimeMinutes} min + buffer (total ${requiredMinutes} min). Short by ${deficit} min.`,
          affectedItemIds: [current.id, next.id],
          suggestedFix: {
            type: 'SHIFT_TIME',
            itemId: next.id,
            startTime: newNextStart,
          },
        });
      }
    }
  }

  return findings;
}
