import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { createTodoFromText } from "../controllers/llmController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/create-task", createTodoFromText);

export default router;
