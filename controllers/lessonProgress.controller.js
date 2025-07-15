// controllers/lessonProgress.controller.js
import LessonProgress from "../models/lessonProgress.model.js";
import Lesson from "../models/lesson.model.js";

export const markLessonCompleted = async (req, res) => {
  const userId = req.user.id;
  const lessonId = req.params.lessonId;

  try {
    const existing = await LessonProgress.findOne({ where: { userId, lessonId } });
    if (existing) {
      return res.status(400).json({ message: "Lesson already marked as completed" });
    }

    const progress = await LessonProgress.create({ userId, lessonId });
    res.status(201).json({ message: "Lesson marked completed", progress });
  } catch (err) {
    res.status(500).json({ error: "Failed to mark lesson complete", detail: err.message });
  }
};

export const getCompletedLessons = async (req, res) => {
  try {
    const completed = await LessonProgress.findAll({
      where: { userId: req.user.id },
      include: [Lesson]
    });
    res.json(completed);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch progress", detail: err.message });
  }
};


export const getCourseProgress = async (req, res) => {
  const userId = req.user.id;
  const courseId = req.params.courseId;

  try {
    // Total lessons in course
    const totalLessons = await Lesson.count({ where: { courseId } });

    if (totalLessons === 0) {
      return res.status(404).json({ error: "No lessons found for this course" });
    }

    // Lessons completed by user for this course
    const completedLessons = await LessonProgress.count({
      where: { userId },
      include: [
        {
          model: Lesson,
          where: { courseId }
        }
      ]
    });

    const percent = Math.round((completedLessons / totalLessons) * 100);

    res.json({
      courseId,
      completed: completedLessons,
      total: totalLessons,
      progress: `${percent}%`
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch course progress", detail: err.message });
  }
};

