import type { Request as ExpressRequest } from "express";

export type AuthUser = {
  id: string;
  email: string;
  agentId?: string;
  role?: "agent" | "master";
};

export interface AuthRequest extends ExpressRequest {
  user?: AuthUser;
}