import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import User from "../models/User";
import { ACCESS_TOKEN_SECRET } from "../config/env";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token

  if (!token) return res.status(401).json({ message: "No noken provided" });

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET!) as {
      id: string;
    };
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user; // attach user info to request
    next();
  } catch (e: any) {
    if (e.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(403).json({ message: "Invalid token" });
  }
}
