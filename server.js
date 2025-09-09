import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import reload from "reload";
import todoRoutes from "./routes/todos.js";

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const watchDir = path.join(__dirname, "public");

app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(watchDir));

// MongoDB connection
const uri = "mongodb://127.0.0.1:27017/todosdb";
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/todos", todoRoutes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

reload(app, {
  watchDir,
})
  .then(() => {
    console.log("✅ Reload is watching for changes");
  })
  .catch((err) => {
    console.error("Reload error:", err);
  });
