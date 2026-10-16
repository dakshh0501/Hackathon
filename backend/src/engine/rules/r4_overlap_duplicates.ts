import type { EngineTripContext, Finding } from '../types.ts';
import { timeStringToMinutes, minutesToTimeString } from '../geo.ts';

/**
 * Rule R4: Overlap and Duplicate Check
 * Prevents scheduling conflicting time windows on the same day or visiting the exact same attraction twice.
 */
export function checkOverlapAndDuplicates(trip: EngineTripContext): Finding[] {
  const findings: Finding[] = [];
  const visitedAttractionIds = new Map<string, { itemId: string; name: string; dayNumber: number }>();
  let counter = 1;

  for (const day of trip.days) {
    const sorted = [...day.items].sort(
      (a, b) => timeStringToMinutes(a.startTime) - timeStringToMinutes(b.startTime)
    );

    // Check time slot overlaps on this day
    for (let i = 0; i < sorted.length - 1; i++) {
      const current = sorted[i];
      const next = sorted[i + 1];

      const currentEnd = timeStringToMinutes(current.endTime);
      const nextStart = timeStringToMinutes(next.startTime);

      if (currentEnd > nextStart) {
        findings.push({
          id: `r4_overlap_${current.id}_${next.id}_${counter++}`,
          rule: 'R4_OVERLAP_DUPLICATES',
          severity: 'error',
          message: `Direct time conflict on Day ${day.dayNumber}: ${current.name} ends at ${current.endTime}, overlapping with ${next.name} starting at ${next.startTime}.`,
          affectedItemIds: [current.id, next.id],
          suggestedFix: {
            type: 'SHIFT_TIME',
            itemId: next.id,
            startTime: minutesToTimeString(currentEnd + 15),
          },
        });
      }
    }

    // Check duplicate visits across the trip
    for (const item of day.items) {
      if (visitedAttractionIds.has(item.attractionId)) {
        const first = visitedAttractionIds.get(item.attractionId)!;
        findings.push({
          id: `r4_dup_${item.id}_${counter++}`,
          rule: 'R4_OVERLAP_DUPLICATES',
          severity: 'error',
          message: `Duplicate visit: ${item.name} is already planned on Day ${first.dayNumber} and repeated on Day ${day.dayNumber}.`,
          affectedItemIds: [first.itemId, item.id],
          suggestedFix: {
            type: 'REMOVE_ITEM',
            itemId: item.id,
          },
        });
      } else {
        visitedAttractionIds.set(item.attractionId, {
          itemId: item.id,
          name: item.name,
          dayNumber: day.dayNumber,
        });
      }
    }
  }

  return findings;
}
