import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getCurrentUser } from "../controllers/userController";

const router = express.Router();

router.use(authMiddleware);

router.get("/me", getCurrentUser);

export default router;
