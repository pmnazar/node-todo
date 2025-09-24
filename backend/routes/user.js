import express from "express";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", authMiddleware, (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
  });
});

export default router;
