import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { DESTINATIONS_DATA } from '../../data/destinations.data.ts';
import { sendSuccess } from '../../lib/response.ts';
import { AppError } from '../../lib/AppError.ts';

export const discoveryRouter = Router();

/**
 * GET /meta/layers
 * Returns default layered landscape parallax assets for Scene 1 (behind the animated duffel bag mascot)
 */
discoveryRouter.get('/meta/layers', (_req: Request, res: Response) => {
  return sendSuccess(res, {
    branding: {
      name: 'TravelTales',
      tagline: 'Every journey tells a story',
    },
    layers: [
      { id: 'layer-sky', name: 'Sky & Clouds', url: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1920&q=80', speed: 0.1 },
      { id: 'layer-mountains', name: 'Himalayan Ridge', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80', speed: 0.3 },
      { id: 'layer-forest', name: 'Pine & Deodar Canopy', url: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1920&q=80', speed: 0.6 },
      { id: 'layer-valley', name: 'Valley Foreground', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80', speed: 0.9 },
    ],
  });
});

/**
 * GET /destinations/suggest?q=...
 * Fast search-as-you-type suggestions for the explorer search bar
 */
discoveryRouter.get('/destinations/suggest', (req: Request, res: Response) => {
  const query = (req.query.q as string || '').trim().toLowerCase();
  
  if (!query) {
    // Return popular featured suggestions if query is empty
    const suggestions = DESTINATIONS_DATA.map((d) => ({
      id: d.id,
      slug: d.slug,
      name: d.name,
      state: d.state,
      type: d.type,
      tagline: d.tagline,
      thumbnailUrl: d.heroImage,
      dataDepth: d.dataDepth,
    }));
    return sendSuccess(res, suggestions);
  }

  const matches = DESTINATIONS_DATA.filter((d) => {
    return (
      d.name.toLowerCase().includes(query) ||
      d.state.toLowerCase().includes(query) ||
      d.slug.toLowerCase().includes(query) ||
      d.tagline.toLowerCase().includes(query)
    );
  }).map((d) => ({
    id: d.id,
    slug: d.slug,
    name: d.name,
    state: d.state,
    type: d.type,
    tagline: d.tagline,
    thumbnailUrl: d.heroImage,
    dataDepth: d.dataDepth,
  }));

  return sendSuccess(res, matches);
});

/**
 * GET /destinations
 * List all destinations with summary metadata
 */
discoveryRouter.get('/destinations', (_req: Request, res: Response) => {
  const destinations = DESTINATIONS_DATA.map((d) => ({
    id: d.id,
    slug: d.slug,
    name: d.name,
    state: d.state,
    type: d.type,
    tagline: d.tagline,
    description: d.description,
    heroImage: d.heroImage,
    dataDepth: d.dataDepth,
    dataStatus: d.dataStatus,
    bestMonths: d.bestMonths,
    attractionCount: d.categories.places_to_explore.length,
  }));

  return sendSuccess(res, destinations, 200, {
    page: 1,
    pageSize: destinations.length,
    total: destinations.length,
    totalPages: 1,
  });
});

/**
 * GET /destinations/:slug/discovery
 * Returns the complete animated discovery payload for a specific destination
 */
discoveryRouter.get('/destinations/:slug/discovery', (req: Request, res: Response, next: NextFunction) => {
  const { slug } = req.params;
  const destination = DESTINATIONS_DATA.find(
    (d) => d.slug.toLowerCase() === slug.toLowerCase() || d.id === slug
  );

  if (!destination) {
    return next(AppError.notFound(`Destination '${slug}'`));
  }

  return sendSuccess(res, destination);
});

/**
 * GET /destinations/:id
 * Returns destination details
 */
discoveryRouter.get('/destinations/:id', (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const destination = DESTINATIONS_DATA.find(
    (d) => d.id === id || d.slug.toLowerCase() === id.toLowerCase()
  );

  if (!destination) {
    return next(AppError.notFound(`Destination '${id}'`));
  }

  return sendSuccess(res, destination);
});
