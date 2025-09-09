import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

// GET /todos
router.get("/", async (_, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// POST /todos
router.post("/", async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  const todos = await Todo.find();
  res.json(todos);
});

// PUT /todos/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;
    const updated = await Todo.findByIdAndUpdate(id, { task }, { new: true });
    if (!updated) return res.status(404).json({ error: "Todo not found" });
    res.json(updated);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// DELETE /todos/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    const todos = await Todo.find();
    res.json(todos);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

export default router;
