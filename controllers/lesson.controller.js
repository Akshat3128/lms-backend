// controllers/lesson.controller.js
import Course from "../models/course.model.js";
import Lesson from "../models/lesson.model.js";
import { lessonSchema } from "../validators/lesson.validator.js";

export const createLesson = async (req, res) => {
  const courseId = req.params.courseId;
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Only admins can create Lessons" });
  }
  const { error } = lessonSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const course = await Course.findByPk(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    const lesson = await Lesson.create({ ...req.body, courseId });
    res.status(201).json(lesson);
  } catch (err) {
    res.status(500).json({ error: "Failed to create lesson", detail: err.message });
  }
};

export const getLessonsByCourse = async (req, res) => {
  try {
    const lessons = await Lesson.findAll({ where: { courseId: req.params.courseId } });
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
};
