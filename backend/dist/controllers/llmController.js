"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodoFromText = void 0;
const Todo_1 = __importDefault(require("../models/Todo"));
const summarizeTaskByllm_1 = require("../services/summarizeTaskByllm");
const parseTodo_1 = require("../utils/parseTodo");
const createTodoFromText = async (req, res) => {
    try {
        if (!req.user)
            return res.status(401).json({ message: "Unauthorized" });
        const { taskText } = req.body;
        const llmResponse = await (0, summarizeTaskByllm_1.parseTaskWithLLM)(taskText);
        const { title, tags, priority } = (0, parseTodo_1.parseLLMResponse)(llmResponse);
        const todo = await Todo_1.default.create({
            title,
            user: req.user._id,
            completed: false,
            tags,
            priority,
        });
        res.status(201).json(todo);
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(500).json({ message: e.message });
        }
        else {
            res.status(500).json({ message: "Unknown error" });
        }
    }
};
exports.createTodoFromText = createTodoFromText;
//# sourceMappingURL=llmController.js.map