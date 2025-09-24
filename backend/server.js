import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
import todoRoutes from "./routes/todosRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const watchDir = path.join(__dirname, "../frontend/todo/dist/todo");

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// Serve frontend
app.use(express.static(watchDir));

// MongoDB connection
const uri = process.env.MONGO_URI;
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

app.get(/.*/, (_, res) => {
  res.sendFile(path.join(watchDir, "index.html"));
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
