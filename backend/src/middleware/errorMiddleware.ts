import type { NextFunction, Request, RequestHandler, Response } from "express";

// Wraps an async route handler so rejected promises are forwarded to errorMiddleware via next(),
// since Express 4 does not do this automatically.
export const asyncHandler =
  (fn: RequestHandler): RequestHandler =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// Must be registered last in app.ts with exactly 4 parameters.
export function errorMiddleware(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
}
