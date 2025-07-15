const Course = require("../models/course.model");
const { courseSchema } = require("../validators/course.validator");

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch course" });
  }
};

const createCourse = async (req, res) => {
  const { error } = courseSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: "Failed to create course" });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
};
