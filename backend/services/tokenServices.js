import jwt from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken.js";

export function generateAccessToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" },
  );
}

export async function generateRefreshToken(user) {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days
  await RefreshToken.create({ token, userId: user.id, expiresAt });

  return token;
}

export async function verifyRefreshToken(token) {
  const storedToken = await RefreshToken.findOne({ token });
  if (!storedToken) return null;

  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return null;
  }
}

export async function revokeRefreshToken(token) {
  await RefreshToken.deleteOne({ token });
}
