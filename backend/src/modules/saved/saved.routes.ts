import { Router } from 'express';
import type { Response, NextFunction } from 'express';
import { sendSuccess } from '../../lib/response.ts';
import { AppError } from '../../lib/AppError.ts';
import { optionalAuth, type AuthenticatedRequest } from '../../middleware/auth.ts';
import { DESTINATIONS_DATA } from '../../data/destinations.data.ts';

export const savedRouter = Router();

// In-memory wishlist mapping: userId -> Set of attractionIds
const wishlistStore = new Map<string, Set<string>>();

// Seed wishlist for demo user
const defaultWishlist = new Set<string>(['jk_pe_1', 'ag_pe_1', 'mv_pe_1']);
wishlistStore.set('usr_demo_asha', defaultWishlist);

/**
 * GET /saved/attractions
 */
savedRouter.get('/saved/attractions', optionalAuth, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId || 'usr_demo_asha';
  const savedSet = wishlistStore.get(userId) || new Set<string>();

  const allPlaces = DESTINATIONS_DATA.flatMap((d) => d.categories.places_to_explore);
  const matched = allPlaces.filter((p) => savedSet.has(p.id));

  return sendSuccess(res, matched);
});

/**
 * POST /saved/attractions
 */
savedRouter.post('/saved/attractions', optionalAuth, (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.userId || 'usr_demo_asha';
  const { attractionId } = req.body;

  if (!attractionId) {
    return next(AppError.validation('attractionId is required'));
  }

  if (!wishlistStore.has(userId)) {
    wishlistStore.set(userId, new Set());
  }

  wishlistStore.get(userId)!.add(attractionId);
  return sendSuccess(res, { saved: true, attractionId }, 201);
});

/**
 * DELETE /saved/attractions/:attractionId
 */
savedRouter.delete('/saved/attractions/:attractionId', optionalAuth, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId || 'usr_demo_asha';
  const { attractionId } = req.params;

  if (wishlistStore.has(userId)) {
    wishlistStore.get(userId)!.delete(attractionId);
  }

  return res.status(204).send();
});
