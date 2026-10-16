import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { store } from '../../data/store.ts';
import { AppError } from '../../lib/AppError.ts';

export const exportRouter = Router();

/**
 * Helper to format date + time into iCalendar timestamp (YYYYMMDDTHHmmssZ)
 */
function formatIcsDateTime(dateStr: string, timeStr: string): string {
  // dateStr: "2026-12-25", timeStr: "09:30"
  const cleanDate = dateStr.replace(/-/g, '');
  const cleanTime = timeStr.replace(/:/g, '') + '00';
  return `${cleanDate}T${cleanTime}`;
}

/**
 * GET /trips/:id/export?format=json|ics
 * Exports itinerary as JSON or a calendar (.ics) file
 */
exportRouter.get('/trips/:id/export', (req: Request, res: Response, next: NextFunction) => {
  const trip = store.trips.get(req.params.id);
  if (!trip) {
    return next(AppError.notFound('Trip'));
  }

  const format = (req.query.format as string || 'json').toLowerCase();

  if (format === 'ics') {
    const lines: string[] = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//TravelTales//TravelTales Trip Planner//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      `X-WR-CALNAME:TravelTales - ${trip.title}`,
      `X-WR-TIMEZONE:Asia/Kolkata`,
    ];

    for (const day of trip.days) {
      for (const item of day.items) {
        const uid = `${item.id}_${trip.id}@traveltales.in`;
        const dtStart = formatIcsDateTime(day.date, item.startTime || '09:00');
        const dtEnd = formatIcsDateTime(day.date, item.endTime || '11:00');

        lines.push('BEGIN:VEVENT');
        lines.push(`UID:${uid}`);
        lines.push(`SUMMARY:${item.name}`);
        lines.push(`DESCRIPTION:Visit to ${item.name} (${trip.destinationName}) - TravelTales Itinerary`);
        lines.push(`LOCATION:${trip.destinationName}`);
        lines.push(`DTSTART:${dtStart}`);
        lines.push(`DTEND:${dtEnd}`);
        lines.push('STATUS:CONFIRMED');
        lines.push('END:VEVENT');
      }
    }

    lines.push('END:VCALENDAR');
    const icsContent = lines.join('\r\n');

    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${trip.destinationSlug}_itinerary.ics"`);
    return res.send(icsContent);
  }

  // Default JSON export
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename="${trip.destinationSlug}_trip.json"`);
  return res.json({
    travelTalesExportVersion: '1.0',
    exportedAt: new Date().toISOString(),
    trip,
  });
});
