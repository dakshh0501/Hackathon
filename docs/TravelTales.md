# TravelTales (A9) — Backend Architecture, Research & Execution Plan
*GLA HackVision 2 · Problem Statement A9: Local Tourism and Trip Planning Website*
*Backend track · Prepared 16 October 2026*

---

## 1. Executive Summary
- **What we are building**: The backend and API for TravelTales, a trip-planning platform where users discover attractions, build day-wise itineraries, estimate budgets, split group costs, and export plans.
- **Core Innovation**: A **Trip Intelligence Engine** — a deterministic, explainable rules engine behind a standard CRUD backend. It detects conflicts (closed attractions, impossible travel times, overloaded days), estimates budgets as ranges, flags accessibility and family suitability, and settles group expenses with minimum transfers ($n-1$).
- **Data Trust**: Every data point carries a trust label (`data_status`: `sample` | `verified`, `source`, `last_verified_at`).
- **No Paid APIs**: Distances use Haversine formulas on stored coordinates.

---

## 2. Technology Stack & Environment
- **Runtime**: Node.js 20+ / 22 LTS + TypeScript
- **Framework**: Express
- **Validation**: Zod (Single source of truth for request/response & OpenAPI spec)
- **Database**: PostgreSQL (via Prisma ORM)
- **Auth**: JWT bearer tokens (12-hour expiry) + bcrypt password hashing
- **API Documentation**: OpenAPI 3 / Swagger UI served at `/docs` and `/openapi.json`
- **Ports**: API on port `4000`, Frontend on port `5173` (CORS enabled for `http://localhost:5173`)
- **Money Handling**: Stored as whole integer **paise** (₹1 = 100 paise) to avoid floating-point issues.
- **Dates & Times**: Dates in `YYYY-MM-DD` (ISO 8601), Times in `HH:mm` (24-hour).

---

## 3. Directory Layout (`/backend`)
```text
backend/
├── package.json
├── tsconfig.json
├── .env.example
├── docker-compose.yml
├── prisma/
│   ├── schema.prisma
│   └── seed/
│       ├── states.json
│       ├── cities.json
│       ├── deep/
│       │   ├── mathura-vrindavan.json
│       │   └── agra.json
│       └── index.ts
└── src/
    ├── server.ts
    ├── app.ts
    ├── config/
    │   ├── env.ts
    │   └── engine.config.ts
    ├── middleware/
    │   ├── auth.ts
    │   ├── validate.ts
    │   ├── errorHandler.ts
    │   └── rateLimit.ts
    ├── lib/
    │   ├── prisma.ts
    │   ├── jwt.ts
    │   ├── password.ts
    │   ├── money.ts
    │   ├── AppError.ts
    │   └── response.ts
    ├── modules/
    │   ├── auth/
    │   ├── catalogue/
    │   ├── saved/
    │   ├── trips/
    │   ├── itinerary/
    │   ├── budget/
    │   ├── expenses/
    │   ├── checklists/
    │   ├── notes/
    │   └── export/
    ├── engine/
    │   ├── geo.ts
    │   ├── checker.ts
    │   ├── generator.ts
    │   ├── budget.ts
    │   ├── settle.ts
    │   ├── suitability.ts
    │   └── rules/
    │       ├── r1_opening_hours.ts
    │       ├── r2_travel_feasibility.ts
    │       ├── r3_day_overload.ts
    │       ├── r4_overlap_duplicates.ts
    │       ├── r5_budget_overrun.ts
    │       ├── r6_suitability.ts
    │       └── r7_seasonal.ts
    └── openapi/
        └── index.ts
```

---

## 4. API Endpoints Surface (All under `/api/v1`)
- **Envelope**:
  - Success: `{ "data": ..., "meta": { ... } }`
  - Error: `{ "error": { "code": "...", "message": "...", "details": [...] } }`
- **Error Codes**: `VALIDATION_ERROR` (400), `UNAUTHENTICATED` (401), `FORBIDDEN` (403), `NOT_FOUND` (404), `CONFLICT` (409), `BUSINESS_RULE` (422), `RATE_LIMITED` (429), `INTERNAL` (500).

### Key Endpoints:
1. **Health & Ops**: `GET /health`, `GET /openapi.json`, `GET /docs`
2. **Auth**: `POST /auth/register`, `POST /auth/login`, `GET /auth/me`
3. **Catalogue**:
   - `GET /destinations` (query: `type`, `parentId`, `dataDepth`, `q`, `page`, `pageSize`)
   - `GET /destinations/:id`
   - `GET /destinations/suggest` (query: `q`)
   - `GET /states`
   - `GET /attractions` (query: `destinationId`, `category`, `minCostPaise`, `maxCostPaise`, `maxDurationMinutes`, `accessible`, `familyFriendly`, `dataStatus`, `sort`, `order`, `page`, `pageSize`)
   - `GET /attractions/:id`
   - `GET /meta/filters`
4. **Saved Attractions**: `GET /saved/attractions`, `POST /saved/attractions`, `DELETE /saved/attractions/:attractionId`
5. **Trips**: `POST /trips`, `GET /trips`, `GET /trips/:id`, `PATCH /trips/:id`, `DELETE /trips/:id`
6. **Itinerary**:
   - `GET /trips/:id/itinerary`
   - `POST /trips/:id/itinerary/items`
   - `PATCH /itinerary/items/:itemId`
   - `DELETE /itinerary/items/:itemId`
   - `POST /trips/:id/itinerary/reorder`
7. **Trip Intelligence Engine**:
   - `POST /trips/:id/itinerary/generate`
   - `GET /trips/:id/itinerary/validate`
   - `POST /trips/:id/itinerary/fixes`
   - `GET /trips/:id/budget`
   - `GET /trips/:id/health`
8. **Group Expenses & Settlement**:
   - `GET /trips/:id/members`, `POST /trips/:id/members`
   - `GET /trips/:id/expenses`, `POST /trips/:id/expenses`, `DELETE /expenses/:expenseId`
   - `GET /trips/:id/settlement`
9. **Checklists**: `GET /trips/:id/checklists`, `POST /trips/:id/checklists/generate`, `POST /trips/:id/checklists`, `PATCH /checklists/:itemId`, `DELETE /checklists/:itemId`
10. **Notes & Reviews**: `GET /trips/:id/notes`, `POST /trips/:id/notes`, `GET /attractions/:id/reviews`, `POST /attractions/:id/reviews`
11. **Export & Sharing**: `GET /trips/:id/export?format=json|ics|pdf`, `POST /trips/:id/share`, `DELETE /trips/:id/share`, `GET /shared/:token`
