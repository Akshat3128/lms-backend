// routes/lessonProgress.routes.js
import express from "express";
import { markLessonCompleted, getCompletedLessons, getCourseProgress } from "../controllers/lessonProgress.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:lessonId/complete", verifyToken, markLessonCompleted);
router.get("/", verifyToken, getCompletedLessons);
router.get("/course/:courseId", verifyToken, getCourseProgress);

export default router;
