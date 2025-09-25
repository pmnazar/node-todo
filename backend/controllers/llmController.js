import Todo from "../models/Todo.js";
import { parseTaskWithLLM } from "../services/summarizeTaskByllm.js";
import { parseLLMResponse } from "../utils/parseTodo.js";

export async function createTodoFromText(userId, taskText) {
  const llmResponse = await parseTaskWithLLM(taskText);
  const { title, tags, priority } = parseLLMResponse(llmResponse);

  const todo = await Todo.create({
    title,
    user: userId,
    completed: false,
    tags,
    priority,
  });

  return todo;
}
