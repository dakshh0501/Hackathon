import { Router } from 'express';
import type { Request, Response } from 'express';
import { validateTripItinerary } from '../../engine/checker.ts';
import { estimateTripBudget } from '../../engine/budget.ts';
import { calculateSettlement } from '../../engine/settle.ts';
import { generateItinerary } from '../../engine/generator.ts';
import { sendSuccess } from '../../lib/response.ts';
import type { EngineTripContext } from '../../engine/types.ts';
import { DESTINATIONS_DATA } from '../../data/destinations.data.ts';

export const intelligenceRouter = Router();

/**
 * POST /trips/validate
 * Validates any submitted itinerary against Rules R1-R7 and returns health score & findings.
 */
intelligenceRouter.post('/trips/validate', (req: Request, res: Response) => {
  const tripContext = req.body as EngineTripContext;
  const result = validateTripItinerary(tripContext, tripContext.budgetPaise || 0);
  return sendSuccess(res, result);
});

/**
 * POST /trips/budget
 * Forecasts budget across categories with min/likely/max and confidence indicators.
 */
intelligenceRouter.post('/trips/budget', (req: Request, res: Response) => {
  const tripContext = req.body as EngineTripContext;
  const result = estimateTripBudget(tripContext);
  return sendSuccess(res, result);
});

/**
 * POST /trips/settlement
 * Calculates optimal minimal-transfer expense settlement for group members.
 */
intelligenceRouter.post('/trips/settlement', (req: Request, res: Response) => {
  const { members, expenses } = req.body;
  const result = calculateSettlement(members || [], expenses || []);
  return sendSuccess(res, result);
});

/**
 * POST /trips/generate
 * Auto-generates a conflict-free itinerary with transparent explanations.
 */
intelligenceRouter.post('/trips/generate', (req: Request, res: Response) => {
  const { trip, destinationSlug } = req.body;
  const destination = DESTINATIONS_DATA.find(
    (d) => d.slug === destinationSlug || d.id === destinationSlug
  ) || DESTINATIONS_DATA[0];

  // Convert destination attractions to EngineItineraryItem format
  const candidates = destination.categories.places_to_explore.map((p, idx) => ({
    id: `cand_${p.id}`,
    attractionId: p.id,
    name: p.title,
    startTime: '10:00',
    endTime: '12:00',
    orderIndex: idx,
    lat: 27.1751,
    lng: 78.0421,
    avgVisitMinutes: p.meta?.avgVisitMinutes || 90,
    hours: [
      { weekday: 0, isClosed: false },
      { weekday: 1, isClosed: false },
      { weekday: 2, isClosed: false },
      { weekday: 3, isClosed: false },
      { weekday: 4, isClosed: false },
      { weekday: 5, isClosed: false },
      { weekday: 6, isClosed: false },
    ],
    dataStatus: p.dataStatus,
    popularity: 80,
  }));

  const plan = generateItinerary(trip, candidates, { mode: 'replace' });
  return sendSuccess(res, plan);
});
