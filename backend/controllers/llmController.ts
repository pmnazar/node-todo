import Todo, { ITodo } from "../models/Todo";
import { parseTaskWithLLM } from "../services/summarizeTaskByllm";
import { parseLLMResponse } from "../utils/parseTodo";
import { Request, Response } from "express";

interface CreateTodoBody {
  taskText: string;
}

export const createTodoFromText = async (
  req: Request<{}, {}, CreateTodoBody>,
  res: Response,
) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const { taskText } = req.body;
    const llmResponse = await parseTaskWithLLM(taskText);
    const { title, tags, priority } = parseLLMResponse(llmResponse);

    const todo: ITodo = await Todo.create({
      title,
      user: req.user._id,
      completed: false,
      tags,
      priority,
    });

    res.status(201).json(todo);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(500).json({ message: e.message });
    } else {
      res.status(500).json({ message: "Unknown error" });
    }
  }
};
