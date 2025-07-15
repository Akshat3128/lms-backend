// routes/quizAttempt.routes.js
import express from "express";
import { submitQuiz, getMyAttempts } from "../controllers/quizAttempt.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, submitQuiz);
router.get("/", verifyToken, getMyAttempts);

export default router;
