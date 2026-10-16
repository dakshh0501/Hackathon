import { hashPassword } from '../lib/password.ts';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface TripRecord {
  id: string;
  ownerId: string;
  destinationId: string;
  destinationName: string;
  destinationSlug: string;
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  adults: number;
  children: number;
  seniors: number;
  pace: 'relaxed' | 'moderate' | 'packed';
  tier: 'budget' | 'standard' | 'premium';
  budgetPaise: number;
  interests: string[];
  needs: string[];
  days: Array<{
    dayNumber: number;
    date: string;
    items: Array<{
      id: string;
      attractionId: string;
      name: string;
      startTime: string;
      endTime: string;
      orderIndex: number;
      note?: string;
    }>;
  }>;
  createdAt: string;
}

export interface ChecklistRecord {
  id: string;
  tripId: string;
  type: 'packing' | 'documents' | 'accessibility';
  label: string;
  isDone: boolean;
  sourceRule?: string;
}

// In-memory persistent data store initialized with demo data
export const store = {
  users: new Map<string, UserRecord>(),
  trips: new Map<string, TripRecord>(),
  checklists: new Map<string, ChecklistRecord[]>(),
};

// Initialize default seed demo accounts and trips
export async function seedInitialStore() {
  if (store.users.size > 0) return;

  const defaultPasswordHash = await hashPassword('password123');

  // Demo user 1
  const user1: UserRecord = {
    id: 'usr_demo_asha',
    name: 'Asha Sharma',
    email: 'asha@example.com',
    passwordHash: defaultPasswordHash,
    createdAt: new Date().toISOString(),
  };
  store.users.set(user1.id, user1);

  // Demo user 2
  const user2: UserRecord = {
    id: 'usr_demo_rohit',
    name: 'Rohit Verma',
    email: 'rohit@example.com',
    passwordHash: defaultPasswordHash,
    createdAt: new Date().toISOString(),
  };
  store.users.set(user2.id, user2);

  // Demo Trip 1 for Asha: Family Weekend in Mathura & Vrindavan
  const demoTrip1: TripRecord = {
    id: 'trp_mv_demo',
    ownerId: user1.id,
    destinationId: 'dst_mathura',
    destinationName: 'Mathura & Vrindavan',
    destinationSlug: 'mathura-vrindavan',
    title: 'Divine Braj Pilgrimage & Culture',
    startDate: '2026-12-25',
    endDate: '2026-12-27',
    adults: 2,
    children: 1,
    seniors: 1,
    pace: 'moderate',
    tier: 'standard',
    budgetPaise: 2500000, // ₹25,000
    interests: ['heritage', 'food', 'local_culture'],
    needs: ['step_free', 'stroller'],
    days: [
      {
        dayNumber: 1,
        date: '2026-12-25',
        items: [
          {
            id: 'itm_1',
            attractionId: 'mv_pe_1',
            name: 'Banke Bihari Temple, Vrindavan',
            startTime: '09:30',
            endTime: '11:00',
            orderIndex: 0,
            note: 'Early morning darshan',
          },
          {
            id: 'itm_2',
            attractionId: 'mv_sh_1',
            name: 'Vishram Ghat Evening Yamuna Aarti',
            startTime: '17:30',
            endTime: '19:00',
            orderIndex: 1,
            note: 'Float earthen oil lamps',
          },
        ],
      },
      {
        dayNumber: 2,
        date: '2026-12-26',
        items: [
          {
            id: 'itm_3',
            attractionId: 'mv_pe_2',
            name: 'Prem Mandir',
            startTime: '10:00',
            endTime: '12:00',
            orderIndex: 0,
            note: 'Sculpted Italian marble architecture',
          },
        ],
      },
      {
        dayNumber: 3,
        date: '2026-12-27',
        items: [],
      },
    ],
    createdAt: new Date().toISOString(),
  };
  store.trips.set(demoTrip1.id, demoTrip1);

  // Demo checklists for trip 1
  store.checklists.set(demoTrip1.id, [
    { id: 'chk_1', tripId: demoTrip1.id, type: 'documents', label: 'Government Photo ID cards for all family members', isDone: true, sourceRule: 'IDENTITY_RULE' },
    { id: 'chk_2', tripId: demoTrip1.id, type: 'packing', label: 'Modest traditional temple attire and slip-on footwear', isDone: false, sourceRule: 'TEMPLE_DRESS_CODE' },
    { id: 'chk_3', tripId: demoTrip1.id, type: 'packing', label: 'Warm woollen shawls for evening Yamuna river breeze', isDone: true, sourceRule: 'WINTER_WEATHER' },
    { id: 'chk_4', tripId: demoTrip1.id, type: 'accessibility', label: 'Portable folding lightweight stroller for toddler', isDone: false, sourceRule: 'FAMILY_NEEDS' },
  ]);

  console.log('✅ Demo store initialized with demo accounts and trips');
}
