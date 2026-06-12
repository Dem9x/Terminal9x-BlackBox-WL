import dotenv from "dotenv";

dotenv.config();

const rawClientUrls =
  process.env.CLIENT_URLS ??
  process.env.CLIENT_URL ??
  "http://localhost:5173";

const clientUrls = rawClientUrls
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);

export const env = {
  port: Number(process.env.PORT ?? 5000),
  mongodbUri: process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/cold_inbox",
  jwtSecret: process.env.JWT_SECRET ?? "change_this_secret",
  clientUrl: clientUrls[0] ?? "http://localhost:5173",
  clientUrls,
  nodeEnv: process.env.NODE_ENV ?? "development",
  isVercel: Boolean(process.env.VERCEL),
};

if (env.jwtSecret === "change_this_secret" && env.nodeEnv === "production") {
  throw new Error("JWT_SECRET must be changed in production.");
}
