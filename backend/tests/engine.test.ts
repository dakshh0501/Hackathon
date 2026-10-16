import test from 'node:test';
import assert from 'node:assert/strict';

import { calculateHaversineDistance, estimateTravelTimeMinutes } from '../src/engine/geo.ts';
import { checkOpeningHours } from '../src/engine/rules/r1_opening_hours.ts';
import { checkTravelFeasibility } from '../src/engine/rules/r2_travel_feasibility.ts';
import { checkDayOverload } from '../src/engine/rules/r3_day_overload.ts';
import { checkOverlapAndDuplicates } from '../src/engine/rules/r4_overlap_duplicates.ts';
import { checkSuitability } from '../src/engine/rules/r6_suitability.ts';
import { validateTripItinerary } from '../src/engine/checker.ts';
import { estimateTripBudget } from '../src/engine/budget.ts';
import { calculateSettlement } from '../src/engine/settle.ts';
import type { EngineTripContext } from '../src/engine/types.ts';

test('Haversine distance calculates accurate kilometers between Agra and Mathura', () => {
  // Agra: 27.1767, 78.0081 | Mathura: 27.4924, 77.6737 (~50 km)
  const distance = calculateHaversineDistance(
    { lat: 27.1767, lng: 78.0081 },
    { lat: 27.4924, lng: 77.6737 }
  );
  assert.ok(distance > 45 && distance < 60, `Distance was ${distance}`);
});

test('Travel time includes speed and buffer', () => {
  const travel = estimateTravelTimeMinutes(
    { lat: 27.1767, lng: 78.0081 },
    { lat: 27.4924, lng: 77.6737 },
    'car'
  );
  assert.ok(travel.distanceKm > 45);
  assert.ok(travel.travelTimeMinutes > 60);
  assert.ok(travel.totalWithBufferMinutes > travel.travelTimeMinutes);
});

test('Rule R1: Flags attraction scheduled on closed weekday', () => {
  const dummyTrip: EngineTripContext = {
    id: 'trp_test_1',
    title: 'Test Taj Trip',
    startDate: '2026-12-25', // Friday
    endDate: '2026-12-25',
    pace: 'moderate',
    tier: 'standard',
    budgetPaise: 500000,
    adults: 2,
    children: 0,
    seniors: 0,
    needs: [],
    interests: [],
    days: [
      {
        dayNumber: 1,
        date: '2026-12-25',
        weekday: 5, // Friday
        items: [
          {
            id: 'itm_1',
            attractionId: 'att_taj',
            name: 'Taj Mahal',
            startTime: '10:00',
            endTime: '12:00',
            orderIndex: 0,
            lat: 27.1751,
            lng: 78.0421,
            avgVisitMinutes: 120,
            hours: [
              { weekday: 5, isClosed: true }, // Closed Friday
              { weekday: 6, isClosed: false, openTime: '06:00', closeTime: '18:30' },
            ],
            dataStatus: 'verified',
          },
        ],
      },
    ],
  };

  const findings = checkOpeningHours(dummyTrip);
  assert.strictEqual(findings.length, 1);
  assert.strictEqual(findings[0].rule, 'R1_OPENING_HOURS');
  assert.strictEqual(findings[0].severity, 'error');
  assert.ok(findings[0].message.includes('closed on Friday'));
});

test('Rule R4: Flags overlapping time slots and duplicate visits', () => {
  const dummyTrip: EngineTripContext = {
    id: 'trp_test_2',
    title: 'Overlap Trip',
    startDate: '2026-12-26',
    endDate: '2026-12-26',
    pace: 'moderate',
    tier: 'standard',
    budgetPaise: 500000,
    adults: 2,
    children: 0,
    seniors: 0,
    needs: [],
    interests: [],
    days: [
      {
        dayNumber: 1,
        date: '2026-12-26',
        weekday: 6,
        items: [
          {
            id: 'itm_1',
            attractionId: 'att_1',
            name: 'Agra Fort',
            startTime: '09:00',
            endTime: '11:00',
            orderIndex: 0,
            lat: 27.1795,
            lng: 78.0211,
            avgVisitMinutes: 120,
            hours: [{ weekday: 6, isClosed: false }],
            dataStatus: 'verified',
          },
          {
            id: 'itm_2',
            attractionId: 'att_2',
            name: 'Itmad-ud-Daula',
            startTime: '10:30', // Overlaps with 09:00 - 11:00!
            endTime: '12:00',
            orderIndex: 1,
            lat: 27.1929,
            lng: 78.0311,
            avgVisitMinutes: 90,
            hours: [{ weekday: 6, isClosed: false }],
            dataStatus: 'verified',
          },
        ],
      },
    ],
  };

  const findings = checkOverlapAndDuplicates(dummyTrip);
  assert.ok(findings.some((f) => f.rule === 'R4_OVERLAP_DUPLICATES'));
});

test('Rule R6: Flags wheelchair accessibility mismatch', () => {
  const dummyTrip: EngineTripContext = {
    id: 'trp_test_3',
    title: 'Wheelchair Trip',
    startDate: '2026-12-26',
    endDate: '2026-12-26',
    pace: 'moderate',
    tier: 'standard',
    budgetPaise: 500000,
    adults: 2,
    children: 0,
    seniors: 0,
    needs: ['wheelchair', 'step_free'],
    interests: [],
    days: [
      {
        dayNumber: 1,
        date: '2026-12-26',
        weekday: 6,
        items: [
          {
            id: 'itm_stairs',
            attractionId: 'att_stairs',
            name: 'Steep Cliff Temple',
            startTime: '09:00',
            endTime: '10:30',
            orderIndex: 0,
            lat: 27.1,
            lng: 78.0,
            avgVisitMinutes: 90,
            hours: [{ weekday: 6, isClosed: false }],
            access: { wheelchairOk: 'no', stepFree: 'no' },
            dataStatus: 'verified',
          },
        ],
      },
    ],
  };

  const findings = checkSuitability(dummyTrip);
  assert.ok(findings.some((f) => f.rule === 'R6_SUITABILITY' && f.message.includes('not step-free')));
});

test('Settlement Engine: Solves 3-person case with minimum transfers (<= n-1)', () => {
  // Members: Asha (A), Bob (B), Charan (C)
  // Expenses:
  // 1. A pays ₹300 (30,000 paise) split equally among A, B, C (₹100 each)
  // 2. B pays ₹150 (15,000 paise) split equally among A, B, C (₹50 each)
  // Net:
  // A paid 300, share is 150 -> Net = +150
  // B paid 150, share is 150 -> Net = 0
  // C paid 0, share is 150 -> Net = -150
  // Expected transfer: C pays A ₹150 (15,000 paise) in exactly 1 transfer (1 <= 3 - 1)
  const members = [
    { id: 'mem_a', name: 'Asha' },
    { id: 'mem_b', name: 'Bob' },
    { id: 'mem_c', name: 'Charan' },
  ];

  const expenses = [
    {
      id: 'exp_1',
      paidById: 'mem_a',
      amountPaise: 30000,
      splits: [
        { memberId: 'mem_a', sharePaise: 10000 },
        { memberId: 'mem_b', sharePaise: 10000 },
        { memberId: 'mem_c', sharePaise: 10000 },
      ],
    },
    {
      id: 'exp_2',
      paidById: 'mem_b',
      amountPaise: 15000,
      splits: [
        { memberId: 'mem_a', sharePaise: 5000 },
        { memberId: 'mem_b', sharePaise: 5000 },
        { memberId: 'mem_c', sharePaise: 5000 },
      ],
    },
  ];

  const result = calculateSettlement(members, expenses);
  assert.strictEqual(result.transfers.length, 1);
  assert.strictEqual(result.transfers[0].fromMemberId, 'mem_c');
  assert.strictEqual(result.transfers[0].toMemberId, 'mem_a');
  assert.strictEqual(result.transfers[0].amountPaise, 15000);
});

test('Settlement Engine: Solves 5-person case with minimum transfers (<= 4 transfers)', () => {
  const members = [
    { id: 'p1', name: 'Person 1' },
    { id: 'p2', name: 'Person 2' },
    { id: 'p3', name: 'Person 3' },
    { id: 'p4', name: 'Person 4' },
    { id: 'p5', name: 'Person 5' },
  ];

  // Total ₹500 (50,000 paise) paid by P1, split equally among all 5 (₹100 each)
  const expenses = [
    {
      id: 'exp_big',
      paidById: 'p1',
      amountPaise: 50000,
      splits: members.map((m) => ({ memberId: m.id, sharePaise: 10000 })),
    },
  ];

  const result = calculateSettlement(members, expenses);
  assert.ok(result.transfers.length <= 4);
  assert.strictEqual(result.transfers.length, 4);
  const totalSettled = result.transfers.reduce((sum, t) => sum + t.amountPaise, 0);
  assert.strictEqual(totalSettled, 40000);
});

test('Smart Budget Estimator returns min, likely, and max within defined bands', () => {
  const dummyTrip: EngineTripContext = {
    id: 'trp_budget',
    title: 'Budget Test',
    startDate: '2026-12-26',
    endDate: '2026-12-28', // 3 days, 2 nights
    pace: 'moderate',
    tier: 'standard',
    budgetPaise: 2500000, // ₹25,000
    adults: 2,
    children: 1,
    seniors: 0,
    needs: [],
    interests: [],
    days: [
      { dayNumber: 1, date: '2026-12-26', weekday: 6, items: [] },
      { dayNumber: 2, date: '2026-12-27', weekday: 0, items: [] },
      { dayNumber: 3, date: '2026-12-28', weekday: 1, items: [] },
    ],
  };

  const budget = estimateTripBudget(dummyTrip);
  assert.strictEqual(budget.currency, 'INR');
  assert.ok(budget.total.minPaise < budget.total.likelyPaise);
  assert.ok(budget.total.likelyPaise < budget.total.maxPaise);
  assert.strictEqual(typeof budget.withinBudget, 'boolean');
});
