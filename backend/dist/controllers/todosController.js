"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.editTodo = exports.createTodo = exports.getTodo = void 0;
const Todo_1 = __importDefault(require("../models/Todo"));
const getTodo = async (req, res) => {
    const todos = await Todo_1.default.find({ user: req?.user?.id }).sort({ createdAt: 1 });
    res.json(todos);
};
exports.getTodo = getTodo;
const createTodo = async (req, res) => {
    if (!req.body.title)
        return res.status(400).json({ error: "Title is required" });
    if (!req.user || !req.user.id)
        return res.status(401).json({ error: "Unauthorize" });
    try {
        const todo = new Todo_1.default({
            title: req.body.title,
            user: req.user.id,
            completed: req.body.completed,
        });
        await todo.save();
        res.json(todo);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to create todo" });
    }
};
exports.createTodo = createTodo;
const editTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const updated = await Todo_1.default.findByIdAndUpdate(id, { title, completed }, { new: true });
        if (!updated)
            return res.status(404).json({ error: "Todo not found" });
        res.json(updated);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to update todo" });
    }
};
exports.editTodo = editTodo;
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        await Todo_1.default.findByIdAndDelete(id);
        const todos = await Todo_1.default.find();
        res.json(todos);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to delete todo" });
    }
};
exports.deleteTodo = deleteTodo;
//# sourceMappingURL=todosController.js.map