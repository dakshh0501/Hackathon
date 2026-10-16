import { app } from './app.ts';
import { env } from './config/env.ts';

const server = app.listen(env.PORT, () => {
  console.log(`🚀 TravelTales Backend is running on port ${env.PORT}`);
  console.log(`📖 Swagger UI Documentation: http://localhost:${env.PORT}/docs`);
  console.log(`🩺 Health check: http://localhost:${env.PORT}/health`);
  console.log(`📄 OpenAPI Spec: http://localhost:${env.PORT}/openapi.json`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
