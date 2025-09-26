import jwt from "jsonwebtoken";

import RefreshToken from "../models/RefreshToken.js";
import { IUser } from "../models/User.js";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/env";

export function generateAccessToken(user: Partial<IUser>) {
  return jwt.sign(
    { id: user.id, username: user.username },
    ACCESS_TOKEN_SECRET!,
    { expiresIn: "10s" },
  );
}

export async function generateRefreshToken(user: IUser) {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days
  await RefreshToken.create({ token, userId: user.id, expiresAt });

  return token;
}

export async function verifyRefreshToken(token: string) {
  const storedToken = await RefreshToken.findOne({ token });
  if (!storedToken) return null;

  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (err) {
    return null;
  }
}

export async function revokeRefreshToken(token: string) {
  await RefreshToken.deleteOne({ token });
}
