import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token

  if (!token) return res.status(401).json({ message: "No noken provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (e) {
    return res.status(403).json({ message: "Invalid token" });
  }
}
