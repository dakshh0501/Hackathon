import { engineConfig } from '../config/engine.config.ts';

export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Calculates Great-Circle distance between two coordinates on Earth using the Haversine formula.
 * Returns distance in kilometers (km).
 */
export function calculateHaversineDistance(point1: Coordinates, point2: Coordinates): number {
  const EARTH_RADIUS_KM = 6371.0;

  const toRad = (degrees: number) => (degrees * Math.PI) / 180.0;

  const dLat = toRad(point2.lat - point1.lat);
  const dLng = toRad(point2.lng - point1.lng);

  const lat1 = toRad(point1.lat);
  const lat2 = toRad(point2.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
}

/**
 * Estimates travel time in minutes between two geographic coordinates given a transit mode.
 * Automatically adds a buffer from engineConfig.
 */
export function estimateTravelTimeMinutes(
  from: Coordinates,
  to: Coordinates,
  mode: 'walking' | 'cityTransit' | 'car' = 'cityTransit'
): { distanceKm: number; travelTimeMinutes: number; totalWithBufferMinutes: number } {
  const distanceKm = calculateHaversineDistance(from, to);
  const speedKmH = engineConfig.speeds[mode];

  // Raw travel duration in minutes
  const rawMinutes = Math.round((distanceKm / speedKmH) * 60);

  // Total duration including buffer
  const totalWithBufferMinutes = rawMinutes + engineConfig.travelTimeBufferMinutes;

  return {
    distanceKm: Math.round(distanceKm * 100) / 100, // round to 2 decimals
    travelTimeMinutes: rawMinutes,
    totalWithBufferMinutes,
  };
}

/**
 * Helper to convert "HH:mm" 24h time to minutes from midnight (e.g. "09:30" -> 570)
 */
export function timeStringToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Helper to convert minutes from midnight to "HH:mm" format (e.g. 570 -> "09:30")
 */
export function minutesToTimeString(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}
