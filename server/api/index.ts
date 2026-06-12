import type { Request, Response } from "express";
import { app } from "../src/app.js";
import { connectDb } from "../src/config/db.js";

let bootPromise: Promise<unknown> | null = null;

async function boot() {
  if (!bootPromise) {
    bootPromise = connectDb();
  }

  await bootPromise;
}

export default async function handler(req: Request, res: Response) {
  await boot();
  return app(req, res);
}
