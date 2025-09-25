"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTaskWithLLM = parseTaskWithLLM;
const openai_1 = require("openai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const openai = new openai_1.OpenAI({ apiKey: process.env.OPENAI_API_KEY });
async function parseTaskWithLLM(taskText) {
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
//# sourceMappingURL=summarizeTaskByllm.js.map