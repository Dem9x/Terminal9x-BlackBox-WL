import dotenv from "dotenv";

dotenv.config();

const hardcodedClientUrls = [
  "https://www.terminal9x.fun",
  "https://terminal9x.fun",
];

const rawClientUrls =
  process.env.CLIENT_URLS ??
  process.env.CLIENT_URL ??
  process.env.CLIENT_ORIGIN ??
  "http://localhost:5173";

const clientUrls = Array.from(
  new Set([
    ...hardcodedClientUrls,
    ...rawClientUrls
      .split(",")
      .map((url) => url.trim())
      .filter(Boolean),
  ])
);

export const env = {
  port: Number(process.env.PORT ?? 5000),
  mongodbUri:
    process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/cold_inbox",
  jwtSecret: process.env.JWT_SECRET ?? "change_this_secret",
  clientUrl: clientUrls[0] ?? "http://localhost:5173",
  clientUrls,
  nodeEnv: process.env.NODE_ENV ?? "development",
  isVercel: Boolean(process.env.VERCEL),
};

if (env.jwtSecret === "change_this_secret" && env.nodeEnv === "production") {
  throw new Error("JWT_SECRET must be changed in production.");
}