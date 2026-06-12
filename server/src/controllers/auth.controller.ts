import bcrypt from "bcryptjs";
import type { Response } from "express";
import { AgentPassport, divisions } from "../models/AgentPassport.js";
import { User } from "../models/User.js";
import { signToken } from "../utils/jwt.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

function sanitizeUsername(value: string) {
  return value.trim().replace(/\s+/g, "_").slice(0, 32);
}

function makeWhitelistCode(username: string) {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `T9X-WL-${username.slice(0, 4).toUpperCase()}-${random}`;
}

export async function register(req: AuthRequest, res: Response) {
  const { username, email, password, division, referralCode } = req.body as {
    username?: string;
    email?: string;
    password?: string;
    division?: string;
    referralCode?: string;
  };

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Username, email, and password are required." });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters." });
  }

  const cleanUsername = sanitizeUsername(username);
  const selectedDivision = division && divisions.includes(division as never) ? division : "Cipher Analyst";
  const passwordHash = await bcrypt.hash(password, 12);

  const user = await User.create({
    username: cleanUsername,
    email: email.toLowerCase().trim(),
    passwordHash,
  });

  const passport = await AgentPassport.create({
    userId: user._id,
    codename: cleanUsername,
    division: selectedDivision,
    freeMintEligible: true,
    whitelistStatus: "reserved",
    whitelistCode: makeWhitelistCode(cleanUsername),
    referralCode: referralCode?.trim().slice(0, 32),
    whitelistJoinedAt: new Date(),
  });

  const token = signToken(String(user._id));
  res.status(201).json({ token, user: user.toJSON(), passport });
}

export async function login(req: AuthRequest, res: Response) {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user) return res.status(401).json({ message: "Invalid email or password." });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: "Invalid email or password." });

  const passport = await AgentPassport.findOne({ userId: user._id });
  const token = signToken(String(user._id));

  res.json({ token, user: user.toJSON(), passport });
}

export async function me(req: AuthRequest, res: Response) {
  const user = await User.findById(req.userId);
  const passport = await AgentPassport.findOne({ userId: req.userId });
  res.json({ user, passport });
}
