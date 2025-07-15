// controllers/quiz.controller.js
import Quiz from "../models/quiz.model.js";
import Course from "../models/course.model.js";
import Question from "../models/question.model.js";
import { quizSchema } from "../validators/quiz.validator.js";

export const createQuiz = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Only admins can create quizzes" });
  }

  const { error } = quizSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const course = await Course.findByPk(req.body.courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    const quiz = await Quiz.create(req.body);
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ error: "Quiz creation failed", detail: err.message });
  }
};

export const getQuizzesByCourse = async (req, res) => {
  try {
    const quizzes = await Quiz.findAll({ where: { courseId: req.params.courseId } });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
};

export const getQuizWithQuestions = async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.quizId, {
      include: [Question],
    });

    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quiz" });
  }
};
