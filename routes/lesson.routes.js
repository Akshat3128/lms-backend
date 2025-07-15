// routes/lesson.routes.js
import express from "express";
import { createLesson, getLessonsByCourse } from "../controllers/lesson.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:courseId/lessons", verifyToken, createLesson);
router.get("/:courseId/lessons", verifyToken, getLessonsByCourse);

export default router;
