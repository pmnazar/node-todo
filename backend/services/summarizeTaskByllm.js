import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function parseTaskWithLLM(taskText) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Parse this task into a todo with title, tags (comma-separated), and priority (Low, Medium, High):\n${taskText}`,
      },
    ],
  });

  return response.choices[0].message?.content || "";
}
