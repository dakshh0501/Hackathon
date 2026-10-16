export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "TravelTales API",
    version: "1.0.0",
    description: "Backend REST API and Trip Intelligence Engine for TravelTales (A9)",
  },
  servers: [
    {
      url: "http://localhost:4000/api/v1",
      description: "Local development server",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      ErrorResponse: {
        type: "object",
        properties: {
          error: {
            type: "object",
            properties: {
              code: { type: "string", example: "VALIDATION_ERROR" },
              message: { type: "string", example: "Invalid input" },
              details: { type: "array", items: { type: "object" } },
            },
            required: ["code", "message"],
          },
        },
      },
      User: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string" },
        },
        required: ["id", "name", "email"],
      },
      Destination: {
        type: "object",
        properties: {
          id: { type: "string" },
          slug: { type: "string" },
          name: { type: "string" },
          state: { type: "string" },
          type: { type: "string", enum: ["state", "ut", "city"] },
          parentId: { type: "string", nullable: true },
          description: { type: "string" },
          dataDepth: { type: "string", enum: ["basic", "standard", "deep"] },
          dataStatus: { type: "string", enum: ["sample", "verified"] },
          attractionCount: { type: "integer" },
        },
        required: ["id", "slug", "name", "state", "type", "description", "dataDepth", "dataStatus"],
      },
      AttractionCard: {
        type: "object",
        properties: {
          id: { type: "string", example: "att_12" },
          destinationId: { type: "string", example: "dst_1" },
          name: { type: "string", example: "Taj Mahal" },
          category: { type: "string", example: "heritage" },
          avgVisitMinutes: { type: "integer", example: 120 },
          entryAdultPaise: { type: "integer", example: 5000 },
          accessible: { type: "boolean", example: true },
          familyFriendly: { type: "boolean", example: true },
          dataStatus: { type: "string", enum: ["sample", "verified"], example: "verified" },
          lastVerifiedAt: { type: "string", nullable: true },
        },
        required: ["id", "destinationId", "name", "category", "avgVisitMinutes", "entryAdultPaise", "accessible", "familyFriendly", "dataStatus"],
      },
      Trip: {
        type: "object",
        properties: {
          id: { type: "string" },
          destinationId: { type: "string" },
          title: { type: "string" },
          startDate: { type: "string", example: "2026-12-26" },
          endDate: { type: "string", example: "2026-12-28" },
          adults: { type: "integer", example: 2 },
          children: { type: "integer", example: 1 },
          seniors: { type: "integer", example: 0 },
          pace: { type: "string", enum: ["relaxed", "moderate", "packed"], example: "moderate" },
          tier: { type: "string", enum: ["budget", "standard", "premium"], example: "standard" },
          budgetPaise: { type: "integer", example: 2500000 },
          interests: { type: "array", items: { type: "string" } },
          needs: { type: "array", items: { type: "string" } },
        },
        required: ["id", "destinationId", "title", "startDate", "endDate", "adults", "pace", "tier", "budgetPaise"],
      },
      Finding: {
        type: "object",
        properties: {
          id: { type: "string", example: "f1" },
          rule: { type: "string", example: "R1_OPENING_HOURS" },
          severity: { type: "string", enum: ["error", "warning", "info"], example: "error" },
          message: { type: "string", example: "Taj Mahal is closed on Friday." },
          affectedItemIds: { type: "array", items: { type: "string" }, example: ["itm_1"] },
          suggestedFix: {
            type: "object",
            properties: {
              type: { type: "string", enum: ["MOVE_ITEM", "SHIFT_TIME", "REMOVE_ITEM", "SWAP_ITEM"] },
              itemId: { type: "string" },
              toDayNumber: { type: "integer" },
              startTime: { type: "string" },
            },
          },
        },
        required: ["id", "rule", "severity", "message", "affectedItemIds"],
      },
    },
  },
  paths: {
    "/health": {
      get: {
        summary: "Check service health and database connectivity",
        responses: {
          200: {
            description: "Service is healthy",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "object",
                      properties: {
                        status: { type: "string", example: "ok" },
                        timestamp: { type: "string" },
                        uptime: { type: "number" },
                        database: { type: "string", example: "connected" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/meta/layers": {
      get: {
        summary: "Get default landscape parallax layers for Scene 1 (behind the duffel bag mascot)",
        responses: {
          200: {
            description: "Layered parallax assets and branding",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "object",
                      properties: {
                        branding: {
                          type: "object",
                          properties: {
                            name: { type: "string" },
                            tagline: { type: "string" },
                          },
                        },
                        layers: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              id: { type: "string" },
                              name: { type: "string" },
                              url: { type: "string" },
                              speed: { type: "number" },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/destinations/suggest": {
      get: {
        summary: "Get rapid search-as-you-type destination suggestions for the explorer character search bar",
        parameters: [
          { name: "q", in: "query", schema: { type: "string" }, description: "Search query string" },
        ],
        responses: {
          200: {
            description: "Matching destination suggestions",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          slug: { type: "string" },
                          name: { type: "string" },
                          state: { type: "string" },
                          type: { type: "string" },
                          tagline: { type: "string" },
                          thumbnailUrl: { type: "string" },
                          dataDepth: { type: "string" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/destinations/{slug}/discovery": {
      get: {
        summary: "Get complete categorized discovery data for destination reveal animation",
        parameters: [
          { name: "slug", in: "path", required: true, schema: { type: "string" }, description: "Destination slug (e.g. jammu-and-kashmir, agra, jaipur)" },
        ],
        responses: {
          200: {
            description: "Full destination discovery payload with photos, parallax layers, and categories",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        slug: { type: "string" },
                        name: { type: "string" },
                        state: { type: "string" },
                        tagline: { type: "string" },
                        description: { type: "string" },
                        heroImage: { type: "string" },
                        bestMonths: { type: "array", items: { type: "string" } },
                        dataDepth: { type: "string" },
                        dataStatus: { type: "string" },
                        parallaxLayers: { type: "object" },
                        gallery: { type: "array", items: { type: "object" } },
                        categories: {
                          type: "object",
                          properties: {
                            places_to_explore: { type: "array", items: { type: "object" } },
                            local_culture: { type: "array", items: { type: "object" } },
                            traditional_products: { type: "array", items: { type: "object" } },
                            food_and_cuisine: { type: "array", items: { type: "object" } },
                            scenic_highlights: { type: "array", items: { type: "object" } },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/auth/register": {
      post: {
        summary: "Register new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Asha" },
                  email: { type: "string", example: "asha@example.com" },
                  password: { type: "string", minLength: 8, example: "password123" },
                },
                required: ["name", "email", "password"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Registered successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "object",
                      properties: {
                        user: { $ref: "#/components/schemas/User" },
                        token: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/auth/login": {
      post: {
        summary: "Log in user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", example: "asha@example.com" },
                  password: { type: "string", example: "password123" },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Logged in successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "object",
                      properties: {
                        user: { $ref: "#/components/schemas/User" },
                        token: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/auth/me": {
      get: {
        summary: "Get current logged-in user profile",
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: "Profile loaded",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "object",
                      properties: {
                        user: { $ref: "#/components/schemas/User" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/destinations": {
      get: {
        summary: "List and search destinations",
        parameters: [
          { name: "q", in: "query", schema: { type: "string" } },
          { name: "type", in: "query", schema: { type: "string", enum: ["state", "ut", "city"] } },
          { name: "parentId", in: "query", schema: { type: "string" } },
          { name: "dataDepth", in: "query", schema: { type: "string", enum: ["basic", "standard", "deep"] } },
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "pageSize", in: "query", schema: { type: "integer", default: 20 } },
        ],
        responses: {
          200: {
            description: "Destinations list",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: { type: "array", items: { $ref: "#/components/schemas/Destination" } },
                    meta: {
                      type: "object",
                      properties: {
                        page: { type: "integer" },
                        pageSize: { type: "integer" },
                        total: { type: "integer" },
                        totalPages: { type: "integer" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/attractions": {
      get: {
        summary: "List attractions with filters",
        parameters: [
          { name: "destinationId", in: "query", schema: { type: "string" } },
          { name: "category", in: "query", schema: { type: "string" } },
          { name: "q", in: "query", schema: { type: "string" } },
          { name: "minCostPaise", in: "query", schema: { type: "integer" } },
          { name: "maxCostPaise", in: "query", schema: { type: "integer" } },
          { name: "maxDurationMinutes", in: "query", schema: { type: "integer" } },
          { name: "accessible", in: "query", schema: { type: "boolean" } },
          { name: "familyFriendly", in: "query", schema: { type: "boolean" } },
          { name: "dataStatus", in: "query", schema: { type: "string", enum: ["sample", "verified"] } },
          { name: "sort", in: "query", schema: { type: "string", enum: ["popularity", "cost", "duration", "name"] } },
          { name: "order", in: "query", schema: { type: "string", enum: ["asc", "desc"] } },
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "pageSize", in: "query", schema: { type: "integer", default: 20 } },
        ],
        responses: {
          200: {
            description: "Attractions list",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: { type: "array", items: { $ref: "#/components/schemas/AttractionCard" } },
                    meta: {
                      type: "object",
                      properties: {
                        page: { type: "integer" },
                        pageSize: { type: "integer" },
                        total: { type: "integer" },
                        totalPages: { type: "integer" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/trips": {
      post: {
        summary: "Create a new trip",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  destinationId: { type: "string" },
                  title: { type: "string" },
                  startDate: { type: "string", example: "2026-12-26" },
                  endDate: { type: "string", example: "2026-12-28" },
                  adults: { type: "integer", default: 1 },
                  children: { type: "integer", default: 0 },
                  seniors: { type: "integer", default: 0 },
                  pace: { type: "string", enum: ["relaxed", "moderate", "packed"], default: "moderate" },
                  tier: { type: "string", enum: ["budget", "standard", "premium"], default: "standard" },
                  budgetPaise: { type: "integer", example: 2500000 },
                  interests: { type: "array", items: { type: "string" } },
                  needs: { type: "array", items: { type: "string" } },
                },
                required: ["destinationId", "title", "startDate", "endDate", "budgetPaise"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Trip created",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: { $ref: "#/components/schemas/Trip" },
                  },
                },
              },
            },
          },
        },
      },
      get: {
        summary: "List user trips",
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: "User trips list",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: { type: "array", items: { $ref: "#/components/schemas/Trip" } },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/trips/{id}/itinerary/validate": {
      get: {
        summary: "Validate trip itinerary with Trip Intelligence Engine (Rules R1-R7)",
        security: [{ BearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: {
            description: "Validation findings and summary",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "object",
                      properties: {
                        summary: {
                          type: "object",
                          properties: {
                            errors: { type: "integer", example: 1 },
                            warnings: { type: "integer", example: 1 },
                            infos: { type: "integer", example: 0 },
                          },
                        },
                        findings: {
                          type: "array",
                          items: { $ref: "#/components/schemas/Finding" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/trips/{id}/budget": {
      get: {
        summary: "Calculate estimated budget with min/likely/max and confidence indicator",
        security: [{ BearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: {
            description: "Budget estimate",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "object",
                      properties: {
                        currency: { type: "string", example: "INR" },
                        categories: {
                          type: "object",
                          properties: {
                            accommodation: {
                              type: "object",
                              properties: {
                                minPaise: { type: "integer" },
                                likelyPaise: { type: "integer" },
                                maxPaise: { type: "integer" },
                              },
                            },
                            food: {
                              type: "object",
                              properties: {
                                minPaise: { type: "integer" },
                                likelyPaise: { type: "integer" },
                                maxPaise: { type: "integer" },
                              },
                            },
                            entry: {
                              type: "object",
                              properties: {
                                minPaise: { type: "integer" },
                                likelyPaise: { type: "integer" },
                                maxPaise: { type: "integer" },
                              },
                            },
                            transport: {
                              type: "object",
                              properties: {
                                minPaise: { type: "integer" },
                                likelyPaise: { type: "integer" },
                                maxPaise: { type: "integer" },
                              },
                            },
                          },
                        },
                        total: {
                          type: "object",
                          properties: {
                            minPaise: { type: "integer" },
                            likelyPaise: { type: "integer" },
                            maxPaise: { type: "integer" },
                          },
                        },
                        budgetPaise: { type: "integer" },
                        withinBudget: { type: "boolean" },
                        confidence: { type: "string", enum: ["low", "medium", "high"] },
                        confidenceReason: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/trips/{id}/settlement": {
      get: {
        summary: "Compute group expense settlement with minimum transfers (n-1)",
        security: [{ BearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: {
            description: "Settlement transfers and balances",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "object",
                      properties: {
                        balances: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              memberId: { type: "string" },
                              name: { type: "string" },
                              netPaise: { type: "integer" },
                            },
                          },
                        },
                        transfers: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              fromMemberId: { type: "string" },
                              toMemberId: { type: "string" },
                              amountPaise: { type: "integer" },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
