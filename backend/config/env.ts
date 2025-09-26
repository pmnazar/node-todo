import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI!;
export const FRONTEND_URL = process.env.FRONTEND_URL!;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
export const NODE_ENV = process.env.NODE_ENV!;
