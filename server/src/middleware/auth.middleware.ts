import type {
  NextFunction as ExpressNextFunction,
  Response as ExpressResponse,
} from "express";
import jwt from "jsonwebtoken";
import type { AuthRequest, AuthUser } from "../types/auth.js";

type JwtPayload = {
  id: string;
  email: string;
  agentId?: string;
  role?: "agent" | "master";
};

export function requireAuth(
  req: AuthRequest,
  res: ExpressResponse,
  next: ExpressNextFunction
) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({
      ok: false,
      error: "Missing authorization token",
    });
  }

  const token = header.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "dev-secret"
    ) as JwtPayload;

    const user: AuthUser = {
      id: decoded.id,
      email: decoded.email,
      agentId: decoded.agentId,
      role: decoded.role,
    };

    req.user = {
  id: decoded.id,
  email: decoded.email,
  agentId: decoded.agentId,
  role: decoded.role,
};
    return next();
  } catch {
    return res.status(401).json({
      ok: false,
      error: "Invalid authorization token",
    });
  }
}