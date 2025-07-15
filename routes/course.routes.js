// routes/course.routes.js
import express from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  enrollInCourse,
} from "../controllers/course.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post("/", verifyToken, createCourse);
router.post("/:id/enroll", verifyToken, enrollInCourse);

export default router;
