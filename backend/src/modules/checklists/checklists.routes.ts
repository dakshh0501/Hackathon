import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { store } from '../../data/store.ts';
import type { ChecklistRecord } from '../../data/store.ts';
import { sendSuccess } from '../../lib/response.ts';
import { AppError } from '../../lib/AppError.ts';

export const checklistsRouter = Router();

/**
 * POST /trips/:id/checklists/generate
 * Automatically generates rule-based packing, documents, and accessibility checklists.
 */
checklistsRouter.post('/trips/:id/checklists/generate', (req: Request, res: Response, next: NextFunction) => {
  const trip = store.trips.get(req.params.id);
  if (!trip) {
    return next(AppError.notFound('Trip'));
  }

  const generatedItems: ChecklistRecord[] = [
    // Standard Documents
    {
      id: `chk_doc_1`,
      tripId: trip.id,
      type: 'documents',
      label: 'Valid Government Photo ID (Aadhaar / Passport / Driving Licence) for all travellers',
      isDone: false,
      sourceRule: 'RULE_IDENTITY_VERIFICATION',
    },
    {
      id: `chk_doc_2`,
      tripId: trip.id,
      type: 'documents',
      label: 'Digital confirmation and booking receipts on phone',
      isDone: false,
      sourceRule: 'RULE_DIGITAL_TICKETS',
    },
  ];

  // Seasonal Packing
  const month = new Date(trip.startDate).getMonth() + 1;
  if (month === 12 || month === 1 || month === 2) {
    generatedItems.push({
      id: `chk_pack_winter`,
      tripId: trip.id,
      type: 'packing',
      label: 'Thermal innerwear, fleece jackets, and woollen gloves for cold mornings & evenings',
      isDone: false,
      sourceRule: 'RULE_WINTER_CLIMATE',
    });
  } else if (month >= 4 && month <= 6) {
    generatedItems.push({
      id: `chk_pack_summer`,
      tripId: trip.id,
      type: 'packing',
      label: 'Sunscreen SPF 50+, UV sunglasses, wide-brim hat, and electrolyte ORS packets',
      isDone: false,
      sourceRule: 'RULE_SUMMER_HEAT',
    });
  } else if (month >= 7 && month <= 9) {
    generatedItems.push({
      id: `chk_pack_monsoon`,
      tripId: trip.id,
      type: 'packing',
      label: 'Compact travel umbrella and waterproof covers for electronic devices',
      isDone: false,
      sourceRule: 'RULE_MONSOON_WEATHER',
    });
  }

  // Temple / Cultural destination packing
  if (trip.destinationSlug.includes('mathura') || trip.destinationSlug.includes('vrindavan') || trip.destinationSlug.includes('rishikesh')) {
    generatedItems.push({
      id: `chk_pack_temple`,
      tripId: trip.id,
      type: 'packing',
      label: 'Modest traditional attire covering shoulders and knees; slip-on socks for hot temple marble floors',
      isDone: false,
      sourceRule: 'RULE_TEMPLE_CUSTOMS',
    });
  }

  // Accessibility & Family Requirements
  if (trip.needs.includes('wheelchair') || trip.needs.includes('step_free')) {
    generatedItems.push({
      id: `chk_acc_wheelchair`,
      tripId: trip.id,
      type: 'accessibility',
      label: 'Confirm vehicle has ground-level luggage boot for folding manual wheelchair',
      isDone: false,
      sourceRule: 'RULE_ACCESSIBILITY_PROFILE',
    });
  }

  if (trip.children > 0 || trip.needs.includes('stroller')) {
    generatedItems.push({
      id: `chk_acc_stroller`,
      tripId: trip.id,
      type: 'accessibility',
      label: 'Compact foldable travel stroller and diaper/hydration travel pouch',
      isDone: false,
      sourceRule: 'RULE_FAMILY_CHILD_SUITABILITY',
    });
  }

  if (trip.seniors > 0 || trip.needs.includes('senior_friendly')) {
    generatedItems.push({
      id: `chk_acc_seniors`,
      tripId: trip.id,
      type: 'accessibility',
      label: 'Daily prescription medication travel kit and walking support cane',
      isDone: false,
      sourceRule: 'RULE_SENIOR_CARE',
    });
  }

  store.checklists.set(trip.id, generatedItems);

  return sendSuccess(res, generatedItems, 201);
});

/**
 * GET /trips/:id/checklists
 */
checklistsRouter.get('/trips/:id/checklists', (req: Request, res: Response) => {
  const items = store.checklists.get(req.params.id) || [];
  return sendSuccess(res, items);
});

/**
 * PATCH /checklists/:itemId
 * Toggle isDone status
 */
checklistsRouter.patch('/checklists/:itemId', (req: Request, res: Response, next: NextFunction) => {
  const { itemId } = req.params;
  const { isDone, label } = req.body;

  let foundItem: ChecklistRecord | undefined;

  for (const list of store.checklists.values()) {
    const item = list.find((i) => i.id === itemId);
    if (item) {
      if (typeof isDone === 'boolean') item.isDone = isDone;
      if (typeof label === 'string') item.label = label;
      foundItem = item;
      break;
    }
  }

  if (!foundItem) {
    return next(AppError.notFound('Checklist item'));
  }

  return sendSuccess(res, foundItem);
});
