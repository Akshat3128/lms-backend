const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");
const auth = require("../middlewares/auth.middleware");

router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.post("/", auth.verifyToken, courseController.createCourse);
router.post("/:id/enroll", auth.verifyToken, courseController.enrollInCourse);

module.exports = router;