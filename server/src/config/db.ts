import mongoose from "mongoose";
import { env } from "./env.js";

let cachedConnectionPromise: Promise<typeof mongoose> | null = null;

export async function connectDb() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (mongoose.connection.readyState === 2 && cachedConnectionPromise) {
    await cachedConnectionPromise;
    return mongoose.connection;
  }

  cachedConnectionPromise = mongoose.connect(env.mongodbUri, {
    bufferCommands: false,
  });

  await cachedConnectionPromise;
  console.log(`MongoDB connected: ${mongoose.connection.name}`);
  return mongoose.connection;
}
