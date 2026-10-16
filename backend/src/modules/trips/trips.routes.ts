import { Router } from 'express';
import type { Response, NextFunction } from 'express';
import { z } from 'zod';
import { store } from '../../data/store.ts';
import type { TripRecord } from '../../data/store.ts';
import { sendSuccess } from '../../lib/response.ts';
import { AppError } from '../../lib/AppError.ts';
import { optionalAuth, type AuthenticatedRequest } from '../../middleware/auth.ts';
import { DESTINATIONS_DATA } from '../../data/destinations.data.ts';

export const tripsRouter = Router();

const createTripSchema = z.object({
  destinationId: z.string().min(1, 'destinationId is required'),
  title: z.string().min(2, 'title is required'),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'startDate must be YYYY-MM-DD'),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'endDate must be YYYY-MM-DD'),
  adults: z.number().int().min(1).default(1),
  children: z.number().int().min(0).default(0),
  seniors: z.number().int().min(0).default(0),
  pace: z.enum(['relaxed', 'moderate', 'packed']).default('moderate'),
  tier: z.enum(['budget', 'standard', 'premium']).default('standard'),
  budgetPaise: z.number().int().min(0).default(2000000),
  interests: z.array(z.string()).default([]),
  needs: z.array(z.string()).default([]),
});

/**
 * Generate dates array between start and end
 */
function getDatesInRange(startDate: string, endDate: string): string[] {
  const dates: string[] = [];
  const curr = new Date(startDate);
  const end = new Date(endDate);

  if (curr > end) return [startDate];

  while (curr <= end) {
    dates.push(curr.toISOString().split('T')[0]);
    curr.setDate(curr.getDate() + 1);
  }
  return dates.length > 0 ? dates : [startDate];
}

/**
 * POST /trips
 * Create a new trip plan with automatic itinerary days
 */
tripsRouter.post('/trips', optionalAuth, (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const parsed = createTripSchema.safeParse(req.body);
  if (!parsed.success) {
    return next(AppError.validation('Invalid trip parameters', parsed.error.errors));
  }

  const data = parsed.data;

  // Find destination
  const dest = DESTINATIONS_DATA.find((d) => d.id === data.destinationId || d.slug === data.destinationId);
  const destinationId = dest ? dest.id : data.destinationId;
  const destinationName = dest ? dest.name : 'Indian Destination';
  const destinationSlug = dest ? dest.slug : 'custom';

  const dates = getDatesInRange(data.startDate, data.endDate);
  const days = dates.map((date, idx) => ({
    dayNumber: idx + 1,
    date,
    items: [],
  }));

  const tripId = `trp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const ownerId = req.user?.userId || 'usr_demo_asha';

  const newTrip: TripRecord = {
    id: tripId,
    ownerId,
    destinationId,
    destinationName,
    destinationSlug,
    title: data.title,
    startDate: data.startDate,
    endDate: data.endDate,
    adults: data.adults,
    children: data.children,
    seniors: data.seniors,
    pace: data.pace,
    tier: data.tier,
    budgetPaise: data.budgetPaise,
    interests: data.interests,
    needs: data.needs,
    days,
    createdAt: new Date().toISOString(),
  };

  store.trips.set(newTrip.id, newTrip);

  return sendSuccess(res, newTrip, 201);
});

/**
 * GET /trips
 * Lists saved trips (for My Trips page)
 */
tripsRouter.get('/trips', optionalAuth, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId || 'usr_demo_asha';
  const allTrips = Array.from(store.trips.values());

  // Return user's trips or all demo trips
  const userTrips = allTrips.filter((t) => t.ownerId === userId || userId === 'usr_demo_asha');

  return sendSuccess(res, userTrips);
});

/**
 * GET /trips/:id
 */
tripsRouter.get('/trips/:id', (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const trip = store.trips.get(req.params.id);
  if (!trip) {
    return next(AppError.notFound('Trip'));
  }
  return sendSuccess(res, trip);
});

/**
 * PATCH /trips/:id
 */
tripsRouter.patch('/trips/:id', (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const trip = store.trips.get(req.params.id);
  if (!trip) {
    return next(AppError.notFound('Trip'));
  }

  const updated: TripRecord = {
    ...trip,
    ...req.body,
    id: trip.id, // prevent overwriting ID
    ownerId: trip.ownerId,
  };

  store.trips.set(trip.id, updated);
  return sendSuccess(res, updated);
});

/**
 * DELETE /trips/:id
 */
tripsRouter.delete('/trips/:id', (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!store.trips.has(req.params.id)) {
    return next(AppError.notFound('Trip'));
  }
  store.trips.delete(req.params.id);
  return res.status(204).send();
});

/**
 * POST /trips/:id/itinerary/items
 * Add an attraction item to a specific day
 */
tripsRouter.post('/trips/:id/itinerary/items', (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const trip = store.trips.get(req.params.id);
  if (!trip) {
    return next(AppError.notFound('Trip'));
  }

  const { dayNumber, attractionId, name, startTime, endTime, note } = req.body;
  const day = trip.days.find((d) => d.dayNumber === Number(dayNumber));
  if (!day) {
    return next(AppError.businessRule(`Day ${dayNumber} does not exist in this trip`));
  }

  const itemId = `itm_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`;
  const newItem = {
    id: itemId,
    attractionId: attractionId || `att_${itemId}`,
    name: name || 'Attraction Visit',
    startTime: startTime || '10:00',
    endTime: endTime || '11:30',
    orderIndex: day.items.length,
    note: note || '',
  };

  day.items.push(newItem);
  store.trips.set(trip.id, trip);

  return sendSuccess(res, newItem, 201);
});

/**
 * DELETE /itinerary/items/:itemId
 */
tripsRouter.delete('/itinerary/items/:itemId', (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { itemId } = req.params;
  let found = false;

  for (const trip of store.trips.values()) {
    for (const day of trip.days) {
      const idx = day.items.findIndex((i) => i.id === itemId);
      if (idx !== -1) {
        day.items.splice(idx, 1);
        found = true;
        break;
      }
    }
    if (found) break;
  }

  if (!found) {
    return next(AppError.notFound('Itinerary item'));
  }

  return res.status(204).send();
});
