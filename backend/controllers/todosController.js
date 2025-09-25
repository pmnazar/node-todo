import Todo from "../models/Todo.js";
import { parseLLMResponse } from "../utils/parseTodo.js";

export const getTodo = async (req, res) => {
  const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: 1 });
  res.json(todos);
};

export const createTodo = async (req, res) => {
  if (!req.body.title)
    return res.status(400).json({ error: "Title is required" });
  if (!req.user || !req.user.id)
    return res.status(401).json({ error: "Unauthorize" });

  try {
    const todo = new Todo({
      title: req.body.title,
      user: req.user.id,
      completed: req.body.completed,
    });
    await todo.save();

    res.json(todo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to create todo" });
  }
};

export const editTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const updated = await Todo.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true },
    );
    if (!updated) return res.status(404).json({ error: "Todo not found" });
    res.json(updated);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to update todo" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    const todos = await Todo.find();
    res.json(todos);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to delete todo" });
  }
};
