import type {
  NextFunction as ExpressNextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";

export function errorMiddleware(
  err: unknown,
  _req: ExpressRequest,
  res: ExpressResponse,
  _next: ExpressNextFunction
) {
  const message =
    err instanceof Error ? err.message : "Internal server error";

  return res.status(500).json({
    ok: false,
    error: message,
  });
}