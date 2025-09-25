import express from "express";
import { authMiddleware } from "../middleware/auth";
import {
  createTodo,
  deleteTodo,
  editTodo,
  getTodo,
} from "../controllers/todosController";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getTodo);
router.post("/", createTodo);
router.put("/:id", editTodo);
router.delete("/:id", deleteTodo);

export default router;
