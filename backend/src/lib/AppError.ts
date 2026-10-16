export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'UNAUTHENTICATED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'BUSINESS_RULE'
  | 'RATE_LIMITED'
  | 'INTERNAL';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCode;
  public readonly details?: unknown[];

  constructor(statusCode: number, code: ErrorCode, message: string, details?: unknown[]) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  static validation(message: string, details?: unknown[]) {
    return new AppError(400, 'VALIDATION_ERROR', message, details);
  }

  static unauthenticated(message = 'Missing, invalid or expired token') {
    return new AppError(401, 'UNAUTHENTICATED', message);
  }

  static forbidden(message = 'You do not have access to this resource') {
    return new AppError(403, 'FORBIDDEN', message);
  }

  static notFound(resource = 'Resource') {
    return new AppError(404, 'NOT_FOUND', `${resource} not found`);
  }

  static conflict(message: string) {
    return new AppError(409, 'CONFLICT', message);
  }

  static businessRule(message: string) {
    return new AppError(422, 'BUSINESS_RULE', message);
  }

  static rateLimited(message = 'Too many requests, please try again later') {
    return new AppError(429, 'RATE_LIMITED', message);
  }

  static internal(message = 'An unexpected internal error occurred') {
    return new AppError(500, 'INTERNAL', message);
  }
}
