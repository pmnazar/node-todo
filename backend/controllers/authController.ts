import User from "../models/User";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
  revokeRefreshToken,
  verifyRefreshToken,
} from "../services/tokenServices.js";
import { Request, Response } from "express";
const isProd = process.env.NODE_ENV === "production";

interface RegisterBody {
  username: string;
  email: string;
  password: string;
}
interface LoginBody {
  username: string;
  password: string;
}
interface RefreshTokenPayload {
  id: string;
  username: string;
}

export const registerUser = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response,
) => {
  try {
    const { username, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed, email });
    await user.save();
    res.json({ message: "User registered successfull" });
  } catch (e: any) {
    res
      .status(500)
      .json({ message: "Error registering user", error: e.message });
  }
};

export const loginUser = async (
  req: Request<{}, {}, LoginBody>,
  res: Response,
) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid credencials" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(401).json({ message: "Invalid credencials" });

    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (e: any) {
    res.status(500).json({ message: "Login error", error: e.message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token || typeof token !== "string") return res.sendStatus(401);

    const payload = (await verifyRefreshToken(
      token,
    )) as RefreshTokenPayload | null;
    if (!payload) return res.sendStatus(403);

    const accessToken = generateAccessToken({
      id: payload.id,
      username: payload.username,
    });
    res.json({ accessToken });
  } catch (e: any) {
    res.status(500).json({ message: "Refresh token error", error: e.message });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (token && typeof token === "string") {
      await revokeRefreshToken(token); // delete from DB
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "strict",
    });

    res.sendStatus(204);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ message: "Logout error", error: e.message });
  }
};
