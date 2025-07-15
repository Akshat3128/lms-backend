// controllers/course.controller.js
import Course from "../models/course.model.js";
import Enrollment from "../models/enrollment.model.js";
import { courseSchema } from "../validators/course.validator.js";
import { getPaginationParams, buildPaginatedResponse } from "../utils/paginate.js";

export const getAllCourses = async (req, res) => {
  try {
    const { page, limit, offset } = getPaginationParams(req);

    const { count, rows } = await Course.findAndCountAll({
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });

    res.json(buildPaginatedResponse(rows, count, page, limit));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

export const getCourseById = async (req, res) => {
  
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch course" });
  }
};

export const createCourse = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Only admins can create courses" });
  }

  const { error } = courseSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: "Failed to create course" });
  }
};


export const enrollInCourse = async (req, res) => {
  const userId = req.user.id;
  const courseId = req.params.id;
  if (req.user.role !== "user") {
    return res.status(403).json({ error: "Only user can enroll in a course" });
  }
  try {
    const course = await Course.findByPk(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    const alreadyEnrolled = await Enrollment.findOne({ where: { userId, courseId } });
    if (alreadyEnrolled)
      return res.status(400).json({ error: "Already enrolled in this course" });

    const enrollment = await Enrollment.create({ userId, courseId });
    res.status(201).json({ message: "Enrolled successfully", enrollment });
  } catch (err) {
    res.status(500).json({ error: "Enrollment failed" });
  }
};
