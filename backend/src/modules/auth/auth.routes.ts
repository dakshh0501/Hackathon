import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { store } from '../../data/store.ts';
import type { UserRecord } from '../../data/store.ts';
import { hashPassword, comparePassword } from '../../lib/password.ts';
import { signToken } from '../../lib/jwt.ts';
import { sendSuccess } from '../../lib/response.ts';
import { AppError } from '../../lib/AppError.ts';
import { requireAuth, type AuthenticatedRequest } from '../../middleware/auth.ts';

export const authRouter = Router();

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

/**
 * POST /auth/register
 */
authRouter.post('/auth/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return next(AppError.validation('Invalid registration data', parsed.error.errors));
    }

    const { name, email, password } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();

    // Check if email already registered
    for (const u of store.users.values()) {
      if (u.email.toLowerCase() === normalizedEmail) {
        return next(AppError.conflict('An account with this email already exists'));
      }
    }

    const passwordHash = await hashPassword(password);
    const id = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const newUser: UserRecord = {
      id,
      name,
      email: normalizedEmail,
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    store.users.set(id, newUser);

    const token = signToken({ userId: newUser.id, email: newUser.email });

    return sendSuccess(
      res,
      {
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
        token,
      },
      201
    );
  } catch (err) {
    next(err);
  }
});

/**
 * POST /auth/login
 */
authRouter.post('/auth/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return next(AppError.validation('Invalid login credentials', parsed.error.errors));
    }

    const { email, password } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();

    let matchedUser: UserRecord | undefined;
    for (const u of store.users.values()) {
      if (u.email.toLowerCase() === normalizedEmail) {
        matchedUser = u;
        break;
      }
    }

    if (!matchedUser) {
      return next(AppError.unauthenticated('Invalid email or password'));
    }

    const isValidPassword = await comparePassword(password, matchedUser.passwordHash);
    if (!isValidPassword) {
      return next(AppError.unauthenticated('Invalid email or password'));
    }

    const token = signToken({ userId: matchedUser.id, email: matchedUser.email });

    return sendSuccess(res, {
      user: { id: matchedUser.id, name: matchedUser.name, email: matchedUser.email },
      token,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /auth/me
 */
authRouter.get('/auth/me', requireAuth, (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.userId;
  if (!userId) {
    return next(AppError.unauthenticated());
  }

  const user = store.users.get(userId);
  if (!user) {
    return next(AppError.notFound('User'));
  }

  return sendSuccess(res, {
    user: { id: user.id, name: user.name, email: user.email },
  });
});
