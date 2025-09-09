import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Serve frontend files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../public")));

// Connection to base
const uri = "mongodb://127.0.0.1:27017/todosdb";

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const todoSchema = new mongoose.Schema({
  task: String,
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todo", todoSchema);

// GET /todos
app.get("/todos", async (_, res) => {
  const todos = await Todo.find();

  res.json(todos);
});

// POST /todos
app.post("/todos", async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();

  const todos = await Todo.find();
  res.json(todos);
});

// PUT /todos
// app.put("/todos/:id", async (req, res) => {
//   console.log("req", req);
//   // const todo = new Todo()
// });

const PORT = 3000;
app.listen(PORT, () => console.log("Server running on port 3000"));
