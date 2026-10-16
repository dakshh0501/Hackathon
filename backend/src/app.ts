import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { env } from './config/env.ts';
import { errorHandler } from './middleware/errorHandler.ts';
import { sendSuccess } from './lib/response.ts';
import { AppError } from './lib/AppError.ts';
import { openApiSpec } from './openapi/spec.ts';
import { discoveryRouter } from './modules/discovery/discovery.routes.ts';

export const app = express();

// Security and middleware
app.use(helmet({
  contentSecurityPolicy: false, // Allows Swagger UI to load inline styles/scripts
}));

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Swagger UI) or matching origins
    if (!origin || origin === env.CORS_ORIGIN || origin.startsWith('http://localhost:')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

// Request logger
app.use((req, _res, next) => {
  if (env.NODE_ENV !== 'test') {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  }
  next();
});

// Operations & Docs
app.get('/health', async (_req: Request, res: Response) => {
  return sendSuccess(res, {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: env.NODE_ENV,
    service: 'TravelTales Backend',
  });
});

app.get('/openapi.json', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  return res.json(openApiSpec);
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

// API v1 Router
const apiV1Router = express.Router();
apiV1Router.use('/', discoveryRouter);
app.use('/api/v1', apiV1Router);

// Root greeting
app.get('/', (_req: Request, res: Response) => {
  return sendSuccess(res, {
    message: 'Welcome to TravelTales API. Visit /docs for Swagger UI documentation.',
    docs: '/docs',
    health: '/health',
  });
});

// 404 Catch-all
app.use((req: Request, _res: Response, next) => {
  next(AppError.notFound(`Route ${req.method} ${req.originalUrl}`));
});

// Central Error Handler
app.use(errorHandler);
