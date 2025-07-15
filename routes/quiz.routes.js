// routes/quiz.routes.js
import express from "express";
import { createQuiz, getQuizzesByCourse, getQuizWithQuestions } from "../controllers/quiz.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, createQuiz); // admin only
router.get("/course/:courseId", verifyToken, getQuizzesByCourse);
router.get("/:quizId", verifyToken, getQuizWithQuestions);

export default router;
