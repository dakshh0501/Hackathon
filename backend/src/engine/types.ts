export type Severity = 'error' | 'warning' | 'info';

export type SuggestedFixType = 'MOVE_ITEM' | 'SHIFT_TIME' | 'REMOVE_ITEM' | 'SWAP_ITEM';

export interface SuggestedFix {
  type: SuggestedFixType;
  itemId: string;
  toDayNumber?: number;
  startTime?: string;
  endTime?: string;
  targetItemId?: string;
}

export interface Finding {
  id: string;
  rule: string;
  severity: Severity;
  message: string;
  affectedItemIds: string[];
  suggestedFix?: SuggestedFix;
}

export interface AttractionHoursData {
  weekday: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  openTime?: string | null; // "09:00"
  closeTime?: string | null; // "18:00"
  isClosed: boolean;
}

export interface AttractionAccessData {
  stepFree?: string | null; // 'yes' | 'no' | null
  wheelchairOk?: string | null;
  seating?: string | null;
  restrooms?: string | null;
  strollerOk?: string | null;
  walkingLevel?: number | null; // 1 to 3
}

export interface AttractionPriceData {
  travellerType: 'adult' | 'child' | 'senior';
  amountPaise: number;
}

export interface EngineItineraryItem {
  id: string;
  attractionId: string;
  name: string;
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  orderIndex: number;
  lat: number;
  lng: number;
  avgVisitMinutes: number;
  hours: AttractionHoursData[];
  access?: AttractionAccessData | null;
  minAge?: number | null;
  prices?: AttractionPriceData[];
  dataStatus: 'sample' | 'verified';
}

export interface EngineItineraryDay {
  dayNumber: number;
  date: string; // YYYY-MM-DD
  weekday: number; // 0 to 6
  items: EngineItineraryItem[];
}

export interface EngineTripContext {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  pace: 'relaxed' | 'moderate' | 'packed';
  tier: 'budget' | 'standard' | 'premium';
  budgetPaise: number;
  adults: number;
  children: number;
  seniors: number;
  needs: string[];
  interests: string[];
  days: EngineItineraryDay[];
}
