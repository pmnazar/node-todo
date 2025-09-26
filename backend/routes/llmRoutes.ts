import express from "express";
import { authMiddleware } from "../middleware/auth";
import { createTodoFromText } from "../controllers/llmController";

const router = express.Router();

router.use(authMiddleware);

router.post("/create-task", createTodoFromText);

export default router;
