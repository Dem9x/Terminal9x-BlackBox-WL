import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import passportRoutes from "./routes/passport.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

export const app = express();

app.set("trust proxy", 1);

app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (env.clientUrls.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

app.use(express.json({ limit: "1mb" }));

if (env.nodeEnv !== "production") {
  app.use(morgan("dev"));
}

app.get("/", (_req: any, res: any) => {
  return res.json({
    ok: true,
    service: "Terminal9X Blackbox API",
    message: "API is online. Use /api/health",
  });
});

app.get("/api/health", (_req: any, res: any) => {
  return res.json({
    ok: true,
    service: "cold-inbox-passport",
    runtime: "vercel-function",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/passport", passportRoutes);

app.use(errorMiddleware);